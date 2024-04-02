import { axiosAuthInstance } from "../../apis/axiosInstance";
import { ISeatInfoRes, ISectionSeatCntRes } from "../../types/Book";
import { APIResponse } from "../../types/model";

export const getSectionSeatCntReq = async(id: number): Promise<APIResponse<ISectionSeatCntRes>> => {
    const { data } = await axiosAuthInstance.get(`/games/${id}`);
    return data;
}

export const getSeatInfoReq = async({id, zoneId}: {id: number, zoneId: number}): Promise<APIResponse<ISeatInfoRes[]>> => {
    const { data } = await axiosAuthInstance.get(`/games/${id}/zones/${zoneId}/seats`);
    return data;
}

// 좌석 선점 확인
export const patchSeatConfirm = async({id, zoneId, info}: {id: number, zoneId: number, info:number[]}): Promise<APIResponse<string>> => {
    console.log(info);
    const { data } = await axiosAuthInstance.patch(`/games/${id}/zones/${zoneId}/seats`,{
        seatNumbers: info,
    });
    return data;
}

export const registSeats = async ({ gameId, zoneId, seatNumbers, isRefund }: { gameId: number, zoneId: number, seatNumbers: number[], isRefund: boolean }): Promise<APIResponse<string>> => {
    console.log(gameId, zoneId, seatNumbers, isRefund)
    
    const { data } = await axiosAuthInstance.patch(`/games/${gameId}`, {
        gameId,
        zoneId,
        seatNumbers,
        isRefund
    })
    return data;

}