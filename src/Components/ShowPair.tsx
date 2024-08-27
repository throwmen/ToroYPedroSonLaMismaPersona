import { useState, useEffect } from 'react';
import { PlayerBD } from '../models/player.model';
import { PlayerPair, PlayerPairProps } from './PlayerPair'; // Asegúrate de importar el componente desde el archivo correcto

export const ShowPair = () => {
    const [players, setPlayers] = useState<PlayerBD[]>([]);
    const [sumValue, setSumValue] = useState<number>(0);
    const [unit, setUnit] = useState<'in' | 'meters'>('in');
    const [pairs, setPairs] = useState<PlayerPairProps[]>([]); // Estado para almacenar los pares encontrados

    // Función para obtener jugadores desde la API
    const getPlayers = async () => {
        try {
            const response = await fetch('https://mach-eight.uc.r.appspot.com');
            const data = await response.json();
            if (data.values && data.values.length > 0) {
                setPlayers(data.values);
            } else {
                console.error('No players found in the response');
            }
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    // Función para convertir alturas a una única unidad
    const convertHeight = (player: PlayerBD): number => {
        return unit === 'in' ? parseFloat(player.h_in) : parseFloat(player.h_meters);
    };

    // Función para encontrar pares usando dos punteros
    const findPairs = (): PlayerPairProps[] => {
        const foundPairs: PlayerPairProps[] = [];

        for (let i = 0; i < players.length; i++) {
            for (let j = i + 1; j < players.length; j++) {
                const heightSum = convertHeight(players[i]) + convertHeight(players[j]);

                if (Math.abs(heightSum - sumValue) == 0){ 
                    foundPairs.push({ player1: players[i], player2: players[j] });
                }
            }
        }

        return foundPairs;
    };

    useEffect(() => {
        getPlayers();
    }, []);

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <input
                type="number"
                placeholder="Inserte el número que quiere que sumen las parejas"
                value={sumValue}
                onChange={(e) => setSumValue(parseFloat(e.target.value))}
                className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mb-4 flex space-x-4">
                <label className={`flex items-center cursor-pointer p-2 rounded-md border ${unit === 'in' ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'}`}>
                    <input
                        type="radio"
                        name="unit"
                        value="in"
                        checked={unit === 'in'}
                        onChange={() => setUnit('in')}
                        className="hidden"
                    />
                    <div className="w-5 h-5 border border-blue-500 rounded-full flex items-center justify-center">
                        {unit === 'in' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                    </div>
                    <span className="ml-2 text-lg font-medium">Pulgadas (in)</span>
                </label>
                <label className={`flex items-center cursor-pointer p-2 rounded-md border ${unit === 'meters' ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'}`}>
                    <input
                        type="radio"
                        name="unit"
                        value="meters"
                        checked={unit === 'meters'}
                        onChange={() => setUnit('meters')}
                        className="hidden"
                    />
                    <div className="w-5 h-5 border border-blue-500 rounded-full flex items-center justify-center">
                        {unit === 'meters' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                    </div>
                    <span className="ml-2 text-lg font-medium">Metros (m)</span>
                </label>
            </div>
            <button
                onClick={() => setPairs(findPairs())}
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Find Pairs
            </button>
            <div className="mt-6">
            <h1 className="text-black">Total de pares encontrados: {pairs.length}</h1>
                {pairs.length > 0 ? (
                    pairs.map((pair, index) => (
                        <div key={index} className="mb-4">
                            <PlayerPair player1={pair.player1} player2={pair.player2} />
                            <hr />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No pairs found</p>
                )}
            </div>
        </div>
    );
};
