// Duay Global Trade | App.jsx | K02 K04 | v1.0 | 2026-03-28
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MulkDetay from './pages/MulkDetay';
import MulkEkle from './pages/MulkEkle';
import Hesaplamaci from './pages/Hesaplamaci';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (user === undefined) return <div style={{ color: '#E8E6DF', padding: 40 }}>Yükleniyor...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user } = useAuth();
  return (
    <div style={{ minHeight: '100vh', background: '#0E0F11', color: '#E8E6DF' }}>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/mulk/:id" element={<PrivateRoute><MulkDetay /></PrivateRoute>} />
        <Route path="/ekle" element={<PrivateRoute><MulkEkle /></PrivateRoute>} />
        <Route path="/hesaplama" element={<PrivateRoute><Hesaplamaci /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
