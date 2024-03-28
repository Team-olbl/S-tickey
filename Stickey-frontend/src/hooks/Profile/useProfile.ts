import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPlayerListReq, getProfileReq, patchTeamPreference, postPlayerCreate } from "../../service/Profile/api"
import { ITeamPreferReq } from "../../types/Profile"

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

    // // 단체 선수 등록
    const usePostPlayerCreate = () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationKey: ['image'],
            mutationFn: (formData: FormData) => postPlayerCreate(formData),

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['PlayerProfile']})
                console.log('선수를 등록했습니다.')
            }
        })
    }

    // 선호구단 등록
    const usePatchTeamPrefer = (info: ITeamPreferReq) => {
        return useMutation({
            mutationFn: () => patchTeamPreference(info)
        })
    }

    return { useGetProfile, useGetPlayerList, usePatchTeamPrefer, usePostPlayerCreate }
}