// features/appointments/viewModel/appointmentsViewModel.js
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {getAppointmentFilterData} from '../../../config/StaticDataList';
import {AppointmentModel} from '../model/appointmentModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export const useAppointmentsViewModel = route => {
  const {initialType, previousSearchTab} = route || null;

  const navigation = useNavigation();

  const bottomSheetRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedType, setSelectedType] = useState('Appointments');

  // Tab state
  const [selectedTab, setSelectedTab] = useState(() => 'today');

  const filterData = getAppointmentFilterData();

  const [filters, setFilters] = useState({
    search: '',
    client: null,
    paymentMode: null,
    transactionId: '',
    datesAfter: null,
    datesBefore: null,
  });

  const handleSearchTypeSelect = name => {
    console.log('param type::', initialType);

    setSelectedType(name);
    if (name === 'Appointments') {
      navigation.replace('AppointmentList', {
        type: initialType,
      });
    } else if (name === 'Cases') {
      navigation.replace('CasesScreenList', {
        type: initialType,
      });
    } else if (name === 'Clients') {
      navigation.replace('ClientList', {
        type: initialType,
      });
    }
    bottomSheetRef.current?.dismiss();
  };

  const formattedDate = useCallback(dateString => {
    if (!dateString) return '--/--/--';

    try {
      // Option 1: If your date string is ISO format (e.g., "2023-12-31T00:00:00Z")
      let date = new Date(dateString);

      // Option 2: If your date string is just "YYYY-MM-DD" without time
      if (isNaN(date.getTime())) {
        date = new Date(dateString + 'T00:00:00Z');
      }

      // If still invalid, try manual parsing
      if (isNaN(date.getTime())) {
        const parts = dateString.split(/[-T]/);
        if (parts.length >= 3) {
          date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
        }
      }

      if (isNaN(date.getTime())) return '--/--/--';

      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const year = String(date.getUTCFullYear()).slice(-2);
      return `${month}/${day}/${year}`;
    } catch {
      return '--/--/--';
    }
  }, []);

  // Format time helper
  const formattedTime = useCallback(timeString => {
    if (!timeString) return '--:--';
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return '--:--';
    }
  }, []);

  // Fetch appointments data
  const fetchAppointments = useCallback(
    async (pageNum = 1, isRefreshing = false) => {
      const token = await AsyncStorage.getItem('userToken');

      console.log('tokentoken:::', token);

      try {
        setLoading(true);

        const formatDate = date => {
          if (!date) return null;
          const d = new Date(date);
          return d.toISOString().split('T')[0];
        };

        // Tab-specific date handling
        let datesAfter = filters.datesAfter;
        let datesBefore = filters.datesBefore;
        const today = new Date();
        const todayFormatted = formatDate(today);

        // Clear any existing date filters when changing tabs
        if (selectedTab === 'today') {
          datesAfter = todayFormatted;
          datesBefore = todayFormatted;
        } else if (selectedTab === 'past') {
          datesBefore = filters.datesBefore;
          datesAfter = filters.datesAfter; // Clear any future dates
        } else if (selectedTab === 'future') {
          datesAfter = filters.datesAfter;
          datesBefore = filters.datesBefore; // Clear any past dates
        }

        const params = {
          page: pageNum,
          date: selectedTab, // Send the current tab as API parameter
          search: filters.search || '',
          client: filters.client,
          payment_mode: filters.paymentMode,
          transaction_id: filters.transactionId,
          dates_after: datesAfter,
          dates_before: datesBefore,
        };
        console.log('paramsparams::', params);

        // Clean params
        Object.keys(params).forEach(key => {
          if (
            params[key] === null ||
            params[key] === undefined ||
            params[key] === ''
          ) {
            delete params[key];
          }
        });

        const response = await AppointmentModel.getAppointmentList(params);

        const res = response?.data || [];
        const reverseData = selectedTab === 'future' ? res.reverse() : res;
        if (isRefreshing) {
          setAppointmentsData(reverseData);
        } else {
          setAppointmentsData(prev => [...prev, ...reverseData]);
        }

        setTotalCount(response?.count || 0);
        setPage(pageNum);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filters, selectedTab],
  );

  // Handle tab change
  const handleTabChange = useCallback(tab => {
    setSelectedTab(tab);
    setAppointmentsData([]);
    setPage(1);

    setFilters({
      search: '',
      client: null,
      paymentMode: null,
      transactionId: '',
      datesAfter: null,
      datesBefore: null,
    });
  }, []);

  // Initial load
  useEffect(() => {
    fetchAppointments(1);
  }, [fetchAppointments, selectedTab]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAppointments(1, true);
  }, [fetchAppointments]);

  // Handle search
  const handleSearch = useCallback(text => {
    setSearchText(text);
    setFilters(prev => ({...prev, search: text}));
  }, []);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (!loading && appointmentsData.length < totalCount) {
      fetchAppointments(page + 1);
    }
  }, [loading, appointmentsData.length, totalCount, page, fetchAppointments]);

  const handleApplyFilters = useCallback(
    newFilters => {
      console.log('date before and after::', newFilters);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayFormatted = today.toISOString().split('T')[0];

      let datesAfter = newFilters.startDate
        ? new Date(newFilters.startDate).toISOString().split('T')[0]
        : null;
      let datesBefore = newFilters.endDate
        ? new Date(newFilters.endDate).toISOString().split('T')[0]
        : null;

      // Apply tab-specific date restrictions
      if (selectedTab === 'today') {
        datesAfter = todayFormatted;
        datesBefore = todayFormatted;
      } else if (selectedTab === 'past') {
        // For past tab, only allow dates before today
        if (datesAfter && new Date(datesAfter) >= today) {
          datesAfter = null;
        }
      } else if (selectedTab === 'future') {
        // For future tab, only allow dates after today
        if (datesBefore && new Date(datesBefore) <= today) {
          datesBefore = null;
        }
      }

      const mappedFilters = {
        ...filters,
        client: newFilters.caseWorker,
        paymentMode: newFilters.attorney,
        transactionId: newFilters.searchSecondText,
        search: newFilters.searchText,
        datesAfter: datesAfter,
        datesBefore: datesBefore,
      };

      console.log('date before and datesBefore::', mappedFilters);

      setFilters(mappedFilters);
      setAppointmentsData([]);
      setPage(1);
    },
    [filters, selectedTab],
  );

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  // Memoized filtered appointments
  const filteredAppointments = useMemo(() => {
    if (!searchText) return appointmentsData;

    const lowerCaseSearch = searchText.toLowerCase();
    return appointmentsData.filter(
      appointment =>
        appointment.client_name?.toLowerCase().includes(lowerCaseSearch) ||
        appointment.transaction_id?.toLowerCase().includes(lowerCaseSearch) ||
        appointment.payment_mode?.toLowerCase().includes(lowerCaseSearch),
    );
  }, [searchText, appointmentsData]);

  return {
    searchText,
    filterData,
    filteredAppointments,
    loading,
    refreshing,
    selectedTab,
    bottomSheetRef,
    filters,
    selectedType,
    formattedDate,
    formattedTime,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    handleTabChange,
    openBottomSheet,
    handleSearchTypeSelect,
  };
};
