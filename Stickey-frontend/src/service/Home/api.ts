import { axiosAuthInstance } from '../../apis/axiosInstance'
import { IGameListReq, IGameListRes } from '../../types/Home'
import { APIResponse } from '../../types/model'

export const getGameListReq = async({catg, club, date} : IGameListReq): Promise<APIResponse<IGameListRes>> => {
    const { data } = await axiosAuthInstance.get(`/games`, {
        params: {
            catg: catg,
            club: club,
            date: date,
        },
    });
    return data;
};