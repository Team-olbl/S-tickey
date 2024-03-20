import { useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import Folder from '../../assets/image/FolderOpen.png'

const OrganizationForm = () => {

    const imgRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File>();
    const [photo, setPhoto] = useState<string>('');

    console.log(image) // 나중에 post 연결 시 처리할 것

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

    const [formState, setFormState] = useState<boolean>(false);

    const handleFormState = () => {
        setFormState(true)
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
                        className="w-full outline-none border-b p-2  text-xs"
                    />
                    <button className="w-12 h-6 border border-Stickey_Main text-Stickey_Main rounded-xl text-[10px]">인증</button>
                </div>
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
                <div className="fixed bottom-16 w-full max-w-[360px] m-auto px-4">
                    <button className="bg-Stickey_Main w-full text-white rounded-md p-2 text-md" onClick={() => handleFormState()}>다음</button>
                </div>
                </>
                :
                <>
                <div className='px-4 pt-4'>
                    <p className="pt-2 pb-2 text-sm">담당자이름</p>
                    <input
                        type="text"
                        placeholder="담당자명을 입력해주세요"
                        className="w-full outline-none border-b p-2 text-xs"
                    />
                    <p className="pt-2 pb-2 text-sm">주소</p>
                    <p  className="w-full border-b p-2 text-xs text-gray-400">
                        건물, 지번 또는 도로명 검색하기
                    </p>
                    <input
                        type="text"
                        placeholder="이름을 입력해주세요"
                        className="w-full outline-none border-b p-2 pt-6  text-xs"
                    />
                    <p className="pt-2 pb-2 text-sm">사업자번호</p>
                    <input
                        type="text"
                        placeholder="000-0000-0000"
                        className="w-full outline-none border-b p-2 text-xs"
                    />
                    <p className="pt-2 pb-2 text-sm">사업자등록증</p>
                    <div className='flex items-center w-full border border-gray-200 rounded-md text-gray-300 text-xs'>
                        <img className='p-2' src={Folder} />
                        사업자등록증 첨부하기
                    </div>

                </div>
                <div className="fixed bottom-16 w-full max-w-[360px] m-auto px-4">
                    <button className="bg-Stickey_Main w-full text-white rounded-md p-2 text-md">가입하기</button>
            </div>
            </>
            }
      </div>
    );
  };
  
  export default OrganizationForm;