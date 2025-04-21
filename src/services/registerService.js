import API from '../api/axios';

const register = async (userData) => {
  try {
    const response = await API.post('/register', userData);
    console.log('response service', response)
    return response;
  } catch (error) {
    console.error('Error al llamar a la API de registro:', error);
    throw error;
  }
};

export default {
  register,
};