// views/ClientsScreen.js
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import {AppImages} from '../../config/Images';
import {LinearGradientHeader} from '../../../components/common/LinerGradientHeader';
import {colors} from '../../config/theme';
import {moderateScale} from '../../utils/fontsize';
import clientsViewModel from './clientsViewModel/clientsViewModel';
import {useTheme} from '@react-navigation/native';
import CustomBottomSheet from '../../../components/common/CustomBottomSheet';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {responsiveSize} from '../../utils/responsiveFontSize';

const {width} = Dimensions.get('window');

const ClientsScreen = ({navigation}) => {
  const bottomSheetRef = useRef(null);

  const {searchText, filteredClients, handleSearch} = clientsViewModel();
  const [selectedItem, setSelectedItem] = useState(1);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const renderClientItem = useCallback(
    ({item, index}) => {
      console.log('index number::', index);
      return (
        <TouchableOpacity
          onPress={openBottomSheet}
          style={[
            styles.clientItem,
            {
              borderBottomWidth: index === filteredClients.length - 1 ? 0 : 1,
            },
          ]}>
          <View style={styles.clientItemSubContainer}>
            <View style={styles.clientImageContainer}>
              <Image source={item?.ClientImage} style={styles.clientImage} />
            </View>
            <View>
              <Text numberOfLines={1} style={styles.clientName}>
                {item?.name}
              </Text>
              <View style={styles.clientInfoContainer}>
                <Image source={AppImages.alienNumber} style={styles.infoIcon} />
                <Text numberOfLines={1} style={styles.clientId}>
                  {item.alienNumber}
                </Text>
                <View style={styles.separator} />
                <Image source={AppImages.call} style={styles.infoIcon} />
                <Text numberOfLines={1} style={styles.clientId}>
                  {item.phoneNumber}
                </Text>
              </View>
            </View>
          </View>
          <Image
            source={AppImages.rightArrow}
            style={{
              height: 24,
              width: 24,
              tintColor: colors.textGrayTwo,
            }}
          />
        </TouchableOpacity>
      );
    },
    [filteredClients.length],
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <View style={styles.container}>
      <ImageBackground source={AppImages.loginTheme} style={styles.container}>
        <LinearGradientHeader
          goBack={() => navigation.goBack()}
          showBackBtnContainer={true}
          showBackBtn={true}
          // leftImg={AppImages.backIcon}
          leftImg ={AppImages.backArrow}
          leftImgTint={colors.white}
          headerText="Clients"
          isSecondEndImg={false}
          isEndRightImg={false}
          isHeaderBottomText={false}
        />
        <BottomSheetModalProvider>
          <View style={styles.searchMainContainer}>
            <View style={styles.searchContainer}>
              <Image source={AppImages.searchIcon} style={styles.searchIcon} />
              <TextInput
                onChangeText={handleSearch}
                value={searchText}
                placeholder="Search by name, alien #, or phone"
                placeholderTextColor={colors.gray}
                onBlur={() => Keyboard.dismiss()}
                style={styles.searchInput}
                returnKeyType="search"
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Clients</Text>
          </View>

          <FlatList
            data={filteredClients}
            renderItem={renderClientItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.clientsList}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
          <CustomBottomSheet ref={bottomSheetRef}>
            <View
              style={{
                flex: 1,
                height: 600,
                width: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={AppImages.userAnimyPlaceholder}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: responsiveSize(12),
                    fontWeight: '400',
                    color: colors.white,
                    maxWidth: 110,
                    marginLeft: 8,
                  }}>
                  Ranjan Kumar
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                      backgroundColor: colors.textViewBg,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: responsiveSize(12),
                        fontWeight: '400',
                        maxWidth: 100,
                        color: colors.white,
                      }}>
                      Akash Gupta
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                      backgroundColor: colors.textViewBg,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: responsiveSize(12),
                        fontWeight: '400',
                        maxWidth: 90,
                        color: colors.white,
                      }}>
                      +1 656789876
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                  borderWidth: 1,
                  borderColor: colors.textGrayTwo,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => setSelectedItem(1)}
                  style={{
                    width: '33.33%',
                    height: 50,
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    backgroundColor:
                      selectedItem === 1
                        ? colors.textGrayTwo
                        : colors.transparent,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: responsiveSize(12),
                      fontWeight: '400',
                      color: colors.white,
                      maxWidth: 110,
                      marginLeft: 8,
                    }}>
                    Snapshots
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedItem(2)}
                  style={{
                    width: '33.33%',
                    height: 50,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: colors.textGrayTwo,
                    backgroundColor:
                      selectedItem === 2
                        ? colors.textGrayTwo
                        : colors.transparent,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: responsiveSize(14),
                      fontWeight: '400',
                      color: colors.white,
                      maxWidth: 110,
                      marginLeft: 8,
                    }}>
                    Cases
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedItem(3)}
                  style={{
                    width: '33.33%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    backgroundColor:
                      selectedItem === 3
                        ? colors.textGrayTwo
                        : colors.transparent,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: responsiveSize(14),
                      fontWeight: '400',
                      color: colors.white,
                      maxWidth: 110,
                      marginLeft: 8,
                    }}>
                    Hearings
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </CustomBottomSheet>
        </BottomSheetModalProvider>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
  },
  searchMainContainer: {
    paddingHorizontal: 15,
    marginTop: 30,
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.bottomTabLightGray,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
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
  sectionContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientsList: {
    paddingBottom: 20,
    paddingTop: 10,
    // paddingHorizontal: 15,
    backgroundColor: colors.clientListBg,
  },
  clientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.bottomTabSignOut,
  },
  clientItemSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientImageContainer: {
    height: 60,
    width: 60,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 3,
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
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  clientInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    height: 12,
    width: 12,
    tintColor: colors.sheildIconColor,
  },
  clientId: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.textGray,
    letterSpacing: 0.5,
    marginLeft: 5,
  },
  separator: {
    width: 1,
    height: 15,
    marginHorizontal: 10,
    backgroundColor: colors.white,
  },
});

export default ClientsScreen;
