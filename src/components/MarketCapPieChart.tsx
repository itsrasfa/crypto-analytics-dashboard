import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const COLORS = ['#CCFA29', '#D6FB54', '#E0FC7F', '#EBFDAA', '#F5FED5'];

interface PieChartMarketCapProps {
  coins: {
    id: string;
    name: string;
    market_cap: number;
  }[];
  exchangeRate: number;
  currency: 'BRL' | 'USD';
  language: 'pt' | 'en';
}

export const MarketCapPieChart = ({
  coins,
  exchangeRate,
  currency,
  language,
}: PieChartMarketCapProps) => {
  const top5 = coins.slice(0, 5);
  const data = top5.map((coin) => ({
    name: coin.name,
    value: coin.market_cap * exchangeRate,
  }));

  const title =
    language === 'pt'
      ? 'Top 5 Moedas por Valor de Mercado'
      : 'Top 5 Market Cap Coins';

  return (
    <div className="shadow-lg bg-white/5 backdrop-blur-md transition-shadow duration-300 ease-in-out p-4 rounded-lg mt-2 text-white">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({ name, percent }) =>
              `${name}: ${(percent! * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
