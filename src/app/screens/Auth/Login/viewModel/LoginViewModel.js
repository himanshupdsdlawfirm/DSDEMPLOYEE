// features/auth/login/viewModel/LoginViewModel.js
import {useCallback, useState} from 'react';
import {AuthModel} from '../model/AuthModel';
import {useNavigation} from '@react-navigation/native';
import rootStore from '../../../../stores/rootStore';

export const useLoginViewModel = () => {
  const navigation = useNavigation();
  const authModel = new AuthModel();

  const [state, setState] = useState({
    email: '',
    password: '',
    isEmailValid: false,
    isPassValid: false,
    isEmailFocus: false,
    isPassFocus: false,
    isPassShow: true,
    isLoading: false,
  });

  const [toastConfig, setToastConfig] = useState({
    visible: false,
    message: '',
    type: 'error', // can be 'error', 'success', etc.
  });

  // Memoized state updater to prevent unnecessary re-renders
  const updateState = useCallback(updates => {
    setState(prev => ({...prev, ...updates}));
  }, []);

  const showToast = useCallback((message, type = 'error') => {
    setToastConfig({visible: true, message, type});
    setTimeout(() => setToastConfig(prev => ({...prev, visible: false})), 3000);
  }, []);

  const validateEmail = email => {
    const isEmailValid = authModel.validateEmail(email);
    updateState({email, isEmailValid});
  };

  const validatePassword = password => {
    const isPassValid = authModel.validatePassword(password);
    updateState({password, isPassValid});
  };

  const handleLogin = async () => {
    try {
      updateState({isLoading: true}); // Set loading to true when API call starts
      const {email, password} = state;
      const res = await authModel.signIn(email, password);

      if (res.success) {
        const response = res?.data;

        console.log('user login response::', response);

        rootStore.authStore.setToken(response?.token);
        rootStore.authStore.setUserId(response?.userId);
        rootStore.authStore.setIsSuperUser(response?.is_superuser);

        try {
          const getEmployeeByIdResponse = await authModel.getEmployeeById(
            response?.userId,
          );

          if (getEmployeeByIdResponse.success) {
            console.log('response token::', getEmployeeByIdResponse);
            rootStore.authStore.setUserDeatil(getEmployeeByIdResponse?.data);
            // navigation.navigate('Otp', {email});
            navigation.navigate('MainTabs');
          }
        } catch (error) {
          showToast(error.message);
        }
      }
    } catch (error) {
      showToast(error.message);
    } finally {
      updateState({isLoading: false}); // Set loading to false in all cases
    }
  };

  return {
    ...state,
    toastConfig,
    validateEmail,
    validatePassword,
    handleLogin,
    setIsEmailFocus: focus => updateState({isEmailFocus: focus}),
    setIsPassFocus: focus => updateState({isPassFocus: focus}),
    togglePasswordVisibility: () =>
      updateState({isPassShow: !state.isPassShow}),
  };
};
