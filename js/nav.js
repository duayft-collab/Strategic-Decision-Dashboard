// ============================================================
// TradeOS — Ortak Navigasyon & Auth Kontrolü
// Tüm sayfalara dahil edin: <script src="../js/nav.js"></script>
// ============================================================

// Auth koruması — giriş yapılmamışsa login'e yönlendir
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  // Kullanıcı adını topbarda göster
  const el = document.getElementById("to-user-name");
  if (el) el.textContent = user.displayName || user.email;

  const av = document.getElementById("to-user-avatar");
  if (av) av.textContent = (user.displayName || user.email || "?")[0].toUpperCase();
});

// Çıkış
function toLogout() {
  if (!confirm("Çıkış yapmak istediğinize emin misiniz?")) return;
  auth.signOut().then(() => window.location.href = "login.html");
}

// Aktif menü öğesini işaretle
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop().replace(".html","");
  document.querySelectorAll("[data-page]").forEach(el => {
    if (el.dataset.page === page) {
      el.classList.add("active");
    }
  });
});

// ============================================================
// Ortak Sidebar HTML oluşturucu
// Sayfanızdaki <div id="to-sidebar"></div> içine render eder
// ============================================================
function renderSidebar() {
  const el = document.getElementById("to-sidebar");
  if (!el) return;

  const NAV = [
    { section: "Ana Modüller" },
    { page: "dashboard",   icon: "◎", label: "Dashboard" },
    { page: "crm",         icon: "◻", label: "CRM" },
    { page: "orders",      icon: "◻", label: "Siparişler" },
    { page: "documents",   icon: "◻", label: "Dokümanlar" },
    { page: "finance",     icon: "◻", label: "Finans & Metaller" },
    { section: "Ürün & Lojistik" },
    { page: "samples",     icon: "◻", label: "Numune Arşivi" },
    { page: "freight",     icon: "◻", label: "Navlun & Kargo" },
    { section: "Şirket" },
    { page: "announcements",icon:"◻", label: "Duyurular" },
    { page: "calendar",    icon: "◻", label: "Takvim" },
    { page: "tasks",       icon: "◻", label: "Yapılacaklar" },
    { page: "archive",     icon: "◻", label: "Döküman Arşivi" },
    { page: "reference",   icon: "◻", label: "Referans Dökümanlar" },
    { page: "vision",      icon: "◻", label: "Vizyon Kütüphanesi" },
    { section: "İK Hub" },
    { page: "hr",          icon: "◻", label: "İK Hub" },
    { page: "bonus",       icon: "◻", label: "Prim Yönetimi" },
    { page: "timesheet",   icon: "◻", label: "Puantaj" },
    { section: "Yönetim" },
    { page: "orgchart",    icon: "◻", label: "Hiyerarşi Şeması" },
    { page: "users",       icon: "◻", label: "Kullanıcılar" },
  ];

  const page = window.location.pathname.split("/").pop().replace(".html","");

  el.innerHTML = `
    <div style="padding:20px 16px 16px;border-bottom:0.5px solid rgba(0,0,0,.1)">
      <div style="font-size:15px;font-weight:600">TradeOS</div>
      <div style="font-size:11px;color:#666;margin-top:2px">Uluslararası Ticaret</div>
    </div>
    <nav style="padding:8px;flex:1;overflow-y:auto">
      ${NAV.map(item => {
        if (item.section) {
          return `<div style="font-size:10px;color:#999;padding:10px 10px 4px;letter-spacing:.05em;text-transform:uppercase">${item.section}</div>`;
        }
        const isActive = item.page === page;
        return `<a href="${item.page}.html" data-page="${item.page}"
          style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;font-size:13px;color:${isActive?"#1a1a1a":"#666"};background:${isActive?"rgba(0,0,0,.06)":""};font-weight:${isActive?"500":""};text-decoration:none;margin-bottom:1px">
          ${item.icon} ${item.label}
        </a>`;
      }).join("")}
    </nav>
    <div style="padding:12px 16px;border-top:0.5px solid rgba(0,0,0,.1)">
      <div style="display:flex;align-items:center;gap:8px">
        <div id="to-user-avatar" style="width:30px;height:30px;border-radius:50%;background:#E6F1FB;color:#185FA5;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500">?</div>
        <div style="flex:1;min-width:0">
          <div id="to-user-name" style="font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">—</div>
        </div>
        <button onclick="toLogout()" style="background:none;border:none;cursor:pointer;color:#999;font-size:13px;padding:4px" title="Çıkış">⎋</button>
      </div>
    </div>`;
}

// Sayfa yüklenince sidebar'ı render et
document.addEventListener("DOMContentLoaded", renderSidebar);
