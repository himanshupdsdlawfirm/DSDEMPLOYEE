// features/appointments/view/AppointmentsScreen.js
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
} from 'react-native';
import {AppImages} from '../../../config/Images';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import FilterBottomSheet from '../../../../components/common/FilterBottomSheet';
import {colors} from '../../../config/theme';
import {NoDataFound} from '../../../../components/common/NoDataFound';
import AppointmentItem from '../components/AppointmentItem';
import {useAppointmentsViewModel} from '../viewModel/useAppointmentsViewModel';
import {styles} from './Styles';
import ToastNotification from '../../../../components/common/CustomToast';
import CustomBottomSheet from '../../../../components/common/CustomBottomSheet';

const AppointmentsScreen = ({navigation, route}) => {
  const {type} = route.params || {};

  const {
    searchText,
    appointmentsData,
    filterData,
    loading,
    refreshing,
    selectedTab,
    bottomSheetRef,
    selectedType,
    filterActive,
    filterBottomSheetRef,
    isResetFilterData,
    formattedDate,
    formattedTime,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    handleTabChange,
    openBottomSheet,
    handleSearchTypeSelect,
    setFilterActive,
    openFilter,
  } = useAppointmentsViewModel({initialType: type});

  const scaleValue = new Animated.Value(0.5);

  const [toastConfig, setToastConfig] = useState({
    visible: false,
    title: '',
    message: '',
    colorDark: '',
    colorLight: '',
    icon: null,
  });

  // Animation for no data found
  useEffect(() => {
    if (appointmentsData.length === 0 && !loading) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0.5);
    }
  }, [appointmentsData, loading]);

  const showToast = useCallback(config => {
    console.log('config data::', config);

    setToastConfig({
      ...config,
      visible: true,
    });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToastConfig(prev => ({...prev, visible: false}));
    }, 3000);
  }, []);

  const renderAppointmentItem = useCallback(
    ({item}) => (
      <AppointmentItem
        item={item}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />
    ),
    [formattedDate, formattedTime],
  );

  const renderNoDataFound = useMemo(
    () => (
      <View style={styles.noDataContainer}>
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
          <NoDataFound
            noDataFoundText={'No appointments found'}
            noDataSubText={'Try adjusting your search or filters'}
          />
        </Animated.View>
      </View>
    ),
    [scaleValue],
  );

  const SearchTypeSelector = () => (
    <View style={styles.selectorContainer}>
      {['Appointments', 'Cases', 'Clients'].map(type => (
        <TouchableOpacity
          style={styles.searchTypeSelectorBtn}
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
    <View style={styles.container}>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <BottomSheetModalProvider>
          <LinearGradientHeader
            goBack={() => {
              navigation.goBack(), setFilterActive(false);
            }}
            showBackBtnContainer={true}
            showBackBtn={true}
            leftImg={AppImages.backArrow}
            leftImgTint={colors.white}
            headerText={type ? 'Search' : 'Appointments'}
            isSecondEndImg={true}
            isHeaderBottomText={false}
            isFilterShow={appointmentsData.length > 0 || filterActive}
            isEndRightImg={appointmentsData.length > 0 || filterActive}
            rightIcon={AppImages.filter}
            rightImgOnPress={openFilter}
          />
          {type && (
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Image
                  source={AppImages.searchIcon}
                  style={styles.searchIcon}
                />
                <TextInput
                  onChangeText={handleSearch}
                  value={searchText}
                  placeholder="Search"
                  placeholderTextColor={colors.gray}
                  style={styles.searchInput}
                />
              </View>
              <TouchableOpacity
                style={styles.searchTypeButtonContainer}
                onPress={openBottomSheet}>
                <Text style={styles.searchTypeButtonText}>{selectedType}</Text>
                <Image
                  source={AppImages.downArrow}
                  tintColor={colors.white}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.mainContainer}>
            <View style={styles.tabSelector}>
              <TouchableOpacity
                onPress={() => handleTabChange('today')}
                style={[
                  styles.tabButton,
                  selectedTab === 'today' && styles.tabButtonActive,
                ]}>
                <Text style={styles.tabButtonText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabChange('future')}
                style={[
                  styles.tabButton,
                  selectedTab === 'future' && styles.tabButtonActive,
                ]}>
                <Text style={styles.tabButtonText}>Upcoming</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabChange('past')}
                style={[
                  styles.tabButton,
                  selectedTab === 'past' && styles.tabButtonActive,
                ]}>
                <Text style={styles.tabButtonText}>Past</Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading && !refreshing && appointmentsData.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.white} />
            </View>
          ) : appointmentsData.length > 0 ? (
            <FlatList
              data={appointmentsData}
              renderItem={renderAppointmentItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.appointmentList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[colors.themeTextColor]}
                  tintColor={colors.themeTextColor}
                />
              }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && !refreshing ? (
                  <ActivityIndicator
                    size="small"
                    color={colors.white}
                    style={styles.loadingIndicator}
                  />
                ) : null
              }
            />
          ) : !loading ? (
            renderNoDataFound
          ) : null}

          <FilterBottomSheet
            ref={filterBottomSheetRef}
            dropdownOptions={filterData}
            onApply={handleApplyFilters}
            pickerOnePlaceholder={{label: 'Retained', value: null}}
            pickerTwoPlaceholder={{label: 'Select payment mode', value: null}}
            isDatePickerVisible={false}
            isDropdownOneVisible={true}
            isDropdownTwoVisible={true}
            isDropdownThreeVisible={false}
            isDropdownFourVisible={false}
            isTextInputOneVisible={false}
            isTextInputTwoVisible={true}
            firstInputPlaceholder="Search Appointments..."
            secondInputPlaceholder="Transaction Id"
            isFromAppointments={true}
            selectedAppointmentTab={selectedTab}
            showToast={showToast}
            isResetFilterData={isResetFilterData}
          />

          <CustomBottomSheet
            ref={bottomSheetRef}
            snapPoints={['30%']}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetHandle}>
            <SearchTypeSelector />
          </CustomBottomSheet>

          <ToastNotification
            visible={toastConfig.visible}
            title={toastConfig.title}
            message={toastConfig.message}
            colorDark={toastConfig.colorDark}
            colorLight={toastConfig.colorLight}
            icon={toastConfig.icon}
          />
        </BottomSheetModalProvider>
      </ImageBackground>
    </View>
  );
};

export default AppointmentsScreen;
