import Star from '../../assets/image/Star.png';
import { useGame } from '../../hooks/Home/useGame';
import { motion } from "framer-motion";

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

  const variants = {
    visible: (custom : number) => ({
      opacity: 1,
      transition: { delay: custom * 0.1 }
    })
  }

  return (
    <div className="px-4 flex flex-row z-[2] overflow-x-auto">
      <div className="flex flex-row gap-2">
        {teamListInfo &&
          teamListInfo.data.map((team, idx) => (
            <motion.div
              variants={variants} initial={{opacity : 0}} custom={idx} animate="visible"
              key={team.id}
              onClick={() => handleTeamClick(team.name)}
              className={`relative w-16 h-20 border border-none flex flex-col shadow-[2px_2px_rgba(0,0,0,0.25)] justify-center items-center gap-1 rounded-[5px] ${
                selectedTeams.includes(team.name) ? 'bg-black/50' : 'bg-[#2E2E3D]'
              } `}
            >
              {team.isPrefer === 1 && <img src={Star} className="absolute w-3 h-3 left-1 top-1" />}
              <div className="w-8 h-9">
                <img src={team.logo} alt={team.name} />
              </div>
              <p className="text-[9px] text-white">{team.name}</p>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default TeamList;
