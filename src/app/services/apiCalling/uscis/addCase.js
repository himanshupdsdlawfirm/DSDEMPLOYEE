import {ApiService} from '../../apiService';
import {end_points} from '../../endpoints';

export class AddCaseService {
  static async getCaseStatus(caseNumber) {
    try {
      const response = await ApiService.get(
        `${end_points.user.uscisAddCase}${caseNumber}/`,
      );

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to get case status');
      }
    } catch (error) {
      console.error('Case Status Error:', error);
      throw error; // Re-throw the original error
    }
  }

  static async postUscisCaseIntoServer(payload) {
    try {
      const response = await ApiService.post(
        `${end_points.user.uscisCaseList}`,
        JSON.stringify(payload),
      );

      console.log('post uscis res::', response);

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to get case status');
      }
    } catch (error) {
      console.error('Case Status Error:', error);
      throw error; // Re-throw the original error
    }
  }
}
