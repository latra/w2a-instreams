'use client'
import { useEffect, useState } from "react";

export default function BottleTeams({ setBlueTeamPlayers, setRedTeamPlayers, setBlueTeamName, setRedTeamName }: { setBlueTeamPlayers: (players: string[]) => void; setRedTeamPlayers: (players: string[]) => void; setBlueTeamName: (name: string) => void; setRedTeamName: (name: string) => void }) {
    const [teams, setTeams] = useState([]);
    const getTeams = async () => {
        const response = await fetch('http://localhost:5000/api/teams');
        const data = await response.json();
        setTeams(data);
    try {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
        setTeams([]); // Clear teams in case of error
    }
    }

    const setTeam = (team: any, side: string) => {
        const selectedRoles = {
            top: '',
            jungla: '',
            mid: '',
            adc: '',
            support: ''
        };
        let error = false;

        team.members.forEach((player: any) => {
            console.log(player);
            const selectedRole = player.selectedRole; // Assuming selectedRole holds the value from the dropdown
            if (selectedRole && !selectedRoles[selectedRole as keyof typeof selectedRoles]) {
                selectedRoles[selectedRole as keyof typeof selectedRoles] = player.alias;
            } else if (selectedRole && selectedRoles[selectedRole as keyof typeof selectedRoles] === player.alias) {
                // If the same player is assigned to the same role, do nothing
            } else if (selectedRole) {
                error = true; // Role already taken by another player
            }
        });

        const teamPlayers = Object.values(selectedRoles);
        if (error) {
            console.error('Error: Duplicate roles selected');
        } else {
            if (side === 'blue') {
                setBlueTeamPlayers(teamPlayers);
                setBlueTeamName(team.name);
            } else {
                setRedTeamPlayers(teamPlayers);
                setRedTeamName(team.name);
            }
        }
    }
    useEffect(() => {
        getTeams();
    }, []);
    return (
        <div className="grid grid-cols-3 gap-4 bg-gray-200 p-4 rounded-md w-2/5">
            {teams.length > 0 ? (
                teams.map((team: any) => (
                    <div key={team.id} className="flex flex-col items-center justify-center bg-gray-300 p-4 rounded-md">
                        <h1 className="text-2xl font-bold">{team.name}</h1>
                    <div className="flex flex-col">
                        {team.members.map((player: any) => (
                            <div key={player.alias}> {player.alias} - {player.ingamePlayerId}
                                <select className="mb-2 p-2 border" onChange={(e) => {
                                    player.selectedRole = e.target.value;
                                }}>
                                    <option value="" >Selecciona un rol</option>
                                    <option value="top">Top</option>
                                    <option value="jungla">Jungla</option>
                                    <option value="mid">Mid</option>
                                    <option value="adc">ADC</option>
                                    <option value="support">Support</option>
                                    <option value="no">N/A</option>
                                </select>
                        </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded" onClick={() => {
                            setTeam(team, 'blue');
                        }}>Hacer equipo azul</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white p-2 rounded" onClick={() => {
                            setTeam(team, 'red');
                        }}>Hacer equipo rojo</button>
                    </div>
                </div>
            ))) :     (
                <div>No hay equipos registrados - ¿Está el servidor BottleBlue funcionando?</div>
            )}
        </div>
    );
}