import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './views/components/Header';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <header className="header">
        <Header />
      </header>
      <main className="main-content">
        <AppRoutes />
      </main>
    </Router>

  );
}

export default App;
