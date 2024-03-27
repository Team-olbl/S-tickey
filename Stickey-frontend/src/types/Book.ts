
export interface ISectionSeatSimpleRes {
    zoneId: number;
    zoneName: string;
    totalSeatCnt: number;
    leftSeatCnt: number;
    price: number;
}

// 구역별 잔여 좌석 Response
export interface ISectionSeatCntRes {
    leftSeatResList: ISectionSeatSimpleRes[]
}
