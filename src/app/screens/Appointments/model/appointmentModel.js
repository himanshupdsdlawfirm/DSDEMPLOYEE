// features/appointments/model/AppointmentModel.js

import { AppointmentService } from "../../../services/apiCalling/appointments/AppointmentService";

export class AppointmentModel {
  static async getAppointmentList(params) {
    
    try {
      const response = await AppointmentService.getAppointmentList(params);
      
      // Format data if needed
      const data = response?.data?.results || [];
      
      return {
        success: response?.success,
        ...(!response?.success && {error: response?.error || ''}),
        status: response?.status,
        data: data,
        count: response?.data?.count || 0,
        next: response?.data?.next,
        previous: response?.data?.previous,
      };
    } catch (error) {
      console.error('AppointmentModel Error:', error);
      throw error;
    }
  }
}