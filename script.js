const music = document.getElementById('bg-music');
const track = document.getElementById('train-track');

// 1. Giriş ve Uzay Başlatma
function initUniverse() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    if(pass === "kısa ve küçük") {
        document.getElementById('gate').style.transform = "translateY(-100%)";
        music.play();
        startTimer();
        spawnVagons();
    } else {
        alert("SİSTEME ERİŞİM REDDEDİLDİ.");
    }
}

// 2. Vagonları Dinamik Oluşturma
const timelineData = [
    { date: "4 Nisan 2009", text: "Güzelimin dünyaya gelişi...", icon: "👶" },
    { date: "14 Kasım 2022", text: "Gizem'sbn terminaline ilk giriş.", icon: "👾" },
    { date: "1 Ocak 2023", text: "Yeni yıl, yeni biz.", icon: "🎇" },
    { date: "24 Ağustos 2025", text: "İlk buluşma, ilk heyecan.", icon: "👩‍❤️‍💋‍👨" },
    { date: "Gelecek", text: "Özgür ve Maya'lı günler...", icon: "🏠" }
];

function spawnVagons() {
    timelineData.forEach((item, index) => {
        const vagon = document.createElement('div');
        vagon.className = 'vagon';
        vagon.innerHTML = `
            <div class="vagon-lid">
                <h2>${item.date}</h2>
            </div>
            <div class="vagon-content">
                <span class="v-icon">${item.icon}</span>
                <p>${item.text}</p>
            </div>
            <div class="steam-pipes"></div>
        `;
        track.appendChild(vagon);
    });
}

// 3. Mouse Wheel ile Tren Kontrolü (Hassas Kaydırma)
let scrollPos = 0;
window.addEventListener('wheel', (e) => {
    scrollPos += e.deltaY;
    if(scrollPos < 0) scrollPos = 0;
    track.style.transform = `translateX(-${scrollPos}px)`;
    
    // Arka plan parallax etkisi
    document.querySelector('.star-1').style.transform = `translateX(${scrollPos * 0.2}px)`;
    document.querySelector('.star-2').style.transform = `translateX(${scrollPos * 0.5}px)`;
});

// 4. Sayaç
function startTimer() {
    setInterval(() => {
        const diff = new Date() - new Date("2023-01-01T00:00:00");
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff / 3600000) % 24);
        const m = Math.floor((diff / 60000) % 60);
        const s = Math.floor((diff / 1000) % 60);
        document.getElementById('timer').innerText = `${d}D : ${h}H : ${m}M : ${s}S`;
    }, 1000);
}

// 5. Gizli Portallar
function openPortal(type) {
    const overlay = document.getElementById('portal-overlay');
    const content = document.getElementById('portal-content');
    overlay.classList.remove('hidden');
    
    if(type === 'terminal') {
        content.innerHTML = `<div class="terminal-text">> Bağlanılıyor: Gizem'sbn... <br> > Loglar yükleniyor... <br> [2022-11-14] Samet: Selam!</div>`;
    } else if(type === 'aot') {
        content.innerHTML = `<h2>AOT Modu</h2><p>Eren'in özgürlüğü, bizim geleceğimiz.</p>`;
    }
}
