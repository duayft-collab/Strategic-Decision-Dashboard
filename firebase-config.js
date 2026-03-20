// ============================================================
// ADIM 1: Bu dosyayı Firebase bilgilerinizle doldurun
// Firebase Console > Proje Ayarları > Uygulamalar > SDK
// ============================================================

const firebaseConfig = {
  apiKey:            "BURAYA_API_KEY",
  authDomain:        "BURAYA_AUTH_DOMAIN",
  projectId:         "BURAYA_PROJECT_ID",
  storageBucket:     "BURAYA_STORAGE_BUCKET",
  messagingSenderId: "BURAYA_MESSAGING_SENDER_ID",
  appId:             "BURAYA_APP_ID"
};

// Firebase başlatma
firebase.initializeApp(firebaseConfig);

// Global kısayollar
const db      = firebase.firestore();
const auth    = firebase.auth();
const storage = firebase.storage();

// ============================================================
// TradeOS Koleksiyon İsimleri
// ============================================================
const C = {
  users        : "to_users",
  firms        : "to_firms",
  orders       : "to_orders",
  documents    : "to_documents",
  invoices     : "to_invoices",
  metals       : "to_metals",
  activities   : "to_activities",
  announcements: "to_announcements",
  tasks        : "to_tasks",
  archive      : "to_archive",
  samples      : "to_samples",
  freight      : "to_freight",
  leaves       : "to_leaves",
  bonuses      : "to_bonuses",
  timesheet    : "to_timesheet",
  reference    : "to_reference",
  meetings     : "to_meetings",
  candidates   : "to_candidates",
};

// ============================================================
// Yardımcı CRUD Fonksiyonları
// ============================================================

// Ekle
async function toAdd(col, data) {
  try {
    const ref = await db.collection(col).add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: auth.currentUser?.uid || "system"
    });
    return ref.id;
  } catch (e) { console.error("toAdd:", e); return null; }
}

// Tümünü getir
async function toGetAll(col, orderBy = "createdAt", direction = "desc") {
  try {
    const snap = await db.collection(col).orderBy(orderBy, direction).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) { console.error("toGetAll:", e); return []; }
}

// Tekil getir
async function toGet(col, id) {
  try {
    const doc = await db.collection(col).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch (e) { console.error("toGet:", e); return null; }
}

// Güncelle
async function toUpdate(col, id, data) {
  try {
    await db.collection(col).doc(id).update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (e) { console.error("toUpdate:", e); return false; }
}

// Sil
async function toDelete(col, id) {
  try {
    await db.collection(col).doc(id).delete();
    return true;
  } catch (e) { console.error("toDelete:", e); return false; }
}

// Filtreli sorgu
async function toQuery(col, field, op, value) {
  try {
    const snap = await db.collection(col).where(field, op, value).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) { console.error("toQuery:", e); return []; }
}

// Realtime listener
function toListen(col, callback, field = "createdAt") {
  return db.collection(col)
    .orderBy(field, "desc")
    .onSnapshot(snap => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(data);
    });
}

// Dosya yükle
async function toUpload(file, path) {
  try {
    const ref = storage.ref(`${path}/${Date.now()}_${file.name}`);
    const task = await ref.put(file);
    return await ref.getDownloadURL();
  } catch (e) { console.error("toUpload:", e); return null; }
}

// Tarih formatla
function toDate(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

// Para formatla
function toMoney(n, cur = "USD") {
  if (!n) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: cur, minimumFractionDigits: 0 }).format(n);
}

// Aktivite logu
async function toLog(action, detail = "") {
  await toAdd(C.activities, {
    action,
    detail,
    user: auth.currentUser?.displayName || "Kullanıcı",
    userUid: auth.currentUser?.uid || ""
  });
}

console.log("%cTradeOS Firebase bağlandı ✓", "color:#1D9E75;font-weight:bold");
