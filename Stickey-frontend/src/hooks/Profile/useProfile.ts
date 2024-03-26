import { useMutation, useQuery } from "@tanstack/react-query"
import { getPlayerListReq, getProfileReq, postPlayerCreate } from "../../service/Profile/api"
import { ICreatePlayerReq } from "../../types/Profile"

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

    const usePostPlayerCreate = (info: ICreatePlayerReq) => {
        return useMutation({
            mutationFn: () => postPlayerCreate(info)
        })
    }

    return { useGetProfile, useGetPlayerList, usePostPlayerCreate }
}