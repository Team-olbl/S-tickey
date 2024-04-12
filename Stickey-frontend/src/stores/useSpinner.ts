import { create } from 'zustand';

interface Spinner {
  isLoading: boolean;
  setIsLoading: () => void;
  unSetIsLoading: () => void;
}

const useSpinner = create<Spinner>(set => ({
  isLoading: false,
  setIsLoading: () => set({ isLoading: true }),
  unSetIsLoading: () => set({ isLoading: false }),
}));
export default useSpinner;
