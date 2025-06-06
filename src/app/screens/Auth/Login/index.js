import React, {useState} from 'react';
import {
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {useAuth} from '../../../context';
import {AppImages} from '../../../config/Images';
import {UserInputText} from '../../../../components/common/CustomInputText';
import ToastNotification from '../../../../components/common/CustomToast';
import {colors} from '../../../config/theme';
import CustomHeader from '../../../../components/common/CustomHeader';
import {CustomButton} from '../../../../components/common/CustomButton';
import {topMargin, topPadding} from '../../../config/CommonStyle';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, loading} = useAuth();
  const [isValid, setIsvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);
  const [isPassShow, setIsPassShow] = useState(false);

  console.log('isPassFocusisPassFocus::', isPassFocus);

  const showToast = message => {
    setErrorMsg(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const validationCheck = text => {
    setEmail(text);
    const EmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (EmailRegex.test(text)) {
      setIsvalid(true);
    } else {
      setIsvalid(false);
    }
  };

  const handleLogin = async () => {
    if (!email || email == '') {
      setIsvalid(true);
      showToast('Please enter valid email receipt number');
    } else {
      setIsvalid(false);
      try {
        await signIn({email, password});
      } catch (error) {
        Alert(error.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      style={styles.scrollView}
      onPress={() => Keyboard.dismiss()}>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <CustomHeader
          leftImageSource={AppImages.backArrow}
          leftImageContainerStyle={{
            with: 44,
            height: 44,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.inputBorderColor,
            backgroundColor: '#061623',
          }}
          onLeftPress={() => console.log('Left pressed')}
          headerStyle={{
            backgroundColor: 'transparent',
          }}
        />

        <Text style={styles.title}>Login</Text>
        <UserInputText
          onChangeText={e => validationCheck(e)}
          value={email}
          placeholderText={'Enter your email'}
          isvalid={isValid}
          inputBoxText={'Email'}
          rightImg={AppImages.mail}
          onFocus={() => setIsEmailFocus(true)}
          onBlur={() => setIsEmailFocus(false)}
          isEnterValue={isEmailFocus}
          autoFocus={true}
          inputTextStyle={{
            backgroundColor: colors.themeBgColor,
            width: 70,
            borderColor: isValid ? 'red' : colors.inputBorderColor,
          }}
        />
        <UserInputText
          onChangeText={e => setPassword(e)}
          value={password}
          placeholderText={'Enter your password'}
          inputBoxText={'Password'}
          isvalid={isValid}
          rightImg={AppImages.key}
          isPassExist={true}
          passHideShowImg={isPassShow ? AppImages.hide : AppImages.show}
          onFocus={() => setIsPassFocus(true)}
          onBlur={() => setIsPassFocus(false)}
          isEnterValue={isPassFocus}
          passHideShowOnPress={() => {
            setIsPassShow(!isPassShow);
          }}
          isPassSecure={isPassShow}
          inputTextStyle={{
            backgroundColor: colors.themeBgColor,
          }}
        />
        <CustomButton
          btnText={'Login'}
          btnOnPress={() => {}}
          btnViewStyle={{
            position: 'absolute',
            bottom: Platform.OS === 'android' ? 20 : 40,
          }}
        />

        <ToastNotification
          visible={toastVisible}
          title="Invalid Input"
          message={errorMsg}
          colorLight={'#E06158'}
          colorDark={'#FC867D'}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: topPadding(),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 30,
    textAlign: 'left',
    color: colors.white,
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
  },
  footerLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
