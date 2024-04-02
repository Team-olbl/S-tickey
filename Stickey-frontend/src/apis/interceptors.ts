import { InternalAxiosRequestConfig } from 'axios';

const setAuthorization = (config: InternalAxiosRequestConfig) => {
  // const userStore = localStorage.getItem('user-store');
  // if (userStore) {
  //   const accessToken = JSON.parse(userStore).state.accessToken;
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  // }
  return config;
};

export default setAuthorization;
