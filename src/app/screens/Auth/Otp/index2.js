import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {topPadding} from '../../../config/CommonStyle';
import {AppImages} from '../../../config/Images';
import {useEffect, useRef, useState} from 'react';
import {moderateScale} from '../../../utils/fontsize';
import {colors} from '../../../config/theme';

const OtpScreen = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [otpError, setOtpError] = useState(false); // Add this to your state
  const [email, setEmail] = useState('himanshu@gmail.com');
  const [count, setCount] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    if (
      otp[0] != '' &&
      otp[1] != '' &&
      otp[2] != '' &&
      otp[3] != '' &&
      otp[4] != '' &&
      otp[5] != ''
    ) {
      // handleOTPVerification();
      navigation.navigate('MainTabs')
    }
  }, [
    otp[0] != '' &&
      otp[1] != '' &&
      otp[2] != '' &&
      otp[3] != '' &&
      otp[4] != '' &&
      otp[5] != '',
  ]);

  // Handle OTP pasting
  const handlePasteOTP = text => {
    if (text.length === 6) {
      const otpArray = text.split('');
      setOtp(otpArray); // Update OTP state
      otpRefs[5].current.focus(); // Move focus to the last field
    }
  };

  // Handle individual OTP input
  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next field if a digit is entered
    if (value && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  // Handle backspace press
  const handleBackspace = (index, value) => {
    const newOtp = [...otp];
    if (value === '') {
      // If the current field is empty, move focus to the previous field
      if (index > 0) {
        newOtp[index - 1] = ''; // Clear the previous field
        setOtp(newOtp);
        otpRefs[index - 1].current.focus();
      }
    } else {
      // If the current field has a digit, delete the digit
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  return (
    <ImageBackground
      source={AppImages.loginTheme}
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 8,
            width: '100%',
            justifyContent: 'center',
            zIndex: 1,
          }}>
          <View
            style={{
              marginTop: 20,
            }}>
            <Text style={styles.Verifytext}>Verify Email</Text>

            <View style={{padding: 20, alignItems: 'center'}}>
              <Text style={styles.text}>
                We have sent a verification code to
              </Text>
              <Text style={styles.textNum}>{email}</Text>
            </View>
            <View style={styles.OtpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={otpRefs[index]}
                  style={[
                    styles.otpInput, // Your existing styles
                    otpError && styles.otpInputError, // Add error styling
                  ]}
                  maxLength={index === 0 ? 6 : 1} // Allow pasting only in the first field
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={text => {
                    if (index === 0 && text.length === 6) {
                      handlePasteOTP(text); // Handle pasting in the first field
                    } else {
                      handleInputChange(index, text); // Handle individual input
                    }
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(index, digit); // Handle backspace press
                    }
                  }}
                />
              ))}
            </View>
            <View style={styles.smssection}>
              <Text style={styles.text}>Didn’t get the OTP? </Text>
              <Text
                style={styles.sendtext}
                onPress={() => setCount(30)}
                disabled={count === 0 ? false : true}>
                Resend SMS{' '}
              </Text>
              <Text style={styles.text}>in {count}sec</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  Verifytext: {
    fontSize: moderateScale(18),
    fontWeight: '400',
    color: colors.white,
    textAlign: 'center',
  },
  text: {
    fontSize: moderateScale(14),
    color: colors.white,
  },
  textNum: {
    fontSize: moderateScale(16),
    color: colors.white,
    fontWeight:'600'
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
    fontWeight:'600',
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
});
