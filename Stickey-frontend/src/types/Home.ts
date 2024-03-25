import {categoryType} from './model'

export interface IGameSimpleRes {
    id: number;
    stadium: string;
    homeTeam: string;
    awayTeam: string;
    category: string;
    bookStartTime: string;
    bookEndTime: string;
    gameStartTime: string;
}

// 경기 목록 조회 Response
export interface IGameListRes {
    gameResList: IGameSimpleRes[];
}

// 경기 목록 조회 Request
export interface IGameListReq {
    catg?: categoryType;
    club?: string;
    date?: string;

}