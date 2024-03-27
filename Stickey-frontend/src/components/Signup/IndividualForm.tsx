import { useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import { useEmailVerificationMutation } from '../../hooks/User/useEmailVerification';


const IndividualForm = () => {

    const imgRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File>();
    const [photo, setPhoto] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
    const { mutate: sendVerificationCode } = useEmailVerificationMutation();

    console.log(image) // 나중에 post 연결 시 처리할 것

    // 이메일 변경 핸들러
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        setIsEmailValid(isValidEmail(inputEmail));
	};

	const isValidEmail = (email:string) => {
		const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
		return emailRegex.test(email);
	}

	const handleSendEmailVerification = () => {
		if (isEmailValid) {
			sendVerificationCode(email);
		}
	};

    // 이미지 저장
    const saveImgFile = () => {
        // 이미지 업로드 input의 onChange
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

    return (
    <div className="pt-16 text-sm ">
        <div className='px-4 border-b border-Stickey_BGC'>
            <p className="pb-2">개인회원가입</p>
        </div>
        <div className='px-4 pb-28'>
            {/* 프로필 사진 */}
            <div className='flex flex-col items-center pt-2'>
                <p className='text-xs py-2'>프로필 사진</p>
                <label className="flex border items-center justify-center w-24 h-24 rounded-lg" htmlFor="photo">
                {photo ? (
                        <img src={photo} alt="profilePhoto" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <CiCamera className="flex justify-center" size="2rem" color="#878787" />
                    )}<input
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
                    placeholder="이름을 입력해주세요"
                    className="w-full outline-none border-b p-2 text-xs"
                />
                <p className="pt-4 pb-2 text-sm">연락처</p>
                <input
                    type="text"
                    placeholder="010-0000-0000"
                    className="w-full outline-none border-b p-2  text-xs"
                />
                <p className="pt-4 pb-2 text-sm">이메일</p>
                <div className='flex items-center'>    
                    <input
                        type="text"
                        placeholder="example@ssafy.com"
                                            value={email}
                        className="w-full outline-none border-b p-2  text-xs"
                        onChange={handleEmailChange}
                    />
                    <button className="w-12 h-6 border border-Stickey_Main text-Stickey_Main rounded-xl text-[10px]" onClick={handleSendEmailVerification}>인증</button>
                </div>
								{isEmailValid === false && (<p className="p-2 text-xs text-red-500">이메일 형식이 유효하지 않습니다.</p>)}
                <input
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                    className="w-full outline-none border-b p-2 pt-6  text-xs"
                />
                <p className="pt-4 pb-2 text-sm">비밀번호</p>
                <input
                    type="password"
                    placeholder="영문,숫자 조합의 8자리 이상으로 작성해주세요"
                    className="w-full outline-none border-b p-2  text-xs"
                />
                <p className="pt-4 pb-2 text-sm">비밀번호 확인</p>
                <input
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해주세요"
                    className="w-full outline-none border-b p-2  text-xs"
                />
            </div>

        </div>
            <div className="fixed bottom-16 w-full max-w-[500px] m-auto px-4">
                <button className="bg-Stickey_Main w-full text-white rounded-md p-2 text-md">가입하기</button>
            </div>
        </div>
    );
};
export default IndividualForm;