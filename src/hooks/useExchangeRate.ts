import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export const useExchangeRate  = (from = 'USD', to = 'BRL') => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    api
      .get(`https://open.er-api.com/v6/latest/${from}`)
      .then((res) => {
        const rateValue = res.data?.rates?.[to];
        if (rateValue) {
          setRate(rateValue);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [from, to]);

  return { rate, loading, error };
}
