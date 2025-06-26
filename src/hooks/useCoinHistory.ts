import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useCoinStore } from "@/store/useCoinStore";

export const useCoinHistory = (days: number) => {
  const { history, setHistory } = useCoinStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ time: string; price: number }[]>([]);

  useEffect(() => {
    if (history[days]) {
      setData(history[days]);
      return;
    }

    const fetchHistory = async () => {
      try {
        setLoading(true);

        const { data: response } = await api.get(`/coins/bitcoin/market_chart`, {
          params: { vs_currency: "usd", days },
        });

        const parsed = response.prices.map(([timestamp, price]: [number, number]) => {
          const date = new Date(timestamp);

          const time = `${date.getDate()}/${date.getMonth() + 1}`;
          return { time, price };
        });

        setHistory(days, parsed);
        setData(parsed);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [days, history, setHistory]);

  return { data, loading };
};
