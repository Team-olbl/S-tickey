import axios from 'axios';
import setAuthorization from './interceptors';

// axios.defaults.paramsSerializer = function (paramObj) {
//   const params = new URLSearchParams()
//   for (const key in paramObj) {
//       if (Array.isArray(paramObj[key])) {
//         for (const value of paramObj[key]) {
//           params.append(key, value)
//         }
//       } else {
//         params.append(key, paramObj[key]);
//       }
//     }
//   return params.toString()
// }

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const axiosCommonInstance = axios.create(axiosRequestConfig);

export const axiosAuthInstance = axios.create(axiosRequestConfig);

axiosAuthInstance.interceptors.request.use(setAuthorization);