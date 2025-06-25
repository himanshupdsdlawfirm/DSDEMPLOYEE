import React, {useEffect, useRef} from 'react';
import {
  ImageBackground,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import useOtpViewModel from './viewModel/useOtpViewModel';
import {AppImages} from '../../../config/Images';
import {moderateScale} from '../../../utils/fontsize';
import {colors} from '../../../config/theme';

const OtpScreen = ({navigation}) => {
  const {
    state: {otp, otpError, count, email},
    handlers: {handlePasteOTP, handleInputChange, handleBackspace, resendOtp},
  } = useOtpViewModel();

  const otpRefs = useRef([]);

  // Focus management functions
  const focusNextField = index => {
    if (index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  const focusPrevField = index => {
    if (index > 0 && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1].focus();
    }
  };

  // Auto-submit when all fields are filled
  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      navigation.navigate('MainTabs');
    }
  }, [otp, navigation]);

  return (
    <ImageBackground source={AppImages.loginTheme} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.verifytext}>Verify Email</Text>

        <View style={styles.textContainer}>
          <Text style={styles.text}>We have sent a verification code to</Text>
          <Text style={styles.textNum}>{email}</Text>
        </View>

        <View style={styles.OtpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (otpRefs.current[index] = ref)}
              style={[styles.otpInput, otpError && styles.otpInputError]}
              maxLength={index === 0 ? 6 : 1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={text => {
                if (index === 0 && text.length === 6) {
                  handlePasteOTP(text);
                  otpRefs.current[5].focus();
                } else {
                  handleInputChange(index, text, () => focusNextField(index));
                }
              }}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index, digit, () => focusPrevField(index));
                }
              }}
            />
          ))}
        </View>

        <View style={styles.smssection}>
          <Text style={styles.text}>Didn't get the OTP? </Text>
          <Pressable onPress={resendOtp} disabled={count > 0}>
            <Text style={[styles.sendtext, count > 0 && {opacity: 0.5}]}>
              Resend SMS
            </Text>
          </Pressable>
          <Text style={styles.text}> in {count}sec</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

// Aapke original styles yahan rahenge
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  verifytext: {
    fontSize: moderateScale(18),
    fontWeight: '400',
    color: colors.white,
    textAlign: 'center',
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(14),
    color: colors.white,
  },
  textNum: {
    fontSize: moderateScale(16),
    color: colors.white,
    fontWeight: '600',
  },
  sendtext: {
    fontSize: moderateScale(14),
    color: colors.themeTextColor,

    fontWeight: '700',
  },
  OtpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: moderateScale(20),
    width: '100%',
    gap: moderateScale(13), // Use responsive gap
  },
  otpInput: {
    width: moderateScale(40), // Use responsive width
    height: moderateScale(40), // Use responsive height
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: moderateScale(15),
    color: colors.black,
    fontWeight: '600',
    backgroundColor: colors.lightGray,
  },

  smssection: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInputError: {
    borderColor: '#E06158',
    backgroundColor: '#FC867D20', // Light red background
  },
  // ... baki styles aapke original code ke hisaab se
});

export default OtpScreen;
