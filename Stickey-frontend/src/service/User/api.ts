import { axiosCommonInstance } from "../../apis/axiosInstance";

export const sendEmailVerification = async (email:string) => {
  const {data} = await axiosCommonInstance.post(`users/auth`, {
    "email" : email
  },
  );
  // console.log({email})
  return data;
}