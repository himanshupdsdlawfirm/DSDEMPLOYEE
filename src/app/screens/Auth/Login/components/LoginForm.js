import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import { UserInputText } from '../../../../../components/common/CustomInputText';
import { colors } from '../../../../config/theme';
import { CustomButton } from '../../../../../components/common/CustomButton';
import { AppImages } from '../../../../config/Images';

export const LoginForm = ({viewModel}) => {
  const isFormValid = viewModel.isEmailValid && viewModel.email !== '' && viewModel.isPassValid;

  return (
    <View style={styles.formContainer}>
      <UserInputText
        onChangeText={viewModel.validateEmail}
        value={viewModel.email}
        placeholderText="Enter your email"
        isvalid={viewModel.isEmailValid}
        inputBoxText="Email"
        rightImg={AppImages.mail}
        onFocus={() => viewModel.setIsEmailFocus(true)}
        onBlur={() => viewModel.setIsEmailFocus(false)}
        isEnterValue={viewModel.isEmailFocus}
        autoFocus={true}
        rightImgTintColor={
          viewModel.email.length > 0 && !viewModel.isEmailValid
            ? colors.redError
            : colors.white
        }
        inputStyle={{
          color:
            viewModel.email.length > 0 && !viewModel.isEmailValid
              ? colors.redError
              : colors.white,
        }}
        inputTextStyle={styles.emailInputText}
        inputTextContainerStyle={{
          borderColor:
            viewModel.email.length > 0 && !viewModel.isEmailValid
              ? colors.redError
              : colors.inputBorderColor,
        }}
      />

      <UserInputText
        onChangeText={viewModel.validatePassword}
        value={viewModel.password}
        placeholderText="Enter your password"
        inputBoxText="Password"
        isvalid={viewModel.isPassValid}
        rightImg={AppImages.key}
        isPassExist={true}
        passHideShowImg={viewModel.isPassShow ? AppImages.hide : AppImages.show}
        onFocus={() => viewModel.setIsPassFocus(true)}
        onBlur={() => viewModel.setIsPassFocus(false)}
        isEnterValue={viewModel.isPassFocus}
        passHideShowOnPress={viewModel.togglePasswordVisibility}
        isPassSecure={viewModel.isPassShow}
        inputTextStyle={styles.passwordInputText}
      />

      <CustomButton
        btnText="Login"
        btnOnPress={viewModel.handleLogin}
        isBtnEnable={isFormValid}
        isEnable={isFormValid}
        isLoadingTrue={viewModel.isLoading}
        btnViewStyle={styles.loginButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems:'center',
  },
  emailInputText: {
    backgroundColor: colors.themeBgColor,
    width: 70,
  },
  passwordInputText: {
    backgroundColor: colors.themeBgColor,
  },
  loginButton: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 20 : 40,
  },
});