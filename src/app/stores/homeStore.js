// stores/homeStore.js
import {makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeStore {
  clientList = [];
  isLoading = true;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  setClientList(list) {
    this.clientList = list;
    // AsyncStorage.setItem('clientList', JSON.stringify(list));
  }

  setLoading(loading) {
    this.isLoading = loading;
  }

  setError(error) {
    this.error = error;
  }

  async loadClientList() {
    try {
      const list = await AsyncStorage.getItem('clientList');
      if (list) {
        this.clientList = JSON.parse(list);
      }
    } catch (error) {
      this.setError(error.message);
    }
  }
}

export default HomeStore;