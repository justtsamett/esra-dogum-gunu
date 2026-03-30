// 1. GİRİŞ VE GÜVENLİK
function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    // Şifreyi buradan ayarlayabilirsin
    if(pass === "esra") { 
        document.getElementById('gate').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('gate').style.display = "none";
            const music = document.getElementById('bg-music');
            music.volume = 0.4;
            // Tarayıcı kısıtlamalarına karşı hata yakalama
            music.play().catch(e => console.log("Müzik otomatik başlatılamadı:", e));
            runPhotoFlow();
        }, 1500);
    } else {
        const input = document.getElementById('pass');
        input.style.border = "1px solid red";
        input.style.boxShadow = "0 0 15px red";
        input.value = "";
        input.placeholder = "Erişim Reddedildi...";
        setTimeout(() => {
            input.style.border = "1px solid var(--soft-pink)";
            input.style.boxShadow = "none";
            input.placeholder = "Şifreleme Anahtarı";
        }, 2000);
    }
}

// 2. FOTOĞRAF YAĞMURU (OPTİMİZE EDİLDİ)
function runPhotoFlow() {
    const wall = document.getElementById('photo-wall');
    
    // Performans için fragment kullanımı
    const fragment = document.createDocumentFragment();
    for(let i=1; i<=140; i++) {
        const img = document.createElement('img');
        img.src = `img/${i}.jpg`;
        // Görsel yoksa uzay/doğa temalı yedek resim çeker
        img.onerror = function(){ this.src=`https://picsum.photos/200/200?random=${i}&grayscale`; };
        img.className = 'photo-item';
        fragment.appendChild(img);
    }
    wall.appendChild(fragment);
    
    setTimeout(() => {
        wall.style.opacity = "1";
        const items = document.querySelectorAll('.photo-item');
        items.forEach((item, i) => {
            // Hızlı ve akıcı beliriş
            setTimeout(() => { 
                item.style.opacity = "0.6"; // Çok parlamaması için 0.6
                item.style.transform = "scale(1) translateY(0)"; 
            }, i * 25); 
        });
        
        setTimeout(() => {
            wall.style.opacity = "0";
            setTimeout(runNeonSequence, 1500);
        }, (140 * 25) + 1200);
    }, 100);
}

// 3. SİNEMATİK INTRO (YAZILAR)
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
                n2.style.opacity = "1";
                setTimeout(() => {
                    n2.style.opacity = "0";
                    setTimeout(initUniverse, 1200);
                }, 4000); 
            }, 1000);
        }, 3000);
    }, 100);
}

// 4. ANA EVREN VE KUSURSUZ 10:10 SENKRONİZASYONU
function initUniverse() {
    const universe = document.getElementById('main-universe');
    const clock = document.getElementById('clock-container');
    const texts = document.getElementById('hero-texts');
    const hHand = document.getElementById('h1');
    const mHand = document.getElementById('m1');
    
    universe.style.display = "block";
    createStars(); 

    setTimeout(() => {
        universe.style.opacity = "1";
        clock.style.opacity = "1";
        clock.style.filter = "blur(0)";
        
        // Saatin kollarının yumuşak bir fizikle 10:10'a oturması
        setTimeout(() => {
            hHand.style.transition = "transform 2.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
            mHand.style.transition = "transform 2.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
            
            // 10:10 Matematiksel açıları
            hHand.style.transform = "translate(-50%, 0) rotate(305deg)"; 
            mHand.style.transform = "translate(-50%, 0) rotate(60deg)";  
            
            // SAAT KÜÇÜLÜRKEN YAZININ GELMESİ (TAM SENKRON)
            setTimeout(() => {
                clock.classList.add('docked'); 
                texts.classList.add('visible'); 
                
                setTimeout(() => {
                    startTimers(); 
                }, 1500);
            }, 1800); // Kollar yerine oturduktan hemen sonra
        }, 1000);
    }, 100);
}

