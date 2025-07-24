// API ENDPOINTS
// API endpoints configuration
export const end_points = {
  user: {
    login: '/login/',
    getEmployees: '/employees/',
    clientlist: '/client_with_cases_with_pagination_in_alphabetical_order/',
    case_worker_list: '/employee_list_associate_attorney/',
    case_type:'/case_types/',
    snapshot: '/client-profiles/',
    cases: '/case_list_by_client_uuid/',
    hearingsById: '/hearing_by_case_id/',
    hearingListByUUID: '/hearing_list_by_client_uuid/',
    hearingList: '/list_of_hearing_for_employee/',
    appointmentList: '/employee_appointments_list/',
    attorney_list: '/list_attorneys/',
    employee_appointments_list: '/employee_appointments_list/',
    latest_cases: '/latest_cases/',
    uscisAddCase: '/case-status/',
    uscisCaseList: '/uscis/',
  },
};
