// Duay Global Trade | Dashboard.jsx | K07 K10 | v1.0 | 2026-03-28
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { mulkleriGetir, mulkSil, hesaplaRoi } from '../services/mulkService';
import { getGoldTry, getUsdTry, getBtcTry } from '../services/priceService';
import { Toast, ConfirmModal } from '../components/Toast';
import StatCard from '../components/StatCard';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from 'chart.js';
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [mulkler, setMulkler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [fiyatlar, setFiyatlar] = useState({ gold: null, usd: null, btc: null });
  const undoRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    mulkleriGetir(user.uid).then(data => { setMulkler(data); setLoading(false); });
    Promise.all([getGoldTry(), getUsdTry(), getBtcTry()]).then(([gold, usd, btc]) => setFiyatlar({ gold, usd, btc }));
  }, [user]);

  // K06 — Soft delete + 30 sn undo
  const handleSil = (mulk) => {
    setConfirm({
      message: t('confirm_delete'),
      onConfirm: async () => {
        setConfirm(null);
        const yedek = [...mulkler];
        setMulkler(prev => prev.filter(m => m.id !== mulk.id));
        await mulkSil(user.uid, user.email, mulk.id, mulk.name);
        let cancelled = false;
        undoRef.current = () => { cancelled = true; setMulkler(yedek); };
        setToast({
          message: `${mulk.name} ${t('deleted')}`, type: 'warn',
          onUndo: () => { undoRef.current?.(); setToast(null); },
        });
        setTimeout(() => { if (!cancelled) setToast(null); undoRef.current = null; }, 30000);
      },
      onCancel: () => setConfirm(null),
    });
  };

  const toplam = mulkler.reduce((s, m) => s + (m.current_value || 0), 0);
  const toplamAlis = mulkler.reduce((s, m) => s + (m.purchase_price || 0), 0);
  const kar = toplam - toplamAlis;
  const karPct = toplamAlis > 0 ? Math.round(((kar / toplamAlis) * 10000)) / 100 : 0;

  // Basit portföy grafiği verisi (alış → güncel)
  const chartData = {
    labels: mulkler.map(m => m.name?.slice(0, 12) || ''),
    datasets: [{
      data: mulkler.map(m => m.current_value || 0),
      borderColor: '#C9A84C', backgroundColor: 'rgba(201,168,76,.1)',
      fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#C9A84C',
    }],
  };
  const chartOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: '#2A2D38' }, ticks: { color: '#8A8880', font: { size: 11 } } },
      y: { grid: { color: '#2A2D38' }, ticks: { color: '#8A8880', font: { size: 11 }, callback: v => '₺' + (v / 1000000).toFixed(1) + 'M' } },
    },
  };

  if (loading) return <div className="page" style={{ color: '#8A8880' }}>{t('loading')}</div>;

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>{t('dashboard')}</h1>
        <Link to="/ekle" className="btn-primary" style={{ padding: '9px 18px', fontSize: 13, borderRadius: 8, background: '#C9A84C', color: '#0E0F11', fontWeight: 600 }}>
          + {t('add_property')}
        </Link>
      </div>

      {/* İstatistik kartları */}
      <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        <StatCard label={t('portfolio')} value={`₺${(toplam / 1000000).toFixed(2)}M`} color="#C9A84C" />
        <StatCard label={t('profit')} value={`${kar >= 0 ? '+' : ''}₺${(kar / 1000000).toFixed(2)}M`} sub={`${karPct >= 0 ? '+' : ''}${karPct}%`} color={kar >= 0 ? '#2ECC71' : '#E74C3C'} />
        <StatCard label={t('vs_gold')} value={fiyatlar.gold ? `₺${fiyatlar.gold.toLocaleString('tr')}` : '—'} sub="gram/TL" color="#F39C12" />
        <StatCard label={t('vs_usd')} value={fiyatlar.usd ? `₺${Math.round(fiyatlar.usd).toLocaleString('tr')}` : '—'} sub="1 USD" color="#3498DB" />
      </div>

      {/* Grafik */}
      {mulkler.length > 0 && (
        <div className="card" style={{ marginBottom: 24, height: 200 }}>
          <Line data={chartData} options={chartOpts} />
        </div>
      )}

      {/* Mülk kartları */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: '#8A8880' }}>{t('properties')}</h2>
      {mulkler.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: '#8A8880', padding: 48 }}>
          <p>{t('no_properties')}</p>
          <Link to="/ekle" className="btn-primary" style={{ display: 'inline-block', marginTop: 16, padding: '10px 20px', borderRadius: 8, background: '#C9A84C', color: '#0E0F11', fontWeight: 600 }}>
            {t('add_property')}
          </Link>
        </div>
      ) : (
        <div className="prop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {mulkler.map(m => {
            const roi = hesaplaRoi(m.purchase_price, m.current_value);
            const kar = (m.current_value || 0) - (m.purchase_price || 0);
            return (
              <div key={m.id} className="card" style={{ position: 'relative' }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: '#8A8880', marginBottom: 12, fontFamily: 'monospace' }}>
                  {t(m.type) || m.type} · {m.location}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#8A8880' }}>{t('buy_price')}</span>
                  <span>₺{m.purchase_price?.toLocaleString('tr')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 10 }}>
                  <span style={{ color: '#8A8880' }}>{t('current_value')}</span>
                  <span>₺{m.current_value?.toLocaleString('tr')}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: kar >= 0 ? '#2ECC71' : '#E74C3C', marginBottom: 14 }}>
                  {kar >= 0 ? '+' : ''}₺{kar.toLocaleString('tr')} ({roi >= 0 ? '+' : ''}{roi}%)
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link to={`/mulk/${m.id}`} style={{
                    flex: 1, textAlign: 'center', background: 'rgba(201,168,76,.12)',
                    border: '1px solid rgba(201,168,76,.3)', color: '#C9A84C',
                    borderRadius: 7, padding: '7px 0', fontSize: 12, fontWeight: 500,
                  }}>{t('detail')}</Link>
                  <button onClick={() => handleSil(m)} style={{
                    background: 'rgba(231,76,60,.1)', border: '1px solid rgba(231,76,60,.25)',
                    color: '#E74C3C', borderRadius: 7, padding: '7px 12px', fontSize: 12,
                  }}>{t('delete')}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      {confirm && <ConfirmModal {...confirm} />}
    </div>
  );
}
