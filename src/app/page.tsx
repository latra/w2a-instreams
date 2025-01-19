'use client';
import BottleTeams from '@/app/components/BottleTeams';
import Peer, { DataConnection } from 'peerjs';
import { useState, useEffect, useCallback } from 'react';
import { Game } from './classes/Game';
import { Status as DaweStatus } from './types/dawe';
import Overlay from './components/Overlay';
import styles from '@/assets/styles/index.module.scss';

export default function Home() {
  // Campos formulario
  const [blueTeamPlayers, setBlueTeamPlayers] = useState<string[]>(['', '', '', '', '', '']);
  const [redTeamPlayers, setRedTeamPlayers] = useState<string[]>(['', '', '', '', '', '']);
  const [blueTeamName, setBlueTeamName] = useState<string>("");
  const [redTeamName, setRedTeamName] = useState<string>("");
  const [tournamentName, setTournamentName] = useState<string>("");
  const [daweId, setDaweId] = useState<string>("");
  const [blueTeamLogo, setBlueTeamLogo] = useState<string>("");
  const [redTeamLogo, setRedTeamLogo] = useState<string>("");

  // Socket config
  const [uuid, setUuid] = useState('');
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peerStatus, setPeerStatus] = useState<string>('disconnected');
  const [connection, setConnection] = useState<DataConnection | null>(null);

  // dawe config
  const [daweWs, setDaweWs] = useState<WebSocket | null>(null);
  // Game management
  const [gameConfig, setGameConfig] = useState<any>(null);
  const [statusGame, setStatusGame] = useState<Game | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [forceUpdate, setForceUpdate] = useState<any | null>(null);


  const getCurrentGameVersion = async (): Promise<string> => {
    const response = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    const data = await response.json();
    return data[0];
  }

  useEffect(() => {
    getCurrentGameVersion().then((version) => {
      setVersion(version);
    });
    setPeer(new Peer());
  }, []);

  useEffect(() => {
    if (peer) {
      peer.on('open', (id) => {
        setUuid(id);
        setPeerStatus('ready');
      });
      peer.on('connection', (connection) => {
        console.log("Connection established");
        setConnection(connection);
        setPeerStatus('connected');
      });
    }
  }, [peer]);

  useEffect(() => {
    if (gameConfig && daweWs === null) {
      setDaweWs(new WebSocket('wss://draftlol.dawe.gg/'));
    }
  }, [gameConfig]);

  useEffect(() => {
    if (daweWs) {
      daweWs.onopen = () => {
        daweWs.send(JSON.stringify({
          type: "joinroom",
          roomId: daweId,
        }));
      };

      daweWs.onmessage = async (event) => {
        console.log("Dawe message received", JSON.parse(event.data)["newState"]);
        let lastDaweState = new DaweStatus(JSON.parse(event.data)["newState"]);
        console.log(version);

        if (version && gameConfig) {
          const newGame = new Game(daweId, version, gameConfig, lastDaweState);
          setStatusGame(newGame);
        } else {
          console.error("Version or gameConfig is missing");
        }

      };

      const interval = setInterval(() => {
        if (statusGame && connection) {
          console.log("updating timer");
          console.log(statusGame);
          statusGame.updateTimer();
          setStatusGame(statusGame); // Trigger re-render
          if (connection) {
            connection.send(statusGame);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [daweWs, statusGame, connection, version, gameConfig, forceUpdate]);

  const sendGameData = async () => {
    setGameConfig({
      tournament_name: tournamentName,
      blue_team_name: blueTeamName,
      red_team_name: redTeamName,
      blue_team_logo: blueTeamLogo,
      red_team_logo: redTeamLogo,
      blue_team_players: blueTeamPlayers,
      red_team_players: redTeamPlayers,
    });
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
    setBlueTeamPlayers(['', '', '', '', '']);
    setRedTeamPlayers(['', '', '', '', '']);
    setBlueTeamName("");
    setRedTeamName("");
  };
  const handleDrop = (newPosition: number, oldPosition: number, oldTeam: string, newTeam: string) => {
    if (oldTeam !== newTeam) return;

    if (newTeam === "blue") {
      [statusGame.viewGame.state.blueTeam.picks[oldPosition].champion, 
      statusGame.viewGame.state.blueTeam.picks[newPosition].champion] = 
      [statusGame.viewGame.state.blueTeam.picks[newPosition].champion,
      statusGame.viewGame.state.blueTeam.picks[oldPosition].champion];
    } else {
      [statusGame.viewGame.state.redTeam.picks[oldPosition].champion,
      statusGame.viewGame.state.redTeam.picks[newPosition].champion] = 
      [statusGame.viewGame.state.redTeam.picks[newPosition].champion,
      statusGame.viewGame.state.redTeam.picks[oldPosition].champion];
    }
    setStatusGame(statusGame);
    forceUpdate("update");
  };


  return (
    <main className="min-h-screen">
      <div className="flex-row justify-between p-8">
        <div className="flex-row justify-between items-center p-4">
          <h1 className="text-2xl font-bold">View ID: {uuid}</h1>
          Introduce este ID en '/picks' para conectar al dawe y ver el draft.
          <div>peer status: {peerStatus}</div>
        </div>

        <div className="flex justify-between p-4">
          <div className="flex flex-col w-1/3 p-4">
            <input value={blueTeamPlayers[0]} type="text" placeholder="Jugador 1" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[0] = e.target.value; return newPlayers; })} />
            <input value={blueTeamPlayers[1]} type="text" placeholder="Jugador 2" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[1] = e.target.value; return newPlayers; })} />
            <input value={blueTeamPlayers[2]} type="text" placeholder="Jugador 3" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[2] = e.target.value; return newPlayers; })} />
            <input value={blueTeamPlayers[3]} type="text" placeholder="Jugador 4" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[3] = e.target.value; return newPlayers; })} />
            <input value={blueTeamPlayers[4]} type="text" placeholder="Jugador 5" className="mb-2 p-2 border" onChange={(e) => setBlueTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[4] = e.target.value; return newPlayers; })} />
            <input value={blueTeamName} type="text" placeholder="Nombre del equipo" className="mb-2 p-2 border" onChange={(e) => setBlueTeamName(e.target.value)} />
            <input value={blueTeamLogo} type="text" placeholder="Logo del equipo (URL)" className="mb-2 p-2 border" onChange={(e) => setBlueTeamLogo(e.target.value)} />
          </div>
          <div className="flex flex-col w-1/3 p-4">
            <input type="text" placeholder="Daw ID" className="mb-2 p-2 border" onChange={(e) => setDaweId(e.target.value)} />
            <input type="text" placeholder="Nombre del torneo" className="mb-2 p-2 border" onChange={(e) => setTournamentName(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded" onClick={sendGameData}>Empezar monitorización de Dawe!</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded mt-10" onClick={swap_side}>¡CAMBIO DE LADO!</button>
            <button className="bg-red-500 hover:bg-red-700 text-white p-2 rounded mt-10" onClick={clean_data}>¡Limpieza!</button>
          </div>
          <div className="flex flex-col w-1/3 p-4">
            <input value={redTeamPlayers[0]} type="text" placeholder="Jugador 6" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[0] = e.target.value; return newPlayers; })} />
            <input value={redTeamPlayers[1]} type="text" placeholder="Jugador 7" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[1] = e.target.value; return newPlayers; })} />
            <input value={redTeamPlayers[2]} type="text" placeholder="Jugador 8" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[2] = e.target.value; return newPlayers; })} />
            <input value={redTeamPlayers[3]} type="text" placeholder="Jugador 9" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[3] = e.target.value; return newPlayers; })} />
            <input value={redTeamPlayers[4]} type="text" placeholder="Jugador 10" className="mb-2 p-2 border" onChange={(e) => setRedTeamPlayers(prev => { const newPlayers = [...prev]; newPlayers[4] = e.target.value; return newPlayers; })} />
            <input value={redTeamName} type="text" placeholder="Nombre del equipo" className="mb-2 p-2 border" onChange={(e) => setRedTeamName(e.target.value)} />
            <input value={redTeamLogo} type="text" placeholder="Logo del equipo (URL)" className="mb-2 p-2 border" onChange={(e) => setRedTeamLogo(e.target.value)} />
          </div>
        </div>
        { !statusGame && <div className="flex-row justify-between p-4">
          <BottleTeams setBlueTeamPlayers={setBlueTeamPlayers} setRedTeamPlayers={setRedTeamPlayers} setBlueTeamName={setBlueTeamName} setRedTeamName={setRedTeamName} />
        </div>}
        <div className={`${styles.root} ${styles.App}`}>
          Arrastra los campeones para cambiarlos de posición.
        {statusGame && <Overlay globalState={statusGame} state={statusGame.viewGame.state} config={statusGame.viewGame.state.config} setState={setStatusGame} dropCall={handleDrop}/>}
        </div>
      </div>
    </main>
  );
}
