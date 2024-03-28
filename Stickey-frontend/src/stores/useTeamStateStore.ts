import { create } from 'zustand';

interface ITeamType {
  selectedTeams: string[];
  toggleSelectTeam: (teamName: string) => void;
}

export const TeamStoreState = create<ITeamType>((set) => ({
  selectedTeams: [],
  toggleSelectTeam: (teamName) =>
    set((state) => ({
      selectedTeams: state.selectedTeams.includes(teamName)
        ? state.selectedTeams.filter((name) => name !== teamName)
        : [...state.selectedTeams, teamName],
    })),
}));
