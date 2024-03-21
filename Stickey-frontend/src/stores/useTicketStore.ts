import create from 'zustand';

interface SeatInfo {
  section: string;
  seat: string;
}

interface TicketStore {
  seatInfo: SeatInfo;
  setSelectInfo: (section: string, seat: string) => void;
}

const useTicketStore = create<TicketStore>((set) => ({
  seatInfo: {
    section: '',
    seat: '',
  },
  setSelectInfo: (section, seat) => set({ seatInfo: { section, seat } }),
}));

export default useTicketStore;
