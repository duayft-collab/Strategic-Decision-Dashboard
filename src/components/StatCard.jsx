// Duay Global Trade | StatCard.jsx | K12 | v1.0 | 2026-03-28
export default function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: '#1E2028', border: '1px solid #2A2D38', borderRadius: 10, padding: '16px 20px',
    }}>
      <div style={{ fontSize: 11, color: '#8A8880', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color || '#E8E6DF' }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#8A8880', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
