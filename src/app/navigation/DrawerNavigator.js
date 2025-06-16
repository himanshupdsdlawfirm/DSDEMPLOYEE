import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import CaseListScreen from '../screens/USCISTracker/CaseList';
import CaseDetailsScreen from '../screens/USCISTracker/CaseDetails';

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
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="CaseList" component={CaseListScreen} />
      <Drawer.Screen name="CaseDetails" component={CaseDetailsScreen} /> */}
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
};



export default DrawerNavigator;