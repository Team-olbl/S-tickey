
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


// 좌석 잔여 정보 Resquest
export interface ISeatInfoReq {
    id: number;
    zoneId: number;
}

// 좌석 잔여 정보 Response
export interface ISeatInfoRes {
    seatNumber: number;
    status: string;
}