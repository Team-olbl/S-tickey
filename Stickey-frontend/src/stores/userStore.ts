import create from 'zustand';
import { persist } from 'zustand/middleware';

interface IPreferences {
  sportsClubId: number;
  sportsClubLogo: string;
  sportsClubName: string;
}

interface IUserState {
  isLogin: boolean;
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  accessToken: string;
  refreshToken: string;
  role?: 'INDIVIDUAL' | 'ORGANIZATION';
  profile?: string;
  manager?: string;
  address?: string;
  registrationNumber?: string;
  registrationFile?: string;
  preferences: IPreferences[];
  loginUser: ({ id, name, email, phone, profile, accessToken, refreshToken, role, preferences }: {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    profile?: string;
    accessToken: string;
    refreshToken: string;
    role?: 'INDIVIDUAL' | 'ORGANIZATION';
    preferences: IPreferences[];
  }) => void;
  logoutUser: () => void;
}

const userStore = create(
  persist<IUserState>(
    (set) => ({
      isLogin: false,
      id: 0,
      name: '',
      email: '',
      phone: '',
      accessToken: '',
      refreshToken: '',
      role: 'INDIVIDUAL',
      profile: undefined,
      manager: undefined,
      address: undefined,
      registrationNumber: undefined,
      registrationFile: undefined,
      preferences: [],
      loginUser: ({ id, name, email, phone, profile, accessToken, refreshToken, role, preferences }) => 
        set({
          id: id,
          name: name,
          email: email,
          phone: phone,
          profile: profile,
          accessToken: accessToken,
          refreshToken: refreshToken,
          role: role,
          preferences: preferences,
          isLogin: true,
        }),
      logoutUser: () =>
        set({
          isLogin: false,
          id: 0,
          name: '',
          email: '',
          phone: '',
          accessToken: '',
          refreshToken: '',
          role: 'INDIVIDUAL',
          profile: undefined,
          manager: undefined,
          address: undefined,
          registrationNumber: undefined,
          registrationFile: undefined,
          preferences: [],
        }),
    }),
    {
      name: 'user-store',
    }
  )
);

export default userStore;
