'use client';

import { GameState } from '../types/gameState';
import Image from 'next/image';
import RotatingVideo from './RotatingVideo';
import localFont from 'next/font/local';
import ObjectiveTimers from './ObjectiveTimers';

const akiraBold = localFont({ src: '../fonts/AkiraBold.ttf' });

export default function TeamScoreBar({ gameState }: { gameState: GameState }) {
  const blueTeam = gameState.scoreboard.teams[0];
  const redTeam = gameState.scoreboard.teams[1];

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return { minutes, seconds };
  };

  const time = formatTime(gameState.gameTime);

  // Crear arrays de 4 posiciones para los dragones
  const blueDragons = Array(4).fill(null).map((_, i) => blueTeam.dragons[i] || null);
  const redDragons = Array(4).fill(null).map((_, i) => redTeam.dragons[i] || null).reverse();

  const renderHexagons = (wins: number, isBlueTeam: boolean) => {
    return (
      <div className="flex gap-2 mt-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`w-3 h-3 border border-white/30 rotate-45 ${
              index < wins 
                ? isBlueTeam 
                  ? 'bg-blueTeam' 
                  : 'bg-redTeam'
                : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center">
        <div className="relative">
          {/* Tag equipo azul */}
          <div className="absolute -left-32 top-0 w-32 h-20 bg-gray-900/70 border-l-4 border-blueTeam flex flex-col items-center justify-center">
            <span className={`${akiraBold.className} text-3xl text-white`}>{blueTeam.teamTag}</span>
            {renderHexagons(blueTeam.seriesScore.wins, true)}
          </div>

          {/* Tag equipo rojo */}
          <div className="absolute -right-32 top-0 w-32 h-20 bg-gray-900/70 border-r-4 border-redTeam flex flex-col items-center justify-center">
            <span className={`${akiraBold.className} text-3xl text-white`}>{redTeam.teamTag}</span>
            {renderHexagons(redTeam.seriesScore.wins, false)}
          </div>

          {/* Barra principal */}
          <div className="w-[800px] h-20 bg-gray-900/85 flex items-center justify-between px-4 relative">
            {/* Blue Side */}
            <div className="flex items-center gap-12 text-[#4985c4]">
              {/* Torre (extremo izquierdo) */}
              <span className="font-bold text-3xl flex items-center gap-2">
                <Image src="/images/tower.png" alt="Towers" width={28} height={28} />
                {blueTeam.towers}
              </span>
              
              {/* Oro (centro izquierdo) */}
              <span className="font-bold text-3xl flex items-center gap-2">
                <Image src="/images/goldcoin.png" alt="Gold" width={28} height={28} />
                {(blueTeam.gold/1000).toFixed(1)}K
              </span>
            </div>

            {/* Zona central con espada y kills */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
              <span className="font-bold text-3xl text-[#4985c4] mr-2">
                {blueTeam.kills}
              </span>
              <Image src="/images/sword.png" alt="Kills" width={60} height={60} />
              <span className="font-bold text-3xl text-[#a33835] ml-2">
                {redTeam.kills}
              </span>
            </div>

            {/* Red Side */}
            <div className="flex items-center gap-12 text-[#a33835]">
              {/* Oro (centro derecho) */}
              <span className="font-bold text-3xl flex items-center gap-2">
                <Image src="/images/goldcoin.png" alt="Gold" width={28} height={28} />
                {(redTeam.gold/1000).toFixed(1)}K
              </span>
              
              {/* Torre (extremo derecho) */}
              <span className="font-bold text-3xl flex items-center gap-2">
                <Image src="/images/tower.png" alt="Towers" width={28} height={28} />
                {redTeam.towers}
              </span>
            </div>
          </div>

          {/* Barra de tiempo y dragones */}
          <div className="w-[600px] h-10 bg-gray-900/40 -mt-1 mx-auto flex items-center justify-between px-8 rounded-b-lg">
            {/* Dragones equipo azul */}
            <div className="grid grid-cols-4 gap-1 w-[120px] justify-items-center">
              {blueDragons.map((dragon, index) => (
                <div key={index} className="w-6 h-6">
                  {dragon && (
                    <Image 
                      src={`/images/dragons/${dragon}.png`}
                      alt={dragon}
                      width={24}
                      height={24}
                      className="opacity-90"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Tiempo y grubs */}
            <div className="flex items-center justify-center gap-8">
              {/* Grubs azul */}
              <div className="flex items-center gap-2 text-white/90 font-bold text-xl">
                {blueTeam.grubs}
                <Image 
                  src="/images/voidgr.png"
                  alt="grubs"
                  width={24}
                  height={24}
                  className="opacity-90"
                />
              </div>

              {/* Tiempo */}
              <div className="font-bold text-2xl text-white/90 font-mono relative w-20 text-center">
                <span className="mr-1">{time.minutes}</span>
                <span className="absolute left-1/2 -translate-x-1/2">:</span>
                <span className="ml-1">{time.seconds}</span>
              </div>

              {/* Grubs rojo */}
              <div className="flex items-center gap-2 text-white/90 font-bold text-xl">
                <Image 
                  src="/images/voidgr.png"
                  alt="grubs"
                  width={24}
                  height={24}
                  className="opacity-90"
                />
                {redTeam.grubs}
              </div>
            </div>

            {/* Dragones equipo rojo */}
            <div className="grid grid-cols-4 gap-1 w-[120px] justify-items-center">
              {redDragons.map((dragon, index) => (
                <div key={index} className="w-6 h-6">
                  {dragon && (
                    <Image 
                      src={`/images/dragons/${dragon}.png`}
                      alt={dragon}
                      width={24}
                      height={24}
                      className="opacity-90"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ObjectiveTimers gameState={gameState} />
    </>
  );
} 