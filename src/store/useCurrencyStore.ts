import { create } from 'zustand';

interface CurrencyState {
  currency: 'USD' | 'BRL';
  language: 'en' | 'pt';
  exchangeRate: number;
  loading: boolean;
  toggleCurrency: () => void;
  toggleLanguage: () => void;
  toggleBoth: () => void;
  setExchangeRate: (rate: number) => void;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: 'BRL',
  language: 'pt',
  exchangeRate: 1,
  loading: false,
  toggleCurrency: () =>
    set((state) => ({ currency: state.currency === 'USD' ? 'BRL' : 'USD' })),
  toggleLanguage: () =>
    set((state) => ({ language: state.language === 'pt' ? 'en' : 'pt' })),
  toggleBoth: () => {
    const { currency, language } = get();
    set({
      currency: currency === 'USD' ? 'BRL' : 'USD',
      language: language === 'pt' ? 'en' : 'pt',
    });
  },
  setExchangeRate: (rate) => set({ exchangeRate: rate }),
}));
