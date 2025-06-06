// API Configuration
export const BASE_URL = 'https://yourapi.example.com/api/v1'; // Replace with your actual API base URL

// Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update',
  },
  // Add more endpoints as needed
};

// App Constants
export const APP_CONSTANTS = {
  TOKEN_KEY: '@auth_token',
  USER_KEY: '@user_data',
  CACHE_TIMEOUT: 1000 * 60 * 5, // 5 minutes
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  DEFAULT: 'Something went wrong. Please try again.',
};

// Validation Patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Minimum 8 chars, at least one letter and one number
};

export default {
  BASE_URL,
  API_ENDPOINTS,
  APP_CONSTANTS,
  ERROR_MESSAGES,
  VALIDATION_PATTERNS,
};