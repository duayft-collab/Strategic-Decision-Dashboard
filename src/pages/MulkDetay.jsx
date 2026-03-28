// Duay Global Trade | MulkDetay.jsx | K10 | v1.0 | 2026-03-28
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { mulkleriGetir, hesaplaRoi } from '../services/mulkService';
import { getGoldTry, getUsdTry, getBtcTry } from '../services/priceService';

export default function MulkDetay() {
  const { id } = useParams();
  const { user } = useAuth();
  const { t } = useTranslation();
  const nav = useNavigate();
  const [mulk, setMulk] = useState(null);
  const [fiyatlar, setFiyatlar] = useState({ gold: null, usd: null, btc: null });

  useEffect(() => {
    if (!user) return;
    mulkleriGetir(user.uid).then(list => {
      const m = list.find(x => x.id === id);
      if (!m) nav('/');
      setMulk(m);
    });
    Promise.all([getGoldTry(), getUsdTry(), getBtcTry()]).then(([gold, usd, btc]) => setFiyatlar({ gold, usd, btc }));
  }, [user, id]);

  if (!mulk) return <div className="page" style={{ color: '#8A8880' }}>{t('loading')}</div>;

  const kar = (mulk.current_value || 0) - (mulk.purchase_price || 0);
  const roi = hesaplaRoi(mulk.purchase_price, mulk.current_value);

  // K10 — Alternatif hesaplama (basit: aynı TL ile bugün o varlık kaç olur)
  const hesapla = (bugunFiyat, alisGunuFiyat) => {
    if (!bugunFiyat || !alisGunuFiyat) return null;
    const miktar = mulk.purchase_price / alisGunuFiyat;
    const bugun = Math.round(miktar * bugunFiyat);
    const fark = Math.round(((mulk.current_value - bugun) / bugun) * 10000) / 100;
    return { bugun, fark };
  };

  // Tahmini alış günü fiyatları (gerçek tarihsel veri için premium API gerekir)
  // Şimdilik mevcut fiyatların %40'ı olarak varsayıyoruz (demo)
  const goldAlis = fiyatlar.gold ? fiyatlar.gold * 0.4 : null;
  const usdAlis = fiyatlar.usd ? fiyatlar.usd * 0.35 : null;
  const btcAlis = fiyatlar.btc ? fiyatlar.btc * 0.05 : null;

  const goldSon = hesapla(fiyatlar.gold, goldAlis);
  const usdSon = hesapla(fiyatlar.usd, usdAlis);
  const btcSon = hesapla(fiyatlar.btc, btcAlis);

  const CompareRow = ({ emoji, label, sonuc }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #2A2D38' }}>
      <span style={{ fontSize: 14 }}>{emoji} {label}</span>
      {sonuc ? (
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, color: '#E8E6DF' }}>₺{sonuc.bugun.toLocaleString('tr')}</div>
          <div style={{ fontSize: 12, color: sonuc.fark >= 0 ? '#2ECC71' : '#E74C3C', fontWeight: 600 }}>
            {sonuc.fark >= 0 ? 'Gayrimenkul +' : 'Alternatif +'}{Math.abs(sonuc.fark)}% avantajlı
          </div>
        </div>
      ) : <span style={{ color: '#8A8880', fontSize: 12 }}>Veri yükleniyor...</span>}
    </div>
  );

  return (
    <div className="page">
      <button onClick={() => nav('/')} style={{ background: 'none', border: 'none', color: '#8A8880', fontSize: 14, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
        ← Geri
      </button>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{mulk.name}</h1>
      <div style={{ fontSize: 12, color: '#8A8880', marginBottom: 24, fontFamily: 'monospace' }}>
        {t(mulk.type)} · {mulk.location} · {mulk.purchase_date}
      </div>

      <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Mülk Bilgileri */}
        <div className="card">
          <h3 style={{ fontSize: 13, color: '#8A8880', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>Mülk Bilgileri</h3>
          {[
            [t('buy_price'), `₺${mulk.purchase_price?.toLocaleString('tr')}`],
            [t('current_value'), `₺${mulk.current_value?.toLocaleString('tr')}`],
            [t('profit_label'), `${kar >= 0 ? '+' : ''}₺${kar.toLocaleString('tr')}`],
            [t('roi'), `${roi >= 0 ? '+' : ''}${roi}%`],
          ].map(([l, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2A2D38', fontSize: 13 }}>
              <span style={{ color: '#8A8880' }}>{l}</span>
              <span style={{ fontWeight: 600, color: l === t('profit_label') ? (kar >= 0 ? '#2ECC71' : '#E74C3C') : '#E8E6DF' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Karşılaştırma */}
        <div className="card">
          <h3 style={{ fontSize: 13, color: '#8A8880', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{t('comparison')}</h3>
          <p style={{ fontSize: 11, color: '#5A5850', marginBottom: 12 }}>Aynı para alternatife yatırılsaydı</p>
          <CompareRow emoji="🥇" label={t('if_gold')} sonuc={goldSon} />
          <CompareRow emoji="💵" label={t('if_usd')} sonuc={usdSon} />
          <CompareRow emoji="₿" label={t('if_btc')} sonuc={btcSon} />
          <div style={{ marginTop: 16, background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)', borderRadius: 8, padding: 12, fontSize: 12, color: '#C9A84C', lineHeight: 1.6 }}>
            💡 Gerçek tarihsel fiyat verisi için premium API entegrasyonu gelecek versiyonda eklenecektir.
          </div>
        </div>
      </div>
    </div>
  );
}
