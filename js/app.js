const FBCFG = {
  apiKey: "AIzaSyB5eValPPkRuPtJIgDnB7jRWOt2zythuRI",
  authDomain: "companyplatform-9e1a8.firebaseapp.com",
  projectId: "companyplatform-9e1a8",
  storageBucket: "companyplatform-9e1a8.firebasestorage.app",
  messagingSenderId: "526343866340",
  appId: "1:526343866340:web:31f9c04b85e284eac7e9f1"
};

firebase.initializeApp(FBCFG);
var auth = firebase.auth();
var db = firebase.firestore();

auth.onAuthStateChanged(function(user) {
  if (!user) {
    showLogin();
  } else {
    document.getElementById("app").innerHTML = getShell();
    document.getElementById("user-email").textContent = user.email;
    showDashboard();
  }
});

function showLogin() {
  document.getElementById("app").innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f5f5f3;font-family:-apple-system,sans-serif"><div style="background:#fff;border-radius:16px;border:1px solid #e0e0e0;padding:40px;width:380px;max-width:95vw"><div style="font-size:22px;font-weight:600;margin-bottom:6px">TradeOS</div><div style="font-size:13px;color:#666;margin-bottom:28px">Uluslararasi Ticaret Yonetim Sistemi</div><div id="lerr" style="background:#fee;color:#c00;padding:10px;border-radius:8px;font-size:12px;margin-bottom:14px;display:none"></div><div style="margin-bottom:14px"><label style="font-size:12px;color:#666;display:block;margin-bottom:5px">E-posta</label><input id="lem" type="email" placeholder="admin@firma.com" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #ddd;font-size:14px;font-family:inherit"></div><div style="margin-bottom:20px"><label style="font-size:12px;color:#666;display:block;margin-bottom:5px">Sifre</label><input id="lpw" type="password" placeholder="..." style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #ddd;font-size:14px;font-family:inherit" onkeydown="if(event.key===\'Enter\')doLogin()"></div><button onclick="doLogin()" style="width:100%;padding:11px;border-radius:8px;background:#1a1a1a;color:#fff;font-size:14px;border:none;cursor:pointer;font-family:inherit">Giris Yap</button></div></div>';
}

function doLogin() {
  var email = document.getElementById("lem").value;
  var pass = document.getElementById("lpw").value;
  var err = document.getElementById("lerr");
  err.style.display = "none";
  auth.signInWithEmailAndPassword(email, pass).catch(function(e) {
    err.style.display = "block";
    err.textContent = e.code === "auth/wrong-password" ? "Sifre hatali" : e.code === "auth/user-not-found" ? "Kullanici bulunamadi" : e.message;
  });
}

function logout() {
  auth.signOut();
}

function getShell() {
  return '<div style="display:flex;height:100vh;overflow:hidden"><div style="width:220px;background:#fff;border-right:1px solid #e0e0e0;display:flex;flex-direction:column;flex-shrink:0;overflow-y:auto"><div style="padding:20px 16px 14px;border-bottom:1px solid #e0e0e0"><div style="font-size:15px;font-weight:600">TradeOS</div><div style="font-size:11px;color:#999;margin-top:2px">Uluslararasi Ticaret</div></div><nav style="padding:10px 8px;flex:1"><div style="font-size:10px;color:#bbb;padding:10px 10px 4px;letter-spacing:.05em;text-transform:uppercase">Ana Moduller</div><div class="ni" onclick="showDashboard()">Dashboard</div><div class="ni" onclick="showCRM()">CRM</div><div class="ni" onclick="showPage(\'Siparisler\')">Siparisler</div><div class="ni" onclick="showPage(\'Dokumanlar\')">Dokumanlar</div><div class="ni" onclick="showPage(\'Finans\')">Finans ve Metaller</div><div style="font-size:10px;color:#bbb;padding:10px 10px 4px;letter-spacing:.05em;text-transform:uppercase">Urun ve Lojistik</div><div class="ni" onclick="showPage(\'Numune Arsivi\')">Numune Arsivi</div><div class="ni" onclick="showPage(\'Navlun Kargo\')">Navlun ve Kargo</div><div style="font-size:10px;color:#bbb;padding:10px 10px 4px;letter-spacing:.05em;text-transform:uppercase">Sirket</div><div class="ni" onclick="showPage(\'Duyurular\')">Duyurular</div><div class="ni" onclick="showPage(\'Takvim\')">Takvim</div><div class="ni" onclick="showPage(\'Yapilacaklar\')">Yapilacaklar</div><div class="ni" onclick="showPage(\'IK Hub\')">IK Hub</div><div class="ni" onclick="showPage(\'Prim Yonetimi\')">Prim Yonetimi</div><div class="ni" onclick="showPage(\'Puantaj\')">Puantaj</div><div class="ni" onclick="showPage(\'Kullanicilar\')">Kullanicilar</div></nav><div style="padding:12px 14px;border-top:1px solid #e0e0e0;display:flex;align-items:center;gap:8px"><div style="width:28px;height:28px;border-radius:50%;background:#e3f0ff;color:#1a5fb4;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600">A</div><div id="user-email" style="font-size:11px;color:#666;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"></div><button onclick="logout()" style="background:none;border:none;cursor:pointer;color:#999;font-size:14px;padding:4px" title="Cikis">x</button></div></div><div style="flex:1;overflow-y:auto"><div id="pc"></div></div></div>';
}

function setPage(html) {
  var el = document.getElementById("pc");
  if (el) el.innerHTML = html;
  document.querySelectorAll(".ni").forEach(function(x) { x.style.background = ""; x.style.fontWeight = ""; x.style.color = "#666"; });
}

function showPage(title) {
  setPage('<div style="padding:40px;text-align:center"><div style="font-size:36px;margin-bottom:16px">🚧</div><div style="font-size:18px;font-weight:600;margin-bottom:8px">' + title + '</div><div style="font-size:14px;color:#999">Bu modul yakinlarda aktif olacak</div></div>');
}

function showDashboard() {
  setPage('<div style="padding:24px"><div style="font-size:20px;font-weight:600;margin-bottom:20px">Hos geldiniz</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px"><div onclick="showCRM()" style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:18px;cursor:pointer"><div style="font-size:26px;margin-bottom:10px">👥</div><div style="font-size:14px;font-weight:500">CRM</div><div style="font-size:12px;color:#999">Musteri ve Tedarikci</div></div><div onclick="showPage(\'Siparisler\')" style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:18px;cursor:pointer"><div style="font-size:26px;margin-bottom:10px">📦</div><div style="font-size:14px;font-weight:500">Siparisler</div><div style="font-size:12px;color:#999">Siparis ve Sevkiyat</div></div><div onclick="showPage(\'Finans\')" style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:18px;cursor:pointer"><div style="font-size:26px;margin-bottom:10px">💰</div><div style="font-size:14px;font-weight:500">Finans</div><div style="font-size:12px;color:#999">Alacak ve Metaller</div></div><div onclick="showPage(\'IK Hub\')" style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:18px;cursor:pointer"><div style="font-size:26px;margin-bottom:10px">👤</div><div style="font-size:14px;font-weight:500">IK Hub</div><div style="font-size:12px;color:#999">Personel yonetimi</div></div><div onclick="showPage(\'Navlun Kargo\')" style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:18px;cursor:pointer"><div style="font-size:26px;margin-bottom:10px">🚢</div><div style="font-size:14px;font-weight:500">Navlun</div><div style="font-size:12px;color:#999">Kargo ve Lojistik</div></div><div onclick="showPage(\'Duyurular\')" style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:18px;cursor:pointer"><div style="font-size:26px;margin-bottom:10px">📢</div><div style="font-size:14px;font-weight:500">Duyurular</div><div style="font-size:12px;color:#999">Sirket duyurulari</div></div></div></div>');
}

var _firms = [];
var _fFilter = "tumu";
var _fEdit = null;

function showCRM() {
  setPage('<div style="padding:20px 24px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><div style="font-size:18px;font-weight:600">CRM</div><button onclick="crmNewModal()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">+ Yeni Firma</button></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px"><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Toplam</div><div style="font-size:20px;font-weight:500" id="cs1">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Musteri</div><div style="font-size:20px;font-weight:500" id="cs2">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Tedarikci</div><div style="font-size:20px;font-weight:500" id="cs3">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Aktif</div><div style="font-size:20px;font-weight:500" id="cs4">-</div></div></div><div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap"><input id="csrch" placeholder="Ara..." oninput="crmRender()" style="flex:1;max-width:260px;padding:8px 12px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><button onclick="crmSetF(\'tumu\',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #1a1a1a;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer">Tumu</button><button onclick="crmSetF(\'musteri\',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #ddd;background:transparent;color:#666;font-size:12px;cursor:pointer">Musteri</button><button onclick="crmSetF(\'tedarikci\',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #ddd;background:transparent;color:#666;font-size:12px;cursor:pointer">Tedarikci</button></div><div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid #e0e0e0;background:#fafafa"><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Firma</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Tur</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Ulke</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Ilgili Kisi</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Durum</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500"></th></tr></thead><tbody id="ctbody"><tr><td colspan="6" style="text-align:center;padding:40px;color:#999">Yukleniyor...</td></tr></tbody></table></div><div id="cmodal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:none;align-items:flex-start;justify-content:center;padding-top:60px"><div style="background:#fff;border-radius:14px;padding:24px;width:500px;max-width:95vw;max-height:80vh;overflow-y:auto"><div style="font-size:16px;font-weight:600;margin-bottom:18px" id="cmtitle">Yeni Firma</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:11px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Firma Adi</label><input id="cfn" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Tur</label><select id="cft" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="musteri">Musteri</option><option value="tedarikci">Tedarikci</option><option value="ikisi">Her Ikisi</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Ulke</label><input id="cfc" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Bolge</label><select id="cfr" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="avrupa">Avrupa</option><option value="asya">Asya</option><option value="ortadogu">Orta Dogu</option><option value="amerika">Amerika</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Ilgili Kisi</label><input id="cfk" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">E-posta</label><input id="cfe" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Telefon</label><input id="cfp" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Durum</label><select id="cfs" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="active">Aktif</option><option value="new">Yeni</option><option value="passive">Pasif</option></select></div></div><div style="margin-top:12px"><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Not</label><textarea id="cfnot" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit;resize:vertical;min-height:60px"></textarea></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button onclick="crmClose()" style="padding:8px 16px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:13px;cursor:pointer">Iptal</button><button onclick="crmSave()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;font-size:13px;cursor:pointer">Kaydet</button></div></div></div></div>');
  crmLoad();
}

