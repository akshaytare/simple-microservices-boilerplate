import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { KeycloakContext } from '../KeycloakProvider';

const useAxios = () => {
  const { getToken, isLoggedIn } = useContext(KeycloakContext);
  const [axiosInstance, setAxiosInstance] = useState(null);

  useEffect(() => {
    const instance = axios.create();

    instance.interceptors.request.use(async (config) => {
      if (isLoggedIn()) {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

    setAxiosInstance(instance);
  }, [getToken, isLoggedIn]);

  return axiosInstance;
};

export default useAxios;
