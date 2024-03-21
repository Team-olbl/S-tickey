import React, { useState } from 'react';

export interface CalendarInfo { 
  day: number; 
  dayOfWeek: string;
}

const generateDate = (year: number, month: number): CalendarInfo[] => { 
  const result: CalendarInfo[] = []; 
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
  const [selectedMonth, setSelectedMonth] = useState<number>(3);
  const [selectedDate, setSelectedDate] = useState<number>(19);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    setSelectedMonth(parseInt(e.target.value));
    console.log(selectedMonth)
  };

  const calendarData = generateDate(year, selectedMonth - 1);

  return ( 
    <div className="flex flex-row items-center  text-white overflow-auto px-4">
      <div className=''>
        <select value={selectedMonth} onChange={handleMonthChange} className="text-center text-white bg-Stickey_BGC rounded-md mr-4 appearance-none focus:outline-none"> 
          <option value={1}>1월</option>
          <option value={2}>2월</option>
          <option value={3}>3월</option>
          <option value={4}>4월</option>
          <option value={5}>5월</option>
          <option value={6}>6월</option>
          <option value={7}>7월</option>
          <option value={8}>8월</option>
          <option value={9}>9월</option>
          <option value={10}>10월</option>
          <option value={11}>11월</option>
          <option value={12}>12월</option>
        </select> 
      </div>
      <div className="flex flex-row gap-7"> 
        {calendarData.map((item, id) => (
          <div key={id} className={`flex flex-col items-center gap-1 ${selectedDate === item.day ? 'w-6 h-full border rounded-[10px] border-none bg-[#2E2E3D] text-white' : ''}`} onClick={() => setSelectedDate(item.day)}> 
            <button> 
              <p className='text-[14px]'>{item.day}</p>
              <p className='text-[10px]'>{item.dayOfWeek}</p>
            </button> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
