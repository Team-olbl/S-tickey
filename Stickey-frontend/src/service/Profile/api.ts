import { axiosAuthInstance } from "../../apis/axiosInstance";
import { IPlayerListRes, IPreTeamSimpleRes } from "../../types/Profile";
import { APIResponse } from "../../types/model";

export const getProfileReq = async(id : number): Promise<APIResponse<IPreTeamSimpleRes>> => {
    const { data } = await axiosAuthInstance.get(`/user/profile/${id}`);
    return data;
}

export const getPlayerListReq = async() : Promise<APIResponse<IPlayerListRes>> => {
    const { data } = await axiosAuthInstance.get(`/organizations/profile/players`);
    return data;
}