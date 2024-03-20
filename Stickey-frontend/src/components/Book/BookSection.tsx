import { useState } from "react";

const BookSection = () => {

    const [selectedSeat, setSelectedSeat] = useState('');

    const handleSeatClick = (seat:string) => {
        setSelectedSeat(seat);
    };


    return (
        <div className="pt-4">
            <div className="flex flex-col items-center">

                <div className="flex px-1">
                    <div  
                        className={`bg-[#FEACAC] h-8 w-20 mr-1 ${selectedSeat === 'S구역 1' ? 'opacity-100' : 'opacity-50'}`} 
                        onClick={() => handleSeatClick('S구역 1')}>
                    </div>
                    <div 
                        className={`bg-[#FEACAC] h-8 w-20 ${selectedSeat === 'S구역 2' ? 'opacity-100' : 'opacity-50'}`} 
                        onClick={() => handleSeatClick('S구역 2')}>
                    </div>
                </div>


                <div className="flex p-1">
                    <div className="flex px-1">
                        <div 
                            className={`bg-[#D2C2FF] w-8 h-24 mr-1 ${selectedSeat === 'R구역 1' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('R구역 1')}>
                        </div>
                        <div 
                            className={`bg-[#D2C2FF] w-8 h-24 ${selectedSeat === 'R구역 2' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('R구역 2')}>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="bg-gray-400 flex h-24 w-40">경기장</div>
                    </div>
                    <div className="flex px-1">
                        <div 
                            className={`bg-[#D2C2FF] w-8 h-24 ${selectedSeat === 'R구역 3' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('R구역 3')}>
                        </div>
                        <div 
                            className={`bg-[#D2C2FF] w-8 h-24 ml-1 ${selectedSeat === 'R구역 4' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('R구역 4')}>
                        </div>
                    </div>
                </div>


                <div className="flex px-1">
                    <div className="px-1">
                        <div 
                            className={`bg-[#FAF8B7] w-16 h-12 rounded-bl-full ${selectedSeat === 'W구역 1' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('W구역 1')}>
                        </div>
                    </div>

                    <div>
                        <div 
                            className={`bg-[#C3E7FF] h-6 w-20 mr-1 ${selectedSeat === 'E구역 1' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('E구역 1')}>
                        </div>
                        <div 
                            className={`bg-[#C3E7FF] h-6 w-20 mt-1 ${selectedSeat === 'E구역 3' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('E구역 3')}>
                        </div>
                    </div>
                    <div>
                        <div 
                            className={`bg-[#C3E7FF] h-6 w-20 ${selectedSeat === 'E구역 2' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('E구역 2')}>
                        </div>
                        <div 
                            className={`bg-[#C3E7FF] h-6 w-20 mt-1 ${selectedSeat === 'E구역 4' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('E구역 4')}>
                        </div>
                    </div>
                    <div className="px-1">    
                        <div 
                            className={`bg-[#FAF8B7] w-16 h-12 rounded-br-full ${selectedSeat === 'W구역 2' ? 'opacity-100' : 'opacity-50'}`} 
                            onClick={() => handleSeatClick('W구역 2')}>
                        </div>
                    </div>
                </div>
                
                
                {/* 좌석 구역 정보 */}
                <div className="pt-4">
                    <div className="flex">
                        <div className="flex items-center">
                            <div className="h-2 w-6 bg-[#FEACAC]" />
                            <p className="px-1 text-[10px] text-white">S구역 : 10,000</p>
                        </div>
                        <div className="flex items-center">
                            <div className="h-2 w-6 bg-[#D2C2FF]" />
                            <p className="px-1 text-[10px] text-white">R구역 : 10,000</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex items-center">
                            <div className="h-2 w-6 bg-[#C3E7FF]" />
                            <p className="px-1 text-[10px] text-white">E구역 : 10,000</p>
                        </div>
                        <div className="flex items-center">
                            <div className="h-2 w-6 bg-[#FAF8B7]" />
                            <p className="px-1 text-[10px] text-white">W구역 : 10,000</p>
                        </div>
                    </div>


                </div>
                
            </div>
            <div className="text-white">내가 선택한 구역 : {selectedSeat}</div>
        </div>
    );
};

export default BookSection;
