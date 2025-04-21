import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const LoginController = () => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (formData) => {
    setLoginError('');
    const success = await login(formData);
    if (!success) {
      setLoginError('Error al iniciar sesión: Credenciales inválidas.');
    }
    return success; // Devuelve true o false para que el componente Login pueda reaccionar si es necesario
  };

  return { handleLogin, loginError };
};

export default LoginController;
// import loginService from '../services/loginService';

// const handleLogin = async (formData, navigate, setLoginError) => {
//   try {
//     const response = await loginService.login(formData);

//     if (response && response.token) {
//       sessionStorage.setItem('authToken', response.token);
//       navigate('/events');
//       return true;
//     } else {
//       setLoginError('Error al iniciar sesión: No se recibió un token.');
//       return false;
//     }
//   } catch (error) {
//     console.error('Error al iniciar sesión en el controlador:', error);
//     if (error.response && error.response.data && error.response.data.message) {
//       setLoginError(`Error al iniciar sesión: ${error.response.data.message}`);
//     } else if (error.response && error.response.data && error.response.data.errors) {
//       const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
//       setLoginError(`Error al iniciar sesión: ${errorMessages}`);
//     } else {
//       setLoginError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
//     }
//     return false;
//   }
// };

// export default {
//   handleLogin,
// };