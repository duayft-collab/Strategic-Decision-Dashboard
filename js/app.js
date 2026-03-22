// ============================================================
// TradeOS — SPA Router
// ============================================================

const FIREBASE_CONFIG = {
apiKey: “AIzaSyB5eValPPkRuPtJIgDnB7jRWOt2zythuRI”,
authDomain: “companyplatform-9e1a8.firebaseapp.com”,
projectId: “companyplatform-9e1a8”,
storageBucket: “companyplatform-9e1a8.firebasestorage.app”,
messagingSenderId: “526343866340”,
appId: “1:526343866340:web:31f9c04b85e284eac7e9f1”
};

firebase.initializeApp(FIREBASE_CONFIG);
const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

// ============================================================
// Router
// ============================================================
const routes = {
login     : renderLogin,
dashboard : renderDashboard,
crm       : renderCRM,
orders    : renderOrders,
finance   : renderFinance,
documents : renderDocuments,
samples   : renderSamples,
freight   : renderFreight,
hr        : renderHR,
tasks     : renderTasks,
calendar  : renderCalendar,
announcements: renderAnnouncements,
archive   : renderArchive,
reference : renderReference,
bonus     : renderBonus,
timesheet : renderTimesheet,
users     : renderUsers,
vision    : renderVision,
};

function navigate(page) {
window.location.hash = page;
}

