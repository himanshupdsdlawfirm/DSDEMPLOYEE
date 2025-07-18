import {ApiService} from '../../apiService';
import {end_points} from '../../endpoints';

export class CasesService {
  static async getCasesList(params) {
    try {
      const queryString = Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== '')
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      const url = `${end_points.user.latest_cases}${
        queryString ? `?${queryString}` : ''
      }`;
      const response = await ApiService.get(url);
      
      return response;
    } catch (error) {
      console.error('CasesService Error:', error);
      throw error;
    }
  }
}