import { useQuery } from '@tanstack/react-query';
import { getMySponsorLitReq, getSupportListReq, getSponsorDetailReq } from '../../service/Sponsor/api';
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

  return { useGetMySponsorList, useSupportList, useSponsorDetail };
};
