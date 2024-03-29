import { useEffect, useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import { useProfile } from '../../../hooks/Profile/useProfile';
import { ICreatePlayerReq } from '../../../types/Profile';
import { useNavigate } from 'react-router-dom';

const PlayerRegistrationForm = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()
  const [image, setImage] = useState<File>();
  const [photo, setPhoto] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [categoryInput, setCategoryInput] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const { usePostPlayerCreate } = useProfile();

  const playerReq: ICreatePlayerReq = {
	name: nameInput,
    description: descriptionInput,
    category: categoryInput,
    birth: birthDate,
  }

  const { mutate } = usePostPlayerCreate()

  const handlePlayerCreate = () => {

	const formData = new FormData();
	const json = JSON.stringify(playerReq)
	const blob = new Blob([json], {type: 'application/json'})

	formData.append('playerReq ', blob)
	formData.append('profile ', image!)
	mutate(formData);
	navigate(`/profile/playerlist`)
  }

  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState<boolean>(false);

  useEffect(() => {
    if (nameInput && descriptionInput && categoryInput && birthDate) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [nameInput, descriptionInput, categoryInput, birthDate]);

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
								value={nameInput}
								onChange={(e) => setNameInput(e.target.value)}
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
								value={categoryInput}
								onChange={(e) => setCategoryInput(e.target.value)}
								placeholder="종목을 입력해주세요"
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">설명</p>
						<textarea
							className='w-full px-2 h-[100px] border rounded-[10px]'
							name="content"
							value={descriptionInput}
							onChange={(e) => setDescriptionInput(e.target.value)}
							id="content"
							required
						/>
				</div>
			</div>
			<div className="fixed bottom-16 w-full max-w-[500px] m-auto px-4">
			<button onClick={handlePlayerCreate} className={`bg-Stickey_Main w-full text-white rounded-md p-2 text-md ${!isAllFieldsFilled && 'opacity-50 cursor-not-allowed'}`} disabled={!isAllFieldsFilled}>등록하기</button></div>
		</div>
		</>
  );
};

export default PlayerRegistrationForm;