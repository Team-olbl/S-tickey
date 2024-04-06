import { useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import { useSignup } from '../../hooks/Individual/useSignup';
import {
  useEmailVerificationMutation,
  useConfirmEmailVerificationMutation,
} from '../../hooks/Email/useEmailVerification';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const IndividualForm = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [photo, setPhoto] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailCode, setEmailCode] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  const isButtonEnabled =
    email &&
    password &&
    passwordConfirm &&
    phone &&
    name &&
    photo &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordMatch;
  const navigate = useNavigate();
  const { mutate } = useEmailVerificationMutation();
  const { mutate: verifyEmailCode } = useConfirmEmailVerificationMutation();
  const { mutate: signup } = useSignup();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setIsEmailValid(isValidEmail(value));
    } else if (name === 'password') {
      setPassword(value);
      setIsPasswordValid(isValidPassword(value));
      setIsPasswordMatch(value === passwordConfirm);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
      setIsPasswordMatch(password === value);
    } else if (name === 'emailCode') {
      setEmailCode(value);
    } else if (name === 'phone') {
      setPhone(value);
    } else if (name === 'name') {
      setName(value);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    return emailRegex.test(email);
  };

  const handleSendEmailVerification = () => {
    if (isEmailValid) {
      mutate(email, {
        onSuccess: () => {
          toast.info('인증코드가 발송되었습니다.');
        },
        onError: error => {
          toast.error(`중복된 이메일입니다 ${error.message}`);
        },
      });
    }
  };

  const handleVerifyEmailCode = () => {
    if (email && emailCode) {
      verifyEmailCode(
        { email, authCode: emailCode },
        {
          onSuccess: data => {
            console.log('인증 성공:', data.message);
            toast.success('인증 성공');
          },
          onError: error => {
            console.error('인증 실패:', error);
            toast.error('인증 실패');
          },
        },
      );
    }
  };

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // 이미지 저장
  const saveImgFile = () => {
    if (imgRef.current && imgRef.current.files) {
      const file: File | undefined = imgRef.current.files[0];
      setImage(file);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const result: string | null = reader.result as string;
          setPhoto(result);
        };
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('signUpReq', JSON.stringify({ name, email, password, phone }));
    if (image) {
      formData.append('profile', image);
    }
    signup(formData, {
      onSuccess: () => {
        toast.success('회원가입이 완료되었습니다.');
        navigate('/login');
      },
      onError: error => {
        toast.error(`회원가입 실패:${error.message}`);
      },
    });
  };

  return (
    <div className="pt-16 text-sm ">
      <div className="px-4 border-b border-Stickey_BGC">
        <p className="pb-2">개인회원가입</p>
      </div>
      <div className="px-4 pb-28">
        {/* 프로필 사진 */}
        <div className="flex flex-col items-center pt-2">
          <p className="text-xs py-2">프로필 사진</p>
          <label className="flex border items-center justify-center w-24 h-24 rounded-lg" htmlFor="photo">
            {photo ? (
              <img src={photo} alt="profilePhoto" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <CiCamera className="flex justify-center" size="2rem" color="#878787" />
            )}
            <input
              name="photo"
              multiple
              type="file"
              onChange={saveImgFile}
              ref={imgRef}
              id="photo"
              className="hidden w-full h-full cursor-pointer"
            ></input>
          </label>
        </div>

        {/* 개인 정보 */}
        <div>
          <p className="pt-2 pb-2 text-sm">이름</p>
          <input
            type="text"
            name="name"
            placeholder="이름을 입력해주세요"
            className="w-full outline-none border-b p-2 text-xs"
            autoComplete="off"
            onChange={handleInputChange}
          />
          <p className="pt-4 pb-2 text-sm">연락처</p>
          <input
            type="text"
            name="phone"
            autoComplete="off"
            placeholder="전화번호를 입력해주세요"
            className="w-full outline-none border-b p-2  text-xs"
            onChange={handleInputChange}
          />
          <p className="pt-4 pb-2 text-sm">이메일</p>
          <div className="flex items-center">
            <input
              type="text"
              name="email"
              placeholder="example@ssafy.com"
              value={email}
              className="w-full outline-none border-b p-2  text-xs"
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button
              className="w-12 h-6 border border-Stickey_Main text-Stickey_Main rounded-xl text-[10px]"
              onClick={handleSendEmailVerification}
            >
              인증
            </button>
          </div>
          {isEmailValid === false && <p className="p-2 text-xs text-red-500">이메일 형식이 유효하지 않습니다.</p>}
          <div className="flex items-center">
            <input
              type="text"
              name="emailCode"
              autoComplete="off"
              placeholder="인증번호를 입력해주세요"
              className="w-full outline-none border-b p-2 pt-6  text-xs"
              onChange={handleInputChange}
            />
            <button
              className="w-[100px] h-6 border border-Stickey_Main text-Stickey_Main rounded-xl text-[10px]"
              onClick={handleVerifyEmailCode}
            >
              인증번호 확인
            </button>
          </div>
          <p className="pt-4 pb-2 text-sm">비밀번호</p>
          <input
            type="password"
            name="password"
            placeholder="영문,숫자, 특수문자 조합으로 8자리 이상 작성해주세요"
            className="w-full outline-none border-b p-2  text-xs"
            onChange={handleInputChange}
          />
          {isPasswordValid === false && <p className="p-2 text-xs text-red-500">비밀번호 형식이 유효하지 않습니다.</p>}
          <p className="pt-4 pb-2 text-sm">비밀번호 확인</p>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 한번 더 입력해주세요"
            className="w-full outline-none border-b p-2  text-xs"
            onChange={handleInputChange}
          />
          {isPasswordMatch === false && <p className="p-2 text-xs text-red-500">비밀번호가 서로 일치하지 않습니다.</p>}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="pt-16 text-sm">
        <div className="fixed bottom-20 w-full max-w-[500px] m-auto px-4">
          <button
            type="submit"
            disabled={!isButtonEnabled}
            className={`w-full text-white rounded-md p-2 text-md ${isButtonEnabled ? 'bg-Stickey_Main' : 'bg-gray-500'}`}
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
};
export default IndividualForm;
