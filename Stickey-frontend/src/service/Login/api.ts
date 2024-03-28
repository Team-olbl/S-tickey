import { axiosCommonInstance } from "../../apis/axiosInstance";
import { loginDataReq, loginDataRes } from "../../types/Login";
import { APIResponse } from "../../types/model";

export const login = async ({email, password}:loginDataReq):Promise<APIResponse<loginDataRes>> => {
  const {data} = await axiosCommonInstance.post(`users/login`, {
    "email" : email,
    "password" : password,
  })
  return data;
}