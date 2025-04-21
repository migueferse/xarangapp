import API from '../api/axios';

const login = async (credentials) => {
  try {
    const response = await API.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error al llamar a la API de login:', error);
    throw error; 
  }
};

export default {
  login,
};