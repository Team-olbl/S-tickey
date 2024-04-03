import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INotifyInfo } from '../types/Notify';

interface INotifyStore {
  notifyList: INotifyInfo[];
  addNotification: (notify: INotifyInfo) => void;
  initList: () => void;
}

const useNotifyStore = create(
  persist<INotifyStore>(
    set => {
      const storedNotifyList = localStorage.getItem('notify-store');
      const notifyList = storedNotifyList ? JSON.parse(storedNotifyList).state : [];

      // 기존 데이터 배열에 새 데이터 추가
      return {
        notifyList: notifyList,
        addNotification: (notify: INotifyInfo) => {
          set((state: INotifyStore) => {
            // 매개변수 타입 명시
            const isExist = state.notifyList.some(n => n.createdAt === notify.createdAt);
            if (!isExist) {
              const updatedList = [...state.notifyList, notify];
              localStorage.setItem('notify-store', JSON.stringify({ notifyList: updatedList }));
              return { notifyList: updatedList };
            }
            return state;
          });
        },
        initList: () => set({ notifyList: [] }),
      };
    },
    {
      name: 'notify-store',
    },
  ),
);

export default useNotifyStore;
