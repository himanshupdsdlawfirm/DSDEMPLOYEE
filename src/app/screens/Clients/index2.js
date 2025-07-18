import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import useApi from '../../hooks/useApi';
import Loader from '../../../components/common/Loader';
import {AppImages} from '../../config/Images';
import {LinearGradientHeader} from '../../../components/common/LinerGradientHeader';
import {colors} from '../../config/theme';
import {CommonActions, StackActions} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {moderateScale} from '../../utils/fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveSize} from '../../utils/responsiveFontSize';
import {GradientBorderHalfCircle} from '../../../components/common/LinearBorderColor';

const clientsData = [
  {name: 'Himanshu Pathak', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ankit', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Aditiya', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ashish', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Himanshu', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ankit', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Aditiya', ClientImage: AppImages.userAnimyPlaceholder},
  {name: 'Ashish', ClientImage: AppImages.userAnimyPlaceholder},
];

const ClientsScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const searchHandle = text => {
    setSearchText(text);
  };

  const renderClients = ({item, index}) => {
    const lastIndex = index === clientsData.length - 1;
    return (
      <TouchableOpacity style={[styles.clientItem]}>
        <View style={styles.clientImageContainer}>
          <Image source={item?.ClientImage} style={styles.clientImage} />
        </View>
        <View>
          <Text numberOfLines={1} style={styles.clientName}>
            {item?.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={AppImages.alienNumber}
              style={{
                height: 12,
                width: 12,
                tintColor: colors.white,
              }}
            />
            <Text numberOfLines={1} style={styles.clientId}>
              ABC2028937666
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 1,
                  height: 15,
                  marginHorizontal: 10,
                  backgroundColor: colors.white,
                }}
              />
              <Image
                source={AppImages.call}
                style={{
                  height: 12,
                  width: 12,
                  tintColor: colors.white,
                }}
              />
              <Text numberOfLines={1} style={styles.clientId}>
                +919540634090
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      {false ? (
        <Loader />
      ) : (
        <ImageBackground source={AppImages.loginTheme} style={styles.container}>
          <LinearGradientHeader
            goBack={() => navigation.goBack()}
            showBackBtnContainer={true}
            showBackBtn={true}
            leftImg={AppImages.backArrow}
            leftImgTint={colors.white}
            headerText="Clients"
            isSecondEndImg={false}
            isEndRightImg={false}
            isHeaderBottomText={false}
          />
          <View style={styles.searchMainContainer}>
            <View style={styles.searchContainer}>
              <Image source={AppImages.searchIcon} style={styles.searchIcon} />
              <TextInput
                onChangeText={searchHandle}
                value={searchText}
                placeholder="Search"
                placeholderTextColor={colors.gray}
                onFocus={console.log('shkjasdkakjdgjak::::::::')}
                onBlur={() => {
                  Keyboard.dismiss();
                }}
                style={styles.searchInput}
              />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Clients</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.clientsList}
            showsHorizontalScrollIndicator={false}
            data={clientsData}
            renderItem={renderClients}
          />
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 100,
    // flex:1,
  },
  searchMainContainer: {
    paddingHorizontal: 15,
    marginTop:30,
  },
  searchContainer: {
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
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
  },

  searchIcon: {
    height: 24,
    width: 24,
  },
  searchText: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray,
  },
  sectionContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientsList: {
    paddingBottom: 40,
    paddingTop: 10,
    // paddingHorizontal: 15,
  },
  clientItem: {
    width: 110,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
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
  clientName: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientId: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    width: 120,
    textAlign: 'center',
    color: colors.textGray,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
});

export default ClientsScreen;
