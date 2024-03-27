// import { InternalAxiosRequestConfig } from 'axios';

// const setAuthorization = (config: InternalAxiosRequestConfig) => {
//   const userStore = localStorage.getItem('user-store');
//   if (userStore) { 
//     // const accessToken = JSON.parse(userStore).state.accessToken;
//     const accessToken = import.meta.env.VITE_TOKEN;
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//   }
//   return config;
// };

// export default setAuthorization;

import { InternalAxiosRequestConfig } from 'axios';

const setAuthorization = (config: InternalAxiosRequestConfig) => {
  // const accessToken = JSON.parse(localStorage.getItem('user-store') || '').state.accessToken;
  const accessToken = import.meta.env.VITE_TOKEN;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

export default setAuthorization;