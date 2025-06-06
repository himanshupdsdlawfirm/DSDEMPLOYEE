import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useApi from '../../hooks/useApi';
import { getUserProfile } from '../../services/uathServices';
import Loader from '../../../components/common/Loader';

const SettingsScreen = ({ navigation }) => {
  const getUserApi = useApi(getUserProfile);

  useEffect(() => {
    getUserApi.request();
  }, []);

  return (
    <View style={styles.container}>
      {getUserApi.loading ? (
        <Loader />
      ) : (
        <>
          <Text>Setting Screen</Text>
          <Text>{getUserApi.data?.name}</Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;