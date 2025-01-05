'use client';

import { GameState, Team } from '../types/gameState';
import Image from 'next/image';

interface ObjectiveTimerProps {
  gameState: GameState;
}
const getAssetUrl = (path: string) => {
  if (!path) return '';
  return `http://localhost:5000/${path}`;
};
export default function ObjectiveTimers({ gameState }: ObjectiveTimerProps) {
    
  const formatTime = (time: number) => {
    if (time <= 0) return '00:00';
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const calculateProgress = (time: number, maxTime: number = 360) => {
    if (time <= 0) return 0;
    return ((maxTime-time) / maxTime) * 100;
  };
  const renderPowerPlay = (team: Team, color: string, time: number, icon: string, alt: string) => {
    console.log(team.baronPowerPlay);
    const progress = calculateProgress(team.baronPowerPlay.timeLeft, team.baronPowerPlay.timeTotal);
    const isAvailable = time <= 0;
    
    return (
      <div className={`w-64 h-24 ${color === 'blue' ? 'bg-[#0f355d]/40' : 'bg-[#4c1918]/70'} rounded-lg flex flex-col items-center justify-center relative overflow-hidden animate-fadeIn`}>
        
        {/* Barra de progreso */}
        <div 
          className={`absolute bottom-0 left-0 h-1 ${color === 'blue' ? 'bg-blueTeam/90' : 'bg-redTeam/90'}`}
          style={{ width: `${progress}%` }}
        />

        {/* Contenido */}
        <div className="flex items-center gap-4">
          <Image 
            src={getAssetUrl(icon)}
            alt={alt}
            width={64}
            height={64}
            className={`opacity-90 transition-all duration-300 ${isAvailable ? 'scale-110' : ''}`}
          />
          
          <div className="flex flex-col items-center justify-center h-full">
          <span className="font-mono text-white/90 font-bold text-lg">
                POWER PLAY
            </span>
            <span className="font-mono text-white/90 font-bold text-lg">
              <div className="flex items-center text-xl">
                {(team.baronPowerPlay.gold).toFixed(0)}
                <Image 
                  src={'./images/goldcoin.png'}
                  alt="Gold Coin"
                  width={16}
                  height={16}
                  className="ml-1"
                />
              </div>
              <div className="flex items-center text-xl mt-1">
                {formatTime(team.baronPowerPlay.timeLeft)}
              </div>
            </span>
          </div>
        </div>

        {/* Dark gray box overlay */}
      </div>
    );
  };
  const renderTimer = (time: number, icon: string, alt: string, maxTime: number = 360) => {
    const progress = calculateProgress(time, maxTime);
    const isAvailable = time <= 0;
    
    return (
      <div className="w-24 h-24 bg-gray-900/70 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
        {/* Barra de progreso */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-avalanche"
          style={{ width: `${progress}%` }}
        />
        
        {/* Contenido */}
        <div className="flex flex-col items-center gap-1">
          <Image 
            src={getAssetUrl(icon)}
            alt={alt}
            width={isAvailable ? 48 : 32}
            height={isAvailable ? 48 : 32}
            className={`opacity-90 transition-all duration-300 ${isAvailable ? 'scale-110' : ''}`}
          />
          {!isAvailable && (
            <span className="font-mono text-white/90 font-bold text-lg">
              {formatTime(time)}
            </span>
          )}
        </div>
      </div>
    );
  };
  console.log(gameState.scoreboard.teams[0].baronPowerPlay);
  console.log(gameState.scoreboard.teams[1].baronPowerPlay);

  return (
    <div className="fixed top-0 left-0 right-0">
      {/* Baron Timer */}
      <div className="absolute left-0">
        {(gameState.scoreboard.teams[0].baronPowerPlay === null || gameState.scoreboard.teams[0].baronPowerPlay.timeLeft < 0) && (gameState.scoreboard.teams[1].baronPowerPlay === null || gameState.scoreboard.teams[1].baronPowerPlay.timeLeft < 0) && renderTimer(gameState.baronPitTimer.timeLeft, gameState.baronPitTimer.subType, 'Baron', gameState.baronPitTimer.timeTotal)}
        {(gameState.scoreboard.teams[0].baronPowerPlay !== null && gameState.scoreboard.teams[0].baronPowerPlay.timeLeft > 0) && renderPowerPlay(gameState.scoreboard.teams[0], 'blue', gameState.baronPitTimer.timeLeft, gameState.baronPitTimer.subType, 'Baron')}
        {(gameState.scoreboard.teams[1].baronPowerPlay !== null && gameState.scoreboard.teams[1].baronPowerPlay.timeLeft > 0) && renderPowerPlay(gameState.scoreboard.teams[1], 'red', gameState.baronPitTimer.timeLeft, gameState.baronPitTimer.subType, 'Baron')}
      </div>
      
      {/* Dragon Timer */}
      <div className="absolute right-0">
        {gameState.scoreboard.teams[0].dragonPowerPlay === null && gameState.scoreboard.teams[1].dragonPowerPlay === null && renderTimer(gameState.dragonPitTimer.timeLeft, gameState.dragonPitTimer.subType, 'Dragon', gameState.dragonPitTimer.timeTotal)}
      </div>
    </div>
  );
} 