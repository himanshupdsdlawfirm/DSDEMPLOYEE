import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../../app/context';

const CustomDrawerContent = (props) => {
  const { user, signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>
          {user ? `Welcome, ${user.name}` : 'Welcome Guest'}
        </Text>
      </View>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />
      {user && (
        <DrawerItem
          label="Sign Out"
          onPress={() => {
            signOut();
            props.navigation.closeDrawer();
          }}
        />
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;