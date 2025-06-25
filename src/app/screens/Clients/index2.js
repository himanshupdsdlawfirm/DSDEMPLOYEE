import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import useApi from '../../hooks/useApi';
import Loader from '../../../components/common/Loader';
import {AppImages} from '../../config/Images';
import {LinearGradientHeader} from '../../../components/common/LinerGradientHeader';
import {colors} from '../../config/theme';
import {CommonActions, StackActions} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {moderateScale} from '../../utils/fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveSize} from '../../utils/responsiveFontSize';
import {GradientBorderHalfCircle} from '../../../components/common/LinearBorderColor';

const clientsData = [
  {name: 'Himanshu Pathak', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ankit', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Aditiya', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ashish', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Himanshu', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ankit', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Aditiya', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ashish', ClientImage: AppImages.userAnimyPlaceholder},
];

const ClientsScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const searchHandle = text => {
    setSearchText(text);
  };

  const renderClients = ({item, index}) => {
    const lastIndex = index === clientsData.length - 1;
    return (
      <TouchableOpacity style={[styles.clientItem]}>
        <View style={styles.clientImageContainer}>
          <Image source={item?.ClientImage} style={styles.clientImage} />
        </View>
        <View>
          <Text numberOfLines={1} style={styles.clientName}>
            {item?.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={AppImages.alienNumber}
              style={{
                height: 12,
                width: 12,
                tintColor: colors.white,
              }}
            />
            <Text numberOfLines={1} style={styles.clientId}>
              ABC2028937666
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 1,
                  height: 15,
                  marginHorizontal: 10,
                  backgroundColor: colors.white,
                }}
              />
              <Image
                source={AppImages.call}
                style={{
                  height: 12,
                  width: 12,
                  tintColor: colors.white,
                }}
              />
              <Text numberOfLines={1} style={styles.clientId}>
                +919540634090
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHearings = ({item, index}) => {
    return (
      <LinearGradient
        colors={[colors.hearingCardLinearOne, colors.hearingCardLinearTwo]}
        style={styles.hearingLinearCard}>
        <TouchableOpacity style={styles.hearingItem}>
          <LinearGradient
            style={{
              width: '100%',
              borderRadius: 8,
              paddingHorizontal: Platform.OS === 'android' ? 1 : 0,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            colors={['#384651', '#051422']}
            locations={[0, 1]}
            start={{x: 1, y: 0}}
            end={{x: 0.5, y: 0}}>
            <View
              style={{
                backgroundColor: colors.themeBgColor,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                width: Platform.OS === 'android' ? '100%' : '99%',
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 8,
                marginVertical: 1,
              }}>
              <Image
                source={AppImages.calendarClock}
                style={{
                  height: 15,
                  width: 15,
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: responsiveSize(14, 'font'),
                  fontWeight: '400',
                  flex: 1,
                  marginLeft: 5,
                  color: colors.white,
                  letterSpacing: 0.5,
                }}>
                {`${'04/24/2025'}  ${'11:45 AM'}`}
              </Text>
            </View>
          </LinearGradient>
          <Text
            numberOfLines={1}
            style={{
              fontSize: responsiveSize(20, 'font'),
              fontWeight: '400',
              marginTop: 10,
              marginHorizontal: 10,
              color: colors.themeTextColor,
              letterSpacing: 0.5,
            }}>
            {'Himanshu Pathak'}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: responsiveSize(18, 'font'),
              fontWeight: '400',
              marginHorizontal: 10,
              color: colors.textGray,
              letterSpacing: 0.5,
            }}>
            {'ABC8917719736'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Image
              source={AppImages.locationCheck}
              style={{
                height: 16,
                width: 16,
                tintColor: colors.sheildIconColor,
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: responsiveSize(19, 'font'),
                fontWeight: '400',
                marginHorizontal: 10,
                color: colors.textGray,
                letterSpacing: 0.5,
              }}>
              {'Federal Plaza'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <Image
              style={{
                height: 16,
                width: 16,
                tintColor: colors.sheildIconColor,
              }}
              source={AppImages.userShield}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: responsiveSize(19, 'font'),
                fontWeight: '400',
                marginHorizontal: 10,
                color: colors.textGray,
                letterSpacing: 0.5,
              }}>
              {'Dalbir Singh'}
            </Text>
          </View>
          <LinearGradient
            style={{
              width: '100%',
              borderRadius: 12,
              marginTop: 10,
              paddingHorizontal: Platform.OS === 'android' ? 1 : 0,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            colors={['#384651', '#051422']}
            locations={[0, 1]}
            start={{x: 1, y: 0}}
            end={{x: 0.5, y: 0}}>
            <View
              style={{
                // flex:1,
                width: Platform.OS === 'android' ? '100%' : '99%',
                borderRadius: 11,
                backgroundColor: colors.themeBgColor,
                alignSelf: 'center',
                padding: 10,
                marginVertical: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: 22,
                    width: 22,
                  }}
                  source={AppImages.userAnimyPlaceholder}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: responsiveSize(20, 'font'),
                    fontWeight: '600',
                    marginHorizontal: 10,
                    color: colors.white,
                    letterSpacing: 0.5,
                  }}>
                  {'Dalbir Singh'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  overflow: 'hidden',
                  marginTop: 5,
                }}>
                <Image
                  style={{
                    height: 18,
                    width: 18,
                  }}
                  resizeMode="contain"
                  source={AppImages.ihIcon}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: responsiveSize(19, 'font'),
                    fontWeight: '400',
                    marginLeft: 5,
                    color: colors.textGray,
                    letterSpacing: 0.5,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: responsiveSize(22, 'font'),
                      fontWeight: '600',
                      color: colors.white,
                      letterSpacing: 0.5,
                    }}>
                    {' •  '}
                  </Text>
                  {`${'Internet Based'}`}
                </Text>
              </View>
            </View>
          </LinearGradient>
          {/* Your item content */}
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      {false ? (
        <Loader />
      ) : (
        <ImageBackground source={AppImages.loginTheme} style={styles.container}>
          <LinearGradientHeader
            goBack={() => navigation.goBack()}
            showBackBtnContainer={true}
            showBackBtn={true}
            leftImg={AppImages.backArrow}
            leftImgTint={colors.white}
            headerText="Clients"
            isSecondEndImg={false}
            isEndRightImg={false}
            isHeaderBottomText={false}
          />
          <View style={styles.searchMainContainer}>
            <View style={styles.searchContainer}>
              <Image source={AppImages.searchIcon} style={styles.searchIcon} />
              <TextInput
                onChangeText={searchHandle}
                value={searchText}
                placeholder="Search"
                placeholderTextColor={colors.gray}
                onFocus={console.log('shkjasdkakjdgjak::::::::')}
                onBlur={() => {
                  Keyboard.dismiss();
                }}
                style={styles.searchInput}
              />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Clients</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.clientsList}
            showsHorizontalScrollIndicator={false}
            data={clientsData}
            renderItem={renderClients}
          />
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 100,
    // flex:1,
  },
  searchMainContainer: {
    paddingHorizontal: 15,
    marginTop:30,
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.bottomTabLightGray,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    alignSelf: 'center',
    height: 42,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
  },

  searchIcon: {
    height: 24,
    width: 24,
  },
  searchText: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray,
  },
  sectionContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientsList: {
    paddingBottom: 40,
    paddingTop: 10,
    // paddingHorizontal: 15,
  },
  clientItem: {
    width: 110,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  clientImageContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.themeTextColor,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  clientImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: colors.imageBorderColor,
    borderWidth: 2,
  },
  clientName: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientId: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    width: 120,
    textAlign: 'center',
    color: colors.textGray,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
});

export default ClientsScreen;
