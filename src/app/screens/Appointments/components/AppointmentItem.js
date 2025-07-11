// features/appointments/view/components/AppointmentItem.js
import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveSize} from '../../../utils/responsiveFontSize';
import {colors} from '../../../config/theme';
import {AppImages} from '../../../config/Images';

const AppointmentItem = memo(({item, formattedDate, formattedTime}) => {
  console.log('appointment list item::', item);
  
  return (
    <LinearGradient
      style={styles.appointmentContainer}
      colors={['#F7A80E', '#114A4A', '#21415F']}
      start={{x: 1, y: 1}}
      end={{x: 0.4, y: 0}}
      locations={[0, 0.6, 1]}
      useAngle={false}>
      <TouchableOpacity style={styles.appointmentSubContainer}>
        {item?.client_name && (
          <Text numberOfLines={1} style={styles.clientName}>
            {item?.client_name || 'No Name'}
          </Text>
        )}
        <View style={styles.dateTimeContainer}>
          <Image source={AppImages.calendarClock} style={styles.smallIcon} />
          <Text style={styles.appointmentTime}>
            {`${formattedDate(item?.date)} ${item?.start_time} - ${
              item?.end_time
            }`}
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          
          {item.appointmentType && (
            <View style={styles.tag}>
              <Text numberOfLines={1} style={styles.tagText}>
                {item?.appointmentType}
              </Text>
            </View>
          )}
          
            <View style={styles.tag}>
              <Text numberOfLines={1} style={styles.tagText}>
                {'3 Guest'}
              </Text>
            </View>
          
          {item.payment_mode && (
            <View style={styles.tag}>
              <Text numberOfLines={1} style={styles.tagText}>
                {item?.payment_mode}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
});

const styles = {
  appointmentContainer: {
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  appointmentSubContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 15,
  },
  clientName: {
    fontSize: responsiveSize(24, 'font'),
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.5,
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
  appointmentTime: {
    marginVertical: 10,
    marginLeft:5,
    fontSize: responsiveSize(16, 'font'),
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  tag: {
    backgroundColor: colors.white,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  tagText: {
    fontSize: responsiveSize(18, 'font'),
    fontWeight: '400',
    color: colors.black,
    letterSpacing: 0.5,
  },
};

export default AppointmentItem;
