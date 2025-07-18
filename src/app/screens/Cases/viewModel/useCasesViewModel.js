import {useState, useEffect, useCallback, useMemo} from 'react';
import {CasesModel} from '../model/CasesModel';

export const useCasesViewModel = () => {
  const [searchText, setSearchText] = useState('');
  const [casesData, setCasesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    caseType: null,
    status: null,
    employeeAssigned: null,
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

        console.log('cases list res::', response);

        if (isRefreshing) {
          setCasesData(response.data);
        } else {
          setCasesData(prev => [...prev, ...response.data]);
        }

        setTotalCount(response.count);
        setPage(pageNum);
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filters],
  );

  // Initial load
  useEffect(() => {
    fetchCases(1);
  }, [fetchCases]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCases(1, true);
  }, [fetchCases]);

  // Handle search
  const handleSearch = useCallback(text => {
    setSearchText(text);
    setFilters(prev => ({...prev, search: text}));
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
        search: searchText,
        caseType: newFilters.caseType,
        status: newFilters.status,
        employeeAssigned: newFilters.employeeAssigned,
        startDate: newFilters.startDate,
        endDate: newFilters.endDate,
      };

      setFilters(mappedFilters);
      setCasesData([]);
      setPage(1);
    },
    [searchText],
  );

  // Memoized filtered cases
  const filteredCases = useMemo(() => {
    if (!searchText) return casesData;

    const lowerCaseSearch = searchText.toLowerCase();
    return casesData.filter(
      caseItem =>
        caseItem.case_type_name?.toLowerCase().includes(lowerCaseSearch) ||
        caseItem.alien_number?.toLowerCase().includes(lowerCaseSearch) ||
        caseItem.client_name?.toLowerCase().includes(lowerCaseSearch),
    );
  }, [searchText, casesData]);

  return {
    searchText,
    filteredCases,
    loading,
    refreshing,
    formattedDate,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
  };
};
