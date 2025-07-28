import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import OtpScreen from '../screens/Auth/Otp';
import DetailsScreen from '../screens/Detail';
import BottomTabNavigator from './BottomTabNavigator';
import SearchScreen from '../screens/Search';
import rootStore from '../stores/rootStore';
import ClientsScreen from '../screens/Clients/view/ClientScreen';
import HearingsScreen from '../screens/Hearings/view/HearingsScreen';
import AppointmentsScreen from '../screens/Appointments/view/AppointmentsScreen';
import CasesScreen from '../screens/Cases/view/CasesScreen';
import AddCaseScreen from '../screens/USCISTracker/AddCase/view';
import CaseListScreen from '../screens/USCISTracker/CaseList/view';
import CaseDetailsScreen from '../screens/USCISTracker/CaseDetails/view/CaseDetailsScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const token = rootStore.authStore.token;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
       initialRouteName={token ? 'MainTabs' : 'Login'}
      >
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
      <Stack.Screen name="CasesScreenList" component={CasesScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
