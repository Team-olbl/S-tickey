
export interface IPreTeamSimpleRes {
    sportsClubId: number;
    sportsClubLogo: string;
    sportsClubName: string
}

export interface IPlayerSimpleRes {
    name: string;
    id: number;
    description: string;
    category: string;
    birth: string;
    profile: string;
}

// 프로필 조회 Response
export interface IUserProfile {
    role: string;
    status: string | null;
    profileImage: string;
    name: string;
    preference: IPreTeamSimpleRes[];    
}

// 단체 선수 목록 조회 Response
export interface IPlayerListRes {
    playerResList: IPlayerSimpleRes[]
}

// 선수 등록 Request
export interface ICreatePlayerReq {
    name: string;
    description: string;
    category: string;
    birth: string;
}

// 선호구단 등록 Request 
export interface ITeamPreferReq {
    preferences: number[]
}

// 개인정보 수정
export interface IEditUserDataReq {
    userInfoReq: {
        phone: string;
    };
    profileImage?: File;
}

export interface IEditUserDataRes {
    message:string;
}