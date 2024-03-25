import { create } from 'zustand';
import { ITeamSimpleRes } from '../types/Home'; 

type TeamStoreState = {
  preferredTeams: ITeamSimpleRes[] | null;
  teamListsData: ITeamSimpleRes[] | null;
  setPreferredTeams: (teams: ITeamSimpleRes[] | null) => void;
  setTeamListsData: (teams: ITeamSimpleRes[] | null) => void;
};

export const useTeamStateStore = create<TeamStoreState>((set) => ({
  preferredTeams: null,
  teamListsData: null,
  setPreferredTeams: (teams) => set({ preferredTeams: teams }),
  setTeamListsData: (teams) => set({ teamListsData: teams }),
}));
