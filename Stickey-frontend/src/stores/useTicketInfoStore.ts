import create from 'zustand';
import { IGameSimpleRes } from '../types/Home';

// 모달 데이터 타입
export interface ModalDataState {
  modalData: IGameSimpleRes | null;
  setModalData: (data: IGameSimpleRes | null) => void;
}

// Zustand 스토어 생성
export const useTicketInfoStore = create<ModalDataState>((set) => ({
  modalData: null,
  setModalData: (data) => set({ modalData: data }),
}));
