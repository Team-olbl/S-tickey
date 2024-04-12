import { useEffect, useState } from 'react';
import fingerPrint from '../../assets/image/fingerprint.png';
import { getWalletInfo, isShow, showBalance } from '../../service/web3/api';
import { motion } from 'framer-motion';

const Wallet = () => {
  const [flag, setFlag] = useState(isShow);
  const [balance, setBalance] = useState(null);
  const [reword, setReword] = useState(0);

  useEffect(() => {
    if (flag) {
      (async () => {
        const res = await getWalletInfo();
        setBalance(res?.balance.substr(0, 7));
        setReword(res?.dream / 10e12);
      })();
    }
  }, [flag]);

  const handelShow = () => {
    showBalance();
    setFlag(true);
  };

  return (
    <div>
      <div>
        {!isShow ? (
          <div className="flex justify-evenly items-center p-4 rounded-md border-Stickey_Gray border">
            {/* 지갑 */}
            <div className="flex flex-col items-center" onClick={handelShow}>
              <img className="w-8 pb-2" src={fingerPrint} />
              <p className="text-xs text-Stickey_Main">지갑을 열어서 잔액을 확인해보세요</p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-md border-Stickey_Gray border">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-evenly items-center">
              <div className="flex flex-col items-center">
                <p className="font-bold text-Stickey_Main">나의 지갑</p>
                <p className="text-xl font-bold text-white pt-1">{balance} ETH</p>
              </div>
              <div className="text-Stickey_Gray">|</div>
              {/* 꿈 */}
              <div className="flex flex-col items-center">
                <p className="font-bold text-Stickey_Main">나의 꿈</p>
                <p className="text-xl font-bold text-white pt-1">{reword}</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
