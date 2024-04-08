import dayjs from 'dayjs';
import { useTicketInfoStore } from '../../stores/useTicketInfoStore';

const BookInfo = () => {
  const gameInfo = useTicketInfoStore(state => state.modalData);
  const gameDate = dayjs(gameInfo?.gameStartTime).format('YYYY년 MM월 DD일 HH시 mm분');

  return (
    <div>
      <div className="flex justify-center items-center pt-2 gap-2">
        <div>
          <img className="w-10 h-8 rounded-full" src={gameInfo?.homeTeamLogo} />
        </div>
        <p className="text-white px-2">VS</p>
        <div>
          <img className="w-10 h-8 rounded-full" src={gameInfo?.awayTeamLogo} />
        </div>
      </div>
      <div className="text-center text-xs text-white py-2">
        <p className="px-1">
          {gameInfo?.stadium} {gameDate}
        </p>
      </div>
    </div>
  );
};

export default BookInfo;
