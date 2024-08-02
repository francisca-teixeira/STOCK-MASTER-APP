import axios from 'axios';

const API_URL = 'http://summercamp24.ddns.net:4000';

export const registerPlayer = async (name) => {
  const response = await axios.post(`${API_URL}/game/register-player`, { name });
  return response.data;
};

export const getPlayerWallet = async (id) => {
  const response = await axios.get(`${API_URL}/game/player/${id}/wallet`);
  return response.data;
};

export const leaveGame = async (id) => {
  await axios.post(`${API_URL}/game/leave`, { id });
};
