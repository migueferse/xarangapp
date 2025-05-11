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
    return success;
  };

  return { handleLogin, loginError };
};

export default LoginController;
