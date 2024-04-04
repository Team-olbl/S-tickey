import { axiosAuthInstance } from '../../apis/axiosInstance';
import { IPlayerListRes, ITeamPreferReq, IUserProfile } from '../../types/Profile';
import { APIResponse } from '../../types/model';

export const getProfileReq = async (): Promise<APIResponse<IUserProfile>> => {
  const { data } = await axiosAuthInstance.get(`/users/profiles`);
  return data;
};

export const getPlayerListReq = async (): Promise<APIResponse<IPlayerListRes>> => {
  const { data } = await axiosAuthInstance.get(`/organizations/profile/players`);
  return data;
};

// 선수 등록
export const postPlayerCreate = async (info: FormData): Promise<APIResponse<string>> => {
  const { data } = await axiosAuthInstance.post(`/organizations/profile/players`, info, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// 선호구단 등록
export const patchTeamPreference = async (info: ITeamPreferReq): Promise<APIResponse<string>> => {
  const { data } = await axiosAuthInstance.patch(`/users/profile/preference`, info);
  return data;
};

// 개인 유저 정보 조회
export const getUserData = async () => {
  const res = await axiosAuthInstance.get(`/users/profile/info`);
  return res.data.data;
};

// 개인 유저 정보 수정
export const patchEditUserData = async (info: FormData): Promise<APIResponse<string>> => {
  const res = await axiosAuthInstance.patch(`/users/profile/info`, info, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
