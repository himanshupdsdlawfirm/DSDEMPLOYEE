import {CasesService} from '../../../services/apiCalling/cases/CasesService';

export class CasesModel {
  static async getCasesList(params) {
    try {
      const response = await CasesService.getCasesList(params);

      console.log('cases list res model::', response);

      // Format the data if needed
      const data = Array.isArray(response?.data?.results)
        ? response.data?.results
        : response?.data?.results
        ? Object.values(response.data?.results)
        : [];

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
      console.error('CasesModel Error:', error);
      throw error;
    }
  }
}
