import {useMemo} from 'react';

// Memoized dropdown options to prevent unnecessary recalculations
export const dropdownApoointmentOptions = {
    categoryOne: [
      {label: 'Client', value: 'case_worker_one'},
      {label: 'New', value: 'case_worker_two'},
      {label: 'Existing', value: 'case_worker_three'},
    ],
    categoryTwo: [
      {label: 'Debit Card', value: null},
      {label: 'Credit Card', value: 'attorney_one'},
      {label: 'Cash', value: 'attorney_two'},
      {label: 'Check', value: 'attorney_three'},
    ],
    categoryThree: [
      {label: 'Judge', value: null},
      {label: 'Aakash', value: 'name_one'},
      {label: 'Mahesh singh', value: 'name_two'},
      {label: 'Amit suyal', value: 'name_three'},
    ],
    categoryFour: [
      {label: 'Type', value: null},
      {label: 'IH', value: 'IH'},
      {label: 'MH', value: 'MH'},
      {label: 'FC', value: 'FC'},
      {label: 'Criminal', value: 'Criminal'},
      {label: 'Divorce', value: 'Divorce'},
    ],
    categoryFive: [
      {label: 'All', value: 'All'},
      {label: 'Adjourned', value: 'Adjourned'},
      {label: 'Rescheduled', value: 'Rescheduled'},
      {label: 'Cancelled', value: 'Cancelled'},
      {label: 'On Schedule', value: 'On_Schedule'},
    ],
  }
  


export const dropdownOptions = {
    categoryOne: [
      {label: 'Himanshu Pathak', value: 'case_worker_one'},
      {label: 'Aditya Gupta', value: 'case_worker_two'},
      {label: 'Ankit Mishra', value: 'case_worker_three'},
    ],
    categoryTwo: [
      {label: 'Attorney', value: null},
      {label: 'Naresh Sharma', value: 'attorney_one'},
      {label: 'Manya Singh', value: 'attorney_two'},
      {label: 'Namrit Chaudhary', value: 'attorney_three'},
    ],
    categoryThree: [
      {label: 'Judge', value: null},
      {label: 'Aakash', value: 'name_one'},
      {label: 'Mahesh singh', value: 'name_two'},
      {label: 'Amit suyal', value: 'name_three'},
    ],
    categoryFour: [
      {label: 'Type', value: null},
      {label: 'IH', value: 'IH'},
      {label: 'MH', value: 'MH'},
      {label: 'FC', value: 'FC'},
      {label: 'Criminal', value: 'Criminal'},
      {label: 'Divorce', value: 'Divorce'},
    ],
    categoryFive: [
      {label: 'All', value: 'All'},
      {label: 'Adjourned', value: 'Adjourned'},
      {label: 'Rescheduled', value: 'Rescheduled'},
      {label: 'Cancelled', value: 'Cancelled'},
      {label: 'On Schedule', value: 'On_Schedule'},
    ],
  }
