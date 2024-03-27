import { axiosCommonInstance } from "../../apis/axiosInstance";
import { confirmEmailReq, confirmEmailRes } from "../../types/PersonalSignup";
import { APIResponse } from "../../types/model";

export const sendEmailVerification = async (email:string) => {
  const {data} = await axiosCommonInstance.post(`users/auth`, {
    "email" : email
  },
  );
  return data;
}

export const confirmEmailVerification = async ({email, authCode}: confirmEmailReq):Promise<APIResponse<confirmEmailRes>> => {
  const {data} = await axiosCommonInstance.post(`users/auth-check`, {
    "email" : email,
    "authCode" : authCode,
  })
  return data;
}

export const signUp = async (info: FormData):Promise<APIResponse<string>> => {
  const {data} = await axiosCommonInstance.post(`users/signup`, info,{
    headers:{
      'Content-Type': 'multipart/form-data'
    },
  })
  return data;
}