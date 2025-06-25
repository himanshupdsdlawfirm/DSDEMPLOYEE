import {makeAutoObservable} from 'mobx';
import AuthService from '../services/authServices';

class AuthStore {
  cases = [];

  constructor() {
    makeAutoObservable(this);
  }

  addCase(item) {
    return this.cases.push(item);
  }

  deleteCase(item) {
    this.cases.filter(i => {
      return i.id !== item.id;
    });
  }

  



  static async getAccessToken() {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', 'bN3at0YDMGRmKhfSq5ZvwLCHIAzFgkvU');
      params.append('client_secret', 'GzCUm3jpfd0Z7j3s');

      // Make sure to use the raw URLSearchParams string without JSON.stringify
      const response = await ApiService.post(
        '/oauth/accesstoken',
        params.toString(), // This should NOT be wrapped in quotes
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      );

      console.log('Token response:', response);

      if (response.success) {
        return response.data.access_token;
      } else {
        throw new Error(response.error || 'Failed to get access token');
      }
    } catch (error) {
      console.error('Token Error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async getCaseStatus(caseNumber) {
    try {
      const token = await this.getAccessToken();
      console.log('token::', token);

      const response = await ApiService.get(
        `/case-status/${caseNumber}`,
        {}, // params
        {
          Authorization: `Bearer ${token}`,
        },
      );

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to get case status');
      }
    } catch (error) {
      console.error('Case Status Error:', error);
      throw error; // Re-throw the original error
    }
  }

  // ... other store methods
}

export default AuthStore;