// 5. PARALLAX YILDIZ TOZU EFEKTİ
function createStars() {
    const field = document.getElementById('star-field');
    const starCount = window.innerWidth < 768 ? 150 : 300; // Mobilde daha az yıldız (Performans)
    
    for(let i=0; i<starCount; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        
        // Rastgele boyut (1px - 3px)
        const size = Math.random() * 2 + 1;
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        
        // Rastgele konum
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + 'vh';
        
        // Rastgele parlaklık ve animasyon süresi (10s - 30s)
        s.style.opacity = Math.random() * 0.8 + 0.2;
        s.style.animationDuration = (Math.random() * 20 + 10) + 's';
        s.style.animationDelay = '-' + (Math.random() * 20) + 's'; // Başlangıçta boşluk olmaması için
        
        field.appendChild(s);
    }
}

// 6. CANLI HASSAS SAYAÇLAR
function startTimers() {
    const birth = new Date("2009-04-04T00:00:00");
    const loveStart = new Date("2022-11-14T14:00:00");

    setInterval(() => {
        const now = new Date();
        document.getElementById('life-timer').innerHTML = formatTimeDiff(now - birth);
        document.getElementById('love-timer').innerHTML = formatTimeDiff(now - loveStart);
    }, 1000);
}

function formatTimeDiff(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const years = Math.floor(totalSeconds / 31536000);
    const days = Math.floor((totalSeconds % 31536000) / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Tek haneli sayıların başına 0 ekleme
    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');
    
    return `${years} YIL ${days} GÜN <br> ${h}:${m}:${s}`;
}

// 7. KUANTUM KİLİDİ (SLOT MAKİNESİ)
let isSpinning = false;
function spinSlot() {
    if(isSpinning) return;
    isSpinning = true;

    const rod = document.getElementById('handle');
    rod.classList.add('pulled');
    document.getElementById('slot-hint').innerText = "Kilit Çözülüyor...";
    
    const icons = ['✨', '💫', '💖', '🌌', '🔒'];
    const reels = [document.getElementById('r1'), document.getElementById('r2'), document.getElementById('r3')];
    
    // Hızlı dönüş efekti
    let speed = 50;
    const interval = setInterval(() => {
        reels.forEach(r => r.innerText = icons[Math.floor(Math.random()*icons.length)]);
    }, speed);

    // Kademeli duruş ve Kalp eşleşmesi
    setTimeout(() => {
        clearInterval(interval);
        reels[0].innerText = '❤️';
        
        setTimeout(() => { reels[1].innerText = '❤️'; }, 400);
        setTimeout(() => { 
            reels[2].innerText = '❤️'; 
            rod.classList.remove('pulled');
            document.getElementById('slot-hint').innerHTML = "<span style='color:var(--soft-pink); font-weight:bold;'>ZAMAN TÜNELİ AKTİF EDİLDİ!</span>";
            
            // Çerçeveye parlama efekti
            document.querySelector('.slot-frame').style.boxShadow = "0 0 50px rgba(255, 112, 150, 0.6)";
            
            setTimeout(() => {
                const tl = document.getElementById('hidden-timeline');
                tl.style.display = "block";
                
                // Zaman tüneline şık bir kaydırma
                setTimeout(() => {
                    const y = tl.getBoundingClientRect().top + window.scrollY - 50;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    checkReveal(); // Scroll fonksiyonunu manuel tetikle
                }, 100);
                
                isSpinning = false;
            }, 1200);
        }, 800);
    }, 2000);
}

// 8. SCROLL REVEAL (AŞAĞI KAYDIRDIKÇA YUMUŞAK BELİRME)
function checkReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 100; // Elementin ne kadarı göründüğünde tetikleneceği

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
checkReveal(); // Sayfa yüklendiğinde de kontrol et

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    const handle = document.getElementById('handle');
    if(handle) handle.addEventListener('click', spinSlot);
    
    // Enter tuşu ile şifre girme
    document.getElementById('pass').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') startExperience();
    });
});
