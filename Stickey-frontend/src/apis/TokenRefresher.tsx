// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import { axiosAuthInstance } from "./axiosInstance";
// import userStore from "../stores/userStore";

// const TokenRefresher = () => {
//   useEffect(() => {
//     const interceptor = axiosAuthInstance.interceptors.response.use(
//       response => response,
//       async error => {
//         if (error.response) {
//           const status = error.response.status;
          
//           if (status === 401) {
//             try {
//               const refreshToken = userStore.getState().refreshToken || localStorage.getItem("refreshToken");
//               const res = await axiosAuthInstance.post(`/users/reissue`, {}, {
//                 headers: {
//                   "Content-Type": "application/json",
//                   "Authorization": `Bearer ${refreshToken}`,
//                 },
//               });
              
//               // 갱신된 토큰 Zustand 스토어랑 localStorage에 저장
//               localStorage.setItem("accessToken", res.data.accessToken);
//               localStorage.setItem("refreshToken", res.data.refreshToken);
//               userStore.getState().setTokens(res.data.accessToken, res.data.refreshToken);

//               // 요청에 갱신된 액세스 토큰을 설정하고 재시도
//               error.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
//               return axiosAuthInstance(error.config);
//             } catch (error) {
//               console.error("Token reissue failed:", error);
//               userStore.getState().logoutUser();
//               localStorage.clear();
//               window.location.href = "/login";
//             }
//           } else if ([400, 404, 409].includes(status)) {
//             toast.info(error.response.data.message);
//           }
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosAuthInstance.interceptors.response.eject(interceptor);
//     };
//   }, []);

//   return null;
// };

// export default TokenRefresher;
