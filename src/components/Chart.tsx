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
}

export const Chart = ({ data, coinName, days, exchangeRate }: ChartProps) => {
  const convertedData = data.map(({ time, price }) => ({
    time,
    price: price * exchangeRate,
  }));

  return (
    <div
      className="p-4 sm:p-6 rounded-xl shadow-lg bg-white/5 backdrop-blur-md transition-shadow duration-300 ease-in-out mt-6 max-w-full"
      style={{ backgroundColor: '#101110' }}
    >
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
        Preço de {coinName} (Últimos {days} dias)
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
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                })
              }
              width={70}
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
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
              labelFormatter={(label) => `Data: ${label}`}
              labelStyle={{ color: '#aaa' }}
              cursor={{ stroke: '#CCFA29', strokeWidth: 2, opacity: 0.2 }}
            />
            <Area
              type="monotone"
              dataKey="price"
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
