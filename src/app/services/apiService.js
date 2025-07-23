// services/apiService.js
import axios from 'axios';
import {checkNetworkConnection} from '../utils/networkAware';
import {base_url} from './env';
import rootStore from '../stores/rootStore';

const apiClient = axios.create({
  baseURL: base_url.prod_url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});



apiClient.interceptors.request.use(
  async config => {
    const token = rootStore.authStore.token;

    console.log('config of main function::', token);

    console.log('SERVER SIDE API URL::', `${config.baseURL}${config.url}`);


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      const errorMessage =
        error.response.data?.detail ||
        error.response.data?.message ||
        'An error occurred';
      rootStore.authStore.setError(errorMessage);

      if (error.response.status === 401) {
        // rootStore.authStore.clearToken();
      }
    }
    return Promise.reject(error);
  },
);

export const ApiService = {
  async makeRequest(config) {
    try {
      const isConnected = await checkNetworkConnection();
      if (!isConnected) {
        throw new Error('No internet connection');
      }

      rootStore.authStore.setLoading(true);
      const response = await apiClient(config);

      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        status: error.response?.status,
      };
    } finally {
      rootStore.authStore.setLoading(false);
    }
  },

  get(url, params = {}, headers = {}) {
    return this.makeRequest({method: 'get', url, params, headers});
  },

  post(url, data = {}, headers = {}) {
    return this.makeRequest({method: 'post', url, data, headers});
  },

  put(url, data = {}, headers = {}) {
    return this.makeRequest({method: 'put', url, data, headers});
  },

  delete(url, data = {}, headers = {}) {
    return this.makeRequest({method: 'delete', url, data, headers});
  },

  patch(url, data = {}, headers = {}) {
    return this.makeRequest({method: 'patch', url, data, headers});
  },
};
