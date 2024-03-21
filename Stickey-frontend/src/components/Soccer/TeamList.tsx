import { useState } from 'react';
import 대구FC from '../../assets/Logos/대구FC.png'
import FC서울 from '../../assets/Logos/서울FC.png';
import Star from '../../assets/image/Star.png';


export type TeamData = {
  id: number;
  name: string;
  type: string;
  logo: JSX.Element;
  isSelected: boolean;
}

const preferredDummies: TeamData[] = [
  {
    id: 1,
    name: 'FC서울',
    type: "축구",
    logo: <img src={FC서울} />,
    isSelected: true
  },
  {
    id: 2,
    name: '대구FC',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: true
  },
];

const teamLists: TeamData[] = [
  {
    id: 3,
    name: '광주FC',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
  {
    id: 4,
    name: '강원FC',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
  {
    id: 5,
    name: '대전하나시티즌',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
  {
    id: 6,
    name: '수원FC',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
  {
    id: 7,
    name: '울산HD',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
  {
    id: 8,
    name: '인천UTD',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
  {
    id: 9,
    name: '전북현대',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
  {
    id: 10,
    name: '제주UTD',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
  {
    id: 11,
    name: '포항',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
  {
    id: 12,
    name: '김천상무',
    type: "축구",
    logo: <img src={대구FC} />,
    isSelected: false
  },
];

const TeamList = () => {
  const [preferredTeams, setPreferredTeams] = useState<TeamData[]>(preferredDummies);
  const [teamListsData, setTeamListsData] = useState<TeamData[]>(teamLists);

  const handleTeamClick = (team: TeamData, list: TeamData[]) => {
    const updatedList = list.map(item => {
      if (item.id === team.id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    if (list === preferredTeams) {
      setPreferredTeams(updatedList);
    } else {
      setTeamListsData(updatedList);
    }
  };

  return (
    <div className="flex flex-row z-[2] overflow-x-auto">
      <div className="pl-3 flex flex-row gap-2">
      {preferredTeams.map((team) => (
        <div key={team.id} className={`relative w-14 h-16 border border-none flex flex-col shadow-[2px_2px_rgba(0,0,0,0.25)] justify-center items-center gap-1 rounded-[5px] bg-[#2E2E3D] ${team.isSelected ? "bg-Stickey_Gray/50" : "bg-black/50"}`} onClick={() => handleTeamClick(team, preferredTeams)}>
          <img src={Star} className='absolute w-2 h-2 left-1 top-1'/>
          <div className="w-7 h-8">
            {team.logo}
          </div>
          <p className="text-[6px] text-white">{team.name}</p>
        </div>
      ))}
      </div>
      <div className="mx-3 flex flex-col items-center justify-center">
        <div className="border-l border-Stickey_Gray h-[48px]"></div>
      </div>
      <div className="flex flex-row gap-2">
        {teamListsData.map((team) => (
          <div key={team.id} className={`w-14 h-16 border border-none flex flex-col shadow-[2px_2px_rgba(0,0,0,0.25)] justify-center items-center gap-1 rounded-[5px] bg-[#2E2E3D] ${team.isSelected ? "bg-Stickey_Gray/50" : "bg-black/50"}`} onClick={() => handleTeamClick(team, teamListsData)}>
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
