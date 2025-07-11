import React, {useState, useRef, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {LinearGradientHeader} from '../../../components/common/LinerGradientHeader';
import {AppImages} from '../../config/Images';
import {colors} from '../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomBottomSheet from '../../../components/common/CustomBottomSheet';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import {responsiveSize} from '../../utils/responsiveFontSize';

const SearchScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('Appointments');
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetRef = useRef(null);

  // Mock data - replace with your actual data fetching logic
  const [appointments, setAppointments] = useState([{}, {}, {}]);
  const [cases, setCases] = useState([
    {
      id: 1,
      case_type_name: 'Asylum',
      status: 'Open',
      contract_amount: 200,
      total_paid: 50,
      remaining_amount: 150,
      retention_date: '20-04-2024',
      filing_date: '20-04-2024',
    },
    // ... more cases
  ]);
  const [clients, setClients] = useState([
    {
      name: 'Himanshu Pathak',
      alienNumber: 'ABC2028937666',
      phoneNumber: '+919540634090',
      ClientImage: AppImages.userAnimyPlaceholder,
    },
    // ... more clients
  ]);

  // Filter data based on search text
  const filteredData = useMemo(() => {
    if (!searchText) {
      return selectedType === 'Appointments'
        ? appointments
        : selectedType === 'Cases'
        ? cases
        : clients;
    }

    const lowerCaseSearch = searchText.toLowerCase();

    switch (selectedType) {
      case 'Appointments':
        return appointments.filter(
          item =>
            item.name?.toLowerCase().includes(lowerCaseSearch) ||
            item.date?.toLowerCase().includes(lowerCaseSearch),
        );
      case 'Cases':
        return cases.filter(
          item =>
            item.case_type_name?.toLowerCase().includes(lowerCaseSearch) ||
            item.status?.toLowerCase().includes(lowerCaseSearch),
        );
      case 'Clients':
        return clients.filter(
          item =>
            item.name?.toLowerCase().includes(lowerCaseSearch) ||
            item.alienNumber?.toLowerCase().includes(lowerCaseSearch) ||
            item.phoneNumber?.toLowerCase().includes(lowerCaseSearch),
        );
      default:
        return [];
    }
  }, [searchText, selectedType, appointments, cases, clients]);

  const handleSearchTypeSelect = type => {
    setSelectedType(type);
    bottomSheetRef.current?.dismiss();
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  // Render functions for each type
  const renderAppointments = ({item, index}) => (
    <LinearGradient
      style={styles.appointmentContainer}
      colors={['#F7A80E', '#114A4A', '#21415F']}
      start={{x: 1, y: 1}}
      end={{x: 0.4, y: 0}}
      locations={[0, 0.6, 1]}
      useAngle={false}>
      <TouchableOpacity style={styles.appointmentSubContainer}>
        <Text numberOfLines={1} style={styles.appointmentName}>
          {'Ranjan Kumar'}
        </Text>
        <Text numberOfLines={1} style={styles.appointmentDateTime}>
          {`${'26/01/2024'} ${'3:00 PM'} - ${'5:00 PM'}`}
        </Text>
        <View style={styles.appointmentTagsContainer}>
          <View style={styles.appointmentTag}>
            <Text numberOfLines={1} style={styles.appointmentTagText}>
              {'Immigration'}
            </Text>
          </View>
          <View style={styles.appointmentTag}>
            <Text numberOfLines={1} style={styles.appointmentTagText}>
              {'3 Guest'}
            </Text>
          </View>
          <View style={styles.appointmentTag}>
            <Text numberOfLines={1} style={styles.appointmentTagText}>
              {'online'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderCases = ({item, index}) => (
    <View style={styles.caseCardContainer}>
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
                <Text style={styles.amountValue}>{`$${item?.total_paid}`}</Text>
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
                  {`${item?.retention_date}`}
                </Text>
              </Text>
            </View>
            <View style={styles.Appointmentwith}>
              <Text style={styles.amountLabel}>
                {'Filing Date \n'}
                <Text style={styles.amountValue}>{`${item?.filing_date}`}</Text>
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderClients = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {}}
      style={[
        styles.clientItem,
        {
          borderBottomWidth: index === filteredData.length - 1 ? 0 : 1,
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
  );

  const renderContent = () => {
    switch (selectedType) {
      case 'Appointments':
        return (
          <FlatList
            keyExtractor={(item, index) => `appointment-${index}`}
            contentContainerStyle={styles.appointmentList}
            showsVerticalScrollIndicator={false}
            data={filteredData}
            renderItem={renderAppointments}
          />
        );
      case 'Cases':
        return (
          <FlatList
            keyExtractor={(item, index) => `case-${index}`}
            contentContainerStyle={[styles.clientsList, {paddingBottom: 120}]}
            showsHorizontalScrollIndicator={false}
            data={filteredData}
            renderItem={renderCases}
          />
        );
      case 'Clients':
        return (
          <FlatList
            data={filteredData}
            renderItem={renderClients}
            keyExtractor={(item, index) => `client-${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.clientsList}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        );
      default:
        return null;
    }
  };

  const SearchTypeSelector = () => (
    <View style={styles.selectorContainer}>
      {['Appointments', 'Cases', 'Clients'].map(type => (
        <TouchableOpacity
          key={type}
          onPress={() => handleSearchTypeSelect(type)}
          activeOpacity={0.8}>
          <View
           
            style={[
              styles.pillButton,
              selectedType === type && styles.selectedPill,
            ]}>
            <Text
              style={[
                styles.pillText,
                selectedType === type && styles.selectedPillText,
              ]}>
              {type}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <LinearGradientHeader
          goBack={() => navigation.goBack()}
          showBackBtnContainer={true}
          showBackBtn={true}
          leftImg={AppImages.backArrow}
          leftImgTint={colors.white}
          headerText="Search"
          isSecondEndImg={false}
          isEndRightImg={false}
          isHeaderBottomText={false}
          headerBottomTitle={`Refreshed: ${new Date().toLocaleString()}`}
        />
        <BottomSheetModalProvider>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.contentContainer}>
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Image
                    source={AppImages.searchIcon}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    onChangeText={setSearchText}
                    value={searchText}
                    placeholder="Search"
                    placeholderTextColor={colors.gray}
                    style={styles.searchInput}
                  />
                </View>
                <TouchableOpacity
                  style={styles.searchTypeButtonContainer}
                  onPress={openBottomSheet}>
                  <Text style={styles.searchTypeButtonText}>
                    {selectedType}
                  </Text>
                  <Image
                    source={AppImages.downArrow}
                    tintColor={colors.white}
                    style={styles.dropdownIcon}
                  />
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <ActivityIndicator size="large" color={colors.white} />
              ) : (
                renderContent()
              )}
            </View>
          </TouchableWithoutFeedback>
          <CustomBottomSheet
            ref={bottomSheetRef}
            snapPoints={['30%']}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetHandle}>
            <SearchTypeSelector />
          </CustomBottomSheet>
        </BottomSheetModalProvider>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 15,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.bottomTabLightGray,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    height: 42,
  },
  searchIcon: {
    height: 24,
    width: 24,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: responsiveSize(12),
    fontWeight: '400',
    color: colors.white,
  },
  searchTypeButtonContainer: {
    // flex: 0.33,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: colors.bottomTabLightGray,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    height: 42,
  },
  searchTypeButtonText: {
    fontSize: responsiveSize(12),
    color: colors.white,
    paddingRight: 10,
  },
  dropdownIcon: {
    height: 12,
    width: 12,
    tintColor: colors.white,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:10,
    // backgroundColor: colors.themeBgColor, // Dark semi-transparent bg
    borderRadius: 24,
    marginTop: 10,
    gap: 8,
  },
  pillButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedPill: {
    backgroundColor: colors.textGrayTwo,
    borderRadius: 25,
    borderColor: colors.textGrayTwo,
    borderWidth: 1,
    elevation: 1,
    shadowColor: colors.white,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  pillText: {
    color: colors.gray,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  selectedPillText: {
    color: 'white',
    fontWeight: '600',
  },
  bottomSheetBackground: {
    backgroundColor: colors.bottomTabSignOut,
  },
  bottomSheetHandle: {
    backgroundColor: '#ccc',
    width: 40,
  },
  // Appointment styles
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
  appointmentName: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.5,
  },
  appointmentDateTime: {
    marginVertical: 10,
    fontSize: responsiveSize(12),
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  appointmentTagsContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    gap: 15,
  },
  appointmentTag: {
    backgroundColor: colors.white,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  appointmentTagText: {
    fontSize: responsiveSize(12),
    fontWeight: '400',
    color: colors.black,
    letterSpacing: 0.5,
  },
  // Case styles
  clientsList: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  caseCardContainer: {
    shadowColor: colors.themeBgColor,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    borderRadius: 12,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    elevation: 10,
  },
  caseGradient: {
    justifyContent: 'space-around',
    borderRadius: 12,
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
  // Client styles
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
});

export default SearchScreen;
