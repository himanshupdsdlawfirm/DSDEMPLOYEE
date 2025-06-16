import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors} from '../../../../config/theme';
import {topPadding} from '../../../../config/CommonStyle';
import CustomHeader from '../../../../../components/common/CustomHeader';
import { AppImages } from '../../../../config/Images';

export const LoginHeader = () => (
  <>
    <CustomHeader
      leftImageSource={AppImages.backArrow}
      leftImageContainerStyle={styles.headerLeftImageContainer}
      onLeftPress={() => console.log('Left pressed')}
      headerStyle={styles.headerStyle}
    />
    <Text style={styles.title}>Login</Text>
  </>
);

const styles = StyleSheet.create({
  headerLeftImageContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    backgroundColor: '#061623',
  },
  headerStyle: {
    backgroundColor: 'transparent',
    marginTop: topPadding(),
    
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 30,
    textAlign: 'left',
    color: colors.white,
  },
});