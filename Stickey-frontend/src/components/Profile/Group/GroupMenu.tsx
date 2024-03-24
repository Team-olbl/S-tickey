import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Next from '../../../assets/image/Next.png'
import LogoutModal from '../../Login/LogoutModal';

const GroupMenu = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-[500px] w-full h-[208px] mt-4 border-t-[0.5px]">
        <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => navigate('/profile/playerlist')}>
          <p>선수 조회 / 수정</p>
          <img src={Next} className="h-[20px]"/>
        </div>
        <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => navigate('/profile/sponlist')}>
          <p>후원글 내역</p>
          <img src={Next} className="h-[20px]"/>
        </div>
        <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => navigate('/profile/group/edit')}>
          <p>단체 정보 수정</p>
          <img src={Next} className="h-[20px]"/>
        </div>
        <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => setIsLogoutModalOpen(true)} >
          <p>로그아웃</p>
          <img src={Next} className="h-[20px]"/>
        </div>
      </div>
      {isLogoutModalOpen && <LogoutModal onClose={() => setIsLogoutModalOpen(false)}/>}
    </>
  )
}

export default GroupMenu;