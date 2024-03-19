import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  selectedTab: string; // 새로 추가된 prop
}

const LoginForm: React.FC<LoginFormProps> = ({ selectedTab }) => {

    console.log(selectedTab)
    const navigate = useNavigate()

    const gotoSignup = () => {
        navigate('/signup')
    }

    return (
        <>
        <div className="px-4">
            <p className="pt-4 pb-2 text-sm">ID</p>
            <input
                type="text"
                placeholder="아이디를 입력해주세요"
                className="w-full outline-none border-b p-2 text-xs"
            />
            <p className="pt-4 pb-2 text-sm">PW</p>
            <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className="w-full outline-none border-b p-2  text-xs"
            />
        </div>
        <div className="max-w-[360px] m-auto px-4 py-8">
                <button className="bg-[#5959E7] w-full text-white rounded-md p-2 text-md">로그인</button>
            </div>
            <div className="flex justify-around text-xs px-4">
                <button>아이디찾기</button>
                <p>|</p>
                <button>비밀번호찾기</button>
                <p>|</p>
                <button onClick={gotoSignup}>회원가입</button>
        </div>     
        </>
    )

}

export default LoginForm;