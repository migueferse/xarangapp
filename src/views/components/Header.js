import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/main.scss';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        <div className="logo">
          <NavLink to="/">
            <img src="/assets/LogoXulivert.png" alt="Xulivert Logo" />
          </NavLink>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Menú">
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><NavLink to="/events" className="nav-link" onClick={closeMenu}>Eventos</NavLink></li>
            <li><NavLink to="/scores" className="nav-link" onClick={closeMenu}>Partituras</NavLink></li>
            <li><NavLink to="/calendar" className="nav-link" onClick={closeMenu}>Calendario</NavLink></li>
            <li><NavLink to="/musicians" className="nav-link" onClick={closeMenu}>Músicos</NavLink></li>
            {isAuthenticated && (
              <li><NavLink to="/profile/pending-events" className="nav-link" onClick={closeMenu}>Invitaciones</NavLink></li>
            )}
            {isAuthenticated ? (
              <li><button onClick={logout} className="nav-link btn-link">Cerrar Sesión</button></li>
            ) : (
              <li><NavLink to="/login" className="nav-link" onClick={closeMenu}>Login</NavLink></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
