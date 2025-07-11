// features/auth/login/view/LoginScreen.js
import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { AppImages } from '../../../../config/Images';
import ToastNotification from '../../../../../components/common/CustomToast';
import { useLoginViewModel } from '../viewModel/LoginViewModel';
import { LoginHeader } from '../components/LoginHeader';
import { LoginForm } from '../components/LoginForm';

const LoginScreen = () => {
  const viewModel = useLoginViewModel();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'android' ? 30 : 0}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <LoginHeader />
          <LoginForm viewModel={viewModel} />
        </KeyboardAvoidingView>

        <ToastNotification
          visible={viewModel.toastConfig.visible}
          title="Login Error"
          message={viewModel.toastConfig.message}
          colorLight="#E06158"
          colorDark="#FC867D"
          icon={AppImages.warning}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default LoginScreen;