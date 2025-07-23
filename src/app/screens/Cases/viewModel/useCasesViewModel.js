import {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {CasesModel} from '../model/CasesModel';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {dropdownApoointmentOptions} from '../../../config/StaticDataList';

export const useCasesViewModel = route => {
  const {initialType} = route || {};
  const navigation = useNavigation();

  const bottomSheetRef = useRef(null);
  const filterBottomSheetRef = useRef(null);
  const scrollRef = useRef(null);

  const filterData = dropdownApoointmentOptions();

  const [searchText, setSearchText] = useState('');
  const [casesData, setCasesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedType, setSelectedType] = useState('Cases');
  const [filters, setFilters] = useState({
    search: '',
    caseType: null,
    status: null,
    employeeAssigned: null,
    startDate: null,
    endDate: null,
  });

  const [toastConfig, setToastConfig] = useState({
    visible: false,
    title: '',
    message: '',
    colorDark: '',
    colorLight: '',
    icon: null,
  });

  // Debounce search and trigger API call
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only update filters if search text has changed
      if (filters.search !== searchText) {
        setPage(1);
        setCasesData([]);
        setFilters(prev => ({...prev, search: searchText}));
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  // Trigger API call when filters change
  useEffect(() => {
    fetchCases(1);
  }, [filters]);

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollToOffset({offset: 0, animated: true});
      return () => {};
    }, []),
  );

  const showToast = useCallback(config => {
    setToastConfig({
      ...config,
      visible: true,
    });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToastConfig(prev => ({...prev, visible: false}));
    }, 3000);
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleSearchTypeSelect = name => {
    setSelectedType(name);
    if (name === 'Appointments') {
      navigation.replace('AppointmentList', {type: initialType});
    } else if (name === 'Cases') {
      navigation.replace('CasesScreenList', {type: initialType});
    } else if (name === 'Clients') {
      navigation.replace('ClientList', {type: initialType});
    }
    bottomSheetRef.current?.dismiss();
  };

  // Format date helper
  const formattedDate = useCallback(dateString => {
    if (!dateString) return '--/--/--';
    try {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${month}/${day}/${year}`;
    } catch {
      return '--/--/--';
    }
  }, []);

  // Fetch cases data
  const fetchCases = useCallback(
    async (pageNum = 1, isRefreshing = false) => {
      try {
        setLoading(true);

        const formatDate = date => {
          if (!date) return null;
          const d = new Date(date);
          return d.toISOString().split('T')[0];
        };

        const params = {
          page: pageNum,
          search: filters.search || '',
          case_type: filters.caseType,
          status: filters.status,
          employee_assigned: filters.employeeAssigned,
          retention_date_after: formatDate(filters.startDate),
          retention_date_before: formatDate(filters.endDate),
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

        const response = await CasesModel.getCasesList(params);

        console.log('case list is::', response);

        if (isRefreshing || pageNum === 1) {
          setCasesData(response.data || []);
        } else {
          setCasesData(prev => [...prev, ...(response.data || [])]);
        }

        setTotalCount(response.count || 0);
        setPage(pageNum);
      } catch (error) {
        console.error('Error fetching cases:', error);
        if (pageNum === 1) {
          setCasesData([]);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filters],
  );

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCases(1, true);
  }, [fetchCases]);

  // Handle search - simplified to only update search text
  const handleSearch = useCallback(text => {
    filterBottomSheetRef.current?.dismiss();
    bottomSheetRef.current?.dismiss();
    setSearchText(text);
  }, []);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (!loading && casesData.length < totalCount) {
      fetchCases(page + 1);
    }
  }, [loading, casesData.length, totalCount, page, fetchCases]);

  // Handle filter apply
  const handleApplyFilters = useCallback(
    newFilters => {
      const mappedFilters = {
        search: searchText, // Keep current search text
        caseType: newFilters.caseWorker,
        status: newFilters.hearingType,
        employeeAssigned: newFilters.attorney,
        startDate: newFilters.startDate,
        endDate: newFilters.endDate,
      };

      setFilters(mappedFilters);
      setCasesData([]);
      setPage(1);
    },
    [searchText],
  );

  return {
    searchText,
    casesData, // Return casesData directly instead of filteredCases
    loading,
    refreshing,
    bottomSheetRef,
    selectedType,
    filterData,
    toastConfig,
    filterBottomSheetRef,
    scrollRef,
    formattedDate,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    openBottomSheet,
    handleSearchTypeSelect,
    showToast,
  };
};