window.addEventListener(“hashchange”, () => {
const page = window.location.hash.replace(”#”,””) || “dashboard”;
loadPage(page);
});

function loadPage(page) {
const fn = routes[page];
if (fn) fn();
// Aktif nav güncelle
document.querySelectorAll(”.nav-item”).forEach(el => {
el.classList.toggle(“active”, el.dataset.page === page);
});
}

// ============================================================
// Auth
// ============================================================
auth.onAuthStateChanged(user => {
if (!user) {
renderLogin();
} else {
document.getElementById(“user-email”).textContent = user.email;
const page = window.location.hash.replace(”#”,””) || “dashboard”;
renderShell();
loadPage(page);
}
});

function logout() {
auth.signOut();
}

// ============================================================
// Shell (Ana Çerçeve)
// ============================================================
function renderShell() {
document.getElementById(“app”).innerHTML = ` <div class="shell"> <div class="sidebar"> <div class="sidebar-logo"> <div class="logo-title">TradeOS</div> <div class="logo-sub">Uluslararası Ticaret</div> </div> <nav class="sidebar-nav" id="sidebar-nav"> <div class="nav-section">Ana Modüller</div> <div class="nav-item active" data-page="dashboard" onclick="navigate('dashboard')">◎ Dashboard</div> <div class="nav-item" data-page="crm" onclick="navigate('crm')">◻ CRM</div> <div class="nav-item" data-page="orders" onclick="navigate('orders')">◻ Siparişler</div> <div class="nav-item" data-page="documents" onclick="navigate('documents')">◻ Dokümanlar</div> <div class="nav-item" data-page="finance" onclick="navigate('finance')">◻ Finans & Metaller</div> <div class="nav-section">Ürün & Lojistik</div> <div class="nav-item" data-page="samples" onclick="navigate('samples')">◻ Numune Arşivi</div> <div class="nav-item" data-page="freight" onclick="navigate('freight')">◻ Navlun & Kargo</div> <div class="nav-section">Şirket</div> <div class="nav-item" data-page="announcements" onclick="navigate('announcements')">◻ Duyurular</div> <div class="nav-item" data-page="calendar" onclick="navigate('calendar')">◻ Takvim</div> <div class="nav-item" data-page="tasks" onclick="navigate('tasks')">◻ Yapılacaklar</div> <div class="nav-item" data-page="archive" onclick="navigate('archive')">◻ Döküman Arşivi</div> <div class="nav-item" data-page="reference" onclick="navigate('reference')">◻ Referans Dökümanlar</div> <div class="nav-item" data-page="vision" onclick="navigate('vision')">◻ Vizyon Kütüphanesi</div> <div class="nav-section">İK Hub</div> <div class="nav-item" data-page="hr" onclick="navigate('hr')">◻ İK Hub</div> <div class="nav-item" data-page="bonus" onclick="navigate('bonus')">◻ Prim Yönetimi</div> <div class="nav-item" data-page="timesheet" onclick="navigate('timesheet')">◻ Puantaj</div> <div class="nav-section">Yönetim</div> <div class="nav-item" data-page="users" onclick="navigate('users')">◻ Kullanıcılar</div> </nav> <div class="sidebar-footer"> <div class="user-info"> <div class="user-avatar" id="user-avatar">?</div> <div class="user-email" id="user-email">—</div> </div> <button class="logout-btn" onclick="logout()">⎋</button> </div> </div> <div class="main-area"> <div id="page-content"></div> </div> </div>`;
}

// ============================================================
// Yardımcı Fonksiyonlar
// ============================================================
function setContent(html) {
document.getElementById(“page-content”).innerHTML = html;
}

async function dbAdd(col, data) {
return await db.collection(col).add({
…data,
createdAt: firebase.firestore.FieldValue.serverTimestamp(),
updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
createdBy: auth.currentUser?.uid || “”
});
}
async function dbGetAll(col) {
try {
const snap = await db.collection(col).orderBy(“createdAt”,“desc”).get();
return snap.docs.map(d=>({id:d.id,…d.data()}));
} catch(e){ return []; }
}
async function dbUpdate(col, id, data) {
await db.collection(col).doc(id).update({…data, updatedAt: firebase.firestore.FieldValue.serverTimestamp()});
}
async function dbDelete(col, id) {
await db.collection(col).doc(id).delete();
}

function badge(text, color) {
const colors = {
green:“background:#e6f4ea;color:#1e6e2e”,
blue:“background:#e3f0ff;color:#1a5fb4”,
amber:“background:#fef3e2;color:#8a5000”,
red:“background:#fce8e6;color:#c62828”,
gray:“background:#f1f1f1;color:#555”,
purple:“background:#f0eeff;color:#4a3f9e”
};
return `<span style="display:inline-flex;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;${colors[color]||colors.gray}">${text}</span>`;
}

// ============================================================
// LOGIN
// ============================================================
function renderLogin() {
document.getElementById(“app”).innerHTML = ` <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f5f5f3;font-family:-apple-system,sans-serif"> <div style="background:#fff;border-radius:16px;border:1px solid #e0e0e0;padding:40px;width:380px;max-width:95vw"> <div style="font-size:22px;font-weight:600;margin-bottom:6px">TradeOS</div> <div style="font-size:13px;color:#666;margin-bottom:28px">Uluslararası Ticaret Yönetim Sistemi</div> <div id="login-err" style="background:#fee;color:#c00;padding:10px;border-radius:8px;font-size:12px;margin-bottom:14px;display:none"></div> <div style="margin-bottom:14px"> <label style="font-size:12px;color:#666;display:block;margin-bottom:5px;font-weight:500">E-posta</label> <input id="l-email" type="email" placeholder="admin@firma.com" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #ddd;font-size:14px;font-family:inherit"> </div> <div style="margin-bottom:20px"> <label style="font-size:12px;color:#666;display:block;margin-bottom:5px;font-weight:500">Şifre</label> <input id="l-pass" type="password" placeholder="••••••••" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #ddd;font-size:14px;font-family:inherit" onkeydown="if(event.key==='Enter')doLogin()"> </div> <button onclick="doLogin()" style="width:100%;padding:11px;border-radius:8px;background:#1a1a1a;color:#fff;font-size:14px;border:none;cursor:pointer;font-family:inherit"> Giriş Yap </button> </div> </div>`;
}

function doLogin() {
const email = document.getElementById(“l-email”).value;
const pass  = document.getElementById(“l-pass”).value;
const err   = document.getElementById(“login-err”);
err.style.display = “none”;
auth.signInWithEmailAndPassword(email, pass).catch(e => {
err.style.display = “block”;
err.textContent = e.code===“auth/wrong-password” ? “Şifre hatalı” :
e.code===“auth/user-not-found” ? “Kullanıcı bulunamadı” : e.message;
});
}

// ============================================================
// DASHBOARD
// ============================================================
async function renderDashboard() {
setContent(`<div style="padding:24px">
<div style="font-size:20px;font-weight:600;margin-bottom:20px">Hoş geldiniz 👋</div>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px" id="dash-grid"></div>

  </div>`);

const modules = [
{page:“crm”,icon:“◎”,title:“CRM”,sub:“Müşteri & Tedarikçi”,col:“to_firms”},
{page:“orders”,icon:“📦”,title:“Siparişler”,sub:“Sipariş & Sevkiyat”,col:“to_orders”},
{page:“documents”,icon:“📄”,title:“Dokümanlar”,sub:“Belge yönetimi”,col:“to_documents”},
{page:“finance”,icon:“💰”,title:“Finans”,sub:“Alacak & Metaller”,col:“to_invoices”},
{page:“samples”,icon:“🧵”,title:“Numune Arşivi”,sub:“Ürün numuneleri”,col:“to_samples”},
{page:“freight”,icon:“🚢”,title:“Navlun”,sub:“Kargo & Lojistik”,col:“to_freight”},
{page:“hr”,icon:“👥”,title:“İK Hub”,sub:“Personel yönetimi”,col:“to_users”},
{page:“tasks”,icon:“✅”,title:“Yapılacaklar”,sub:“Görev takibi”,col:“to_tasks”},
{page:“announcements”,icon:“📢”,title:“Duyurular”,sub:“Şirket duyuruları”,col:“to_announcements”},
{page:“calendar”,icon:“📅”,title:“Takvim”,sub:“Etkinlikler”,col:null},
{page:“bonus”,icon:“🏆”,title:“Prim”,sub:“Prim yönetimi”,col:“to_bonuses”},
{page:“vision”,icon:“💡”,title:“Vizyon”,sub:“İlham kütüphanesi”,col:null},
];

const grid = document.getElementById(“dash-grid”);
grid.innerHTML = modules.map(m=>` <div onclick="navigate('${m.page}')" style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:18px;cursor:pointer;transition:border-color .15s" onmouseover="this.style.borderColor='#999'" onmouseout="this.style.borderColor='#e0e0e0'"> <div style="font-size:26px;margin-bottom:10px">${m.icon}</div> <div style="font-size:14px;font-weight:500;margin-bottom:3px">${m.title}</div> <div style="font-size:12px;color:#999">${m.sub}</div> <div style="font-size:18px;font-weight:500;margin-top:10px;color:#1a1a1a" id="dash-count-${m.page}">—</div> </div>`).join(””);

// Sayıları yükle
for(const m of modules) {
if(m.col) {
try {
const snap = await db.collection(m.col).get();
const el = document.getElementById(`dash-count-${m.page}`);
if(el) el.textContent = snap.size;
} catch(e){}
}
}
}

// ============================================================
// CRM
// ============================================================
async function renderCRM() {
setContent(` <div style="padding:20px 24px"> <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"> <div style="font-size:18px;font-weight:600">CRM — Müşteri & Tedarikçi</div> <button onclick="crmOpenModal()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px;font-family:inherit">+ Yeni Firma</button> </div> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px"> <div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Toplam</div><div style="font-size:20px;font-weight:500" id="crm-s1">—</div></div> <div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Müşteri</div><div style="font-size:20px;font-weight:500" id="crm-s2">—</div></div> <div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Tedarikçi</div><div style="font-size:20px;font-weight:500" id="crm-s3">—</div></div> <div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Aktif</div><div style="font-size:20px;font-weight:500" id="crm-s4">—</div></div> </div> <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap"> <input id="crm-srch" placeholder="Firma, ülke, kişi ara..." oninput="crmRender()" style="flex:1;max-width:280px;padding:8px 12px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"> <button class="crm-fb active" onclick="crmFilter('tumu',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #ddd;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">Tümü</button> <button class="crm-fb" onclick="crmFilter('musteri',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #ddd;background:transparent;color:#666;font-size:12px;cursor:pointer;font-family:inherit">Müşteri</button> <button class="crm-fb" onclick="crmFilter('tedarikci',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #ddd;background:transparent;color:#666;font-size:12px;cursor:pointer;font-family:inherit">Tedarikçi</button> </div> <div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden"> <table style="width:100%;border-collapse:collapse"> <thead><tr style="border-bottom:1px solid #e0e0e0;background:#fafafa"> <th style="padding:10px 14px;font-size:11px;font-weight:500;color:#999;text-align:left">Firma</th> <th style="padding:10px 14px;font-size:11px;font-weight:500;color:#999;text-align:left">Tür</th> <th style="padding:10px 14px;font-size:11px;font-weight:500;color:#999;text-align:left">Ülke</th> <th style="padding:10px 14px;font-size:11px;font-weight:500;color:#999;text-align:left">İlgili Kişi</th> <th style="padding:10px 14px;font-size:11px;font-weight:500;color:#999;text-align:left">Durum</th> <th style="padding:10px 14px;font-size:11px;font-weight:500;color:#999;text-align:left"></th> </tr></thead> <tbody id="crm-tbody"><tr><td colspan="6" style="text-align:center;padding:40px;color:#999">Yükleniyor...</td></tr></tbody> </table> </div> </div> <div id="crm-modal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:none;align-items:flex-start;justify-content:center;padding-top:60px"> <div style="background:#fff;border-radius:14px;padding:24px;width:500px;max-width:95vw;max-height:80vh;overflow-y:auto"> <div style="font-size:16px;font-weight:600;margin-bottom:18px" id="crm-modal-title">Yeni Firma</div> <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px"> <div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Firma Adı *</label><input id="cf-name" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div> <div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Tür</label><select id="cf-type" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="musteri">Müşteri</option><option value="tedarikci">Tedarikçi</option><option value="ikisi">Her İkisi</option></select></div> <div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Ülke</label><input id="cf-country" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div> <div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Bölge</label><select id="cf-region" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="avrupa">Avrupa</option><option value="asya">Asya</option><option value="ortadogu">Orta Doğu</option><option value="amerika">Amerika</option></select></div> <div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">İlgili Kişi</label><input id="cf-contact" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div> <div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">E-posta</label><input id="cf-email" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div> <div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Telefon</label><input id="cf-phone" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div> <div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Durum</label><select id="cf-status" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="active">Aktif</option><option value="new">Yeni</option><option value="passive">Pasif</option></select></div> </div> <div style="margin-top:12px"><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Not</label><textarea id="cf-note" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit;resize:vertical;min-height:70px"></textarea></div> <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"> <button onclick="crmCloseModal()" style="padding:8px 16px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:13px;cursor:pointer;font-family:inherit">İptal</button> <button onclick="crmSave()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;font-size:13px;cursor:pointer;font-family:inherit">Kaydet</button> </div> </div> </div>`);
await crmLoad();
}

let _crmFirms=[], _crmFilter=“tumu”, _crmEdit=null;

async function crmLoad(){
_crmFirms = await dbGetAll(“to_firms”);
document.getElementById(“crm-s1”).textContent = _crmFirms.length;
document.getElementById(“crm-s2”).textContent = _crmFirms.filter(f=>f.type===“musteri”||f.type===“ikisi”).length;
document.getElementById(“crm-s3”).textContent = _crmFirms.filter(f=>f.type===“tedarikci”||f.type===“ikisi”).length;
document.getElementById(“crm-s4”).textContent = _crmFirms.filter(f=>f.status===“active”).length;
crmRender();
}

function crmRender(){
const q=(document.getElementById(“crm-srch”)?.value||””).toLowerCase();
const list=_crmFirms.filter(f=>{
const mF=_crmFilter===“tumu”||f.type===_crmFilter;
const mQ=!q||(f.name+f.contact+f.country+””).toLowerCase().includes(q);
return mF&&mQ;
});
const ST={active:[“green”,“Aktif”],new:[“blue”,“Yeni”],passive:[“gray”,“Pasif”],risk:[“red”,“Riskli”]};
const TP={musteri:“Müşteri”,tedarikci:“Tedarikçi”,ikisi:“Her İkisi”};
const tbody=document.getElementById(“crm-tbody”);
if(!tbody) return;
if(!list.length){tbody.innerHTML=’<tr><td colspan="6" style="text-align:center;padding:40px;color:#999">Kayıt bulunamadı</td></tr>’;return;}
tbody.innerHTML=list.map(f=>{
const [bc,bl]=ST[f.status]||[“gray”,”—”];
const ini=(f.name||”?”).split(” “).map(w=>w[0]).join(””).slice(0,2).toUpperCase();
return`<tr style="border-bottom:1px solid #f0f0f0;cursor:pointer" onmouseover="this.style.background='#f9f9f9'" onmouseout="this.style.background=''"> <td style="padding:12px 14px"><div style="display:flex;align-items:center;gap:10px"> <div style="width:34px;height:34px;border-radius:50%;background:#e3f0ff;color:#1a5fb4;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0">${ini}</div> <div><div style="font-weight:500;font-size:13px">${f.name||"—"}</div><div style="font-size:11px;color:#999">${f.email||""}</div></div> </div></td> <td style="padding:12px 14px;font-size:12px">${TP[f.type]||"—"}</td> <td style="padding:12px 14px;font-size:12px;color:#666">${f.country||"—"}</td> <td style="padding:12px 14px;font-size:12px">${f.contact||"—"}</td> <td style="padding:12px 14px">${badge(bl,bc)}</td> <td style="padding:12px 14px"> <button onclick="crmOpenEdit('${f.id}')" style="background:none;border:none;cursor:pointer;color:#999;font-size:14px;margin-right:6px">✎</button> <button onclick="crmDelete('${f.id}')" style="background:none;border:none;cursor:pointer;color:#c62828;font-size:14px">🗑</button> </td> </tr>`;}).join(””);
}

function crmFilter(f,el){
_crmFilter=f;
document.querySelectorAll(”.crm-fb”).forEach(x=>{x.style.background=“transparent”;x.style.color=”#666”;});
el.style.background=”#1a1a1a”; el.style.color=”#fff”;
crmRender();
}

function crmOpenModal(){
_crmEdit=null;
document.getElementById(“crm-modal-title”).textContent=“Yeni Firma”;
[“cf-name”,“cf-country”,“cf-contact”,“cf-email”,“cf-phone”,“cf-note”].forEach(id=>{const el=document.getElementById(id);if(el)el.value=””;});
document.getElementById(“crm-modal”).style.display=“flex”;
}

function crmOpenEdit(id){
const f=_crmFirms.find(x=>x.id===id); if(!f) return;
_crmEdit=id;
document.getElementById(“crm-modal-title”).textContent=“Firma Düzenle”;
document.getElementById(“cf-name”).value=f.name||””;
document.getElementById(“cf-type”).value=f.type||“musteri”;
document.getElementById(“cf-country”).value=f.country||””;
document.getElementById(“cf-region”).value=f.region||“avrupa”;
document.getElementById(“cf-contact”).value=f.contact||””;
document.getElementById(“cf-email”).value=f.email||””;
document.getElementById(“cf-phone”).value=f.phone||””;
document.getElementById(“cf-status”).value=f.status||“active”;
document.getElementById(“cf-note”).value=f.note||””;
document.getElementById(“crm-modal”).style.display=“flex”;
}

function crmCloseModal(){ document.getElementById(“crm-modal”).style.display=“none”; }

async function crmSave(){
const name=document.getElementById(“cf-name”).value.trim();
if(!name){alert(“Firma adı zorunlu”);return;}
const data={name,type:document.getElementById(“cf-type”).value,country:document.getElementById(“cf-country”).value.trim(),region:document.getElementById(“cf-region”).value,contact:document.getElementById(“cf-contact”).value.trim(),email:document.getElementById(“cf-email”).value.trim(),phone:document.getElementById(“cf-phone”).value.trim(),status:document.getElementById(“cf-status”).value,note:document.getElementById(“cf-note”).value.trim()};
if(_crmEdit){ await dbUpdate(“to_firms”,_crmEdit,data); }
else { await dbAdd(“to_firms”,data); }
crmCloseModal();
await crmLoad();
}

async function crmDelete(id){
if(!confirm(“Silmek istediğinize emin misiniz?”)) return;
await dbDelete(“to_firms”,id);
await crmLoad();
}

// ============================================================
// Diğer sayfalar — yakında
// ============================================================
function renderOrders(){ setContent(comingSoon(“Siparişler”)); }
function renderFinance(){ setContent(comingSoon(“Finans & Metaller”)); }
function renderDocuments(){ setContent(comingSoon(“Dokümanlar”)); }
function renderSamples(){ setContent(comingSoon(“Numune Arşivi”)); }
function renderFreight(){ setContent(comingSoon(“Navlun & Kargo”)); }
function renderHR(){ setContent(comingSoon(“İK Hub”)); }
function renderTasks(){ setContent(comingSoon(“Yapılacaklar”)); }
function renderCalendar(){ setContent(comingSoon(“Takvim”)); }
function renderAnnouncements(){ setContent(comingSoon(“Duyurular”)); }
function renderArchive(){ setContent(comingSoon(“Döküman Arşivi”)); }
function renderReference(){ setContent(comingSoon(“Referans Dökümanlar”)); }
function renderBonus(){ setContent(comingSoon(“Prim Yönetimi”)); }
function renderTimesheet(){ setContent(comingSoon(“Puantaj”)); }
function renderUsers(){ setContent(comingSoon(“Kullanıcılar”)); }
function renderVision(){ setContent(comingSoon(“Vizyon Kütüphanesi”)); }

function comingSoon(title){
return `<div style="padding:40px;text-align:center">
<div style="font-size:40px;margin-bottom:16px">🚧</div>
<div style="font-size:18px;font-weight:600;margin-bottom:8px">${title}</div>
<div style="font-size:14px;color:#999">Bu modül hazırlanıyor…</div>

  </div>`;
}
