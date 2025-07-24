// addCaseService.js
import {ApiService} from '../../apiService';
import {end_points} from '../../endpoints';

export class AddCaseService {
  static async getCaseStatus(caseNumber) {
    try {
      const url = `${end_points.uscis.addCase}`;
      const response = await ApiService.post(url, {
        case_number: caseNumber,
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to add case');
      }

      return response;
    } catch (error) {
      console.error('AddCaseService Error:', error);
      throw error;
    }
  }
}