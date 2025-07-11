import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../app/config/theme';
import {AppImages} from '../../app/config/Images';
import {responsiveSize} from '../../app/utils/responsiveFontSize';

export const NoDataFound = ({noDataFoundText, noDataSubText}) => {
  return (
    <View style={Styles.container}>
      <Image source={AppImages.noDataFound} style={Styles.noDataFoundImg} />
      <Text style={Styles.noDataFoundText}>{noDataFoundText}</Text>
      <Text style={Styles.noDataSubText}>
        {noDataSubText}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataFoundImg: {
    height: 170,
    width: 170,
  },
  noDataFoundText: {
    fontSize: responsiveSize(20),
    fontWeight: '500',
    marginTop: 20,
    color: colors.themeTextColor,
  },
  noDataSubText: {
    color: colors.gray,
    fontSize: 14,
    marginTop:5
  },
});
