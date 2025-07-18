// features/appointments/view/AppointmentsScreen.js
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
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

const AppointmentsScreen = ({navigation}) => {
  const filterBottomSheetRef = useRef(null);

  const {
    searchText,
    filteredAppointments,
    filterData,
    loading,
    refreshing,
    selectedTab,
    formattedDate,
    formattedTime,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    handleTabChange,
  } = useAppointmentsViewModel();

  const [toastConfig, setToastConfig] = useState({
    visible: false,
    title: '',
    message: '',
    colorDark: '',
    colorLight: '',
    icon: null,
  });

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

  const openFilter = useCallback(() => {
    if (filteredAppointments.length === 0) return;
    filterBottomSheetRef.current?.present();
  }, [filteredAppointments.length]);

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
        <NoDataFound
          noDataFoundText={'No appointments found'}
          noDataSubText={'Try adjusting your search or filters'}
        />
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
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

          {loading && !refreshing && filteredAppointments.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.white} />
            </View>
          ) : filteredAppointments.length > 0 ? (
            <FlatList
              data={filteredAppointments}
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
            pickerOnePlaceholder={{label: 'Select client', value: null}}
            pickerTwoPlaceholder={{label: 'Select payment mode', value: null}}
            isDatePickerVisible={true}
            isDropdownOneVisible={true}
            isDropdownTwoVisible={true}
            isDropdownThreeVisible={false}
            isDropdownFourVisible={false}
            isTextInputOneVisible={true}
            isTextInputTwoVisible={true}
            firstInputPlaceholder="Search Appointments..."
            secondInputPlaceholder="Transaction Id"
            isFromAppointments={true}
            selectedAppointmentTab={selectedTab}
            showToast = {showToast}
          />
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
