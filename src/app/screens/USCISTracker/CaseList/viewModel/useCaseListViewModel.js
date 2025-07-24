// caseListViewModel.js
import {useState, useCallback, useEffect, useRef} from 'react';
import {CaseListModel} from '../model/caseListModel';
import {useNavigation} from '@react-navigation/native';

export const useCaseListViewModel = () => {
  const model = useRef(new CaseListModel()).current;

  const toastTimeoutRef = useRef(null);
  const navigation = useNavigation();

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [toastConfig, setToastConfig] = useState({
    visible: false,
    title: '',
    message: '',
    colorDark: '',
    colorLight: '',
  });

  useEffect(() => {
    fetchCases();
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

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
    async (pageNum = 1, isRefreshing = false) => {
      try {
        isRefreshing ? setRefreshing(true) : setLoading(true);

        const response = await model.getCases();

        console.log('uscis case list response::', response);

        if (response.success) {
          if (isRefreshing || pageNum === 1) {
            setCases(response.data);
            if (isRefreshing) setPage(1);
          } else {
            setCases(prev => [...prev, ...response.data]);
          }
          setHasMore(response.hasMore);
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
    [model, showToast],
  );

  const fetchCaseDetail = useCallback(
    async (pageNum = 1, isRefreshing = false, case_number) => {
      try {
        isRefreshing ? setRefreshing(true) : setLoading(true);

        const response = await model.getCaseDetail(1, case_number);

        console.log('uscis case detail response::', response);

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
    fetchCases(1, true);
  }, [fetchCases]);

  const loadMoreCases = useCallback(() => {
    if (!loading && hasMore) {
      fetchCases(page + 1);
      setPage(prev => prev + 1);
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
          showToast({
            title: 'Success',
            message: 'Case deleted successfully',
            colorLight: '#50ad6d',
            colorDark: '#50ad6d',
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
