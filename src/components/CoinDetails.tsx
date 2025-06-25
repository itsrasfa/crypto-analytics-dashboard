import { Coin } from '@/hooks/useGetCoins';

interface CoinDetailsProps {
  coin: Coin;
  exchangeRate: number;
  currency: 'BRL' | 'USD';
  language: 'pt' | 'en';
}

export const CoinDetails = ({
  coin,
  exchangeRate,
  currency,
  language,
}: CoinDetailsProps) => {
  const formatCurrency = (value?: number | null) =>
    value !== undefined && value !== null
      ? (value * exchangeRate).toLocaleString(
          language === 'pt' ? 'pt-BR' : 'en-US',
          {
            style: 'currency',
            currency,
          },
        )
      : language === 'pt'
      ? 'N/A'
      : 'N/A';

  const title =
    language === 'pt' ? `${coin.name} Visão Geral` : `${coin.name} Overview`;
  const circulatingSupplyLabel =
    language === 'pt' ? 'Oferta Circulante' : 'Circulating Supply';
  const maxSupplyLabel = language === 'pt' ? 'Oferta Máxima' : 'Max Supply';
  const athLabel =
    language === 'pt' ? 'Maior Preço (ATH)' : 'All Time High (ATH)';
  const atlLabel =
    language === 'pt' ? 'Menor Preço (ATL)' : 'All Time Low (ATL)';
  const marketCapLabel = language === 'pt' ? 'Valor de Mercado' : 'Market Cap';
  const volumeLabel = language === 'pt' ? 'Volume 24h' : '24h Volume';

  return (
    <div className="shadow-lg bg-white/5 backdrop-blur-md transition-shadow duration-300 ease-in-out p-4 rounded-lg mt-2">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-3 text-base">
        <li className="flex justify-between">
          <span className="text-gray-400">{marketCapLabel}:</span>
          <span>{formatCurrency(coin.market_cap)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{volumeLabel}:</span>
          <span>{formatCurrency(coin.total_volume)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{circulatingSupplyLabel}:</span>
          <span>
            {coin.circulating_supply?.toLocaleString() ??
              (language === 'pt' ? 'N/A' : 'N/A')}
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{maxSupplyLabel}:</span>
          <span>{coin.max_supply?.toLocaleString() ?? '∞'}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{athLabel}:</span>
          <span>{formatCurrency(coin.ath)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">{atlLabel}:</span>
          <span>{formatCurrency(coin.atl)}</span>
        </li>
      </ul>
    </div>
  );
};
