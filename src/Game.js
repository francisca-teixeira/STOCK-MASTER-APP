import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatModal from './ChatModal';
import socketService from './socketService';
import axios from 'axios';

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { player } = location.state; // Retrieve the player object from state
  const [stocks, setStocks] = useState([]);
  const [round, setRound] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    if (player?.id) {
      socketService.initSocket('ws://summercamp24.ddns.net:4000', player);
    }

    socketService.handleMessage('round-started', (payload) => {
      console.log('Round started:', payload);
      setStocks(payload);
    });

    socketService.handleMessage('round-ended', (payload) => {
      console.log('Round ended:', payload);
      setRound(payload);
      if (payload === 10) {
        navigate('/gameOver', { state: { player: player } });
      }
    });
  }, [player]);

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

  const handleQuantityChange = (stockId, quantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [stockId]: quantity,
    }));
  };

  const handleBuy = (stock) => {
    const quantity = parseInt(selectedQuantities[stock.id] || 0, 10);
    const totalCost = stock.price * quantity;

    if (totalCost > player.netWorth) {
      alert('You do not have enough net worth to make this purchase.');
      return;
    }

    const transaction = {
      playerId: player.id,
      stockId: stock.id,
      quantity: quantity,
    };

    socketService.sendTransaction(transaction);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-offwhite">
        <div className="flex justify-end p-4">
          <button
            onClick={handleProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Profile
          </button>
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-1"
          >
            Open Chat
          </button>
          <button
            onClick={handleLeave}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Leave
          </button>
        </div>
        <h1 className="text-3xl mx-auto font-bold mx-5 my-2 text-center">
          Welcome to the Game, {player.name}!
        </h1>
        <p className="text-2xl mx-auto font-light m-0 text-center">
          Good luck!
        </p>
        <div className="bg-black text-white rounded-full mx-auto font-normal w-1/5 p-1 m-5">
          <h3 className="text-2xl text-center font-bold">Round {round}</h3>
          <p className="text-xl text-center mt-2">
            You only have ${player.netWorth} left to invest. 😉
          </p>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {stocks.map((stock) => (
            <div
              key={stock.id}
              className="p-4 bg-white shadow rounded-lg text-center justify-evenly"
            >
              <h2 className="text-xl font-bold">{stock.company}</h2>
              <p className="text-sm text-gray-600">{stock.description}</p>
              <p className="text-lg font-semibold">Symbol: {stock.symbol}</p>
              <p className="text-lg font-semibold">Price: ${stock.price}</p>
              <div className="mt-2">
                <label htmlFor={`quantity-${stock.id}`}>Quantity:</label>
                <select
                  id={`quantity-${stock.id}`}
                  value={selectedQuantities[stock.id] || 0}
                  onChange={(e) => handleQuantityChange(stock.id, e.target.value)}
                  className="ml-2 border border-gray-300 rounded"
                >
                  {[...Array(11).keys()].map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() =>  handleBuy(stock)}
                className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        player={player}
        socketService={socketService}
      />
      <Footer />
    </div>
  );
};

export default Game;
