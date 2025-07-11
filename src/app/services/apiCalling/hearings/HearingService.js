// services/apiCalling/hearings/HearingService.js
import {ApiService} from '../../apiService';
import {end_points} from '../../endpoints';

export class HearingService {
  static async getHearingList(params) {
    try {
      const queryString = Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== '')
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      const url = `${end_points.user.hearingList}${
        queryString ? `?${queryString}` : ''
      }`;

      const response = await ApiService.get(url);

      return response;
    } catch (error) {
      console.error('HearingService Error:', error);
      throw error;
    }
  }
}
