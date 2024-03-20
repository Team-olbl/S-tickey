import { useRef, useState } from "react";
import { CiCamera } from 'react-icons/ci';

const SponsorForm = () => {

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

    return(
        <>
        <div className='px-4 py-16'>

            {/* 후원글 사진 등록 */}
            <div className='flex flex-col pt-2'>
                <p className='text-xs pb-2'>사진등록</p>
                <label className="flex border items-center justify-center w-full h-32 rounded-lg" htmlFor="photo">
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

            {/* 후원글 정보 */}
            <div>
              <p className="text-xs py-2">제목</p>
              <input
                name="title"
                type="text"
                placeholder="제목을 입력해주세요"
                className="text-xs w-full outline-none border rounded-md p-3"
              ></input>
            </div>

            <div>
              <p className="text-xs py-2">내용</p>
              <textarea
                cols={15}
                rows={6}
                name="content"
                className="text-xs w-full p-4 rounded-md outline-none resize-none border"
                placeholder="단체를 소개할 수 있는 글을 작성해주세요"
              ></textarea>
            </div>

            <div>
            <p className="text-xs py-2">후원 기간</p>
              <div className="w-full flex gap-3">
                <input
                  type="date"
                  min={'2024-02-04'}
                  name="start_date"
                  className="text-xs w-1/2 outline-none border p-2 rounded-md"
                />
                <input
                  type="date"
                  min={'2024-02-04'}
                  name="end_date"
                  className="text-xs w-1/2 outline-none border p-2 rounded-md"
                />
              </div>
            </div>

            <div className="py-4 text-center text-[10px]">
                <p className="py-1">승인 요청 시 가입 단체 정보와 등록 글 승인 검토가 진행됩니다.</p>
                <p>검토 후 승인까지 1~3일 정도 소요될 수 있습니다.</p>
            </div>

            <div className="fixed bottom-16 w-full max-w-[320px]">
                <button className="bg-[#5959E7] w-full text-white rounded-md p-2 text-sm">승인 요청하기</button>
            </div>


        </div>
        </>
    )
}
export default SponsorForm;