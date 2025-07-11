// services/apiCalling/appointments/AppointmentService.js
import {ApiService} from '../../apiService';
import {end_points} from '../../endpoints';

export class AppointmentService {
  static async getAppointmentList(params) {
    try {
      const queryString = Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== '')
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      const url = `${end_points.user.employee_appointments_list}${
        queryString ? `?${queryString}` : ''
      }`;
      
      const response = await ApiService.get(url);


      console.log('Appointment list res:::', response);
      
      return response;
    } catch (error) {
      console.error('AppointmentService Error:', error);
      throw error;
    }
  }
}