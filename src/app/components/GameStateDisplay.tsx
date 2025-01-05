'use client';

import { useEffect, useState } from 'react';
import { GameState, WebSocketMessage } from '../types/gameState';

const getAssetUrl = (path: string) => {
  if (!path) return '';
  return `http://localhost:5000/${path}`;
};

export default function GameStateDisplay() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [status, setStatus] = useState<string>('Connecting...');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000/ws/in');

    ws.onopen = () => {
      setStatus('Connected');
    };

    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      if (message.type === 'ingame-state-update' && message.state) {
        setGameState(message.state);
      } else if (message.type === 'gameStatus' && message.GameState) {
        setStatus(message.GameState);
      }
    };

    ws.onerror = (error) => {
      setStatus('Error connecting to game');
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      setStatus('Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  if (!gameState) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">{status}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Game Status: {gameState.gameStatus}</h1>
        <p>Game Time: {Math.floor(gameState.gameTime / 60)}:{(gameState.gameTime % 60).toFixed(0).padStart(2, '0')}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {gameState.scoreboard.teams.map((team, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{team.teamName}</h2>
            <div className="grid grid-cols-2 gap-2">
              <div>Gold: {team.gold/1000}K</div>
              <div>Kills: {team.kills}</div>
              <div>Towers: {team.towers}</div>
              <div>Dragons: {team.dragons.length}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Players</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gameState.tabs.map((tab) =>
            tab.players.map((player) => (
              <div key={player.id} className="p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <img
                    src={getAssetUrl(player.championAssets.squareImg)}
                    alt={player.championAssets.name}
                    className="w-12 h-12 rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{player.playerName}#{player.playerHashtag}</h3>
                    <p>{player.championAssets.name} - Level {player.level}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="bg-green-200 rounded-full h-2 w-full">
                    <div
                      className="bg-green-500 rounded-full h-2"
                      style={{ width: `${(player.health.current / player.health.max) * 100}%` }}
                    />
                  </div>
                  {player.resource.max > 0 && (
                    <div className="bg-blue-200 rounded-full h-2 w-full mt-1">
                      <div
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${(player.resource.current / player.resource.max) * 100}%` }}
                      />
                    </div>
                  )}
                  <div className="mt-2 grid grid-cols-6 gap-1">
                    {player.abilities.map((ability) => (
                      <div key={ability.identifier} className="relative">
                        <img
                          src={getAssetUrl(ability.assets.iconAsset)}
                          alt={ability.displayName}
                          className="w-8 h-8 rounded"
                        />
                        {ability.cooldown > 0 && (
                          <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center text-white text-xs">
                            {Math.ceil(ability.cooldown)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold">Baron Pit</h2>
          <div className="mt-2">
            <div className="bg-gray-200 rounded-full h-2 w-full">
              <div
                className="bg-purple-500 rounded-full h-2"
                style={{ width: `${(gameState.baronPitTimer.timeLeft / gameState.baronPitTimer.timeTotal) * 100}%` }}
              />
            </div>
            <p className="mt-1">Time Left: {Math.floor(gameState.baronPitTimer.timeLeft)}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold">Dragon Pit</h2>
          <div className="mt-2">
            <div className="bg-gray-200 rounded-full h-2 w-full">
              <div
                className="bg-orange-500 rounded-full h-2"
                style={{ width: `${(gameState.dragonPitTimer.timeLeft / gameState.dragonPitTimer.timeTotal) * 100}%` }}
              />
            </div>
            <p className="mt-1">Time Left: {Math.floor(gameState.dragonPitTimer.timeLeft)}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 