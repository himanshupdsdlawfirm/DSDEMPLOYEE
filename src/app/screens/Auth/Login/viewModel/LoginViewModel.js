// features/auth/login/viewModel/LoginViewModel.js
import {useState} from 'react';
import {AuthModel} from '../model/AuthModel';
import {useAuth} from '../../../../context';

export const useLoginViewModel = (navigation) => {
  console.log('navigation::', navigation);
  
  const authContext = useAuth();
  const authModel = new AuthModel(authContext);

  const [state, setState] = useState({
    email: '',
    password: '',
    isEmailValid: false,
    isPassValid: false,
    errorMsg: '',
    toastVisible: false,
    isEmailFocus: false,
    isPassFocus: false,
    isPassShow: false,
    loading: false,
  });

  const updateState = updates => setState(prev => ({...prev, ...updates}));

  const showToast = message => {
    updateState({errorMsg: message, toastVisible: true});
    setTimeout(() => updateState({toastVisible: false}), 3000);
  };

  const validateEmail = email => {
    const isEmailValid = authModel.validateEmail(email);
    updateState({email, isEmailValid});
  };

  const validatePassword = password => {
    const isPassValid = authModel.validatePassword(password);
    updateState({password, isPassValid});
  };

  const handleLogin = async () => {

      navigation.navigate('Otp', state.email)
    // if (state.email && state.password.length > 3) {
    //   updateState({loading: true});

    //   const result = await authModel.signIn({
    //     email: state.email,
    //     password: state.password,
    //   });

    //   // updateState({loading: false});

    //   // if (!result.success) {
    //   //   showToast('result.error');
    //   // }
    // }
  };

  return {
    ...state,
    validateEmail,
    validatePassword,
    handleLogin,
    showToast,
    setIsEmailFocus: focus => updateState({isEmailFocus: focus}),
    setIsPassFocus: focus => updateState({isPassFocus: focus}),
    togglePasswordVisibility: () =>
      updateState({isPassShow: !state.isPassShow}),
  };
};
