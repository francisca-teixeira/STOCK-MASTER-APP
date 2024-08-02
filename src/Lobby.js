import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BoltIcon, UserGroupIcon, ClockIcon, ChartBarIcon, TrophyIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';  // Correct import
import avatar1 from './public/avatar1.jpg';
import stonks from './public/meme-stonks.jpg';
import axios from 'axios';
import socketService from './socketService';

const gameRules = [
  {
    title: 'Objective',
    description: 'This is a round-based game where the main objective is to buy or sell stock options to increase your net worth.',
    Icon: ChartBarIcon,
  },
  {
    title: 'Starting Funds',
    description: 'Each player starts with $10,000 and can buy stock options each round.',
    Icon: CurrencyDollarIcon,
  },
  {
    title: 'Round Time',
    description: 'Players have 30 seconds per round to register transactions.',
    Icon: ClockIcon,
  },
  {
    title: 'Transaction Execution',
    description: 'At the end of each round, transactions are executed and net worths are updated.',
    Icon: BoltIcon,
  },
  {
    title: 'Game Duration',
    description: 'The game ends after 10 rounds.',
    Icon: UserGroupIcon,
  },
  {
    title: 'Winning Condition',
    description: 'The winner is the player with the highest net worth.',
    Icon: TrophyIcon,
  },
];

const RuleCard = ({ rule }) => {
  return (
    <div className="rounded-lg p-6 text-center shadow-2xl border border-black sm:p-8">
      <div className="relative left-0 top-0 mx-auto h-16 w-16 flex cursor-default rounded-full border-4 border-primary text-primary dark:text-primary sm:h-20 sm:w-20">
        <rule.Icon className="sm:h-15 sm:w-15 mx-auto h-15 w-15" />
      </div>
      <h3 className="text-xl py-4 font-bold">{rule.title}</h3>
      <p className="text-xl">{rule.description}</p>
    </div>
  );
};



function Lobby() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = location.state?.player;

  useEffect(() => {
    if (player?.id) {
      socketService.initSocket('ws://summercamp24.ddns.net:4000', player);
    }

    const handleNavigation = (event) => {
      navigate(event.detail.path, { state: { player: player } });
    };

    window.addEventListener('navigate', handleNavigation);

    return () => {
      window.removeEventListener('navigate', handleNavigation);
    };
  }, [player?.id, navigate]);

  const handleLeave = async () => {
    try {
      await axios.post('http://summercamp24.ddns.net:4000/game/leave', { id: player.id });
      navigate('/');
    } catch (error) {
      console.error("Error leaving the game:", error);
    }
  };

  const handleProfile = () => {
    navigate('/profile', { state: { player: player } });
  };

  const handleGame = () => {
    navigate('/game', { state: { player: player } });
  };
  return (
    <div className="relative flex flex-col p-6 bg-gray-50 font-sans">
      <div className="flex justify-end p-4 space-x-2">
      <button
          onClick={handleGame}
          className="bg-offwhite text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Game
        </button>
        <button
          onClick={handleProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-1"
        >
          Profile
        </button>
        <button
          onClick={handleLeave}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Leave
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center text-gray-800 my-5">
        Welcome to the Lobby, {player.name}!
      </h1>
      <p className="text-2xl font-light text-center text-gray-600 mb-5">
        Waiting for the game to start...
      </p>
      <div className="p-6 rounded">
        <div className="m-2 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:m-12 lg:grid-cols-3 lg:gap-12">
          {gameRules.map((rule, index) => (
            <RuleCard key={index} rule={rule} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lobby;
