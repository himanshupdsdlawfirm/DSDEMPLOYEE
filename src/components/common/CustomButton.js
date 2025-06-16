import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, scale} from '../../app/utils/fontsize';
import {colors} from '../../app/config/theme';

export const CustomButton = ({
  btnText,
  isLoadingTrue,
  btnViewStyle,
  btnOnPress,
  isEnable,
  isBtnEnable,
}) => {
  return (
    <View style={[styles.LinearGradientStyle, btnViewStyle]}>
      <LinearGradient
        colors={
          isEnable ? ['#00E9B6', '#00FFEC'] : [colors.gray, colors.lightGray]
        }
        locations={[0, 1]}
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0.5}}>
        <TouchableOpacity
          activeOpacity={isBtnEnable ? 0 : 0.8}
          style={styles.button}
          onPress={btnOnPress}>
          {isLoadingTrue ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{btnText}</Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  LinearGradientStyle: {
    height: 50,
    overflow: 'hidden',
    width: '100%',
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: colors.black,
    fontWeight: '600',
  },
});
