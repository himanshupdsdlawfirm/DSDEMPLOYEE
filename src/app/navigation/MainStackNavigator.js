import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import DetailsScreen from '../screens/Detail';
import AddCaseScreen from '../screens/USCISTracker/AddCase';
import CaseListScreen from '../screens/USCISTracker/CaseList';
import CaseDetailsScreen from '../screens/USCISTracker/CaseDetails';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AddCase" component={AddCaseScreen} />
      <Stack.Screen name="CaseList" component={CaseListScreen} />
      <Stack.Screen name="CaseDetails" component={CaseDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
