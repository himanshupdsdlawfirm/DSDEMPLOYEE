import {useState, useCallback, useEffect, useRef} from 'react';
import {CaseListModel} from '../model/caseListModel';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { AppImages } from '../../../../config/Images';

export const useCaseListViewModel = () => {
  const model = useRef(new CaseListModel()).current;
  const toastTimeoutRef = useRef(null);
  const navigation = useNavigation();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCases, setTotalCases] = useState(0);
  const [toastConfig, setToastConfig] = useState({
    visible: false,
    title: '',
    message: '',
    colorDark: '',
    colorLight: '',
    icon: null
  });

  // Constants for pagination
  const PAGE_SIZE = 20; // Number of items per page
  const INITIAL_PAGE = 1;

  useFocusEffect(
    useCallback(() => {
      fetchCases(INITIAL_PAGE);
      return () => {
        if (toastTimeoutRef.current) {
          clearTimeout(toastTimeoutRef.current);
        }
      };
    }, []),
  );

  const showToast = useCallback(config => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastConfig({
      ...config,
      visible: true,
    });

    toastTimeoutRef.current = setTimeout(() => {
      setToastConfig(prev => ({...prev, visible: false}));
    }, 3000);
  }, []);

  const fetchCases = useCallback(
    async (pageNum = INITIAL_PAGE, isRefreshing = false) => {
      try {
        if (pageNum === INITIAL_PAGE && cases.length > 0 && !isRefreshing) {
          return; // Don't fetch first page if we already have data
        }

        isRefreshing ? setRefreshing(true) : setLoading(true);

        const response = await model.getCases();

        if (response.success) {
          const allCases = response.data || [];
          setTotalCases(allCases.length);

          // Implement client-side pagination
          const startIndex = (pageNum - 1) * PAGE_SIZE;
          const paginatedCases = allCases.slice(
            startIndex,
            startIndex + PAGE_SIZE,
          );

          if (isRefreshing || pageNum === INITIAL_PAGE) {
            setCases(paginatedCases);
            setPage(INITIAL_PAGE);
          } else {
            setCases(prev => [...prev, ...paginatedCases]);
          }

          // Check if there are more items to load
          setHasMore(startIndex + PAGE_SIZE < allCases.length);
        } else {
          showToast({
            title: 'Error',
            message: response.error || 'Failed to fetch cases',
            colorLight: '#E06158',
            colorDark: '#FC867D',
          });
        }
      } catch (error) {
        showToast({
          title: 'Error',
          message: error.message || 'Failed to fetch cases',
          colorLight: '#E06158',
          colorDark: '#FC867D',
        });
      } finally {
        isRefreshing ? setRefreshing(false) : setLoading(false);
      }
    },
    [model, showToast, cases.length],
  );

  const fetchCaseDetail = useCallback(
    async (pageNum = 1, isRefreshing = false, case_number) => {
      try {
        isRefreshing ? setRefreshing(true) : setLoading(true);

        const response = await model.getCaseDetail(1, case_number);

        if (response.success) {
          navigation.navigate('CaseDetails', {data: response?.data});
        } else {
          showToast({
            title: 'Error',
            message: response.error || 'Failed to fetch case detail',
            colorLight: '#E06158',
            colorDark: '#FC867D',
          });
        }
      } catch (error) {
        showToast({
          title: 'Error',
          message: error.message || 'Failed to fetch case detail',
          colorLight: '#E06158',
          colorDark: '#FC867D',
        });
      } finally {
        isRefreshing ? setRefreshing(false) : setLoading(false);
      }
    },
    [model, showToast],
  );

  const onRefresh = useCallback(() => {
    fetchCases(INITIAL_PAGE, true);
  }, [fetchCases]);

  const loadMoreCases = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      fetchCases(nextPage);
      setPage(nextPage);
    }
  }, [loading, hasMore, page, fetchCases]);

  const deleteCase = useCallback(
    async (caseId, rowMap) => {
      try {
        if (rowMap[caseId]) {
          rowMap[caseId].closeRow();
        }

        const response = await model.deleteCase(caseId);

        if (response.success) {
          setCases(prev => prev.filter(item => item.id !== caseId));
          setTotalCases(prev => prev - 1);
          fetchCases();
          showToast({
            title: 'Success',
            message: 'Case deleted successfully',
            colorLight: '#50ad6d',
            colorDark: '#50ad6d',
            icon: AppImages.trash
          });
        } else {
          showToast({
            title: 'Error',
            message: response.error || 'Failed to delete case',
            colorLight: '#E06158',
            colorDark: '#FC867D',
          });
        }
      } catch (error) {
        showToast({
          title: 'Error',
          message: error.message || 'Failed to delete case',
          colorLight: '#E06158',
          colorDark: '#FC867D',
        });
      }
    },
    [model, showToast],
  );

  return {
    cases,
    loading,
    refreshing,
    toastConfig,
    fetchCases,
    onRefresh,
    loadMoreCases,
    deleteCase,
    fetchCaseDetail,
  };
};
