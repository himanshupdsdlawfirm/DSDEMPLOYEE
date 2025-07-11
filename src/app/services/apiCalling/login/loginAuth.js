import {ApiService} from '../../apiService';
import {end_points} from '../../endpoints';

export class LoginService {
  static async getLoginAccessToken(email, password) {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    const response = await ApiService.post(
      end_points.user.login,
      params.toString(),
      {'Content-Type': 'application/x-www-form-urlencoded'},
    );

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }

  static async getEmployeeById(userId) {
 
    const response = await ApiService.get(
      `${end_points.user.getEmployees}${userId}`,
      {'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json'},
    );

    if (!response.success) {
      throw new Error(response.error);
    }

    return response.data;
  }
}
