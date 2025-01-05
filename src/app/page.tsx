'use client';
import styles from '@/assets/styles/index.module.scss';
import BottleTeams from '@/app/components/BottleTeams';
import { useState } from 'react';
import { Status } from '@/app/types/dawe';
import { Game } from '@/app/classes/Game';
import Overlay from '@/app/components/Overlay';
export default function Home() {
  const [blueTeamPlayers, setBlueTeamPlayers] = useState<string[]>(['','','','','','']);
  const [redTeamPlayers, setRedTeamPlayers] = useState<string[]>(['','','','','','']);
  const [blueTeamName, setBlueTeamName] = useState<string>("");
  const [redTeamName, setRedTeamName] = useState<string>("");
  const [daweId, setDaweId] = useState<string>("");
  const [state, setState] = useState<any | null>(null);
  const [tournamentName, setTournamentName] = useState<string>("");
  const sendGameData = async () => {
    try {
      const gameState = new Game(daweId, {
        blue_team_name: blueTeamName,
        red_team_name: redTeamName,
        blue_team_players: blueTeamPlayers,
        red_team_players: redTeamPlayers,
        tournament_logo: "",
        blue_team_logo: "",
        red_team_logo: "",
      });

      // Esperar a que el juego se inicialice completamente
      await new Promise<void>((resolve) => {
        const checkGame = setInterval(() => {
          if (gameState.viewGame) {
            clearInterval(checkGame);
            setState({...gameState});
            resolve();
          }
        }, 100);
      });

      const ws = new WebSocket('wss://draftlol.dawe.gg/');
      
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: "joinroom",
          roomId: daweId
        }));
        setInterval(() => {
          console.log(gameState.viewGame.state.realTimer);
          if (gameState.viewGame.state.realTimer > 0) {
            gameState.viewGame.state.realTimer -= 1000;
            gameState.viewGame.state.timer = Math.round(gameState.viewGame.state.realTimer / 1000).toString();
            setState({...gameState}); // Create new object reference to trigger re-render
          }
        }, 1100);
      };

      ws.onmessage = (event) => {
        try {
          const gameData = new Status(JSON.parse(event.data)['newState']);
          gameState.loadStatus(gameData);
          setState({...gameState}); // Create new object reference to trigger re-render
          console.log(gameState.viewGame.state.realTimer);

        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

    } catch (error) {
      console.error('Error initializing game:', error);
    }
  };
  const swap_side = () => {
    console.log("Swapping side");
    const _blueTeamPlayers = [...redTeamPlayers];
    const _redTeamPlayers = [...blueTeamPlayers];
    const _blueTeamName = redTeamName;  
    const _redTeamName = blueTeamName;
    setBlueTeamPlayers(_blueTeamPlayers);
    setRedTeamPlayers(_redTeamPlayers);
    setBlueTeamName(_blueTeamName);
    setRedTeamName(_redTeamName);
  };
  const clean_data = () => {
    setBlueTeamPlayers(['','','','','','']);
    setRedTeamPlayers(['','','','','','']);
    setBlueTeamName("");
    setRedTeamName("");
  };
  
  return (
    <main className="min-h-screen">
      {(!state) && (<>
    <div className="flex justify-between p-4">

      <div className="flex flex-col w-1/3 p-4">
        <input value={blueTeamPlayers[0]} type="text" placeholder="Jugador 1" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[0] = e.target.value; return newPlayers; })} />
        <input value={blueTeamPlayers[1]} type="text" placeholder="Jugador 2" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[1] = e.target.value; return newPlayers; })} />
        <input value={blueTeamPlayers[2]} type="text" placeholder="Jugador 3" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[2] = e.target.value; return newPlayers; })} />
        <input value={blueTeamPlayers[3]} type="text" placeholder="Jugador 4" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[3] = e.target.value; return newPlayers; })} />
        <input value={blueTeamPlayers[4]} type="text" placeholder="Jugador 5" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[4] = e.target.value; return newPlayers; })} />
        <input value={blueTeamName} type="text" placeholder="Nombre del equipo" className="mb-2 p-2 border" onChange={(e) => setBlueTeamName(e.target.value)} />
      </div>
      <div className="flex flex-col w-1/3 p-4">
        <input type="text" placeholder="Daw ID" className="mb-2 p-2 border" onChange={(e) => setDaweId(e.target.value)} />
        <input type="text" placeholder="Nombre del torneo" className="mb-2 p-2 border" onChange={(e) => setTournamentName(e.target.value)} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded" onClick={sendGameData}>Empezar monitorización de Dawe!</button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded mt-10" onClick={swap_side}>¡CAMBIO DE LADO!</button>
        <button className="bg-red-500 hover:bg-red-700 text-white p-2 rounded mt-10" onClick={clean_data}>¡Limpieza!</button>
      </div>
      <div className="flex flex-col w-1/3 p-4">
        <input value={redTeamPlayers[0]} type="text" placeholder="Jugador 6" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[0] = e.target.value; return newPlayers; })}  />
        <input value={redTeamPlayers[1]} type="text" placeholder="Jugador 7" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[1] = e.target.value; return newPlayers; })} />
        <input value={redTeamPlayers[2]} type="text" placeholder="Jugador 8" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[2] = e.target.value; return newPlayers; })} />
        <input value={redTeamPlayers[3]} type="text" placeholder="Jugador 9" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[3] = e.target.value; return newPlayers; })} />
        <input value={redTeamPlayers[4]} type="text" placeholder="Jugador 10" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[4] = e.target.value; return newPlayers; })} />
        <input value={redTeamName} type="text" placeholder="Nombre del equipo" className="mb-2 p-2 border" onChange={(e) => setRedTeamName(e.target.value)} />
      </div>
    </div>
    <BottleTeams setBlueTeamPlayers={setBlueTeamPlayers} setRedTeamPlayers={setRedTeamPlayers} setBlueTeamName={setBlueTeamName} setRedTeamName={setRedTeamName} />
  </>) }
  {state && state.viewGame && (state.viewGame.started || state.viewGame.ended) && state.viewGame.state.config && (
        <div className={`${styles.root} ${styles.App}`}>
        <Overlay globalState={state} state={state.viewGame.state} config={state.viewGame.state.config} setState={setState} />
      </div>
    )}
    </main>
  );
}
