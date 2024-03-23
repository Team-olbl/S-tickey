import { useNavigate } from "react-router-dom";
import Next from '../../assets/image/Next.png';
import { useEffect, useState } from "react";
import LogoutModal from "../Login/LogoutModal";
import BottomModal from "../@common/BottomModal";
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from "react-toastify";
import 대구FC from '../../assets/Logos/대구FC.png';
import 광주FC from '../../assets/Logos/광주FC.png';
import FC서울 from '../../assets/Logos/서울FC.png';
import 수원FC from '../../assets/Logos/수원FC.png';
import 강원FC from '../../assets/Logos/강원FC.png';
import 김천상무 from '../../assets/Logos/김천상무.png';
import 대전 from '../../assets/Logos/대전하나시티즌.png';
import 울산HD from '../../assets/Logos/울산HD.png';
import 인천UTD from '../../assets/Logos/인천UTD.png';
import 전북현대 from '../../assets/Logos/전북현대.png';
import 제주UTD from '../../assets/Logos/제주UTD.png';
import 포항 from '../../assets/Logos/포항.png';

type teamList = {
  id: number;
  type: string;
  name: string;
  homeground: string;
  stadium: string;
  logo: JSX.Element;
}

const Menu = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [preferredTeams, setPreferredTeams] = useState<teamList[]>([]);

  const handlePreferredTeam = () => {
    setIsBottomSheetOpen(true)
  }

  const handleClick = (name:string) => {
    setSelectedTeam(name)
  }

  useEffect(() => {
    console.log(selectedTeam);
  }, [selectedTeam]);

  const handleTabClick = (tabType: string) => {
    setSelectedTab(tabType)
  }

  useEffect(() => {
    console.log(selectedTab)
  }, [selectedTab])

  const handleAddTeam = () => {
    const selected = dummies.find(team => team.name === selectedTeam);
    // 선택된 팀이 이미 selectedTeams 배열에 있는지 확인
    const isAlreadySelected = preferredTeams.some(team => team.id === selected?.id);
    console.log(selectedTeam)
    // 선택된 팀이 없고, selectedTeams의 길이가 3보다 작을 때 + 이미 선택된 팀이 아닐 때 추가
    if (selected && preferredTeams.length < 3 && !isAlreadySelected) {
      setPreferredTeams(prev => [...prev, selected]);
    } else if (isAlreadySelected) {
      toast.error('이미 선택된 팀입니다.');
    } else if (preferredTeams.length >= 3) {
      toast.error('선호 구단은 최대 3개까지 등록할 수 있습니다.')
    }
  }
  

  const handleRemoveTeam = (index: number) => {
    setPreferredTeams(prev => prev.filter((_, i) => i !== index));
  }

  const dummies: teamList[] = [
    {
      id: 1,
      type: '축구',
      name: '대구 FC',
      homeground: '대구',
      stadium: 'DGB 대구은행파크',
      logo: <img src={대구FC} />
    },
    {
      id: 2,
      type: '축구',
      name: '광주 FC',
      homeground: '광주',
      stadium: '광주 월드컵경기장',
      logo: <img src={광주FC} />
    },
    {
      id: 3,
      type: '축구',
      name: 'FC 서울',
      homeground: '서울',
      stadium: '서울 월드컵경기장',
      logo: <img src={FC서울} />
    },
    {
      id: 4,
      type: '축구',
      name: '수원 FC',
      homeground: '수원',
      stadium: '수원 월드컵경기장',
      logo: <img src={수원FC} />
    },
    {
      id: 5,
      type: '축구',
      name: '강원 FC',
      homeground: '강원',
      stadium: '강원 월드컵경기장',
      logo: <img src={강원FC} />
    },
    {
      id: 6,
      type: '축구',
      name: '김천 상무',
      homeground: '김천',
      stadium: '김천 월드컵경기장',
      logo: <img src={김천상무} />
    },
    {
      id: 7,
      type: '축구',
      name: '대전 하나시티즌',
      homeground: '대전',
      stadium: '대전 월드컵경기장',
      logo: <img src={대전} />
    },
    {
      id: 8,
      type: '축구',
      name: '울산 현대',
      homeground: '울산',
      stadium: '울산 월드컵경기장',
      logo: <img src={울산HD} />
    },
    {
      id: 9,
      type: '축구',
      name: '인천 UTD',
      homeground: '인천',
      stadium: '인천 월드컵경기장',
      logo: <img src={인천UTD} />
    },
    {
      id: 10,
      type: '축구',
      name: '전북 현대',
      homeground: '전북',
      stadium: '전북 월드컵경기장',
      logo: <img src={전북현대} />
    },
    {
      id: 11,
      type: '축구',
      name: '제주 UTD',
      homeground: '제주',
      stadium: '제주 월드컵경기장',
      logo: <img src={제주UTD} />
    },
    {
      id: 12,
      type: '축구',
      name: '포항 스틸러스',
      homeground: '포항',
      stadium: '포항 월드컵경기장',
      logo: <img src={포항} />
    },
    {
      id: 13,
      type: '야구',
      name: '야구',
      homeground: '포항',
      stadium: '포항 월드컵경기장',
      logo: <img src={포항} />
    },
    {
      id: 14,
      type: '농구',
      name: '농구',
      homeground: '포항',
      stadium: '포항 월드컵경기장',
      logo: <img src={포항} />
    },
  ];

  const filteredTeams = dummies.filter(team => team.type === selectedTab);

  return (
    <div className="max-w-[500px] w-full h-[208px] mt-4 border-t-[0.5px]">
      <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => navigate('/profile/paymenthistory')}>
        <p>결제 내역</p>
        <img src={Next} className="h-[20px]"/>
      </div>
      <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => navigate('/profile/dreamhistory')}>
        <p>꿈 내역</p>
        <img src={Next} className="h-[20px]"/>
      </div>
      <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={handlePreferredTeam} >
        <p>나의 선호구단</p>
        <img src={Next} className="h-[20px]"/>
      </div>
      <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => navigate('/profile/edit')}>
        <p>회원 정보 수정</p>
        <img src={Next} className="h-[20px]"/>
      </div>
      <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => setIsLogoutModalOpen(true)}>
        <p>로그아웃</p>
        <img src={Next} className="h-[20px]"/>
      </div>
      {isLogoutModalOpen && <LogoutModal onClose={() => setIsLogoutModalOpen(false)}/>}
      <div className="text-white">
        {isBottomSheetOpen && 
          <BottomModal height="auto" title="선호 구단" onClose={() => setIsBottomSheetOpen(false)}>
            <div className="flex flex-col justify-center">
              <div className="text-[10px] text-center pb-3">
                <p>선호 구단은 최대 3개까지 등록할 수 있습니다.</p>
              </div>
              <div className="flex flex-row w-full gap-2 justify-center">
                {preferredTeams.map((team, index) => (
                  <div key={index} className="w-[80px] h-[82px] border border-none rounded-[10px] bg-[#1F1F31]">
                    <div className="flex justify-end pt-2 pr-2 text-Stickey_Gray">
                      <AiOutlineClose style={{ width: '12px', height: '12px' }} onClick={() => handleRemoveTeam(index)}/>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-center px-6">
                        {team.logo}
                      </div>
                      <div className="text-[10px] flex justify-center">
                        {team.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-4 px-6">
                <div className="border-b-[0.5px] border-b-Stickey_Gray"></div>
              </div>
              <div className="flex flex-row w-full justify-between px-[96px] text-Stickey_Gray text-[12px] pb-4" >
                <div onClick={() => handleTabClick('축구')} className={`${selectedTab === '축구' ? 'text-white font-bold underline underline-offset-4' : ''}`}>
                  <p>축구</p>
                </div>
                <div onClick={() => handleTabClick('야구')} className={`${selectedTab === '야구' ? 'text-white font-bold underline underline-offset-4' : ''}`}>
                  <p>야구</p>
                </div>
                <div onClick={() => handleTabClick('농구')} className={`${selectedTab === '농구' ? 'text-white font-bold underline underline-offset-4' : ''}`}>
                  <p>농구</p>
                </div>
              </div>
              <div className="h-[164px] overflow-y-auto pb-6">
              {filteredTeams.map((item) => (
                <div key={item.id} className="w-full flex flex-row items-center justify-center gap-4 pb-4">
                  <div className="w-4 h-4 border-2 rounded-full flex items-center justify-center cursor-pointer" onClick={() => handleClick(item.name)}>
                    {selectedTeam === item.name && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <div className="flex items-center w-10 h-10 border border-none bg-white rounded">
                    {item.logo}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs">연고지 : {item.homeground} / 구장 : {item.stadium}</p>
                  </div>
                </div>
              ))}
              </div>
              <div className="fixed w-full px-8 bottom-16">
                <button className="w-full h-8 border border-none bg-Stickey_Main rounded-[5px]" onClick={handleAddTeam}>추가하기</button>
              </div>
            </div>
          </BottomModal>}
      </div>
    </div>
  )
}

export default Menu;