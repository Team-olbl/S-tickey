import { useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import ProfileEditModal from './ProfileEditModal';

const IndividualForm = () => {
	const imgRef = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState<File>();
	const [photo, setPhoto] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    <div className="pt-16 text-sm">
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
								placeholder="사용자"
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
				</div>
			</div>
			<div className="fixed bottom-16 w-full max-w-[500px] m-auto px-4">
				<button className="bg-Stickey_Main w-full text-white rounded-md p-2 text-md" onClick={() => setIsModalOpen(true)}>수정하기</button>
			</div>
		</div>
		{isModalOpen && <ProfileEditModal onClose={() => setIsModalOpen(false)}/>}
		</>
  );
};

export default IndividualForm;