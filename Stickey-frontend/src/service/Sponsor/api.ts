import { axiosAuthInstance } from "../../apis/axiosInstance";
import { IMySponsorListRes } from "../../types/Sponsor";
import { APIResponse } from "../../types/model";

export const getMySponsorLitReq = async(): Promise<APIResponse<IMySponsorListRes>> => {
    const { data } = await axiosAuthInstance.get(`/organizations/profile/supports`);
    return data;
}