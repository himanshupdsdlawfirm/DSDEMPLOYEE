import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ionicons from '@react-native-vector-icons/ionicons';
import {AppImages} from '../config/Images';
import {colors} from '../config/theme';
import {moderateScale, verticalScale} from '../utils/fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveSize} from '../utils/responsiveFontSize';
import rootStore from '../stores/rootStore';
import {CommonActions} from '@react-navigation/native';

// Move constant data outside the component
const DRAWER_ITEMS = [
  {
    id: 1,
    title: 'Account Settings',
    data: [
      {
        itemId: 1,
        name: 'Notification',
        image: AppImages.notificationBell,
      },
    ],
  },
  {
    id: 2,
    title: 'Features',
    data: [
      {
        itemId: 1,
        name: 'Appointments',
        image: AppImages.appointment,
      },
      {
        itemId: 2,
        name: 'Clients',
        image: AppImages.client,
      },
      {
        itemId: 3,
        name: 'Cases',
        image: AppImages.cases,
      },
      {
        itemId: 4,
        name: 'Hearings',
        image: AppImages.hearing,
      },
    ],
  },
  {
    id: 3,
    title: 'USCIS',
    data: [
      {
        itemId: 1,
        name: 'USCIS Tracker',
        image: AppImages.uscisTracker,
      },
    ],
  },
  {
    id: 4,
    title: 'Others',
    data: [
      {
        itemId: 1,
        name: "FAQ's",
        image: AppImages.faq,
      },
      {
        itemId: 2,
        name: 'Terms & Condition',
        image: AppImages.termsCondition,
      },
      {
        itemId: 3,
        name: 'Privacy & Policy',
        image: AppImages.privacyPolicy,
      },
      {
        itemId: 4,
        name: 'Contact Us',
        image: AppImages.contactUs,
      },
    ],
  },
];

const CustomDrawer = React.memo(props => {
  const userDetail = rootStore.authStore.userDeatil;
  const userImage = userDetail?.profile_image ? userDetail?.profile_image: null;
  const fullUrl = userImage?.name ? userImage.name.trim() : null;

  // Memoize user details
  const memoizedUserDetail = useMemo(
  () => ({
    name: userDetail?.name ? userDetail.name.trim() : '',
    email: userDetail?.email ? userDetail.email.trim() : '',
  }),
  [userDetail?.name, userDetail?.email],
);

  const handleNavigation = useCallback(
    name => {
      switch (name) {
        case 'USCIS Tracker':
          props.navigation.navigate('CaseList');
          break;
        case 'Appointments':
          props.navigation.navigate('AppointmentList');
          break;
        case 'Hearings':
          props.navigation.navigate('HearingList', {backScreen: 'Drawer'});
          break;
        case 'Cases':
          props.navigation.navigate('CasesScreenList', {backScreen: 'Drawer'});
          break;
        case 'Clients':
          props.navigation.navigate('ClientList');
          break;
        default:
          break;
      }
    },
    [props.navigation],
  );

  const handleSignOut = useCallback(() => {
    rootStore.authStore.clearToken();
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AuthStack'}],
      }),
    );
  }, [props.navigation]);

  const renderDrawerItem = useCallback(
    (i, item) => (
      <TouchableOpacity
        key={i?.itemId}
        onPress={() => handleNavigation(i?.name)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderBottomWidth: item.data.length - 1 ? 0.2 : 0,
          borderColor: colors.borderColor,
        }}>
        <Image
          source={i?.image}
          style={{
            height: 22,
            width: 22,
            tintColor: colors.themeActiveTint,
          }}
        />
        <View
          style={{
            width: 150,
            marginLeft: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: moderateScale(14),
              color: colors.white,
              fontWeight: '400',
              textAlign: 'left',
              paddingBottom: 3,
            }}>
            {i?.name}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [handleNavigation],
  );

  const renderDrawerSection = useCallback(
    item => (
      <View
        key={item.id}
        style={{
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: responsiveSize(16, 'font'),
            fontWeight: '600',
            color: colors.white,
            paddingHorizontal: 15,
            marginBottom: 5,
            marginTop: item.id === 1 ? 5 : 15,
          }}>
          {item?.title}
        </Text>
        <View
          style={{
            backgroundColor: colors.bottomTabLightGray,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
          }}>
          {item?.data.map(i => renderDrawerItem(i, item))}
        </View>
      </View>
    ),
    [renderDrawerItem],
  );

  return (
    <LinearGradient
      colors={[colors.themeBgColor, colors.bottomTabLightGray]}
      style={styles.container}
      locations={[0, 1]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={styles.backgroundImage}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            {userImage ? (
              <Image style={styles.userProfilePic} source={{uri: fullUrl}} />
            ) : (
              <Ionicons name="person" size={40} color={colors.lightGray} />
            )}
          </View>
          <Text numberOfLines={1} style={styles.profileName}>
            {memoizedUserDetail.name}
          </Text>
          <Text numberOfLines={1} style={styles.profileEmail}>
            {memoizedUserDetail.email}
          </Text>
        </View>
        <View style={styles.overlay} />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'android' ? 120 : 160,
        }}>
        <View contentContainerStyle={styles.drawerContent}>
          {DRAWER_ITEMS.map(renderDrawerSection)}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSignOut} style={styles.footerButton}>
          <Ionicons name="log-out" size={24} color={colors.themeActiveTint} />
          <Text style={styles.footerText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061623',
    paddingVertical: 30,
  },
  backgroundImage: {
    justifyContent: 'flex-end',
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  profileContainer: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 255, 236, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.lightGray,
    marginBottom: 10,
  },
  userProfilePic: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  profileName: {
    color: '#00FFEC',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    color: 'rgba(0, 255, 236, 0.7)',
    fontSize: 14,
  },
  drawerContent: {
    width: '100%',
  },
  footer: {
    borderTopWidth: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(90) : verticalScale(130),
    borderTopColor: 'rgba(0, 255, 236, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: colors.bottomTabSignOut,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: '#00FFEC',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: moderateScale(14),
  },
});

export default CustomDrawer;
