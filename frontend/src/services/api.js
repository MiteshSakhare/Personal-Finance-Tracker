import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Add request/response interceptors for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const createTransaction = (transaction) => {
  return axios.post(`${API_URL}/transactions/`, transaction);
};

export const getTransactions = () => {
  return axios.get(`${API_URL}/transactions/`);
};

export const createBudget = (budget) => {
  return axios.post(`${API_URL}/budgets/`, budget);
};

export const getBudgets = () => {
  return axios.get(`${API_URL}/budgets/`);
};

export const getSummary = () => {
  return axios.get(`${API_URL}/summary/`);
};

export const resetDatabase = () => {
  return axios.delete(`${API_URL}/reset/`);
};
