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

export interface ISupportSimpleRes {
  id: number;
  title: string;
  content: string;
  startTime: string;
  endTime: string;
  supportImage: string | undefined;
  organizationName: string;
  profileImage: string | undefined;
}

// 후원 글 목록 조회 Request
export interface ISupportListReq {
  flag?: number;
}

// 후원 글 목록 조회 Response
export interface ISupportListRes {
  supportListRes: ISupportSimpleRes[];
}

// 후원 글 상세 조회 Response
export interface ISponsorDetailRes {
  organizationId: number;
  title: string;
  content: string;
  supportImage: string | undefined;
  startTime: string;
  endTime: string;
  profileImage: string | undefined;
  name: string;
  email: string;
  phone: string;
  address: string;
  manager: string;
  players: IPlayersRes[];
}

export interface IPlayersRes {
  id: number;
  name: string;
  profile: string | undefined;
  category: string;
  description: string;
  birth: string;
}
