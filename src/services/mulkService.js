// Duay Global Trade | mulkService.js | K06 K10 | v1.0 | 2026-03-28
import { db } from './firebase';
import { LogModule } from './logService';
import {
  collection, addDoc, updateDoc, getDocs,
  doc, query, where, serverTimestamp,
} from 'firebase/firestore';

const COL = 'mulkler';

// K10 — ROI hesabi (integer aritmetik, float yok)
export function hesaplaRoi(alis, bugun) {
  if (!alis || alis === 0) return 0;
  return Math.round(((bugun - alis) / alis) * 10000) / 100;
}

export async function mulkleriGetir(uid) {
  const q = query(collection(db, COL), where('user_id', '==', uid), where('isDeleted', '==', false));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function mulkEkle(uid, kullanici, veri) {
  const ref = await addDoc(collection(db, COL), {
    ...veri,
    user_id: uid,
    isDeleted: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await LogModule.kaydet({ uid, kullanici, rol: 'user', tip: 'MULK_EKLE', aciklama: `Mülk eklendi: ${veri.name}`, detay: { id: ref.id } });
  return ref.id;
}

// K06 — Soft delete: fiziksel silme YASAK, .splice() YASAK
export async function mulkSil(uid, kullanici, mulkId, mulkAdi) {
  await updateDoc(doc(db, COL, mulkId), {
    isDeleted: true, deletedAt: serverTimestamp(), deletedBy: uid, updatedAt: serverTimestamp(),
  });
  await LogModule.kaydet({ uid, kullanici, rol: 'user', tip: 'MULK_SIL', aciklama: `Mülk silindi: ${mulkAdi}`, detay: { mulkId } });
}

export async function mulkGuncelle(uid, kullanici, mulkId, veri) {
  await updateDoc(doc(db, COL, mulkId), { ...veri, updatedAt: serverTimestamp() });
  await LogModule.kaydet({ uid, kullanici, rol: 'user', tip: 'MULK_GUNCELLE', aciklama: 'Mülk güncellendi', detay: { mulkId } });
}
