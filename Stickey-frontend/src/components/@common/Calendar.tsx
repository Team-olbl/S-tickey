import React, { useEffect, useRef, useState } from 'react';

export interface CalendarInfo {
  day: number;
  dayOfWeek: string;
}

interface CalendarProps {
  onDateClick: (day: number, month: number, year: number) => void;
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

  const [flag, setFlag] = useState<boolean>(false);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const todayDate = new Date().getDate();

  // 오늘 날짜를 중앙에 보이도록
  useEffect(() => {
    if (!dateRef.current) return;
    const left = dateRef.current!.offsetLeft - window.innerWidth / 2 + dateRef.current.offsetWidth;
    containerRef.current?.scrollTo({ left: left, behavior: 'smooth' });
  }, [flag, selectedMonth]);

  useEffect(() => {
    setCalendarData(generateDate(year, selectedMonth));
    setFlag(true);
  }, [year, selectedMonth]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value) - 1);
    setSelectedDate(1);
    onDateClick(1, parseInt(e.target.value), year);
  };

  const handleClick = (day: number) => {
    setSelectedDate(day);
    onDateClick(day, selectedMonth + 1, year);
  };

  const getDayColor = (dayOfWeek: string) => {
    switch (dayOfWeek) {
      case '토':
        return 'text-blue-500';
      case '일':
        return 'text-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-row text-white px-4 py-4">
      <div className="h-[36px] flex items-center">
        <select
          value={selectedMonth + 1}
          onChange={handleMonthChange}
          className="text-center text-white bg-Stickey_BGC focus:outline-none"
        >
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
      <div ref={containerRef} className="flex flex-row gap-5 overflow-auto pl-4">
        {calendarData.map((item, id) => (
          <div
            key={id}
            ref={todayDate == item.day ? dateRef : undefined}
            className={`flex flex-col  items-center px-3 ${selectedDate === item.day ? 'rounded-2xl bg-gray-600 text-white' : ''}`}
            onClick={() => handleClick(item.day)}
            data-day={item.day}
          >
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
