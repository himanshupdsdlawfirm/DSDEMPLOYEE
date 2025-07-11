// features/home/model/HomeModel.js
import { ClientService } from '../../../services/apiCalling/clients/ClientService';
import {HomeService} from '../../../services/apiCalling/home/HomeService';

export class HomeModel {
  static async getClientList(page) {
    const response = await HomeService.getClientList(page);
    let data = response?.results || [];

    data = data.map(client => {
      if (client.client_name) {
        client.client_name = client.client_name
          .trim()
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .toLowerCase() // Convert all to lowercase first
          .split(' ') // Split into words
          .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(' '); // Join back with single spaces
      }
      return client;
    });

    // Sort the data: highlighted first, then sort all by name
    data.sort((a, b) => {
      // First sort by is_highlighted (true comes first)
      if (a.is_highlighted && !b.is_highlighted) return -1;
      if (!a.is_highlighted && b.is_highlighted) return 1;

      // If both have same highlight status, sort by name
      return a.client_name.localeCompare(b.client_name);
    });

    console.log('custom client list::', data);

    return {
      success: response?.success,
      ...(!response?.success && {error: response?.error || ''}),
      status: response?.success ? 200 : response?.status,
      data: data,
    };
  }

  static async getHearingList(page) {
    const response = await HomeService.getHearinglist(page);

    // Ensure data is always an array (even if API returns an object)
    let data = response?.data?.results?.results || [];

    console.log('response hearing list home::', data);

    return {
      success: response?.success,
      ...(!response?.success && {error: response?.error || ''}),
      status: response?.success ? 200 : response?.status,
      data: data, // Now guaranteed to be an array
    };
  }

  static async getAppointmentList(page, dateType) {
    console.log('appointment param list home::', page);

    const response = await HomeService.fetchAppointmentlist(page, dateType);

    console.log('response appointment list home::', response);

    // Ensure data is always an array (even if API returns an object)
    let data = response?.data?.results || [];

    return {
      success: response?.success,
      ...(!response?.success && {error: response?.error || ''}),
      status: response?.success ? 200 : response?.status,
      data: data, // Now guaranteed to be an array
    };
  }


  // Common Api Calling for Clients & Hearings
 static async getCaseWorkerList() {
    const response = await ClientService.getCaseWorkerList();

    // Ensure data is always an array (even if API returns an object)
    const data = Array.isArray(response?.data)
      ? response?.data
      : response?.data
      ? Object.values(response.data) // Convert object values to array
      : []; // Fallback to empty array

    return {
      success: response?.success,
      ...(!response?.success && {error: response?.error || ''}),
      status: response?.success ? 200 : response?.status,
      data: data, // Now guaranteed to be an array
    };
  }

  static async getEmployeeAttorney() {
    const response = await ClientService.getEmployeeAttorneyList();

    

    // Ensure data is always an array (even if API returns an object)
    const data = Array.isArray(response?.data)
      ? response?.data
      : response?.data
      ? Object.values(response.data) // Convert object values to array
      : []; // Fallback to empty array

    return {
      success: response?.success,
      ...(!response?.success && {error: response?.error || ''}),
      status: response?.success ? 200 : response?.status,
      data: data, // Now guaranteed to be an array
    };
  }
}
