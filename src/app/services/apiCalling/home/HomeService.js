// services/apiCalling/home/HomeService.js
import {ApiService} from '../../apiService';
import {end_points} from '../../endpoints';

export class HomeService {
  static async getClientList(page) {
    const response = await ApiService.get(
      `${end_points.user.clientlist}?page=${page}`,
    );

    if (!response.success) {
      throw new Error(response.error);
    }

    return response?.data;
  }

  static async fetchAppointmentlist(page, dateType) {
    try {
      const url = `${end_points.user.appointmentList}?page=${page}&date=${dateType}`;
      const response = await ApiService.get(url);

      console.log('service appointment list::', response);

      return response;
    } catch (error) {
      console.error('ClientService Error:', error);
      throw error;
    }
  }

  static async getHearinglist(page) {
    try {
      const url = `${end_points.user.hearingList}?page=${page}`;
      const response = await ApiService.get(url);

      console.log('service hearing list::', response);

      return response;
    } catch (error) {
      console.error('ClientService Error:', error);
      throw error;
    }
  }
}
