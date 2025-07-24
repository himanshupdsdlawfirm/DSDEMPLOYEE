// addCaseModel.js
import {AddCaseService} from '../../../../services/apiCalling/uscis/addCase';
import rootStore from '../../../../stores/rootStore';
import UscisStore from '../../../../stores/uscisStore';

export class AddCaseModel {
  constructor() {
    this._caseNumber = '';
    this._caseName = '';
  }

  get caseNumber() {
    return this._caseNumber;
  }

  set caseNumber(value) {
    this._caseNumber = value || '';
  }

  get caseName() {
    return this._caseName;
  }

  set caseName(value) {
    this._caseName = value.replace(/[^a-zA-Z\s]/g, '') || '';
  }

  validateCaseNumber() {
    return this._caseNumber.length >= 13;
  }

  async addCase() {
    if (!this.validateCaseNumber()) {
      throw new Error('Case number must be 13 characters');
    }

    try {
      const response = await AddCaseService.getCaseStatus(this._caseNumber);
      console.log('payload res::', response);
      const statusDesc = response?.case_status?.current_case_status_desc_en;
      // Extract date from the description text
      const dateMatch = statusDesc?.match(/On (\w+) (\d+), (\d+),/);

      let extractedDate = null;
      if (dateMatch) {
        const [, month, day, year] = dateMatch;
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        const monthIndex = monthNames.findIndex(
          m => m.toLowerCase() === month.toLowerCase(),
        );

        if (monthIndex !== -1) {
          // Create date in YYYY-MM-DD format
          extractedDate = `${year}-${String(monthIndex + 1).padStart(
            2,
            '0',
          )}-${day.padStart(2, '0')}`;
        }
      }

      console.log('extractedDate::', extractedDate); // Should output "2025-03-27"

      const payload = {
        recipt_number: response?.case_status?.receiptNumber,
        form_type: response?.case_status?.formType,
        status: response?.case_status?.current_case_status_text_en,
        modified_date:
          extractedDate || response?.case_status?.modifiedDate.split(' ')[0],
        CaseName: this._caseName,
      };

      const res = await AddCaseService.postUscisCaseIntoServer(payload);

      console.log('payload res2::', res);

      return {
        success: true,
        data: res,
        message: 'Case status retrieved successfully',
      };
    } catch (error) {
      console.error('AddCaseModel Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to add case',
      };
    }
  }

  // async getCaseList() {
  //   if (!this.validateCaseNumber()) {
  //     throw new Error('Case number must be 13 characters');
  //   }

  //   try {
  //     const response = await AddCaseService.getCaseStatus(this._caseNumber);

  //     const payload = {
  //       recipt_number: response?.case_status?.receiptNumber,
  //       form_type: response?.case_status?.formType,
  //       status: response?.case_status?.current_case_status_text_en,
  //       modified_date: response?.case_status?.modifiedDate,
  //       CaseName: this._caseName,
  //     };

  //     console.log('payload res::', response);

  //     const res = await AddCaseService.postUscisCaseIntoServer(payload);
  //      const resWithoutPayload = await AddCaseService.postUscisCaseIntoServer(payload);

  //     console.log('payload res2::', res);

  //     return {
  //       success: true,
  //       data: {
  //         ...response.data,
  //         caseName: this._caseName || `Case ${this._caseNumber}`,
  //       },
  //     };
  //   } catch (error) {
  //     console.error('AddCaseModel Error:', error);
  //     return {
  //       success: false,
  //       error: error.message || 'Failed to add case',
  //     };
  //   }
  // }
}
