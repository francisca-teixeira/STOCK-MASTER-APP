import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ScoreBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://summercamp24.ddns.net:4000/game/leaderboard');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Player Scores</h1>
        <div className="overflow-x-auto mt-20">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-60 py-3 border-b-2 border-gray-300">ID</th>
                <th className="px-60 py-3 border-b-2 border-gray-300">Name</th>
                <th className="px-60 py-3 border-b-2 border-gray-300">Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id} className={`border-b-4 border-gray-300 ${index === 0 || index === players.length - 1 ? 'bg-gray-200' : ''}`}>
                  <td className="px-4 py-2">{player.id}</td>
                  <td className="px-4 py-2">{player.name}</td>
                  <td className="px-4 py-2">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default ScoreBoard;
