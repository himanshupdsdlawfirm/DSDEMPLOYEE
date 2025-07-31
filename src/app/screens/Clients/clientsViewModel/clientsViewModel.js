import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {ClientModel} from '../clientsModel/clientsModel';
import {getClientListFilterData} from '../../../config/StaticDataList';
import rootStore from '../../../stores/rootStore';
import {useNavigation} from '@react-navigation/native';

export const useClientsViewModel = route => {
  const {initialType} = route || null;

  const navigation = useNavigation();

  const searchBottomSheetRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filterActive, setFilterActive] = useState(false);
  const [searchMode, setSearchMode] = useState('local'); // 'local' or 'api'
  const [selectedType, setSelectedType] = useState('Clients');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  // Client details state
  const [clientDetails, setClientDetails] = useState({
    snapshot: null,
    cases: null,
    hearings: null,
    loading: {
      snapshot: false,
      cases: false,
      hearings: false,
    },
    error: null,
  });

  const filterData = getClientListFilterData();

  const [filters, setFilters] = useState({
    search: '',
    case_activity: null,
    status: null,
    assignee: null,
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

  useEffect(() => {
    const handler = setTimeout(() => {
      // Only update filters if search text has changed
      setFilters(prev => ({...prev, search: searchText}));
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const showToast = useCallback(config => {
    console.log('config data::', config);

    // Clear any existing timeout
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastConfig({
      ...config,
      visible: true,
    });

    // Auto-hide after 3 seconds
    toastTimeoutRef.current = setTimeout(() => {
      setToastConfig(prev => ({...prev, visible: false}));
    }, 3000);
  }, []);

  // Cleanup effect for the timeout
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const openSearchBottomSheet = () => {
    searchBottomSheetRef.current?.present();
  };

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
      navigation.replace('ClientList', {type: initialType});
    }
    searchBottomSheetRef.current?.dismiss();
  };

  // Format date helper
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

  // Fetch clients data
  const fetchClients = useCallback(
    async (pageNum = 1, isRefreshing = false) => {
      try {
        setLoading(true);

        // Reset data when starting a new fetch with filters
        if (pageNum === 1 && (filterActive || filters.search)) {
          setClientsData([]);
        }

        const formatDate = date => {
          if (!date) return null;
          const d = new Date(date);
          return d.toISOString().split('T')[0];
        };

        const params = {
          page: pageNum,
          search: filters.search || '',
          has_case: filters.case_activity,
          assigned_employee: filters.assignee,
          is_closed_client: filters.status,
          retention_date_after: formatDate(filters.startDate),
          retention_date_before: formatDate(filters.endDate),
        };

        console.log('clients param:', params);
        

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

        const response = await ClientModel.getClientList(params);

        if (isRefreshing || pageNum === 1) {
          setClientsData(response.data || []);
        } else {
          setClientsData(prev => [...prev, ...(response.data || [])]);
        }

        setTotalCount(response.count);
        setPage(pageNum);
      } catch (error) {
        console.error('Error fetching clients:', error);
        // Reset data on error if it's the first page
        if (page === 1) {
          setClientsData([]);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filters, filterActive],
  );

  // Fetch client details (snapshot, cases, hearings)
  const fetchClientDetails = useCallback(async (clientId, tab) => {
    console.log(`Fetching ${tab} for client:`, clientId);

    try {
      setClientDetails(prev => ({
        ...prev,
        loading: {...prev.loading, [tab]: true},
        error: null,
        [tab]: null, // Clear previous data
      }));

      let response;
      switch (tab) {
        case 'snapshot':
          response = await ClientModel.getSnapshot(clientId);
          break;
        case 'cases':
          response = await ClientModel.getCases(clientId);
          break;
        case 'hearings':
          // Ensure we're passing the correct ID type
          response = await ClientModel.getHearings(clientId.toString());
          break;
        default:
          break;
      }

      setClientDetails(prev => ({
        ...prev,
        [tab]: response.data || [],
        error: response.error || null,
      }));

      return response;
    } catch (error) {
      setClientDetails(prev => ({
        ...prev,
        error: error.message || `Failed to fetch ${tab} data`,
      }));
      throw error;
    } finally {
      setClientDetails(prev => ({
        ...prev,
        loading: {...prev.loading, [tab]: false},
      }));
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchClients(1);
  }, [fetchClients]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchClients(1, true);
  }, [fetchClients]);

  // Handle search
  const handleSearch = useCallback(text => {
    setSearchText(text);
  }, []);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (!loading && clientsData.length < totalCount) {
      fetchClients(page + 1);
    }
  }, [loading, clientsData.length, totalCount, page, fetchClients]);

  // Handle filter apply
  const handleApplyFilters = useCallback(
    newFilters => {
      const mappedFilters = {
        search: filters.search,
        case_activity: newFilters.caseWorker,
        status: newFilters.attorney,
        assignee: newFilters.hearingType,
        startDate: newFilters.startDate,
        endDate: newFilters.endDate,
      };

      setFilterActive(true);
      setFilters(mappedFilters);
      setClientsData([]);
      setPage(1);
    },
    [filters.search],
  );

  return {
    searchText,
    filterData,
    clientsData,
    loading,
    refreshing,
    clientDetails,
    filters,
    searchBottomSheetRef,
    selectedType,
    filterActive,
    toastConfig,
    setClientDetails,
    formattedDate,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    fetchClientDetails,
    handleSearchTypeSelect,
    openSearchBottomSheet,
    setFilterActive,
    showToast,
  };
};
