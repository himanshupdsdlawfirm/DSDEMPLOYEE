import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import useApi from '../../hooks/useApi';
import {getUserProfile} from '../../services/uathServices';
import Loader from '../../../components/common/Loader';

const HomeScreen = ({navigation}) => {
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
          <Text>Home Screen</Text>
          <Text>{getUserApi.data?.name}</Text>
          <Button
            title="Go to USCIS Tracker dashboard"
            onPress={() => navigation.navigate('CaseList')}
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

export default HomeScreen;
