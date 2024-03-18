import Tickets  from '../../assets/Alarm/Tickets.png'
import { AlarmItemData } from '../../pages/Alarm/AlarmPage';

  const AlarmItem = ({data} : {data: AlarmItemData}) => {

      return (
        <div className="flex gap-4 px-4 py-3 border-b border-[#A9A9A9]">
          <div className="w-10 h-10 flex justify-center items-center">
            <img src={Tickets} className="w-10" />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <p className='text-white text-xs'>{data.title}</p>
            <p className=" text-white">{data.message}</p>
            <p className="text-[#A9A9A9] text-xs">{data.time}</p>
          </div>
        </div>
      );
  }
  
  export default AlarmItem;