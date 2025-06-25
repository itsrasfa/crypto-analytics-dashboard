interface SummaryCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export const SummaryCard = ({
  title,
  value,
  color = 'text-white',
}: SummaryCardProps) => {
  return (
    <div
      className="p-4 rounded-lg w-full shadow-lg bg-white/5 backdrop-blur-md transition-shadow duration-300 ease-in-out
                 hover:shadow-[0px_0_20px_10px_rgba(204,250,41,0.1)]"
    >
      <p className="text-sm text-gray-300">{title}</p>
      <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
    </div>
  );
};
