import { axiosCommonInstance } from "../../apis/axiosInstance";
import userStore from "../../stores/userStore";
import { loginDataReq, loginDataRes } from "../../types/Login";
import { APIResponse } from "../../types/model";


export const login = async ({email, password}:loginDataReq):Promise<APIResponse<loginDataRes>> => {
  const res = await axiosCommonInstance.post(`users/login`, {
    "email" : email,
    "password" : password,
  })
  if (res.status == 200) {
    const {id} = res.data;
    console.log(id);
    localStorage.setItem("accessToken", res.headers.access);
    localStorage.setItem("refreshToken", res.headers.refresh); 
    userStore.getState().loginUser({id, accessToken :res.headers.access, refreshToken : res.headers.refresh, preferences:res.data.preferences})
  }
  console.log(res.data.preferences)
  console.log(res)
  return res.data;
}