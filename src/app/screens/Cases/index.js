import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import Loader from '../../../components/common/Loader';
import {AppImages} from '../../config/Images';
import {LinearGradientHeader} from '../../../components/common/LinerGradientHeader';
import {colors} from '../../config/theme';
import {moderateScale} from '../../utils/fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveSize} from '../../utils/responsiveFontSize';
import {useFocusEffect} from '@react-navigation/native';
import FilterBottomSheet from '../../../components/common/FilterBottomSheet';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {dropdownOptions} from '../../config/StaticDataList';

const dummyClientsData = [
  {
    id: 1,
    case_type_name: 'Asylum',
    status: 'Open',
    contract_amount: 200,
    total_paid: 50,
    remaining_amount: 150,
    filing_date: '20-04-2024',
  },
  {
    id: 2,
    case_type_name: 'Asylum',
    status: 'Closed',
    contract_amount: 200,
    total_paid: 50,
    remaining_amount: 150,
    filing_date: '20-04-2024',
  },
  {
    id: 3,
    case_type_name: 'Asylum',
    status: 'Open',
    contract_amount: 200,
    total_paid: 50,
    remaining_amount: 150,
    filing_date: '20-04-2024',
  },
  {
    id: 4,
    case_type_name: 'Asylum',
    status: 'Open',
    contract_amount: 200,
    total_paid: 50,
    remaining_amount: 150,
    filing_date: '20-04-2024',
  },
  {
    id: 5,
    case_type_name: 'Asylum',
    status: 'Closed',
    contract_amount: 200,
    total_paid: 50,
    remaining_amount: 150,
    filing_date: '20-04-2024',
  },
  {
    id: 6,
    case_type_name: 'Asylum',
    status: 'Open',
    contract_amount: 200,
    total_paid: 50,
    remaining_amount: 150,
    filing_date: '20-04-2024',
  },
];

