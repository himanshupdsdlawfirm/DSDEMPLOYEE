// API ENDPOINTS
// API endpoints configuration
export const API_ENDPOINTS = {
  uscis:{
    getToken : 'https://api-int.uscis.gov/oauth/accesstoken',
    getCase : 'https://api-int.uscis.gov/case-status'

  },
  users: {
    getAll: '/users',
    getById: id => `/users/${id}`,
    create: '/users',
    update: id => `/users/${id}`,
    delete: id => `/users/${id}`,
  },
  USCIs:{

  },
  products: {
    getAll: '/products',
    // ... more endpoints
  },
  // ... more resources
};
