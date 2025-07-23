// features/hearings/view/HearingsScreen.js
import React, {useCallback, useRef, useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {AppImages} from '../../../config/Images';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import FilterBottomSheet from '../../../../components/common/FilterBottomSheet';
import {colors} from '../../../config/theme';
import {NoDataFound} from '../../../../components/common/NoDataFound';
import LinearGradient from 'react-native-linear-gradient';
import {useHearingsViewModel} from '../viewModel/useHearingsViewModel';
import {styles} from './Style';
import {responsiveSize} from '../../../utils/responsiveFontSize';
import ToastNotification from '../../../../components/common/CustomToast';

const HearingsScreen = ({navigation, route}) => {
  const {backScreen = undefined} = route?.params || {};
  const filterBottomSheetRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scaleValue = new Animated.Value(0.5);

  const {
    filterData,
    filteredHearings,
    loading,
    refreshing,
    toastConfig,
    filterActive,
    filters,
    scrollRef,
    formattedDate,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    showToast,
    setFilterActive,
  } = useHearingsViewModel();

  // Animation for no data found
  useEffect(() => {
    if (filteredHearings.length === 0 && !loading) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0.5);
    }
  }, [filteredHearings, loading]);

  const openFilter = useCallback(() => {
    filterBottomSheetRef.current?.present();
  }, [filteredHearings.length]);

  const renderHearingItem = useCallback(
    ({item}) => (
      <View style={styles.hearingContainer}>
        <LinearGradient
          colors={[colors.hearingCardLinearOne, colors.hearingCardLinearTwo]}
          style={styles.hearingLinearCard}>
          {console.log('hearing item:', item)}
          <TouchableOpacity activeOpacity={1} style={styles.hearingItem}>
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
                  {`${formattedDate(item?.date)}  ${item?.time}`}
                </Text>
              </View>
            </LinearGradient>

            <View
              style={{
                paddingVertical: 5,
                marginTop: 10,
                maxWidth: '60%',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '30%',
                paddingHorizontal: 10,
                backgroundColor:
                  item?.hearing_status === 'Cancelled'
                    ? colors?.cancelled_bg
                    : item?.hearing_status === 'Adjourned'
                    ? colors.adjourned_bg
                    : item?.hearing_status === 'Rescheduled'
                    ? colors.reschduleBg
                    : colors.on_scheduled_bg,
                borderRadius: 8,
                overflow: 'hidden',
              }}>
              <Text
                style={{
                  fontSize: responsiveSize(16, 'font'),
                  fontWeight: '500',
                  color:
                    item?.hearing_status === 'Cancelled'
                      ? colors?.redError
                      : item?.hearing_status === 'Adjourned'
                      ? colors.adjourned_txt
                      : item?.hearing_status === 'Rescheduled'
                      ? colors.reschdule
                      : colors.on_scheduled,
                }}>
                {item?.hearing_status}
              </Text>
            </View>

            {item?.client_name && (
              <Text numberOfLines={1} style={styles.hearingName}>
                {item?.client_name}
              </Text>
            )}

            {item?.alien_number && (
              <Text numberOfLines={1} style={styles.hearingAlienNumber}>
                {item.alien_number}
              </Text>
            )}

            {item?.court_name && (
              <View style={styles.hearingLocationContainer}>
                <Image
                  source={AppImages.locationCheck}
                  style={styles.locationIcon}
                />
                <Text numberOfLines={1} style={styles.hearingLocation}>
                  {item.court_name}
                </Text>
              </View>
            )}

            {item?.judge_name && (
              <View style={styles.hearingOfficerContainer}>
                <Image
                  style={styles.officerIcon}
                  source={AppImages.userShield}
                />
                <Text numberOfLines={1} style={styles.hearingOfficer}>
                  {item.judge_name}
                </Text>
              </View>
            )}

            <LinearGradient
              style={styles.hearingTypeContainer}
              colors={['#384651', '#051422']}
              locations={[0, 1]}
              start={{x: 1, y: 0}}
              end={{x: 0.5, y: 0}}>
              <View style={styles.hearingTypeInner}>
                {item?.attorney_name && (
                  <View style={styles.hearingOfficerRow}>
                    <Image
                      style={styles.userIcon}
                      source={AppImages.userAnimyPlaceholder}
                    />
                    <Text numberOfLines={1} style={styles.hearingOfficerName}>
                      {item?.attorney_name}
                    </Text>
                  </View>
                )}

                {item?.hearing_medium_attorney && (
                  <Text numberOfLines={1} style={styles.hearingTypeText}>
                    {item?.hearing_medium_attorney}
                  </Text>
                )}
                {item?.hearingType && (
                  <View style={styles.hearingTypeRow}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: responsiveSize(20, 'font'),
                        color: colors.themeActiveTint,
                        marginTop: !item.hearing_medium_attorney && 3,
                      }}>
                      {item?.hearingType}
                    </Text>
                  </View>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    ),
    [formattedDate],
  );

  const renderNoDataFound = useMemo(
    () => (
      <View style={styles.noDataContainer}>
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
          <NoDataFound
            noDataFoundText={'No hearings found'}
            noDataSubText={'Try adjusting your search or filters'}
          />
        </Animated.View>
      </View>
    ),
    [scaleValue],
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
            showBackBtn={backScreen === 'Drawer'}
            leftImg={AppImages.backArrow}
            leftImgTint={colors.white}
            headerText="Hearings"
            isSecondEndImg={true}
            isFilterShow={filteredHearings.length > 0 || filterActive}
            isEndRightImg={filteredHearings.length > 0 || filterActive}
            rightIcon={AppImages.filter}
            rightImgOnPress={openFilter}
            isHeaderBottomText={false}
          />

          {loading && !refreshing && filteredHearings.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.white} />
            </View>
          ) : filteredHearings.length > 0 ? (
            <FlatList
              ref={scrollRef}
              numColumns={2}
              data={filteredHearings}
              renderItem={renderHearingItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[
                styles.hearingsList,
                {paddingBottom: backScreen === 'Drawer' ? 30 : 120},
              ]}
              columnWrapperStyle={styles.hearingsColumnWrapper}
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
              onScroll={event => {
                setScrollOffset(event.nativeEvent.contentOffset.y);
              }}
              scrollEventThrottle={16}
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
            dropdownOptions={filterData}
            isFutureDateSelectionValid={false}
            pickerOnePlaceholder={{label: 'Select case worker', value: null}}
            pickerTwoPlaceholder={{label: 'Select attorney', value: null}}
            pickerThreePlaceholder={{label: 'Select hearing type', value: null}}
            pickerFourPlaceholder={{label: 'Select status', value: null}}
            ref={filterBottomSheetRef}
            onApply={handleApplyFilters}
            isDatePickerVisible={true}
            isDropdownOneVisible={true}
            isDropdownTwoVisible={true}
            isDropdownThreeVisible={true}
            isDropdownFourVisible={true}
            isTextInputOneVisible={true}
            isTextInputTwoVisible={false}
            firstInputPlaceholder="Enter judge name"
            firstInputValue={filters.judgeName}
            bottomBtnStyle={{
              marginBottom: backScreen === 'Drawer' ? 10 : 90,
            }}
            isHearingScreen={true}
            showToast={showToast}
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

export default HearingsScreen;
