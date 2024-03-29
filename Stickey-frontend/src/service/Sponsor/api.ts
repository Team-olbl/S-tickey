import { axiosAuthInstance } from '../../apis/axiosInstance';
import { IMySponsorListRes, ISupportListRes, ISupportListReq } from '../../types/Sponsor';
import { APIResponse } from '../../types/model';

export const getMySponsorLitReq = async (): Promise<APIResponse<IMySponsorListRes>> => {
  const { data } = await axiosAuthInstance.get(`/organizations/profile/supports`);
  return data;
};

export const getSupportListReq = async (flag: ISupportListReq): Promise<APIResponse<ISupportListRes>> => {
  const { data } = await axiosAuthInstance.get(`/supports`, {
    params: flag,
  });
  return data;
};
