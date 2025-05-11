import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './views/components/Header';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <header className="header">
          <Header />
        </header>
        <main className="main-content">
          <AppRoutes />
        </main>
      </AuthProvider>
    </Router>

  );
}

export default App;
