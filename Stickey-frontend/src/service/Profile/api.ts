import { axiosAuthInstance } from "../../apis/axiosInstance";
import { IPreTeamSimpleRes } from "../../types/Profile";
import { APIResponse } from "../../types/model";

export const getProfileReq = async(id : number): Promise<APIResponse<IPreTeamSimpleRes>> => {
    const { data } = await axiosAuthInstance.get(`/user/profile/${id}`);
    return data;
}