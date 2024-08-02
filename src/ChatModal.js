import React, { useState, useEffect } from 'react';

const ChatModal = ({ isOpen, onClose, player, socketService }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('all');

  useEffect(() => {
    if (isOpen && socketService) {
      // Send the "enter-chat" message when the chat modal opens
      const enterChatMessage = {
        event: 'enter-chat',
        data: {
          name: player.name,
          id: player.id,
          netWorth: player.netWorth,
        },
      };
      socketService.sendMessage(enterChatMessage);

      socketService.handleMessage('chat-message', (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload]);
      });

      socketService.handleMessage('players-list', (payload) => {
        setPlayers(payload);
      });

      return () => {
        socketService.removeMessageListener('chat-message');
        socketService.removeMessageListener('players-list');
      };
    }
  }, [isOpen, player, socketService]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const chatMessage = {
        senderId: player.id,
        receiverId: selectedPlayer, // Use selectedPlayer for the receiver
        message: newMessage.trim(),
      };

      // Add the new message to the messages state
      //setMessages((prevMessages) => [...prevMessages, chatMessage]);

      // Send the message to the chat server
      socketService.sendMessageToChat(chatMessage);
      setNewMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-2/3 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Chat</h2>
          <button onClick={onClose} className="text-red-500 text-3xl font-bold">&times;</button>
        </div>
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex ${
                msg.senderId === player.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-2 rounded ${
                  msg.senderId === player.id ? 'bg-blue-200' : 'bg-gray-200'
                }`}
              >
                <strong>{msg.senderId}</strong>: {msg.message}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Send to:</label>
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="all">All</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-l-lg"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
