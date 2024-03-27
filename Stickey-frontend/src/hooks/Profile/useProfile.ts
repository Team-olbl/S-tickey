import { useMutation, useQuery } from "@tanstack/react-query"
import { getPlayerListReq, getProfileReq, patchTeamPreference, postPlayerCreate } from "../../service/Profile/api"
import { ICreatePlayerReq, ITeamPreferReq } from "../../types/Profile"

export const useProfile = () => {

    const useGetProfile = () => {
        return useQuery({
            queryKey: ['profile'],
            queryFn: () => getProfileReq(),
        })
    }

    const useGetPlayerList = () => {
        return useQuery({
            queryKey: ['playerList'],
            queryFn: () => getPlayerListReq(),
        })
    }

    // 단체 선수 등록
    const usePostPlayerCreate = (info: ICreatePlayerReq) => {
        return useMutation({
            mutationFn: () => postPlayerCreate(info)
        })
    }

    // 선호구단 등록
    const usePatchTeamPrefer = (info: ITeamPreferReq) => {
        return useMutation({
            mutationFn: () => patchTeamPreference(info)
        })
    }

    return { useGetProfile, useGetPlayerList, usePostPlayerCreate, usePatchTeamPrefer }
}