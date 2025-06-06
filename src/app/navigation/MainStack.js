import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import DetailsScreen from '../screens/Detail';
import AddCaseScreen from '../screens/USCISTracker/AddCase';
import CaseListScreen from '../screens/USCISTracker/CaseList';
import CaseDetailsScreen from '../screens/USCISTracker/CaseDetails';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;