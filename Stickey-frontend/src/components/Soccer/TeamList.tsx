// import Star from '../../assets/image/Star.png';
import { useGame } from '../../hooks/Home/useGame';
import { useTeamStateStore } from '../../stores/useTeamStateStore';

const TeamList = ({ catg }: { catg: string }) => {

  const { useGetTeamList } = useGame();

  const {
    data : teamListInfo,
  } = useGetTeamList({ catg });

  console.log(teamListInfo?.data)

  const { teamListsData } = useTeamStateStore();

  return (
    <div className="flex flex-row z-[2] overflow-x-auto">
      {/* <div className="pl-3 flex flex-row gap-2">
      {preferredTeams && preferredTeams.map((team) => (
        <div key={team.id} className={`relative w-14 h-16 border border-none flex flex-col shadow-[2px_2px_rgba(0,0,0,0.25)] justify-center items-center gap-1 rounded-[5px] bg-[#2E2E3D] `} >
          <img src={Star} className='absolute w-2 h-2 left-1 top-1'/>
          <div className="w-7 h-8">
            {team.logo}
          </div>
          <p className="text-[6px] text-white">{team.name}</p>
        </div>
      ))}
      </div> */}
      <div className="mx-3 flex flex-col items-center justify-center">
        <div className="border-l border-Stickey_Gray h-[48px]"></div>
      </div>
      <div className="flex flex-row gap-2">
        {teamListsData && teamListsData.map((team) => (
          <div key={team.id} className={`w-14 h-16 border border-none flex flex-col shadow-[2px_2px_rgba(0,0,0,0.25)] justify-center items-center gap-1 rounded-[5px] bg-[#2E2E3D] `}  >
            <div className="w-7 h-8">
              {team.logo}
            </div>
            <p className="text-[6px] text-white">{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
