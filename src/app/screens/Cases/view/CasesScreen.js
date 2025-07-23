import React, {useCallback, useRef, useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Animated
} from 'react-native';
import {AppImages} from '../../../config/Images';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import FilterBottomSheet from '../../../../components/common/FilterBottomSheet';
import {colors} from '../../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import {useCasesViewModel} from '../viewModel/useCasesViewModel';
import {styles} from './Styles';
import CustomBottomSheet from '../../../../components/common/CustomBottomSheet';
import {NoDataFound} from '../../../../components/common/NoDataFound';
import ToastNotification from '../../../../components/common/CustomToast';

const CaseItem = React.memo(({item, formattedDate}) => {
  console.log('case item is::', item);

  return (
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
              {item?.case_type_name?.length > 30
                ? `${item?.case_type_name.slice(0, 29)}...`
                : item?.case_type_name}
            </Text>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor:
                    item?.status?.trim() === 'Open'
                      ? '#50ad6d'
                      : item?.status?.trim() === 'Closed'
                      ? '#EB5757'
                      : colors.gray,
                },
              ]}>
              <Text style={styles.AppointmentTime}>{item?.status}</Text>
            </View>
          </View>
          <View style={styles.clientDetailContainer}>
            <View style={styles.clientContactRow}>
              <Image
                style={styles.userIcon}
                source={AppImages.userAnimyPlaceholder}
                resizeMode="contain"
              />
              <Text numberOfLines={1} style={styles.clientName}>
                {item?.client_name}
              </Text>
              {item?.client_mobile_no && (
                <>
                  <Image style={styles.mobileIcon} source={AppImages.call} />
                  <Text numberOfLines={1} style={styles.mobileNumber}>
                    {item?.client_mobile_no}
                  </Text>
                </>
              )}
              {item?.client_alien_no && (
                <>
                  <Image
                    style={styles.alienNumberIcon}
                    source={AppImages.alienNumber}
                  />
                  <Text numberOfLines={1} style={styles.alienNumber}>
                    {item?.client_alien_no}
                  </Text>
                </>
              )}
            </View>
          </View>
          <View style={styles.AppointmentTabs}>
            {item?.contract_amount && (
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Contract \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.contract_amount || 0}`}
                  </Text>
                </Text>
              </View>
            )}
            {item?.total_paid && (
              <View style={styles.paidContainer}>
                <Text style={styles.amountLabel}>
                  {'Paid \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.total_paid || 0}`}
                  </Text>
                </Text>
              </View>
            )}
            {item?.remaining_amount && (
              <View style={styles.Appointmenttype}>
                <Text style={styles.amountLabel}>
                  {'Due \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.remaining_amount}`}
                  </Text>
                </Text>
              </View>
            )}

            {/* {item?.retention_date && (
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Retained \n'}
                  <Text style={styles.amountValue}>
                    {formattedDate(item?.retention_date)}
                  </Text>
                </Text>
              </View>
            )} */}

            {/* {item?.filing_date && (
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Filing \n'}
                  <Text style={styles.amountValue}>
                    {formattedDate(item?.filing_date)}
                  </Text>
                </Text>
              </View>
            )} */}
            {/* {item?.case_worker_name && (
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Case Worker \n'}
                  <Text style={styles.amountValue}>
                    {item?.case_worker_name.length > 16
                      ? `${item?.case_worker_name.slice(0, 14)}...`
                      : `${item?.case_worker_name || ''}`}
                  </Text>
                </Text>
              </View>
            )} */}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
});

const CasesScreen = ({navigation, route}) => {
  const {type} = route?.params || {};

  const {backScreen = undefined} = route?.params || {};

  const {
    searchText,
    casesData,
    loading,
    refreshing,
    bottomSheetRef,
    selectedType,
    filterData,
    toastConfig,
    filterBottomSheetRef,
    scrollRef,
    formattedDate,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    openBottomSheet,
    handleSearchTypeSelect,
    showToast,
  } = useCasesViewModel({initialType: type});

  const scaleValue = new Animated.Value(0.5);

  // Animation for no data found
  useEffect(() => {
    if (casesData.length === 0 && !loading) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0.5);
    }
  }, [casesData, loading]);

  // Function to open filter
  const openFilter = useCallback(() => {
    filterBottomSheetRef.current?.present();
    bottomSheetRef.current?.dismiss();
  }, []);

  const renderItem = useCallback(
    ({item}) => <CaseItem item={item} formattedDate={formattedDate} />,
    [formattedDate],
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

  const renderNoDataFound = useMemo(
    () => (
      <View style={styles.noDataContainer}>
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
          <NoDataFound
            noDataFoundText={'No cases found'}
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
        <LinearGradientHeader
          goBack={() => navigation.goBack()}
          showBackBtnContainer={true}
          showBackBtn={backScreen === 'Drawer' || type}
          leftImg={AppImages.backArrow}
          leftImgTint={colors.white}
          headerText={type ? 'Search' : 'Cases'}
          isSecondEndImg={true}
          isFilterShow={true}
          isEndRightImg={true}
          rightIcon={AppImages.filter}
          rightImgOnPress={openFilter}
          isHeaderBottomText={false}
        />

        {type && (
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Image source={AppImages.searchIcon} style={styles.searchIcon} />
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

        <BottomSheetModalProvider>
          {loading && !refreshing && casesData.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.white} />
            </View>
          ) : casesData.length > 0 ? (
            <FlatList
              ref={scrollRef}
              data={casesData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[
                styles.clientsList,
                {paddingBottom: backScreen === 'Drawer' || type ? 30 : 120},
              ]}
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
            dropdownOptions={filterData}
            pickerOnePlaceholder={{label: 'Select case type', value: null}}
            pickerTwoPlaceholder={{label: 'Select case worker', value: null}}
            pickerThreePlaceholder={{label: 'Select status', value: null}}
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
              marginBottom: backScreen === 'Drawer' || type ? 10 : 90,
            }}
            secondInputPlaceholder="Enter judge name"
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

          <CustomBottomSheet
            ref={bottomSheetRef}
            snapPoints={['30%']}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetHandle}>
            <SearchTypeSelector />
          </CustomBottomSheet>
        </BottomSheetModalProvider>
      </ImageBackground>
    </View>
  );
};

export default CasesScreen;
