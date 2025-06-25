import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {colors} from '../../../config/theme';
import ToastNotification from '../../../../components/common/CustomToast';
import {AppImages} from '../../../config/Images';
import {topMarginText, topPadding} from '../../../config/CommonStyle';
import {moderateScale} from '../../../utils/fontsize';
import {CustomButton} from '../../../../components/common/CustomButton';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';

const AddCaseScreen = ({navigation}) => {
  const [caseNumber, setCaseNumber] = useState(0);
  const [caseName, setCaseName] = useState('');
  const [isvalid, setIsvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = message => {
    setErrorMsg(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const validFeilds = () => {
    if (!caseNumber || caseNumber.length < 13) {
      setIsvalid(true);
      showToast('Please enter USCIS receipt number');
    } else {
      setIsvalid(false);
      navigation.goBack();
    }
  };

  return (
    <>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <LinearGradientHeader
          goBack={() => navigation.goBack()}
          showBackBtnContainer={true}
          showBackBtn={true}
          leftImg={AppImages.backArrow}
          leftImgTint={colors.white}
          headerText="Case Track"
          isSecondEndImg={false}
          isEndRightImg={false}
          isHeaderBottomText={false}
          headerBottomTitle={`Refreshed: ${new Date().toLocaleString()}`}
        />

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>
            Enter USCIS receipt number
          </Text>
          <Text style={styles.descriptionText}>
            The receipt number is your unique 13-character identifier
          </Text>
          <Text style={styles.noteText}>
            Omit dashes (-) when entering a receipt number. However, you can
            include all other characters, including asterisks (*), if they are
            listed on your notice as part of the receipt number.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={e => setCaseNumber(e)}
              value={caseNumber}
              placeholder={'ABC1234567890'}
              maxLength={13}
              placeholderTextColor={isvalid ? '#E06158' : colors.gray}
              autoCapitalize={'none'}
              autoFocus={true}
              returnKeyType={'next'}
              editable={true}
              keyboardType={'default'}
              style={[styles.textInput, isvalid && styles.errorInput]}
            />
            <Text style={styles.inputLabel}>Case number</Text>
          </View>

          <TextInput
            onChangeText={e => {
              let fullNameRegex = e.replace(/[^a-zA-Z\s]/g, '');
              setCaseName(fullNameRegex);
            }}
            value={caseName}
            placeholder={'Case Name (optional)'}
            placeholderTextColor={colors.gray}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            editable={true}
            keyboardType={'default'}
            style={[styles.caseNametextInput]}
          />

          <CustomButton
            btnText="Add Case"
            btnOnPress={validFeilds}
            isBtnEnable={!caseNumber || caseNumber.length < 13 ? false : true}
            isEnable={!caseNumber || caseNumber.length < 13 ? false : true}
            btnViewStyle={[
              styles.addButton,
              {
                backgroundColor:
                  !caseNumber || caseNumber.length < 13
                    ? colors.gray
                    : colors.themeColor,
              },
            ]}
          />
        </View>
      </ImageBackground>

      <ToastNotification
        visible={toastVisible}
        title="Invalid Input"
        message={errorMsg}
        colorLight={'#E06158'}
        colorDark={'#FC867D'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    justifyContent: 'center',
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.themeTextColor,
  },
  descriptionContainer: {
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  descriptionTitle: {
    justifyContent: 'center',
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  descriptionText: {
    justifyContent: 'center',
    marginVertical: 5,
    fontSize: moderateScale(14),
    paddingHorizontal: 15,
    fontWeight: '400',
    color: colors.white,
    textAlign: 'center',
  },
  noteText: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 3,
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.white,
    textAlign: 'left',
  },
  inputContainer: {
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
  },
  textInput: {
    color: colors.white,
    width: '100%',
    height: 55,
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    paddingTop: 15,
    borderColor: colors.white,
    marginBottom: 20,
  },
  caseNametextInput: {
    color: colors.white,
    width: '100%',
    height: 55,
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.white,
    marginBottom: 20,
  },
  errorInput: {
    color: '#E06158',
    borderColor: '#E06158',
  },
  inputLabel: {
    fontSize: moderateScale(12),
    color: colors.white,
    fontWeight: '400',
    position: 'absolute',
    textAlign: 'center',
    paddingVertical: 6,
    width: 110,
    borderRadius: 12,
    backgroundColor: '#333333',
    top: 0,
    left: 11,
  },
  addButton: {
    backgroundColor: 'transparent',
  },
  addButtonText: {
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
  },
});

export default AddCaseScreen;
