import {format, parse, differenceInDays} from 'date-fns';

class CaseDetailsViewModel {
  constructor(caseData) {
    this.caseData = caseData;
  }

  getFormattedCaseDetails() {
    try {
      if (!this.caseData?.case_status) return this._getEmptyCaseDetails();

      const {case_status} = this.caseData;

      // Extract last updated date from description or history
      const lastUpdatedDate = this._extractLastUpdatedDate(case_status);

      const currentDate = new Date();

      return {
        id: case_status.receiptNumber || 'N/A',
        title: 'Application to Register Permanent Residence or Adjust Status',
        currentStatus:
          case_status.current_case_status_text_en || 'Status not available',
        formType: case_status.formType || 'N/A',
        lastUpdated: format(lastUpdatedDate, 'MMM d, yyyy'),
        daysSinceUpdate: differenceInDays(currentDate, lastUpdatedDate),
        description:
          case_status.current_case_status_desc_en || 'No description available',
        history: this._prepareHistoryData(case_status, lastUpdatedDate),
      };
    } catch (error) {
      console.error('Error formatting case details:', error);
      return this._getEmptyCaseDetails();
    }
  }

  _extractLastUpdatedDate(caseStatus) {
    // Try to extract date from current status description first
    if (caseStatus.current_case_status_desc_en) {
      const dateFromDesc = this._extractDateFromText(
        caseStatus.current_case_status_desc_en,
      );
      if (dateFromDesc) return dateFromDesc;
    }

    // Fallback to first history item if available
    if (caseStatus.hist_case_status?.[0]?.date) {
      try {
        return parse(
          caseStatus.hist_case_status[0].date,
          'yyyy-MM-dd',
          new Date(),
        );
      } catch (e) {
        console.warn('Failed to parse history date:', e);
      }
    }

    // Final fallback to current date
    return new Date();
  }

  _extractDateFromText(text) {
    try {
      // Common patterns in USCIS status descriptions
      const patterns = [
        /(?:on|el) (\w+ \d{1,2}, \d{4})/i, // "On March 27, 2025"
        /(\w+ \d{1,2} \d{4})/, // "March 27 2025"
        /(\d{1,2}-\d{1,2}-\d{4})/, // "03-27-2025"
        /(\d{4}-\d{1,2}-\d{1,2})/, // "2025-03-27"
      ];

      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
          return (
            parse(match[1], 'MMMM d, yyyy', new Date()) ||
            parse(match[1], 'MMM d, yyyy', new Date()) ||
            parse(match[1], 'MM-dd-yyyy', new Date()) ||
            parse(match[1], 'yyyy-MM-dd', new Date())
          );
        }
      }
    } catch (e) {
      console.warn('Date extraction failed:', e);
    }
    return null;
  }

  _getEmptyCaseDetails() {
    const currentDate = new Date();
    return {
      id: 'N/A',
      title: 'Case Details',
      currentStatus: 'Status not available',
      formType: 'N/A',
      lastUpdated: format(currentDate, 'MMM d, yyyy'),
      daysSinceUpdate: 0,
      description: 'No case data available',
      history: [],
    };
  }

  _prepareHistoryData(caseStatus, lastUpdatedDate) {
    const historyItems = [];

    try {
      // Add current status as first history item
      if (caseStatus.current_case_status_text_en) {
        historyItems.push({
          date: format(lastUpdatedDate, 'MMM d, yyyy'),
          event: caseStatus.current_case_status_text_en,
          statusColor: this._getStatusColor(
            caseStatus.current_case_status_text_en,
          ),
        });
      }

      // Add historical items if available
      if (caseStatus.hist_case_status?.length > 0) {
        caseStatus.hist_case_status.forEach(item => {
          try {
            if (item.completed_text_en) {
              const date = item.date
                ? parse(item.date, 'yyyy-MM-dd', new Date())
                : lastUpdatedDate;

              historyItems.push({
                date: format(date, 'MMM d, yyyy'),
                event: item.completed_text_en,
                statusColor: this._getStatusColor(item.completed_text_en),
              });
            }
          } catch (e) {
            console.error('Error processing history item:', e);
          }
        });
      }
    } catch (error) {
      console.error('Error preparing history data:', error);
    }

    return historyItems;
  }

  _getStatusColor(eventText) {
    if (!eventText) return '#1a73e8'; // Default blue

    const lowerText = eventText.toLowerCase();

    // if (lowerText.includes('request for evidence')) return '#fbbc04'; // Yellow
    if (lowerText.includes('sent') && lowerText.includes('request'))
      return 'orange'; // Green
    if (lowerText.includes('denied')) return '#ea4335'; // Red
    if (
      lowerText.includes('produced') ||
      lowerText.includes('approved') ||
      lowerText.includes('delivered')
    )
      return '#34a853'; // Green
    if (
      lowerText.includes('received') ||
      lowerText.includes('transferred') ||
      lowerText.includes('request for evidence') ||
      lowerText.includes('reopen') ||
      lowerText.includes('response') ||
      lowerText.includes('reopened')
    )
      return '#1a73e8'; // Blue
    return '#1a73e8'; // Default blue
  }
}

export default CaseDetailsViewModel;
