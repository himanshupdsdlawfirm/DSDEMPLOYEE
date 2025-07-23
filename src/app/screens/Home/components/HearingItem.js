// features/home/components/HearingItem.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import {AppImages} from '../../../config/Images';
import {colors} from '../../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveSize} from '../../../utils/responsiveFontSize';

const HearingItem = ({item, formattedDate}) => {
  console.log('hearing item home::', item);

  return (
    <View style={styles.hearingContainer}>
      <LinearGradient
        colors={[colors.hearingCardLinearOne, colors.hearingCardLinearTwo]}
        style={styles.hearingLinearCard}>
        <TouchableOpacity activeOpacity={1} style={styles.hearingItem}>
          {/* Header */}
          <LinearGradient
            style={styles.headerGradient}
            colors={['#384651', '#051422']}
            locations={[0, 1]}
            start={{x: 1, y: 0}}
            end={{x: 0.5, y: 0}}>
            {item?.date ? (
              <View style={styles.headerContent}>
                <Image
                  source={AppImages.calendarClock}
                  style={styles.smallIcon}
                />
                <Text numberOfLines={1} style={styles.headerText}>
                  {`${formattedDate(item?.date)}  ${item?.time}`}
                </Text>
              </View>
            ) : null}
          </LinearGradient>
          {item?.hearing_status && (
            <View
              style={{
                paddingVertical: 5,
                marginTop: 10,
                maxWidth: '60%',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '70%',
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
          )}

          {/* Body */}
          {item?.client_name ? (
            <Text numberOfLines={1} style={styles.clientName}>
              {item?.client_name}
            </Text>
          ) : null}
          {item?.alien_number ? (
            <Text style={styles.clientId}>{item?.alien_number}</Text>
          ) : null}
          {item?.court_name ? (
            <View style={styles.locationContainer}>
              <Image
                source={AppImages.locationCheck}
                style={styles.sheildIcon}
              />
              <Text numberOfLines={1} style={styles.locationText}>
                {item?.court_name}
              </Text>
            </View>
          ) : null}

          {item?.judge_name ? (
            <View style={styles.userContainer}>
              <Image source={AppImages.userShield} style={styles.sheildIcon} />
              <Text numberOfLines={1} style={styles.userText}>
                {item?.judge_name}
              </Text>
            </View>
          ) : null}

          {/* Footer */}
          <LinearGradient
            style={styles.footerGradient}
            colors={['#384651', '#051422']}
            locations={[0, 1]}
            start={{x: 1, y: 0}}
            end={{x: 0.5, y: 0}}>
            <View style={styles.footerContent}>
              {item?.attorney_name ? (
                <View style={styles.footerRow}>
                  <Image
                    source={AppImages.userAnimyPlaceholder}
                    style={styles.userIcon}
                  />
                  <Text numberOfLines={1} style={styles.footerName}>
                    {item?.attorney_name}
                  </Text>
                </View>
              ) : null}
              {item?.hearing_medium_attorney && (
                <Text numberOfLines={1} style={styles.hearingTypeText}>
                  {item.hearing_medium_attorney}
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
  );
};

const styles = StyleSheet.create({
  hearingContainer: {
    width: '48%',
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowColor: colors.borderColor,
  },
  hearingLinearCard: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
  },
  hearingItem: {
    width: '100%',
    padding: 10,
  },
  headerGradient: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: Platform.OS === 'android' ? 1 : 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    backgroundColor: colors.themeBgColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: Platform.OS === 'android' ? '100%' : '99%',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 1,
  },
  smallIcon: {
    height: 15,
    width: 15,
  },
  headerText: {
    fontSize: responsiveSize(14, 'font'),
    fontWeight: '400',
    flex: 1,
    marginLeft: 5,
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientName: {
    fontSize: responsiveSize(20, 'font'),
    fontWeight: '400',
    marginTop: 10,
    marginHorizontal: 10,
    color: colors.themeTextColor,
    letterSpacing: 0.5,
  },
  clientId: {
    fontSize: responsiveSize(18, 'font'),
    fontWeight: '400',
    marginHorizontal: 10,
    color: colors.textGray,
    letterSpacing: 0.5,
  },
  locationContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  sheildIcon: {
    height: 16,
    width: 16,
    tintColor: colors.sheildIconColor,
  },
  locationText: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginHorizontal: 10,
    color: colors.textGray,
    letterSpacing: 0.5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  userText: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginHorizontal: 10,
    color: colors.textGray,
    letterSpacing: 0.5,
  },
  footerGradient: {
    width: '100%',
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: Platform.OS === 'android' ? 1 : 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContent: {
    width: Platform.OS === 'android' ? '100%' : '99%',
    height:
      Platform.OS === 'android'
        ? responsiveSize(90, 'height')
        : responsiveSize(80, 'height'),
    borderRadius: 11,
    backgroundColor: colors.themeBgColor,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingRight: 5,
  },
  userIcon: {
    height: 22,
    width: 22,
  },
  footerName: {
    fontSize: responsiveSize(20, 'font'),
    fontWeight: '600',
    marginHorizontal: 10,
    color: colors.white,
    letterSpacing: 0.5,
  },
  ihIcon: {
    height: 18,
    width: 18,
  },
  footerType: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginLeft: 5,
    color: colors.textGray,
    letterSpacing: 0.5,
  },
  hearingTypeText: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginTop: 5,
    color: colors.textGray,
  },
  hearingTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bullet: {
    fontSize: responsiveSize(22, 'font'),
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.5,
  },
});

export default HearingItem;
