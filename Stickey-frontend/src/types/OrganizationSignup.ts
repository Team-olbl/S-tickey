export interface signupData {
  name: string;
  phone: string;
  email: string;
  verificationCode?: string;
  password: string;
  confirmPassword?: string;
  registrationNumber: string;
  address: string;
  manager: string;
  wallet: string;
}

export interface AddresssData {
  address: string;
  addressType: 'R' | 'J';
  bname: string;
  buildingName: string;
}

export interface signupRes {
  message: string;
}

export interface signupReq {
  organSignUpReq: {
    name: string;
    phone: string;
    email: string;
    verificationCode?: string;
    password: string;
    confirmPassword?: string;
    registrationNumber: string;
    address: string;
    manager: string;
  };
  profile: string;
  rigistrationFile: string;
}
