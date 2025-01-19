"use client";

import { useState, useEffect } from "react";
import { Peer, DataConnection } from "peerjs";

import { Game } from '@/app/classes/Game';

import styles from '@/assets/styles/index.module.scss';
import Overlay from '@/app/components/Overlay';

export default function Picks() {
    const [peerId, setPeerId] = useState('');

    const [uuid, setUuid] = useState('');
    const [peer, setPeer] = useState<Peer | null>(null);
    const [peerStatus, setPeerStatus] = useState<string>('disconnected');
    const [connection, setConnection] = useState<DataConnection | null>(null);
    const [status, setStatus] = useState('disconnected');


    const [state, setState] = useState<any>(null);
    
    useEffect(() => {
        var newPeer = null; 
        if (peerId === '') {
            newPeer = new Peer();
        }
        else{
            newPeer = new Peer(peerId);
        }
        setPeer(newPeer);
        newPeer.on('open', (id) => {
            setPeerId(id);
            setPeerStatus('ready');
            console.log(`Peer ID: ${id}`);
        });
    }, []);

    const connectToPeer = () => {

        if (peerStatus === 'ready') {
            const conn = peer.connect(uuid);
            setConnection(conn);
            conn.on('error', (err) => {
                    console.error('Connection error:', err);
                    setStatus('error: ' + err.type);
            });
            conn.on('open', () => {
                setStatus('connected');
                console.log('Connected to peer:', uuid);
                conn.send('Hello!');
            });
            conn.on('data', (data: Game) => {
                console.log("RECEIVING MESSAGE");
                console.log(data);
                setState({...data});
            });
        }
    }
    if (state) {
        return         <div className={`${styles.root} ${styles.App}`}>
        <Overlay globalState={state} state={state.viewGame.state} config={state.viewGame.state.config} setState={setState} dropCall={()=>{}} />
      </div>
    }
    return (
        <div className="p-4">
            <h1 className="text-xl mb-4">Picks</h1>
            <div className="flex gap-4 items-center">
                <input 
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)} 
                    type="text" 
                    placeholder="Enter peer ID"
                    className="border p-2 rounded"
                />
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={connectToPeer}
                    disabled={status === 'connected'}
                >
                    Connect
                </button>
            </div>
            <div className="mt-4">
                Status: {status}
            </div>
        </div>
    );
}

