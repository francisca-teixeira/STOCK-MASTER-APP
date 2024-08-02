import './css/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Register from './Register';
import Profile from './Profile';
import Home from './Home';
import Game from './Game';
import GameOver from './GameOver';
import ScoreBoard from './ScoreBoard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:playerId" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gameOver" element={<GameOver />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
