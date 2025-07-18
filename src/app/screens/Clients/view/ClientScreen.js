import React, {useCallback, useRef, useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {AppImages} from '../../../config/Images';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';
import CustomBottomSheet from '../../../../components/common/CustomBottomSheet';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import FilterBottomSheet from '../../../../components/common/FilterBottomSheet';
import {styles} from './Styles';
import {useClientsViewModel} from '../clientsViewModel/clientsViewModel';
import {colors} from '../../../config/theme';
import {NoDataFound} from '../../../../components/common/NoDataFound';
import ClientSnapshot from '../components/ClientSnapshot';
import ClientCases from '../components/ClientCases';
import ClientHearings from '../components/ClientHearings';

const ClientsScreen = ({navigation}) => {
  // Existing declarations
  const filterBottomSheetRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const scaleValue = new Animated.Value(0.5);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Add this new state for tracking tabs per client
  const [clientTabs, setClientTabs] = useState({}); // Tracks selected tab for each client

  const {
    searchText,
    filteredClients,
    filterData,
    loading,
    refreshing,
    clientDetails,
    formattedDate,
    handleSearch,
    handleRefresh,
    handleLoadMore,
    handleApplyFilters,
    fetchClientDetails,
    setClientDetails,
  } = useClientsViewModel();

  // Animation for no data found
  useEffect(() => {
    if (filteredClients.length === 0 && !loading) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0.5);
    }
  }, [filteredClients, loading]);

  const openBottomSheet = useCallback(
    client => {
      setSelectedClient(client);
      setSelectedItem(1); // Always default to Snapshot for new client
      bottomSheetRef.current?.present();
      filterBottomSheetRef.current?.dismiss();

      // Always fetch fresh snapshot data when opening
      fetchClientDetails(client?.id, 'snapshot');
    },
    [fetchClientDetails],
  );

  const handleTabChange = useCallback(
    tab => {
      if (!selectedClient) return;

      setSelectedItem(tab);

      // Force fresh data fetch with correct IDs
      switch (tab) {
        case 1: // Snapshot
          fetchClientDetails(selectedClient.id, 'snapshot');
          break;
        case 2: // Cases
          fetchClientDetails(selectedClient.user, 'cases');
          break;
        case 3: // Hearings
          // Make sure we're using the correct ID property
          console.log('selectedClient.user::', selectedClient.user);
          
          
          fetchClientDetails(selectedClient.user, 'hearings').catch(error =>
            console.error('Hearings fetch error:', error),
          );
          break;
        default:
          break;
      }
    },
    [selectedClient, fetchClientDetails],
  );

  const openFilter = useCallback(() => {
    if (filteredClients.length === 0) return;
    filterBottomSheetRef.current?.present();
    bottomSheetRef.current?.dismiss();
  }, [filteredClients.length]);

  const renderClientItem = useCallback(
    ({item, index}) => (
      <TouchableOpacity
        onPress={() => openBottomSheet(item)}
        style={[
          styles.clientItem,
          {
            borderBottomWidth: index === filteredClients.length - 1 ? 0 : 1,
          },
        ]}>
        <View style={styles.clientItemSubContainer}>
          <View>
            <View style={styles.clientImageContainer}>
              <Image
                source={AppImages.userAnimyPlaceholder}
                style={styles.clientImage}
              />
            </View>
            {item?.is_highlighted && (
              <Image source={AppImages.star} style={styles.pinIcon} />
            )}
          </View>
          <View>
            {item?.client_name ? (
              <Text numberOfLines={1} style={styles.clientName}>
                {item?.client_name}
              </Text>
            ) : null}
            <View style={styles.clientInfoContainer}>
              {item.alien_number ? (
                <>
                  <Image
                    source={AppImages.alienNumber}
                    style={styles.infoIcon}
                  />
                  <Text numberOfLines={1} style={styles.clientId}>
                    {item.alien_number}
                  </Text>
                </>
              ) : null}
              <View style={styles.separator} />
              {item.mobile ? (
                <>
                  <Image source={AppImages.call} style={styles.infoIcon} />
                  <Text numberOfLines={1} style={styles.clientId}>
                    {item.mobile}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
        </View>
        <Image source={AppImages.rightArrow} style={styles.rightArrowIcon} />
      </TouchableOpacity>
    ),
    [filteredClients.length, openBottomSheet],
  );

  const renderNoDataFound = useMemo(
    () => (
      <View style={styles.noDataContainer}>
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
          <NoDataFound
            noDataFoundText={'No clients found'}
            noDataSubText={'Try adjusting your search or filters'}
          />
        </Animated.View>
      </View>
    ),
    [scaleValue],
  );

  const renderTabContent = useMemo(() => {
    switch (selectedItem) {
      case 1:
        return (
          <ClientSnapshot
            snapshotData={clientDetails.snapshot}
            loading={clientDetails.loading.snapshot}
          />
        );
      case 2:
        return (
          <ClientCases
            casesData={clientDetails.cases}
            loading={clientDetails.loading.cases}
            formattedDate={formattedDate}
          />
        );
      case 3:
        return (
          <ClientHearings
            hearingsData={clientDetails.hearings}
            loading={clientDetails.loading.hearings}
            formattedDate={formattedDate}
          />
        );
      default:
        return null;
    }
  }, [selectedItem, clientDetails, formattedDate]);

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
          isFilterShow={filteredClients.length > 0}
          isEndRightImg={filteredClients.length > 0}
          rightIcon={AppImages.filter}
          rightImgOnPress={openFilter}
          isHeaderBottomText={false}
        />

        <BottomSheetModalProvider>
          {filteredClients.length > 0 && (
            <>
              <View style={styles.searchMainContainer}>
                <View style={styles.searchContainer}>
                  <Image
                    source={AppImages.searchIcon}
                    style={styles.searchIcon}
                  />
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
            </>
          )}

          {loading && !refreshing && filteredClients.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.white} />
            </View>
          ) : filteredClients.length > 0 ? (
            <FlatList
              data={filteredClients}
              renderItem={renderClientItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.clientsList}
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
            isFutureDateSelectionValid={true}
            pickerOnePlaceholder={{label: 'Select case type', value: null}}
            pickerTwoPlaceholder={{label: 'Select status', value: null}}
            pickerThreePlaceholder={{label: 'Select assignee', value: null}}
            ref={filterBottomSheetRef}
            onApply={handleApplyFilters}
            isDatePickerVisible={true}
            isDropdownOneVisible={true}
            isDropdownTwoVisible={true}
            isDropdownThreeVisible={true}
            isDropdownFourVisible={false}
            isTextInputOneVisible={false}
            isTextInputTwoVisible={false}
            secondInputPlaceholder="Enter judge name"
            bottomBtnStyle={{marginBottom: 10}}
          />

          <CustomBottomSheet
            ref={bottomSheetRef}
            onDismiss={() => {
              // Clear all client details when sheet is closed
              setClientDetails({
                snapshot: null,
                cases: null,
                hearings: null,
                loading: {
                  snapshot: false,
                  cases: false,
                  hearings: false,
                },
                error: null,
              });
            }}>
            <View style={styles.bottomSheetContainer}>
              {selectedClient && (
                <>
                  <View style={styles.clientHeader}>
                    <Image
                      source={AppImages.userAnimyPlaceholder}
                      style={styles.clientImageSmall}
                    />
                    <View>
                    <Text numberOfLines={1} style={styles.clientNameSmall}>
                      {selectedClient?.client_name}
                    </Text>
                    <View style={styles.clientInfoRight}>
                      <View style={styles.infoBox}>
                        <Image
                          source={AppImages.alienNumber}
                          style={styles.infoIcon}
                        />
                        <Text numberOfLines={1} style={styles.infoText}>
                          {selectedClient?.alien_number}
                        </Text>
                      </View>
                      <View style={styles.infoBox}>
                        <Image
                          source={AppImages.call}
                          style={styles.infoIcon}
                        />
                        <Text numberOfLines={1} style={styles.infoText}>
                          {selectedClient?.mobile}
                        </Text>
                      </View>
                    </View>
                    </View>
                  </View>

                  <View style={styles.tabSelector}>
                    <TouchableOpacity
                      onPress={() => handleTabChange(1)}
                      style={[
                        styles.tabButton,
                        selectedItem === 1 && styles.tabButtonActive,
                      ]}>
                      <Text style={styles.tabButtonText}>Snapshots</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleTabChange(2)}
                      style={[
                        styles.tabButton,
                        styles.tabButtonMiddle,
                        selectedItem === 2 && styles.tabButtonActive,
                      ]}>
                      <Text style={styles.tabButtonText}>Cases</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleTabChange(3)}
                      style={[
                        styles.tabButton,
                        selectedItem === 3 && styles.tabButtonActive,
                      ]}>
                      <Text style={styles.tabButtonText}>Hearings</Text>
                    </TouchableOpacity>
                  </View>

                  {renderTabContent}
                </>
              )}
            </View>
          </CustomBottomSheet>
        </BottomSheetModalProvider>
      </ImageBackground>
    </View>
  );
};

export default ClientsScreen;
