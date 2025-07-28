// caseListService.js
import {ApiService} from '../../apiService';
import {end_points} from '../../endpoints';

export class CaseListService {
  async getCaseList(page = 1) {
    try {
      const url = `${end_points.user.uscisCaseList}`;
      const response = await ApiService.get(url);

      console.log('uscis case list response url::', url);
      console.log('uscis case list response first::', response);

      return {
        success: response.success,
        data: response.data || [],
        has_more: !!response.data,
        error: response.error,
      };
    } catch (error) {
      console.error('CaseListService Error:', error);
      throw error;
    }
  }

  async getCaseDetail(page = 1, case_number) {
    try {
      const url = `${end_points.user.uscisAddCase}${case_number}/`;
      const response = await ApiService.get(url);

      console.log('uscis case detail response url::', url);
      console.log('uscis case detail response first::', response);

      return {
        success: response.success,
        data: response.data || [],
        has_more: !!response.data,
        error: response.error,
      };
    } catch (error) {
      console.error('CaseListService Error:', error);
      throw error;
    }
  }

  async deleteCase(caseId) {
    try {
      const url = `${end_points.user.uscisCaseList}${caseId}`;
      const response = await ApiService.delete(url);

      console.log('case item delete res::', response);

      return {
        success: response.success,
        error: response.error,
      };
    } catch (error) {
      console.error('CaseListService Error:', error);
      throw error;
    }
  }
}
