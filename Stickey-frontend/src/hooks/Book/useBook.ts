import { useMutation, useQuery } from "@tanstack/react-query"
import { getSeatInfoReq, getSectionSeatCntReq, patchSeatConfirm } from "../../service/Book/api"

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
            queryFn: () => getSeatInfoReq({ id, zoneId }),
            enabled: id != 0,
        })
    }

    // 선점 좌석 확인
    const useSeatconfirm = ({id, zoneId, info}: {id: number, zoneId: number, info:number[]}) => {
        return useMutation({
            mutationFn: () => patchSeatConfirm({id, zoneId, info})
        })
    }

    return { useSectionSeatCnt, useSeatInfoCnt, useSeatconfirm }
}