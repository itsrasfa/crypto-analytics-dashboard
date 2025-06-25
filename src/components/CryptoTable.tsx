import Image from 'next/image';
import { useState, useMemo } from 'react';
import { Coin } from '@/hooks/useGetCoins';

interface CryptoTableProps {
  coins: Coin[];
  currency: 'BRL' | 'USD';
  exchangeRate: number;
  language: 'pt' | 'en';
}

const sortOptionsPt: { key: keyof Coin; label: string }[] = [
  { key: 'market_cap', label: 'Capitalização' },
  { key: 'current_price', label: 'Preço' },
  { key: 'price_change_percentage_24h', label: 'Variação 24h' },
  { key: 'total_volume', label: 'Volume 24h' },
  { key: 'name', label: 'Nome' },
];

const sortOptionsEn: { key: keyof Coin; label: string }[] = [
  { key: 'market_cap', label: 'Market Cap' },
  { key: 'current_price', label: 'Price' },
  { key: 'price_change_percentage_24h', label: '24h Change' },
  { key: 'total_volume', label: '24h Volume' },
  { key: 'name', label: 'Name' },
];

export function CryptoTable({
  coins,
  currency,
  exchangeRate,
  language,
}: CryptoTableProps) {
  const [sortKey, setSortKey] = useState<keyof Coin>('market_cap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedCoins = useMemo(() => {
    return [...coins].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [coins, sortKey, sortOrder]);

  const sortLabel = language === 'pt' ? 'Ordenar por:' : 'Sort by:';
  const toggleOrderTitle =
    language === 'pt' ? 'Inverter ordem' : 'Toggle order';
  const exportLabel = language === 'pt' ? 'Exportar CSV' : 'Export CSV';
  const sortOptions = language === 'pt' ? sortOptionsPt : sortOptionsEn;

  return (
    <div className="shadow-lg bg-white/5 backdrop-blur-md transition-shadow duration-300 ease-in-out p-4 rounded-lg mt-8">
      <div className="flex items-center flex-wrap justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm text-white flex-shrink-0">
            {sortLabel}
          </label>
          <div className="relative min-w-[150px]">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as keyof Coin)}
              className="shadow-lg bg-white/5 backdrop-blur-md text-white w-full text-sm rounded p-2 pr-8 outline-none appearance-none"
            >
              {sortOptions.map(({ key, label }) => (
                <option key={key} value={key} className="text-black">
                  {label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-white w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
            }
            className="text-white text-xl py-1 px-3 shadow-lg bg-white/5 backdrop-blur-md rounded cursor-pointer flex-shrink-0"
            title={toggleOrderTitle}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        <button
          onClick={() =>
            import('@/utils/exportToCsv').then(({ exportToCsv }) =>
              exportToCsv('crypto-data.csv', coins),
            )
          }
          className="w-full md:w-auto px-4 py-2 bg-[#8B79F7] text-[#101110] rounded text-sm hover:opacity-90 cursor-pointer"
        >
          {exportLabel}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCoins.map((coin) => {
          const priceConverted = coin.current_price * exchangeRate;
          const priceFormatted = priceConverted.toLocaleString(
            language === 'pt' ? 'pt-BR' : 'en-US',
            {
              style: 'currency',
              currency,
            },
          );

          return (
            <div
              key={coin.id}
              className="flex items-center justify-between shadow-lg bg-white/1 backdrop-blur-md transition-shadow duration-300 ease-in-out p-4 rounded-lg text-white"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <div>
                  <p className="text-sm font-semibold uppercase">
                    {coin.symbol}
                  </p>
                  <p className="text-xs text-gray-400">{coin.name}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm">{priceFormatted}</p>
                <p
                  className={`text-xs ${
                    coin.price_change_percentage_24h >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
