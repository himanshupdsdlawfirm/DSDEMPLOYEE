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
import {getUserProfile} from '../../services/uathServices';
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
  {name: 'Himanshu', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ankit', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Aditiya', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ashish', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Himanshu', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ankit', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Aditiya', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ashish', ClientImage: AppImages.userAnimyPlaceholder},
];

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const getUserApi = useApi(getUserProfile);

  useEffect(() => {
    getUserApi.request();
  }, []);

  const renderAppointments = ({item, index}) => {
    console.log('asasas::', index);

    const lastIndex = index === clientsData.length - 1;
    return (
      <LinearGradient
        style={[
          styles.appointmentContainer,
          {
            marginLeft: index === 0 ? 0 : 10,
            marginRight: lastIndex ? 0 : 10,
          },
        ]}
        colors={['#F7A80E', '#114A4A', '#21415F']}
        start={{x: 1, y: 1}}
        end={{x: 0.4, y: 0}} // Left to right
        locations={[0, 0.6, 1]}
        // angle={}
        useAngle={false}>
        <TouchableOpacity style={styles.appointmentSubContainer}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: responsiveSize(20, 'font'),
              fontWeight: '600',
              color: colors.white,
              letterSpacing: 0.5,
            }}>
            {'Ranjan Kumar'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems:'center'
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
                marginVertical: 10,
                fontSize: responsiveSize(12, 'font'),
                fontWeight: '400',
                color: colors.white,
                marginLeft: 5,
                letterSpacing: 0.5,
              }}>
              {`${'26/01/2024'} ${'3:00 PM'} - ${'5:00 PM'}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              width: '100%',
              flexWrap: 'wrap',
              gap: 7,
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 10,
                paddingVertical:5,
                borderRadius: 6,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: responsiveSize(14, 'font'),
                  fontWeight: '400',
                  color: colors.black,
                  letterSpacing: 0.5,
                }}>
                {`${'Immigration'}`}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 10,
                paddingVertical:5,
                borderRadius: 6,
                marginHorizontal: 0,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: responsiveSize(14, 'font'),
                  fontWeight: '400',
                  color: colors.black,
                  letterSpacing: 0.5,
                }}>
                {`${'3'} ${'Guest'}`}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 10,
                paddingVertical:5,
                borderRadius: 6,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: responsiveSize(14, 'font'),
                  fontWeight: '400',
                  color: colors.black,
                  letterSpacing: 0.5,
                }}>
                {`${'online'}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const renderClients = ({item, index}) => {
    const lastIndex = index === clientsData.length - 1;
    return (
      <TouchableOpacity
        style={[
          styles.clientItem,
          {
            marginLeft: index === 0 ? 0 : 5,
            marginRight: lastIndex ? 0 : 5,
          },
        ]}>
        <View style={styles.clientImageContainer}>
          <Image source={item?.ClientImage} style={styles.clientImage} />
        </View>
        <Text numberOfLines={2} style={styles.clientName}>
          {item?.name}
        </Text>
        <Text numberOfLines={1} style={styles.clientId}>
          ABC2028937666
        </Text>
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
      {getUserApi.loading ? (
        <Loader />
      ) : (
        <ImageBackground source={AppImages.loginTheme} style={styles.container}>
          <LinearGradientHeader
            isHeaderWithoutGradient={true}
            goBack={() => navigation.toggleDrawer()}
            showBackBtnContainer={true}
            showBackBtn={true}
            leftImg={AppImages.drawerMenu}
            leftImgTint={colors.white}
            headerText="Home"
            isSecondEndImg={true}
            isEndRightImg={true}
            secondRightIcon={AppImages.userAnimyPlaceholder}
            rightIcon={AppImages.notification}
            isHeaderBottomText={false}
            headerBottomTitle={`Refreshed: ${new Date().toLocaleString()}`}
          />

          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              style={styles.searchButton}>
              <Image source={AppImages.searchIcon} style={styles.searchIcon} />
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Clients</Text>
              <TouchableOpacity>
                <Text style={styles.sectionViewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.clientsList}
              showsHorizontalScrollIndicator={false}
              data={clientsData}
              renderItem={renderClients}
            />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Appointments</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AppointmentList')}>
                <Text style={styles.sectionViewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.appointmentList}
              showsHorizontalScrollIndicator={false}
              data={[{}, {}, {}]}
              renderItem={renderAppointments}
            />

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Hearings</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('HearingList')}>
                <Text style={styles.sectionViewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.hearingsList}
              columnWrapperStyle={styles.hearingsColumnWrapper}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // Important when nested in ScrollView
              data={[{}, {}, {}]}
              renderItem={renderHearings}
            />
          </ScrollView>
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
  searchContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  searchButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
    backgroundColor: colors.bottomTabLightGray,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    alignSelf: 'center',
    height: 42,
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
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  sectionViewAll: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.themeTextColor,
  },
  appointmentContainer: {
    width: responsiveSize(240),
    borderRadius: 12,
    alignItems: 'center',
  },
  appointmentSubContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 15,
  },
  appointmentList: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  clientsList: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  clientItem: {
    width: 110,
    alignItems: 'center',
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
    textAlign: 'center',
    marginTop: 5,
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientId: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    textAlign: 'center',
    color: colors.textGray,
    letterSpacing: 0.5,
  },
  hearingsList: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  hearingsColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  hearingLinearCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowColor: colors.borderColor,
  },
  hearingItem: {
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
});

export default HomeScreen;
