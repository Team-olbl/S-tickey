import { useQuery } from "@tanstack/react-query";
import { getGameListReq, getTeamLisReq } from "../../service/Home/api";
import { IGameListReq, ITeamListReq } from "../../types/Home";

export const useGame = () => {

    const useGetGameList = ( props: IGameListReq ) => {
        return useQuery({
            queryKey: ['game', props],
            queryFn: () => getGameListReq(props),
        })
    } 


    const useGetTeamList = ( props: ITeamListReq ) => {
        return useQuery({
            queryKey: ['team', props],
            queryFn: () => getTeamLisReq(props),
        })
    }

    return { useGetGameList, useGetTeamList }

}