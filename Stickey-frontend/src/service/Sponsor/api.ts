import { axiosAuthInstance } from '../../apis/axiosInstance';
import { IMySponsorListRes, ISupportListRes, ISupportListReq, ISponsorDetailRes } from '../../types/Sponsor';
import { APIResponse } from '../../types/model';

export const getMySponsorListReq = async (): Promise<APIResponse<IMySponsorListRes>> => {
  const { data } = await axiosAuthInstance.get(`/organizations/profile/supports`);
  return data;
};

export const getSupportListReq = async (flag: ISupportListReq): Promise<APIResponse<ISupportListRes>> => {
  const { data } = await axiosAuthInstance.get(`/supports`, {
    params: flag,
  });
  return data;
};

export const getSponsorDetailReq = async (id: number): Promise<APIResponse<ISponsorDetailRes>> => {
  const { data } = await axiosAuthInstance.get(`/supports/${id}`);
  return data;
};

export const postSupportReq = async (formData: FormData): Promise<APIResponse<string>> => {
  const { data } = await axiosAuthInstance.post('/supports', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getSelectSupportId = async (): Promise<APIResponse<{id : number}>> => {
  const { data } = await axiosAuthInstance.get('/supports/item');
  return data;
};
