import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import OtpScreen from '../screens/Auth/Otp';
import DetailsScreen from '../screens/Detail';
import AddCaseScreen from '../screens/USCISTracker/AddCase';
import CaseListScreen from '../screens/USCISTracker/CaseList';
import CaseDetailsScreen from '../screens/USCISTracker/CaseDetails';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerNavigator from './DrawerNavigator';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import HearingsScreen from '../screens/Hearings';
import AppointmentsScreen from '../screens/Appointments';
import ClientsScreen from '../screens/Clients';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AddCase" component={AddCaseScreen} />
      <Stack.Screen name="CaseList" component={CaseListScreen} />
      <Stack.Screen name="CaseDetails" component={CaseDetailsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="HearingList" component={HearingsScreen} />
      <Stack.Screen name="AppointmentList" component={AppointmentsScreen} />
      <Stack.Screen name="ClientList" component={ClientsScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
