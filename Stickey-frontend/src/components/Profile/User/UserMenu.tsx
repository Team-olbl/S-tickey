import { useNavigate } from 'react-router-dom';
import Next from '../../../assets/image/Next.png';
import { useEffect, useState } from 'react';
import LogoutModal from '../../Login/LogoutModal';
import BottomModal from '../../@common/BottomModal';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useGame } from '../../../hooks/Home/useGame';
import { useProfile } from '../../../hooks/Profile/useProfile';
import { ITeamPreferReq } from '../../../types/Profile';
import { connect } from '../../../service/web3/api';
import userStore, { IPreferences } from '../../../stores/userStore';
import { AnimatePresence, motion } from 'framer-motion';
import PasswordModal from './PasswordModal';

const UserMenu = ({ refetch }: { refetch: () => void }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [preferredTeams, setPreferredTeams] = useState<IPreferences[]>([]);
  const { setPreference } = userStore();

  const handlePreferredTeam = () => {
    setIsBottomSheetOpen(true);
  };

  const handleOpenModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClick = (name: string) => {
    setSelectedTeam(name);
  };

  useEffect(() => {}, [selectedTeam]);

  const handleTabClick = (tabType: string) => {
    setSelectedTab(tabType);
  };

  useEffect(() => {}, [selectedTab]);

  const handleAddTeam = async () => {
    const selected = teamListInfo?.data.find(team => team.name === selectedTeam);
    const isAlreadySelected = preferredTeams.some(team => team.sportsClubId === selected?.id);
    if (selected && preferredTeams.length < 3 && !isAlreadySelected) {
      setPreferredTeams(prev => [
        ...prev,
        { sportsClubId: selected.id, sportsClubLogo: selected.logo, sportsClubName: selected.name },
      ]);
    } else if (preferredTeams.length >= 3) {
      toast.error('선호 구단은 최대 3개까지 등록할 수 있습니다.');
    } else if (isAlreadySelected) {
      toast.error('이미 선택된 팀입니다.');
    }
  };
  const { usePatchTeamPrefer } = useProfile();

  const selectedTeamIds = preferredTeams.map(team => team.sportsClubId);
  const patchReq: ITeamPreferReq = {
    preferences: selectedTeamIds,
  };

  const { mutate } = usePatchTeamPrefer();

  const handlePatchData = () => {
    mutate(patchReq, {
      onSuccess: () => {
        setPreference(preferredTeams);
        refetch();
      },
    });
    setIsBottomSheetOpen(false);
  };

  const movePaymentHistory = () => {
    connect().then(ret => {
      if (ret) navigate('/profile/paymenthistory');
    });
  };

  const moveDreamHistory = () => {
    connect().then(ret => {
      if (ret) navigate('/profile/dreamhistory');
    });
  };

  const handleRemoveTeam = (index: number) => {
    setPreferredTeams(prev => prev.filter((_, i) => i !== index));
  };

  const { useGetTeamList } = useGame();

  const { data: teamListInfo } = useGetTeamList({ catg: '' });

  const filteredTeams = teamListInfo?.data.filter(team => team.category === selectedTab);
  const variants = {
    visible: (custom: number) => ({
      opacity: 1,
      transition: { delay: custom * 0.05 },
    }),
  };

  return (
    <div className="max-w-[500px] w-full h-[208px] mt-4 border-t-[0.5px] pb-20">
      <div className="px-4">
        <div
          className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer"
          onClick={movePaymentHistory}
        >
          <p>결제 내역</p>
          <img src={Next} className="h-[20px]" />
        </div>
        <div
          className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer"
          onClick={moveDreamHistory}
        >
          <p>꿈 내역</p>
          <img src={Next} className="h-[20px]" />
        </div>
        <div
          className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer"
          onClick={handlePreferredTeam}
        >
          <p>나의 선호구단</p>
          <img src={Next} className="h-[20px]" />
        </div>
        <div
          className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer"
          onClick={() => navigate('/profile/edit')}
        >
          <p>회원 정보 수정</p>
          <img src={Next} className="h-[20px]" />
        </div>
        <div
          className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer"
          onClick={handleOpenModal}
        >
          <p>비밀번호 변경</p>
          <img src={Next} className="h-[20px]" />
        </div>
        <div
          className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer"
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <p>로그아웃</p>
          <img src={Next} className="h-[20px]" />
        </div>
      </div>
      {isLogoutModalOpen && <LogoutModal onClose={() => setIsLogoutModalOpen(false)} />}
      {isPasswordModalOpen && <PasswordModal onClose={() => setIsPasswordModalOpen(false)}></PasswordModal>}
      <div className="text-white">
        <AnimatePresence>
          {isBottomSheetOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BottomModal height="auto" title="선호 구단" onClose={() => setIsBottomSheetOpen(false)}>
                <div className="flex flex-col items-center">
                  <div className="text-sm pb-3">
                    <p>선호 구단은 최대 3개까지 등록할 수 있습니다.</p>
                  </div>
                  <div className="flex flex-row w-full gap-2 justify-center">
                    {preferredTeams.map((team, index) => (
                      <div key={index} className="w-24 h-24 border border-none rounded-[10px] bg-[#1F1F31]">
                        <div className="flex justify-end pt-1 pr-2 text-Stickey_Gray">
                          <AiOutlineClose
                            style={{ width: '12px', height: '12px' }}
                            onClick={() => handleRemoveTeam(index)}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-center px-6">
                            <img src={team.sportsClubLogo} />
                          </div>
                          <div className="text-[10px] flex justify-center">{team.sportsClubName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="py-4 px-4">
                    <div className="border-b-[0.5px] border-b-Stickey_Gray"></div>
                  </div>
                  <div className="flex flex-row w-full justify-between px-24 text-Stickey_Gray text-sm pb-4">
                    <div
                      onClick={() => handleTabClick('SOCCER')}
                      className={`${selectedTab === 'SOCCER' ? 'text-Stickey_Main' : ''}`}
                    >
                      <p>축구</p>
                    </div>
                    <div
                      onClick={() => handleTabClick('BASEBALL')}
                      className={`${selectedTab === 'BASEBALL' ? 'text-Stickey_Main' : ''}`}
                    >
                      <p>야구</p>
                    </div>
                    <div
                      onClick={() => handleTabClick('BASKETBALL')}
                      className={`${selectedTab === 'BASKETBALL' ? 'text-Stickey_Main' : ''}`}
                    >
                      <p>농구</p>
                    </div>
                  </div>
                </div>
                <div className="h-[30vh] flex flex-col justify-center pb-12">
                  <div className="h-full  overflow-y-scroll">
                    {filteredTeams &&
                      filteredTeams.map((item, idx) => (
                        <motion.div
                          variants={variants}
                          custom={idx}
                          key={item.id}
                          className="w-full flex justify-start items-center pl-24 gap-4 pb-4"
                          onClick={() => handleClick(item.name)}
                          initial={{ opacity: 0 }}
                          animate="visible"
                        >
                          <div className="w-4 h-4 border-2 rounded-full flex cursor-pointer justify-center items-center">
                            {selectedTeam === item.name && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                          <div className="flex items-center w-12 h-12 border border-none bg-white rounded">
                            <img src={item.logo} />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm">{item.name}</p>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
                <div className="fixed flex justify-center max-w-[500px] w-full px-8 bottom-20">
                  <button className="p-2 w-40 mx-1 bg-Stickey_Main rounded-md" onClick={handleAddTeam}>
                    추가하기
                  </button>
                  <button className="p-2 w-40 mx-1 bg-Stickey_Main rounded-md" onClick={() => handlePatchData()}>
                    저장하기
                  </button>
                </div>
              </BottomModal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserMenu;
