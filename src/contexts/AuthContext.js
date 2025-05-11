import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import loginService from '../services/loginService';
import authService from '../services/authService';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = useCallback(async (token) => {
    try {
      const userData = await userService.getUser(token);
      setUser(userData);
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem('authToken');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    if (token) {
      fetchUser(token);
    }
  }, [fetchUser]);

  const login = async (credentials) => {
    try {
      const response = await loginService.login(credentials);
      if (response && response.token) {
        sessionStorage.setItem('authToken', response.token);
        setIsAuthenticated(true);
        await fetchUser(response.token);
        navigate('/events');
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
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
      await authService.logout(token);
      sessionStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
