import { DreamItemData } from "../../pages/Profile/Personal/Dream/DreamHistoryPage";

interface DreamItemProps {
  data: DreamItemData;
}



const DreamItem = ({ data }: DreamItemProps) => { 
  const getColor = (type: string): string => {
    switch (type) {
      case '티켓':
        return '#8989FF';
      case '아이템':
      case '후원':
        return '#2F9E65';
      default:
        return '';
    }
  }

  return (
    <>
      <div className="w-full px-[30px] flex flex-row justify-between pb-4">
        <div className="flex flex-col text-[8px] text-white mr-8">
          <div className="font-bold">{data.date}</div>
          <div>{data.time}</div>
        </div>
        <div className="relative mr-8">
          <div className="absolute w-[9px] h-[9px] border-none rounded-full my-[2px]" style={{ backgroundColor: getColor(data.type) }}></div>
          <div className="absolute h-[48px] border-l ml-1 mt-[3px]" style={{ borderColor: getColor(data.type) }}></div>
        </div>
        <div className="flex-grow">
          <div className="text-white text-[12px]">{data.content}</div>
        </div>
        <div className="text-[12px] text-right text-white">
          <div>{data.rewardChange}</div>
          <div className="text-[8px]">잔액 {data.totalReward}</div>
        </div>
      </div>
    </>
  );
};

export default DreamItem;