function crmLoad() {
  db.collection("to_firms").orderBy("createdAt","desc").get().then(function(snap) {
    _firms = snap.docs.map(function(d) { return Object.assign({id: d.id}, d.data()); });
    var s1 = document.getElementById("cs1");
    var s2 = document.getElementById("cs2");
    var s3 = document.getElementById("cs3");
    var s4 = document.getElementById("cs4");
    if(s1) s1.textContent = _firms.length;
    if(s2) s2.textContent = _firms.filter(function(f){return f.type==="musteri"||f.type==="ikisi";}).length;
    if(s3) s3.textContent = _firms.filter(function(f){return f.type==="tedarikci"||f.type==="ikisi";}).length;
    if(s4) s4.textContent = _firms.filter(function(f){return f.status==="active";}).length;
    crmRender();
  });
}

function crmRender() {
  var q = (document.getElementById("csrch") ? document.getElementById("csrch").value : "").toLowerCase();
  var list = _firms.filter(function(f) {
    var mF = _fFilter === "tumu" || f.type === _fFilter;
    var mQ = !q || (f.name + f.contact + f.country + "").toLowerCase().indexOf(q) > -1;
    return mF && mQ;
  });
  var ST = {active:"Aktif", new:"Yeni", passive:"Pasif", risk:"Riskli"};
  var TP = {musteri:"Musteri", tedarikci:"Tedarikci", ikisi:"Her Ikisi"};
  var tbody = document.getElementById("ctbody");
  if (!tbody) return;
  if (!list.length) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#999">Kayit bulunamadi</td></tr>'; return; }
  tbody.innerHTML = list.map(function(f) {
    var ini = (f.name || "?").split(" ").map(function(w){return w[0];}).join("").slice(0,2).toUpperCase();
    var sl = ST[f.status] || "—";
    return '<tr style="border-bottom:1px solid #f0f0f0" onmouseover="this.style.background=\'#f9f9f9\'" onmouseout="this.style.background=\'\'"><td style="padding:12px 14px"><div style="display:flex;align-items:center;gap:10px"><div style="width:34px;height:34px;border-radius:50%;background:#e3f0ff;color:#1a5fb4;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0">' + ini + '</div><div><div style="font-weight:500;font-size:13px">' + (f.name||"—") + '</div><div style="font-size:11px;color:#999">' + (f.email||"") + '</div></div></div></td><td style="padding:12px 14px;font-size:12px">' + (TP[f.type]||"—") + '</td><td style="padding:12px 14px;font-size:12px;color:#666">' + (f.country||"—") + '</td><td style="padding:12px 14px;font-size:12px">' + (f.contact||"—") + '</td><td style="padding:12px 14px"><span style="display:inline-flex;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;background:#e6f4ea;color:#1e6e2e">' + sl + '</span></td><td style="padding:12px 14px"><button onclick="crmEdit(\'' + f.id + '\')" style="background:none;border:none;cursor:pointer;color:#999;font-size:14px;margin-right:6px">✎</button><button onclick="crmDel(\'' + f.id + '\')" style="background:none;border:none;cursor:pointer;color:#c62828;font-size:14px">🗑</button></td></tr>';
  }).join("");
}

function crmSetF(f, el) {
  _fFilter = f;
  crmRender();
}

function crmNewModal() {
  _fEdit = null;
  document.getElementById("cmtitle").textContent = "Yeni Firma";
  ["cfn","cfc","cfk","cfe","cfp","cfnot"].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=""; });
  document.getElementById("cmodal").style.display = "flex";
}

function crmEdit(id) {
  var f = _firms.find(function(x){return x.id===id;}); if(!f) return;
  _fEdit = id;
  document.getElementById("cmtitle").textContent = "Firma Duzenle";
  document.getElementById("cfn").value = f.name||"";
  document.getElementById("cft").value = f.type||"musteri";
  document.getElementById("cfc").value = f.country||"";
  document.getElementById("cfr").value = f.region||"avrupa";
  document.getElementById("cfk").value = f.contact||"";
  document.getElementById("cfe").value = f.email||"";
  document.getElementById("cfp").value = f.phone||"";
  document.getElementById("cfs").value = f.status||"active";
  document.getElementById("cfnot").value = f.note||"";
  document.getElementById("cmodal").style.display = "flex";
}

function crmClose() { document.getElementById("cmodal").style.display = "none"; }

