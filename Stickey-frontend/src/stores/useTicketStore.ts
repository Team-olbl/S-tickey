import { create } from 'zustand';

interface SeatInfo {
  section: string;
  sectionId: number;
  sectionPrice: number;
  seat: number[];
}

interface TicketStore {
  seatInfo: SeatInfo;
  setSelectInfo: (section: string, sectionId: number, sectionPrice: number, seat: number[]) => void;
  clearSeatInfo: () => void;
}

const useTicketStore = create<TicketStore>(set => {
  const storedSeatInfo = JSON.parse(localStorage.getItem('seatInfo') || '{}');

  return {
    seatInfo: {
      section: storedSeatInfo.section || '',
      sectionId: storedSeatInfo.sectionId || 0,
      sectionPrice: storedSeatInfo.sectionPrice || 0,
      seat: storedSeatInfo.seat || [],
    },
    setSelectInfo: (section, sectionId, sectionPrice, seat) => {
      set({ seatInfo: { section, sectionId, sectionPrice, seat } });
      localStorage.setItem('seatInfo', JSON.stringify({ section, sectionId, sectionPrice, seat }));
    },
    clearSeatInfo: () => {
      set({ seatInfo: { section: '', sectionId: 0, sectionPrice: 0, seat: [] } });
      localStorage.removeItem('seatInfo');
    },
  };
});

export default useTicketStore;
