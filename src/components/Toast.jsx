// Duay Global Trade | Toast.jsx | K04 K06 | v1.0 | 2026-03-28
// K06: Undo butonu — 30 saniyelik geri al penceresi
// K12: native alert()/confirm() YASAK — custom modal zorunlu
export function Toast({ message, type = 'info', onClose, onUndo }) {
  const colors = { success: '#2ECC71', error: '#E74C3C', info: '#3498DB', warn: '#F39C12' };
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: '#1E2028', border: `1px solid ${colors[type]}`,
      borderRadius: 10, padding: '12px 18px', color: '#E8E6DF',
      fontSize: 14, display: 'flex', alignItems: 'center', gap: 12,
      minWidth: 260, maxWidth: 360,
    }}>
      <span style={{ flex: 1 }}>{message}</span>
      {onUndo && (
        <button onClick={onUndo} style={{
          background: 'rgba(201,168,76,.2)', border: '1px solid #C9A84C',
          color: '#C9A84C', borderRadius: 6, padding: '4px 10px',
          cursor: 'pointer', fontSize: 12, fontWeight: 600,
        }}>Geri Al</button>
      )}
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: '#8A8880', cursor: 'pointer', fontSize: 18,
      }}>✕</button>
    </div>
  );
}

export function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
      zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#1E2028', border: '1px solid #2A2D38',
        borderRadius: 12, padding: 28, maxWidth: 360, width: '90%',
      }}>
        <p style={{ color: '#E8E6DF', marginBottom: 20, lineHeight: 1.6 }}>{message}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onCancel}>İptal</button>
          <button onClick={onConfirm} style={{
            background: 'rgba(231,76,60,.15)', border: '1px solid #E74C3C',
            color: '#E74C3C', borderRadius: 8, padding: '10px 18px', fontWeight: 600,
          }}>Sil</button>
        </div>
      </div>
    </div>
  );
}