function crmSave() {
  var name = document.getElementById("cfn").value.trim();
  if (!name) { alert("Firma adi zorunlu"); return; }
  var data = {
    name: name,
    type: document.getElementById("cft").value,
    country: document.getElementById("cfc").value.trim(),
    region: document.getElementById("cfr").value,
    contact: document.getElementById("cfk").value.trim(),
    email: document.getElementById("cfe").value.trim(),
    phone: document.getElementById("cfp").value.trim(),
    status: document.getElementById("cfs").value,
    note: document.getElementById("cfnot").value.trim(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  var promise;
  if (_fEdit) {
    promise = db.collection("to_firms").doc(_fEdit).update(data);
  } else {
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    promise = db.collection("to_firms").add(data);
  }
  promise.then(function() { crmClose(); crmLoad(); });
}

function crmDel(id) {
  if (!confirm("Silmek istediginize emin misiniz?")) return;
  db.collection("to_firms").doc(id).delete().then(function() { crmLoad(); });
}
// ============================================================
// SIPARISLER MODULU
// ============================================================
var _orders = [];
var _oEdit = null;

function showOrders() {
  setPage('<div style="padding:20px 24px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><div style="font-size:18px;font-weight:600">Siparisler</div><button onclick="ordNewModal()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">+ Yeni Siparis</button></div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px"><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Toplam</div><div style="font-size:20px;font-weight:500" id="os1">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Teklif</div><div style="font-size:20px;font-weight:500" id="os2">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Sevkiyatta</div><div style="font-size:20px;font-weight:500" id="os3">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Teslim</div><div style="font-size:20px;font-weight:500" id="os4">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Toplam Deger</div><div style="font-size:20px;font-weight:500" id="os5">-</div></div></div><div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid #e0e0e0;background:#fafafa"><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Ref No</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Firma</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Urun</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Durum</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Tutar</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">ETA</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Incoterm</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500"></th></tr></thead><tbody id="otbody"><tr><td colspan="8" style="text-align:center;padding:40px;color:#999">Yukleniyor...</td></tr></tbody></table></div><div id="omodal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:none;align-items:flex-start;justify-content:center;padding-top:60px"><div style="background:#fff;border-radius:14px;padding:24px;width:520px;max-width:95vw;max-height:80vh;overflow-y:auto"><div style="font-size:16px;font-weight:600;margin-bottom:18px" id="omtitle">Yeni Siparis</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:11px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Ref No</label><input id="orf" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit" placeholder="TR-2026-001"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Firma</label><input id="ofm" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Urun</label><input id="opr" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Tutar (USD)</label><input id="oam" type="number" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Durum</label><select id="ost" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="teklif">Teklif</option><option value="siparis">Siparis</option><option value="uretim">Uretim</option><option value="sevkiyat">Sevkiyatta</option><option value="teslim">Teslim Edildi</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Incoterm</label><select id="oin" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option>FOB</option><option>CIF</option><option>DAP</option><option>EXW</option><option>FCA</option><option>DDP</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Varis Limani</label><input id="opo" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">ETA</label><input id="oet" type="date" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div></div><div style="margin-top:12px"><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Not</label><textarea id="onot" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit;resize:vertical;min-height:60px"></textarea></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button onclick="ordClose()" style="padding:8px 16px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:13px;cursor:pointer">Iptal</button><button onclick="ordSave()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;font-size:13px;cursor:pointer">Kaydet</button></div></div></div></div>');
  ordLoad();
}

function ordLoad() {
  db.collection("to_orders").orderBy("createdAt","desc").get().then(function(snap) {
    _orders = snap.docs.map(function(d) { return Object.assign({id:d.id}, d.data()); });
    var s1=document.getElementById("os1"); if(s1) s1.textContent=_orders.length;
    var s2=document.getElementById("os2"); if(s2) s2.textContent=_orders.filter(function(o){return o.stage==="teklif";}).length;
    var s3=document.getElementById("os3"); if(s3) s3.textContent=_orders.filter(function(o){return o.stage==="sevkiyat";}).length;
    var s4=document.getElementById("os4"); if(s4) s4.textContent=_orders.filter(function(o){return o.stage==="teslim";}).length;
    var total=_orders.reduce(function(s,o){return s+(Number(o.amount)||0);},0);
    var s5=document.getElementById("os5"); if(s5) s5.textContent="$"+total.toLocaleString();
    ordRender();
  });
}

function ordRender() {
  var ST={teklif:"Teklif",siparis:"Siparis",uretim:"Uretim",sevkiyat:"Sevkiyatta",teslim:"Teslim Edildi"};
  var SC={teklif:"background:#e3f0ff;color:#1a5fb4",siparis:"background:#e6f4ea;color:#1e6e2e",uretim:"background:#fef3e2;color:#8a5000",sevkiyat:"background:#f0eeff;color:#4a3f9e",teslim:"background:#f1f1f1;color:#555"};
  var tbody=document.getElementById("otbody"); if(!tbody) return;
  if(!_orders.length){tbody.innerHTML='<tr><td colspan="8" style="text-align:center;padding:40px;color:#999">Kayit yok</td></tr>';return;}
  tbody.innerHTML=_orders.map(function(o){
    var sl=ST[o.stage]||o.stage||"—";
    var sc=SC[o.stage]||"background:#f1f1f1;color:#555";
    return '<tr style="border-bottom:1px solid #f0f0f0" onmouseover="this.style.background=\'#f9f9f9\'" onmouseout="this.style.background=\'\'"><td style="padding:11px 14px;font-size:12px;color:#666">'+(o.ref||"—")+'</td><td style="padding:11px 14px;font-size:13px;font-weight:500">'+(o.firm||"—")+'</td><td style="padding:11px 14px;font-size:12px">'+(o.product||"—")+'</td><td style="padding:11px 14px"><span style="display:inline-flex;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;'+sc+'">'+sl+'</span></td><td style="padding:11px 14px;font-size:13px;font-weight:500">'+(o.amount?"$"+Number(o.amount).toLocaleString():"—")+'</td><td style="padding:11px 14px;font-size:12px;color:#666">'+(o.eta||"—")+'</td><td style="padding:11px 14px;font-size:12px">'+(o.incoterm||"—")+'</td><td style="padding:11px 14px"><button onclick="ordEdit(\''+o.id+'\')" style="background:none;border:none;cursor:pointer;color:#999;font-size:14px;margin-right:6px">✎</button><button onclick="ordDel(\''+o.id+'\')" style="background:none;border:none;cursor:pointer;color:#c62828;font-size:14px">🗑</button></td></tr>';
  }).join("");
}

function ordNewModal(){_oEdit=null;document.getElementById("omtitle").textContent="Yeni Siparis";["orf","ofm","opr","oam","opo","onot"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});document.getElementById("omodal").style.display="flex";}
function ordEdit(id){var o=_orders.find(function(x){return x.id===id;});if(!o)return;_oEdit=id;document.getElementById("omtitle").textContent="Siparis Duzenle";document.getElementById("orf").value=o.ref||"";document.getElementById("ofm").value=o.firm||"";document.getElementById("opr").value=o.product||"";document.getElementById("oam").value=o.amount||"";document.getElementById("ost").value=o.stage||"teklif";document.getElementById("oin").value=o.incoterm||"FOB";document.getElementById("opo").value=o.port||"";document.getElementById("oet").value=o.eta||"";document.getElementById("onot").value=o.note||"";document.getElementById("omodal").style.display="flex";}
function ordClose(){document.getElementById("omodal").style.display="none";}
function ordSave(){
  var ref=document.getElementById("orf").value.trim();
  if(!ref){alert("Ref no zorunlu");return;}
  var data={ref:ref,firm:document.getElementById("ofm").value.trim(),product:document.getElementById("opr").value.trim(),amount:parseFloat(document.getElementById("oam").value)||0,stage:document.getElementById("ost").value,incoterm:document.getElementById("oin").value,port:document.getElementById("opo").value.trim(),eta:document.getElementById("oet").value,note:document.getElementById("onot").value.trim(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
  var p;if(_oEdit){p=db.collection("to_orders").doc(_oEdit).update(data);}else{data.createdAt=firebase.firestore.FieldValue.serverTimestamp();p=db.collection("to_orders").add(data);}
  p.then(function(){ordClose();ordLoad();});
}
function ordDel(id){if(!confirm("Silmek istediginize emin misiniz?"))return;db.collection("to_orders").doc(id).delete().then(function(){ordLoad();});}

// ============================================================
// FINANS MODULU
// ============================================================
var _invoices = [];
var _iEdit = null;

function showFinans() {
  setPage('<div style="padding:20px 24px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><div style="font-size:18px;font-weight:600">Finans ve Alacaklar</div><button onclick="invNewModal()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">+ Fatura Ekle</button></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px"><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Toplam Alacak</div><div style="font-size:20px;font-weight:500" id="is1">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Vadesi Gecen</div><div style="font-size:20px;font-weight:500;color:#c62828" id="is2">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Bu Ay Vade</div><div style="font-size:20px;font-weight:500;color:#8a5000" id="is3">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Fatura Sayisi</div><div style="font-size:20px;font-weight:500" id="is4">-</div></div></div><div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid #e0e0e0;background:#fafafa"><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Firma</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Fatura No</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Tutar</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Para Birimi</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Vade</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Durum</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500"></th></tr></thead><tbody id="itbody"><tr><td colspan="7" style="text-align:center;padding:40px;color:#999">Yukleniyor...</td></tr></tbody></table></div><div id="imodal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:none;align-items:flex-start;justify-content:center;padding-top:60px"><div style="background:#fff;border-radius:14px;padding:24px;width:480px;max-width:95vw;max-height:80vh;overflow-y:auto"><div style="font-size:16px;font-weight:600;margin-bottom:18px" id="imtitle">Fatura Ekle</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:11px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Firma</label><input id="ifm" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Fatura No</label><input id="irf" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Tutar</label><input id="iam" type="number" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Para Birimi</label><select id="icur" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option>USD</option><option>EUR</option><option>TRY</option><option>AED</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Vade Tarihi</label><input id="idue" type="date" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Durum</label><select id="ist" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="vadeli">Vadeli</option><option value="yaklasiyor">Yaklisiyor</option><option value="gecikti">Gecikti</option><option value="odendi">Odendi</option></select></div></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button onclick="invClose()" style="padding:8px 16px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:13px;cursor:pointer">Iptal</button><button onclick="invSave()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;font-size:13px;cursor:pointer">Kaydet</button></div></div></div></div>');
  invLoad();
}

function invLoad(){
  db.collection("to_invoices").orderBy("createdAt","desc").get().then(function(snap){
    _invoices=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
    var total=_invoices.filter(function(i){return i.status!=="odendi";}).reduce(function(s,i){return s+(Number(i.amount)||0);},0);
    var s1=document.getElementById("is1");if(s1)s1.textContent="$"+total.toLocaleString();
    var s2=document.getElementById("is2");if(s2)s2.textContent=_invoices.filter(function(i){return i.status==="gecikti";}).length;
    var s3=document.getElementById("is3");if(s3)s3.textContent=_invoices.filter(function(i){return i.status==="yaklasiyor";}).length;
    var s4=document.getElementById("is4");if(s4)s4.textContent=_invoices.length;
    invRender();
  });
}

function invRender(){
  var ST={vadeli:"background:#e6f4ea;color:#1e6e2e",yaklasiyor:"background:#fef3e2;color:#8a5000",gecikti:"background:#fce8e6;color:#c62828",odendi:"background:#f1f1f1;color:#555"};
  var SL={vadeli:"Vadeli",yaklasiyor:"Yaklisiyor",gecikti:"Gecikti",odendi:"Odendi"};
  var tbody=document.getElementById("itbody");if(!tbody)return;
  if(!_invoices.length){tbody.innerHTML='<tr><td colspan="7" style="text-align:center;padding:40px;color:#999">Kayit yok</td></tr>';return;}
  tbody.innerHTML=_invoices.map(function(inv){
    var sc=ST[inv.status]||"background:#f1f1f1;color:#555";
    var sl=SL[inv.status]||inv.status||"—";
    return '<tr style="border-bottom:1px solid #f0f0f0" onmouseover="this.style.background=\'#f9f9f9\'" onmouseout="this.style.background=\'\'"><td style="padding:11px 14px;font-size:13px;font-weight:500">'+(inv.firm||"—")+'</td><td style="padding:11px 14px;font-size:12px;color:#666">'+(inv.ref||"—")+'</td><td style="padding:11px 14px;font-size:13px;font-weight:500">'+(inv.amount?Number(inv.amount).toLocaleString():"—")+'</td><td style="padding:11px 14px;font-size:12px">'+(inv.currency||"USD")+'</td><td style="padding:11px 14px;font-size:12px">'+(inv.due||"—")+'</td><td style="padding:11px 14px"><span style="display:inline-flex;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;'+sc+'">'+sl+'</span></td><td style="padding:11px 14px"><button onclick="invEdit(\''+inv.id+'\')" style="background:none;border:none;cursor:pointer;color:#999;font-size:14px;margin-right:6px">✎</button><button onclick="invDel(\''+inv.id+'\')" style="background:none;border:none;cursor:pointer;color:#c62828;font-size:14px">🗑</button></td></tr>';
  }).join("");
}

function invNewModal(){_iEdit=null;document.getElementById("imtitle").textContent="Fatura Ekle";["ifm","irf","iam"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});document.getElementById("imodal").style.display="flex";}
function invEdit(id){var inv=_invoices.find(function(x){return x.id===id;});if(!inv)return;_iEdit=id;document.getElementById("imtitle").textContent="Fatura Duzenle";document.getElementById("ifm").value=inv.firm||"";document.getElementById("irf").value=inv.ref||"";document.getElementById("iam").value=inv.amount||"";document.getElementById("icur").value=inv.currency||"USD";document.getElementById("idue").value=inv.due||"";document.getElementById("ist").value=inv.status||"vadeli";document.getElementById("imodal").style.display="flex";}
function invClose(){document.getElementById("imodal").style.display="none";}
function invSave(){
  var firm=document.getElementById("ifm").value.trim();if(!firm){alert("Firma zorunlu");return;}
  var data={firm:firm,ref:document.getElementById("irf").value.trim(),amount:parseFloat(document.getElementById("iam").value)||0,currency:document.getElementById("icur").value,due:document.getElementById("idue").value,status:document.getElementById("ist").value,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
  var p;if(_iEdit){p=db.collection("to_invoices").doc(_iEdit).update(data);}else{data.createdAt=firebase.firestore.FieldValue.serverTimestamp();p=db.collection("to_invoices").add(data);}
  p.then(function(){invClose();invLoad();});
}
function invDel(id){if(!confirm("Silmek istediginize emin misiniz?"))return;db.collection("to_invoices").doc(id).delete().then(function(){invLoad();});}

// ============================================================
// IK HUB MODULU
// ============================================================
var _emps = [];
var _empEdit = null;

function showIK() {
  setPage('<div style="padding:20px 24px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><div style="font-size:18px;font-weight:600">IK Hub - Personel Yonetimi</div><button onclick="empNewModal()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">+ Yeni Calisan</button></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px"><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Toplam Calisan</div><div style="font-size:20px;font-weight:500" id="es1">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Aktif</div><div style="font-size:20px;font-weight:500" id="es2">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Deneme Sureci</div><div style="font-size:20px;font-weight:500" id="es3">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Departman</div><div style="font-size:20px;font-weight:500" id="es4">-</div></div></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px" id="empgrid"><div style="text-align:center;padding:40px;color:#999;grid-column:1/-1">Yukleniyor...</div></div><div id="empmodal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:none;align-items:flex-start;justify-content:center;padding-top:60px"><div style="background:#fff;border-radius:14px;padding:24px;width:500px;max-width:95vw;max-height:80vh;overflow-y:auto"><div style="font-size:16px;font-weight:600;margin-bottom:18px" id="emptitle">Yeni Calisan</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:11px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Ad Soyad</label><input id="ename" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Unvan</label><input id="etitle" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Departman</label><select id="edept" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option>Satis</option><option>Lojistik</option><option>Finans</option><option>Operasyon</option><option>IK</option><option>Yonetim</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Sozlesme</label><select id="econ" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="belirsiz">Belirsiz Sureli</option><option value="belirli">Belirli Sureli</option><option value="deneme">Deneme Sureli</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Ise Baslama</label><input id="estart" type="date" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">E-posta</label><input id="eemail" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Telefon</label><input id="ephone" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Durum</label><select id="estat" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="aktif">Aktif</option><option value="deneme">Deneme</option><option value="pasif">Pasif</option></select></div></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button onclick="empClose()" style="padding:8px 16px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:13px;cursor:pointer">Iptal</button><button onclick="empSave()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;font-size:13px;cursor:pointer">Kaydet</button></div></div></div></div>');
  empLoad();
}

function empLoad(){
  db.collection("to_employees").orderBy("createdAt","desc").get().then(function(snap){
    _emps=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
    var s1=document.getElementById("es1");if(s1)s1.textContent=_emps.length;
    var s2=document.getElementById("es2");if(s2)s2.textContent=_emps.filter(function(e){return e.status==="aktif";}).length;
    var s3=document.getElementById("es3");if(s3)s3.textContent=_emps.filter(function(e){return e.status==="deneme";}).length;
    var depts=new Set(_emps.map(function(e){return e.dept;}));
    var s4=document.getElementById("es4");if(s4)s4.textContent=depts.size;
    empRender();
  });
}

function empRender(){
  var grid=document.getElementById("empgrid");if(!grid)return;
  if(!_emps.length){grid.innerHTML='<div style="text-align:center;padding:40px;color:#999;grid-column:1/-1">Kayit yok</div>';return;}
  var DC={Satis:"#e3f0ff",Lojistik:"#e6f4ea",Finans:"#fef3e2",Operasyon:"#f0eeff",IK:"#fce8f6",Yonetim:"#f1f1f1"};
  var TC={Satis:"#1a5fb4",Lojistik:"#1e6e2e",Finans:"#8a5000",Operasyon:"#4a3f9e",IK:"#8a1c5e",Yonetim:"#333"};
  grid.innerHTML=_emps.map(function(e){
    var ini=(e.name||"?").split(" ").map(function(w){return w[0];}).join("").slice(0,2).toUpperCase();
    var bg=DC[e.dept]||"#f1f1f1"; var tc=TC[e.dept]||"#333";
    var sl=e.status==="aktif"?"Aktif":e.status==="deneme"?"Deneme":"Pasif";
    var sc=e.status==="aktif"?"background:#e6f4ea;color:#1e6e2e":e.status==="deneme"?"background:#fef3e2;color:#8a5000":"background:#f1f1f1;color:#555";
    return '<div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:16px"><div style="display:flex;gap:10px;align-items:center;margin-bottom:12px"><div style="width:40px;height:40px;border-radius:50%;background:'+bg+';color:'+tc+';display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0">'+ini+'</div><div><div style="font-size:13px;font-weight:500">'+(e.name||"—")+'</div><div style="font-size:11px;color:#999">'+(e.title||"—")+'</div></div></div><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:11px;padding:2px 8px;border-radius:20px;background:'+bg+';color:'+tc+'">'+(e.dept||"—")+'</span><span style="font-size:11px;padding:2px 8px;border-radius:20px;'+sc+'">'+sl+'</span></div><div style="display:flex;gap:6px;margin-top:12px"><button onclick="empEdit(\''+e.id+'\')" style="flex:1;padding:6px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:12px;cursor:pointer">Duzenle</button><button onclick="empDel(\''+e.id+'\')" style="flex:1;padding:6px;border-radius:8px;border:1px solid #fce8e6;background:transparent;font-size:12px;cursor:pointer;color:#c62828">Sil</button></div></div>';
  }).join("");
}

function empNewModal(){_empEdit=null;document.getElementById("emptitle").textContent="Yeni Calisan";["ename","etitle","eemail","ephone"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});document.getElementById("empmodal").style.display="flex";}
function empEdit(id){var e=_emps.find(function(x){return x.id===id;});if(!e)return;_empEdit=id;document.getElementById("emptitle").textContent="Calisan Duzenle";document.getElementById("ename").value=e.name||"";document.getElementById("etitle").value=e.title||"";document.getElementById("edept").value=e.dept||"Satis";document.getElementById("econ").value=e.contract||"belirsiz";document.getElementById("estart").value=e.start||"";document.getElementById("eemail").value=e.email||"";document.getElementById("ephone").value=e.phone||"";document.getElementById("estat").value=e.status||"aktif";document.getElementById("empmodal").style.display="flex";}
function empClose(){document.getElementById("empmodal").style.display="none";}
function empSave(){
  var name=document.getElementById("ename").value.trim();if(!name){alert("Ad zorunlu");return;}
  var data={name:name,title:document.getElementById("etitle").value.trim(),dept:document.getElementById("edept").value,contract:document.getElementById("econ").value,start:document.getElementById("estart").value,email:document.getElementById("eemail").value.trim(),phone:document.getElementById("ephone").value.trim(),status:document.getElementById("estat").value,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
  var p;if(_empEdit){p=db.collection("to_employees").doc(_empEdit).update(data);}else{data.createdAt=firebase.firestore.FieldValue.serverTimestamp();p=db.collection("to_employees").add(data);}
  p.then(function(){empClose();empLoad();});
}
function empDel(id){if(!confirm("Silmek istediginize emin misiniz?"))return;db.collection("to_employees").doc(id).delete().then(function(){empLoad();});}

// ============================================================
// DUYURULAR MODULU
// ============================================================
var _anns = [];
var _annEdit = null;

function showDuyurular() {
  setPage('<div style="padding:20px 24px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><div style="font-size:18px;font-weight:600">Duyurular</div><button onclick="annNewModal()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">+ Yeni Duyuru</button></div><div id="annlist"><div style="text-align:center;padding:40px;color:#999">Yukleniyor...</div></div><div id="annmodal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:none;align-items:flex-start;justify-content:center;padding-top:60px"><div style="background:#fff;border-radius:14px;padding:24px;width:500px;max-width:95vw;max-height:80vh;overflow-y:auto"><div style="font-size:16px;font-weight:600;margin-bottom:18px" id="anntitle">Yeni Duyuru</div><div style="margin-bottom:12px"><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Baslik</label><input id="an-title" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:12px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Kategori</label><select id="an-cat" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="genel">Genel</option><option value="operasyon">Operasyon</option><option value="finans">Finans</option><option value="ik">IK</option><option value="acil">Acil</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Oncelik</label><select id="an-pri" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="normal">Normal</option><option value="yuksek">Yuksek</option><option value="kritik">Kritik</option></select></div></div><div style="margin-bottom:12px"><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Mesaj</label><textarea id="an-body" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit;resize:vertical;min-height:100px"></textarea></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button onclick="annClose()" style="padding:8px 16px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:13px;cursor:pointer">Iptal</button><button onclick="annSave()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;font-size:13px;cursor:pointer">Yayinla</button></div></div></div></div>');
  annLoad();
}

function annLoad(){
  db.collection("to_announcements").orderBy("createdAt","desc").get().then(function(snap){
    _anns=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
    annRender();
  });
}

function annRender(){
  var list=document.getElementById("annlist");if(!list)return;
  if(!_anns.length){list.innerHTML='<div style="text-align:center;padding:40px;color:#999">Duyuru yok</div>';return;}
  var PC={normal:"background:#e3f0ff;color:#1a5fb4",yuksek:"background:#fef3e2;color:#8a5000",kritik:"background:#fce8e6;color:#c62828"};
  var PL={normal:"Normal",yuksek:"Yuksek",kritik:"Kritik"};
  list.innerHTML=_anns.map(function(a){
    var pc=PC[a.priority]||PC.normal;
    var pl=PL[a.priority]||"Normal";
    return '<div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:18px;margin-bottom:10px"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px"><div><div style="font-size:14px;font-weight:500;margin-bottom:4px">'+(a.title||"—")+'</div><span style="display:inline-flex;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:500;'+pc+'">'+pl+'</span></div><div style="display:flex;gap:6px"><button onclick="annEdit(\''+a.id+'\')" style="background:none;border:none;cursor:pointer;color:#999;font-size:14px">✎</button><button onclick="annDel(\''+a.id+'\')" style="background:none;border:none;cursor:pointer;color:#c62828;font-size:14px">🗑</button></div></div><div style="font-size:13px;color:#666;line-height:1.6">'+(a.body||"")+'</div></div>';
  }).join("");
}

function annNewModal(){_annEdit=null;document.getElementById("anntitle").textContent="Yeni Duyuru";["an-title","an-body"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});document.getElementById("annmodal").style.display="flex";}
function annEdit(id){var a=_anns.find(function(x){return x.id===id;});if(!a)return;_annEdit=id;document.getElementById("anntitle").textContent="Duyuru Duzenle";document.getElementById("an-title").value=a.title||"";document.getElementById("an-cat").value=a.category||"genel";document.getElementById("an-pri").value=a.priority||"normal";document.getElementById("an-body").value=a.body||"";document.getElementById("annmodal").style.display="flex";}
function annClose(){document.getElementById("annmodal").style.display="none";}
function annSave(){
  var title=document.getElementById("an-title").value.trim();if(!title){alert("Baslik zorunlu");return;}
  var data={title:title,category:document.getElementById("an-cat").value,priority:document.getElementById("an-pri").value,body:document.getElementById("an-body").value.trim(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
  var p;if(_annEdit){p=db.collection("to_announcements").doc(_annEdit).update(data);}else{data.createdAt=firebase.firestore.FieldValue.serverTimestamp();p=db.collection("to_announcements").add(data);}
  p.then(function(){annClose();annLoad();});
}
function annDel(id){if(!confirm("Silmek istediginize emin misiniz?"))return;db.collection("to_announcements").doc(id).delete().then(function(){annLoad();});}

// ============================================================
// SIDEBAR BAGLANTILARI GUNCELLE
// ============================================================
function updateSidebarLinks() {
  var nav = document.getElementById("sidebar-nav") || document.querySelector(".sidebar-nav");
  if (!nav) return;
  var items = nav.querySelectorAll(".ni");
  items.forEach(function(item) {
    var text = item.textContent.trim();
    if (text === "Siparisler") item.setAttribute("onclick", "showOrders()");
    if (text === "Finans ve Metaller") item.setAttribute("onclick", "showFinans()");
    if (text === "IK Hub") item.setAttribute("onclick", "showIK()");
    if (text === "Duyurular") item.setAttribute("onclick", "showDuyurular()");
  });
}

// Dashboard kartlarini guncelle
var _origShowDashboard = showDashboard;
showDashboard = function() {
  _origShowDashboard();
  setTimeout(function() {
    var cards = document.querySelectorAll("#pc div[onclick]");
    cards.forEach(function(card) {
      var onclick = card.getAttribute("onclick");
      if (onclick && onclick.indexOf("showPage") > -1) {
        var title = card.querySelector("div[style*='font-weight:500']");
        if (title) {
          var t = title.textContent;
          if (t === "Siparisler") card.setAttribute("onclick", "showOrders()");
          if (t === "Finans") card.setAttribute("onclick", "showFinans()");
          if (t === "IK Hub") card.setAttribute("onclick", "showIK()");
          if (t === "Duyurular") card.setAttribute("onclick", "showDuyurular()");
        }
      }
    });
  }, 100);
};

// ============================================================
// NAVLUN & KARGO - Detayli
// ============================================================
var _quotes = [];
var _shipments = [
  {id:1,ref:"SHP-041",firm:"Muller & Sohne",route:"Istanbul-Hamburg",mode:"deniz",status:"transit",eta:"28 Mar",cost:"$2,400",agent:"Kuehne+Nagel"},
  {id:2,ref:"SHP-039",firm:"Al Rashid Import",route:"Mersin-Dubai",mode:"deniz",status:"gumruk",eta:"2 Nis",cost:"$1,850",agent:"Agility"},
  {id:3,ref:"SHP-038",firm:"Gulf Star FZE",route:"Istanbul-Sharjah",mode:"hava",status:"transit",eta:"24 Mar",cost:"$4,200",agent:"DHL Express"}
];
var _offers = [];
var _offerEdit = null;

function showNavlun() {
  setPage('<div style="padding:20px 24px"><div style="font-size:18px;font-weight:600;margin-bottom:18px">Navlun & Kargo Yonetimi</div><div style="display:flex;gap:0;border-bottom:1px solid #e0e0e0;margin-bottom:20px" id="navtabs"><div onclick="navTab(\'panel\',this)" style="padding:8px 16px;font-size:13px;cursor:pointer;font-weight:500;border-bottom:2px solid #1a1a1a;margin-bottom:-1px">Genel Bakis</div><div onclick="navTab(\'teklif\',this)" style="padding:8px 16px;font-size:13px;cursor:pointer;color:#666;border-bottom:2px solid transparent;margin-bottom:-1px">Teklif Al</div><div onclick="navTab(\'ver\',this)" style="padding:8px 16px;font-size:13px;cursor:pointer;color:#666;border-bottom:2px solid transparent;margin-bottom:-1px">Teklif Ver</div><div onclick="navTab(\'aktif\',this)" style="padding:8px 16px;font-size:13px;cursor:pointer;color:#666;border-bottom:2px solid transparent;margin-bottom:-1px">Aktif Sevkiyatlar</div></div><div id="nav-content"></div></div>');
  navShowPanel();
}

function navTab(t, el) {
  document.querySelectorAll("#navtabs div").forEach(function(x){x.style.fontWeight="";x.style.color="#666";x.style.borderBottom="2px solid transparent";});
  el.style.fontWeight="500";el.style.color="#1a1a1a";el.style.borderBottom="2px solid #1a1a1a";
  if(t==="panel") navShowPanel();
  else if(t==="teklif") navShowTeklif();
  else if(t==="ver") navShowVer();
  else if(t==="aktif") navShowAktif();
}

function navShowPanel() {
  var c=document.getElementById("nav-content"); if(!c) return;
  c.innerHTML='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px"><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Aktif Sevkiyat</div><div style="font-size:20px;font-weight:500">'+_shipments.length+'</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Denizde</div><div style="font-size:20px;font-weight:500">'+_shipments.filter(function(s){return s.mode==="deniz";}).length+'</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Havada</div><div style="font-size:20px;font-weight:500">'+_shipments.filter(function(s){return s.mode==="hava";}).length+'</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Bu Ay Navlun</div><div style="font-size:20px;font-weight:500">$28.4K</div></div></div>'+
  '<div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid #e0e0e0;background:#fafafa"><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Ref</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Firma</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Guzergah</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Mod</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Durum</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">ETA</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Maliyet</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Acente</th></tr></thead><tbody>'+
  _shipments.map(function(s){
    var mi=s.mode==="deniz"?"🚢":s.mode==="hava"?"✈️":"🚛";
    var sc=s.status==="transit"?"background:#fef3e2;color:#8a5000":s.status==="gumruk"?"background:#f0eeff;color:#4a3f9e":"background:#e6f4ea;color:#1e6e2e";
    var sl=s.status==="transit"?"Transitte":s.status==="gumruk"?"Gumrukte":"Teslim";
    return '<tr style="border-bottom:1px solid #f0f0f0"><td style="padding:10px 14px;font-size:12px;color:#666">'+s.ref+'</td><td style="padding:10px 14px;font-size:13px;font-weight:500">'+s.firm+'</td><td style="padding:10px 14px;font-size:12px">'+s.route+'</td><td style="padding:10px 14px;font-size:16px">'+mi+'</td><td style="padding:10px 14px"><span style="display:inline-flex;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;'+sc+'">'+sl+'</span></td><td style="padding:10px 14px;font-size:12px">'+s.eta+'</td><td style="padding:10px 14px;font-size:13px;font-weight:500">'+s.cost+'</td><td style="padding:10px 14px;font-size:12px;color:#666">'+s.agent+'</td></tr>';
  }).join("")+
  '</tbody></table></div>';
}

function navShowTeklif() {
  var c=document.getElementById("nav-content"); if(!c) return;
  c.innerHTML='<div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:20px;margin-bottom:16px"><div style="font-size:14px;font-weight:500;margin-bottom:16px">Tasima Modu Sec</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px"><div id="m-deniz" onclick="navSelMode(\'deniz\')" style="border:2px solid #1a1a1a;border-radius:12px;padding:16px;cursor:pointer;text-align:center"><div style="font-size:24px;margin-bottom:8px">🚢</div><div style="font-size:13px;font-weight:500">Deniz Navlunu</div><div style="font-size:11px;color:#999">FCL / LCL</div></div><div id="m-hava" onclick="navSelMode(\'hava\')" style="border:1px solid #e0e0e0;border-radius:12px;padding:16px;cursor:pointer;text-align:center"><div style="font-size:24px;margin-bottom:8px">✈️</div><div style="font-size:13px;font-weight:500">Hava Kargo</div><div style="font-size:11px;color:#999">Express / Standart</div></div><div id="m-kara" onclick="navSelMode(\'kara\')" style="border:1px solid #e0e0e0;border-radius:12px;padding:16px;cursor:pointer;text-align:center"><div style="font-size:24px;margin-bottom:8px">🚛</div><div style="font-size:13px;font-weight:500">Kara Kargo</div><div style="font-size:11px;color:#999">TIR / ADR</div></div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Yukleme Yeri</label><input id="rfq-from" placeholder="Istanbul" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Varis Yeri</label><input id="rfq-to" placeholder="Hamburg" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Agirlik (kg)</label><input id="rfq-wt" type="number" placeholder="1000" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div></div><div style="display:flex;justify-content:flex-end;margin-top:14px"><button onclick="navGetQuotes()" style="padding:8px 20px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">Teklif Al →</button></div></div><div id="quotes-result"></div>';
}

var _navMode = "deniz";
function navSelMode(m) {
  _navMode=m;
  ["deniz","hava","kara"].forEach(function(x){var el=document.getElementById("m-"+x);if(el){el.style.border="1px solid #e0e0e0";}});
  var sel=document.getElementById("m-"+m);if(sel)sel.style.border="2px solid #1a1a1a";
}

function navGetQuotes() {
  var from=document.getElementById("rfq-from").value||"Istanbul";
  var to=document.getElementById("rfq-to").value||"Varis";
  var wt=parseFloat(document.getElementById("rfq-wt").value)||1000;
  var base=_navMode==="hava"?4.2:_navMode==="kara"?1.8:0.08;
  var carriers=_navMode==="deniz"?["MSC Mediterranean","Maersk Line","CMA CGM"]:_navMode==="hava"?["Turkish Airlines Cargo","Lufthansa Cargo","DHL Express"]:["DB Schenker","DSV Road","Ekol Lojistik"];
  var prices=carriers.map(function(_,i){return Math.round(wt*base*(1+i*0.12));});
  var min=Math.min.apply(null,prices);
  var res=document.getElementById("quotes-result"); if(!res) return;
  res.innerHTML='<div style="font-size:13px;font-weight:500;margin:16px 0 12px">'+from+' → '+to+' Teklifleri</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">'+
  carriers.map(function(c,i){
    var isBest=prices[i]===min;
    return '<div style="background:#fff;border-radius:12px;border:'+(isBest?"2px solid #1e6e2e":"1px solid #e0e0e0")+';padding:16px;position:relative">'+(isBest?'<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#1e6e2e;color:#fff;font-size:11px;padding:2px 12px;border-radius:20px;white-space:nowrap">En Iyi Fiyat</div>':'')+'<div style="font-size:11px;color:#999;margin-bottom:4px">'+c+'</div><div style="font-size:22px;font-weight:500;margin-bottom:2px">$'+prices[i].toLocaleString()+'</div><div style="font-size:11px;color:#999;margin-bottom:12px">toplam maliyet</div><button onclick="alert(\'Teklif onaylandi: '+c+' - $'+prices[i]+'\')" style="width:100%;padding:7px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:12px">Sec & Onayla</button></div>';
  }).join("")+'</div>';
}

function navShowVer() {
  var c=document.getElementById("nav-content"); if(!c) return;
  c.innerHTML='<div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:20px;margin-bottom:16px"><div style="font-size:14px;font-weight:500;margin-bottom:16px">Musteriye Kargo Teklifi Hazirla</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Musteri Firma</label><input id="ov-firm" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Guzergah</label><input id="ov-route" placeholder="Istanbul-Hamburg" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Tasima Modu</label><select id="ov-mode" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="deniz">🚢 Deniz</option><option value="hava">✈️ Hava</option><option value="kara">🚛 Kara</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Navlun Maliyeti ($)</label><input id="ov-cost" type="number" oninput="navCalcOffer()" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Kar Marji (%)</label><input id="ov-margin" type="number" value="15" oninput="navCalcOffer()" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Teklif Fiyati ($)</label><input id="ov-price" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit;background:#f9f9f9" readonly></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Transit Sure</label><input id="ov-transit" placeholder="18-22 gun" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Incoterm</label><select id="ov-inco" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option>FOB</option><option>CIF</option><option>DAP</option><option>DDP</option></select></div></div><div style="display:flex;justify-content:flex-end;margin-top:14px"><button onclick="navSaveOffer()" style="padding:8px 20px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">Teklif Olustur</button></div></div>'+
  '<div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid #e0e0e0;background:#fafafa"><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Teklif No</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Musteri</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Guzergah</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Fiyat</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Durum</th></tr></thead><tbody id="offers-tbody"><tr><td colspan="5" style="text-align:center;padding:30px;color:#999">Henuz teklif yok</td></tr></tbody></table></div>';
  navLoadOffers();
}

function navCalcOffer() {
  var cost=parseFloat(document.getElementById("ov-cost").value)||0;
  var margin=parseFloat(document.getElementById("ov-margin").value)||0;
  var price=document.getElementById("ov-price");
  if(price) price.value=Math.round(cost*(1+margin/100));
}

function navSaveOffer() {
  var firm=document.getElementById("ov-firm").value.trim();
  if(!firm){alert("Musteri firma zorunlu");return;}
  var data={firm:firm,route:document.getElementById("ov-route").value,mode:document.getElementById("ov-mode").value,price:parseFloat(document.getElementById("ov-price").value)||0,transit:document.getElementById("ov-transit").value,incoterm:document.getElementById("ov-inco").value,status:"bekliyor",createdAt:firebase.firestore.FieldValue.serverTimestamp()};
  db.collection("to_freight").add(data).then(function(){navLoadOffers();});
}

function navLoadOffers() {
  db.collection("to_freight").orderBy("createdAt","desc").get().then(function(snap){
    _offers=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
    var tbody=document.getElementById("offers-tbody"); if(!tbody) return;
    if(!_offers.length){tbody.innerHTML='<tr><td colspan="5" style="text-align:center;padding:30px;color:#999">Henuz teklif yok</td></tr>';return;}
    tbody.innerHTML=_offers.map(function(o){
      return '<tr style="border-bottom:1px solid #f0f0f0"><td style="padding:10px 14px;font-size:12px;color:#666">FRT-'+o.id.slice(-4)+'</td><td style="padding:10px 14px;font-size:13px;font-weight:500">'+(o.firm||"—")+'</td><td style="padding:10px 14px;font-size:12px">'+(o.route||"—")+'</td><td style="padding:10px 14px;font-size:13px;font-weight:500">$'+(o.price?Number(o.price).toLocaleString():"—")+'</td><td style="padding:10px 14px"><span style="display:inline-flex;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;background:#fef3e2;color:#8a5000">Bekliyor</span></td></tr>';
    }).join("");
  });
}

function navShowAktif() {
  var c=document.getElementById("nav-content"); if(!c) return;
  navShowPanel();
}

// ============================================================
// NUMUNE ARSİVİ - Detayli
// ============================================================
var _samples = [];
var _sEdit = null;

function showSamples() {
  setPage('<div style="padding:20px 24px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><div style="font-size:18px;font-weight:600">Numune Arsivi</div><button onclick="smpNew()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">+ Yeni Numune</button></div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px"><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Toplam</div><div style="font-size:20px;font-weight:500" id="sm1">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Stokta</div><div style="font-size:20px;font-weight:500" id="sm2">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Musteride</div><div style="font-size:20px;font-weight:500" id="sm3">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Onaylandi</div><div style="font-size:20px;font-weight:500;color:#1e6e2e" id="sm4">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Bekliyor</div><div style="font-size:20px;font-weight:500;color:#8a5000" id="sm5">-</div></div></div><div style="display:flex;gap:8px;margin-bottom:14px"><input id="sm-srch" placeholder="Kod, urun, firma..." oninput="smpRender()" style="flex:1;max-width:260px;padding:8px 12px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><button onclick="smpFilter(\'tumu\',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #1a1a1a;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer">Tumu</button><button onclick="smpFilter(\'stokta\',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #ddd;background:transparent;color:#666;font-size:12px;cursor:pointer">Stokta</button><button onclick="smpFilter(\'musteride\',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #ddd;background:transparent;color:#666;font-size:12px;cursor:pointer">Musteride</button><button onclick="smpFilter(\'onaylandi\',this)" style="padding:5px 12px;border-radius:20px;border:1px solid #ddd;background:transparent;color:#666;font-size:12px;cursor:pointer">Onaylandi</button></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px" id="smp-grid"></div><div id="smpmodal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:none;align-items:flex-start;justify-content:center;padding-top:60px"><div style="background:#fff;border-radius:14px;padding:24px;width:500px;max-width:95vw;max-height:80vh;overflow-y:auto"><div style="font-size:16px;font-weight:600;margin-bottom:18px" id="smptitle">Yeni Numune</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:11px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Numune Kodu</label><input id="sc-code" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit" placeholder="NM-2026-001"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Urun Adi</label><input id="sc-name" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Kategori</label><select id="sc-cat" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="tekstil">Tekstil</option><option value="kimya">Kimya</option><option value="metal">Metal</option><option value="elektronik">Elektronik</option><option value="gida">Gida</option><option value="makine">Makine</option><option value="diger">Diger</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Durum</label><select id="sc-st" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="stokta">Stokta</option><option value="musteride">Musteride</option><option value="bekliyor">Onay Bekliyor</option><option value="onaylandi">Onaylandi</option><option value="reddedildi">Reddedildi</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Firma</label><input id="sc-firm" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Mensei Ulke</label><input id="sc-origin" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Miktar</label><input id="sc-qty" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit" placeholder="500 gr"></div></div><div style="margin-top:12px"><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Teknik Bilgi</label><textarea id="sc-desc" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit;resize:vertical;min-height:70px"></textarea></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button onclick="smpClose()" style="padding:8px 16px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:13px;cursor:pointer">Iptal</button><button onclick="smpSave()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;font-size:13px;cursor:pointer">Kaydet</button></div></div></div></div>');
  smpLoad();
}

var _sFilter = "tumu";
function smpLoad(){
  db.collection("to_samples").orderBy("createdAt","desc").get().then(function(snap){
    _samples=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
    var s1=document.getElementById("sm1");if(s1)s1.textContent=_samples.length;
    var s2=document.getElementById("sm2");if(s2)s2.textContent=_samples.filter(function(s){return s.status==="stokta";}).length;
    var s3=document.getElementById("sm3");if(s3)s3.textContent=_samples.filter(function(s){return s.status==="musteride";}).length;
    var s4=document.getElementById("sm4");if(s4)s4.textContent=_samples.filter(function(s){return s.status==="onaylandi";}).length;
    var s5=document.getElementById("sm5");if(s5)s5.textContent=_samples.filter(function(s){return s.status==="bekliyor";}).length;
    smpRender();
  });
}

function smpFilter(f,el){_sFilter=f;smpRender();}
function smpRender(){
  var q=(document.getElementById("sm-srch")?document.getElementById("sm-srch").value:"").toLowerCase();
  var list=_samples.filter(function(s){
    var mF=_sFilter==="tumu"||s.status===_sFilter;
    var mQ=!q||(s.code+s.name+s.firm+"").toLowerCase().indexOf(q)>-1;
    return mF&&mQ;
  });
  var CI={tekstil:"🧵",kimya:"⚗️",metal:"🔩",elektronik:"💡",gida:"🌾",makine:"⚙️",diger:"📦"};
  var SS={stokta:"background:#e3f0ff;color:#1a5fb4",musteride:"background:#fef3e2;color:#8a5000",bekliyor:"background:#f0eeff;color:#4a3f9e",onaylandi:"background:#e6f4ea;color:#1e6e2e",reddedildi:"background:#fce8e6;color:#c62828"};
  var SL={stokta:"Stokta",musteride:"Musteride",bekliyor:"Bekliyor",onaylandi:"Onaylandi",reddedildi:"Reddedildi"};
  var grid=document.getElementById("smp-grid");if(!grid)return;
  if(!list.length){grid.innerHTML='<div style="text-align:center;padding:40px;color:#999;grid-column:1/-1">Numune bulunamadi</div>';return;}
  grid.innerHTML=list.map(function(s){
    var sc=SS[s.status]||"background:#f1f1f1;color:#555";
    var sl=SL[s.status]||"—";
    var icon=CI[s.cat]||"📦";
    return '<div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden;cursor:pointer" onmouseover="this.style.borderColor=\'#999\'" onmouseout="this.style.borderColor=\'#e0e0e0\'"><div style="background:#f9f9f9;padding:24px;text-align:center;font-size:36px">'+icon+'</div><div style="padding:14px"><div style="font-size:10px;color:#999;margin-bottom:3px;font-family:monospace">'+(s.code||"—")+'</div><div style="font-size:13px;font-weight:500;margin-bottom:3px">'+(s.name||"—")+'</div><div style="font-size:11px;color:#999;margin-bottom:10px">'+(s.firm||"Firma atanmamis")+'</div><div style="display:flex;justify-content:space-between;align-items:center"><span style="display:inline-flex;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:500;'+sc+'">'+sl+'</span><div style="display:flex;gap:5px"><button onclick="smpEdit(\''+s.id+'\')" style="background:none;border:none;cursor:pointer;color:#999;font-size:13px">✎</button><button onclick="smpDel(\''+s.id+'\')" style="background:none;border:none;cursor:pointer;color:#c62828;font-size:13px">🗑</button></div></div></div></div>';
  }).join("");
}

function smpNew(){_sEdit=null;document.getElementById("smptitle").textContent="Yeni Numune";["sc-code","sc-name","sc-firm","sc-origin","sc-qty","sc-desc"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});document.getElementById("smpmodal").style.display="flex";}
function smpEdit(id){var s=_samples.find(function(x){return x.id===id;});if(!s)return;_sEdit=id;document.getElementById("smptitle").textContent="Numune Duzenle";document.getElementById("sc-code").value=s.code||"";document.getElementById("sc-name").value=s.name||"";document.getElementById("sc-cat").value=s.cat||"tekstil";document.getElementById("sc-st").value=s.status||"stokta";document.getElementById("sc-firm").value=s.firm||"";document.getElementById("sc-origin").value=s.origin||"";document.getElementById("sc-qty").value=s.qty||"";document.getElementById("sc-desc").value=s.desc||"";document.getElementById("smpmodal").style.display="flex";}
function smpClose(){document.getElementById("smpmodal").style.display="none";}
function smpSave(){
  var name=document.getElementById("sc-name").value.trim();if(!name){alert("Urun adi zorunlu");return;}
  var data={code:document.getElementById("sc-code").value.trim(),name:name,cat:document.getElementById("sc-cat").value,status:document.getElementById("sc-st").value,firm:document.getElementById("sc-firm").value.trim(),origin:document.getElementById("sc-origin").value.trim(),qty:document.getElementById("sc-qty").value.trim(),desc:document.getElementById("sc-desc").value.trim(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
  var p;if(_sEdit){p=db.collection("to_samples").doc(_sEdit).update(data);}else{data.createdAt=firebase.firestore.FieldValue.serverTimestamp();p=db.collection("to_samples").add(data);}
  p.then(function(){smpClose();smpLoad();});
}
function smpDel(id){if(!confirm("Silmek istediginize emin misiniz?"))return;db.collection("to_samples").doc(id).delete().then(function(){smpLoad();});}

// ============================================================
// YAPILACAKLAR - Kanban
// ============================================================
var _tasks = [];
var _taskEdit = null;

function showTasks() {
  setPage('<div style="padding:20px 24px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><div style="font-size:18px;font-weight:600">Yapilacaklar & Gorevler</div><button onclick="taskNew()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">+ Yeni Gorev</button></div><div style="display:flex;gap:12px;overflow-x:auto;padding-bottom:8px" id="kanban-board"></div><div id="taskmodal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:none;align-items:flex-start;justify-content:center;padding-top:60px"><div style="background:#fff;border-radius:14px;padding:24px;width:500px;max-width:95vw;max-height:80vh;overflow-y:auto"><div style="font-size:16px;font-weight:600;margin-bottom:18px" id="tasktitle">Yeni Gorev</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:11px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Gorev Basligi</label><input id="tk-title" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Oncelik</label><select id="tk-pri" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="high">Yuksek</option><option value="medium" selected>Orta</option><option value="low">Dusuk</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Durum</label><select id="tk-stage" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="todo">Yapilacak</option><option value="inprogress">Devam Ediyor</option><option value="review">Incelemede</option><option value="done">Tamamlandi</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Son Tarih</label><input id="tk-due" type="date" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div style="grid-column:1/-1"><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Atanan Kisi</label><input id="tk-assign" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit" placeholder="Ad Soyad"></div></div><div style="margin-top:12px"><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Aciklama</label><textarea id="tk-desc" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit;resize:vertical;min-height:70px"></textarea></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button onclick="taskClose()" style="padding:8px 16px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:13px;cursor:pointer">Iptal</button><button onclick="taskSave()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;font-size:13px;cursor:pointer">Kaydet</button></div></div></div></div>');
  taskLoad();
}

function taskLoad(){
  db.collection("to_tasks").orderBy("createdAt","desc").get().then(function(snap){
    _tasks=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
    taskRender();
  });
}

function taskRender(){
  var STAGES=[
    {id:"todo",label:"Yapilacak",bg:"#e3f0ff",color:"#1a5fb4"},
    {id:"inprogress",label:"Devam Ediyor",bg:"#fef3e2",color:"#8a5000"},
    {id:"review",label:"Incelemede",bg:"#f0eeff",color:"#4a3f9e"},
    {id:"done",label:"Tamamlandi",bg:"#e6f4ea",color:"#1e6e2e"}
  ];
  var board=document.getElementById("kanban-board");if(!board)return;
  board.innerHTML=STAGES.map(function(s){
    var items=_tasks.filter(function(t){return t.stage===s.id;});
    var PC={high:"#c62828",medium:"#8a5000",low:"#1e6e2e"};
    return '<div style="min-width:220px;flex:1;max-width:280px"><div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-radius:8px 8px 0 0;background:'+s.bg+';color:'+s.color+'"><span style="font-size:12px;font-weight:500">'+s.label+'</span><span style="background:rgba(0,0,0,.1);border-radius:20px;padding:1px 7px;font-size:11px">'+items.length+'</span></div><div style="background:#fff;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;padding:8px;min-height:200px">'+
    items.map(function(t){
      var pc=PC[t.priority]||"#666";
      return '<div style="background:#f9f9f9;border-radius:8px;padding:10px;margin-bottom:7px;border-left:3px solid '+pc+';cursor:pointer" onmouseover="this.style.background=\'#f0f0f0\'" onmouseout="this.style.background=\'#f9f9f9\'"><div style="font-size:12px;font-weight:500;margin-bottom:4px">'+(t.title||"—")+'</div>'+(t.assignee?'<div style="font-size:10px;color:#999">👤 '+t.assignee+'</div>':'')+(t.due?'<div style="font-size:10px;color:#999">📅 '+t.due+'</div>':'')+'<div style="display:flex;gap:4px;margin-top:6px;justify-content:flex-end"><button onclick="taskEdit(\''+t.id+'\')" style="background:none;border:none;cursor:pointer;color:#999;font-size:12px">✎</button><button onclick="taskDel(\''+t.id+'\')" style="background:none;border:none;cursor:pointer;color:#c62828;font-size:12px">🗑</button></div></div>';
    }).join("")+
    '<div onclick="taskNew()" style="text-align:center;padding:8px;font-size:12px;color:#999;cursor:pointer">+ Ekle</div></div></div>';
  }).join("");
}

function taskNew(){_taskEdit=null;document.getElementById("tasktitle").textContent="Yeni Gorev";["tk-title","tk-assign","tk-desc"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});document.getElementById("taskmodal").style.display="flex";}
function taskEdit(id){var t=_tasks.find(function(x){return x.id===id;});if(!t)return;_taskEdit=id;document.getElementById("tasktitle").textContent="Gorev Duzenle";document.getElementById("tk-title").value=t.title||"";document.getElementById("tk-pri").value=t.priority||"medium";document.getElementById("tk-stage").value=t.stage||"todo";document.getElementById("tk-due").value=t.due||"";document.getElementById("tk-assign").value=t.assignee||"";document.getElementById("tk-desc").value=t.desc||"";document.getElementById("taskmodal").style.display="flex";}
function taskClose(){document.getElementById("taskmodal").style.display="none";}
function taskSave(){
  var title=document.getElementById("tk-title").value.trim();if(!title){alert("Baslik zorunlu");return;}
  var data={title:title,priority:document.getElementById("tk-pri").value,stage:document.getElementById("tk-stage").value,due:document.getElementById("tk-due").value,assignee:document.getElementById("tk-assign").value.trim(),desc:document.getElementById("tk-desc").value.trim(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
  var p;if(_taskEdit){p=db.collection("to_tasks").doc(_taskEdit).update(data);}else{data.createdAt=firebase.firestore.FieldValue.serverTimestamp();p=db.collection("to_tasks").add(data);}
  p.then(function(){taskClose();taskLoad();});
}
function taskDel(id){if(!confirm("Silmek istediginize emin misiniz?"))return;db.collection("to_tasks").doc(id).delete().then(function(){taskLoad();});}

// ============================================================
// PRİM YÖNETİMİ
// ============================================================
var _bonuses = [];
var _bonEdit = null;

function showBonus() {
  setPage('<div style="padding:20px 24px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><div style="font-size:18px;font-weight:600">Prim Yonetimi</div><button onclick="bonNew()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px">+ Prim Hazirla</button></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px"><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Toplam Prim</div><div style="font-size:20px;font-weight:500" id="bn1">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Onay Bekleyen</div><div style="font-size:20px;font-weight:500;color:#8a5000" id="bn2">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Onaylanan</div><div style="font-size:20px;font-weight:500;color:#1e6e2e" id="bn3">-</div></div><div style="background:#fff;border-radius:10px;border:1px solid #e0e0e0;padding:14px"><div style="font-size:11px;color:#999">Odenen</div><div style="font-size:20px;font-weight:500" id="bn4">-</div></div></div><div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;padding:20px;margin-bottom:16px"><div style="font-size:14px;font-weight:500;margin-bottom:14px">Prim Hesapla</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Baz Maas (TL)</label><input id="bc-sal" type="number" oninput="bonCalc()" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Hedef</label><input id="bc-target" type="number" oninput="bonCalc()" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Gerceklesen</label><input id="bc-actual" type="number" oninput="bonCalc()" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px;background:#f9f9f9;border-radius:10px;padding:14px"><div><div style="font-size:11px;color:#999">Gerceklasme</div><div style="font-size:18px;font-weight:500" id="bc-rate">-%</div></div><div><div style="font-size:11px;color:#999">Prim Orani</div><div style="font-size:18px;font-weight:500" id="bc-pct">-</div></div><div><div style="font-size:11px;color:#999">Prim Tutari</div><div style="font-size:18px;font-weight:500;color:#1e6e2e" id="bc-amt">-</div></div><div><div style="font-size:11px;color:#999">Net (est.)</div><div style="font-size:18px;font-weight:500" id="bc-net">-</div></div></div></div><div style="background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid #e0e0e0;background:#fafafa"><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Personel</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Prim Turu</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Donem</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Tutar</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500">Durum</th><th style="padding:10px 14px;font-size:11px;color:#999;text-align:left;font-weight:500"></th></tr></thead><tbody id="bon-tbody"><tr><td colspan="6" style="text-align:center;padding:40px;color:#999">Yukleniyor...</td></tr></tbody></table></div><div id="bonmodal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:none;align-items:flex-start;justify-content:center;padding-top:60px"><div style="background:#fff;border-radius:14px;padding:24px;width:480px;max-width:95vw;max-height:80vh;overflow-y:auto"><div style="font-size:16px;font-weight:600;margin-bottom:18px" id="bontitle">Prim Hazirla</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:11px"><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Personel</label><input id="bn-emp" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Prim Turu</label><select id="bn-type" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option value="satis">Satis Primi</option><option value="performans">Performans Primi</option><option value="hedef">Hedef Primi</option><option value="yillik">Yillik Ikramiye</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Donem</label><select id="bn-period" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"><option>Q1 2026</option><option>Q2 2026</option><option>Q3 2026</option><option>Q4 2026</option></select></div><div><label style="font-size:12px;color:#666;display:block;margin-bottom:4px">Tutar (TL)</label><input id="bn-amt" type="number" style="width:100%;padding:9px;border-radius:8px;border:1px solid #ddd;font-size:13px;font-family:inherit"></div></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button onclick="bonClose()" style="padding:8px 16px;border-radius:8px;border:1px solid #ddd;background:transparent;font-size:13px;cursor:pointer">Iptal</button><button onclick="bonSave()" style="padding:8px 16px;border-radius:8px;background:#1a1a1a;color:#fff;border:none;font-size:13px;cursor:pointer">Onaya Gonder</button></div></div></div></div>');
  bonLoad();
}

function bonCalc(){
  var sal=parseFloat(document.getElementById("bc-sal").value)||0;
  var target=parseFloat(document.getElementById("bc-target").value)||1;
  var actual=parseFloat(document.getElementById("bc-actual").value)||0;
  var rate=Math.round(actual/target*100);
  var pct=rate>=120?20:rate>=100?15:rate>=80?10:0;
  var amt=Math.round(sal*pct/100);
  var r=document.getElementById("bc-rate");if(r)r.textContent=rate+"%";
  var p=document.getElementById("bc-pct");if(p)p.textContent=pct+"%";
  var a=document.getElementById("bc-amt");if(a)a.textContent="₺"+amt.toLocaleString();
  var n=document.getElementById("bc-net");if(n)n.textContent="₺"+Math.round(amt*0.85).toLocaleString();
}

function bonLoad(){
  db.collection("to_bonuses").orderBy("createdAt","desc").get().then(function(snap){
    _bonuses=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
    var total=_bonuses.reduce(function(s,b){return s+(Number(b.amount)||0);},0);
    var b1=document.getElementById("bn1");if(b1)b1.textContent="₺"+total.toLocaleString();
    var b2=document.getElementById("bn2");if(b2)b2.textContent=_bonuses.filter(function(b){return b.status==="bekliyor";}).length;
    var b3=document.getElementById("bn3");if(b3)b3.textContent=_bonuses.filter(function(b){return b.status==="onaylandi";}).length;
    var b4=document.getElementById("bn4");if(b4)b4.textContent=_bonuses.filter(function(b){return b.status==="odendi";}).length;
    var ST={bekliyor:"background:#fef3e2;color:#8a5000",onaylandi:"background:#e6f4ea;color:#1e6e2e",reddedildi:"background:#fce8e6;color:#c62828",odendi:"background:#f1f1f1;color:#555"};
    var SL={bekliyor:"Bekliyor",onaylandi:"Onaylandi",reddedildi:"Reddedildi",odendi:"Odendi"};
    var tbody=document.getElementById("bon-tbody");if(!tbody)return;
    if(!_bonuses.length){tbody.innerHTML='<tr><td colspan="6" style="text-align:center;padding:40px;color:#999">Kayit yok</td></tr>';return;}
    tbody.innerHTML=_bonuses.map(function(b){
      var sc=ST[b.status]||"background:#f1f1f1;color:#555";
      var sl=SL[b.status]||b.status||"—";
      return '<tr style="border-bottom:1px solid #f0f0f0"><td style="padding:10px 14px;font-size:13px;font-weight:500">'+(b.employee||"—")+'</td><td style="padding:10px 14px;font-size:12px">'+(b.type||"—")+'</td><td style="padding:10px 14px;font-size:12px;color:#666">'+(b.period||"—")+'</td><td style="padding:10px 14px;font-size:13px;font-weight:500;color:#1e6e2e">'+(b.amount?"₺"+Number(b.amount).toLocaleString():"—")+'</td><td style="padding:10px 14px"><span style="display:inline-flex;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;'+sc+'">'+sl+'</span></td><td style="padding:10px 14px"><button onclick="bonApprove(\''+b.id+'\')" style="background:none;border:none;cursor:pointer;color:#1e6e2e;font-size:12px;margin-right:6px">✓ Onayla</button><button onclick="bonDel(\''+b.id+'\')" style="background:none;border:none;cursor:pointer;color:#c62828;font-size:13px">🗑</button></td></tr>';
    }).join("");
  });
}

function bonNew(){_bonEdit=null;document.getElementById("bontitle").textContent="Prim Hazirla";["bn-emp","bn-amt"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});document.getElementById("bonmodal").style.display="flex";}
function bonClose(){document.getElementById("bonmodal").style.display="none";}
function bonSave(){
  var emp=document.getElementById("bn-emp").value.trim();if(!emp){alert("Personel adi zorunlu");return;}
  var data={employee:emp,type:document.getElementById("bn-type").value,period:document.getElementById("bn-period").value,amount:parseFloat(document.getElementById("bn-amt").value)||0,status:"bekliyor",createdAt:firebase.firestore.FieldValue.serverTimestamp()};
  db.collection("to_bonuses").add(data).then(function(){bonClose();bonLoad();});
}
function bonApprove(id){db.collection("to_bonuses").doc(id).update({status:"onaylandi",updatedAt:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){bonLoad();});}
function bonDel(id){if(!confirm("Silmek istediginize emin misiniz?"))return;db.collection("to_bonuses").doc(id).delete().then(function(){bonLoad();});}

// ============================================================
// SIDEBAR GUNCELLE - Tum modulleri bagla
// ============================================================
var _origGetShell = getShell;
getShell = function() {
  return _origGetShell().replace(
    'onclick="showPage(\'Siparisler\')"', 'onclick="showOrders()"'
  ).replace(
    'onclick="showPage(\'Finans ve Metaller\')"', 'onclick="showFinans()"'
  ).replace(
    'onclick="showPage(\'Numune Arsivi\')"', 'onclick="showSamples()"'
  ).replace(
    'onclick="showPage(\'Navlun Kargo\')"', 'onclick="showNavlun()"'
  ).replace(
    'onclick="showPage(\'Yapilacaklar\')"', 'onclick="showTasks()"'
  ).replace(
    'onclick="showPage(\'IK Hub\')"', 'onclick="showIK()"'
  ).replace(
    'onclick="showPage(\'Prim Yonetimi\')"', 'onclick="showBonus()"'
  ).replace(
    'onclick="showPage(\'Duyurular\')"', 'onclick="showDuyurular()"'
  );
};
