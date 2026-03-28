// Duay Global Trade | Hesaplamaci.jsx | K10 | v1.0 | 2026-03-28
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Hesaplamaci() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ fiyat: 5000000, pesinat: 1500000, oran: 3.5, kira: 45000, sure: 120 });
  const [sonuc, setSonuc] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: Number(v) }));

  const hesapla = () => {
    // K10 — Integer aritmetik, division-by-zero koruma
    const kredi = form.fiyat - form.pesinat;
    const aylikOran = form.oran / 100;
    if (aylikOran === 0 || form.sure === 0) return;
    // Kredi taksit formülü
    const taksit = Math.round((kredi * aylikOran * Math.pow(1 + aylikOran, form.sure)) / (Math.pow(1 + aylikOran, form.sure) - 1));
    const toplamMaliyet = Math.round(form.pesinat + taksit * form.sure);
    const amortisman = form.kira > 0 ? Math.round((form.fiyat / (form.kira * 12)) * 10) / 10 : null;
    setSonuc({ taksit, toplamMaliyet, amortisman });
  };

  return (
    <div className="page" style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>{t('calculator')}</h1>
      <div className="card">
        <div className="calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[
            [t('total_price') + ' (₺)', 'fiyat'],
            [t('down_payment') + ' (₺)', 'pesinat'],
            [t('loan_rate') + ' (aylık %)', 'oran'],
            [t('rent') + ' (₺)', 'kira'],
            [t('years') + ' (ay)', 'sure'],
          ].map(([label, key]) => (
            <div key={key}>
              <label style={{ fontSize: 12, color: '#8A8880', display: 'block', marginBottom: 6 }}>{label}</label>
              <input type="number" value={form[key]} onChange={e => set(key, e.target.value)} />
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={hesapla} style={{ width: '100%' }}>{t('calculate')}</button>

        {sonuc && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 24 }}>
            {[
              [t('monthly_payment'), `₺${sonuc.taksit.toLocaleString('tr')}`, '#3498DB'],
              [t('total_cost'), `₺${(sonuc.toplamMaliyet / 1000000).toFixed(2)}M`, '#E74C3C'],
              [t('amortization'), sonuc.amortisman ? `${sonuc.amortisman} Yıl` : '—', '#2ECC71'],
            ].map(([l, v, c]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #2A2D38', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#8A8880', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.05em' }}>{l}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: c }}>{v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
