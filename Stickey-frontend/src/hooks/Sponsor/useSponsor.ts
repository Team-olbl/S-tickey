import { useMutation, useQuery } from '@tanstack/react-query';
import { getMySponsorListReq, getSupportListReq, getSponsorDetailReq, postSupportReq } from '../../service/Sponsor/api';
import { ISupportListReq } from '../../types/Sponsor';
import userStore from '../../stores/userStore';

export const useSponsor = () => {
  const { id } = userStore();

  const useGetMySponsorList = () => {
    return useQuery({
      queryKey: ['mySponsor', id],
      queryFn: () => getMySponsorListReq(),
      select: res => res.data,
    });
  };

  const useSupportList = (props: ISupportListReq) => {
    return useQuery({
      queryKey: ['supports', props],
      queryFn: () => getSupportListReq(props),
    });
  };

  const useSponsorDetail = (props: number) => {
    return useQuery({
      queryKey: ['supportsDetail', props],
      queryFn: () => getSponsorDetailReq(props),
    });
  };

  const usePostSupport = () => {
    return useMutation({
      mutationFn: postSupportReq,
    });
  };

  return { useGetMySponsorList, useSupportList, useSponsorDetail, usePostSupport };
};
