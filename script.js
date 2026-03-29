// Şifre Girişi (Değişmedi)
function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    if(pass === "kısa ve küçük") {
        document.getElementById('gate').style.opacity = "0";
        setTimeout(() => document.getElementById('gate').style.display = "none", 1000);
        const music = document.getElementById('bg-music');
        music.volume = 0.5; // Arka plan için ideal chill sesi
        music.play().catch(e => console.log("Müzik etkileşim bekliyor."));
        runPhotoWall();
    } else {
        alert("Şifre hatalı Samet.");
    }
}

// Fotoğraf Duvarı (Değişmedi)
function runPhotoWall() {
    const wall = document.getElementById('photo-wall');
    for(let i=1; i<=150; i++) {
        const img = document.createElement('img');
        img.src = `img/${i}.jpg`;
        img.onerror = function() { this.src = `https://picsum.photos/200/200?random=${i}`; };
        img.className = 'photo-item';
        wall.appendChild(img);
    }
    wall.style.opacity = "1";
    document.querySelectorAll('.photo-item').forEach((img, i) => {
        setTimeout(() => { img.style.opacity = "1"; img.style.transform = "scale(1)"; }, i * 20);
    });
    
    setTimeout(() => {
        wall.style.opacity = "0";
        setTimeout(showUniverse, 1500);
    }, 7500);
}

// Ana Saat ve Uzay Başlangıcı
function showUniverse() {
    document.getElementById('main-universe').style.display = "block";
    createStarField(); // 🌌 Canlı Uzayı Yarat!
    
    const h1 = document.getElementById('h1');
    const m1 = document.getElementById('m1');
    const wrapper = document.getElementById('intro-clock-wrapper');
    const birthTitle = document.getElementById('birth-date-title');
    const neOldu = document.getElementById('bugun-ne-oldu');
    
    setTimeout(() => {
        // Saat kollarının dönmesi
        h1.style.transform = "translate(-50%, 0) rotate(300deg)";
        m1.style.transform = "translate(-50%, 0) rotate(60deg)";
        
        setTimeout(() => {
            // Saat 00:00'da sabitlenir
            h1.style.transform = "translate(-50%, 0) rotate(360deg)";
            m1.style.transform = "translate(-50%, 0) rotate(360deg)";
            
            // SAAT HEM KÜÇÜLÜR HEM SOLA KAYAR (Scale(1.2) -> Scale(0.6))
            setTimeout(() => {
                wrapper.classList.add('clock-shift-left');
                
                // ŞATAFATLI TARİH VE ALTTTAKİ YAZI BELİRİR
                setTimeout(() => {
                    birthTitle.classList.add('show');
                    neOldu.classList.add('show'); // Altındaki yazı da gelir
                }, 1500);
            }, 3000);
            
        }, 3000);
    }, 500);
}

// 🌌 Kozmik Jeneratör: Parıldayan ve Kayan Yıldızlar
function createStarField() {
    const field = document.getElementById('star-field');
    const universe = document.getElementById('main-universe');

    // 150 Parıldayan Yıldız
    for(let i=0; i<150; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 3 + 'px';
        s.style.width = size;
        s.style.height = size;
        // Twinkle süresini rastgele ayarla (Ara ara parlaması için)
        s.style.setProperty('--t', (2 + Math.random() * 4) + 's');
        field.appendChild(s);
    }

    // 5 Kayan Yıldız (Sonsuz Döngü)
    for(let i=0; i<5; i++) {
        const ss = document.createElement('div');
        ss.className = 'shooting-star';
        // Rastgele başlangıç pozisyonu
        ss.style.left = (50 + Math.random() * 50) + '%';
        ss.style.top = (Math.random() * 50) + '%';
        // Rastgele süre ve gecikme
        ss.style.setProperty('--s', (10 + Math.random() * 20) + 's');
        ss.style.animationDelay = (Math.random() * 10) + 's';
        field.appendChild(ss);
    }
}

// Scroll İzleyici ve Sayaçlar (V7'DEN AYNI - scrit.js'den kopyala)
window.addEventListener('scroll', () => {
    document.querySelectorAll('.news-row').forEach(row => {
        if(row.getBoundingClientRect().top < window.innerHeight * 0.8) row.classList.add('visible');
    });
    const trigger = document.getElementById('clocks-trigger');
    if(trigger && trigger.getBoundingClientRect().top < window.innerHeight * 0.7) {
        document.getElementById('en-onemli').style.opacity = "1";
        document.getElementById('en-onemli').style.transform = "translateY(0)";
        setTimeout(() => document.getElementById('bugun-itibariyle').style.opacity = "1", 600);
        setTimeout(() => {
            document.querySelector('.dual-clocks').style.opacity = "1";
            startLiveTimers();
        }, 1500);
        setTimeout(() => document.getElementById('final-text').style.opacity = "1", 3500);
    }
});
function startLiveTimers() {
    const birth = new Date("2009-04-04T00:00:00");
    const love = new Date("2023-01-01T00:00:00");
    setInterval(() => {
        const now = new Date();
        document.getElementById('life-timer').innerHTML = formatTime(now - birth);
        document.getElementById('love-timer').innerHTML = formatTime(now - love);
        const mRot = now.getMinutes() * 6;
        const hRot = (now.getHours() % 12) * 30 + (now.getMinutes() / 2);
        document.getElementById('m2').style.transform = `translate(-50%, 0) rotate(${mRot}deg)`;
        document.getElementById('h2').style.transform = `translate(-50%, 0) rotate(${hRot}deg)`;
        document.getElementById('m3').style.transform = `translate(-50%, 0) rotate(${mRot}deg)`;
        document.getElementById('h3').style.transform = `translate(-50%, 0) rotate(${hRot}deg)`;
    }, 1000);
}
function formatTime(ms) {
    const s = Math.floor(ms/1000);
    const y = Math.floor(s/31536000);
    const d = Math.floor((s%31536000)/86400);
    const h = Math.floor((s%86400)/3600);
    const m = Math.floor((s%3600)/60);
    const sn = s%60;
    return `${y} Yıl ${d} Gün<br>${h} Saat ${m} Dakika ${sn} Saniye`;
}
