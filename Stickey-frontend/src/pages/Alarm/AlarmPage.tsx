import AlarmItem from "../../components/Alarm/AlarmItem";
import Letter from '../../assets/image/Letter.png'
import Header, { IHeaderInfo } from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import Back from '../../assets/image/Back.png'
import useNotifyReadStore from "../../stores/useNotifyReadStore";
import useNotifyStore from "../../stores/useNotifyStore";
import { useEffect } from "react";

const info : IHeaderInfo = {
  left_1:  null,
  left_2: <img src={Back} alt="" />,
  center:'',
  right: null,
}

const AlarmPage = () => {

  const { setIsRead } = useNotifyReadStore();
  const { notifyList } = useNotifyStore();

  useEffect(() => {
    setIsRead();
  }, []);


  return(
    <>
    <Header info={info} />
    <div className="pt-16">
      {notifyList.length === 0 ? (
        <div className="flex flex-col items-center mt-40">
          <img src={Letter} className="h-20" />
        <p className=" text-white text-sm mt-4">알림이 없습니다</p>
        </div>
      ) : (
        notifyList.map((item, index) => (
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