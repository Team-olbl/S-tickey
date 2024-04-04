// 가입승인 타입
export interface ISignupRes {
  signUpResList: {
    name: string;
    id: number;
    profileImage: string | null;
  }[];
  count: number;
}

export interface ISignupDetailRes {
  name: string;
  phone: string;
  email: string;
  profileImage: string;
  manager: string;
  address: string;
  registrationNumber: string;
  registrationFile: string;
}

// 후원글승인 타입
export interface IPostApproveRes {
  waitingSupportRes: {
    id: number;
    title: string;
    organization: {
      name: string;
      id: number;
      profileImage: string | null;
    };
  }[];
  count: number;
}

export interface IPostApproveDetailRes {
  id: number;
  content: string;
  startTime: string;
  title: string;
  endTime: string;
  organization: {
    name: string;
    profileImage: string;
    wallet: string;
  };
}
