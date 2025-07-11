import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';
import rootStore from '../stores/rootStore';

const RootStack = createNativeStackNavigator();

const MainNavigator = () => {
  const token = rootStore.authStore.token;

  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="AuthStack" component={AuthStack} />
    </RootStack.Navigator>
  );
};

export default MainNavigator;
