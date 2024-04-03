import Header, { IHeaderInfo } from '../../../components/@common/Header';
import NavigationBar from '../../../components/@common/NavigationBar';
import Back from '../../../assets/image/Back.png';
import Bell from '../../../assets/image/Bell.png';
import map from '../../../assets/image/map.png';
import { useEffect, useState } from 'react';
import SponsorModal from '../../../components/Sponsor/SponsorModal';
import userStore from '../../../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSponsor } from '../../../hooks/Sponsor/useSponsor';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { connect, getSupprtedHistory, withdraw } from '../../../service/web3/api';
import Metamask from '../../../assets/image/Metamask.png';
import { AnimatePresence, motion } from 'framer-motion';

const info: IHeaderInfo = {
  left_1: null,
  left_2: <img src={Back} alt="" />,
  center: '후원',
  right: <img src={Bell} />,
};

const SponsorDetailPage = () => {
  const navigate = useNavigate();
  const { isLogin, id } = userStore();
  const params = useParams<{ id: string }>();
  const sponsorId = Number(params.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [supportedHistory, setSupportedHistory] = useState<{ amount: bigint; text: string; time: bigint }[]>();

  const handleSponsorClick = () => {
    if (isLogin) {
      setIsModalOpen(true);
    } else {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  const handleHistoryOpen = () => {
    connect().then(ret => {
      if (ret) setIsHistoryOpen(!isHistoryOpen);
    });
  };

  const { useSponsorDetail } = useSponsor();
  const { data: ISponsorDetailRes } = useSponsorDetail(sponsorId);
  const startTime = dayjs(ISponsorDetailRes?.data.startTime).format('YYYY년 MM월 DD일');
  const endTime = dayjs(ISponsorDetailRes?.data.endTime).format('YYYY년 MM월 DD일');
  const start = dayjs(ISponsorDetailRes?.data.startTime);
  const end = dayjs(ISponsorDetailRes?.data.endTime);
  const now = dayjs();
  const diffDays = end.diff(now, 'day');
  const total = end.diff(start);
  const current = now.diff(start);
  const progressPercentage = (current / total) * 100 >= 100 ? 100 : (current / total) * 100;

  useEffect(() => {
    if (!isHistoryOpen) return;
    (async () => {
      const ret = await getSupprtedHistory(sponsorId);
      if (ret) setSupportedHistory(ret);
    })();
  }, [isHistoryOpen]);

  const handleWithdraw = () => {
    (async () => {
      const tx = await withdraw(sponsorId);
      if (tx) {
        toast.success('후원금을 수령했습니다.');
      } else {
        toast.error('이미 수령한 후원이거나 후원금이 없습니다.');
      }
    })();
  };

  return (
    <>
      <div>
        <Header info={info} />
        <div className="pt-12 pb-32">
          {/* 후원글 정보 */}
          <div
            className={`w-full h-60 flex justify-center`}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${ISponsorDetailRes?.data.supportImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <img src={ISponsorDetailRes?.data.supportImage} className="h-full" />
          </div>
          <div className="p-4">
            <p className="font-bold w-24 text-[10px] px-2 py-1 bg-white border rounded-3xl text-center opacity-0">
              후원마감 D-{diffDays}
            </p>
            <p className="text-white py-2">{ISponsorDetailRes?.data.title}</p>
            <div className="w-full h-2 bg-white rounded-xl ">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="h-full bg-Stickey_Main rounded-xl transition-width duration-500"
              ></div>
            </div>
            <p className="text-white text-[10px] text-left py-2">
              {startTime} ~ {endTime}
            </p>
            <p className="text-white text-sm">{ISponsorDetailRes?.data.content}</p>
          </div>

          {/* 단체 정보 */}
          <div className="px-4">
            <div className="flex items-center">
              <p className="bg-gray-500 w-8 h-8 rounded-full">
                <img src={ISponsorDetailRes?.data.profileImage} className="bg-gray-500 w-8 h-8 rounded-full" />
              </p>
              <p className="text-white text-sm pl-2">{ISponsorDetailRes?.data.name}</p>
            </div>
            <div>
              <p className="flex text-xs text-white py-2"></p>
              <button
                className="bg-white flex justify-center w-full rounded-md py-2 text-xs"
                onClick={handleHistoryOpen}
              >
                <p>
                  <img className="w-4 mr-2" src={Metamask} />
                </p>
                <p>이 단체에 후원한 사람들</p>
              </button>

              {/* 애니메이션 넣어주세요 */}
              <AnimatePresence>
                {isHistoryOpen && (
                  <motion.div
                    className="h-auto bg-white rounded-md overflow-scroll py-4"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 150, opacity: 1, paddingTop: 8 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {supportedHistory && supportedHistory.length > 0 ? (
                      <>
                        {supportedHistory!.map(item => {
                          return (
                            <div key={item.time} className="flex px-2 items-baseline">
                              <div>
                                <p className="text-sm font-semibold">{item.text}</p>
                              </div>
                              <div className="grow flex flex-col items-end">
                                <div className="font-bold">{Number(item.amount) / 10e10}</div>
                                <div className="text-xs text-gray-500">
                                  {dayjs(Number(item.time) * 1000).format('YYYY/MM/DD HH:mm:ss')}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="text-xs text-center py-2">첫 후원입니다. 아직 내역이 없어요.</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <p className="text-xs text-white pt-4 pb-2">이 단체의 후원 유망주</p>
              <div>
                {/* 후원유망주 목록 */}
                {ISponsorDetailRes?.data.players.map(player => (
                  <div key={player.id} className="p-2">
                    <div className="bg-[#2E2E3D] flex items-center p-2 rounded-md">
                      <img src={player.profile} className="w-12 h-12 rounded-md bg-gray-300" />
                      <div className="flex flex-col px-2">
                        <div className="flex items-baseline">
                          <p className="text-white text-sm px-2">{player.name}</p>
                          <p className="text-xs text-gray-400 px-1">{player.category}</p>
                          <p className="text-xs text-gray-400 px-1">{player.birth}</p>
                        </div>
                        <p className="text-xs text-white px-2">{player.description}</p>
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
              <div className="text-xs py-4 text-white">
                <p>단체명 : {ISponsorDetailRes?.data.name}</p>
                <p>연락처 : {ISponsorDetailRes?.data.phone}</p>
                <p>담당자 : {ISponsorDetailRes?.data.manager} 담당자</p>
                <p>주소 : {ISponsorDetailRes?.data.address}</p>
                <p>이메일 : {ISponsorDetailRes?.data.email}</p>
              </div>
              <div className="flex items-center">
                <img src={map} className="h-24 w-44" />
              </div>
            </div>
          </div>
        </div>
        {/* 후원 버튼 */}
        <div className="fixed bottom-20 w-full max-w-[500px] m-auto px-4">
          {id == ISponsorDetailRes?.data.organizationId ? (
            <button
              className={`${progressPercentage >= 100 ? `bg-[#5959E7]` : `bg-Stickey_Gray`} w-full text-white rounded-md p-2 text-md`}
              onClick={handleWithdraw}
              disabled={progressPercentage < 100}
            >
              수령하기
            </button>
          ) : (
            <button
              className={`${progressPercentage < 100 ? `bg-[#5959E7]` : `bg-Stickey_Gray`} w-full text-white rounded-md p-2 text-md`}
              onClick={handleSponsorClick}
              disabled={progressPercentage >= 100}
            >
              후원하기
            </button>
          )}
        </div>

        {isModalOpen && <SponsorModal onClose={() => setIsModalOpen(false)} />}
        <NavigationBar />
      </div>
    </>
  );
};

export default SponsorDetailPage;
