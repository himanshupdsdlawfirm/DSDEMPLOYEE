import { Alert } from 'react-native';

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code outside 2xx
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        Alert.alert('Bad Request', data.message || 'Invalid data sent to server');
        break;
      case 401:
        Alert.alert('Unauthorized', 'Please login again');
        // You can redirect to login here if needed
        break;
      case 403:
        Alert.alert('Forbidden', 'You don\'t have permission for this action');
        break;
      case 404:
        Alert.alert('Not Found', 'The requested resource was not found');
        break;
      case 500:
        Alert.alert('Server Error', 'Something went wrong on our server');
        break;
      default:
        Alert.alert('Error', data.message || 'An error occurred');
    }
  } else if (error.request) {
    // Request was made but no response received
    Alert.alert('Network Error', 'Please check your internet connection');
  } else {
    // Something happened in setting up the request
    Alert.alert('Error', error.message || 'An unexpected error occurred');
  }
  
  console.error('API Error:', error);
};