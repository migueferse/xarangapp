import API from '../api/axios';

const logout = async (token) => {
  try {
    return await API.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error al llamar a la API de logout:', error);
    throw error;
  }
};

const authService = {
  logout,
};

export default authService
