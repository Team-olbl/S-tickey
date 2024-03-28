import { axiosCommonInstance } from "../../apis/axiosInstance";
import { confirmEmailReq, confirmEmailRes, sendEmailRes } from "../../types/Email";
import { APIResponse } from "../../types/model";

export const sendEmailVerification = async (email:string):Promise<APIResponse<sendEmailRes>> => {
  const {data} = await axiosCommonInstance.post(`users/auth`, {
    "email" : email
  },
  );
  console.log(email)
  return data;
}

export const confirmEmailVerification = async ({email, authCode}: confirmEmailReq):Promise<APIResponse<confirmEmailRes>> => {
  const {data} = await axiosCommonInstance.post(`users/auth-check`, {
    "email" : email,
    "authCode" : authCode,
  })
  return data;
}