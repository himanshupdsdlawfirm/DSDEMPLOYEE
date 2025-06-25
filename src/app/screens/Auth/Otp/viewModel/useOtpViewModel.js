import {useState, useEffect, useCallback} from 'react';
import OtpModel from '../model/OtpModel';

const useOtpViewModel = () => {
  const model = new OtpModel();
  const [state, setState] = useState({
    otp: ['', '', '', '', '', ''],
    otpError: false,
    count: 30,
    email: 'himanshu@gmail.com',
  });

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => ({
        ...prev,
        count: prev.count > 0 ? prev.count - 1 : 0,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // OTP validation
  useEffect(() => {
    if (model.validateOtp(state.otp)) {
      setState(prev => ({...prev, otpError: false}));
      // Here you can add auto-submit logic
    }
  }, [state.otp]);

  const handlePasteOTP = useCallback(text => {
    if (text.length === 6) {
      const otpArray = text.split('').slice(0, 6);
      setState(prev => ({...prev, otp: otpArray}));
    }
  }, []);

  const handleInputChange = useCallback((index, value, focusNextField) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    if (numericValue) {
      setState(prev => {
        const newOtp = [...prev.otp];
        newOtp[index] = numericValue.slice(-1);
        return {...prev, otp: newOtp};
      });

      if (index < 5 && focusNextField) {
        focusNextField();
      }
    }
  }, []);

  const handleBackspace = useCallback((index, value, focusPrevField) => {
    setState(prev => {
      const newOtp = [...prev.otp];

      if (value === '' && index > 0) {
        newOtp[index - 1] = '';
        if (focusPrevField) focusPrevField();
      } else {
        newOtp[index] = '';
      }

      return {...prev, otp: newOtp};
    });
  }, []);

  const resendOtp = useCallback(() => {
    if (state.count === 0) {
      setState(prev => ({
        ...prev,
        count: 30,
        otp: ['', '', '', '', '', ''],
        otpError: false,
      }));
    }
  }, [state.count]);

  return {
    state,
    handlers: {
      handlePasteOTP,
      handleInputChange,
      handleBackspace,
      resendOtp,
    },
  };
};

export default useOtpViewModel;
