// 1. GİRİŞ VE ŞİFRE KONTROLÜ
function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    // Şifreyi istediğin bir şeyle değiştirebilirsin, şu an 'kısa ve küçük'
    if(pass === "kısa ve küçük") {
        document.getElementById('gate').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('gate').style.display = "none";
            const music = document.getElementById('bg-music');
            music.volume = 0.4;
            music.play();
            runPhotoFlow();
        }, 1000);
    } else {
        alert("Bu anahtar bu evrene ait değil sevgilim...");
    }
}

// 2. FOTOĞRAF YAĞMURU
function runPhotoFlow() {
    const wall = document.getElementById('photo-wall');
    // 140 fotoğraf döngüsü (Eğer img klasöründe yoksa yer tutucu gelir)
    for(let i=1; i<=140; i++) {
        const img = document.createElement('img');
        img.src = `img/${i}.jpg`;
        img.onerror = function(){ this.src=`https://picsum.photos/200/200?random=${i}`; };
        img.className = 'photo-item';
        wall.appendChild(img);
    }
    
    setTimeout(() => {
        wall.style.opacity = "1";
        document.querySelectorAll('.photo-item').forEach((item, i) => {
            setTimeout(() => { 
                item.style.opacity = "1"; 
                item.style.transform = "scale(1)"; 
            }, i * 30); // Akış hızı
        });
        
        // Fotoğraflar biterken intro başlasın
        setTimeout(() => {
            wall.style.opacity = "0";
            setTimeout(runNeonSequence, 1500);
        }, (140 * 30) + 1000);
    }, 100);
}

// 3. ŞATAFATLI INTRO SIRALAMASI
function runNeonSequence() {
    const n1 = document.getElementById('neon-intro-text');
    const n2 = document.getElementById('love-intro');

    n1.style.display = "block";
    setTimeout(() => {
        n1.style.opacity = "1";
        setTimeout(() => {
            n1.style.opacity = "0";
            setTimeout(() => {
                n1.style.display = "none";
                n2.style.display = "block";
                n2.style.opacity = "1"; // CSS Animasyonu tetiklenir
                setTimeout(() => {
                    n2.style.opacity = "0";
                    setTimeout(initUniverse, 1000);
                }, 4000); // Cinematic Zoom süresiyle uyumlu
            }, 1000);
        }, 2500);
    }, 100);
}

// 4. ANA EVREN VE SAAT ANİMASYONU
function initUniverse() {
    const universe = document.getElementById('main-universe');
    const clock = document.getElementById('clock-container');
    const texts = document.getElementById('hero-texts');
    
    universe.style.display = "block";
    createStars(); // Yıldızları dök

    setTimeout(() => {
        universe.style.opacity = "1";
        clock.classList.add('active'); // Bulanıklıktan netliğe

        // Kolların 00:00'da buluşması
        setTimeout(() => {
            document.getElementById('h1').style.transform = "translate(-50%, 0) rotate(360deg)";
            document.getElementById('m1').style.transform = "translate(-50%, 0) rotate(360deg)";
            
            // Köşeye çekilme ve yazıların girişi
            setTimeout(() => {
                clock.classList.add('docked');
                setTimeout(() => { 
                    texts.classList.add('visible'); 
                    window.clocksActive = true;
                    startTimers(); // Sayaçları başlat
                }, 1000);
            }, 2500);
        }, 1500);
    }, 100);
}

// 5. YILDIZ TOZU (Mobil Uyumluluk Dahil)
function createStars() {
    const field = document.getElementById('star-field');
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for(let i=0; i<600; i++) {
        const s = document.createElement('div');
        s.style.position = "absolute";
        s.style.width = (Math.random() * 2.5) + 'px';
        s.style.height = s.style.width;
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * height + 'px';
        s.style.backgroundColor = i % 15 === 0 ? '#ff80ab' : '#fff';
        s.style.borderRadius = "50%";
        s.style.opacity = Math.random();
        s.style.boxShadow = i % 20 === 0 ? "0 0 10px #fff" : "none";
        field.appendChild(s);
    }
}

// 6. SAYAÇLAR VE ANALOG SAATLER
function startTimers() {
    const birth = new Date("2009-04-04T00:00:00");
    const loveStart = new Date("2023-01-01T00:00:00");

    setInterval(() => {
        const now = new Date();
        document.getElementById('life-timer').innerHTML = formatTimeDiff(now - birth);
        document.getElementById('love-timer').innerHTML = formatTimeDiff(now - loveStart);
        
        // Küçük analog saatlerin kollarını hareket ettir
        const m = now.getMinutes() * 6;
        const h = (now.getHours() % 12) * 30 + (now.getMinutes() / 2);
        
        document.querySelectorAll('.mini-m').forEach(el => el.style.transform = `translate(-50%, 0) rotate(${m}deg)`);
        document.querySelectorAll('.mini-h').forEach(el => el.style.transform = `translate(-50%, 0) rotate(${h}deg)`);
    }, 1000);
}

function formatTimeDiff(ms) {
    const s = Math.floor(ms/1000);
    const y = Math.floor(s/31536000);
    const d = Math.floor((s%31536000)/86400);
    const h = Math.floor((s%86400)/3600);
    const m = Math.floor((s%3600)/60);
    const sn = s%60;
    return `${y} YIL ${d} GÜN ${h} SAAT ${m} DK ${sn} SN`;
}

// 7. SLOT MAKİNESİ - ZAMAN TÜNELİ KİLİDİ
let isSpinning = false;
function spinSlot() {
    if(isSpinning) return;
    isSpinning = true;

    const rod = document.getElementById('handle');
    rod.classList.add('pulled');
    
    const icons = ['❤️', '💖', '💍', '🌸', '✨'];
    const reels = [document.getElementById('r1'), document.getElementById('r2'), document.getElementById('r3')];
    
    // Ses efekti istersen buraya ekleyebilirsin
    const interval = setInterval(() => {
        reels.forEach(r => r.innerText = icons[Math.floor(Math.random()*icons.length)]);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        reels.forEach(r => r.innerText = '❤️'); // Kazandırma anı
        rod.classList.remove('pulled');
        
        // KİLİT AÇILMA EFEKTİ
        const frame = document.querySelector('.slot-frame');
        frame.style.boxShadow = "0 0 100px var(--soft-pink)";
        document.getElementById('slot-hint').innerHTML = "<b style='color:#fff'>BİZİM HİKAYEMİZİN KİLİDİ AÇILDI!</b>";
        
        // Zaman tünelini göster
        setTimeout(() => {
            const tl = document.getElementById('hidden-timeline');
            tl.style.display = "block";
            window.scrollTo({ top: tl.offsetTop, behavior: 'smooth' });
            isSpinning = false;
        }, 1000);
    }, 3000);
}

// 8. SCROLL REVEAL (KAYDIRINCA BELİRME)
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.85) {
            el.classList.add('active');
        }
    });
});

// Kol tıklama olayı
document.addEventListener('DOMContentLoaded', () => {
    const handle = document.getElementById('handle');
    if(handle) handle.addEventListener('click', spinSlot);
});
