import { useState } from "react";
import { useChangePW } from "../../../hooks/ChangePW/useChangePW";
import { toast } from "react-toastify";
import Modal from "../../@common/Modal";

const PasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  const isButtonEnabled = isPasswordValid && isPasswordMatch;
  const {mutate} = useChangePW();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (name === 'password'){
      setPassword(value);
      setIsPasswordValid(isValidPassword(value));
      setIsPasswordMatch(value === passwordConfirm);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
      setIsPasswordMatch(password === value);
    }
    console.log(value)
  }

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = () => {
      mutate(password, {
        onSuccess: () => {
          toast.success('비밀번호가 성공적으로 변경되었습니다.')
          onClose();
        },
        onError: (error) => {
          toast.error(`비밀번호 변경에 실패하였습니다 : ${error.message}`)
        }
      })
    }
  

  return (
    <Modal width="330px" height="auto" title="비밀번호 변경" onClose={onClose} >
      <div>
        <div className="flex flex-col items-center px-8 pt-10 pb-4">
          <div className="flex items-center gap-1">
            <p className="w-[120px] pt-4 pb-2 text-xs">새 비밀번호</p>
            <input
              type="password"
              name="password"
              placeholder="변경할 비밀번호를 입력하세요"
              className="w-full outline-none border-b p-2  text-xs"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          {isPasswordValid === false && <p className="pl-14 text-xs text-red-500">비밀번호 형식이 유효하지 않습니다.</p>}
        </div>
        <div className="flex flex-col items-center px-8">
          <div className="flex items-center gap-1">
            <p className="w-[120px] text-xs">비밀번호 확인</p>
            <input 
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호를 다시 입력해주세요"
              className="w-full outline-none border-b p-2 text-xs"
              onChange={handleInputChange}
            />
          </div>
          {isPasswordMatch === false && <p className="pl-14 text-xs text-red-500">비밀번호가 서로 일치하지 않습니다.</p>}
        </div>
      </div>
      <div className="flex items-center justify-center px-20 py-6">
        <button className={`border border-none bg-Stickey_Main text-white rounded-full w-full h-8 ${isButtonEnabled ? 'bg-Stickey_Main' : 'bg-gray-500'}`} onClick={handleChangePassword} disabled={!isButtonEnabled}>변경하기</button>
      </div>
    </Modal>
  )
}

export default PasswordModal;