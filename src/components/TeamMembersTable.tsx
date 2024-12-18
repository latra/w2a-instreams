'use client';

import { GameState, PlayerScore, ItemInBoard } from '../types/gameState';
import Image from 'next/image';

interface TeamMembersTableProps {
  gameState: GameState;
}

const getAssetUrl = (path: string) => {
  if (!path) return '';
  return `http://localhost:5000/${path}`;
};

interface ItemSlotProps {
  item: ItemInBoard;
  currentTime: number;
}

const ItemSlot = ({ item, currentTime }: ItemSlotProps) => {
  const cooldown = item?.cooldown > 0 ? (item?.cooldown - (currentTime - Math.floor(currentTime))).toFixed(0) : 0;
  const hasCooldown = Number(cooldown) > 0;
  return (
    <div className="w-6 h-6 bg-gray-900/50 rounded relative">
      {item && item.asset && (
        <>
          <Image
            src={getAssetUrl(item.asset)}
            alt={item.displayName}
            width={24}
            height={24}
            className={`rounded ${hasCooldown ? 'opacity-30' : 'opacity-90'}`}
          />
          {hasCooldown && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-mono text-white/90 bg-gray-900/80 px-0.5 rounded">
                {cooldown}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const PlayerRow = ({ player, isBlueTeam, gameState }: { player: PlayerScore, isBlueTeam: boolean, gameState: GameState }) => {
  return (
    <div className={`flex items-center ${isBlueTeam ? 'flex-row' : 'flex-row-reverse'} p-1 h-[44px]`}>
      {/* Splash Icon with CS */}
      <div className={`flex items-center ${isBlueTeam ? 'mr-4' : 'ml-4'}`}>
        <div className="relative w-16 h-[44px] overflow-hidden">
          <Image
            src={getAssetUrl(player.champion.splashImg)}
            alt={player.champion.name}
            width={160}
            height={90}
            className="rounded-md object-cover absolute top-1/2 -translate-y-1/2"
          />

          <div className="absolute top-2 left-1 bg-gray-900/80 px-1 rounded text-[12px] text-white/80">
            {player.creepScore}
          </div>
        </div>
      </div>

      {/* K/D/A */}
      <div className={`flex items-center ${isBlueTeam ? 'mr-4' : 'ml-4'} text-coolwhite min-w-[60px] ${isBlueTeam ? 'justify-start' : 'justify-end'}`}>
        <span className="font-mono text-xs">
          {player.kills}/{player.deaths}/{player.assists}
        </span>
      </div>

      {/* Items */}
      <div className={`flex gap-0.5 ${isBlueTeam ? 'flex-row' : 'flex-row-reverse'} ${isBlueTeam ? 'ml-auto' : 'mr-auto'}`}>
        {player.items.map((item: ItemInBoard, index: number) => (
          <ItemSlot key={index} currentTime={gameState.gameTime} item={item} />
        ))}
      </div>
    </div>
  );
};

const GoldDiff = ({ blueGold, redGold }: { blueGold: number, redGold: number }) => {
  const diff = blueGold - redGold;
  const color = diff > 0 ? 'text-blueTeam' : diff < 0 ? 'text-redTeam' : 'text-gray-400';
  
  return (
    <div className="flex items-center justify-center h-[44px]">
      <span className={`text-xs font-mono ${color}`}>
        {diff > 0 ? '⫷' : ''} {Math.abs(diff).toFixed(0)} {diff < 0 ? '⫸' : ''}
      </span>
    </div>
  );
};

export default function TeamMembersTable({ gameState }: TeamMembersTableProps) {
  const blueTeam = gameState.scoreboardBottom.teams[0];
  const redTeam = gameState.scoreboardBottom.teams[1];

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center animate-fadeIn">
      <div className="w-[750px] bg-gray-900/80 rounded-t-lg overflow-hidden">
        <div className="grid grid-cols-[1fr,auto,1fr]">
          {/* Blue Team */}
          <div className="border-r border-white/10">
            {blueTeam.players.map((player, index) => (
              <PlayerRow key={index} player={player} isBlueTeam={true} gameState={gameState} />
            ))}
          </div>

          {/* Gold Differences Column */}
          <div className="w-12 border-r border-white/10 flex flex-col">
            {blueTeam.players.map((player, index) => (
              <GoldDiff 
                key={index}
                blueGold={player.totalGold}
                redGold={redTeam.players[index].totalGold}
              />
            ))}
          </div>

          {/* Red Team */}
          <div>
            {redTeam.players.map((player, index) => (
              <PlayerRow key={index} player={player} isBlueTeam={false} gameState={gameState} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 