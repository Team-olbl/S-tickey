import { axiosAuthInstance } from "../../apis/axiosInstance";
import { ICreatePlayerReq, IPlayerListRes, IUserProfile, } from "../../types/Profile";
import { APIResponse } from "../../types/model";

export const getProfileReq = async(): Promise<APIResponse<IUserProfile>> => {
    const { data } = await axiosAuthInstance.get(`/users/profiles`);
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