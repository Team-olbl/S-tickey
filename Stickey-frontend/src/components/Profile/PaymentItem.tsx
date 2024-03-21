import { useState } from "react";
import { PaymentItemData } from "../../pages/Profile/Personal/Payment/PaymentHistory";
import Down from '../../assets/image/FilledDown.png'

const PaymentItem = ({ data }: { data: PaymentItemData }) => {
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpenAccordion(!isOpenAccordion);
  };

  return (
    <div className="flex justify-center pb-2">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between w-[312px] h-[32px] border border-none rounded-[5px] bg-[#2E2E3D] px-2 gap-2">
          <div className="flex flex-row items-center">
            {data.booking_info.book_status ? (
              <div className="w-[36px] h-[18px] bg-[#545454] rounded-[5px] mr-2">
                <p className="text-white text-[12px] text-center">예매</p>
              </div>
            ):(
              <div className="w-[36px] h-[18px] bg-[#FF532D] rounded-[5px] mr-2">
                <p className="text-white text-[12px] text-center">환불</p>
              </div>
            )}
            <p className="text-white text-[12px]">
              [하나원큐] K League1 2024
            </p>
          </div>
          <div onClick={toggleAccordion}>
            <img
              src={Down}
              className={`w-4 h-4 transform transition-transform ${
                isOpenAccordion ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
        </div>
        {isOpenAccordion && (
          <div className="w-[312px] bg-white rounded-b-[5px] p-2">
            <div className="flex flex-row gap-1 text-[12px] font-semibold">
              <p>{data.game_info.home_team}</p>
              <p>VS</p>
              <p>{data.game_info.away_team}</p>
            </div>
            <div className="text-[10px] p-2">
              <div className="flex flex-row gap-5">
                <div className="w-[50px] text-[#969799]">예매번호</div>
                <div>{data.booking_info.book_number}</div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="w-[50px] text-[#969799]">관람일시</div>
                <div>{data.game_info.game_start_time}</div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="w-[50px] text-[#969799]">예매일</div>
                <div>{data.booking_info.book_date}</div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="w-[50px] text-[#969799]">장소</div>
                <div>{data.game_info.stadium_name}</div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="w-[50px] text-[#969799]">좌석정보</div>
                <div className="flex flex-col">
                  {data.ticket_info.seats.map((seat, index) => (
                    <div key={index}>
                      {seat.row}열 {seat.col}번
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b-[0.5px] border-[#F1F2F4] "></div>
            <div className="text-[10px] px-2">
              <div className="flex flex-row gap-5">
                <div className="w-[50px] text-[#969799]">결제금액</div>
                <div>{data.payment_info.total_price}</div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="w-[50px] text-[#969799]">취소기한</div>
                <div>{data.booking_info.cancel_deadline}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentItem;
