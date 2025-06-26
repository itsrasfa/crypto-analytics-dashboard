import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

export const MarketCapPieChart = ({
  coins,
  exchangeRate,
  currency,
  language,
}: {
  coins: {
    id: string;
    name: string;
    market_cap: number;
    symbol: string;
    image: string;
  }[];
  exchangeRate: number;
  currency: 'BRL' | 'USD';
  language: 'pt' | 'en';
}) => {
  const COIN_COLORS: Record<string, string> = {
    bitcoin: '#f7931a',
    ethereum: '#676C93',
    tether: '#26a17b',
    binancecoin: '#F0B90B',
    usdCoin: '#2775CA',
    ripple: '#346AA9',
    cardano: '#0033ad',
    solana: '#00FFA3',
    dogecoin: '#C2A633',
    polkadot: '#E6007A',
  };

  const top5 = coins.slice(0, 5);
  const data = top5.map((coin) => ({
    name: coin.name,
    value: Number(coin.market_cap) * Number(exchangeRate) || 0,
    symbol: coin.symbol.toUpperCase(),
    color: COIN_COLORS[coin.id] ?? '#888888',
  }));

  const title =
    language === 'pt'
      ? 'Top 5 Moedas por Valor de Mercado'
      : 'Top 5 Market Cap Coins';

  return (
    <div className="shadow-lg bg-white/5 backdrop-blur-md p-4 rounded-lg mt-2 text-white">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="40%"
            outerRadius={120}
            labelLine={false}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
              padding: '10px 14px',
            }}
            formatter={(value: number, name: string) => [
              value.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', {
                style: 'currency',
                currency,
                maximumFractionDigits: 0,
              }),
              name,
            ]}
            cursor={{ fill: 'rgba(255,255,255,0.1)' }}
          />
          <Legend
            verticalAlign="bottom"
            height={60}
            iconType="circle"
            formatter={(value: string) => (
              <span style={{ color: 'white', fontSize: 14 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
