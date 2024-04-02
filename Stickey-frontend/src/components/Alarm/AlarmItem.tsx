import dayjs from 'dayjs';
import Bell from '../../assets/image/YellowBell.png'
import { INotifyInfo } from '../../types/Notify';

  const AlarmItem = ({data} : {data: INotifyInfo}) => {

    const getDate = dayjs(data.createdAt).format('YYYY년 MM월 DD일 HH시 mm분')

      return (
        <div className="flex gap-4 px-4 py-3 border-b border-[#A9A9A9]">
          <div className="w-10 h-10 flex justify-center items-center">
            <img src={Bell} className="w-10" />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <p className='text-white text-xs'>{data.notificationType}</p>
            <p className=" text-white">{data.content}</p>
            <p className="text-[#A9A9A9] text-xs">{getDate}</p>
          </div>
        </div>
      );
  }
  
  export default AlarmItem;