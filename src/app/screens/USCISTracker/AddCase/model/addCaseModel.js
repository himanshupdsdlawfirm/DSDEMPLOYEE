export class AddCaseModel {
  constructor() {
    this._caseNumber = '';
    this._caseName = '';
  }

  // Case Number
  get caseNumber() {
    return this._caseNumber;
  }

  set caseNumber(value) {
    this._caseNumber = value || '';
  }

  // Case Name
  get caseName() {
    return this._caseName;
  }

  set caseName(value) {
    this._caseName = value.replace(/[^a-zA-Z\s]/g, '') || ''; // Sanitization
  }

  validateCaseNumber() {
    return this._caseNumber.length >= 13;
  }
}