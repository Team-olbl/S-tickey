import { axiosCommonInstance } from "../../apis/axiosInstance";
import { APIResponse } from "../../types/model";

export const findPassword = async (email:string): Promise<APIResponse<string>> => {
  const res = await axiosCommonInstance.patch(`/users`, {email}, {
    headers: {
      'Content-Type' : 'application/json',
    }
  }
  )
  console.log(res);
  return res.data;
}