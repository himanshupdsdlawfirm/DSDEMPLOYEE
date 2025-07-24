// services/apiCalling/clients/ClientService.js
import {ApiService} from '../../apiService';
import {end_points} from '../../endpoints';

export class ClientService {
  static async getClientList(params) {
    try {
      const queryString = Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== '')
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      const url = `${end_points.user.clientlist}${
        queryString ? `?${queryString}` : ''
      }`;
      const response = await ApiService.get(url);
      console.log('service client list::', response);

      return response;
    } catch (error) {
      console.error('ClientService Error:', error);
      throw error;
    }
  }

  static async getCaseWorkerList() {
    try {
      const url = `${end_points.user.case_worker_list}`;
      const response = await ApiService.get(url);

      console.log('get case worker list::', response);

      return response;
    } catch (error) {
      console.error('ClientService Error:', error);
      throw error;
    }
  }

  static async getCaseType() {
    try {
      const url = `${end_points.user.case_type}`;
      const response = await ApiService.get(url);

      console.log('get case type::', response);

      return response;
    } catch (error) {
      console.error('ClientService Error:', error);
      throw error;
    }
  }

  static async getEmployeeAttorneyList() {
    try {
      const url = `${end_points.user.attorney_list}`;
      const response = await ApiService.get(url);

      console.log('get employee attorney url::', url);

      return response;
    } catch (error) {
      console.error('ClientService Error:', error);
      throw error;
    }
  }

  static async getUserSnapshot(id) {
    try {
      const url = `${end_points.user.snapshot}${id}/`;

      console.log('URL user snapshot::', url);

      const response = await ApiService.get(url);

      console.log('service user snapshot::', response);

      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getCaseList(id) {
    try {
      const url = `${end_points.user.cases}${id}/`;
      const response = await ApiService.get(url);

      console.log('service case list::', response);
      console.log('service case list url::', url);

      return response;
    } catch (error) {
      console.error('ClientService Error:', error);
      throw error;
    }
  }

  static async getHearinglist(id) {
    try {
      const url = `${end_points.user.hearingListByUUID}${id}/`;
      const response = await ApiService.get(url);

      console.log('service hearing url::', url);

      console.log('service hearing list::', response);

      return response;
    } catch (error) {
      console.error('ClientService Error:', error);
      throw error;
    }
  }
}


