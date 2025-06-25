// viewModels/AddCaseViewModel.js
import { AddCaseService } from '../../../../services/apiCalling/uscis/addCase';
import { AddCaseModel } from '../model/addCaseModel';

export class AddCaseViewModel {
  constructor() {
    this.model = new AddCaseModel();
    this.error = '';
    this.isLoading = false;
  }

  get caseNumber() {
    return this.model.caseNumber;
  }

  get caseName() {
    return this.model.caseName;
  }

  setCaseNumber = (value) => {
    this.model.caseNumber = value;
    this.validate();
  };

  setCaseName = (value) => {
    this.model.caseName = value;
  };

  validate = () => {
    const isValid = this.model.validateCaseNumber();
    this.error = isValid ? '' : 'Case number must be 13 characters';
    return isValid;
  };

  addCase = async () => {
    if (!this.validate()) return false;
    
    this.isLoading = true;
    
    try {
      const response = await AddCaseService.getCaseStatus(this.model.caseNumber);
      return { success: true, data: response };
    } catch (error) {
      this.error = error.message;
      return { success: false };
    } finally {
      this.isLoading = false;
    }
  };
}