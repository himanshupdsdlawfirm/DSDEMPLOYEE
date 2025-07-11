import React, {memo} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../config/theme';
import {AppImages} from '../../../config/Images';
import {ActivityIndicator} from 'react-native';
import {styles} from '../view/Styles';

const HearingItem = memo(({item, formattedDate}) => (
  <LinearGradient
    colors={[colors.hearingCardLinearOne, colors.hearingCardLinearTwo]}
    style={styles.hearingLinearCard}>
    <View style={styles.hearingItem}>
      <LinearGradient
        style={styles.hearingDateContainer}
        colors={['#384651', '#051422']}
        locations={[0, 1]}
        start={{x: 1, y: 0}}
        end={{x: 0.5, y: 0}}>
        {item?.date || item?.time ? (
          <View style={styles.hearingDateInner}>
            <Image
              source={AppImages.calendarClock}
              style={styles.calendarIcon}
            />
            <Text numberOfLines={1} style={styles.hearingDateTime}>
              {`${formattedDate(item?.date)}  ${item?.time}`}
            </Text>
          </View>
        ) : null}
      </LinearGradient>
      {item?.client_name ? (
        <Text numberOfLines={1} style={styles.hearingName}>
          {item?.client_name}
        </Text>
      ) : null}
      {item?.item?.alien_number ? (
        <Text numberOfLines={1} style={styles.hearingAlienNumber}>
          {item?.alien_number}
        </Text>
      ) : null}
      {item?.court_name ? (
        <View style={styles.hearingLocationContainer}>
          <Image source={AppImages.locationCheck} style={styles.locationIcon} />
          <Text numberOfLines={1} style={styles.hearingLocation}>
            {item?.court_name}
          </Text>
        </View>
      ) : null}
      {item.judge_name ? (
        <View style={styles.hearingOfficerContainer}>
          <Image style={styles.officerIcon} source={AppImages.userShield} />
          <Text numberOfLines={1} style={styles.hearingOfficer}>
            {item.judge_name}
          </Text>
        </View>
      ) : null}
      <LinearGradient
        style={styles.hearingTypeContainer}
        colors={['#384651', '#051422']}
        locations={[0, 1]}
        start={{x: 1, y: 0}}
        end={{x: 0.5, y: 0}}>
        <View style={styles.hearingTypeInner}>
          {item.paralegal_name ? (
            <View style={styles.hearingOfficerRow}>
              <Image
                style={styles.userIcon}
                source={AppImages.userAnimyPlaceholder}
              />
              <Text numberOfLines={1} style={styles.hearingOfficerName}>
                {item.paralegal_name}
              </Text>
            </View>
          ) : null}
          {item.hearing_medium_attorney ? (
            <View style={styles.hearingTypeRow}>
              <Image
                style={styles.ihIcon}
                resizeMode="contain"
                source={AppImages.ihIcon}
              />
              <Text numberOfLines={1} style={styles.hearingTypeText}>
                <Text style={styles.hearingTypeBullet}>{' •  '}</Text>
                {item.hearing_medium_attorney}
              </Text>
            </View>
          ) : null}
        </View>
      </LinearGradient>
    </View>
  </LinearGradient>
));

const ClientHearings = memo(({hearingsData, loading, formattedDate}) => {
  console.log('hearingsData::', hearingsData);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (!hearingsData?.length) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No hearings found</Text>
      </View>
    );
  }

  return (
    <FlatList
      numColumns={2}
      data={hearingsData}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <HearingItem formattedDate = {formattedDate} item={item} />}
      contentContainerStyle={styles.hearingsList}
      columnWrapperStyle={styles.hearingsColumnWrapper}
      showsVerticalScrollIndicator={false}
    />
  );
});

export default ClientHearings;
