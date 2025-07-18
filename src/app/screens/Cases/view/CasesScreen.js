import React, {useCallback, useRef, useState, useEffect} from 'react';
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
} from 'react-native';
import {AppImages} from '../../../config/Images';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import FilterBottomSheet from '../../../../components/common/FilterBottomSheet';
import {colors} from '../../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import {dropdownApoointmentOptions} from '../../../config/StaticDataList';
import { useCasesViewModel } from '../viewModel/useCasesViewModel';
import { styles } from './Styles';

const CaseItem = React.memo(({item, formattedDate}) => {
    
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
          <View style={styles.AppointmentTabs}>
            <View style={styles.Appointmentwith}>
              <Text style={styles.amountLabel}>
                {'Contract \n'}
                <Text style={styles.amountValue}>
                  {`$${item?.contract_amount || 0}`}
                </Text>
              </Text>
            </View>
            <View style={styles.paidContainer}>
              <Text style={styles.amountLabel}>
                {'Paid \n'}
                <Text style={styles.amountValue}>
                  {`$${item?.total_paid || 0}`}
                </Text>
              </Text>
            </View>
            {item?.remaining_amount ? (
              <View style={styles.Appointmenttype}>
                <Text style={styles.amountLabel}>
                  {'Due \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.remaining_amount}`}
                  </Text>
                </Text>
              </View>
            ) : null}
            <View style={styles.Appointmentwith}>
              <Text style={styles.amountLabel}>
                {'Retaining Date \n'}
                <Text style={styles.amountValue}>
                  {formattedDate(item?.retention_date)}
                </Text>
              </Text>
            </View>
            <View style={styles.Appointmentwith}>
              <Text style={styles.amountLabel}>
                {'Filing Date \n'}
                <Text style={styles.amountValue}>
                  {formattedDate(item?.filing_date)}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
});

const CasesScreen = ({navigation, route}) => {
  const {backScreen = undefined} = route?.params || {};
  const filterBottomSheetRef = useRef(null);
  
  const {
    searchText,
    filteredCases,
    loading,
    refreshing,
    formattedDate,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
  } = useCasesViewModel();

  // Function to open filter
  const openFilter = useCallback(() => {
    filterBottomSheetRef.current?.present();
  }, []);

  const renderItem = useCallback(
    ({item}) => <CaseItem item={item} formattedDate={formattedDate} />,
    [formattedDate]
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <LinearGradientHeader
          goBack={() => navigation.goBack()}
          showBackBtnContainer={true}
          showBackBtn={backScreen === 'Drawer'}
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
              onChangeText={handleSearch}
              value={searchText}
              placeholder="Search"
              placeholderTextColor={colors.gray}
              style={styles.searchInput}
            />
          </View>
        </View>
        {console.log('filteredCases::', filteredCases)
        }

        <BottomSheetModalProvider>
          {loading && !refreshing && filteredCases.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.white} />
            </View>
          ) : filteredCases.length > 0 ? (
            <FlatList
              data={filteredCases}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[
                styles.clientsList,
                {paddingBottom: backScreen === 'Drawer' ? 30 : 120},
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
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No cases found</Text>
            </View>
          )}

          <FilterBottomSheet
            dropdownOptions={dropdownApoointmentOptions}
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
              marginBottom: backScreen === 'Drawer' ? 10 : 90,
            }}
            secondInputPlaceholder="Enter judge name"
          />
        </BottomSheetModalProvider>
      </ImageBackground>
    </View>
  );
};

export default CasesScreen;