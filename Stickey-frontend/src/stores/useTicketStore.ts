import { create } from 'zustand';

interface SeatInfo {
  section: string;
  sectionId: number;
  seat: string[];
}

interface TicketStore {
  seatInfo: SeatInfo;
  setSelectInfo: (section: string, sectionId: number, seat: string[]) => void; 
  clearSeatInfo: () => void;
}

const useTicketStore = create<TicketStore>((set) => {
  const storedSeatInfo = JSON.parse(localStorage.getItem('seatInfo') || '{}');
  
  return {
    seatInfo: {
      section: storedSeatInfo.section || '',
      sectionId: storedSeatInfo.sectionId || 0,
      seat: storedSeatInfo.seat || []
    },
    setSelectInfo: (section, sectionId, seat) => {
      set({ seatInfo: { section, sectionId, seat } }); 
      localStorage.setItem('seatInfo', JSON.stringify({ section, sectionId, seat }));
    },
    clearSeatInfo: () => {
      set({ seatInfo: { section: '', sectionId: 0, seat: [] } });
      localStorage.removeItem('seatInfo');
    }
  };
});

export default useTicketStore;
