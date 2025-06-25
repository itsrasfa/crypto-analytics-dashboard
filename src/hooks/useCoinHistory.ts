import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useCoinStore } from "@/store/useCoinStore";

export const useCoinHistory = (days: number) => {
  const { history, setHistory } = useCoinStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ time: string; price: number }[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      if (history[days]) {
        setData(history[days]);
        return;
      }

      setLoading(true);

      const res = await api.get(`/coins/bitcoin/market_chart`, {
        params: { vs_currency: "usd", days },
      });

      const parsed = res.data.prices.map(
        ([timestamp, price]: [number, number]) => {
          const date = new Date(timestamp);
          const time = `${date.getMonth() + 1}/${date.getDate()}`;
          return { time, price };
        }
      );

      setHistory(days, parsed);
      setData(parsed);
      setLoading(false);
    }

    fetchHistory();
  }, [days, history, setHistory]);

  return { data, loading };
}
