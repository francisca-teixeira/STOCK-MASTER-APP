let socket = null;
let player = null;
let playerId = null;
const listeners = {};
const messageQueue = [];

const initSocket = (url, playerDTO) => {
  player = playerDTO;
  playerId = player.id;
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('Connected to the WebSocket server', messageQueue);
    // Send all queued messages
    while (messageQueue.length > 0) {
      const message = messageQueue.shift();
      socket.send(message);
    }
    sendConnectConfirm();
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Received message:', message);
    if (listeners[message.type]) {
      listeners[message.type](message.payload);
    }
  };

  socket.onclose = () => {
    console.log('Disconnected from the WebSocket server');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

const handleMessage = (type, callback) => {
  listeners[type] = callback;
};

const removeMessageListener = (type) => {
  delete listeners[type];
};

const sendConnectConfirm = () => {
  if (!playerId) {
    console.error('Player ID is not set. Cannot confirm connection.');
    return;
  }

  const message = {
    type: 'connect-confirm',
    payload: {
      id: playerId,
    },
  };

  console.log('Sending connection confirmation');
  sendMessage(message);
};

const sendMessage = (message) => {
  const serializedMessage = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(serializedMessage);
  } else {
    messageQueue.push(serializedMessage);
  }
};

const sendTransaction = (transaction) => {
  const message = {
    event: 'transaction',
    data: transaction,
  };
  console.log('Sending transaction:', message);
  sendMessage(message);
};

const sendMessageToChat = (chatMessage) => {
  const message = {
    event: 'send-message', 
    data: chatMessage,     
  };
  console.log('Sending chat message:', message);
  sendMessage(message);
};


const enterChat = () => {
  const message = {
    type: 'enter-chat',
    payload: { id: playerId },
  };
  sendMessage(message);
};

const leaveChat = () => {
  const message = {
    type: 'leave-chat',
    payload: { id: playerId },
  };
  sendMessage(message);
};

// Additional handlers for server messages
const handleServerMessages = () => {
  handleMessage('connected', (payload) => {
    console.log('Player connected:', payload);
  });

  handleMessage('disconnected-user', (payload) => {
    console.log('Player disconnected:', payload);
  });

  handleMessage('game-started', () => {
    console.log('Game started');
    navigateToGamePage();
  });

  handleMessage('game-ended', (payload) => {
    console.log('Game ended', payload);
  });

  handleMessage('round-started', (payload) => {
    console.log('Round started:', payload);
  });

  handleMessage('round-ended', () => {
    console.log('Round ended');
  });

  handleMessage('chat-message', (payload) => {
    console.log('Chat message received:', payload);
  });
};

const navigateToGamePage = () => {
  if (typeof window !== 'undefined') {
    const navigateEvent = new CustomEvent('navigate', { 
      detail: { 
        path: '/game',
        state: player,
      } 
    });
    window.dispatchEvent(navigateEvent);
  }
};

// Call this function to set up handlers
handleServerMessages();

export default {
  initSocket,
  handleMessage,
  removeMessageListener,
  sendTransaction,
  sendMessageToChat,
  enterChat,
  leaveChat,
  sendMessage,
};
