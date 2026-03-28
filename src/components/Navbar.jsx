// Duay Global Trade | Navbar.jsx | K12 K13 | v1.0 | 2026-03-28
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';

export default function Navbar() {
  const { logout, user } = useAuth();
  const { t } = useTranslation();
  const loc = useLocation();

  const link = (to, label) => (
    <Link to={to} style={{
      color: loc.pathname === to ? '#C9A84C' : '#8A8880',
      fontWeight: loc.pathname === to ? 600 : 400,
      fontSize: 14, transition: 'color .2s',
    }}>{label}</Link>
  );

  return (
    <nav style={{
      background: '#161820', borderBottom: '1px solid #2A2D38',
      padding: '0 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 56, position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: 16 }}>🏢 Property OS</span>
        {link('/', t('dashboard'))}
        {link('/ekle', t('add_property'))}
        {link('/hesaplama', t('calculator'))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr')}
          style={{ background: 'none', border: '1px solid #2A2D38', color: '#8A8880', borderRadius: 6, padding: '4px 10px', fontSize: 12 }}>
          {i18n.language === 'tr' ? 'EN' : 'TR'}
        </button>
        <span style={{ fontSize: 12, color: '#8A8880' }}>{user?.email}</span>
        <button onClick={logout} style={{
          background: 'rgba(231,76,60,.1)', border: '1px solid rgba(231,76,60,.3)',
          color: '#E74C3C', borderRadius: 8, padding: '6px 14px', fontSize: 13,
        }}>{t('logout')}</button>
      </div>
    </nav>
  );
}
