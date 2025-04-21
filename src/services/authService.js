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

export default {
  logout,
};

// import API from '../api/axios';

// const login = async (credentials) => {
//   try {
//     return await API.post('/login', credentials);
//   } catch (error) {
//     console.error('Error al llamar a la API de login:', error);
//     throw error;
//   }
// };

// const logout = async () => {
//   const token = sessionStorage.getItem('authToken');
//   try {
//     return await API.post('/logout', {}, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   } catch (error) {
//     console.error('Error al llamar a la API de logout:', error);
//     throw error;
//   }
// };

// export default {
//   login,
//   logout,
// };