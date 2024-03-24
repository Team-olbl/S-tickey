import { useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import Folder from '../../../assets/image/FolderOpen.png'

const IndividualForm = () => {
	const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState<File>();
	const [photo, setPhoto] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

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

  // 파일 업로드
  const handleFileUpload = () => {
    if (fileRef.current && fileRef.current.files) {
        const file: File | undefined = fileRef.current.files[0];
        console.log("Uploaded file:", file);
        if (file) {
            setFileName(file.name); // 파일명 설정
        }
    }
  };

  const clearFile = () => {
    setFileName(''); // 파일명 초기화
    if (fileRef.current) {
        fileRef.current.value = ''; // 파일 input 초기화
    }
  };


  return (
		<>
    <div className="pt-16 text-sm">
			<div className='px-4 pb-28'>
				{/* 프로필 사진 */}
				<div className='flex flex-col items-center pt-2'>
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
								placeholder="삼성"
								className="w-full outline-none border-b p-2 text-xs"
						/>
							<p className="pt-4 pb-2 text-sm">연락처</p>
						<input
								type="text"
								placeholder="010-1234-5678"
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">비밀번호</p>
						<input
								type="password"
								placeholder="영문,숫자 조합의 8자리 이상으로 작성해주세요"
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">비밀번호 확인</p>
						<input
								type="password"
								placeholder="비밀번호를 한번 더 입력해주세요"
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">담당자 이름</p>
						<input
								type="text"
								placeholder="김스티키"
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">주소</p>
						<input
								type="text"
								placeholder="구미시 인동2길 14-3"
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">사업자 등록번호</p>
						<input
								type="text"
								placeholder="123-1234-1234"
								className="w-full outline-none border-b p-2 text-xs"
						/>
            <div className='flex flex-row items-center pt-4 pb-2'>
              <p className=" text-sm">파일 첨부</p>
              <img
                  className='p-2 cursor-pointer'
                  src={Folder}
                  onClick={() => fileRef.current?.click()}
              />
            </div>
            <div className="flex items-center">
              {fileName && (
                <div className="flex items-center mr-4">
                  <span className="mr-2">{fileName}</span>
                  <button onClick={clearFile} className="text-red-500 focus:outline-none">삭제</button>
                </div>
              )}
              <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  onChange={handleFileUpload}
              />

            </div>
				</div>
			</div>
			<div className="fixed bottom-16 w-full max-w-[500px] m-auto px-4">
				<button className="bg-Stickey_Main w-full text-white rounded-md p-2 text-md">수정하기</button>
			</div>
		</div>
		</>
  );
};

export default IndividualForm;