import { create } from 'zustand';
import { IGameSimpleRes } from '../types/Home';

export interface ModalDataState {
  modalData: IGameSimpleRes | null;
  setModalData: (data: IGameSimpleRes | null) => void;
}

export const useTicketInfoStore = create<ModalDataState>(set => ({
  modalData: null,
  setModalData: data => set({ modalData: data }),
}));
