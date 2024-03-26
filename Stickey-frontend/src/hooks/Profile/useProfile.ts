import { useQuery } from "@tanstack/react-query"
import { getPlayerListReq, getProfileReq } from "../../service/Profile/api"

export const useProfile = () => {

    const useGetProfile = ( props: number ) => {
        return useQuery({
            queryKey: ['profile', props],
            queryFn: () => getProfileReq(props),
        })
    }

    const useGetPlayerList = () => {
        return useQuery({
            queryKey: ['playerList'],
            queryFn: () => getPlayerListReq(),
        })
    }

    return { useGetProfile, useGetPlayerList }
}