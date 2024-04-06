import { useState } from 'react';
import { PaymentItemData } from '../../../../pages/Profile/User/PaymentHistory';
import Down from '../../../../assets/image/FilledDown.png';
import dayjs from 'dayjs';
import { toEther } from '../../../../service/web3/api';

const PaymentItem = ({ data }: { data: PaymentItemData }) => {
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpenAccordion(!isOpenAccordion);
  };
  const time = dayjs(Number(data.time) * 1000).format('YY/MM/DD HH:mm:ss');

  const bookStatus = () => {
    if (data.paymentType == 0) {
      return (
        <div className="w-[38px] h-[20px] bg-[#545454] rounded-[5px] mr-2">
          <p className="text-white text-sm text-center">예매</p>
        </div>
      );
    } else if (data.paymentType == 1) {
      return (
        <div className="w-[38px] h-[20px] bg-[#FF532D] rounded-[5px] mr-2">
          <p className="text-white text-sm text-center">환불</p>
        </div>
      );
    } else if (data.paymentType == 2) {
      return (
        <div className="w-[38px] h-[20px] bg-[#ff8569] rounded-[5px] mr-2">
          <p className="text-white text-sm text-center">반환</p>
        </div>
      );
    } else {
      return (
        <div className="w-[38px] h-[20px] bg-[#349137] rounded-[5px] mr-2">
          <p className="text-white text-sm text-center">후원</p>
        </div>
      );
    }
  };

  const headContent = () => {
    if (data.paymentType == 0) {
      return (
        <>
          {data.ticketPayment.homeTeam} VS {data.ticketPayment.awayTeam} 예매
        </>
      );
    } else if (data.paymentType == 1) {
      return (
        <>
          {data.ticketPayment.homeTeam} VS {data.ticketPayment.awayTeam} 환불
        </>
      );
    } else if (data.paymentType == 2) {
      return (
        <>
          {data.ticketPayment.homeTeam} VS {data.ticketPayment.awayTeam} 수수료 환불
        </>
      );
    } else {
      return <>{data.supportName} 후원</>;
    }
  };

  const bodyContent = () => {
    if (data.paymentType == 3) {
      return (
        <>
          <div className="flex flex-row gap-1 text-sm font-semibold">
            <p>후원한 단체 : {data.supportName}</p>
          </div>
          <div className="flex flex-row gap-1 text-sm font-semibold pb-2">
            <p>내가 남긴 말 : {data.supportText}</p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-row gap-1 text-sm font-semibold">
            <p>{data.ticketPayment.homeTeam}</p>
            <p>VS</p>
            <p>{data.ticketPayment.awayTeam}</p>
          </div>
          <div className="text-sm p-2">
            <div className="flex flex-row gap-5">
              <div className="w-[50px] text-[#969799]">장소</div>
              <div>{data.ticketPayment.stadium}</div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="w-[50px] text-[#969799]">경기시간</div>
              <div>{dayjs(Number(data.ticketPayment.gameStartTime) * 1000).format('YYYY-MM-DD HH:mm')}</div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="w-[50px] text-[#969799]">좌석정보</div>
              <div className="flex flex-col">
                {data.ticketPayment.seatNumber.map(item => (
                  <div key={item}>
                    {data.ticketPayment.zoneName} {Number(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="flex justify-center pb-2 pt-2">
        <div className="flex flex-col items-center w-full">
          <div
            className="flex flex-row items-center justify-between w-[90%] h-[32px] border border-none rounded-[5px] bg-[#2E2E3D] px-2 gap-2"
            onClick={toggleAccordion}
          >
            <div className="flex flex-row items-center">
              {bookStatus()}
              <p className="text-white text-sm">{headContent()}</p>
            </div>
            <div>
              <img
                src={Down}
                className={`w-4 h-4 transform transition-transform ${!isOpenAccordion ? 'rotate-0' : 'rotate-180'}`}
              />
            </div>
          </div>

          {isOpenAccordion && (
            <div className="w-[90%] bg-white rounded-b-[5px] p-4">
              {bodyContent()}

              <div className="pb-2">
                <div className="border-b-[0.5px] border-[#F1F2F4]"></div>
              </div>
              <div className="text-[13px] px-2">
                <div className="flex flex-row gap-5">
                  <div className="w-[50px] text-[#969799]">결제금액</div>
                  <div
                    className={`${data.paymentType == 0 || data.paymentType == 3 ? 'bg-red-300 px-1' : 'bg-green-300 px-1'} rounded-md`}
                  >
                    {data.paymentType == 0 || data.paymentType == 3 ? '-' : '+'}
                    {toEther(data.amount)} ETH
                  </div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="w-[50px] text-[#969799]">결제시간</div>
                  <div>{time.toString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentItem;
