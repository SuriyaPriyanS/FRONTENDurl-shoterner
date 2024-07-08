// src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend API URL
});

export const registerUser = async (userData) => {
  try {
    const response = await instance.post('/api/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await instance.post('/api/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchDashboardData = async () => {
  try {
    const response = await instance.get('/api/dashboard');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
