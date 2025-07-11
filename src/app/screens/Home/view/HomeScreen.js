// features/home/view/HomeScreen.js
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {AppImages} from '../../../config/Images';
import {colors} from '../../../config/theme';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';
import {useHomeViewModel} from '../viewModel/useHomeViewModel';
import ClientItem from '../components/CientItem';
import AppointmentItem from '../components/AppointmentItem';
import HearingItem from '../components/HearingItem';
import HomeSkeleton from './HomeSkeleton';

const {width} = Dimensions.get('screen');

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
  } = useHomeViewModel();

  if (isLoading) {
    return <HomeSkeleton />;
  }
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

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Clients Section */}
          {clientsData.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Clients</Text>
              <TouchableOpacity onPress={handleViewAllClients}>
                <Text style={styles.sectionViewAll}>View All</Text>
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            horizontal
            data={clientsData}
            renderItem={({item, index}) => (
              <ClientItem
                item={item}
                index={index}
                isLast={index === clientsData.length - 1}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.clientsList}
            showsHorizontalScrollIndicator={false}
          />

          {/* Appointments Section */}
          {appointmentsData.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Appointments</Text>
              <TouchableOpacity onPress={handleViewAllAppointments}>
                <Text style={styles.sectionViewAll}>View All</Text>
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            horizontal
            data={appointmentsData.slice(0, 20)}
            renderItem={({item, index}) => (
              <AppointmentItem
                item={item}
                index={index}
                isLast={index === appointmentsData.length - 1}
                formattedDate={formattedDate}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.appointmentList}
            showsHorizontalScrollIndicator={false}
          />

          {/* Hearings Section */}
          {hearingsData?.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Hearings</Text>
              <TouchableOpacity onPress={handleViewAllHearings}>
                <Text style={styles.sectionViewAll}>View All</Text>
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            numColumns={2}
            data={hearingsData.slice(0, 8)}
            renderItem={({item}) => (
              <HearingItem formattedDate={formattedDate} item={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
            // initialNumToRender={6}
            contentContainerStyle={styles.hearingsList}
            columnWrapperStyle={styles.hearingsColumnWrapper}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </ScrollView>
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
