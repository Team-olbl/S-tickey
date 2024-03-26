import { useQuery } from "@tanstack/react-query"
import { IUserProfileReq } from "../../types/Profile"
import { getProfileReq } from "../../service/Profile/api"

export const useProfile = () => {

    const useGetProfile = ( props: IUserProfileReq ) => {
        return useQuery({
            queryKey: ['profile', props],
            queryFn: () => getProfileReq(props),
        })
    }

    return { useGetProfile }
}