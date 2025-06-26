import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import {colors} from '../config/theme';
import {StyleSheet, View, Platform} from 'react-native';
import Cases from '../screens/Cases';
import LinearGradient from 'react-native-linear-gradient';
import DrawerNavigator from './DrawerNavigator';
import {responsiveSize} from '../utils/responsiveFontSize';
import HearingsScreen from '../screens/Hearings';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cases') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Hearing') {
            iconName = focused ? 'people' : 'people-outline';
          }
          // else if (route.name === 'Settings') {
          //   iconName = focused ? 'settings' : 'settings-outline';
          // }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.themeActiveTint,
        tabBarInactiveTintColor: colors.white,
        headerShown: false,
        animation: 'fade',
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          fontSize: 16,
          backgroundColor: 'transparent',
          paddingTop: 10,
          elevation: 0,
          height: Platform.OS === 'ios' ? 100 : 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
        tabBarLabelStyle: {
          fontSize: responsiveSize(16, 'font'),
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[colors.bottomTabLightGray, colors.themeBgColor]}
            style={styles.blurContainer}
          />
        ),
      })}>
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}

      <Tab.Screen name="Home" component={DrawerNavigator} />
      <Tab.Screen name="Cases" component={Cases} />
      <Tab.Screen name="Hearing" component={HearingsScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blurContainer: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgb(74, 87, 102)', // fallback for blur
  },
});
