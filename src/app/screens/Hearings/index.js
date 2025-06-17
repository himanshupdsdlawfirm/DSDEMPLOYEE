import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import useApi from '../../hooks/useApi';
import {getUserProfile} from '../../services/uathServices';
import Loader from '../../../components/common/Loader';
import {AppImages} from '../../config/Images';
import {LinearGradientHeader} from '../../../components/common/LinerGradientHeader';
import {colors} from '../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveSize} from '../../utils/responsiveFontSize';
import FilterBottomSheet from '../../../components/common/FilterBottomSheet';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {dropdownOptions} from '../../config/StaticDataList';

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

const HearingsScreen = ({navigation}) => {
  const getUserApi = useApi(getUserProfile);

  // Create a ref for the bottom sheet
  const filterBottomSheetRef = useRef(null);

  useEffect(() => {
    getUserApi.request();
  }, []);

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
                  marginLeft: 10,
                  color: colors.white,
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
                  }}>
                  {'Dalbir Singh'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  overflow: 'hidden',
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
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: responsiveSize(22, 'font'),
                      fontWeight: '600',
                      color: colors.white,
                    }}>
                    {' •  '}
                  </Text>
                  {`${'Interest Based'}`}
                </Text>
              </View>
            </View>
          </LinearGradient>
          {/* Your item content */}
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  //  Function to open filter
  const openFilter = () => {
    filterBottomSheetRef.current?.present();
  };

  // Handle filter application
  const handleApplyFilters = filters => {
    console.log('Applied filters:', filters);
    // Apply your filters here
  };

  return (
    <View style={styles.container}>
      {getUserApi.loading ? (
        <Loader />
      ) : (
        <ImageBackground source={AppImages.loginTheme} style={styles.container}>
          <BottomSheetModalProvider>
            <LinearGradientHeader
              goBack={() => navigation.goBack()}
              showBackBtnContainer={true}
              showBackBtn={true}
              leftImg={AppImages.backIcon}
              leftImgTint={colors.white}
              headerText="Hearings"
              isSecondEndImg={false}
              isEndRightImg={false}
              isHeaderBottomText={false}
            />

            <TouchableOpacity
              onPress={openFilter}
              style={{
                width: '100%',
                paddingHorizontal: 15,
                marginTop: 20,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 24,
                  width: 24,
                  tintColor: colors.white,
                }}
                source={AppImages.filter}
              />
              <Text
                style={{
                  fontSize: responsiveSize(20, 'font'),
                  fontWeight: '600',
                  color: colors.white,
                  marginLeft: 10,
                  letterSpacing: 0.5,
                }}>
                Filter
              </Text>
            </TouchableOpacity>

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
            {/* Filter Component */}
            <FilterBottomSheet
              dropdownOptions={dropdownOptions}
              pickerOnePlaceholder={{label: 'Select case worker', value: null}}
              pickerTwoPlaceholder={{label: 'Select attorney', value: null}}
              pickerThreePlaceholder = {{label: 'Select hearing type', value: null}}
              pickerFourPlaceholder= {{label: 'Select schedule hearing', value: null}}
              ref={filterBottomSheetRef}
              onApply={handleApplyFilters}
              isDatePickerVisible={true}
              isDropdownOneVisible={true}
              isDropdownTwoVisible={true}
              isDropdownThreeVisible={true}
              isDropdownFourVisible={true}
              isTextInputOneVisible={false}
              isTextInputTwoVisible={true}
              secondInputPlaceholder="Enter judge name"
            />
          </BottomSheetModalProvider>
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
  hearingsList: {
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
});

export default HearingsScreen;
