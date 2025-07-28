// models/CaseStatusModel.js
export class CaseStatusModel {
  constructor(data) {
    this.receiptNumber = data?.receiptNumber || '';
    this.formType = data?.formType || '';
    this.submittedDate = data?.submittedDate || '';
    this.modifiedDate = data?.modifiedDate || '';
    this.currentStatus = data?.current_case_status_text_en || '';
    this.description = data?.current_case_status_desc_en || '';
    this.history = this._parseHistory(data?.hist_case_status || []);
  }

  _parseHistory(history) {
    return history.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      event: item.completed_text_en,
    }));
  }

  getStatusColor(status) {
    const statusText = status.toLowerCase();
    if (statusText.includes('request for evidence')) return '#fbbc04'; // Yellow
    if (statusText.includes('transferred')) return '#34a853'; // Green
    if (statusText.includes('denied') || statusText.includes('rejected')) return '#ea4335'; // Red
    if (statusText.includes('received')) return '#1a73e8'; // Blue
    return '#9e9e9e'; // Gray (default)
  }
}