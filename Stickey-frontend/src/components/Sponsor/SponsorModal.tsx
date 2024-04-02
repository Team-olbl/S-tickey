import Modal from '../@common/Modal';
import Dove from '../../assets/image/Dove.png';
import { useEffect, useRef, useState } from 'react';
import { getBalance, donate } from '../../service/web3/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const SponsorModal = ({ onClose }: { onClose: () => void }) => {
  const params = useParams<{ id: string }>();
  const sponsorId = Number(params.id);

  const [balance, setBalance] = useState<number>(0);
  const messageRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    (async () => {
      const val = Math.floor(Number(await getBalance()) / 10e10);
      setBalance(val);
    })();
  }, []);

  const handleDonate = () => {
    if (!amountRef.current || Number(amountRef.current?.value) <= 0) {
      toast.warn('후원 금액이 잘못되었어요');
      return;
    }

    const message = messageRef.current?.value || '';
    const amount = Number(amountRef.current.value) * 10e10;

    (async () => {
      const tx = await donate(sponsorId, message, amount);

      if (tx) {
        toast.success('후원되었어요!');
        onClose();
      } else {
        toast.error('후원이 실패했어요..');
      }
    })();
  };

  return (
    <Modal width="340px" height="auto" title="후원하기" onClose={onClose}>
      <div className="text-center px-4 pb-6">
        <div className="flex flex-col justify-center items-center py-2">
          <img className="w-12 pb-2" src={Dove} />
          <input
            type="number"
            className="w-[80%] p-2 border rounded-md text-sm outline-none"
            placeholder="후원 금액을 입력해주세요"
            ref={amountRef}
          />
          <p className="text-xs pt-1 text-gray-500">나의 잔액 : {balance}</p>
        </div>
        <div className="flex flex-col justify-center items-center py-2">
          <input
            className="w-[90%] p-2 border-b text-xs outline-none"
            placeholder="후원 메시지를 남겨주세요. (최대30자)"
            ref={messageRef}
            maxLength={30}
          />
        </div>
        <div className="py-2">
          <p className="text-sm text-Stickey_Main">소중한 후원금은 S:tickey를 통해 단체로 전달됩니다.</p>
          {/* <p className="text-[8px]">자세한 후원금 사용 내역은 후원 단체 정보에서 확인하실 수 있습니다.</p> */}
        </div>
        <div className="flex justify-center space-x-2 pt-4">
          <button className="bg-[#5959E7] text-white px-5 py-2 rounded-lg text-xs" onClick={handleDonate}>
            후원
          </button>
          <button className="bg-gray-500 text-white px-5 py-2 rounded-lg text-xs" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SponsorModal;
