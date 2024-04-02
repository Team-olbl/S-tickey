import { useQuery } from '@tanstack/react-query';
import { getGameListReq, getTeamListReq } from '../../service/Home/api';
import { IGameListReq, ITeamListReq } from '../../types/Home';

export const useGame = () => {
  const useGetGameList = (props: IGameListReq) => {
    return useQuery({
      queryKey: ['game', props],
      queryFn: () => getGameListReq(props),
      refetchOnWindowFocus: false,
      staleTime: 30000,
    });
  };

  const useGetTeamList = (props: ITeamListReq) => {
    return useQuery({
      queryKey: ['team', props],
      queryFn: () => getTeamListReq(props),
      refetchOnWindowFocus: false,
    });
  };

  return { useGetGameList, useGetTeamList };
};
