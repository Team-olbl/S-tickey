import { useQuery } from "@tanstack/react-query"
import { getProfileReq } from "../../service/Profile/api"

export const useProfile = () => {

    const useGetProfile = ( props: number ) => {
        return useQuery({
            queryKey: ['profile', props],
            queryFn: () => getProfileReq(props),
        })
    }

    return { useGetProfile }
}