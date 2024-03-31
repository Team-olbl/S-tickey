import axios from 'axios';
import setAuthorization from './interceptors';
import userStore from '../stores/userStore';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';


axios.defaults.paramsSerializer = function (paramObj) {
  const params = new URLSearchParams()
  for (const key in paramObj) {
      if (Array.isArray(paramObj[key])) {
        for (const value of paramObj[key]) {
          params.append(key, value)
        }
      } else {
        params.append(key, paramObj[key]);
      }
    }
  return params.toString()
}

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const axiosCommonInstance = axios.create(axiosRequestConfig);

export const axiosAuthInstance = axios.create(axiosRequestConfig);

axiosAuthInstance.interceptors.request.use(setAuthorization);


// axiosAuthInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//       const status = error.response.status;
//       const navigate = useNavigate();

//       if (status === 401) {
//         try {
//           const refreshToken = localStorage.getItem("refreshToken");
//           console.log(refreshToken)
//           // refreshToken을 사용하여 토큰 재발급 시도
//             const refreshResponse = await axiosAuthInstance.post(`/users/reissue`, {}, {
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${refreshToken}`,
//               }
//             });
//             console.log(refreshResponse)
//             localStorage.setItem("accessToken", refreshResponse.data.accessToken);
//             userStore.getState().setTokens(refreshResponse.data.accessToken);

//             // 요청에 갱신된 액세스 토큰 설정 후 재시도
//             error.config.headers["Authorization"] = `Bearer ${refreshResponse.data.accessToken}`;
//             return axiosAuthInstance(error.config);
//           } catch (refreshError) {
//             // 토큰 재발급 실패 처리
//             userStore.getState().logoutUser();
//             localStorage.clear();
//             toast.info('토큰 재발급에 실패했습니다.')
//             navigate('/login')
//             console.error("Token reissue failed:", refreshError);
//             return Promise.reject(refreshError)
//           }
//         }
//     return Promise.reject(error);
//   }
// );

axiosAuthInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status;
      
      if (status === 401) {
        // 로그아웃 처리 및 로그인 페이지로 리다이렉트
        userStore.getState().logoutUser();
        localStorage.clear();
        window.location.href = "/login";
      } else if ([400, 404, 409].includes(status)) {
        toast.info(error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);