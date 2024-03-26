
export interface IMySponsorSimpleRes {
    id: number;
    content: string;
    startTime: string;
    title: string;
    status: string;
    createTime: string;
    endTime: string;
    supportImage: string;
}

// 마이페이지 -> 후원글 조회 Response
export interface IMySponsorListRes {
    mySupportResList: IMySponsorSimpleRes[];
}