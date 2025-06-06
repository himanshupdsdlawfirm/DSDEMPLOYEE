import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context';
import MainStack from './MainStackNavigator';
import AuthStack from './AuthStack';

const RootStack = createStackNavigator();

const MainNavigator = () => {
  const { user } = useAuth();

  console.log('user state::', user);
  

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <RootStack.Screen name="Main" component={MainStack} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
};

export default MainNavigator;