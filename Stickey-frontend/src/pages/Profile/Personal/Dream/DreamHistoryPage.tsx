import Header, { IHeaderInfo } from "../../../../components/@common/Header";
import NavigationBar from "../../../../components/@common/NavigationBar";
import Back from '../../../../assets/image/Back.png'
import DreamItem from "../../../../components/Profile/DreamItem";
import DreamHeader from "../../../../components/Profile/DreamHeader";

const info : IHeaderInfo = {
  left_1:  null,
  left_2: <img src={Back} alt="" />,
  center:'꿈 내역',
  right: <img src="src/assets/Alarm/Bell.png" />
}

export type DreamItemData = {
  date: string;
  time: string;
  content: string;
  rewardChange: number;
  totalReward: number;
  type: string;
}

const DreamHistoryPage = () => {

  const dummies: DreamItemData[] = [
    {
      date: "2023. 1. 09",
      time: "12:17:45",
      content: "삼성 라이온즈 티켓 구매",
      rewardChange: +20,
      totalReward: 20,
      type: '티켓'
    },
    {
      date: "2023. 1. 10",
      time: "15:42:30",
      content: "아이템 구매",
      rewardChange: -10,
      totalReward: 10,
      type: '아이템'
    },
    {
      date: "2023. 1. 11",
      time: "09:11:25",
      content: "꿈나무 후원",
      rewardChange: -10,
      totalReward: 0,
      type: '후원'
    }
  ];

  return (
    <>
      <Header info={info}/>
      <div className="pt-12">
        <DreamHeader />
        {dummies.map((item, id) => (
          <DreamItem key={id} data={item} />
        ))}
      </div>
      <NavigationBar />
    </>
  );
};

export default DreamHistoryPage;
