import { useNavigate } from "react-router-dom";
import useTicketStore from "../../stores/useTicketStore";
import NotSoldModal from "./NotSoldModal";
import {  useEffect, useState } from "react";
import { useBook } from "../../hooks/Book/useBook";
import { useTicketInfoStore } from "../../stores/useTicketInfoStore";
import { toast } from "react-toastify";

const BookSeat = () => {
    const navigate = useNavigate();
    const { seatInfo, setSelectInfo } = useTicketStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const gameInfo = useTicketInfoStore((state) => state.modalData);
    const { useSeatInfoCnt, useSeatconfirm } = useBook();
    const { data: seatInfoCnt, refetch: refetchSeatInfoCnt, isError, fetchStatus } = useSeatInfoCnt({id : gameInfo?.id || 0, zoneId: seatInfo.sectionId})
    const { data: seatConfirmCheck, isSuccess , mutate } = useSeatconfirm({id : gameInfo?.id || 0, zoneId: seatInfo.sectionId, info: seatInfo.seat})

    useEffect(() => {
        if (isError && fetchStatus === 'idle') {
            toast.error("예매 가능 시간이 초과되었습니다.");
            navigate("/home")
        }
    }, [fetchStatus])


    
    useEffect(() => {
        if (isModalOpen) {
            setSelectInfo(seatInfo.section, seatInfo.sectionId, seatInfo.sectionPrice, []);
            refetchSeatInfoCnt();
        }
    }, [isModalOpen, refetchSeatInfoCnt, setSelectInfo, seatInfo.section, seatInfo.sectionId, seatInfo.sectionPrice]);

  useEffect(() => {
    if (!isSuccess) return;
    if (seatConfirmCheck?.message !== '이미 선택된 좌석입니다.') {
      navigate(`/${gameInfo?.id}/payment`, { replace: true });
    } else {
      setIsModalOpen(true);
    }
  }, [isSuccess]);

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
        return '#FFFFFF'; // 기본 색상
    }
  };

  const handleSeatClick = (seat: number) => {
    if (seatInfo.seat.length >= 4 && !seatInfo.seat.includes(seat)) {
      return;
    }
    const newSelectedSeats = seatInfo.seat.includes(seat)
      ? seatInfo.seat.filter(s => s !== seat)
      : [...seatInfo.seat, seat];

    setSelectInfo(seatInfo.section, seatInfo.sectionId, seatInfo.sectionPrice, newSelectedSeats);
  };

  const calculateTotalPrice = () => {
    const pricePerSeat = seatInfo.sectionPrice;
    return seatInfo.seat.length * pricePerSeat;
  };

  const goBack = () => {
    setSelectInfo(seatInfo.section, seatInfo.sectionId, seatInfo.sectionPrice, []);
    navigate(`/${gameInfo?.id}/section`, { replace: true });
  };

  const goPayment = () => {
    if (seatInfo.seat.length > 0) {
      mutate();
    }
  };

  return (
    <>
      <div className="pt-4">
        {/* 좌석 */}
        <div className="bg-Stickey_Gray w-full h-[260px] flex flex-col flex-wrap justify-center items-center">
          <p className="text-xs text-gray-800">경기장 방향</p>
          <div className="py-2 grid grid-cols-6 gap-1">
            {seatInfoCnt?.data &&
              seatInfoCnt.data.map((seat, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${
                    seat.status[0] === 'S' || seat.status[0] === 'H' ? 'bg-black/50' : 'bg-Stickey_Main'
                  }
                                    ${seatInfo.seat.includes(seat.seatNumber) && 'border-8 border-[#262626]'}
                                    
                                `}
                  onClick={() => {
                    if (seat.status === 'AVAILABLE') {
                      handleSeatClick(seat.seatNumber);
                    }
                  }}
                ></div>
              ))}
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
                  <span className="size-5 rounded-full bg-Stickey_Main border-2 border-Stickey_Main text-center text-xs">
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
                <div
                  className={`h-2 w-6 mr-2 rounded-md`}
                  style={{ backgroundColor: getSeatColor(seatInfo.section) }}
                />
                <div className="text-white text-sm">{seatInfo.section}</div>
              </div>
            </div>

            <div className="items-center grid grid-cols-4 py-3">
              <p className="col-span-1 text-xs text-gray-200">좌석선택</p>
              <div className="col-span-3 flex items-center h-12">
                {/* 선택한 좌석들을 출력 */}
                {seatInfo.seat.map((seat, index) => (
                  <div className="w-6 h-6 text-sm text-white bg-purple-700 text-center rounded-md m-1" key={index}>
                    {seat}{' '}
                  </div>
                ))}
              </div>
            </div>

            <div className="items-center grid grid-cols-4 py-3">
              <p className="col-span-1 text-xs text-gray-200">결제가격</p>
              <div className="col-span-3 text-white">{calculateTotalPrice()}원</div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="w-full max-w-[500px] px-4 pt-4 pb-24 flex justify-center">
            <button className="bg-Stickey_Gray w-36 mr-2 p-2 text-xs rounded-md" onClick={() => goBack()}>
              이전
            </button>
            <button className="bg-Stickey_Gray w-36 p-2 text-xs rounded-md" onClick={() => goPayment()}>
              다음
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <NotSoldModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default BookSeat;
