// Duay Global Trade | Login.jsx | K02 K04 | v1.0 | 2026-03-28
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      nav('/');
    } catch (err) {
      setError(err.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0E0F11',
    }}>
      <div style={{
        background: '#161820', border: '1px solid #2A2D38', borderRadius: 14,
        padding: 40, width: '100%', maxWidth: 400,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏢</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#C9A84C' }}>Property OS</h1>
          <p style={{ fontSize: 13, color: '#8A8880', marginTop: 4 }}>Gayrimenkul Yatırım Yönetimi</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#8A8880', display: 'block', marginBottom: 6 }}>{t('email')}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="ornek@mail.com" />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, color: '#8A8880', display: 'block', marginBottom: 6 }}>{t('password')}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          {error && <div style={{ background: 'rgba(231,76,60,.1)', border: '1px solid rgba(231,76,60,.3)', borderRadius: 8, padding: '10px 14px', color: '#E74C3C', fontSize: 13, marginBottom: 16 }}>{error}</div>}
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? t('loading') : t('login')}
          </button>
        </form>
      </div>
    </div>
  );
}
