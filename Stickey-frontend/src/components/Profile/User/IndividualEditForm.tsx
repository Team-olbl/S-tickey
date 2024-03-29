import { useEffect, useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import ProfileEditModal from '../ProfileEditModal';
import { useProfile } from '../../../hooks/Profile/useProfile';
import { useNavigate } from 'react-router-dom';

const IndividualEditForm = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [photo, setPhoto] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { useGetUserData, useEditUserData } = useProfile();
  const navigate = useNavigate();
	
	console.log(image)
	
  const { mutate } = useEditUserData();
  const { data: userData } = useGetUserData();

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setPhone(userData.phone);
      setPhoto(userData.profileImage);
      setEmail(userData.email);
    }
  }, [userData]);

	const saveImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setPhoto(reader.result as string);
    }
  };

  const handleEditSubmit = () => {
    setIsModalOpen(true);
  };

	const handleConfirmEdit = () => {
    const formData = new FormData();
    formData.append('userInfoReq', JSON.stringify({ phone: phone }));

    if (image) {
        formData.append('profileImage', image);
    }

    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    mutate(formData, {
        onSuccess: () => {
            navigate('/profile');
        },
        onError: (error) => {
            console.error('프로필 정보 수정 실패', error);
        }
    });

    setIsModalOpen(false);
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
						<label className="pt-2 pb-2 text-sm">이름</label>
						<input
								type="text"
								value={name}
								readOnly
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">이메일</p>
						<input
								type="email"
								value={email}
								readOnly
								placeholder=""
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">연락처</p>
						<input
								type="text"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="전화번호를 입력해주세요"
								className="w-full outline-none border-b p-2 text-xs"
						/>
				</div>
			</div>
			<div className="fixed bottom-16 w-full max-w-[500px] m-auto px-4">
				<button className="bg-Stickey_Main w-full text-white rounded-md p-2 text-md" onClick={handleEditSubmit}>수정하기</button>
			</div>
		</div>
		{isModalOpen && <ProfileEditModal onClose={() => setIsModalOpen(false)} handleConfirmEdit={handleConfirmEdit} />}
		</>
  );
};

export default IndividualEditForm;