import { useState } from 'react';
import Modal from '../@common/Modal';
import { toast } from 'react-toastify';
import { useFindPW } from '../../hooks/FindPW/useFindPW';

const FindPWModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState<string>('');
  const { mutate } = useFindPW();

  const handleSendPassword = () => {
    mutate(email, {
      onSuccess: () => {
        toast.info('임시번호가 발급되었습니다.');
        onClose();
      },
      onError: error => {
        toast.error(`임시번호 발급에 실패했습니다. ${error.message}`);
      },
    });
  };

  return (
    <Modal width="340px" height="auto" title="비밀번호 찾기" onClose={onClose}>
      <div className="">
        <div className="flex items-center justify-center px-4 pt-10 pb-4">
          <input
            type="text"
            name="email"
            placeholder="example@ssafy.com"
            value={email}
            className="w-full outline-none border-b p-2  text-xs"
            onChange={e => setEmail(e.target.value)}
            autoComplete="off"
          />
          <button className="w-12 h-7 text-sm border border-Stickey_Main text-Stickey_Main rounded-[14px]">인증</button>
        </div>
        <div className="flex items-center justify-center px-4">
          <input
            type="text"
            placeholder="인증번호를 입력해주세요"
            className="w-full outline-none border-b p-2 text-sm"
          />
          <button className="w-20 h-7 text-sm border border-Stickey_Main text-Stickey_Main rounded-[14px]">
            인증하기
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center px-12 py-6" onClick={handleSendPassword}>
        <button className="border border-none bg-Stickey_Main text-white rounded-full w-full h-8">
          임시 비밀번호 발급 받기
        </button>
      </div>
    </Modal>
  );
};

export default FindPWModal;
