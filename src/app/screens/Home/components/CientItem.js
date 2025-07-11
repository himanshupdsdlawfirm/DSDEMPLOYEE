// features/home/components/ClientItem.js
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {AppImages} from '../../../config/Images';
import {colors} from '../../../config/theme';
import {moderateScale} from '../../../utils/fontsize';

const ClientItem = ({item, index, isLast}) => {
  console.log('clients items::', item);

  return (
    <TouchableOpacity
      style={[
        styles.clientItem,
        {
          marginLeft: index === 0 ? 0 : 5,
          marginRight: isLast ? 0 : 5,
        },
      ]}>
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
      <Text numberOfLines={2} style={styles.clientName}>
        {item?.client_name}
      </Text>
      <Text numberOfLines={1} style={styles.clientId}>
        {item?.alien_number}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clientItem: {
    width: 110,
    alignItems: 'center',
  },
  clientImageContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.themeTextColor,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  clientImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: colors.imageBorderColor,
    borderWidth: 2,
  },
  pinIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    bottom: 3,
    right: 16,
  },
  clientName: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 5,
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientId: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    textAlign: 'center',
    color: colors.textGray,
    letterSpacing: 0.5,
  },
});

export default ClientItem;
