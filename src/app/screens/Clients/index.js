// views/ClientsScreen.js
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import {AppImages} from '../../config/Images';
import {LinearGradientHeader} from '../../../components/common/LinerGradientHeader';
import {colors} from '../../config/theme';
import {moderateScale} from '../../utils/fontsize';
import clientsViewModel from './clientsViewModel/clientsViewModel';
import {useTheme} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/common/CustomBottomSheet';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {responsiveSize} from '../../utils/responsiveFontSize';
import LinearGradient from 'react-native-linear-gradient';
import FilterBottomSheet from '../../../components/common/FilterBottomSheet';
import {dropdownOptions} from '../../config/StaticDataList';

const {width} = Dimensions.get('window');

const dummyClientsData = [
  {
    id: 1,
    case_type_name: 'Asylum',
    status: 'open',
    contract_amount: 200,
    total_paid: 50,
    remaining_amount: 150,
    filing_date: '20-04-2024',
  },
];

const clientDetails = {
  phone: '9530404030',
  email: 'himanshu@gmail.com',
  gender: 'Male',
  dob: '01-01-1990',
  address: '123 Main St, New York',
  state: 'NY',
  zipCode: '10001',
};

const dummyHearings = [
  {
    id: 1,
    date: '04/24/2025',
    time: '11:45 AM',
    name: 'Himanshu Pathak',
    alienNumber: 'ABC8917719736',
    location: 'Federal Plaza',
    officer: 'Dalbir Singh',
    type: 'Interest Based',
  },
  {
    id: 2,
    date: '05/15/2025',
    time: '02:30 PM',
    name: 'John Doe',
    alienNumber: 'DEF123456789',
    location: 'City Court',
    officer: 'Jane Smith',
    type: 'Status Hearing',
  },
];

