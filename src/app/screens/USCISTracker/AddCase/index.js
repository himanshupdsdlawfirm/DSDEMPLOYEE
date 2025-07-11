import React, {useRef, useCallback, useState} from 'react';
import {View, Text, StyleSheet, TextInput, ImageBackground} from 'react-native';
import {colors} from '../../../config/theme';
import ToastNotification from '../../../../components/common/CustomToast';
import {AppImages} from '../../../config/Images';
import {moderateScale} from '../../../utils/fontsize';
import {CustomButton} from '../../../../components/common/CustomButton';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';
import {AddCaseViewModel} from './viewModel/addCaseViewModel';

const AddCaseScreen = ({navigation}) => {
  const viewModel = useRef(new AddCaseViewModel()).current;

  const triggerUpdate = () => forceUpdate(prev => !prev);

  const [_, forceUpdate] = useState(false);
  const [isLoderOn, setLoderOn] = useState(false);

  const handleAddCase = async () => {
    setLoderOn(true)
    const result = await viewModel.addCase();

    console.log('result::', result);

    forceUpdate(prev => !prev); // Trigger re-render

    if (result.success) {
      navigation.navigate('CaseList', {caseData: result.data});
       setLoderOn(false);
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
              onChangeText={text => {
                viewModel.setCaseNumber(text);
                triggerUpdate(); // Notify View to update
              }}
              value={viewModel.caseNumber}
              placeholder={'ABC1234567890'}
              maxLength={13}
              placeholderTextColor={viewModel.error ? '#E06158' : colors.gray}
              autoCapitalize={'none'}
              autoFocus={true}
              returnKeyType={'next'}
              editable={true}
              keyboardType={'default'}
              style={[styles.textInput, viewModel.error && styles.errorInput]}
            />
            <Text style={styles.inputLabel}>Case number</Text>
          </View>

          <TextInput
            onChangeText={viewModel.setCaseName}
            value={viewModel.caseName}
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
            btnOnPress={handleAddCase}
            isBtnEnable={!viewModel.error && viewModel.caseNumber.length >= 13}
            isEnable={!viewModel.error && viewModel.caseNumber.length >= 13}
            isLoadingTrue = {isLoderOn}
            btnViewStyle={[
              styles.addButton,
              {
                backgroundColor:
                  viewModel.error || viewModel.caseNumber.length < 13
                    ? colors.gray
                    : colors.themeColor,
              },
            ]}
          />
        </View>
      </ImageBackground>

      <ToastNotification
        visible={viewModel.toastVisible}
        title="Invalid Input"
        message={viewModel.error}
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
