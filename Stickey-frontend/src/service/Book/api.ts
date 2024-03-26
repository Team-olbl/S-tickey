import { axiosAuthInstance } from "../../apis/axiosInstance";
import { ISectionSeatCntRes } from "../../types/Book";
import { APIResponse } from "../../types/model";

export const getSectionSeatCntReq = async(id: number): Promise<APIResponse<ISectionSeatCntRes>> => {
    const { data } = await axiosAuthInstance.get(`/games/${id}`);
    return data;
}