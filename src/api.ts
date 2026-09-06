import axios from 'axios';

const API_URL = 'https://r3proevolution.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Erro ao conectar com a API:', error);
    throw error;
  }
};
