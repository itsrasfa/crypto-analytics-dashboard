import { Coin } from '@/hooks/useGetCoins';

interface CoinDetailsProps {
  coin: Coin;
  exchangeRate: number;
  currency: 'BRL' | 'USD';
  language: 'pt' | 'en';
}

const formatCurrency = (
  value: number | null | undefined,
  currency: 'BRL' | 'USD',
  language: 'pt' | 'en',
) =>
  value != null
    ? value.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', {
        style: 'currency',
        currency,
      })
    : language === 'pt'
    ? 'N/A'
    : 'N/A';

const formatNumber = (value: number | undefined | null) =>
  value != null ? value.toLocaleString() : 'N/A';

const formatMaxSupply = (
  value: number | undefined | null,
  language: 'pt' | 'en',
) => (value != null ? value.toLocaleString() : language === 'pt' ? '∞' : '∞');

export const CoinDetails = ({
  coin,
  currency,
  language,
}: CoinDetailsProps) => {
  const title =
    language === 'pt' ? `${coin.name} Visão Geral` : `${coin.name} Overview`;
  const labels = {
    marketCap: language === 'pt' ? 'Valor de Mercado' : 'Market Cap',
    volume: language === 'pt' ? 'Volume 24h' : '24h Volume',
    circulatingSupply:
      language === 'pt' ? 'Oferta Circulante' : 'Circulating Supply',
    maxSupply: language === 'pt' ? 'Oferta Máxima' : 'Max Supply',
    ath: language === 'pt' ? 'Maior Preço (ATH)' : 'All Time High (ATH)',
    atl: language === 'pt' ? 'Menor Preço (ATL)' : 'All Time Low (ATL)',
  };

  return (
    <div className="shadow-lg bg-white/5 backdrop-blur-md transition-shadow duration-300 ease-in-out p-4 rounded-lg mt-2">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-3 text-base">
        <li className="flex justify-between">
          <span className="text-gray-400">{labels.marketCap}:</span>
          <span>{formatCurrency(coin.market_cap, currency, language)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{labels.volume}:</span>
          <span>{formatCurrency(coin.total_volume, currency, language)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{labels.circulatingSupply}:</span>
          <span>{formatNumber(coin.circulating_supply)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{labels.maxSupply}:</span>
          <span>{formatMaxSupply(coin.max_supply, language)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{labels.ath}:</span>
          <span>{formatCurrency(coin.ath, currency, language)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{labels.atl}:</span>
          <span>{formatCurrency(coin.atl, currency, language)}</span>
        </li>
      </ul>
    </div>
  );
};
