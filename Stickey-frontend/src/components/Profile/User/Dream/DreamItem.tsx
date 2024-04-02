import dayjs from 'dayjs';
import { DreamItemData } from '../../../../pages/Profile/User/DreamHistoryPage';

interface DreamItemProps {
  data: DreamItemData;
}

const DreamItem = ({ data }: DreamItemProps) => {
  const getColor = (): string => {
    switch (Number(data.rewordType)) {
      case 0:
        return '#8989FF';
      case 1:
      case 2:
        return '#2F9E65';
      default:
        return '';
    }
  };

  const content = () => {
    switch (Number(data.rewordType)) {
      case 0:
        return '티켓 예매';
      case 1:
        return '티켓 환불';
      case 2:
        return '아이템 구매';
      default:
        return '';
    }
  };

  const date = dayjs(Number(data.time) * 1000).format('YYYY.MM.DD');
  const time = dayjs(Number(data.time) * 1000).format('HH:mm:ss');

  return (
    <>
      <div className="w-full px-[30px] flex flex-row justify-between pb-4">
        <div className="flex flex-col text-[8px] text-white mr-8">
          <div className="font-bold">{date}</div>
          <div>{time}</div>
        </div>
        <div className="relative mr-8">
          <div
            className="absolute w-[9px] h-[9px] border-none rounded-full my-[2px]"
            style={{ backgroundColor: getColor() }}
          ></div>
          <div className="absolute h-[48px] border-l ml-1 mt-[3px]" style={{ borderColor: getColor() }}></div>
        </div>
        <div className="flex-grow">
          <div className="text-white text-[12px]">{content()}</div>
        </div>
        <div className="text-[12px] text-right text-white">
          <div>{Number(data.amount) / 10e12}</div>
          <div className="text-[8px]">남은 꿈 {Number(data.balance) / 10e12}</div>
        </div>
      </div>
    </>
  );
};

export default DreamItem;
