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

// 좌석 선점 확인
export const patchSeatConfirm = async({id, zoneId, info}: {id: number, zoneId: number, info:number[]}): Promise<APIResponse<string>> => {
    console.log('확인!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(info);
    const { data } = await axiosAuthInstance.patch(`/games/${id}/zones/${zoneId}/seats`,{
        params: {
            seatNumbers: info,
        }
    });
    console.log(data)
    return data;
}