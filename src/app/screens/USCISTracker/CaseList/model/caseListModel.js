// caseListModel.js

import {CaseListService} from '../../../../services/apiCalling/uscis/caseListService';

export class CaseListModel {
  constructor() {
    this.service = new CaseListService();
  }

  async getCases(page = 1) {
    try {
      const response = await this.service.getCaseList(page);

      if (!response.success) {
        return {
          success: false,
          error: response.error || 'Failed to fetch cases',
          data: [],
          hasMore: false,
        };
      }

      // Transform API data to match our UI structure
      const transformedData = response.data.map(item => ({
        caseName: item?.CaseName,
        receipt_number: item?.recipt_number,
        status: item?.status,
        caseDate:
          item?.modified_date && item?.modified_date != ''
            ? this.formattedDate(item?.modified_date)
            : '',
        lastChange:
          item?.modified_date && item?.modified_date != ''
            ? this.formatLastChange(item?.modified_date)
            : '',
        caseFileId: item?.form_type,
      }));

      return {
        success: true,
        data: transformedData,
        hasMore: response.has_more,
      };
    } catch (error) {
      console.error('CaseListModel Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch cases',
        data: [],
        hasMore: false,
      };
    }
  }

  async getCaseDetail(page = 1, case_number) {
    try {

      console.log('case detail param::', case_number);
      
      const response = await this.service.getCaseDetail(page, case_number);

      if (!response.success) {
        return {
          success: false,
          error: response.error || 'Failed to fetch cases',
          data: [],
          hasMore: false,
        };
      }

     

      return {
        success: true,
        data: response.data,
        hasMore: response.has_more,
      };
    } catch (error) {
      console.error('CaseListModel Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch cases',
        data: [],
        hasMore: false,
      };
    }
  }

  async deleteCase(caseId) {
    try {
      const response = await this.service.deleteCase(caseId);
      return {
        success: response.success,
        error: response.error,
      };
    } catch (error) {
      console.error('CaseListModel Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete case',
      };
    }
  }

  formatLastChange(dateString) {
    const now = new Date();
    const updated = new Date(dateString);
    
    // Set both dates to midnight to get accurate day difference
    const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const updatedUTC = Date.UTC(updated.getFullYear(), updated.getMonth(), updated.getDate());
    
    const diffDays = Math.floor((nowUTC - updatedUTC) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
}

  formattedDate(dateString) {
    if (!dateString) return '--/--/--';

    try {
      // Option 1: If your date string is ISO format (e.g., "2023-12-31T00:00:00Z")
      let date = new Date(dateString);

      // Option 2: If your date string is just "YYYY-MM-DD" without time
      if (isNaN(date.getTime())) {
        date = new Date(dateString + 'T00:00:00Z');
      }

      // If still invalid, try manual parsing
      if (isNaN(date.getTime())) {
        const parts = dateString.split(/[-T]/);
        if (parts.length >= 3) {
          date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
        }
      }

      if (isNaN(date.getTime())) return '--/--/--';

      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const year = String(date.getUTCFullYear()).slice(-2);
      return `${month}/${day}/${year}`;
    } catch {
      return '--/--/--';
    }
  }
}
