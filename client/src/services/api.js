import axios from 'axios';

/**
 * @file api.js
 * @description Axios instance for making API requests to the backend.
 * 
 * Concept: By creating an instance, we can set a base URL and add interceptors 
 * to include the JWT token in every request automatically.
 */

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Add a request interceptor to include the JWT token
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const parsedUser = JSON.parse(userInfo);
      if (parsedUser && parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    } catch (error) {
      console.error('Error parsing userInfo for API request', error);
    }
  }
  return config;
});

export default API;
