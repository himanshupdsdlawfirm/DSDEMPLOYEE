import {HearingService} from '../../../services/apiCalling/hearings/HearingService';

export class HearingModel {
  static async getHearingList(params) {
    try {
      const response = await HearingService.getHearingList(params);

      // Format hearing data if needed
      const data = Array.isArray(response?.data?.results?.results)
        ? response?.data?.results?.results
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
      console.error('HearingModel Error:', error);
      throw error;
    }
  }
}
