'use client';
import { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

import { useCoinHistory } from '@/hooks/useCoinHistory';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { useGetCoins } from '@/hooks/useGetCoins';
import { useCurrencyStore } from '@/store/useCurrencyStore';

import { SummaryCard } from '@/components/SummaryCard';
import { CryptoTable } from '@/components/CryptoTable';
import { Chart } from '@/components/Chart';
import { MarketCapPieChart } from '@/components/MarketCapPieChart';
import { CoinDetails } from '@/components/CoinDetails';

const dateOptions = [
  { labelPt: '7 dias', labelEn: '7 days', value: 7 },
  { labelPt: '30 dias', labelEn: '30 days', value: 30 },
  { labelPt: '60 dias', labelEn: '60 days', value: 60 },
  { labelPt: '90 dias', labelEn: '90 days', value: 90 },
];

export default function DashboardPage() {
  const [days, setDays] = useState(7);
  const { currency, language, exchangeRate, setExchangeRate, toggleBoth } =
    useCurrencyStore();
  const { coins, loading: coinsLoading } = useGetCoins();
  const { data: priceHistory, loading: chartLoading } = useCoinHistory(days);
  const {
    rate,
    loading: rateLoading,
    error: rateError,
  } = useExchangeRate('USD', currency);

  useEffect(() => {
    if (rate && !rateError) {
      setExchangeRate(rate);
    }
  }, [rate, rateError, setExchangeRate]);

  if (coinsLoading) return <div className="text-white">Loading...</div>;

  const highest = coins[0];
  const lowest = [...coins].sort(
    (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
  )[0];

  const labels = {
    highestCap:
      language === 'pt' ? 'Maior Capitalização' : 'Highest Market Cap',
    highestGain: language === 'pt' ? 'Maior Alta (24h)' : 'Highest Gain (24h)',
    highestLoss: language === 'pt' ? 'Maior Queda (24h)' : 'Highest Loss (24h)',
    totalVolume: language === 'pt' ? 'Volume Total' : 'Total Volume',
    bitcoinHistory:
      language === 'pt' ? 'Histórico do Bitcoin' : 'Bitcoin History',
  };

  return (
    <main className="p-4 sm:p-6 bg-black min-h-screen text-white max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-6 p-5 rounded-lg bg-white/5 backdrop-blur-md shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#8B79F7]">
          {language === 'pt' ? 'Análise de Criptomoedas' : 'Crypto Analytics'}
        </h1>
        <button
          onClick={toggleBoth}
          aria-label="Toggle language and currency"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/2 hover:bg-white/5 transition-colors duration-300 backdrop-blur-lg shadow-lg font-semibold text-sm cursor-pointer"
        >
          {language === 'pt' ? '🇧🇷 PT ' : '🇺🇸 EN'}
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard title={labels.highestCap} value={highest.name} />
        <SummaryCard
          title={labels.highestGain}
          value={`${highest.price_change_percentage_24h.toFixed(2)}%`}
          color="text-green-400"
        />
        <SummaryCard
          title={labels.highestLoss}
          value={`${lowest.price_change_percentage_24h.toFixed(2)}%`}
          color="text-red-400"
        />
        <SummaryCard
          title={labels.totalVolume}
          value={highest.total_volume.toLocaleString(
            language === 'pt' ? 'pt-BR' : 'en-US',
            {
              style: 'currency',
              currency,
            },
          )}
        />
      </div>

      <section>
        <div className="flex flex-wrap items-center gap-2 justify-between mb-2">
          <h2 className="text-lg sm:text-xl font-semibold">
            {labels.bitcoinHistory}
          </h2>
          <div className="flex flex-wrap gap-2">
            {dateOptions.map(({ labelPt, labelEn, value }) => (
              <button
                key={value}
                onClick={() => setDays(value)}
                className={`px-3 py-1 rounded cursor-pointer text-sm min-w-[60px] text-center ${
                  days === value
                    ? 'bg-[#8B79F7] text-[#101110]'
                    : 'bg-[#222222] hover:bg-transparent'
                }`}
                disabled={chartLoading}
              >
                {language === 'pt' ? labelPt : labelEn}
              </button>
            ))}
          </div>
        </div>

        {chartLoading || rateLoading ? (
          <div className="text-white text-center py-20">
            <BeatLoader size={20} color="#8B79F7" />
          </div>
        ) : (
          <Chart
            data={priceHistory}
            coinName={language === 'pt' ? 'Bitcoin' : 'Bitcoin'}
            days={days}
            exchangeRate={exchangeRate}
          />
        )}
      </section>

      <section className="mt-8 overflow-x-auto">
        <CryptoTable
          coins={coins}
          currency={currency}
          exchangeRate={exchangeRate}
          language={language}
        />
      </section>

      <div className="grid lg:grid-cols-2 gap-4 mt-10">
        <MarketCapPieChart
          coins={coins}
          language={language}
          currency={currency}
          exchangeRate={exchangeRate}
        />
        <CoinDetails
          coin={coins[0]}
          language={language}
          currency={currency}
          exchangeRate={exchangeRate}
        />
      </div>
    </main>
  );
}
