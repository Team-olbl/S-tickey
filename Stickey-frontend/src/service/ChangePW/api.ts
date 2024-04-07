import { axiosAuthInstance } from '../../apis/axiosInstance';
import { APIResponse } from '../../types/model';

export const changePassword = async (password: string): Promise<APIResponse<string>> => {
  const accessToken = localStorage.getItem('accessToken');
  const res = await axiosAuthInstance.patch(
    `/users/profile/info/password`,
    { password },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
