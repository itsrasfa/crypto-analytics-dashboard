import { create } from "zustand";
import { Coin } from "@/hooks/useGetCoins";

interface PricePoint {
  time: string;
  price: number;
}

interface CoinStore {
  coins: Coin[];
  loading: boolean;
  history: Record<number, PricePoint[]>;
  setCoins: (data: Coin[]) => void;
  setHistory: (days: number, data: PricePoint[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useCoinStore = create<CoinStore>((set) => ({
  coins: [],
  loading: true,
  history: {},
  setCoins: (data) => set({ coins: data }),
  setHistory: (days, data) =>
    set((state) => ({
      history: { ...state.history, [days]: data },
    })),
  setLoading: (loading) => set({ loading }),
}));
