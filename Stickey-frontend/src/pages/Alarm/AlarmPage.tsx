import AlarmItem from "../../components/Alarm/AlarmItem";
import Letter from '../../assets/Alarm/Letter.png'
import Header, { IHeaderInfo } from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import Back from '../../assets/@common/Back.png'

export type AlarmItemData = {
  title: string;
  message: string;
  time: string;
};

const info : IHeaderInfo = {
  left: <img src={Back} alt="" />,
  center:'',
  right: <img src="src/assets/Alarm/Bell.png" alt="" />
}

const AlarmPage = () => {

  const dummyList: AlarmItemData[] = [
    {
      title: '예매 알림',
      message: '예매가 완료되었습니다.',
      time: '10분전',
    },
    {
      title: '후원 알림',
      message: '후원글 승인이 거절되었습니다.',
      time: '15분전',
    },
    {
      title: '경기 알림',
      message: '경기 정보가 업데이트 되었습니다.',
      time: '20분전',
    },
  ];

  return(
    <>
    <Header info={info} />
    <div className="pt-16">
      {dummyList.length === 0 ? (
        <div className="flex flex-col items-center mt-40">
          <img src={Letter} className="h-20" />
        <p className=" text-white text-sm mt-4">알림이 없습니다</p>
        </div>
      ) : (
        dummyList.map((item, index) => (
          <AlarmItem key={index} data={item} />
        ))
      )}
    </div>
    <div className="fixed bottom-0">
    </div>
    <NavigationBar />
  </>
  )
}

export default AlarmPage;