import Header, { IHeaderInfo } from '../../../components/@common/Header';
import NavigationBar from '../../../components/@common/NavigationBar';
import Back from '../../../assets/image/Back.png';
import Bell from '../../../assets/image/Bell.png';
import map from '../../../assets/image/map.png';
import { useState } from 'react';
import SponsorModal from '../../../components/Sponsor/SponsorModal';
import userStore from '../../../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSponsor } from '../../../hooks/Sponsor/useSponsor';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const info: IHeaderInfo = {
  left_1: null,
  left_2: <img src={Back} alt="" />,
  center: '후원',
  right: <img src={Bell} />,
};

const SponsorDetailPage = () => {
  const navigate = useNavigate();
  const { isLogin } = userStore();

  const params = useParams<{ id: string }>();
  const sponsorId = Number(params.id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSponsorClick = () => {
    if (isLogin) {
      setIsModalOpen(true);
    } else {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  const { useSponsorDetail } = useSponsor();
  const { data: ISponsorDetailRes } = useSponsorDetail(sponsorId);
  console.log(ISponsorDetailRes);

  const startTime = dayjs(ISponsorDetailRes?.data.startTime).format('YYYY년 MM월 DD일');
  const endTime = dayjs(ISponsorDetailRes?.data.endTime).format('YYYY년 MM월 DD일');

  const end = dayjs(ISponsorDetailRes?.data.endTime);
  const now = dayjs();
  const diffDays = end.diff(now, 'day');

  return (
    <>
      <div>
        <Header info={info} />
        <div className="pt-12 pb-32">
          {/* 후원글 정보 */}
          <div className="bg-gray-300 h-60">
            <img src={ISponsorDetailRes?.data.supportImage} className="bg-gray-300 h-60" />
          </div>
          <div className="p-4">
            <p className="font-bold w-24 text-[10px] px-2 py-1 bg-white border rounded-3xl text-center">
              후원마감 D-{diffDays}
            </p>
            <p className="text-white py-2">{ISponsorDetailRes?.data.title}</p>
            <div className="w-full h-2 bg-white rounded-xl "></div>
            <p className="text-white text-[10px] text-left py-2">
              {startTime} ~ {endTime}
            </p>
            <p className="text-white text-sm">{ISponsorDetailRes?.data.content}</p>
          </div>

          {/* 단체 정보 */}
          <div className="px-4">
            <div className="flex items-center">
              <p className="bg-gray-500 w-6 h-6 rounded-full">
                <img src={ISponsorDetailRes?.data.profileImage} className="bg-gray-500 w-6 h-6 rounded-full" />
              </p>
              <p className="text-white text-sm pl-2">{ISponsorDetailRes?.data.name}</p>
            </div>
            <div>
              <p className="text-xs text-white py-2">후원금 사용내역 보기</p>
              <button className="bg-white w-full rounded-md py-2 text-xs">사용내역 보기</button>
            </div>
            <div>
              <p className="text-xs text-white py-2">후원 유망주</p>
              <div className="grid grid-cols-2">
                {/* 후원유망주 목록 */}
                {ISponsorDetailRes?.data.players.map(player => (
                  <div key={player.id} className="p-1">
                    <div className="bg-[#2E2E3D] flex items-center p-2 rounded-md">
                      <p className="w-12 h-12 rounded-md bg-gray-300">
                        <img src={player.profile} className="w-12 h-12 rounded-md bg-gray-300" />
                      </p>
                      <div className="px-2">
                        <p className="text-white text-xs">{player.name}</p>
                        <p className="text-[8px] text-gray-400">{player.birth}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="px-4">
            <p className="text-xs text-white py-2">기본 정보</p>
            <div className="bg-[#2E2E3D] flex px-4 rounded-md justify-between">
              <div className="text-[10px] py-4 text-white">
                <p>{ISponsorDetailRes?.data.name}</p>
                <p>{ISponsorDetailRes?.data.phone}</p>
                <p>{ISponsorDetailRes?.data.manager} 담당자</p>
                <p>{ISponsorDetailRes?.data.address}</p>
                <p>{ISponsorDetailRes?.data.email}</p>
              </div>
              <div className="flex items-center">
                <img src={map} className="h-20" />
              </div>
            </div>
          </div>
        </div>
        {/* 후원 버튼 */}
        <div className="fixed bottom-16 w-full max-w-[500px] m-auto px-4">
          <button className="bg-[#5959E7] w-full text-white rounded-xl p-2 text-md" onClick={handleSponsorClick}>
            후원하기
          </button>
        </div>

        {isModalOpen && <SponsorModal onClose={() => setIsModalOpen(false)} />}
        <NavigationBar />
      </div>
    </>
  );
};

export default SponsorDetailPage;
