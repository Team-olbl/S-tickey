import { useMutation, useQuery } from '@tanstack/react-query';
import { getMySponsorLitReq, getSupportListReq, getSponsorDetailReq, postSupportReq } from '../../service/Sponsor/api';
import { ISupportListReq } from '../../types/Sponsor';

export const useSponsor = () => {
  const useGetMySponsorList = () => {
    return useQuery({
      queryKey: ['mySponsor'],
      queryFn: () => getMySponsorLitReq(),
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
      mutationFn: postSupportReq
    })
  }

  return { useGetMySponsorList, useSupportList, useSponsorDetail, usePostSupport };
};
