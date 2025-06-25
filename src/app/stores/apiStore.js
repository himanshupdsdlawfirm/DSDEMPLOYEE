// stores/ApiStore.js
import { makeAutoObservable } from 'mobx';
import { ApiService } from '../services/apiService';

class ApiStore {
  loading = false;
  error = null;
  networkError = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Generic API call handler
  async callApi(apiCallFn, successCallback, errorCallback) {
    this.loading = true;
    this.error = null;
    this.networkError = false;

    try {
      const response = await apiCallFn();
      
      if (response.success) {
        if (successCallback) {
          successCallback(response.data);
        }
      } else {
        this.error = response.error;
        this.networkError = response.error === 'No internet connection';
        
        if (errorCallback) {
          errorCallback(response);
        }
      }
      
      return response;
    } catch (error) {
      console.error('API call failed:', error);
      this.error = error.message || 'An error occurred';
      
      if (errorCallback) {
        errorCallback({ success: false, error: this.error });
      }
      
      return { success: false, error: this.error };
    } finally {
      this.loading = false;
    }
  }

  // Example API methods
  async fetchUserData(userId, successCallback, errorCallback) {
    return this.callApi(
      () => ApiService.get(`/users/${userId}`),
      successCallback,
      errorCallback
    );
  }

  async updateUserProfile(userId, data, successCallback, errorCallback) {
    return this.callApi(
      () => ApiService.put(`/users/${userId}`, data),
      successCallback,
      errorCallback
    );
  }

  async deleteResource(resourceId, successCallback, errorCallback) {
    return this.callApi(
      () => ApiService.delete(`/resources/${resourceId}`),
      successCallback,
      errorCallback
    );
  }

  // Add more API methods as needed
}

const apiStore = new ApiStore();
export default apiStore;