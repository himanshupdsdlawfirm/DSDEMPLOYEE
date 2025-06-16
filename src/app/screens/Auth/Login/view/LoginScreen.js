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

const LoginScreen = ({navigation}) => {
  const viewModel = useLoginViewModel(navigation);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset = {Platform.OS === 'android' && 30}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <LoginHeader />
          <LoginForm viewModel={viewModel} />
        </KeyboardAvoidingView>

        <ToastNotification
          visible={viewModel.toastVisible}
          title="Invalid Input"
          message={viewModel.errorMsg}
          colorLight="#E06158"
          colorDark="#FC867D"
          icon = {AppImages.warning}
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