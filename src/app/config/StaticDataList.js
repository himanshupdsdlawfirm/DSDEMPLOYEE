// Import your MobX store
import rootStore from '../stores/rootStore';

export const dropdownApoointmentOptions = () => ({
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
});

// config/StaticDataList.js
export const getHearingFilterData = () => {
  const caseWorkerList = rootStore.clientStore.caseWorker.map(client => ({
    label: `${client.first_name} ${client.last_name}`, // Combine first and last name
    value: `${client?.id}`, // Use id as the value
  }));

  const attorneyList = rootStore.clientStore.employeeAttorney.map(client => ({
    label: `${client?.first_name} ${client?.last_name}`, // Combine first and last name
    value: `${client?.id}`, // Use id as the value
  }));

  console.log('caseWorkerList::', caseWorkerList);
  console.log('attorneyList::', attorneyList);

  return {
    categoryOne: caseWorkerList,
    categoryTwo: attorneyList,
    categoryThree: [
      {label: 'Type 1', value: 'type_one'},
      {label: 'Type 2', value: 'type_two'},
    ],
    categoryFour: [
      {label: 'IH', value: 'IH'},
      {label: 'MH', value: 'MH'},
      {label: 'FC', value: 'FC'},
      {label: 'Criminal', value: 'Criminal'},
      {label: 'Divorce', value: 'Divorce'},
      {label: 'USCIS', value: 'USCIS'},
      {label: 'Other', value: 'Other'},
    ],
    categoryFive: [
      {label: 'Adjourned', value: 'Adjourned'},
      {label: 'Rescheduled', value: 'Rescheduled'},
      {label: 'Cancelled', value: 'Cancelled'},
      {label: 'On Schedule', value: 'On Schedule'},
    ],
  };
};

export const getClientListFilterData = () => {
  // Transform the MobX store data into the required format
  const caseWorkerList = rootStore.clientStore.caseWorker.map(client => ({
    label: `${client.first_name} ${client.last_name}`, // Combine first and last name
    value: `${client.first_name} ${client.last_name}`, // Use id as the value
  }));

  // Add a default "Type" option at the beginning
  caseWorkerList.unshift({label: 'Type', value: null});

  return {
    categoryOne: [
      {label: 'Created', value: true},
      {label: 'Not Created', value: false},
    ],
    categoryTwo: [
      {label: 'Active', value: true},
      {label: 'Inactive', value: false},
    ],
    categoryThree: [
      {label: 'All', value: 'all'},
      {label: 'Open', value: 'open'},
      {label: 'Close', value: 'close'},
      {label: 'Inactive', value: 'inactive'},
    ],
    categoryFour: caseWorkerList, // This now contains full names
    categoryFive: [
      {label: 'All', value: 'All'},
      {label: 'Adjourned', value: 'Adjourned'},
      {label: 'Rescheduled', value: 'Rescheduled'},
      {label: 'Cancelled', value: 'Cancelled'},
      {label: 'On Schedule', value: 'On_Schedule'},
    ],
  };
};

export const getAppointmentFilterData = () => {
  return {
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
  };
};
