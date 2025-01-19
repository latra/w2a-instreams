'use client';

import { useEffect, useState } from 'react';
import { GameState, WebSocketMessage } from '../types/gameState';
import TeamScoreBar from '../components/TeamScoreBar';
import ObjectiveTimers from '@/app/components/ObjectiveTimers';
import TeamMembersTable from '@/app/components/TeamMembersTable';
import GoldGraph from '@/app/components/GoldGraph';
import InhibitorStatus from '@/app/components/InhibitorStatus';
import { NULL } from 'sass';

export default function InGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [status, setStatus] = useState<string>('Connecting...');

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      ws = new WebSocket('ws://localhost:5000/ws/in');

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
        setStatus(null);
        ws.close();
      };

      ws.onclose = () => {
        setStatus(null);
        // Intentar reconectar después de 5 segundos
        reconnectTimeout = setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  if (!gameState) {
    return (
      <div className="flex items-center justify-center min-h-screen text-black/90">
        <div className="text-xl font-semibold">Status not found... Is blue bottle running?</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      {status && gameState && <>
      
      {gameState.scoreboard && <TeamScoreBar gameState={gameState} />}
      {gameState.scoreboard && <ObjectiveTimers gameState={gameState} />}
      {gameState.scoreboard && <InhibitorStatus gameState={gameState} />}
      {gameState.goldGraph?.current?.goldAtTime ? (
        <GoldGraph gameState={gameState} />
      ) : (gameState.scoreboard && gameState.scoreboardBottom != null) ? (
        <TeamMembersTable gameState={gameState} />
      ) : null}</>
      }

    </div>
  );
} 