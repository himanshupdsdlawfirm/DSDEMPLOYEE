// features/auth/login/model/AuthModel.js
import {useAuth} from '../../../../context';

export class AuthModel {
  constructor(authContext) {
    this.auth = authContext;
  }

  async signIn(credentials) {
    try {
      await this.auth.signIn(credentials);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Authentication failed' 
      };
    }
  }

  validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    return password.length > 3;
  }
}