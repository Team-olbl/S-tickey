import { useNavigate } from "react-router-dom";
import Next from '../../../assets/image/Next.png';
import { useEffect, useState } from "react";
import LogoutModal from "../../Login/LogoutModal";
import BottomModal from "../../@common/BottomModal";
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from "react-toastify";
import { useGame } from "../../../hooks/Home/useGame";
import { ITeamListRes } from "../../../types/Home";
import { useProfile } from "../../../hooks/Profile/useProfile";
import { ITeamPreferReq } from "../../../types/Profile";

const UserMenu = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [preferredTeams, setPreferredTeams] = useState<ITeamListRes[]>([]);

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

  const handleAddTeam = async () => {
    const selected = teamListInfo?.data.find(team => team.name === selectedTeam);
    // 선택된 팀이 이미 selectedTeams 배열에 있는지 확인
    const isAlreadySelected = preferredTeams.some(team => team.id === selected?.id);
    console.log(selectedTeam)
    // 선택된 팀이 없고, selectedTeams의 길이가 3보다 작을 때 + 이미 선택된 팀이 아닐 때 추가
    if (selected && preferredTeams.length < 3 && !isAlreadySelected) {
      setPreferredTeams(prev => [...prev, selected]);
    } else if (preferredTeams.length >= 3) {
      toast.error('선호 구단은 최대 3개까지 등록할 수 있습니다.');
    } else if (isAlreadySelected) {
      toast.error('이미 선택된 팀입니다.')
    }
    
  }
  const { usePatchTeamPrefer } = useProfile()

  // 선호구단의 아이디값을 배열에 저장
    const selectedTeamIds = preferredTeams.map(team => team.id);
    console.log(selectedTeamIds)

    const patchReq: ITeamPreferReq = {
      preferences: selectedTeamIds
    } 

    const { mutate } = usePatchTeamPrefer(patchReq);

    const handlePatchData = () => {
      mutate()
      setIsBottomSheetOpen(false)

    }


  const handleRemoveTeam = (index: number) => {
    setPreferredTeams(prev => prev.filter((_, i) => i !== index));
  }

  const { useGetTeamList } = useGame();

  const {
    data : teamListInfo,
  } = useGetTeamList({catg: ""});

  console.log(teamListInfo?.data)

  const filteredTeams = teamListInfo?.data.filter(team => team.category === selectedTab);

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
                        <img src={team.logo} />
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
                <div onClick={() => handleTabClick('SOCCER')} className={`${selectedTab === 'SOCCER' ? 'text-white font-bold underline underline-offset-4' : ''}`}>
                  <p>축구</p>
                </div>
                <div onClick={() => handleTabClick('BASEBALL')} className={`${selectedTab === 'BASEBALL' ? 'text-white font-bold underline underline-offset-4' : ''}`}>
                  <p>야구</p>
                </div>
                <div onClick={() => handleTabClick('BASKETBALL')} className={`${selectedTab === 'BASKETBALL' ? 'text-white font-bold underline underline-offset-4' : ''}`}>
                  <p>농구</p>
                </div>
              </div>
              <div className="h-[164px] overflow-y-auto pb-6" >
              {filteredTeams && filteredTeams.map((item) => (
                <div key={item.id} className="w-full flex flex-row items-center justify-start pl-24 gap-12 pb-4" onClick={() => handleClick(item.name)}>
                  <div className="w-4 h-4 border-2 rounded-full flex items-center justify-center cursor-pointer" >
                    {selectedTeam === item.name && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <div className="flex items-center w-12 h-12 border border-none bg-white rounded">
                    <img src={item.logo} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm">{item.name}</p>
                  </div>
                </div>
              ))}
              </div>
              <div className="fixed flex justify-center max-w-[500px] w-full px-8 bottom-16">
                <button className="p-2 w-40 mx-1 bg-Stickey_Main rounded-md" onClick={handleAddTeam}>추가하기</button>
                <button className="p-2 w-40 mx-1 bg-Stickey_Main rounded-md" onClick={() => handlePatchData()}>저장하기</button>
              </div>
            </div>
          </BottomModal>}
      </div>
    </div>
  )
}

export default UserMenu;