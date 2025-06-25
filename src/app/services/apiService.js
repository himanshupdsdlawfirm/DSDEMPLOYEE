import axios from 'axios';
import {checkNetworkConnection} from '../utils/networkAware';

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://api-int.uscis.gov', // Set to root API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for adding token if available
apiClient.interceptors.request.use(
  async config => {
    console.log('interceptor request::', config);

    // You can get token from your MobX store or AsyncStorage here
    const token = await getTokenFromStorage(); // Implement this function based on your auth flow

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  response => {
    console.log('interceptor response::', response);

    return response.data;
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API Error Response:', error.response.data);
      console.error('Status Code:', error.response.status);
      console.error('Headers:', error.response.headers);

      // You can handle different status codes here
      if (error.response.status === 401) {
        // Handle unauthorized access
      } else if (error.response.status === 404) {
        // Handle not found
      } else if (error.response.status >= 500) {
        // Handle server error
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Setup Error:', error.message);
    }

    return Promise.reject(error);
  },
);

// Main API service functions
export const ApiService = {
  async makeRequest(config) {
    try {
      const isConnected = await checkNetworkConnection();

      if (!isConnected) {
        throw new Error('No internet connection');
      }

      const response = await apiClient(config);
      return {success: true, data: response};
    } catch (error) {
      console.error('API Request Failed:', error);
      return {
        success: false,
        error: error.message || 'An error occurred',
        status: error.response?.status,
      };
    }
  },

  get(url, params = {}, headers = {}) {
    return this.makeRequest({
      method: 'get',
      url,
      params,
      headers,
    });
  },

  post(url, data = {}, headers = {}) {
    return this.makeRequest({
      method: 'post',
      url,
      data,
      headers,
    });
  },

  // Update the post method in your ApiService to handle URL-encoded data properly
// post(url, data = {}, headers = {}) {
//   // If sending URL-encoded data, don't let axios JSON-stringify it
//   const config = {
//     method: 'post',
//     url,
//     headers
//   };

//   if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
//     config.data = data;
//   } else {
//     config.data = data;
//   }

//   return this.makeRequest(config);
// },

  put(url, data = {}, headers = {}) {
    return this.makeRequest({
      method: 'put',
      url,
      data,
      headers,
    });
  },

  delete(url, data = {}, headers = {}) {
    return this.makeRequest({
      method: 'delete',
      url,
      data,
      headers,
    });
  },

  patch(url, data = {}, headers = {}) {
    return this.makeRequest({
      method: 'patch',
      url,
      data,
      headers,
    });
  },
};

// Helper function to get token (implement according to your auth flow)
async function getTokenFromStorage() {
  // Example: Get token from AsyncStorage
  // return await AsyncStorage.getItem('userToken');
  return null; // Replace with actual implementation
}
