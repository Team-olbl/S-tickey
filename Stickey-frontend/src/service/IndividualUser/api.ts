import { axiosCommonInstance } from "../../apis/axiosInstance";
import { APIResponse } from "../../types/model";

export const signUp = async (info: FormData):Promise<APIResponse<string>> => {
  const {data} = await axiosCommonInstance.post(`users/signup`, info,{
    headers:{
      'Content-Type': 'multipart/form-data'
    },
  })
  return data;
}