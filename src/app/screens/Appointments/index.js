import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import Loader from '../../../components/common/Loader';
import {AppImages} from '../../config/Images';
import {LinearGradientHeader} from '../../../components/common/LinerGradientHeader';
import {colors} from '../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveSize} from '../../utils/responsiveFontSize';
import FilterBottomSheet from '../../../components/common/FilterBottomSheet';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { dropdownApoointmentOptions, dropdownOptions } from '../../config/StaticDataList';

// const clientsData = [
//   {name: 'Himanshu', ClientImage: AppImages.userAnimyPlaceholder},
//   {name: 'Ankit', ClientImage: AppImages.userAnimyPlaceholder},
//   {name: 'Aditiya', ClientImage: AppImages.userAnimyPlaceholder},
//   {name: 'Ashish', ClientImage: AppImages.userAnimyPlaceholder},
//   {name: 'Himanshu', ClientImage: AppImages.userAnimyPlaceholder},
//   {name: 'Ankit', ClientImage: AppImages.userAnimyPlaceholder},
//   {name: 'Aditiya', ClientImage: AppImages.userAnimyPlaceholder},
//   {name: 'Ashish', ClientImage: AppImages.userAnimyPlaceholder},
// ];

const AppointmentsScreen = ({navigation}) => {
  const filterBottomSheetRef = useRef(null);

 
  //  Function to open filter
  const openFilter = () => {
    filterBottomSheetRef.current?.present();
  };

  // Handle filter application
  const handleApplyFilters = filters => {
    console.log('Applied filters:', filters);
    // Apply your filters here
  };

  const renderAppointments = ({item, index}) => {
    console.log('asasas::', index);

    return (
      <LinearGradient
        style={styles.appointmentContainer}
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
              fontSize: responsiveSize(24, 'font'),
              fontWeight: '600',
              color: colors.white,
              letterSpacing: 0.5,
            }}>
            {'Ranjan Kumar'}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              marginVertical: 10,
              fontSize: responsiveSize(16, 'font'),
              fontWeight: '400',
              color: colors.white,
              letterSpacing: 0.5,
            }}>
            {`${'26/01/2024'} ${'3:00 PM'} - ${'5:00 PM'}`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              width: '100%',
              flexWrap: 'wrap',
              gap: 15,
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                paddingVertical: 5,
                paddingHorizontal: 12,
                borderRadius: 6,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: responsiveSize(18, 'font'),
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
                borderRadius: 6,
                paddingVertical: 5,
                paddingHorizontal: 12,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: responsiveSize(18, 'font'),
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
                paddingVertical: 5,
                paddingHorizontal: 12,
                borderRadius: 6,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: responsiveSize(18, 'font'),
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

  return (
    <View style={styles.container}>
      {false ? (
        <Loader />
      ) : (
        <ImageBackground source={AppImages.loginTheme} style={styles.container}>
          <BottomSheetModalProvider>
            <LinearGradientHeader
              goBack={() => navigation.goBack()}
              showBackBtnContainer={true}
              showBackBtn={true}
              leftImg={AppImages.backArrow}
              leftImgTint={colors.white}
              headerText="Appointments"
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
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.appointmentList}
              showsVerticalScrollIndicator={false}
              data={[{}, {}, {}]}
              renderItem={renderAppointments}
            />

            {/* Filter Component */}
            <FilterBottomSheet
              dropdownOptions={dropdownApoointmentOptions}
              ref={filterBottomSheetRef}
              onApply={handleApplyFilters}
              pickerOnePlaceholder={{label: 'Select client', value: null}}
              pickerTwoPlaceholder={{label: 'Select payment mode', value: null}}
              isDatePickerVisible={false}
              isDropdownOneVisible={true}
              isDropdownTwoVisible={true}
              isDropdownThreeVisible={false}
              isDropdownFourVisible={false}
              isTextInputOneVisible={true}
              isTextInputTwoVisible={true}
              firstInputPlaceholder="Search Appointments..."
              secondInputPlaceholder="Transaction Id"
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
  appointmentContainer: {
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  appointmentSubContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 15,
  },
  appointmentList: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
});

export default AppointmentsScreen;
