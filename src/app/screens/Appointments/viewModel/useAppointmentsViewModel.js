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
  const filterBottomSheetRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedType, setSelectedType] = useState('Appointments');
  const [filterActive, setFilterActive] = useState(false);
  const [isResetFilterData, setResetFilterData] = useState(0);
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  // Tab state
  const [selectedTab, setSelectedTab] = useState(() => 'today');

  const filterData = getAppointmentFilterData();

  const [filters, setFilters] = useState({
    search: '',
    visitor: null,
    payment_mode: null,
    transaction_id: '',
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      // Only update filters if search text has changed
      setFilters(prev => ({...prev, search: searchText}));
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

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
      try {
        setLoading(true);

        if (pageNum === 1) {
          setAppointmentsData([]);
        }

        const params = {
          page: pageNum,
          date: selectedTab,
          search: filters.search || '',
          visitor: filters.visitor,
          payment_mode: filters.payment_mode,
          transaction_id: filters.transaction_id,
        };

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

        // Sort appointments based on tab
        // Sort appointments based on tab
        const sortedData = res.sort((a, b) => {
          // Helper function to create full datetime string for comparison
          const getDateTime = item => {
            const [time, modifier] = item.start_time.split(' ');
            let [hours, minutes] = time.split(':');
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);

            if (modifier === 'PM' && hours !== 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;

            // Pad single digit hours/minutes
            hours = hours.toString().padStart(2, '0');
            minutes = minutes.toString().padStart(2, '0');

            return `${item.date}T${hours}:${minutes}:00`;
          };

          const aDateTime = getDateTime(a);
          const bDateTime = getDateTime(b);

          console.log('selectedTabselectedTab::',selectedTab);
          

          // For upcoming: sort by datetime descending (most recent first)
          if (selectedTab === 'future') {
            return new Date(bDateTime) - new Date(aDateTime);
          }
          // For today: sort by time only (earliest first)
          else if (selectedTab === 'today') {
            return (
              new Date(`1970-01-01T${aDateTime.split('T')[1]}`) -
              new Date(`1970-01-01T${bDateTime.split('T')[1]}`)
            );
          }
          // For past: sort by datetime descending (most recent first)
          else {
            return new Date(bDateTime) - new Date(aDateTime);
          }
        });

        if (isRefreshing) {
          setAppointmentsData(sortedData);
        } else {
          setAppointmentsData(prev => [...prev, ...sortedData]);
        }

        setTotalCount(response?.count || 0);
        setPage(pageNum);
      } catch (error) {
        if (page === 1) {
          setAppointmentsData([]);
        }
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filters, selectedTab, filterActive, page],
  );

  const openFilter = useCallback(() => {
    filterBottomSheetRef.current?.present();
  }, []);

  // Handle tab change
  const handleTabChange = useCallback(tab => {
    setSearchText('');
    setResetFilterData(Math.random()); // This is correct
    setFilters({
      search: '',
      visitor: null,
      payment_mode: null,
      transaction_id: '',
    });
    bottomSheetRef.current?.dismiss();
    filterBottomSheetRef.current?.dismiss();

    setAppointmentsData([]);
    setSelectedTab(tab);
    setPage(1);

    setResetFilterData(Math.random()); // Remove this duplicate line
  }, []);

  // Initial load
  useEffect(() => {
    // Only fetch if we have no data or if search text changed
    if (page === 1 || filters.search !== '') {
      fetchAppointments(1);
    }
  }, [filters, selectedTab]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAppointments(1, true);
  }, [fetchAppointments]);

  // Handle search
  const handleSearch = useCallback(text => {
    setSearchText(text);
  }, []);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (!loading && appointmentsData.length < totalCount) {
      fetchAppointments(page + 1);
    }
  }, [loading, appointmentsData.length, totalCount, page, fetchAppointments]);

  const handleApplyFilters = useCallback(
    newFilters => {
      const mappedFilters = {
        visitor: newFilters.caseWorker || null,
        payment_mode: newFilters.attorney || null,
        transaction_id: newFilters.searchSecondText || '',
      };

      setFilterActive(
        !!newFilters.searchText ||
          !!newFilters.caseWorker ||
          !!newFilters.attorney ||
          !!newFilters.searchSecondText,
      );
      setFilters(mappedFilters);
      setAppointmentsData([]);
      setPage(1);
    },
    [selectedTab],
  );

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return {
    searchText,
    filterData,
    appointmentsData,
    loading,
    refreshing,
    selectedTab,
    bottomSheetRef,
    filters,
    selectedType,
    filterActive,
    filterBottomSheetRef,
    isResetFilterData,
    formattedDate,
    formattedTime,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    handleTabChange,
    openBottomSheet,
    handleSearchTypeSelect,
    setFilterActive,
    openFilter,
  };
};
