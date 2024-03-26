
export interface IPreTeamSimpleRes {
    sportsClubId: number;
    sportsClubLogo: string;
    sportsClubName: string
}

// 프로필 조회 Response
export interface IUserProfileRes {
    profileImage: string;
    name: string;
    preference: IPreTeamSimpleRes[];
}

// 프로필 조회 Request
export interface IUserProfileReq {
    id : number;
}