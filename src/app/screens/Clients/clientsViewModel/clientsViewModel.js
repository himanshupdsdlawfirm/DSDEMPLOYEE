import {useState, useEffect, useMemo, useCallback} from 'react';
import {ClientModel} from '../clientsModel/clientsModel';
import {getClientListFilterData} from '../../../config/StaticDataList';
import rootStore from '../../../stores/rootStore';

export const useClientsViewModel = () => {
  const [searchText, setSearchText] = useState('');
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

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
    caseWorker: null,
    attorney: null,
    assigne: null,
    startDate: null,
    endDate: null,
  });

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

  // Fetch clients data
  const fetchClients = useCallback(
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
          has_case: filters.attorney,
          assigned_employee: filters.assigne,
          is_closed_client: filters.caseWorker,
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

        const response = await ClientModel.getClientList(params);

        if (isRefreshing) {
          setClientsData(response.data);
        } else {
          setClientsData(prev => [...prev, ...response.data]);
        }

        setTotalCount(response.count);
        setPage(pageNum);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filters],
  );

  // Fetch client details (snapshot, cases, hearings)
  const fetchClientDetails = useCallback(async (clientId, tab) => {
    console.log('client id::', clientId);

    try {
      setClientDetails(prev => ({
        ...prev,
        loading: {...prev.loading, [tab]: true},
        error: null,
      }));

      let response;
      switch (tab) {
        case 'snapshot':
          response = await ClientModel.getSnapshot(clientId);
          setClientDetails(prev => ({
            ...prev,
            snapshot: response.data,
          }));
          break;
        case 'cases':
          response = await ClientModel.getCases(clientId);
          setClientDetails(prev => ({
            ...prev,
            cases: response.data,
          }));
          break;
        case 'hearings':
          response = await ClientModel.getHearings(clientId);
          setClientDetails(prev => ({
            ...prev,
            hearings: response.data,
          }));
          break;
        default:
          break;
      }
    } catch (error) {
      setClientDetails(prev => ({
        ...prev,
        error: error.message || 'Failed to fetch client details',
      }));
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
    setFilters(prev => ({...prev, search: text}));
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
        caseWorker: newFilters.caseWorker,
        attorney: newFilters.attorney,
        assigne: newFilters.hearingType,
        startDate: newFilters.startDate,
        endDate: newFilters.endDate,
      };

      setFilters(mappedFilters);
      setClientsData([]);
      setPage(1);
    },
    [filters.search],
  );

  // Memoized filtered clients
  const filteredClients = useMemo(() => {
    if (!searchText) return clientsData;

    const lowerCaseSearch = searchText.toLowerCase();
    return clientsData.filter(
      client =>
        client.client_name?.toLowerCase().includes(lowerCaseSearch) ||
        client.alien_number?.toLowerCase().includes(lowerCaseSearch) ||
        client.mobile?.toLowerCase().includes(lowerCaseSearch),
    );
  }, [searchText, clientsData]);

  return {
    searchText,
    filterData,
    filteredClients,
    loading,
    refreshing,
    clientDetails,
    formattedDate,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    fetchClientDetails,
    filters,
  };
};
