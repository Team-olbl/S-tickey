import { axiosCommonInstance } from "../../apis/axiosInstance";
import { confirmEmailReq, confirmEmailRes } from "../../types/Email";

export const sendEmailVerification = async (email:string) => {
  const {data} = await axiosCommonInstance.post(`users/auth`, {
    "email" : email
  },
  );
  return data;
}

export const confirmEmailVerification = async ({email, authCode}: confirmEmailReq):Promise<confirmEmailRes> => {
  const {data} = await axiosCommonInstance.post(`users/auth-check`, {
    "email" : email,
    "authCode" : authCode,
  })
  return data;
}