import { useEffect, useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import ProfileEditModal from '../ProfileEditModal';
import { useProfile } from '../../../hooks/Profile/useProfile';
import { useNavigate } from 'react-router-dom';

const IndividualForm = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null); 
  const [photo, setPhoto] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { useGetUserData, useEditUserData } = useProfile();
  const { mutate } = useEditUserData(); 
  const navigate = useNavigate();

	console.log(image)

  const { data: userData } = useGetUserData();

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setPhone(userData.phone);
      setPhoto(userData.profileImage);
      setEmail(userData.email);
    }
  }, [userData]);

  const saveImgFile = () => {
    if (imgRef.current && imgRef.current.files) {
      const file = imgRef.current.files[0];
      setImage(file);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPhoto(reader.result as string);
        };
      }
    }
  };

  const handleEditSubmit = () => {
    setIsModalOpen(true);
  };

  const handleConfirmEdit = () => {
    const formData = new FormData();
  
    mutate(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        navigate('/profile');
      },
      onError: (error) => {
        console.error('사용자 정보 수정 실패:', error);
        setIsModalOpen(false);
      },
    });
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
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">이메일</p>
						<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder=""
								className="w-full outline-none border-b p-2 text-xs"
						/>
						<p className="pt-4 pb-2 text-sm">연락처</p>
						<input
								type="text"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="010-1234-5678"
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

export default IndividualForm;