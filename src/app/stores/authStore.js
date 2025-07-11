import {makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStore {
  token = null;
  userId = null;
  is_superuser = false;
  userDeatil = {};
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.loadToken();
  }

  async loadToken() {
    this.token = await AsyncStorage.getItem('userToken');
    this.userId = await AsyncStorage.getItem('userId');
    this.is_superuser = JSON.parse(await AsyncStorage.getItem('isSuperUser'));
    this.userDeatil = JSON.parse(await AsyncStorage.getItem('userDetail'));
    console.log('user tok::', this.token);
  }

  setToken(token) {
    this.token = token;

    AsyncStorage.setItem('userToken', token);
  }

  clearToken() {
    this.token = null;
    this.userId = null;
    this.is_superuser = false;
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('isSuperUser');
  }

  setUserId(userId) {
    this.userId = userId;

    AsyncStorage.setItem('userId', userId);
  }

  setIsSuperUser(isSuperUser) {
    this.is_superuser = isSuperUser;
    AsyncStorage.setItem('isSuperUser', JSON.stringify(isSuperUser));
  }

  setUserDeatil(item) {
    this.userDeatil = item;
    AsyncStorage.setItem('userDetail', JSON.stringify(item));
  }

  setLoading(loading) {
    this.isLoading = loading;
  }

  setError(error) {
    this.error = error;
  }

  clearError() {
    this.error = null;
  }
}

export default AuthStore;
