import SOCCER from '../../assets/image/Ground/SoccerGround.png';
import BASEBALL from '../../assets/image/Ground/BaseballGround.png';
import BASKETBALL from '../../assets/image/Ground/BasketballGround.png';
import { useNavigate, useParams } from 'react-router-dom';
import useTicketStore from '../../stores/useTicketStore';
import { useBook } from '../../hooks/Book/useBook';
import { useTicketInfoStore } from '../../stores/useTicketInfoStore';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const BookSection = () => {
  const { seatInfo, setSelectInfo } = useTicketStore();
  const navigate = useNavigate();
  const gameInfo = useTicketInfoStore(state => state.modalData);
  const { id } = useParams<{ id: string }>();
  const intId = Number(id);
  const { useSectionSeatCnt } = useBook();
  const { data: seatCntInfo, isError, fetchStatus } = useSectionSeatCnt(intId);

  useEffect(() => {
    if (isError && fetchStatus === 'idle') {
      toast.error('예매 가능 시간이 초과되었습니다.');
      navigate('/home');
    }
  }, [fetchStatus]);

  const getSeatColor = (seat: string): string => {
    switch (seat) {
      case 'S구역 1':
      case 'S구역 2':
        return '#FEACAC';
      case 'R구역 1':
      case 'R구역 2':
      case 'R구역 3':
      case 'R구역 4':
        return '#D2C2FF';
      case 'W구역 1':
      case 'W구역 2':
        return '#FAF8B7';
      case 'E구역 1':
      case 'E구역 2':
      case 'E구역 3':
      case 'E구역 4':
        return '#C3E7FF';
      default:
        return '#FFFFFF';
    }
  };

  const handleSeatClick = (seat: string, sectionId: number, sectionPrice: number) => {
    setSelectInfo(seat, sectionId, sectionPrice, []);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goNext = () => {
    if (seatInfo.section !== '') {
      navigate(`/${gameInfo?.id}/seat`, { replace: true });
    }
  };

  return (
    <div className="pt-4">
      <div className="flex flex-col items-center">
        <div className="flex px-1">
          <div
            className={`bg-[#FEACAC] flex justify-center items-center h-8 w-20 mr-1 ${seatInfo.section === 'S구역 1' ? 'opacity-100' : 'opacity-50'}`}
            onClick={
              seatCntInfo && seatCntInfo.data.leftSeatResList[0].leftSeatCnt !== 0
                ? () => handleSeatClick('S구역 1', 1, 20000)
                : undefined
            }
          >
            <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[0].leftSeatCnt}</p>
          </div>
          <div
            className={`bg-[#FEACAC] flex justify-center items-center h-8 w-20 ${seatInfo.section === 'S구역 2' ? 'opacity-100' : 'opacity-50'}`}
            onClick={
              seatCntInfo && seatCntInfo.data.leftSeatResList[1].leftSeatCnt !== 0
                ? () => handleSeatClick('S구역 2', 2, 20000)
                : undefined
            }
          >
            <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[1].leftSeatCnt}</p>
          </div>
        </div>

        <div className="flex p-1">
          <div className="flex px-1">
            <div
              className={`bg-[#D2C2FF] flex justify-center items-center w-8 h-24 mr-1 ${seatInfo.section === 'R구역 1' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[2].leftSeatCnt !== 0
                  ? () => handleSeatClick('R구역 1', 3, 15000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[2].leftSeatCnt}</p>
            </div>
            <div
              className={`bg-[#D2C2FF] flex justify-center items-center w-8 h-24 ${seatInfo.section === 'R구역 2' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[3].leftSeatCnt !== 0
                  ? () => handleSeatClick('R구역 2', 4, 15000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[3].leftSeatCnt}</p>
            </div>
          </div>
          <div className="flex">
            {gameInfo?.category === 'SOCCER' && <img className="h-24 w-40" src={SOCCER} />}
            {gameInfo?.category === 'BASEBALL' && <img className="h-24 w-40" src={BASEBALL} />}
            {gameInfo?.category === 'BASKETBALL' && <img className="h-24 w-40" src={BASKETBALL} />}
          </div>
          <div className="flex px-1">
            <div
              className={`bg-[#D2C2FF] flex justify-center items-center w-8 h-24 ${seatInfo.section === 'R구역 3' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[4].leftSeatCnt !== 0
                  ? () => handleSeatClick('R구역 3', 5, 15000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[4].leftSeatCnt}</p>
            </div>
            <div
              className={`bg-[#D2C2FF] flex justify-center items-center w-8 h-24 ml-1 ${seatInfo.section === 'R구역 4' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[5].leftSeatCnt !== 0
                  ? () => handleSeatClick('R구역 4', 6, 15000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[5].leftSeatCnt}</p>
            </div>
          </div>
        </div>

        <div className="flex px-1">
          <div className="px-1">
            <div
              className={`bg-[#FAF8B7] flex justify-center items-center w-16 h-12 rounded-bl-full ${seatInfo.section === 'W구역 1' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[6].leftSeatCnt !== 0
                  ? () => handleSeatClick('W구역 1', 7, 10000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[6].leftSeatCnt}</p>
            </div>
          </div>

          <div>
            <div
              className={`bg-[#C3E7FF] flex justify-center items-center h-6 w-20 mr-1 ${seatInfo.section === 'E구역 1' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[8].leftSeatCnt !== 0
                  ? () => handleSeatClick('E구역 1', 9, 10000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[8].leftSeatCnt}</p>
            </div>
            <div
              className={`bg-[#C3E7FF] flex justify-center items-center h-6 w-20 mt-1 ${seatInfo.section === 'E구역 3' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[10].leftSeatCnt !== 0
                  ? () => handleSeatClick('E구역 3', 11, 10000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[10].leftSeatCnt}</p>
            </div>
          </div>
          <div>
            <div
              className={`bg-[#C3E7FF] flex justify-center items-center h-6 w-20 ${seatInfo.section === 'E구역 2' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[9].leftSeatCnt !== 0
                  ? () => handleSeatClick('E구역 2', 10, 10000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[9].leftSeatCnt}</p>
            </div>
            <div
              className={`bg-[#C3E7FF] flex justify-center items-center h-6 w-20 mt-1 ${seatInfo.section === 'E구역 4' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[11].leftSeatCnt !== 0
                  ? () => handleSeatClick('E구역 4', 12, 10000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[11].leftSeatCnt}</p>
            </div>
          </div>
          <div className="px-1">
            <div
              className={`bg-[#FAF8B7] flex justify-center items-center w-16 h-12 rounded-br-full ${seatInfo.section === 'W구역 2' ? 'opacity-100' : 'opacity-50'}`}
              onClick={
                seatCntInfo && seatCntInfo.data.leftSeatResList[7].leftSeatCnt !== 0
                  ? () => handleSeatClick('W구역 2', 8, 10000)
                  : undefined
              }
            >
              <p className="font-semibold text-sm">{seatCntInfo?.data.leftSeatResList[7].leftSeatCnt}</p>
            </div>
          </div>
        </div>

        {/* 좌석 구역 정보 */}
        <div className="py-4">
          <div className="flex">
            <div className="flex items-center">
              <div className="h-2 w-6 bg-[#FEACAC]" />
              <p className="px-1 text-[10px] text-white">S구역 : {seatCntInfo?.data.leftSeatResList[0].price}</p>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-6 bg-[#D2C2FF]" />
              <p className="px-1 text-[10px] text-white">R구역 : {seatCntInfo?.data.leftSeatResList[2].price}</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center">
              <div className="h-2 w-6 bg-[#C3E7FF]" />
              <p className="px-1 text-[10px] text-white">E구역 : {seatCntInfo?.data.leftSeatResList[6].price}</p>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-6 bg-[#FAF8B7]" />
              <p className="px-1 text-[10px] text-white">W구역 : {seatCntInfo?.data.leftSeatResList[8].price}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 max-w-[500px] w-full h-auto flex flex-col items-center bg-[#2E2E3D] rounded-t-xl">
        {/* 스텝바 */}
        <div className="pt-2 w-[150px]">
          <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
            <ol className="relative z-10 flex justify-between">
              <li className="flex items-center">
                <span className="size-5 rounded-full bg-Stickey_Main border-2 border-Stickey_Main text-center text-xs">
                  {' '}
                  1{' '}
                </span>
              </li>
              <li className="flex items-center p-2">
                <span className="size-5 rounded-full bg-gray-100 border-2 border-Stickey_Gray text-center text-xs">
                  {' '}
                  2{' '}
                </span>
              </li>
              <li className="flex items-center">
                <span className="size-5 rounded-full bg-gray-100 border-2 border-Stickey_Gray text-center text-xs">
                  {' '}
                  3{' '}
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* 사용자 정보 */}
        <div className="w-full px-16">
          <div className="items-center grid grid-cols-4 py-3">
            <p className="col-span-1 text-xs text-gray-200">좌석등급</p>
            <div className="col-span-3 flex items-center">
              <div className={`h-2 w-6 mr-2 rounded-md`} style={{ backgroundColor: getSeatColor(seatInfo.section) }} />
              <div className="text-white text-sm">{seatInfo.section}</div>
            </div>
          </div>

          <div className="items-center grid grid-cols-4 py-3">
            <p className="col-span-1 text-xs text-gray-200">좌석선택</p>
            <div className="col-span-3"></div>
          </div>
          <div className="items-center grid grid-cols-4 h-12 py-3">
            <p className="col-span-1 text-xs text-gray-200">결제가격</p>
            <div className="col-span-3"></div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="w-full max-w-[500px] px-4 pt-4 pb-24 flex justify-center">
          <button className="bg-Stickey_Gray w-36 mr-2 p-2 text-xs rounded-md" onClick={() => goBack()}>
            이전
          </button>
          <button
            className={`bg-Stickey_Gray w-36 p-2 text-xs rounded-md ${seatInfo.section ? '' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => goNext()}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSection;
