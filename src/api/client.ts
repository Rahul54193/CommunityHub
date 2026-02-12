import axios from 'axios';

// For Emulator, make sure  port is same as api server running
// const API_BASE_URL =  'http://10.0.2.2:3000';

// For Physical Device, use the local network IP address of your machine followed by the port number where your API is running. 
const API_BASE_URL =  'http://192.168.1.167:3001';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      error.isNetworkError = true;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
