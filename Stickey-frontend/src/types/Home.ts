export interface IGameSimpleRes {
  id: number;
  gameImage: string;
  category: string;
  stadiumId: number;
  stadium: string;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
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
  catg?: string;
  club?: string[];
  date?: string;
}

// 구단 리스트 조회 Response
export interface ITeamListRes {
  id: number;
  category: string;
  name: string;
  logo: string;
  isPrefer: number;
}

// 구단 리스트 조회 Request
export interface ITeamListReq {
  catg?: string;
}
