import { axiosAuthInstance } from '../../apis/axiosInstance';
import { IGameListReq, IGameListRes, ITeamListReq, ITeamListRes } from '../../types/Home';
import { APIResponse } from '../../types/model';

export const getGameListReq = async ({ catg, club, date }: IGameListReq): Promise<APIResponse<IGameListRes>> => {
  const { data } = await axiosAuthInstance.get(`/games`, {
    params: {
      catg: catg,
      club: club,
      date: date,
    },
  });
  return data;
};

export const getTeamListReq = async ({ catg }: ITeamListReq): Promise<APIResponse<ITeamListRes[]>> => {
  const { data } = await axiosAuthInstance.get(`/games/clubs`, {
    params: {
      catg: catg,
    },
  });
  return data;
};
