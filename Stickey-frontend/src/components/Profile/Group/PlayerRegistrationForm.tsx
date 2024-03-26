import { useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';

const PlayerRegistrationForm = () => {
	const imgRef = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState<File>();
	const [photo, setPhoto] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  

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


  return (
		<>
    <div className="pt-2 text-sm">
			<div className='px-4 py-16'>
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
						<p className="pt-2 pb-2 text-sm">이름</p>
						<input
								type="text"
								placeholder="이름을 입력해주세요."
								className="w-full outline-none border-b p-2 text-xs"
						/>
							<p className="pt-4 pb-2 text-sm">생년월일</p>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full outline-none border-b p-2 text-xs"
              />
						<p className="pt-4 pb-2 text-sm">종목</p>
						<input
								type="text"
								placeholder="종목을 입력해주세요"
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">설명</p>
            <textarea
              className='w-full px-2 h-[100px] border rounded-[10px]'
              name="content"
              id="content"
              required
            />
				</div>
			</div>
			<div className="fixed bottom-16 w-full max-w-[500px] m-auto px-4">
				<button className="bg-Stickey_Main w-full text-white rounded-md p-2 text-md">등록하기</button>
			</div>
		</div>
		</>
  );
};

export default PlayerRegistrationForm;