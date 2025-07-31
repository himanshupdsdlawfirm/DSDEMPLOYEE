// features/home/components/AppointmentItem.js
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {AppImages} from '../../../config/Images';
import {colors} from '../../../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveSize} from '../../../utils/responsiveFontSize';

const AppointmentItem = ({item, index, isLast, formattedDate}) => {
  const guestCount = item?.additional_guest.split(',').map(name => name.trim());
  const totalGuestCount = guestCount.length;

  return (
    <LinearGradient
      style={[
        styles.appointmentContainer,
        {
          marginLeft: index === 0 ? 0 : 10,
          marginRight: isLast ? 0 : 10,
        },
      ]}
      colors={['#F7A80E', '#114A4A', '#21415F']}
      start={{x: 1, y: 1}}
      end={{x: 0.4, y: 0}}
      locations={[0, 0.6, 1]}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.appointmentSubContainer}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: responsiveSize(20, 'font'),
            fontWeight: '600',
            color: colors.white,
            letterSpacing: 0.5,
          }}>
          {item?.client_name}
        </Text>
        {(item?.date || item?.start_time) && (
          <View style={styles.dateTimeContainer}>
            <Image source={AppImages.calendarClock} style={styles.smallIcon} />
            <Text style={styles.dateTimeText}>
              {`${formattedDate(item?.date)} ${item?.start_time} - ${
                item?.end_time
              }`}
            </Text>
          </View>
        )}
        <View style={styles.tagsContainer}>
          {item?.appointmentType && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item?.appointmentType}</Text>
            </View>
          )}
          {totalGuestCount > 0 && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{`${totalGuestCount} Guest`}</Text>
            </View>
          )}
          {item?.payment_mode && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item?.payment_mode}</Text>
            </View>
          )}
          {item?.staff_member_name && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item?.staff_member_name}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  appointmentContainer: {
    width: responsiveSize(240),
    borderRadius: 12,
    alignItems: 'center',
  },
  appointmentSubContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 15,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  smallIcon: {
    height: 15,
    width: 15,
  },
  dateTimeText: {
    marginVertical: 10,
    fontSize: responsiveSize(12, 'font'),
    fontWeight: '400',
    color: colors.white,
    marginLeft: 5,
    letterSpacing: 0.5,
  },
  tagsContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    gap: 7,
  },
  tag: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tagText: {
    fontSize: responsiveSize(14, 'font'),
    fontWeight: '400',
    color: colors.black,
    letterSpacing: 0.5,
  },
});

export default AppointmentItem;
