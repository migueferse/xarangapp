import React, { createContext, useState, useEffect, useContext } from 'react';
import loginService from '../services/loginService';
import authService from '../services/authService'; // Importa el servicio de logout
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginService.login(credentials);
      if (response && response.token) {
        sessionStorage.setItem('authToken', response.token);
        setIsAuthenticated(true);
        navigate('/events'); // Redirigir después del login
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = async () => {
    const token = sessionStorage.getItem('authToken');
    try {
      await authService.logout(token); // Pasa el token para la invalidación en el backend
      sessionStorage.removeItem('authToken');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);