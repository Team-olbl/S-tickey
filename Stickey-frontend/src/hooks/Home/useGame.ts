import { useQuery } from "@tanstack/react-query";
import { getGameListReq } from "../../service/Home/api";
import { IGameListReq } from "../../types/Home";

export const useGame = () => {

    const useGetGameList = ( props: IGameListReq ) => {
        return useQuery({
            queryKey: ['game', props],
            queryFn: () => getGameListReq(props),
        })
    } 

    return { useGetGameList}
}