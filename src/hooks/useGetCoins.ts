import { useEffect } from "react";
import { api } from "@/lib/api";
import { useCoinStore } from "@/store/useCoinStore";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_volume: number;
  circulating_supply?: number;
  max_supply?: number;
  ath?: number;
  atl?: number;
}

export const useGetCoins = () => {
  const { coins, setCoins, loading, setLoading } = useCoinStore();

  useEffect(() => {
    if (coins.length) return;

    const fetchCoins = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCoins(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [coins.length, setCoins, setLoading]);

  return { coins, loading };
};
