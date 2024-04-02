import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import { signupData } from '../../types/OrganizationSignup';
import { toast } from 'react-toastify';
import DaumPostcode from 'react-daum-postcode';
import { useEmailVerificationMutation, useConfirmEmailVerificationMutation } from '../../hooks/Email/useEmailVerification';
import { AddresssData } from '../../types/OrganizationSignup';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/Organization/useSignup';

const OrganizationForm = () => {
    const imgRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File>();
    const [photo, setPhoto] = useState<string>('');
    const [formData, setFormData] = useState<signupData>({
        name: '',
        phone: '',
        email: '',
        verificationCode: '',
        password: '',
        confirmPassword: '',
        registrationNumber: '',
        address: '',
        manager: '',
        wallet : ''
    })
    const [isEmailError, setIsEmailError] = useState<boolean | null>(null);
    const [isPasswordError, setIsPasswordError] = useState<boolean | null>(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
    const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File>();
    const { mutate } = useEmailVerificationMutation();
    const { mutate: verifyEmailCode } = useConfirmEmailVerificationMutation();
    const { mutate: signup } = useSignup();
    const navigate = useNavigate();
    
    const isValidEmail = (email:string) => {
        const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        return emailRegex.test(email);
    };

    const handleSendEmailVerification = (e: FormEvent) => {
    e.preventDefault();
    if (!isEmailError) {
        mutate(formData.email, {
            onSuccess: () => {
                toast.info('인증코드가 발송되었습니다.');
            },
            onError: (error: Error) => {
                toast.error(`오류가 발생했습니다: ${error.message}`);
            },
        });
    }
    };

    const handleVerifyEmailCode = () => {
    const { email, verificationCode } = formData;

    if (email && verificationCode) {
        verifyEmailCode({
            email: email,
            authCode: verificationCode
        }, {
            onSuccess: () => {
                toast.success('이메일 인증에 성공했습니다.');
            },
            onError: (error: Error) => {
                toast.error(`이메일 인증에 실패했습니다: ${error.message}`);
            },
        });
        }
    };
    
    useEffect(() => {
        setIsPasswordMatch(formData.password === formData.confirmPassword);
    }, [formData.password, formData.confirmPassword]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'email') {
            setIsEmailError(!isValidEmail(value))
        } else if (name === 'password') {
            setIsPasswordError(!isValidPassword(value))
        }
    };

    const isValidPassword = (password:string) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@!^%#~?&])[A-Za-z\d$@!%~*^#?&]{8,}$/;
        return passwordRegex.test(password);
    }

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

    // 파일 저장
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        }
    }

    const isFormValid = () => {
        const requiredFilled = photo && formData.name && formData.phone && formData.email && formData.verificationCode && formData.password && formData.confirmPassword && formData.wallet;
        const validationPassed = !isEmailError && !isPasswordError && isPasswordMatch;
    
        return requiredFilled && validationPassed;
    }

    const isSignupValid = () => {
        const requiredAllFields = file && photo && formData.name && formData.phone && formData.email && formData.verificationCode && formData.password && formData.confirmPassword && formData.manager && formData.registrationNumber && formData.address;
        const validationPassed = !isEmailError && !isPasswordError && isPasswordMatch;

        return requiredAllFields && validationPassed;
    }

    const [formState, setFormState] = useState<boolean>(false);

    const handleFormState = () => {
        setFormState(true)
    }

    const handleAddress = (data :AddresssData) => {
        let fullAddress = data.address;
        let extraAddress = '';
        
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setFormData(prevState => ({
            ...prevState,
            address: fullAddress
        }));
        setIsPostcodeOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isSignupValid()) {
            console.log('유효성 검사 실패했음');
            return
        }

        const form = new FormData();
        console.log(form)
        if (image) form.append('profile', image);
        if (file) form.append('registrationFile', file);

        form.append('organSignUpReq', JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            registrationNumber: formData.registrationNumber,
            address: formData.address,
            manager: formData.manager,
            wallet: formData.wallet
        }))
        signup(form, {
            onSuccess: () => {
                toast.success('회원가입이 완료되었습니다.');
                navigate('/login');
            },
            onError: (error) => {
                toast.error(`회원가입 실패: ${error.message}`)
            }
        })
    }
    
    return (
    <div className="pt-16 text-sm ">
        <div className='px-4 border-b border-Stickey_BGC'>
            <p className="pb-2">단체회원가입</p>
        </div>
        
        { !formState ?  <>
        <div className='px-4 pb-28'>
        {/* 프로필 사진 */}
        <div className='flex flex-col items-center pt-2'>
            <p className='text-xs py-2'>단체 로고</p>
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
            <p className="pt-2 pb-2 text-sm">단체명</p>
            <input
                type="text"
                placeholder="이름을 입력해주세요"
                className="w-full outline-none border-b p-2 text-xs"
                name='name'
                value={formData.name}
                onChange={handleChange}
                autoComplete='off'
            />
            <p className="pt-4 pb-2 text-sm">연락처</p>
            <input
                type="text"
                placeholder="010-0000-0000"
                className="w-full outline-none border-b p-2  text-xs"
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                autoComplete='off'
                        />
            <p className="pt-4 pb-2 text-sm">지갑 주소</p>
            <input
                type="text"
                placeholder="0x000..."
                className="w-full outline-none border-b p-2  text-xs"
                name='wallet'
                value={formData.wallet}
                onChange={handleChange}
                autoComplete='off'
            />
            <p className="pt-4 pb-2 text-sm">이메일</p>
            <div className='flex items-center'>    
                <input
                    type="text"
                    placeholder="example@ssafy.com"
                    className="w-full outline-none border-b p-2  text-xs"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete='off'
                />
                <button className="w-12 h-6 border border-Stickey_Main text-Stickey_Main rounded-xl text-[10px]" onClick={handleSendEmailVerification}>인증</button>
            </div>
            {isEmailError === true && <p className="p-2 text-xs text-red-500">이메일 형식이 유효하지 않습니다.</p>}
            <div className='flex items-center'>
                <input
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                    className="w-full outline-none border-b p-2 pt-6  text-xs"
                    name='verificationCode'
                    value={formData.verificationCode}
                    onChange={handleChange}
                    autoComplete='off'
                />
                <button className='w-[100px] h-6 border border-Stickey_Main text-Stickey_Main rounded-xl text-[10px]' onClick={handleVerifyEmailCode}>인증번호 확인</button>
            </div>
            <p className="pt-4 pb-2 text-sm">비밀번호</p>
            <input
                type="password"
                placeholder="영문,숫자, 특수문자 조합으로 8자리 이상 작성해주세요"
                className="w-full outline-none border-b p-2  text-xs"
                name='password'
                value={formData.password}
                onChange={handleChange}
            />
            {isPasswordError && (<p className='p-2 text-xs text-red-500'>비밀번호 형식이 유효하지 않습니다.</p>)}
            <p className="pt-4 pb-2 text-sm">비밀번호 확인</p>
            <input
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요"
                className="w-full outline-none border-b p-2  text-xs"
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            {!isPasswordMatch && <p className='p-2 text-xs text-red-500'>비밀번호가 서로 일치하지 않습니다.</p>}
        </div>

        </div>
        <div className="fixed bottom-20 w-full max-w-[500px] m-auto px-4">
            <button disabled={!isFormValid()} className={`bg-Stickey_Main w-full text-white rounded-md p-2 text-md ${!isFormValid() ? 'opacity-50 cursor-not-allowed':''}`} onClick={() => handleFormState()} >다음</button>
        </div>
        </>
        :
        <>
        <div className='px-4 pt-4'>
            <p className="pt-2 pb-2 text-sm">담당자이름</p>
            <input
                type="text"
                placeholder="담당자명을 입력해주세요"
                className="w-full outline-none border-b-[0.5px] p-2 text-xs"
                name='manager'
                value={formData.manager}
                onChange={handleChange}
                autoComplete='off'
            />
            <p className="pt-2 pb-2 text-sm">주소</p>
            <div className="flex flex-row items-center">
                <input
                    type="text"
                    value={formData.address}
                    className="w-full ml-2 outline-none border-b-[0.5px] p-2 text-xs"
                    readOnly
                />
                <button 
                    className="bg-blue-400 w-32 text-white py-2 px-2 rounded"
                    onClick={() => setIsPostcodeOpen(true)}>
                    주소 검색
                </button>
            </div>
            {isPostcodeOpen && (
                <div style={{ display: 'block', position: 'absolute', zIndex: '100' }}>
                    <DaumPostcode onComplete={handleAddress} />
                    <button onClick={() => setIsPostcodeOpen(false)}>닫기</button>
                </div>
            )}
            <p className="pt-2 pb-2 text-sm">사업자번호</p>
            <input
                type="text"
                placeholder="000-0000-0000"
                className="w-full outline-none border-b p-2 text-xs"
                name='registrationNumber'
                value={formData.registrationNumber}
                onChange={handleChange}
                autoComplete='off'
            />
            <p className="pt-2 pb-2 text-sm">사업자등록증</p>
            <div className='flex items-center w-full border border-gray-200 rounded-md text-gray-300 text-xs'>
                <input 
                    type='file'
                    name='file'
                    placeholder='사업자등록증을 업로드해주세요.'
                    className='p-2'
                    onChange={handleFileChange}
                />
            </div>

        </div>
        <form onSubmit={handleSubmit}>
            <div className="fixed bottom-20 w-full max-w-[500px] m-auto px-4">
                <button disabled={!isSignupValid()} className={`bg-Stickey_Main w-full text-white rounded-md p-2 text-md ${!isSignupValid() ? 'opacity-50 cursor-not-allowed':''}`} onClick={() => handleFormState()}>가입하기</button>
            </div>
        </form>
    </>
            }
        </div>
    );
};

export default OrganizationForm;