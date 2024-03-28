import { axiosAuthInstance } from "../../apis/axiosInstance";
import { ISeatInfoRes, ISectionSeatCntRes } from "../../types/Book";
import { APIResponse } from "../../types/model";

export const getSectionSeatCntReq = async(id: number): Promise<APIResponse<ISectionSeatCntRes>> => {
    const { data } = await axiosAuthInstance.get(`/games/${id}`);
    return data;
}

export const getSeatInfoReq = async({id, zoneId}: {id: number, zoneId: number}): Promise<APIResponse<ISeatInfoRes[]>> => {
    const { data } = await axiosAuthInstance.get(`/games/${id}/zones/${zoneId}/seats`);
    console.log(data)
    return data;
}