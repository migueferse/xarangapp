import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
      <nav>
        <ul className="nav-list">
          <li><NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>Eventos</NavLink></li>
          <li><NavLink to="/scores" className={({ isActive }) => (isActive ? 'active' : '')}>Partituras</NavLink></li>
          <li><NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active' : '')}>Calendario</NavLink></li>
          <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>
        </ul>
      </nav>
  );
};

export default Header; 
