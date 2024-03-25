import {categoryType} from './model'

export interface IGameSimpleRes {
    id: number;
    gameImage: string;
    category: string;
    stadium: string;
    homeTeam: string;
    homeTeamLogo:string | null;
    awayTeam: string;
    awayTeamLogo:string | null;
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