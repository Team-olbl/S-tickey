import { useNavigate } from "react-router-dom";
import Next from '../../assets/image/Next.png';

const Menu = () => {
  const navigate = useNavigate();

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
      <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => navigate('/profile/preferredteam')}>
        <p>나의 선호구단</p>
        <img src={Next} className="h-[20px]"/>
      </div>
      <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer" onClick={() => navigate('/profile/edit')}>
        <p>회원 정보 수정</p>
        <img src={Next} className="h-[20px]"/>
      </div>
      <div className="flex flex-row items-center justify-between h-[40px] text-white px-4 cursor-pointer">
        <p>로그아웃</p>
        <img src={Next} className="h-[20px]"/>
      </div>
    </div>
  )
}

export default Menu;