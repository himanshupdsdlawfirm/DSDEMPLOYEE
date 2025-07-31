import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  RefreshControl,
} from 'react-native';
import { AppImages } from '../../../config/Images';
import { colors } from '../../../config/theme';
import { LinearGradientHeader } from '../../../../components/common/LinerGradientHeader';
import { useHomeViewModel } from '../viewModel/useHomeViewModel';
import ClientItem from '../components/CientItem';
import AppointmentItem from '../components/AppointmentItem';
import HearingItem from '../components/HearingItem';
import HomeSkeleton from './HomeSkeleton';

// Memoize the list items to prevent unnecessary re-renders
const MemoizedClientItem = React.memo(ClientItem);
const MemoizedAppointmentItem = React.memo(AppointmentItem);
const MemoizedHearingItem = React.memo(HearingItem);

const HomeScreen = () => {
  const {
    clientsData,
    appointmentsData,
    hearingsData,
    scrollRef,
    handleSearchPress,
    handleViewAllClients,
    handleViewAllAppointments,
    handleViewAllHearings,
    handleOpenDrawer,
    formattedDate,
    isLoading,
    fetchClientList,
    fetchAppointmentList,
    fetchHearingList,
  } = useHomeViewModel();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Execute all refresh operations in parallel
      await Promise.all([
        fetchClientList(),
        fetchAppointmentList(),
        fetchHearingList(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [fetchClientList, fetchAppointmentList, fetchHearingList]);

  if (isLoading && !refreshing) {
    return <HomeSkeleton />;
  }

  const renderClientItem = ({ item, index }) => (
    <MemoizedClientItem
      item={item}
      index={index}
      isLast={index === clientsData.length - 1}
    />
  );

  const renderAppointmentItem = ({ item, index }) => (
    <MemoizedAppointmentItem
      item={item}
      index={index}
      isLast={index === appointmentsData.length - 1}
      formattedDate={formattedDate}
    />
  );

  const renderHearingItem = ({ item }) => (
    <MemoizedHearingItem formattedDate={formattedDate} item={item} />
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <LinearGradientHeader
          isHeaderWithoutGradient={true}
          goBack={handleOpenDrawer}
          showBackBtnContainer={true}
          showBackBtn={true}
          leftImg={AppImages.drawerMenu}
          leftImgTint={colors.white}
          headerText="Home"
          isSecondEndImg={true}
          isEndRightImg={true}
          secondRightIcon={AppImages.userAnimyPlaceholder}
          rightIcon={AppImages.notification}
          isHeaderBottomText={false}
        />

        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={handleSearchPress}
            style={styles.searchButton}>
            <Image source={AppImages.searchIcon} style={styles.searchIcon} />
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.themeTextColor}
              colors={[colors.themeTextColor]}
            />
          }
          ListHeaderComponent={
            <>
              {/* Clients Section */}
              {clientsData.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Clients</Text>
                  <TouchableOpacity onPress={handleViewAllClients}>
                    <Text style={styles.sectionViewAll}>View All</Text>
                  </TouchableOpacity>
                </View>
              )}
              {clientsData.length > 0 && (
                <FlatList
                  horizontal
                  data={clientsData}
                  renderItem={renderClientItem}
                  keyExtractor={keyExtractor}
                  contentContainerStyle={styles.clientsList}
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={5}
                  maxToRenderPerBatch={5}
                  windowSize={5}
                />
              )}

              {/* Appointments Section */}
              {appointmentsData.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Appointments</Text>
                  <TouchableOpacity onPress={handleViewAllAppointments}>
                    <Text style={styles.sectionViewAll}>View All</Text>
                  </TouchableOpacity>
                </View>
              )}
              {appointmentsData.length > 0 && (
                <FlatList
                  horizontal
                  data={appointmentsData.reverse().slice(0, 20)}
                  renderItem={renderAppointmentItem}
                  keyExtractor={keyExtractor}
                  contentContainerStyle={styles.appointmentList}
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={3}
                  maxToRenderPerBatch={3}
                  windowSize={3}
                />
              )}
              
            </>
          }
          ListFooterComponent={
            <>
              {/* Hearings Section */}
              {hearingsData?.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Hearings</Text>
                  <TouchableOpacity onPress={handleViewAllHearings}>
                    <Text style={styles.sectionViewAll}>View All</Text>
                  </TouchableOpacity>
                </View>
              )}
              {hearingsData?.length > 0 && (
                <FlatList
                  numColumns={2}
                  data={hearingsData.slice(0, 8)}
                  renderItem={renderHearingItem}
                  keyExtractor={keyExtractor}
                  style = {styles.hearingsList}
                  columnWrapperStyle={styles.hearingsColumnWrapper}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  initialNumToRender={4}
                  maxToRenderPerBatch={4}
                  windowSize={4}
                />
              )}
            </>
          }
        />
      </ImageBackground>
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
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 15,
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
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray,
  },
  sectionContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  sectionViewAll: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.themeTextColor,
  },
  clientsList: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  appointmentList: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  hearingsList: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  hearingsColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 3,
  },
});

export default HomeScreen;