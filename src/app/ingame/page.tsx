'use client';

import { useEffect, useState } from 'react';
import { GameState, WebSocketMessage } from '../../types/gameState';
import TeamScoreBar from '../../components/TeamScoreBar';
import ObjectiveTimers from '@/components/ObjectiveTimers';
import TeamMembersTable from '@/components/TeamMembersTable';
import GoldGraph from '@/components/GoldGraph';
import InhibitorStatus from '@/components/InhibitorStatus';

export default function InGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [status, setStatus] = useState<string>('Connecting...');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000/ws/in');

    ws.onopen = () => {
      setStatus('Connected');
    };

    ws.onmessage = (event) => {
      try {
        // Si es un keepalive, será un mensaje que no es JSON válido
        if (event.data === 'keepalive') {
          return;
        }

        const message: WebSocketMessage = JSON.parse(event.data);
        
        if (message.type === 'ingame-state-update' && message.state) {
          setGameState(message.state);
        } else if (message.type === 'gameStatus' && message.GameState) {
          setStatus(message.GameState);
        }
      } catch (error) {
        // Si hay un error al parsear el JSON, asumimos que es un keepalive u otro mensaje de control
        console.debug('Received non-JSON message:', event.data);
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
      <div className="flex items-center justify-center min-h-screen text-white/90">
        <div className="text-xl font-semibold">{status}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <TeamScoreBar gameState={gameState} />
      <ObjectiveTimers gameState={gameState} />
      <InhibitorStatus gameState={gameState} />
      {gameState.goldGraph?.current?.goldAtTime ? (
        <GoldGraph gameState={gameState} />
      ) : (
        <TeamMembersTable gameState={gameState} />
      )}
    </div>
  );
} 