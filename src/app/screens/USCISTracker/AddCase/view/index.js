// AddCaseScreen.js
import React, {useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../../../config/theme';
import {AppImages} from '../../../../config/Images';
import {moderateScale} from '../../../../utils/fontsize';
import {CustomButton} from '../../../../../components/common/CustomButton';
import {LinearGradientHeader} from '../../../../../components/common/LinerGradientHeader';
import {useAddCaseViewModel} from '../viewModel/addCaseViewModel';
import ToastNotification from '../../../../../components/common/CustomToast';

const AddCaseScreen = ({navigation}) => {
  const {
    caseNumber,
    caseName,
    error,
    loading,
    toastConfig,
    setCaseNumber,
    setCaseName,
    handleAddCase,
  } = useAddCaseViewModel();

  const handleSubmit = useCallback(async () => {
    const result = await handleAddCase();
    if (result?.success) {
      // navigation.navigate('CaseList', {caseData: result.data});
      navigation.goBack();
    }
  }, [handleAddCase, navigation]);

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
          isFilterShow={false}
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
              onChangeText={setCaseNumber}
              value={caseNumber}
              placeholder={'ABC1234567890'}
              maxLength={13}
              placeholderTextColor={error ? '#E06158' : colors.gray}
              autoCapitalize={'none'}
              autoFocus={true}
              returnKeyType={'next'}
              editable={!loading}
              keyboardType={'default'}
              style={[styles.textInput, error && styles.errorInput]}
            />
            <Text style={styles.inputLabel}>Case number</Text>
          </View>

          <TextInput
            onChangeText={setCaseName}
            value={caseName}
            placeholder={'Case Name (optional)'}
            placeholderTextColor={colors.gray}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            editable={!loading}
            keyboardType={'default'}
            style={[styles.caseNametextInput]}
          />

          {loading ? (
            <ActivityIndicator size="large" color={colors.white} />
          ) : (
            <CustomButton
              btnText="Add Case"
              btnOnPress={handleSubmit}
              isBtnEnable={!error && caseNumber.length >= 13}
              isEnable={!error && caseNumber.length >= 13}
              btnViewStyle={[
                styles.addButton,
                {
                  backgroundColor:
                    error || caseNumber.length < 13
                      ? colors.gray
                      : colors.themeTextColor,
                },
              ]}
            />
          )}
        </View>
      </ImageBackground>

      <ToastNotification
        visible={toastConfig.visible}
        title={toastConfig.title}
        message={toastConfig.message}
        colorLight={toastConfig.colorLight}
        colorDark={toastConfig.colorDark}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default AddCaseScreen;
