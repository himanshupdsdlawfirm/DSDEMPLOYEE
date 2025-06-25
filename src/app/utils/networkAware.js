// utils/NetworkUtils.js
import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnection = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected;
  } catch (error) {
    console.error('Network check error:', error);
    return false;
  }
};