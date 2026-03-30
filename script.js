// Şifre Girişi (Değişmedi)
function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    if(pass === "kısa ve küçük") {
        document.getElementById('gate').style.opacity = "0";
        setTimeout(() => document.getElementById('gate').style.display = "none", 1000);
        document.getElementById('bg-music').play().catch(e => console.log("Müzik etkileşim bekliyor."));
        runPhotoFlow(); // 1. Aşama: Fotoğrafları başlat
    }
}

// 1. AŞAMA: FOTOĞRAFLARIN SIRA SIRA GELİŞİ (Pürüzsüz)
function runPhotoFlow() {
    const wall = document.getElementById('photo-wall');
    const totalPhotos = 120; // Sayı arttı
    
    // Fotoğrafları oluştur (picsum test, img clasörü gerçek)
    for(let i=1; i<=totalPhotos; i++){
        const img = document.createElement('img');
        img.src = `img/${i}.jpg`;
        img.onerror = function(){ this.src=`https://picsum.photos/200/200?random=${i}`; };
        img.className = 'photo-item';
        wall.appendChild(img);
    }
    
    wall.style.opacity = "1";
    const items = document.querySelectorAll('.photo-item');
    
    // Sol üstten başlayarak tane tane süzülerek gelme (Yavaşladı)
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
        }, index * 45); // Yavaş ve premium geliş
    });

    // 2. AŞAMA: HEPSİ SÖNER, NEON YAZILAR GELİR (Zincirleme reaksiyon)
    setTimeout(() => {
        wall.style.opacity = "0"; // Hepsi beraber söner
        
        // Ara Neon Yazı 1: "Biricik sevgilim..."
        setTimeout(() => {
            const neon1 = document.getElementById('neon-intro-text');
            neon1.style.display = "block";
            setTimeout(() => {
                neon1.style.opacity = "1";
                // Sönme ve 2 saniyelik İntro'ya geçiş
                setTimeout(() => {
                    neon1.style.opacity = "0";
                    setTimeout(runLoveIntro, 1500); // ✨ Yeni: Esra & Samet İntro
                }, 4000);
            }, 100);
        }, 1500);
    }, (totalPhotos * 45) + 1000);
}

// ✨ YENİ: Esra & Samet İntro (2 Saniye)
function runLoveIntro() {
    const intro = document.getElementById('love-intro');
    intro.style.display = "block";
    setTimeout(() => {
        intro.style.opacity = "1";
        // 2 saniye sonra sönüp ana evrene geçiş
        setTimeout(() => {
            intro.style.opacity = "0";
            setTimeout(initUniverse, 1500); // 3. Aşama: Ana Evren
        }, 2500); // Görüntülenme süresi
    }, 100);
}

// 3. AŞAMA: ANA EVREN, TOZDAN VAR OLAN SAAT VE DİĞERLERİ
function initUniverse() {
    document.getElementById('main-universe').style.display = "block";
    createCosmos(); // Sonsuz Uzayı Yarat!
    
    const wrapper = document.getElementById('intro-clock-wrapper');
    const h1 = document.getElementById('h1');
    const m1 = document.getElementById('m1');
    const texts = document.getElementById('intro-texts');

    setTimeout(() => {
        document.getElementById('main-universe').style.opacity = "1";
        
        // Tozdan netleşerek var olma (Pürüzsüz geçiş)
        wrapper.classList.add('active');
        
        // Kolların süzülerek yerine oturması (V11 ile aynı)
        setTimeout(() => {
            h1.style.transform = "translate(-50%, 0) rotate(360deg)";
            m1.style.transform = "translate(-50%, 0) rotate(360deg)";
            
            // Küçülüp sola kayma
            setTimeout(() => {
                wrapper.classList.add('docked');
                setTimeout(() => {
                    texts.style.display = "flex";
                    setTimeout(() => texts.classList.add('visible'), 100);
                }, 1500);
            }, 3000);
        }, 2000);
    }, 500);
}

// 🌌 SONSUZ KOZMOS (Tüm Sayfaya Yayılmış Yıldızlar)
function createCosmos() {
    const field = document.getElementById('star-field');
    const pageHeight = document.documentElement.scrollHeight; // Sayfanın tam boyu
    
    for(let i=0; i<800; i++) { // Sayı arttı
        const s = document.createElement('div');
        s.className = 'star';
        const size = (Math.random() * 3 + 1) + 'px';
        s.style.width = size; s.style.height = size;
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * pageHeight + 'px'; // Tüm sayfa boyuna yay
        s.style.setProperty('--t', (2 + Math.random() * 5) + 's');
        field.appendChild(s);
    }
}

// SCROLL TAKİPÇİSİ (Haberler, Sayaçlar, Zaman Çizelgesi, Slot)
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < window.innerHeight * 0.85) {
            el.classList.add('active');
            
            // Sayaç Tetikleyici
            if(el.id === 'clocks-trigger' && !window.timerStarted) {
                window.timerStarted = true;
                startTimers();
            }
            
            // Final Yazısı Tetikleyici (Slot bitince de gelebilir)
            if(el.id === 'final-text' && window.slotWon) {
                 el.style.opacity = "1";
            }
        }
    });
});

// Sayaç Mantığı (V11 ile aynı)
function startTimers() {
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

// ✨ YENİ: SLOT MAKİNESİ MANTIĞI
const icons = ['❤️', '💖', '💍', '🌸', '😘', '🔒'];
const slots = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
let isSpinning = false;

function spinSlot() {
    if (isSpinning) return;
    isSpinning = true;
    window.slotWon = false; // Reset win state
    document.getElementById('final-text').style.opacity = "0"; // Kazanınca yazıyı gizle

    // Görsel ve Ses Efekti
    const handle = document.querySelector('.slot-handle');
    handle.classList.add('pulled');
    const machine = document.querySelector('.slot-machine');
    machine.classList.remove('winner'); // Remove win animation
    document.getElementById('slot-prompt').innerText = "Dönüyor...";

    // Sesi çal (varsa)
    // document.getElementById('slot-sound').play(); 

    // Dönme Efekti (Rastgele ikonlar)
    const spinInterval = setInterval(() => {
        slots.forEach(slot => {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            slot.innerText = randomIcon;
        });
    }, 100);

    // Dönmeyi durdurma ve 3 Kalp kazandırma (2.5 saniye sonra)
    setTimeout(() => {
        clearInterval(spinInterval);
        handle.classList.remove('pulled');
        isSpinning = false;

        // 🏆 ZORUNLU KAZANMA: 3 Kalp
        slots.forEach(slot => { slot.innerText = '❤️'; });

        // Kazanma Animasyonu
        machine.classList.add('winner');
        document.getElementById('slot-prompt').innerText = "KAZANDIK! Sonsuz Aşk ❤️";

        // Final Yazısını Göster
        window.slotWon = true; 
        document.getElementById('final-text').style.opacity = "1";
    }, 2500);
}
