/**
 * SCRIPT.JS - Sonsuzluk İstasyonu
 * Tüm fonksiyonlar ve akış kontrolü
 */

function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    
    // Şifre kontrolü (Küçük harf duyarlı)
    if(pass === "esra") {
        const gate = document.getElementById('gate');
        gate.style.opacity = "0";
        
        setTimeout(() => {
            gate.style.display = "none";
            
            // Müzik başlatma
            const music = document.getElementById('bg-music');
            music.volume = 0.4;
            music.play().catch(e => console.log("Müzik otomatik başlatılamadı, etkileşim bekleniyor."));
            
            // Fotoğraf akışını başlat
            runPhotoFlow();
        }, 1000);
    } else {
        alert("Yanlış anahtar... Sadece ikimizin bildiği o isim.");
    }
}

function runPhotoFlow() {
    const wall = document.getElementById('photo-wall');
    
    // 140 adet fotoğraf karesi oluştur (img klasöründekiler veya rastgele)
    for(let i=1; i<=140; i++) {
        const img = document.createElement('img');
        img.src = `img/${i}.jpg`;
        // Eğer yerel fotoğraf yoksa internetten rastgele çek
        img.onerror = function(){ this.src=`https://picsum.photos/200/200?random=${i}`; };
        img.className = 'photo-item';
        wall.appendChild(img);
    }
    
    // Fotoğrafları sırayla ekrana getir
    setTimeout(() => {
        wall.style.opacity = "1";
        document.querySelectorAll('.photo-item').forEach((p, i) => {
            setTimeout(() => { 
                p.style.opacity = "0.7"; 
                p.style.transform = "scale(1)"; 
            }, i * 15);
        });
        
        // Fotoğrafları temizle ve ana evrene geç (Intro animasyonu kaldırıldı)
        setTimeout(() => {
            wall.style.opacity = "0";
            setTimeout(() => {
                wall.style.display = "none";
                initMain(); // Doğrudan ana içeriğe geçiş
            }, 1000);
        }, 4000);
    }, 100);
}

function initMain() {
    const main = document.getElementById('main-universe');
    const clock = document.getElementById('clock-container');
    const heroTexts = document.getElementById('hero-texts');
    
    main.style.display = "block";
    
    setTimeout(() => {
        main.style.opacity = "1";
        
        // Saati sembolik bir konuma getir (Esra'nın doğum saati vb.)
        document.getElementById('h1').style.transform = "translateX(-50%) rotate(305deg)";
        document.getElementById('m1').style.transform = "translateX(-50%) rotate(60deg)";
        
        // Saat kenara çekilir ve yazılar gelir
        setTimeout(() => {
            clock.classList.add('docked');
            heroTexts.classList.add('visible');
            startTimers(); // Sayaçları başlat
        }, 1500);
    }, 100);
}

/**
 * Hassas zaman hesaplayıcı (Yıl, Gün ve Saat bazlı)
 */
function calculatePrecise(startDate) {
    const now = new Date();
    const start = new Date(startDate);
    
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    // Henüz doğum günü/yıl dönümü gelmediyse yılı bir eksilt
    if (months < 0 || (months === 0 && days < 0)) {
        years--;
    }

    const diff = now - start;
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const remainingDays = totalDays % 365;

    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');

    return `${years} YIL ${remainingDays} GÜN <br> ${h}:${m}:${s}`;
}

function startTimers() {
    // Esra'nın Doğum Günü ve Tanışma Günü
    const birthDate = "2009-04-04T00:00:00";
    const loveDate = "2022-11-14T14:00:00";
    
    setInterval(() => {
        document.getElementById('life-timer').innerHTML = calculatePrecise(birthDate);
        document.getElementById('love-timer').innerHTML = calculatePrecise(loveDate);
    }, 1000);
}

/**
 * Kalp Kilidi (Slot) Mekanizması
 */
document.getElementById('handle').addEventListener('click', function() {
    if(this.classList.contains('active')) return;
    
    this.classList.add('active');
    const rod = this.querySelector('.rod');
    rod.classList.add('pulled');

    const reels = [
        document.getElementById('r1'), 
        document.getElementById('r2'), 
        document.getElementById('r3')
    ];
    
    let count = 0;
    const spin = setInterval(() => {
        const symbols = ['❤️','✨','🌸','💎','🍭','🎀'];
        reels.forEach(r => {
            r.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        });
        
        count++;
        if(count > 25) {
            clearInterval(spin);
            reels.forEach(r => r.innerText = '❤️'); // Sonuç her zaman kalp
            rod.classList.remove('pulled');
            
            // Gizli zaman tünelini aç
            setTimeout(() => {
                const timeline = document.getElementById('hidden-timeline');
                timeline.style.display = "block";
                window.scrollTo({ 
                    top: timeline.offsetTop - 50, 
                    behavior: 'smooth' 
                });
            }, 800);
        }
    }, 80);
});

/**
 * İnteraktif Oyunlar
 */
const compliments = [
    "Gülüşün gökyüzündeki tüm yıldızlardan daha parlak.",
    "Seninle geçen her saniye benim için bir hazine.",
    "Dünyanın en güzel kalpli insanı iyi ki benimsin.",
    "Varlığın hayatıma huzur ve renk katıyor sevgilim.",
    "Sesini duyduğum an dünyadaki tüm dertler siliniyor.",
    "Sen benim hayatımda başıma gelen en güzel mucizesin."
];

function drawCompliment() {
    const display = document.getElementById('compliment-display');
    display.style.transform = "scale(0) rotate(5deg)";
    
    setTimeout(() => {
        const randomMsg = compliments[Math.floor(Math.random() * compliments.length)];
        display.innerText = randomMsg;
        display.style.transform = "scale(1) rotate(-2deg)";
    }, 2500); // 200ms
}

function getFutureLuck() {
    const predictions = [
        "Gelecekte bizi çok büyük mutluluklar bekliyor.",
        "Yıldızlar bizim için sonsuz bir aşk fısıldıyor.",
        "Hayallerimizin hepsi birer birer gerçek olacak.",
        "El ele yürüyeceğimiz yollar çiçeklerle dolu."
    ];
    const display = document.getElementById('fortune-display');
    display.style.opacity = "0";
    
    setTimeout(() => {
        display.innerText = predictions[Math.floor(Math.random() * predictions.length)];
        display.style.opacity = "1";
    }, 300);
}

/**
 * Scroll Reveal (Kaydırma Animasyonu)
 */
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if(elementTop < windowHeight * 0.85) {
            el.classList.add('active');
        }
    });
});
