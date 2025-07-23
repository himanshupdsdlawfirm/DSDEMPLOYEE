import {ClientService} from '../../../services/apiCalling/clients/ClientService';

// features/clients/model/ClientModel.js
export class ClientModel {
  static async getClientList(params) {
    const response = await ClientService.getClientList(params);

    let data = response?.data?.results || [];

    // Format client names
    data = data.map(client => {
      if (client.client_name) {
        client.client_name = client.client_name
          .trim()
          .replace(/\s+/g, ' ')
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      return client;
    });

    // Sort: highlighted first, then by name
    data.sort((a, b) => {
      if (a.is_highlighted && !b.is_highlighted) return -1;
      if (!a.is_highlighted && b.is_highlighted) return 1;
      return a.client_name.localeCompare(b.client_name);
    });

    return {
      success: response?.success,
      ...(!response?.success && {error: response?.error || ''}),
      status: response?.status,
      data: data,
      count: response?.data?.count || 0,
      next: response?.data?.next,
      previous: response?.data?.previous,
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

  static async getCaseWokerList() {
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

  static async getCaseType() {
    const response = await ClientService.getCaseType();

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

  static async getSnapshot(id) {
    const response = await ClientService.getUserSnapshot(id);

    // Ensure data is always an array (even if API returns an object)
    const data = response?.data;
    console.log('response::', data);

    return {
      success: response?.success,
      ...(!response?.success && {error: response?.error || ''}),
      status: response?.success ? 200 : response?.status,
      data: data, // Now guaranteed to be an array
    };
  }

  static async getCases(id) {
    const response = await ClientService.getCaseList(id);

    // Ensure data is always an array (even if API returns an object)
    const data = Array.isArray(response?.data)
      ? response?.data
      : response?.data
      ? Object.values(response.data) // Convert object values to array
      : []; // Fallback to empty array
    console.log('response case list::', response, 'id::', id);

    return {
      success: response?.success,
      ...(!response?.success && {error: response?.error || ''}),
      status: response?.success ? 200 : response?.status,
      data: data, // Now guaranteed to be an array
    };
  }

  static async getHearings(id) {
    const response = await ClientService.getHearinglist(id);

    // Ensure data is always an array (even if API returns an object)
    const data = Array.isArray(response?.data)
      ? response?.data
      : response?.data
      ? Object.values(response.data) // Convert object values to array
      : []; // Fallback to empty array
    console.log('response::', data);

    return {
      success: response?.success,
      ...(!response?.success && {error: response?.error || ''}),
      status: response?.success ? 200 : response?.status,
      data: data, // Now guaranteed to be an array
    };
  }
}
