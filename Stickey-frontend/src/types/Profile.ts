
export interface IPreTeamSimpleRes {
    sportsClubId: number;
    sportsClubLogo: string;
    sportsClubName: string
}

// 프로필 조회 Response
export interface IUserProfile {
    profileImage: string;
    name: string;
    preference: IPreTeamSimpleRes[];    
}
