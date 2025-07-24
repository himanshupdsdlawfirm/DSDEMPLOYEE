import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import HomeScreen from '../screens/Home/view/HomeScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {
          width: '60%', // Adjust drawer width (60% of screen)
          backgroundColor: 'transparent',
        },
        sceneContainerStyle: {
          backgroundColor: '#061623',
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
};



export default DrawerNavigator;