const ClientsScreen = ({navigation}) => {
  // Create a ref for the bottom sheet
  const filterBottomSheetRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const {searchText, filteredClients, handleSearch} = clientsViewModel();
  const [selectedItem, setSelectedItem] = useState(1);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
    filterBottomSheetRef.current?.dismiss();
  }, []);

  //  Function to open filter
  const openFilter = () => {
    filterBottomSheetRef.current?.present();
    bottomSheetRef.current?.dismiss();
  };

  // Handle filter application
  const handleApplyFilters = filters => {
    console.log('Applied filters:', filters);
    // Apply your filters here
  };

  const renderClientItem = useCallback(
    ({item, index}) => (
      <TouchableOpacity
        onPress={openBottomSheet}
        style={[
          styles.clientItem,
          {
            borderBottomWidth: index === filteredClients.length - 1 ? 0 : 1,
          },
        ]}>
        <View style={styles.clientItemSubContainer}>
          <View style={styles.clientImageContainer}>
            <Image source={item?.ClientImage} style={styles.clientImage} />
          </View>
          <View>
            <Text numberOfLines={1} style={styles.clientName}>
              {item?.name}
            </Text>
            <View style={styles.clientInfoContainer}>
              <Image source={AppImages.alienNumber} style={styles.infoIcon} />
              <Text numberOfLines={1} style={styles.clientId}>
                {item.alienNumber}
              </Text>
              <View style={styles.separator} />
              <Image source={AppImages.call} style={styles.infoIcon} />
              <Text numberOfLines={1} style={styles.clientId}>
                {item.phoneNumber}
              </Text>
            </View>
          </View>
        </View>
        <Image source={AppImages.rightArrow} style={styles.rightArrowIcon} />
      </TouchableOpacity>
    ),
    [filteredClients.length, openBottomSheet],
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

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const renderSnapshots = useCallback(
    () => (
      <View style={styles.snapshotsContainer}>
        <View style={styles.detailsColumn}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Phone</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Gender</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>DOB</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Address</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>State</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Zip Code</Text>
            <View style={styles.underline} />
          </View>
        </View>
        <View style={styles.valuesColumn}>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{clientDetails.phone}</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{clientDetails.email}</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{clientDetails.gender}</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{clientDetails.dob}</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{clientDetails.address}</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{clientDetails.state}</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{clientDetails.zipCode}</Text>
            <View style={styles.underline} />
          </View>
        </View>
      </View>
    ),
    [],
  );

  const renderCases = useCallback(
    () =>
      dummyClientsData.map(item => (
        <View key={item?.id} style={styles.caseCardContainer}>
          <LinearGradient
            colors={[colors.bottomTabLightGray, colors.textGray]}
            locations={[0, 1]}
            start={{x: 0.1, y: 0}}
            end={{x: 1, y: 2}}
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
      )),
    [formattedDate],
  );

  const renderHearings = useCallback(
    ({item}) => (
      <LinearGradient
        colors={[colors.hearingCardLinearOne, colors.hearingCardLinearTwo]}
        style={styles.hearingLinearCard}>
        <TouchableOpacity style={styles.hearingItem}>
          <LinearGradient
            style={styles.hearingDateContainer}
            colors={['#384651', '#051422']}
            locations={[0, 1]}
            start={{x: 1, y: 0}}
            end={{x: 0.5, y: 0}}>
            <View style={styles.hearingDateInner}>
              <Image
                source={AppImages.calendarClock}
                style={styles.calendarIcon}
              />
              <Text numberOfLines={1} style={styles.hearingDateTime}>
                {`${item.date}  ${item.time}`}
              </Text>
            </View>
          </LinearGradient>
          <Text numberOfLines={1} style={styles.hearingName}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.hearingAlienNumber}>
            {item.alienNumber}
          </Text>
          <View style={styles.hearingLocationContainer}>
            <Image
              source={AppImages.locationCheck}
              style={styles.locationIcon}
            />
            <Text numberOfLines={1} style={styles.hearingLocation}>
              {item.location}
            </Text>
          </View>
          <View style={styles.hearingOfficerContainer}>
            <Image style={styles.officerIcon} source={AppImages.userShield} />
            <Text numberOfLines={1} style={styles.hearingOfficer}>
              {item.officer}
            </Text>
          </View>
          <LinearGradient
            style={styles.hearingTypeContainer}
            colors={['#384651', '#051422']}
            locations={[0, 1]}
            start={{x: 1, y: 0}}
            end={{x: 0.5, y: 0}}>
            <View style={styles.hearingTypeInner}>
              <View style={styles.hearingOfficerRow}>
                <Image
                  style={styles.userIcon}
                  source={AppImages.userAnimyPlaceholder}
                />
                <Text numberOfLines={1} style={styles.hearingOfficerName}>
                  {item.officer}
                </Text>
              </View>
              <View style={styles.hearingTypeRow}>
                <Image
                  style={styles.ihIcon}
                  resizeMode="contain"
                  source={AppImages.ihIcon}
                />
                <Text numberOfLines={1} style={styles.hearingTypeText}>
                  <Text style={styles.hearingTypeBullet}>{' •  '}</Text>
                  {item.type}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    ),
    [],
  );

  const renderTabContent = useMemo(() => {
    switch (selectedItem) {
      case 1:
        return renderSnapshots();
      case 2:
        return renderCases();
      case 3:
        return (
          <FlatList
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.hearingsList}
            columnWrapperStyle={styles.hearingsColumnWrapper}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={dummyHearings}
            renderItem={renderHearings}
          />
        );
      default:
        return null;
    }
  }, [selectedItem, renderSnapshots, renderCases, renderHearings]);

  return (
    <View style={styles.container}>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <LinearGradientHeader
          goBack={() => navigation.goBack()}
          showBackBtnContainer={true}
          showBackBtn={true}
          leftImg={AppImages.backArrow}
          leftImgTint={colors.white}
          headerText="Clients"
          isSecondEndImg={true}
          isFilterShow={true}
          isEndRightImg={true}
          rightIcon={AppImages.filter}
          rightImgOnPress={openFilter}
          isHeaderBottomText={false}
        />
        <BottomSheetModalProvider>
          <View style={styles.searchMainContainer}>
            <View style={styles.searchContainer}>
              <Image source={AppImages.searchIcon} style={styles.searchIcon} />
              <TextInput
                onChangeText={handleSearch}
                value={searchText}
                placeholder="Search by name, alien #, or phone"
                placeholderTextColor={colors.gray}
                onBlur={() => Keyboard.dismiss()}
                style={styles.searchInput}
                returnKeyType="search"
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Clients</Text>
          </View>

          <FlatList
            data={filteredClients}
            renderItem={renderClientItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.clientsList}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />

          {/* Filter Component */}
          <FilterBottomSheet
            dropdownOptions={dropdownOptions}
            pickerOnePlaceholder={{label: 'Select case worker', value: null}}
            pickerTwoPlaceholder={{label: 'Select attorney', value: null}}
            pickerThreePlaceholder={{
              label: 'Select hearing type',
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
            isDropdownFourVisible={true}
            isTextInputOneVisible={false}
            isTextInputTwoVisible={true}
            secondInputPlaceholder="Enter judge name"
            bottomBtnStyle={{
              marginBottom: 10,
            }}
          />

          <CustomBottomSheet ref={bottomSheetRef}>
            <View style={styles.bottomSheetContainer}>
              <View style={styles.clientHeader}>
                <Image
                  source={AppImages.userAnimyPlaceholder}
                  style={styles.clientImageSmall}
                />
                <Text numberOfLines={1} style={styles.clientNameSmall}>
                  Ranjan Kumar
                </Text>
                <View style={styles.clientInfoRight}>
                  <View style={styles.infoBox}>
                    <Text numberOfLines={1} style={styles.infoText}>
                      Akash Gupta
                    </Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text numberOfLines={1} style={styles.infoText}>
                      +1 656789876
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.tabSelector}>
                <TouchableOpacity
                  onPress={() => setSelectedItem(1)}
                  style={[
                    styles.tabButton,
                    selectedItem === 1 && styles.tabButtonActive,
                  ]}>
                  <Text style={styles.tabButtonText}>Snapshots</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedItem(2)}
                  style={[
                    styles.tabButton,
                    styles.tabButtonMiddle,
                    selectedItem === 2 && styles.tabButtonActive,
                  ]}>
                  <Text style={styles.tabButtonText}>Cases</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedItem(3)}
                  style={[
                    styles.tabButton,
                    selectedItem === 3 && styles.tabButtonActive,
                  ]}>
                  <Text style={styles.tabButtonText}>Hearings</Text>
                </TouchableOpacity>
              </View>

              {renderTabContent}
            </View>
          </CustomBottomSheet>
        </BottomSheetModalProvider>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
  },
  searchMainContainer: {
    paddingHorizontal: 15,
    marginTop: 30,
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.bottomTabLightGray,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
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
  sectionContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientsList: {
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: colors.clientListBg,
  },
  clientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.bottomTabSignOut,
  },
  clientItemSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientImageContainer: {
    height: 60,
    width: 60,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 3,
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
    fontSize: responsiveSize(14),
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  clientInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    height: 12,
    width: 12,
    tintColor: colors.sheildIconColor,
  },
  clientId: {
    fontSize: responsiveSize(12),
    fontWeight: '400',
    color: colors.textGray,
    letterSpacing: 0.5,
    marginLeft: 5,
  },
  separator: {
    width: 1,
    height: 15,
    marginHorizontal: 10,
    backgroundColor: colors.white,
  },
  rightArrowIcon: {
    height: 24,
    width: 24,
    tintColor: colors.textGrayTwo,
  },

  // Bottom Sheet Styles
  bottomSheetContainer: {
    flex: 1,
    height: 600,
    width: '100%',
  },
  clientHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientImageSmall: {
    height: 30,
    width: 30,
  },
  clientNameSmall: {
    fontSize: responsiveSize(14),
    fontWeight: '400',
    color: colors.white,
    maxWidth: 110,
    marginLeft: 8,
  },
  clientInfoRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  infoBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.textViewBg,
  },
  infoText: {
    fontSize: responsiveSize(12),
    fontWeight: '400',
    maxWidth: 100,
    color: colors.white,
  },
  tabSelector: {
    width: '100%',
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
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
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    borderColor: colors.textGrayTwo,
  },
  tabButtonActive: {
    backgroundColor: colors.textGrayTwo,
    borderRadius: 25,
    borderColor: colors.textGrayTwo,
    borderWidth: 1,
    elevation: 2,
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
  tabButtonFirst: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  tabButtonLast: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },

  // Snapshots Tab Styles
  snapshotsContainer: {
    flexDirection: 'row',
    padding: 3,
    paddingVertical: 10,
    marginTop: 10,
  },
  detailsColumn: {
    width: '40%',
  },
  valuesColumn: {
    width: '60%',
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: responsiveSize(14),
    color: colors.textGray,
    fontWeight: '400',
  },
  detailValue: {
    fontSize: responsiveSize(14),
    color: colors.white,
    fontWeight: '400',
  },
  underline: {
    height: 0.5,
    backgroundColor: colors.underline,
    marginTop: 10,
    width: '100%',
  },

  // Cases Tab Styles
  caseCardContainer: {
    shadowColor: colors.themeBgColor,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    borderRadius: 12,
    marginVertical: 30,
    width: '100%',
    alignSelf: 'center',
    elevation: 10,
  },
  caseGradient: {
    justifyContent: 'space-around',
    borderRadius: 12,
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
    paddingTop: 10,
    paddingBottom: 5,
    marginRight: 20,
  },
  Appointmentwith: {
    flexDirection: 'row',
    backgroundColor: colors.themeLightBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  paidContainer: {
    flexDirection: 'row',
    backgroundColor: '#3478bf',
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

  // Hearings Tab Styles
  hearingsList: {
    // paddingHorizontal: 15,
    paddingVertical: 30,
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
  hearingDateContainer: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: Platform.OS === 'android' ? 1 : 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hearingDateInner: {
    backgroundColor: colors.themeBgColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: Platform.OS === 'android' ? '100%' : '99%',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 1,
  },
  calendarIcon: {
    height: 15,
    width: 15,
  },
  hearingDateTime: {
    fontSize: responsiveSize(14, 'font'),
    fontWeight: '400',
    flex: 1,
    marginLeft: 10,
    color: colors.white,
  },
  hearingName: {
    fontSize: responsiveSize(20, 'font'),
    fontWeight: '400',
    marginTop: 10,
    marginHorizontal: 10,
    color: colors.themeTextColor,
  },
  hearingAlienNumber: {
    fontSize: responsiveSize(18, 'font'),
    fontWeight: '400',
    marginHorizontal: 10,
    color: colors.textGray,
  },
  hearingLocationContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  locationIcon: {
    height: 16,
    width: 16,
    tintColor: colors.sheildIconColor,
  },
  hearingLocation: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginHorizontal: 10,
    color: colors.textGray,
  },
  hearingOfficerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  officerIcon: {
    height: 16,
    width: 16,
    tintColor: colors.sheildIconColor,
  },
  hearingOfficer: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginHorizontal: 10,
    color: colors.textGray,
  },
  hearingTypeContainer: {
    width: '100%',
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: Platform.OS === 'android' ? 1 : 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hearingTypeInner: {
    width: Platform.OS === 'android' ? '100%' : '99%',
    borderRadius: 11,
    backgroundColor: colors.themeBgColor,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 1,
  },
  hearingOfficerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    height: 22,
    width: 22,
  },
  hearingOfficerName: {
    fontSize: responsiveSize(20, 'font'),
    fontWeight: '600',
    marginHorizontal: 10,
    color: colors.white,
  },
  hearingTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    overflow: 'hidden',
  },
  ihIcon: {
    height: 18,
    width: 18,
  },
  hearingTypeText: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginLeft: 5,
    color: colors.textGray,
  },
  hearingTypeBullet: {
    fontSize: responsiveSize(22, 'font'),
    fontWeight: '600',
    color: colors.white,
  },
});

export default ClientsScreen;
