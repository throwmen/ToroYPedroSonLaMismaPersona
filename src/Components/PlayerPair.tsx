import { PlayerBD } from "../models/player.model";

export interface PlayerPairProps {
    player1: PlayerBD;
    player2: PlayerBD;
}

export const PlayerPair = ({ player1, player2 }: PlayerPairProps) => {
    if (!player1 || !player2) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <strong>Player 1:</strong><br />
                {player1.first_name || 'N/A'} {player1.last_name || 'N/A'}<br />
                Height (in): {player1.h_in || 'N/A'}<br />
                Height (meters): {player1.h_meters || 'N/A'}
            </div>
            <div>
                <strong>Player 2:</strong><br />
                {player2.first_name || 'N/A'} {player2.last_name || 'N/A'}<br />
                Height (in): {player2.h_in || 'N/A'}<br />
                Height (meters): {player2.h_meters || 'N/A'}
            </div>
        </div>
    );
}
