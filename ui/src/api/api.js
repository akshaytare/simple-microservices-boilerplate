import axios from 'axios';
import UserService from '../services/UserService'; // update this with the path to UserService

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  if (UserService.isLoggedIn()) {
    const token = await UserService.getToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
