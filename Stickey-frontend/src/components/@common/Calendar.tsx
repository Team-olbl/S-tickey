import React, { useEffect, useRef, useState } from 'react';

export interface CalendarInfo {
  day: number;
  dayOfWeek: string;
}

interface CalendarProps {
  onDateClick: (day: number, month: number, year:number) => void;
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

const Calendar: React.FC<CalendarProps> = ({ onDateClick }) => {
  const today = new Date();
  const year = today.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number>(today.getDate());
  const [calendarData, setCalendarData] = useState<CalendarInfo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCalendarData(generateDate(year, selectedMonth));
  }, [year, selectedMonth]);

  useEffect(() => {
    const today = new Date();
    const todayElement = document.querySelector(`[data-day="${today.getDate()}"]`);
    if (todayElement && containerRef.current) {
      containerRef.current.scrollLeft = todayElement.getBoundingClientRect().left - containerRef.current.getBoundingClientRect().left;
    }
  }, []);
  

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value) - 1);
  };

  const handleClick = (day: number) => {
    setSelectedDate(day);
    onDateClick(day, selectedMonth + 1, year);
  }

  const getDayColor = (dayOfWeek: string) => {
    switch (dayOfWeek) {
      case '토':
        return 'text-blue-500';
      case '일':
        return 'text-red-500';
      default:
        return '';
    }
  }

  return (
    <div className="flex flex-row text-white px-4 py-2" ref={containerRef}>
      <div className='h-[36px] flex items-center'>
        <select value={selectedMonth + 1} onChange={handleMonthChange} className="text-center text-white bg-Stickey_BGC rounded-md mr-4 appearance-none focus:outline-none">
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
      <div className="flex flex-row gap-7 overflow-auto">
        {calendarData.map((item, id) => (
          <div key={id} className={`flex flex-col w-2 items-center px-3 ${selectedDate === item.day ? 'w-6 h-full border rounded-[10px] border-none bg-gray-600 text-white' : ''}`} onClick={() => handleClick(item.day)} data-day={item.day}>
          <button>
            <p className={`text-[14px] ${getDayColor(item.dayOfWeek)}`}>{item.day}</p>
            <p className={`text-[10px] ${getDayColor(item.dayOfWeek)}`}>{item.dayOfWeek}</p>
          </button>
        </div>
      ))}
    </div>
  </div>
);
};

export default Calendar;



