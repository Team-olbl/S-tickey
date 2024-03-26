import { categoryType } from "./model";

export interface IPreTeamSimpleRes {
    sportsClubId: number;
    sportsClubLogo: string;
    sportsClubName: string
}

export interface IPlayerSimpleRes {
    name: string;
    id: number;
    description: string;
    category: categoryType;
    birth: string
}

// 프로필 조회 Response
export interface IUserProfile {
    profileImage: string;
    name: string;
    preference: IPreTeamSimpleRes[];    
}

// 단체 선수 목록 조회 Response
export interface IPlayerListRes {
    playerResList: IPlayerSimpleRes[]
}