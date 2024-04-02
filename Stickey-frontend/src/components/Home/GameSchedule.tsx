import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { IGameSimpleRes } from '../../types/Home';

const GameSchedule = ({ data }: { data: IGameSimpleRes }) => {
  dayjs.locale('ko');
  const gameDay = dayjs(data.gameStartTime);
  const date = gameDay.format('MM.DD');
  const dayOfWeek = gameDay.format('ddd');
  const time = gameDay.format('HH:mm');

  return (
    <div className="w-full pb-3 px-4">
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <div className="w-full max-w-[500px] px-4 h-[52px] flex flex-row items-center justify-center bg-[#2E2E3D] rounded-[10px] drop-shadow-[2px_2px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <p className="text-white text-xs">{date}</p>
              <p
                className={`${dayOfWeek === '일' ? `text-[#FF0000]` : dayOfWeek === '토' ? `text-[#0047FF]` : `text-white`} text-xs`}
              >
                {dayOfWeek}
              </p>
            </div>
            <p className="text-sm text-white">{time}</p>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <img className="w-6 h-6" src={data.homeTeamLogo} />
                <p className="text-xs text-white">{data.homeTeam}</p>
              </div>
              <p className="text-[20px] text-[#FF0000] font-bold">VS</p>
              <div className="flex flex-row items-center gap-2">
                <img className="w-6 h-6" src={data.awayTeamLogo} />
                <p className="text-xs text-white">{data.awayTeam}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSchedule;
