import { useTicketInfoStore } from "../../stores/useTicketInfoStore";

const BookInfo = () => {

    const gameInfo = useTicketInfoStore((state) => state.modalData);

    console.log(gameInfo)

    return (
        <div>
            <div className="flex justify-center items-center pt-4">
                <div >
                    <img className="w-8 h-8 rounded-full" src={gameInfo?.homeTeamLogo} /> 
                </div>

                <p className="text-white px-2">VS</p>
                <div>
                    <img className="w-8 h-8 rounded-full" src={gameInfo?.awayTeamLogo} /> 
                </div>
            </div>
            <div className="text-center text-[8px] text-white py-2">
                <p className="px-1">{gameInfo?.stadium} {gameInfo?.gameStartTime}</p>
            </div>
            
        </div>
    );
};

export default BookInfo;