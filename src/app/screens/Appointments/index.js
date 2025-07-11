import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {
  dropdownApoointmentOptions,
  dropdownOptions,
} from '../../config/StaticDataList';


const AppointmentsScreen = ({navigation}) => {
  const filterBottomSheetRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(1);

  const handleTabChange = useCallback(
    tab => {
      setSelectedItem(tab);

      // if (!selectedClient) return;

      // // Fetch data based on selected tab
      // switch (tab) {
      //   case 1: // Snapshot
      //     if (!clientDetails.snapshot) {
      //       fetchClientDetails(selectedClient.id, 'snapshot');
      //     }
      //     break;
      //   case 2: // Cases
      //     if (!clientDetails.cases) {
      //       fetchClientDetails(selectedClient.user, 'cases');
      //     }
      //     break;
      //   case 3: // Hearings
      //     if (!clientDetails.hearings) {
      //       fetchClientDetails(selectedClient.id, 'hearings');
      //     }
      //     break;
      //   default:
      //     break;
      // }
    },
    [selectedItem],
  );

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
              isSecondEndImg={true}
              isEndRightImg={true}
              isHeaderBottomText={false}
              isFilterShow={true}
              rightIcon={AppImages.filter}
              rightImgOnPress={openFilter}
            />
            <View style={styles.mainContainer}>
              <View style={styles.tabSelector}>
                <TouchableOpacity
                  onPress={() => handleTabChange(1)}
                  style={[
                    styles.tabButton,
                    selectedItem === 1 && styles.tabButtonActive,
                  ]}>
                  <Text style={styles.tabButtonText}>Open</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTabChange(2)}
                  style={[
                    styles.tabButton,
                    styles.tabButtonMiddle,
                    selectedItem === 2 && styles.tabButtonActive,
                  ]}>
                  <Text style={styles.tabButtonText}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTabChange(3)}
                  style={[
                    styles.tabButton,
                    selectedItem === 3 && styles.tabButtonActive,
                  ]}>
                  <Text style={styles.tabButtonText}>Past</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  mainContainer: {
    paddingHorizontal: 15,
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
    marginVertical: 30,
    paddingHorizontal: 15,
  },

  tabSelector: {
    width: '100%',
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderColor: colors.textGrayTwo,
    flexDirection: 'row',
  },
  tabButton: {
    width: '33.33%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonMiddle: {
    borderColor: colors.textGrayTwo,
  },
  tabButtonActive: {
    backgroundColor: colors.textGrayThree,
    borderRadius: 25,
    borderColor: colors.textGrayTwo,
    borderWidth: 1,
    shadowColor: colors.white,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  tabButtonText: {
    fontSize: responsiveSize(14),
    fontWeight: '400',
    color: colors.white,
  },
});

export default AppointmentsScreen;
