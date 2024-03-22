import { create } from 'zustand';

interface SeatInfo {
  section: string;
  seat: string[];
}

interface TicketStore {
  seatInfo: SeatInfo;
  setSelectInfo: (section: string, seat: string[]) => void;
  clearSeatInfo: () => void;
}

const useTicketStore = create<TicketStore>((set) => {
  // 로컬 스토리지에서 데이터 불러오기
  const storedSeatInfo = JSON.parse(localStorage.getItem('seatInfo') || '{}');
  
  return {
    seatInfo: storedSeatInfo || { section: '', seat: [] },
    setSelectInfo: (section, seat) => {
      set({ seatInfo: { section, seat } });
      localStorage.setItem('seatInfo', JSON.stringify({ section, seat }));
    },
    clearSeatInfo: () => {
      set({ seatInfo: { section: '', seat: [] } });
      localStorage.removeItem('seatInfo');
    }
  };
});

export default useTicketStore;
