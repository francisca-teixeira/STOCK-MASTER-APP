import React from 'react';

function PlayerCard({ playerName, playerAvatar }) {
  return (
    <div class="max-w-sm overflow-hidden rounded-lg shadow-xl">
        <img className="w-100 m-2 rounded-lg" src={playerAvatar} alt="Avatar img" ></img>
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{playerName}</div>
        </div>
    </div>
  );
}

export default PlayerCard;
