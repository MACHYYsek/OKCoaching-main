interface StatisticsCardProps {
  value: string;
  label: string;
}

export default function StatisticsCard({ value, label }: StatisticsCardProps) {
  return (
    <div className="bg-[#222223] rounded-xl p-4 relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-xl font-bold">{value}</div>
        <div className="text-sm text-[#BCBCBC]">{label}</div>
      </div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-tr from-[#00EDFF]/20 to-transparent" />
      </div>
    </div>
  );
}