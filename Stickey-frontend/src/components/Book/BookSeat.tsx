import { useNavigate } from "react-router-dom";


const BookSeat = ({ selectedSeat }: { selectedSeat: string }) => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/')   
    }

    console.log(`좌석선택페이지 : ${selectedSeat}`)

    return(
        <>
        <div className="pt-4">
            <div className="flex flex-col items-center">

                <div className="bg-Stickey_Gray w-[360px] h-[280px]">포도알 자리</div>
                
                
            </div>

            <div className="fixed bottom-0 w-[360px] flex flex-col items-center bg-[#2E2E3D] rounded-t-xl">

                {/* 스텝바 */}
                <div className="pt-2 w-[150px]">

                    <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
                        <ol className="relative z-10 flex justify-between">
                        <li className="flex items-center">
                        <span className="size-5 rounded-full bg-gray-100 border-2 border-Stickey_Main text-center text-xs"> 1 </span>

                        </li>

                        <li className="flex items-center p-2">
                            <span className="size-5 rounded-full bg-gray-100 border-2 border-Stickey_Gray text-center text-xs"> 2 </span>
                        </li>

                        <li className="flex items-center">
                            <span className="size-5 rounded-full bg-gray-100 border-2 border-Stickey_Gray text-center text-xs"> 3 </span>
                        </li>
                        </ol>
                    </div>
                </div>

                {/* 사용자 정보 */}
                <div className="w-full px-16">
                    <div className="items-center grid grid-cols-4 py-3">
                                <p className="col-span-1 text-xs text-gray-200">좌석등급</p>
                                <div className="col-span-3 flex items-center">
                                    <div className={`h-2 w-6 mr-2 rounded-md`} />
                                    <div className="text-white text-sm"></div>
                                </div>
                            </div>

                        <div className="items-center  grid grid-cols-4 py-3">
                            <p className="col-span-1 text-xs text-gray-200">좌석선택</p>
                            <div className="col-span-3"></div>
                        </div>

                        <div className="items-center grid grid-cols-4 py-3">
                            <p className="col-span-1 text-xs text-gray-200">결제가격</p>
                            <div className="col-span-3"></div>
                        </div>
                    </div>


                    {/* 버튼 */}
                    <div  className="w-full max-w-[360px] px-4 pt-4 pb-16 flex justify-center">
                        <button className="bg-Stickey_Gray w-36 mr-2 p-2 text-xs rounded-md" onClick={() => goBack()}>이전</button>
                        <button className="bg-Stickey_Gray w-36 p-2 text-xs rounded-md">다음</button>
                    </div>
            </div>
        </div>
     </>
    )
}

export default BookSeat;
