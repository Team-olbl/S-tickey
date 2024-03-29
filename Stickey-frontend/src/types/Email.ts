export interface sendEmailRes {
  message: string;
}

export interface sendEmailReq {
  email: string;
}

export interface confirmEmailRes {
  message:string;
}

export interface confirmEmailReq {
  email: string;
  authCode: string;
}
