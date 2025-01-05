'use client';

import { GameState } from '../types/gameState';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface GoldGraphProps {
  gameState: GameState;
}

export default function GoldGraph({ gameState }: GoldGraphProps) {
  if (!gameState.goldGraph?.current?.goldAtTime) return null;

  const data = Object.entries(gameState.goldGraph.current.goldAtTime).map(([time, values]) => ({
    time: Number(time),
    goldDiff: values["1"] - values["2"]
  }));

  const higherBlueDiff = Math.max(...data.map(d => d.goldDiff));
  const higherRedDiff = Math.min(...data.map(d => d.goldDiff));
  const maxAbsValue = Math.max(...data.map(d => Math.abs(d.goldDiff)));
  const offset = ((higherBlueDiff / (higherBlueDiff + Math.abs(higherRedDiff))) * 100).toFixed(2);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatGold = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${(value / 1000).toFixed(1)}k`;
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center animate-fadeIn">
      <div className="w-[750px] h-[220px] bg-gray-900/80 rounded-t-lg">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4985c4" stopOpacity={0.9} />
                <stop offset={`${offset}%`} stopColor="#4985c4" stopOpacity={1} />
                <stop offset={`${offset}%`} stopColor="#a33835" stopOpacity={1} />
                <stop offset="100%" stopColor="#a33835" stopOpacity={0.9} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tickFormatter={formatTime}
              stroke="#ffffff"
              tick={{ fill: '#ffffffca', fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={formatGold}
              stroke="#ffffff"
              tick={{ fill: '#ffffffca', fontSize: 12 }}
              domain={[-maxAbsValue, maxAbsValue]}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#00000099', border: 'none' }}
              labelFormatter={formatTime}
              formatter={(value: number) => [formatGold(value), 'Diferencia de oro']}
            />
            <ReferenceLine 
              y={0} 
              stroke="#ffffff50" 
              strokeDasharray="3 3"
            />
            <Area 
              type="monotone" 
              dataKey="goldDiff"
              opacity={1}
              fill="url(#splitColor)"
              stroke="#4985c4"
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Area 
              type="monotone" 
              dataKey="goldDiff"
              fill="url(#splitColor)"
              stroke="#1f1f1f"
              strokeWidth={1}
              isAnimationActive={false}
              baseValue={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 