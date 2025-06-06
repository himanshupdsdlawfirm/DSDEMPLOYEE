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
import { AppImages } from '../../../config/Images';

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
       <ImageBackground source={AppImages.themeFive} style={styles.container}>
        <Text style={styles.title}>Track Case</Text>

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
            style={[styles.textInput]}
          />

          <TouchableOpacity
            onPress={validFeilds}
            style={[
              styles.addButton,
              {
                backgroundColor:
                  !caseNumber || caseNumber.length < 13 ? colors.gray : colors.themeColor,
              },
            ]}>
            <Text style={styles.addButtonText}>Add Case</Text>
          </TouchableOpacity>
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
    paddingVertical: 10,
    paddingTop:50,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: colors.themeColor,
  },
  descriptionContainer: {
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  descriptionTitle: {
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  descriptionText: {
    justifyContent: 'center',
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
    textAlign: 'center',
  },
  noteText: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 3,
    fontSize: 14,
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
    height: 50,
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    paddingTop:15,
    borderColor: colors.white,
    marginBottom: 20,
  },
  errorInput: {
    color: '#E06158',
    borderColor: '#E06158',
  },
  inputLabel: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '400',
    position: 'absolute',
    textAlign: 'center',
    width: 110,
    height: 24,
    borderRadius:12,
    backgroundColor: '#333333',
    top: 0,
    left: 11,
  },
  addButton: {
    width: '100%',
    height: 40,
    marginTop: 10,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default AddCaseScreen;
