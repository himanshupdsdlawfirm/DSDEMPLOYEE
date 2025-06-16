import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {colors} from '../../app/config/theme';

export const UserInputText = ({
  props,
  isvalid,
  inputBoxText,
  value,
  placeholderText,
  onChangeText,
  inputStyle,
  inputTextStyle,
  maxLength,
  rightImg,
  isPassExist,
  passHideShowImg,
  passHideShowOnPress,
  isEnterValue,
  onFocus,
  onBlur,
  autoFocus,
  isPassSecure,
  inputTextContainerStyle,
  rightImgTintColor
}) => {
  console.log('isEnterValue::', isEnterValue);

  return (
    <View style={styles.inputWrapper}>
      <View style={[styles.inputContainer, inputTextContainerStyle]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%',
          }}>
          {!isEnterValue && (
            <Image
              source={rightImg}
              style={{
                height: 24,
                width: 24,
                tintColor:rightImgTintColor
              }}
            />
          )}
          <TextInput
            {...props}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholderText}
            maxLength={maxLength}
            placeholderTextColor={colors.gray}
            autoCapitalize={'none'}
            autoFocus={autoFocus}
            returnKeyType={'next'}
            editable={true}
            keyboardType={'default'}
            secureTextEntry = {isPassSecure}
            style={[styles.textInput, inputStyle]}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {isPassExist && (
            <TouchableOpacity onPress={passHideShowOnPress}>
              <Image
                source={passHideShowImg}
                style={{
                  height: 20,
                  width: 20,
                  tintColor:colors.white
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isEnterValue && (
        <Text style={[styles.inputLabel, inputTextStyle]}>{inputBoxText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    backgroundColor: colors.inputBgColor,
    borderColor: colors.inputBorderColor,
    marginBottom: 20,
  },
  textInput: {
    color: colors.white,
    flex: 1,
    height: 55,
    paddingHorizontal: 15,
  },
  errorInput: {
    color: '#E06158',
    borderColor: '#E06158',
  },
  inputLabel: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '400',
    position: 'absolute',
    textAlign: 'center',
    paddingTop:2,
    width: 95,
    height:24,
    borderRadius:11,
    backgroundColor:colors.themeTextColor,
    top: 0,
    left: 11,
  },
});
