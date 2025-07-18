// features/home/components/HomeSkeleton.js
import React from 'react';
import {View, StyleSheet, ImageBackground, StatusBar, Platform} from 'react-native';
import {AppImages} from '../../../config/Images';
import {colors} from '../../../config/theme';
import Shimmer from '../../../../components/common/Shimmer';

const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Shimmer width={40} height={40} style={styles.headerLeft} />
          <Shimmer width={100} height={24} style={styles.headerText} />
          <View style={styles.headerRightContainer}>
            <Shimmer width={24} height={24} style={styles.headerRightIcon} />
            <Shimmer width={24} height={24} style={styles.headerRightIcon} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Shimmer width="100%" height={42} style={styles.searchBar} />
        </View>

        {/* Scroll Content */}
        <View style={styles.scrollContent}>
          {/* Clients Section */}
          <View style={styles.sectionContainer}>
            <Shimmer width={80} height={20} />
            <Shimmer width={60} height={20} />
          </View>
          <View style={styles.horizontalList}>
            {[...Array(5)].map((_, i) => (
              <View key={`client-${i}`} style={styles.clientItem}>
                <Shimmer width={60} height={60} style={styles.clientImage} />
                <Shimmer width={80} height={12} style={styles.clientText} />
                <Shimmer width={60} height={10} style={styles.clientText} />
              </View>
            ))}
          </View>

          {/* Appointments Section */}
          <View style={styles.sectionContainer}>
            <Shimmer width={120} height={20} />
            <Shimmer width={60} height={20} />
          </View>
          <View style={styles.horizontalList}>
            {[...Array(3)].map((_, i) => (
              <Shimmer
                key={`appointment-${i}`}
                width={240}
                height={150}
                style={styles.appointmentItem}
              />
            ))}
          </View>

          {/* Hearings Section */}
          <View style={styles.sectionContainer}>
            <Shimmer width={80} height={20} />
            <Shimmer width={60} height={20} />
          </View>
          <View style={styles.gridContainer}>
            {[...Array(4)].map((_, i) => (
              <Shimmer
                key={`hearing-${i}`}
                width="48%"
                height={200}
                style={styles.hearingItem}
              />
            ))}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 60,
  },
  headerLeft: {
    borderRadius: 20,
  },
  headerText: {
    borderRadius: 4,
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  headerRightIcon: {
    borderRadius: 12,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchBar: {
    borderRadius: 8,
  },
  scrollContent: {
    // paddingHorizontal: 15,
    paddingBottom: 100,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  horizontalList: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  clientItem: {
    width: 110,
    alignItems: 'center',
    marginRight: 10,
  },
  clientImage: {
    borderRadius: 30,
    marginBottom: 10,
  },
  clientText: {
    borderRadius: 4,
    marginBottom: 5,
  },
  appointmentItem: {
    borderRadius: 12,
    marginRight: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  hearingItem: {
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default HomeSkeleton;
