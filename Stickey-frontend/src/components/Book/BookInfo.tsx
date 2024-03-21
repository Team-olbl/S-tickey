import { IGameInfo } from "../../pages/Book/BookDetail/BookSectionPage";


const BookInfo: React.FC<{ gameInfo: IGameInfo }> = ({ gameInfo }) => {
    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="w-8 h-8 bg-Stickey_Gray rounded-full" />
                <p className="text-white px-2">VS</p>
                <div className="w-8 h-8 bg-Stickey_Gray rounded-full" />
            </div>
            <div className="text-center text-[8px] text-white py-2">
                <p className="px-1">{gameInfo.stadium} {gameInfo.gameStartTime}</p>
            </div>
            
        </div>
    );
};

export default BookInfo;