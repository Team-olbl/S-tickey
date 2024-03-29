import { useQuery } from "@tanstack/react-query"
import { getMySponsorLitReq } from "../../service/Sponsor/api"

export const useSponsor = () => {

    const useGetMySponsorList = () => {
        return useQuery({
            queryKey: ['mySponsor'],
            queryFn: () => getMySponsorLitReq(),
        })
    }

    return { useGetMySponsorList }
}