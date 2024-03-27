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

export interface signupRes {
  message:string;
}

export interface signupReq {
  signUpReq: {
    name: string;
    email:string;
    password: string;
    phone: string
  },
  profile: string;
}