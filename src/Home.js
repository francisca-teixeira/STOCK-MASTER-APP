import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Lobby from './Lobby';

function Home() {
  const location = useLocation();
  const { playerName } = location.state || { playerName: "Guest" }; // Default to 'Guest'

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-offwhite">
        <Lobby playerName={playerName} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
