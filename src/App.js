import './App.css'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Events from './components/Events';
import Scores from './components/Scores';
import Calendar from './components/Calendar';
import Login from './components/Login';

function App() { 
  return (
    <Router>
      <div className="layout">
        <header className="header">
          <nav>
            <ul className="nav-list">
              <li><NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>Eventos</NavLink></li>
              <li><NavLink to="/scores" className={({ isActive }) => (isActive ? 'active' : '')}>Partituras</NavLink></li>
              <li><NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active' : '')}>Calendario</NavLink></li>
              <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>              
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/events" element={<Events/>} />
            <Route path="/scores" element={<Scores/>} />
            <Route path="/calendar" element={<Calendar/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
