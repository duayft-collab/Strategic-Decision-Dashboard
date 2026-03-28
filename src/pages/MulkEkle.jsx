// Duay Global Trade | MulkEkle.jsx | K10 K06 | v1.0 | 2026-03-28
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { mulkEkle } from '../services/mulkService';
import { Toast } from '../components/Toast';

export default function MulkEkle() {
  const { user } = useAuth();
  const nav = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', type: 'daire', location: '', purchase_price: '', purchase_date: '', current_value: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mulkEkle(user.uid, user.email, {
        ...form,
        purchase_price: Math.round(Number(form.purchase_price)),
        current_value: form.current_value ? Math.round(Number(form.current_value)) : Math.round(Number(form.purchase_price)),
      });
      nav('/');
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const field = (label, key, type = 'text', placeholder = '') => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12, color: '#8A8880', display: 'block', marginBottom: 6 }}>{label}</label>
      <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder} required={key !== 'current_value'} />
    </div>
  );

  return (
    <div className="page" style={{ maxWidth: 560 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>+ {t('add_property')}</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          {field(t('property_name'), 'name', 'text', 'Kadıköy Dairesi')}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#8A8880', display: 'block', marginBottom: 6 }}>{t('property_type')}</label>
            <select value={form.type} onChange={e => set('type', e.target.value)}>
              {['daire', 'arsa', 'tarla', 'isyeri', 'villa'].map(tp => (
                <option key={tp} value={tp}>{t(tp)}</option>
              ))}
            </select>
          </div>
          {field(t('location'), 'location', 'text', 'Kadıköy, İstanbul')}
          {field(t('buy_price') + ' (₺)', 'purchase_price', 'number', '2800000')}
          {field(t('buy_date'), 'purchase_date', 'date')}
          {field(t('current_value') + ' (₺, opsiyonel)', 'current_value', 'number', '')}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button type="button" className="btn-secondary" onClick={() => nav('/')}>{t('cancel')}</button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? t('loading') : t('save')}
            </button>
          </div>
        </form>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