const CasesScreen = ({navigation, route}) => {
  const {backScreen = undefined} = route?.params || {};

  const [searchText, setSearchText] = useState('');
  const [scrollOffset, setScrollOffset] = useState(0);

  // Create a ref for the bottom sheet
  const filterBottomSheetRef = useRef(null);
  const scrollRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      filterBottomSheetRef.current.dismiss();
      scrollRef.current.scrollToOffset({
        offset: scrollOffset,
        animated: true,
      });
      return () => {};
    }, []),
  );

  const formattedDate = useCallback(item => {
    if (item) {
      const dateObj = new Date(item + 'T00:00:00');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const year = String(dateObj.getFullYear()).slice(-2);
      return `${month}-${day}-${year}`;
    }
    return '-- -- --';
  }, []);

  //  Function to open filter
  const openFilter = () => {
    filterBottomSheetRef.current?.present();
  };

  // Handle filter application
  const handleApplyFilters = filters => {
    console.log('Applied filters:', filters);
    // Apply your filters here
  };

  const renderCases = ({item, index}) => {
    return (
      <View key={item?.id} style={styles.caseCardContainer}>
        <LinearGradient
          colors={[colors.bottomTabLightGray, colors.textGray]}
          locations={[0, 1]}
          start={{x: 0.1, y: 0}}
          end={{x: 1, y: 3}}
          style={styles.caseGradient}>
          <View style={styles.AppointmentNotifitionBox}>
            <View style={styles.caseHeader}>
              <Text style={styles.Appointment}>
                {item?.case_type_name.length > 18
                  ? `${item?.case_type_name.slice(0, 18)}...`
                  : item?.case_type_name}
              </Text>
              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      item?.status.trim() === 'Open'
                        ? '#50ad6d'
                        : item?.status.trim() === 'Closed'
                        ? '#EB5757'
                        : colors.gray,
                  },
                ]}>
                <Image
                  source={
                    item?.status.trim() === 'Open'
                      ? AppImages.show
                      : AppImages.hide
                  }
                  style={styles.statusIcon}
                />
                <Text style={styles.AppointmentTime}>{item?.status}</Text>
              </View>
            </View>
            <View style={styles.AppointmentTabs}>
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Contract \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.contract_amount}`}
                  </Text>
                </Text>
              </View>
              <View style={styles.paidContainer}>
                <Text style={styles.amountLabel}>
                  {'Paid \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.total_paid}`}
                  </Text>
                </Text>
              </View>
              {item?.remaining_amount != 0 && (
                <View style={styles.Appointmenttype}>
                  <Text style={styles.amountLabel}>
                    {'Due \n'}
                    <Text style={styles.amountValue}>
                      {`$${item?.remaining_amount}`}
                    </Text>
                  </Text>
                </View>
              )}
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Retaining Date \n'}
                  <Text style={styles.amountValue}>
                    {`${formattedDate(item?.retention_date)}`}
                  </Text>
                </Text>
              </View>
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Filing Date \n'}
                  <Text style={styles.amountValue}>
                    {`${formattedDate(item?.filing_date)}`}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
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
            showBackBtn={backScreen === 'Drawer' ? true : false}
            leftImg={AppImages.backArrow}
            leftImgTint={colors.white}
            headerText="Cases"
            isSecondEndImg={true}
            isFilterShow={true}
            isEndRightImg={true}
            rightIcon={AppImages.filter}
            rightImgOnPress={openFilter}
            isHeaderBottomText={false}
          />
          <View style={styles.searchContainer}>
            <View style={styles.searchButton}>
              <Image source={AppImages.searchIcon} style={styles.searchIcon} />
              <TextInput
                onChangeText={setSearchText}
                value={searchText}
                placeholder="Search"
                placeholderTextColor={colors.gray}
                style={styles.searchInput}
              />
            </View>
          </View>
          <BottomSheetModalProvider>
            <FlatList
              ref={scrollRef}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[
                styles.clientsList,
                {paddingBottom: backScreen === 'Drawer' ? 30 : 120},
              ]}
              showsHorizontalScrollIndicator={false}
              data={dummyClientsData}
              onScroll={event => {
                setScrollOffset(event.nativeEvent.contentOffset.y);
              }}
              scrollEventThrottle={16}
              renderItem={renderCases}
            />
            {/* Filter Component */}
            <FilterBottomSheet
              dropdownOptions={dropdownOptions}
              pickerOnePlaceholder={{label: 'Select case type', value: null}}
              pickerTwoPlaceholder={{label: 'Select case worker', value: null}}
              pickerThreePlaceholder={{
                label: 'Select status',
                value: null,
              }}
              pickerFourPlaceholder={{
                label: 'Select schedule hearing',
                value: null,
              }}
              ref={filterBottomSheetRef}
              onApply={handleApplyFilters}
              isDatePickerVisible={true}
              isDropdownOneVisible={true}
              isDropdownTwoVisible={true}
              isDropdownThreeVisible={true}
              isDropdownFourVisible={false}
              isTextInputOneVisible={false}
              isTextInputTwoVisible={false}
              bottomBtnStyle={{
                marginBottom: backScreen === 'Drawer' ? 10 : 90,
              }}
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
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 100,
    // flex:1,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 15,
    marginTop: 20,
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
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.gray,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: responsiveSize(12),
    fontWeight: '400',
    color: colors.white,
  },
  clientsList: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  caseCardContainer: {
    shadowColor: colors.themeBgColor,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    borderRadius: 12,
    marginVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    elevation: 10,
  },
  caseGradient: {
    justifyContent: 'space-around',
    borderRadius: 12,
    width: '100%',
    // height: 200,
  },
  AppointmentNotifitionBox: {
    width: '100%',
    borderRadius: 8,
    padding: 15,
  },
  caseHeader: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  Appointment: {
    fontSize: responsiveSize(16),
    color: colors.white,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingVertical: 4,
  },
  statusIcon: {
    height: 20,
    width: 20,
    tintColor: colors.white,
  },
  AppointmentTime: {
    fontSize: responsiveSize(12),
    marginLeft: 5,
    color: 'white',
  },
  AppointmentTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    rowGap: 10,
    paddingTop: 20,
    paddingBottom: 5,
    marginRight: 20,
  },
  Appointmentwith: {
    flexDirection: 'row',
    // backgroundColor: colors.themeLightBg,
    backgroundColor: colors.textViewBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  paidContainer: {
    flexDirection: 'row',
    // backgroundColor: colors.themeLightBg,
    backgroundColor: colors.textViewBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  Appointmenttype: {
    flexDirection: 'row',
    backgroundColor: '#EB5757',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  amountLabel: {
    color: colors.white,
    fontSize: responsiveSize(12),
    textAlign: 'left',
  },
  amountValue: {
    color: colors.white,
    fontSize: responsiveSize(12),
    fontWeight: '700',
  },
});

export default CasesScreen;
