import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../app/config/theme';
import {moderateScale} from '../../app/utils/fontsize';

export const LinearGradientHeader = ({
  goBack,
  headerText,
  leftImg,
  rightIcon,
  isSecondEndImg,
  isEndRightImg,
  rightSecondImgOnPress,
  secondRightIcon,
  rightImgOnPress,
  showBackBtn,
  showBackBtnContainer,
  isHeaderBottomText,
  headerBottomTitle,
  leftImgTint,
  isHeaderWithoutGradient,
}) => {
  return (
    <>
      {isHeaderWithoutGradient ? (
        <View
          style={{
            width: '100%',
            paddingTop: 10,
            backgroundColor: colors.transparent,
          }}>
          <StatusBar
            backgroundColor={'transparent'}
            translucent
            barStyle="light-content"
          />
          <View
            style={{
              width: '100%',
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}>
            <View
              style={[
                style.containerHeaderFlex,
                {marginBottom: isHeaderBottomText ? 5 : 20},
              ]}>
              {showBackBtnContainer && (
                <View style={style.boxesA}>
                  {showBackBtn && (
                    <TouchableOpacity
                      onPress={goBack}
                      style={{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}>
                      <Image
                        source={leftImg}
                        style={{
                          height: 28,
                          width: 28,
                          resizeMode: 'contain',
                          //   alignSelf:'flex-start',
                          tintColor: (colors.white, leftImgTint),
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={style.boxesB}>
                <View style={style.headerbox}>
                  <Text style={style.header}>{headerText}</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: 90,
                }}>
                {isSecondEndImg && (
                  <View style={style.boxesC}>
                    <TouchableOpacity
                      style={[style.headerc, , {paddingRight: 20}]}
                      onPress={rightSecondImgOnPress}>
                      <Image
                        source={secondRightIcon}
                        style={{
                          height: 28,
                          width: 28,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {isEndRightImg && (
                  <View style={style.boxesC}>
                    <TouchableOpacity
                      style={style.headerc}
                      onPress={rightImgOnPress}>
                      <Image
                        source={rightIcon}
                        style={{
                          height: 28,
                          width: 28,
                          resizeMode: 'contain',
                          tintColor: colors.white,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            {isHeaderBottomText && (
              <Text
                style={[
                  style.caseTitle,
                  {
                    marginBottom: Platform.OS === 'android' ? 10 : 20,
                  },
                ]}>
                {headerBottomTitle}
              </Text>
            )}
          </View>
        </View>
      ) : (
        <LinearGradient
          colors={[colors.themeBgColor, colors.bottomTabLightGray]}
          locations={[0, 1]} // Smooth transition from dark to light
          start={{x: 0.5, y: 0}} // Start at the top-center
          end={{x: 0.5, y: 1}} // End at the bottom-center
          style={{
            width: '100%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingTop: 10,
          }}>
          <StatusBar
            backgroundColor={'transparent'}
            translucent
            barStyle="light-content"
          />
          <View
            style={{
              width: '100%',
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}>
            <View
              style={[
                style.containerHeaderFlex,
                {marginBottom: isHeaderBottomText ? 5 : 20},
              ]}>
              {showBackBtnContainer && (
                <View style={style.boxesA}>
                  {showBackBtn && (
                    <TouchableOpacity
                      onPress={goBack}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: colors.inputBorderColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={leftImg}
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: 'contain',
                          //   alignSelf:'flex-start',
                          tintColor: (colors.white, leftImgTint),
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={style.boxesB}>
                <View style={style.headerbox}>
                  <Text style={style.header}>{headerText}</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: 90,
                }}>
                {isSecondEndImg && (
                  <View style={style.boxesC}>
                    <TouchableOpacity
                      style={style.headerc}
                      onPress={rightSecondImgOnPress}>
                      <Image
                        source={secondRightIcon}
                        style={{
                          height: 16,
                          width: 16,
                          resizeMode: 'contain',
                          tintColor: colors.white,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {isEndRightImg && (
                  <View style={style.boxesC}>
                    <TouchableOpacity
                      style={style.headerc}
                      onPress={rightImgOnPress}>
                      <Image
                        source={rightIcon}
                        style={{
                          height: 16,
                          width: 16,
                          resizeMode: 'contain',
                          tintColor: colors.white,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            {isHeaderBottomText && (
              <Text
                style={[
                  style.caseTitle,
                  {
                    marginBottom: Platform.OS === 'android' ? 10 : 20,
                  },
                ]}>
                {headerBottomTitle}
              </Text>
            )}
          </View>
        </LinearGradient>
      )}
    </>
  );
};

const style = StyleSheet.create({
  containerHeaderFlex: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: Platform.OS === 'android' ? 30 : 30,
    paddingTop: Platform.OS === 'android' ? 10 : 10,
  },
  boxesA: {
    width: 90,
    justifyContent: 'center',
    paddingLeft: 15,
    height: 40,
  },
  boxesB: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxesC: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  headerbox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.themeTextColor,
  },
  headerc: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  caseTitle: {
    fontSize: moderateScale(14),
    paddingHorizontal: 10,
    color: colors.white,
    textAlign: 'center',
  },
});
