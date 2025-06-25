// viewModels/UserViewModel.js
import { makeAutoObservable } from 'mobx';
import apiStore from '../stores/ApiStore';

class UserViewModel {
  userData = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(caseNumber) {
    await apiStore.fetchUserData(
      caseNumber,
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error('Failed to fetch user:', error);
      }
    );
  }

  get isLoading() {
    return apiStore.loading;
  }

  get error() {
    return apiStore.error;
  }

  get hasNetworkError() {
    return apiStore.networkError;
  }
}

export default UserViewModel;