// addCaseViewModel.js
import {useState, useCallback, useEffect, useRef} from 'react';
import {AddCaseModel} from '../model/addCaseModel';
import {showToast} from '../../../../../utils/toastUtils';

export const useAddCaseViewModel = () => {
  const model = useRef(new AddCaseModel()).current;
  const [caseNumber, setCaseNumberState] = useState('');
  const [caseName, setCaseNameState] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    visible: false,
    title: '',
    message: '',
    colorDark: '',
    colorLight: '',
  });

  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = useCallback(config => {
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

  const validateCaseNumber = useCallback(number => {
    const isValid = number.length >= 13;
    setError(isValid ? '' : 'Case number must be 13 characters');
    return isValid;
  }, []);

  const setCaseNumber = useCallback(
    text => {
      model.caseNumber = text;
      setCaseNumberState(text);
      validateCaseNumber(text);
    },
    [model, validateCaseNumber],
  );

  const setCaseName = useCallback(
    text => {
      model.caseName = text;
      setCaseNameState(text);
    },
    [model],
  );

  const handleAddCase = useCallback(async () => {
    if (!validateCaseNumber(caseNumber)) {
      showToast({
        title: 'Invalid Input',
        message: 'Case number must be 13 characters',
        colorLight: '#E06158',
        colorDark: '#FC867D',
      });
      return {success: false};
    }

    setLoading(true);
    try {
      const response = await model.addCase();
      if (response.success) {
        return {success: true, data: response.data};
      } else {
        showToast({
          title: 'Error',
          message: response.error || 'Failed to add case',
          colorLight: '#E06158',
          colorDark: '#FC867D',
        });
        return {success: false};
      }
    } catch (err) {
      showToast({
        title: 'Error',
        message: err.message || 'Failed to add case',
        colorLight: '#E06158',
        colorDark: '#FC867D',
      });
      return {success: false};
    } finally {
      setLoading(false);
    }
  }, [caseNumber, model, showToast, validateCaseNumber]);

  return {
    caseNumber,
    caseName,
    error,
    loading,
    toastConfig,
    setCaseNumber,
    setCaseName,
    handleAddCase,
  };
};
