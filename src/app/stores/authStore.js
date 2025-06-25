import { makeAutoObservable } from 'mobx';
import AuthService from '../services/authServices';

class AuthStore {
  user = null;
  otp = ['', '', '', '', '', ''];
  countdown = 30;
  error = null;
  isLoading = false;
  networkError = false;

  constructor() {
    makeAutoObservable(this);
  }

  setError = (error) => {
    this.error = error.message;
    this.networkError = error.isNetworkError || false;
    
    if (error.isUnauthorized) {
      // Handle logout or token refresh
    }
  };

  verifyOtp = async (email) => {
    this.isLoading = true;
    this.error = null;
    this.networkError = false;
    
    try {
      const otpCode = this.otp.join('');
      const response = await AuthService.verifyOtp(email, otpCode);
      this.user = response.user;
      return response;
    } catch (error) {
      this.setError(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  resendOtp = async (email) => {
    this.isLoading = true;
    this.error = null;
    this.networkError = false;
    
    try {
      const response = await AuthService.resendOtp(email);
      this.startCountdown();
      return response;
    } catch (error) {
      this.setError(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };
  
  // ... other store methods
}

export default AuthStore;