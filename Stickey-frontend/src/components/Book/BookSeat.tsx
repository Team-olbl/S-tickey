import { useNavigate } from "react-router-dom";
import useTicketStore from "../../stores/useTicketStore";


const BookSeat = () => {

    const navigate = useNavigate();
    const { seatInfo, setSelectInfo } = useTicketStore();

    const goBack = () => {
        navigate('/')   
    }

    const getSeatColor = (seat: string): string => {
        switch (seat) {
            case 'S구역 1':
            case 'S구역 2':
                return '#FEACAC';
            case 'R구역 1':
            case 'R구역 2':
            case 'R구역 3':
            case 'R구역 4':
                return '#D2C2FF';
            case 'W구역 1':
            case 'W구역 2':
                return '#FAF8B7';
            case 'E구역 1':
            case 'E구역 2':
            case 'E구역 3':
            case 'E구역 4':
                return '#C3E7FF';
            default:
                return '#FFFFFF'; // 기본 색상
        }
    };

    const handleSeatClick = (seat:string) => {
        // 이미 선택된 좌석 배열이 있다면 기존 배열에 추가하고, 없다면 새 배열로 생성
        const newSelectedSeats = seatInfo.seat.includes(seat)
            ? seatInfo.seat.filter(s => s !== seat) // 이미 선택된 좌석 제거
            : [...seatInfo.seat, seat]; // 새로 선택한 좌석 추가
        setSelectInfo(seatInfo.section, newSelectedSeats);
    };

    const generateSeatNumbers = (rows: number, cols: number) => {
        const seats = [];
        let count = 1;
        for (let i = 1; i <= rows; i++) {
            const row = [];
            for (let j = 1; j <= cols; j++) {
                row.push(count++);
            }
            seats.push(row);
        }
        return seats;
    };

    const seats = generateSeatNumbers(5, 6);


    // 결제 금액 함수 ( 나중에 바꿔야함 )
    const calculateTotalPrice = () => {
        const pricePerSeat = 10000; // 임시 좌석당 가격
        return seatInfo.seat.length * pricePerSeat;
    };


    return(
        <>
        <div className="pt-4">


                {/* 좌석 */}
                    <div className="bg-Stickey_Gray w-[360px] h-[280px] flex flex-wrap justify-center items-center">
                        <div className="">
                            {seats.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex">
                                    {row.map((seatNumber, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className={`w-8 h-8 m-1 flex items-center justify-center border border-gray-300 rounded-md ${seatInfo.section === `seat ${seatNumber}` ? 'bg-red-500' : 'bg-gray-300'}`}
                                            onClick={() => handleSeatClick(`${seatNumber}`)}
                                        >
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                
 

            <div className="fixed bottom-0 w-[360px] flex flex-col items-center bg-[#2E2E3D] rounded-t-xl">

                {/* 스텝바 */}
                <div className="pt-2 w-[150px]">

                    <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
                        <ol className="relative z-10 flex justify-between">
                        <li className="flex items-center">
                        <span className="size-5 rounded-full bg-gray-100 border-2 border-Stickey_Gray text-center text-xs"> 1 </span>

                        </li>

                        <li className="flex items-center p-2">
                            <span className="size-5 rounded-full bg-gray-100 border-2 border-Stickey_Main text-center text-xs"> 2 </span>
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
                                <div className={`h-2 w-6 mr-2 rounded-md`} style={{ backgroundColor: getSeatColor(seatInfo.section) }} />
                                    <div className="text-white text-sm">{seatInfo.section}</div>
                                </div>
                            </div>

                        <div className="items-center  grid grid-cols-4 py-3">
                            <p className="col-span-1 text-xs text-gray-200">좌석선택</p>
                            <div className="col-span-3 flex">
                            {/* 선택한 좌석들을 출력 */}
                            {seatInfo.seat.map((seat, index) => (
                                <div className="w-6 h-6 text-sm text-white bg-Stickey_Main text-center rounded-md m-1" key={index}>{seat} </div>
                            ))}
                        </div>
                        </div>

                        <div className="items-center grid grid-cols-4 py-3">
                            <p className="col-span-1 text-xs text-gray-200">결제가격</p>
                            <div className="col-span-3 text-white">
                                {calculateTotalPrice()}원
                            </div>
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
