import { useState } from 'react';

export interface CalendarDate {
  day: number;
  dayOfWeek: string;
}

const generateDate = (year:number, month:number):CalendarDate[] => {
    const result:CalendarDate[] = [];
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'short' });
      result.push({ day, dayOfWeek });
    }

    return result;
};

const Calendar = () => {
    const year = 2024;
    const month = 4;
    const calendarData = generateDate(year, month);
    const [ selectedDate, setSelectedDate ] = useState<number>(19);

    return (
        <div className="flex flex-row items-center text-white overflow-auto px-4">
            <div>
              <p className="text-[18px] w-12">{month + 1}월</p>
            </div>
            <div className="flex flex-row gap-7">
                {calendarData.map((item, id) => (
                  <div key={id} className={`flex flex-col items-center gap-1 ${selectedDate === item.day ? 'w-6 h-full border rounded-[10px] border-none bg-[#2E2E3D] text-white' : ''}`} onClick={() => setSelectedDate(item.day)}>
                    <button>
                      <p className='text-[12px]'>{item.day}</p>
                      <p className='text-[8px]'>{item.dayOfWeek}</p>
                    </button>
                  </div>
                ))}
            </div>
        </div>
    );
}

export default Calendar;
