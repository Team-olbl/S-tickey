import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/Individual/useLogin';
import { toast } from 'react-toastify';
import FindPWModal from '../FindPW/FindPWModal';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [tryLogin, setTryLogin] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { mutate } = useLogin();
  const navigate = useNavigate();

  const gotoSignup = () => {
    navigate('/signup');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setTryLogin(true);

    if (!email || !password) {
      return;
    }

    mutate(
      { email, password },
      {
        onSuccess: data => {
          toast.success('로그인에 성공했습니다.');
          console.log(data);
          navigate('/home');
        },
        onError: error => {
          toast.error(`이메일과 비밀번호를 다시 확인해주세요.`);
          console.log(error.message);
        },
      },
    );
  };

  const handleFindPW = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="px-4">
        <p className="pt-4 pb-2 text-sm">ID</p>
        <input
          type="text"
          placeholder="이메일을 입력해주세요."
          className="w-full outline-none border-b p-2 text-xs"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {tryLogin && !email && <p className="px-2 text-xs text-red-500">이메일을 입력해주세요.</p>}
        <p className="pt-6 pb-2 text-sm">PW</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="w-full outline-none border-b p-2  text-xs"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {tryLogin && !password && <p className="px-2 text-xs text-red-500">비밀번호를 입력해주세요.</p>}
      </div>
      <form onSubmit={handleLogin}>
        <div className="max-w-[500px] m-auto px-4 py-8">
          <button type="submit" className="bg-[#5959E7] w-full text-white rounded-md p-2 text-md">
            로그인
          </button>
        </div>
      </form>
      <div className="flex justify-center text-xs px-4 gap-8">
        <button onClick={handleFindPW}>비밀번호찾기</button>
        <p>|</p>
        <button onClick={gotoSignup}>회원가입</button>
      </div>
      {isModalOpen && <FindPWModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default LoginForm;
