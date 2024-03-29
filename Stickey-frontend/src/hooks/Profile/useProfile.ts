import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPlayerListReq, getProfileReq, getUserData, patchEditUserData, patchTeamPreference, postPlayerCreate } from "../../service/Profile/api"
import { IEditUserDataRes, ITeamPreferReq } from "../../types/Profile"

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

    // 개인 유저 정보 조회
    const useGetUserData = () => {
        return useQuery({
            queryKey: ['userData'],
            queryFn: () => getUserData(),
        })
    }

    // 개인 유저 정보 수정
    const useEditUserData = () => {
        const mutation = useMutation<IEditUserDataRes, Error, FormData>({
            mutationFn: patchEditUserData,
            onSuccess: (data) => {
                console.log('수정이 완료되었습니다.', data)
            },
            onError: (error:Error) => {
                console.error('수정에 실패했습니다.', error.message)
            }
        })
        return mutation
    }

    return { useGetProfile, useGetPlayerList, usePatchTeamPrefer, usePostPlayerCreate, useGetUserData, useEditUserData }
}