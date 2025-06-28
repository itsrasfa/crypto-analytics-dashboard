import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface ChartProps {
  data: { time: string; price: number }[];
  coinName: string;
  days: number;
  exchangeRate: number;
  currency: 'BRL' | 'USD';
  language: 'pt' | 'en';
}

export const Chart = ({
  data,
  coinName,
  days,
  exchangeRate,
  currency,
  language,
}: ChartProps) => {
  const safeCurrency = currency || 'USD';

  const convertedData = data.map(({ time, price }) => {
    const [day, month] = time.split('/');
    const formattedTime =
      language === 'pt' ? `${day}/${month}` : `${month}/${day}`;

    return {
      time: formattedTime,
      convertedPrice: price * exchangeRate,
    };
  });

  const priceLabel = language === 'pt' ? 'Preço' : 'Price';

  return (
    <div
      className="p-4 sm:p-6 rounded-xl shadow-lg bg-white/5 backdrop-blur-md transition-shadow duration-300 ease-in-out mt-6 max-w-full"
      style={{ backgroundColor: '#101110' }}
    >
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
        {language === 'pt'
          ? `Preço de ${coinName} (Últimos ${days} dias)`
          : `${coinName} Price (Last ${days} days)`}
      </h2>

      <div className="w-full h-[220px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={convertedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#333" strokeDasharray="5 5" />
            <XAxis
              dataKey="time"
              stroke="#bbb"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#444' }}
              interval={Math.floor(convertedData.length / 7)}
            />
            <YAxis
              stroke="#bbb"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#444' }}
              domain={['auto', 'auto']}
              tickFormatter={(value) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: safeCurrency,
                  maximumFractionDigits: 0,
                })
              }
              width={70}
              label={{
                value: priceLabel,
                angle: -90,
                position: 'insideLeft',
                fill: '#bbb',
                fontSize: 14,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#222',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                fontSize: 14,
                padding: '10px 14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
              }}
              formatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: safeCurrency,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
              labelFormatter={(label) =>
                language === 'pt' ? `Data: ${label}` : `Date: ${label}`
              }
              labelStyle={{ color: '#aaa' }}
              cursor={{ stroke: '#CCFA29', strokeWidth: 2, opacity: 0.2 }}
            />
            <Area
              type="monotone"
              dataKey="convertedPrice"
              name={priceLabel}
              stroke="#CCFA29"
              fill="url(#gradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                stroke: '#CCFA29',
                strokeWidth: 3,
                fill: '#101110',
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CCFA29" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#CCFA29" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
