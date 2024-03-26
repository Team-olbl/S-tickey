import { axiosAuthInstance } from "../../apis/axiosInstance";
import { ICreatePlayerReq, IPlayerListRes, IPreTeamSimpleRes } from "../../types/Profile";
import { APIResponse } from "../../types/model";

export const getProfileReq = async(id : number): Promise<APIResponse<IPreTeamSimpleRes>> => {
    const { data } = await axiosAuthInstance.get(`/user/profile/${id}`);
    return data;
}

export const getPlayerListReq = async() : Promise<APIResponse<IPlayerListRes>> => {
    const { data } = await axiosAuthInstance.get(`/organizations/profile/players`);
    return data;
}

export const postPlayerCreate = async ( info: ICreatePlayerReq ) : Promise<APIResponse<string>> => {
    const { data } = await axiosAuthInstance.post(`/organizations/profile/players`, info);
    return data;
}