const firebaseConfig = {
  apiKey: "AIzaSyB5eValPPkRuPtJIgDnB7jRWOt2zythuRI",
  authDomain: "companyplatform-9e1a8.firebaseapp.com",
  projectId: "companyplatform-9e1a8",
  storageBucket: "companyplatform-9e1a8.firebasestorage.app",
  messagingSenderId: "526343866340",
  appId: "1:526343866340:web:31f9c04b85e284eac7e9f1"
};

firebase.initializeApp(firebaseConfig);

const db      = firebase.firestore();
const auth    = firebase.auth();
const storage = firebase.storage();

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

async function toGetAll(col, orderBy = "createdAt", direction = "desc") {
  try {
    const snap = await db.collection(col).orderBy(orderBy, direction).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) { console.error("toGetAll:", e); return []; }
}

async function toGet(col, id) {
  try {
    const doc = await db.collection(col).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch (e) { console.error("toGet:", e); return null; }
}

async function toUpdate(col, id, data) {
  try {
    await db.collection(col).doc(id).update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (e) { console.error("toUpdate:", e); return false; }
}

async function toDelete(col, id) {
  try {
    await db.collection(col).doc(id).delete();
    return true;
  } catch (e) { console.error("toDelete:", e); return false; }
}

async function toQuery(col, field, op, value) {
  try {
    const snap = await db.collection(col).where(field, op, value).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) { console.error("toQuery:", e); return []; }
}

function toDate(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

function toMoney(n, cur = "USD") {
  if (!n) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: cur, minimumFractionDigits: 0 }).format(n);
}

console.log("%cTradeOS Firebase bağlandı ✓", "color:#1D9E75;font-weight:bold");
