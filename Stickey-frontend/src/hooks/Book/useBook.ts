import { useQuery } from "@tanstack/react-query"
import { getSeatInfoReq, getSectionSeatCntReq } from "../../service/Book/api"

export const useBook = () => {

    const useSectionSeatCnt = ( props: number ) => {
        return useQuery({
            queryKey: ['section', props],
            queryFn: () => getSectionSeatCntReq(props),
        })
    }

    const useSeatInfoCnt = ({id, zoneId}: {id: number, zoneId: number}) => {
        return useQuery({
            queryKey: ['seat', id, zoneId],
            queryFn: () => getSeatInfoReq({id, zoneId})
        })
    }

    return { useSectionSeatCnt, useSeatInfoCnt }
}