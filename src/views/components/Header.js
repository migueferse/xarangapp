import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
      <nav>
        <ul className="nav-list">
          <li><NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>Eventos</NavLink></li>
          <li><NavLink to="/scores" className={({ isActive }) => (isActive ? 'active' : '')}>Partituras</NavLink></li>
          <li><NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active' : '')}>Calendario</NavLink></li>
          <li><NavLink to="/musicians" className={({ isActive }) => (isActive ? 'active' : '')} >Músicos</NavLink></li>
          {isAuthenticated ? (
          <li>
            <button onClick={logout} className="nav-link">Cerrar Sesión</button>
          </li>
        ) : (
          <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>
        )}
        </ul>
      </nav>
  );
};

export default Header; 
