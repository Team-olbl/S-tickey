import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'
import Bell from '../../../assets/image/Bell.png'
import DreamItem from "../../../components/Profile/User/Dream/DreamItem";
import DreamHeader from "../../../components/Profile/User/Dream/DreamHeader";
import { useEffect, useState } from "react";
import { connect, getRewordHistory } from "../../../service/web3/api";

const info : IHeaderInfo = {
  left_1:  null,
  left_2: <img src={Back} alt="" />,
  center:'꿈 내역',
  right: <img src={Bell} />
}

export type DreamItemData = {
  rewordType: number;
  amount: bigint;
  balance: bigint;
  time: bigint;
}

const DreamHistoryPage = () => {
  
  const [dreamHistroy, setDreamHistory] = useState<DreamItemData[]>([]);

  useEffect(() => {
    async function getData() {
      await connect();
      const data = await getRewordHistory();
      setDreamHistory(data);
    }
    getData();
  }, []);

  return (
    <>
      <Header info={info}/>
      <div className="pt-12 pb-16">
        <DreamHeader />
        {dreamHistroy.map((item, idx) => (
          <DreamItem key={idx} data={item} />
        ))}
      </div>
      <NavigationBar />
    </>
  );
};

export default DreamHistoryPage;
