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