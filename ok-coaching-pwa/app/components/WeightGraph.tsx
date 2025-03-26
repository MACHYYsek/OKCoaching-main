import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '1.9.', weight: 71.0 },
  { date: '10.9.', weight: 72.3 },
  { date: '20.9.', weight: 71.3 },
  { date: '1.10.', weight: 69.9 },
];

export default function WeightGraph() {
  return (
    <div className="relative h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="date" 
            stroke="#BCBCBC" 
            fontSize={12}
          />
          <YAxis 
            domain={['dataMin - 1', 'dataMax + 1']} 
            stroke="#BCBCBC" 
            fontSize={12}
            width={30}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#222223] p-2 rounded-lg border border-[#333]">
                    <p className="text-[#00EDFF]">{`${payload[0].value} kg`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="weight" 
            stroke="#00EDFF" 
            strokeWidth={2} 
            dot={{ fill: '#00EDFF', r: 4 }}
            activeDot={{ r: 6, fill: '#00EDFF' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}