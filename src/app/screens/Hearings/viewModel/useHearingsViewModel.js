// features/hearings/viewModel/hearingsViewModel.js
import {useState, useEffect, useCallback, useMemo} from 'react';
import {getHearingFilterData} from '../../../config/StaticDataList';
import {HearingModel} from '../model/hearingsModel';

export const useHearingsViewModel = () => {
  const [searchText, setSearchText] = useState('');
  const [hearingsData, setHearingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const filterData = getHearingFilterData();

  const [filters, setFilters] = useState({
    search: '',
    caseWorker: null,
    attorney: null,
    hearingType: null,
    hearingStatus: null,
    judgeName: '',
    startDate: null,
    endDate: null,
  });

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

  // Fetch hearings data
  const fetchHearings = useCallback(
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
          case_worker: filters.caseWorker,
          associate_attorney: filters.attorney,
          hearingType: filters.hearingType,
          hearing_status: filters.hearingStatus,
          judge_name: filters.judgeName,
          start_date: formatDate(filters.startDate),
          end_date: formatDate(filters.endDate),
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

        console.log('hearing params are::', params);

        const response = await HearingModel.getHearingList(params);

        console.log('hearing res are::', response);

        if (isRefreshing) {
          setHearingsData(response.data);
        } else {
          setHearingsData(prev => [...prev, ...response.data]);
        }

        setTotalCount(response.count);
        setPage(pageNum);
      } catch (error) {
        console.error('Error fetching hearings:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filters],
  );

  // Initial load
  useEffect(() => {
    fetchHearings(1);
  }, [fetchHearings]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHearings(1, true);
  }, [fetchHearings]);

  // Handle search
  const handleSearch = useCallback(text => {
    setSearchText(text);
    setFilters(prev => ({...prev, search: text}));
  }, []);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (!loading && hearingsData.length < totalCount) {
      fetchHearings(page + 1);
    }
  }, [loading, hearingsData.length, totalCount, page, fetchHearings]);

  // Handle filter apply
  const handleApplyFilters = useCallback(
    newFilters => {
      console.log('newFilters::', newFilters);

      const mappedFilters = {
        search: searchText,
        caseWorker: newFilters.caseWorker,
        attorney: newFilters.attorney,
        hearingType: newFilters.hearingType,
        hearingStatus: newFilters.hearing,
        judgeName: newFilters.searchText,
        startDate: newFilters.startDate,
        endDate: newFilters.endDate,
      };

      setFilters(mappedFilters);
      setHearingsData([]);
      setPage(1);
    },
    [searchText],
  );

  // Memoized filtered hearings
  const filteredHearings = useMemo(() => {
    if (!searchText) return hearingsData;

    const lowerCaseSearch = searchText.toLowerCase();
    return hearingsData.filter(
      hearing =>
        hearing.client_name?.toLowerCase().includes(lowerCaseSearch) ||
        hearing.alien_number?.toLowerCase().includes(lowerCaseSearch) ||
        hearing.judge_name?.toLowerCase().includes(lowerCaseSearch) ||
        hearing.court_name?.toLowerCase().includes(lowerCaseSearch),
    );
  }, [searchText, hearingsData]);

  return {
    searchText,
    filterData,
    filteredHearings,
    loading,
    refreshing,
    formattedDate,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    filters,
  };
};
