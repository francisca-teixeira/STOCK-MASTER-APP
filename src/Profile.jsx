import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Profile.css';
import Header from './Header';
import logoFooter1 from './public/summer_camp.png'; 
import logoFooter2 from './public/critical_software.png'; 
import avatar from './public/avatar1.jpg';
import Footer from './Footer';

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = location.state?.player;
  const playerId = player.id;
  const [playerInfo, setPlayerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const handleBackToLobby = () => {
    navigate('/home', { state: { player: player } });

  };

  useEffect(() => {
    console.log('Player Wallet:', player);
    console.log('Player ID:', playerId);
    if (playerId) {
      fetch(`http://summercamp24.ddns.net:4000/game/player/${playerId}/wallet`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setPlayerInfo(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [playerId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!playerInfo) {
    return <p>No player information available</p>;
  }

  return (
    <div classname= "main">
    <div classname = "header">
      <Header />
    </div>
    <div className="profile-container">
      <div classname="profile-info">
      <h1>{playerInfo.name}'s profile</h1>
      <div className="profile-details">
        <p><strong>ID:</strong> {playerInfo.id}</p>
        <p><strong>Name:</strong> {playerInfo.name}</p>
        <p><strong>Wallet:</strong> {playerInfo.wallet}</p>
      </div>
      </div>

      <div classname="profile-avatar-container">
      <img src={avatar} alt="Profile Avatar" className="profile-avatar" />
      </div>
      <button
        onClick={handleBackToLobby}
        className="bg-red-500 text-white px-4 py-2 rounded mb-7 mr-6"
      >
        Back to Lobby
      </button>
    </div>
      <Footer />
   </ div>
  );
}

export default Profile;
