// Duay Global Trade | logService.js | K05 | v1.0 | 2026-03-28
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const LogModule = {
  kaydet: async ({ uid, kullanici, rol, tip, aciklama, detay = {} }) => {
    try {
      await addDoc(collection(db, 'logs'), {
        uid, kullanici, rol, tip, aciklama, detay,
        zaman: serverTimestamp(),
      });
    } catch (err) {
      console.error('[LogModule] Hata:', err);
    }
  },
};
