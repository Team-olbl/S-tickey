import { axiosAuthInstance } from '../../apis/axiosInstance';
import { APIResponse } from '../../types/model';
import { ISignupRes, IPostApproveRes, ISignupDetailRes, IPostApproveDetailRes } from '../../types/Admin';

export const getSignupReq = async (): Promise<APIResponse<ISignupRes>> => {
  const { data } = await axiosAuthInstance.get('/admin/organizations');
  return data;
};

export const getSignupDetailReq = async (id: number): Promise<APIResponse<ISignupDetailRes>> => {
  const { data } = await axiosAuthInstance.get(`/admin/organizations/${id}`);
  return data;
};

export const patchOrganizationStateReq = async ({
  id,
  status,
  message,
}: {
  id: number;
  status: string;
  message: string;
}): Promise<APIResponse<string>> => {
  const { data } = await axiosAuthInstance.patch(`/admin/organizations/${id}`, {
    status,
    message,
  });
  return data;
};

export const getPostApproveReq = async (): Promise<APIResponse<IPostApproveRes>> => {
  const { data } = await axiosAuthInstance.get('/admin/supports');
  return data;
};

export const getPostApproveDetailReq = async (id: number): Promise<APIResponse<IPostApproveDetailRes>> => {
  const { data } = await axiosAuthInstance.get(`/admin/supports/${id}`);
  return data;
};

export const patchPostStateReq = async ({
  id,
  status,
  message,
}: {
  id: number;
  status: string;
  message: string;
}): Promise<APIResponse<string>> => {
  const { data } = await axiosAuthInstance.patch(`/admin/supports/${id}`, {
    status,
    message,
  });
  return data;
};
