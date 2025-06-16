import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {LinearGradientHeader} from '../../../components/common/LinerGradientHeader';
import {AppImages} from '../../config/Images';
import {colors} from '../../config/theme';

const SearchScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const searchHandle = text => {
    setSearchText(text);
  };

  return (
    <>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <LinearGradientHeader
          goBack={() => navigation.goBack()}
          showBackBtnContainer={true}
          showBackBtn={true}
          leftImg={AppImages.backIcon}
          leftImgTint={colors.white}
          headerText="Search"
          isSecondEndImg={false}
          isEndRightImg={false}
          isHeaderBottomText={false}
          headerBottomTitle={`Refreshed: ${new Date().toLocaleString()}`}
        />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              flex: 1,
              height: 900,
            }}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 15,
                marginTop: 30,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  backgroundColor: colors.bottomTabLightGray,
                  borderWidth: 1,
                  borderColor: colors.inputBorderColor,
                  borderRadius: 8,
                  alignSelf: 'center',
                  height: 42,
                }}>
                <Image
                  source={AppImages.searchIcon}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
                <TextInput
                  onChangeText={searchHandle}
                  value={searchText}
                  placeholder="Search"
                  placeholderTextColor={colors.gray}
                  onFocus={console.log('shkjasdkakjdgjak::::::::')}
                  onBlur={() => {
                    Keyboard.dismiss();
                  }}
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    fontSize: 14,
                    fontWeight: '400',
                    color: colors.white,
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
