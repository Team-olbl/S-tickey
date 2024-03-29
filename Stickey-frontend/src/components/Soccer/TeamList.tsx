import Star from '../../assets/image/Star.png';
import { useGame } from '../../hooks/Home/useGame';

const TeamList = ({ catg, selectedTeams, setSelectedTeams }: { catg: string, selectedTeams:string[], setSelectedTeams:React.Dispatch<React.SetStateAction<string[]>> }) => {
  const { useGetTeamList } = useGame();

  const handleTeamClick = (teamName: string) => {
    if (selectedTeams.includes(teamName)) {
      setSelectedTeams(selectedTeams.filter(name => name !== teamName));
    } else {
      setSelectedTeams((state) => [...state, teamName]);
    }
  };


  const { data: teamListInfo } = useGetTeamList({ catg });


  return (
    <div className="px-4 flex flex-row z-[2] overflow-x-auto">
      <div className="flex flex-row gap-2">
        {teamListInfo &&
          teamListInfo.data.map((team) => (
            <div
              key={team.id}
              onClick={() => handleTeamClick(team.name)}
              className={`relative w-14 h-16 border border-none flex flex-col shadow-[2px_2px_rgba(0,0,0,0.25)] justify-center items-center gap-1 rounded-[5px] ${
                selectedTeams.includes(team.name) ? 'bg-black/50' : 'bg-[#2E2E3D]'
              } `}
            >
              {team.isPrefer === 1 && <img src={Star} className="absolute w-3 h-3 left-1 top-1" />}
              <div className="w-7 h-8">
                <img src={team.logo} alt={team.name} />
              </div>
              <p className="text-[6px] text-white">{team.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamList;
