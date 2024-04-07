import Header, { IHeaderInfo } from '../../../components/@common/Header';
import NavigationBar from '../../../components/@common/NavigationBar';
import Back from '../../../assets/image/Back.png';
import Bell from '../../../assets/image/Bell.png';
import DreamItem from '../../../components/Profile/User/Dream/DreamItem';
import DreamHeader from '../../../components/Profile/User/Dream/DreamHeader';
import { useEffect, useState } from 'react';
import { connect, getRewordHistory } from '../../../service/web3/api';
import { motion } from 'framer-motion';
import useSpinner from "../../../stores/useSpinner";

const info: IHeaderInfo = {
  left_1: null,
  left_2: <img src={Back} alt="" />,
  center: '꿈 내역',
  right: <img src={Bell} />,
};

export type DreamItemData = {
  rewordType: number;
  amount: bigint;
  balance: bigint;
  time: bigint;
};

const DreamHistoryPage = () => {
  const [dreamHistroy, setDreamHistory] = useState<DreamItemData[]>([]);
  const { setIsLoading, unSetIsLoading } = useSpinner();

  useEffect(() => {
    async function getData() {
      setIsLoading();
      await connect();
      const data: DreamItemData[] | undefined = await getRewordHistory();
      if (data) setDreamHistory(data);
      unSetIsLoading();
    }
    getData();
  }, []);

  const variants = {
    visible: (custom: number) => ({
      opacity: 1,
      transition: { delay: custom * 0.1 },
    }),
  };

  return (
    <>
      <Header info={info} />
      <div className="pt-12 pb-16">
        <DreamHeader />
        {dreamHistroy.length > 0 ? (
          dreamHistroy.map((item, idx) => (
            <motion.div variants={variants} initial={{ opacity: 0 }} animate="visible" custom={idx} key={idx}>
              <DreamItem data={item} />
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center mt-40">
            <p className=" text-white text-sm mt-4">아직 기록이 없어요!</p>
          </div>
        )}
      </div>
      <NavigationBar />
    </>
  );
};

export default DreamHistoryPage;
