import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './css/GameOver.css';
import Header from './Header';  
import avatar from './public/meme-stonks.jpg';
import Footer from './Footer';
import axios from 'axios';
import socketService from './socketService';


function GameOver() {
    const location = useLocation();
    const navigate = useNavigate();
    const player = location.state?.player;

    const handleLeave = async () => {
        try {
          await axios.post('http://summercamp24.ddns.net:4000/game/leave', { id: player.id });
          navigate('/');
        } catch (error) {
          console.error("Error leaving the game:", error);
        }
      };
      
      const handleScoreboard = () => {
        navigate('/scoreboard');
    };

    const handleProfile = () => {
        navigate('/profile', { state: { player: player } });
      };

      useEffect(() => {
        if (player?.id) {
          socketService.initSocket('ws://summercamp24.ddns.net:4000', player);
        }
    }
    , [player]);
  return (
    <div classname= "main">
    <div classname = "header">
      <Header />
    </div>
    <button
          onClick={handleLeave}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-1"
        >
          Leave
        </button>
        <button
        onClick={handleScoreboard}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-1"
        >
            Scoreboard
        </button>
        <button
          onClick={handleProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-1"
        >
          Profile
        </button>

    <div className="meme-container">
      <h1>Game over</h1>
    <img src={avatar} alt="Profile Avatar" className="meme-stonks" />

    </div>
      <Footer />
   </ div>
  );
}

export default GameOver;
