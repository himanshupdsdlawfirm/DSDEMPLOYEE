import axios from 'axios';
import { BASE_URL } from '../constant';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Handle different status codes
      if (error.response.status === 401) {
        // Handle unauthorized
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ message: 'No response received' });
    } else {
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;