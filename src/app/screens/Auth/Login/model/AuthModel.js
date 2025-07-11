import { LoginService } from "../../../../services/apiCalling/login/loginAuth";

// features/auth/login/model/AuthModel.js
export class AuthModel {
  // Email validation helper
  static emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  validateEmail(email) {
    return AuthModel.emailRegex.test(email);
  }

  validatePassword(password) {
    return password.length > 3;
  }

  async signIn(email, password) {
    if (!this.validateEmail(email) || !this.validatePassword(password)) {
      throw new Error('Invalid email or password format');
    }
    
    const response = await LoginService.getLoginAccessToken(email, password);
    return { success: true, data: response };
  }

  async getEmployeeById(userId) {
    if (!userId) throw new Error('User id not found');
    const response = await LoginService.getEmployeeById(userId);
    return { success: true, data: response };
  }
}