import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPlayerListReq,
  getProfileReq,
  getUserData,
  patchEditUserData,
  patchTeamPreference,
  postPlayerCreate,
} from '../../service/Profile/api';
import userStore from '../../stores/userStore';

export const useProfile = () => {
  const { id } = userStore();

  const useGetProfile = () => {
    return useQuery({
      queryKey: ['profile', id],
      queryFn: () => getProfileReq(),
    });
  };

  const useGetPlayerList = () => {
    return useQuery({
      queryKey: ['playerList'],
      queryFn: () => getPlayerListReq(),
    });
  };

  // // 단체 선수 등록
  const usePostPlayerCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ['image'],
      mutationFn: (formData: FormData) => postPlayerCreate(formData),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['PlayerProfile'] });
        console.log('선수를 등록했습니다.');
      },
    });
  };

  // 선호구단 등록
  const usePatchTeamPrefer = () => {
    return useMutation({
      mutationFn: patchTeamPreference,
    });
  };

  // 개인 유저 정보 조회
  const useGetUserData = () => {
    return useQuery({
      queryKey: ['userData'],
      queryFn: () => getUserData(),
    });
  };

  // 개인 유저 정보 수정
  const useEditUserData = () => {
    return useMutation({
      mutationFn: (info: FormData) => patchEditUserData(info),
    });
  };

  return { useGetProfile, useGetPlayerList, usePatchTeamPrefer, usePostPlayerCreate, useGetUserData, useEditUserData };
};
