type PlayerData = {
  id:number;
  category: string;
  name: string;
  profile: JSX.Element;
  birth: string;
  description: string[];
}

const PlayerList = () => {
  const dummies: PlayerData[] = [
    {
      id: 1,
      category: '수영',
      name: '황선우',
      profile: <img src='' />,
      birth: '2003. 5. 21',
      description: [
        '전국체육대회 남자 자유형 100m 1위',
        '세계수영선수권대회 남자 자유형 200m 1위'
      ]
    },
    {
      id: 2,
      category: '수영',
      name: '황선우',
      profile: <img src='' />,
      birth: '2003. 5. 21',
      description: [
        '전국체육대회 남자 자유형 100m 1위',
        '세계수영선수권대회 남자 자유형 200m 1위'
      ]
    },
  ];

  return (
    <div>
      <div className="w-full flex flex-col justify-center gap-3 items-center px-4">
        {dummies.map((item, id) => (
          <div key={id} className="px-4">
            <div className="flex items-center h-auto py-4 px-2 border-none rounded-[10px] bg-[#2E2E3D]">
              <div className="w-full flex flex-row px-4 gap-3">
                <div className="w-20 h-20 border border-none rounded-full bg-Stickey_Gray">{item.profile}</div>
                <div className="flex flex-col w-[208px] h-[20px] gap-2 text-white">
                  <div className="flex flex-row gap-1">
                    <div className="flex flex-col justify-end">
                      <p className="text-[8px]">{item.category}</p>
                    </div>
                    <p className="text-[12px]">{item.name}</p>
                  </div>
                  <div className="border-b-[0.5px] w-full"></div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row">
                      <p className="w-12 h-[10px] text-[8px] text-[#A0A0A0]">생년월일</p>
                      <p className="w-12 h-[10px] text-[8px]">{item.birth}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="w-12 h-10 text-[8px] text-[#A0A0A0]">선수 설명</p>
                      <div className="flex flex-col gap-1">
                        {item.description.map((desc, index) => (
                          <p key={index} className="w-full h-[10px] text-[8px]">{desc}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
