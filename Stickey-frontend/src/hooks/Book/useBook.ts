import { useQuery } from "@tanstack/react-query"
import { getSectionSeatCntReq } from "../../service/Book/api"

export const useBook = () => {

    const useSectionSeatCnt = ( props: number ) => {
        return useQuery({
            queryKey: ['section', props],
            queryFn: () => getSectionSeatCntReq(props),
        })
    }

    return { useSectionSeatCnt }
}