// features/home/components/SkeletonLoader.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../../config/theme';

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.headerSkeleton}>
        <View style={styles.headerLeftSkeleton} />
        <View style={styles.headerRightSkeleton} />
      </View>

      {/* Search Bar Skeleton */}
      <View style={styles.searchSkeleton} />

      {/* Scroll Content */}
      <View style={styles.scrollContent}>
        {/* Clients Section Skeleton */}
        <View style={styles.sectionHeaderSkeleton} />
        <View style={styles.horizontalList}>
          {[...Array(5)].map((_, i) => (
            <View key={`client-${i}`} style={styles.clientItemSkeleton}>
              <View style={styles.clientImageSkeleton} />
              <View style={styles.clientTextSkeleton} />
              <View style={styles.clientIdSkeleton} />
            </View>
          ))}
        </View>

        {/* Appointments Section Skeleton */}
        <View style={styles.sectionHeaderSkeleton} />
        <View style={styles.horizontalList}>
          {[...Array(3)].map((_, i) => (
            <View key={`appointment-${i}`} style={styles.appointmentSkeleton} />
          ))}
        </View>

        {/* Hearings Section Skeleton */}
        <View style={styles.sectionHeaderSkeleton} />
        <View style={styles.gridContainer}>
          {[...Array(4)].map((_, i) => (
            <View key={`hearing-${i}`} style={styles.hearingSkeleton}>
              <View style={styles.hearingHeaderSkeleton} />
              <View style={styles.hearingBodySkeleton} />
              <View style={styles.hearingFooterSkeleton} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
    paddingBottom: 100,
  },
  headerSkeleton: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: colors.themeBgColor,
  },
  headerLeftSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.skeletonBg,
  },
  headerRightSkeleton: {
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.skeletonBg,
  },
  searchSkeleton: {
    height: 42,
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: colors.skeletonBg,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  sectionHeaderSkeleton: {
    height: 20,
    width: 100,
    marginBottom: 15,
    borderRadius: 4,
    backgroundColor: colors.skeletonBg,
  },
  horizontalList: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  clientItemSkeleton: {
    width: 110,
    alignItems: 'center',
    marginRight: 10,
  },
  clientImageSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.skeletonBg,
    marginBottom: 10,
  },
  clientTextSkeleton: {
    width: 80,
    height: 12,
    borderRadius: 4,
    backgroundColor: colors.skeletonBg,
    marginBottom: 5,
  },
  clientIdSkeleton: {
    width: 60,
    height: 10,
    borderRadius: 4,
    backgroundColor: colors.skeletonBg,
  },
  appointmentSkeleton: {
    width: 240,
    height: 150,
    borderRadius: 12,
    backgroundColor: colors.skeletonBg,
    marginRight: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hearingSkeleton: {
    width: '48%',
    height: 200,
    borderRadius: 10,
    backgroundColor: colors.skeletonBg,
    marginBottom: 15,
    overflow: 'hidden',
  },
  hearingHeaderSkeleton: {
    height: 30,
    backgroundColor: colors.skeletonDarkBg,
  },
  hearingBodySkeleton: {
    padding: 10,
  },
  hearingFooterSkeleton: {
    height: 40,
    backgroundColor: colors.skeletonDarkBg,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SkeletonLoader;