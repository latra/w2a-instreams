'use client';

import { GameState } from '../types/gameState';
import Image from 'next/image';

interface InhibitorStatusProps {
  gameState: GameState;
}

interface Inhibitor {
  timeTotal: number;
  timeLeft: number;
  subType: string;
}

const InhibitorIcon = ({ inhib, isBlueTeam }: { inhib: Inhibitor, isBlueTeam: boolean }) => {
  const isDestroyed = inhib.timeLeft > 0;
  
  return (
    <div className="relative mx-1">
      <Image
        src={isBlueTeam ? "/images/inhibitor-blue.svg" : "/images/inhibitor-red.svg"}   
        alt="Inhibitor"
        width={32}
        height={32}
        className={`${isDestroyed ? 'opacity-50' : ''}`}
      />
      {isDestroyed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[15px] font-mono text-white/90 px-1 rounded">
            {Math.floor(inhib.timeLeft / 60)}:{Math.floor(inhib.timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
};

export default function InhibitorStatus({ gameState }: InhibitorStatusProps) {
  const blueTeam = gameState.inhibitors?.find(team => team.side === 1);
  const redTeam = gameState.inhibitors?.find(team => team.side === 2);
  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 flex justify-between w-full px-8">
      {/* Inhibidores equipo azul */}
      {blueTeam && (
        <div className="flex items-center bg-gray-900/80 rounded p-2 ml-64">
          {blueTeam.inhibitors.map((inhib: Inhibitor, index: number) => (
            <InhibitorIcon key={index} inhib={inhib} isBlueTeam={true} />
          ))}
        </div>
      )}

      {/* Inhibidores equipo rojo */}
      {redTeam && (
        <div className="flex items-center bg-gray-900/80 rounded p-2 mr-64">
          {redTeam.inhibitors.map((inhib: Inhibitor, index: number) => (
            <InhibitorIcon key={index} inhib={inhib} isBlueTeam={false} />
          ))}
        </div>
      )}
    </div>
  );
} 
