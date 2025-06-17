import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../context';
import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';

const RootStack = createStackNavigator();

const MainNavigator = () => {
  const {user} = useAuth();

  console.log('user state::', user);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Auth" component={AuthStack} />
    </RootStack.Navigator>
  );
};

export default MainNavigator;
