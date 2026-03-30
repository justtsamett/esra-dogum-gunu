// 1. GİRİŞ VE ŞİFRE MEKANİZMASI
function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    // Şifreyi buradan güncelleyebilirsin (Şu an: esra)
    if(pass === "esra") { 
        document.getElementById('gate').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('gate').style.display = "none";
            const music = document.getElementById('bg-music');
            music.volume = 0.3; // Müzik ses seviyesi
            music.play();
            runPhotoFlow();
        }, 1000);
    } else {
        alert("Bu anahtar bu evrene ait değil sevgilim...");
    }
}

// 2. 140 FOTOĞRAFLIK YAĞMUR EFEKTİ
function runPhotoFlow() {
    const wall = document.getElementById('photo-wall');
    // img/ klasöründe 1.jpg'den 140.jpg'ye kadar fotoğrafların olmalı
    for(let i=1; i<=140; i++) {
        const img = document.createElement('img');
        img.src = `img/${i}.jpg`;
        // Eğer fotoğraf yoksa hata vermemesi için rastgele placeholder koyar
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
            }, i * 30); // Fotoğrafların tek tek belirmesi
        });
        
        setTimeout(() => {
            wall.style.opacity = "0";
            setTimeout(runNeonSequence, 1500);
        }, (140 * 30) + 1000);
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
                    setTimeout(initUniverse, 1000);
                }, 4000); 
            }, 1000);
        }, 2500);
    }, 100);
}

// 4. SAAT VE YAZI SENKRONİZASYONU (10:10 AYARI)
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
        clock.classList.add('active'); 

        // Saatin kollarını 10:10'a getiriyoruz (Matematiksel açılar)
        setTimeout(() => {
            hHand.style.transition = "transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            mHand.style.transition = "transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            
            hHand.style.transform = "translate(-50%, 0) rotate(305deg)"; // 10 yönü
            mHand.style.transform = "translate(-50%, 0) rotate(60deg)";  // 10 geçe
            
            // SAAT KÜÇÜLÜRKEN YAZININ GELMESİ
            setTimeout(() => {
                clock.classList.add('docked'); // CSS'teki docked sınıfı çalışır
                texts.classList.add('visible'); // CSS'teki visible sınıfı çalışır
                
                setTimeout(() => {
                    startTimers(); // Sayaçları başlat
                }, 1500);
            }, 1200); 
        }, 1000);
    }, 100);
}

// 5. KOZMİK YILDIZ TOZU
function createStars() {
    const field = document.getElementById('star-field');
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for(let i=0; i<400; i++) {
        const s = document.createElement('div');
        s.style.position = "absolute";
        s.style.width = "2px";
        s.style.height = "2px";
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * height + 'px';
        s.style.backgroundColor = "#fff";
        s.style.borderRadius = "50%";
        s.style.opacity = Math.random();
        field.appendChild(s);
    }
}

// 6. CANLI SAYAÇLAR (DOĞUM VE TANIŞMA)
function startTimers() {
    const birth = new Date("2009-04-04T00:00:00");
    const loveStart = new Date("2022-11-14T14:00:00"); // Senin verdiğin tarih

    setInterval(() => {
        const now = new Date();
        document.getElementById('life-timer').innerHTML = formatTimeDiff(now - birth);
        document.getElementById('love-timer').innerHTML = formatTimeDiff(now - loveStart);
    }, 1000);
}

function formatTimeDiff(ms) {
    const s = Math.floor(ms/1000);
    const y = Math.floor(s/31536000);
    const d = Math.floor((s%31536000)/86400);
    const h = Math.floor((s%86400)/3600);
    const m = Math.floor((s%3600)/60);
    const sn = s%60;
    return `${y} YIL ${d} GÜN ${h}:${m}:${sn}`;
}

// 7. SLOT MAKİNESİ VE ANILARIN AÇILMASI
let isSpinning = false;
function spinSlot() {
    if(isSpinning) return;
    isSpinning = true;

    const rod = document.getElementById('handle');
    rod.classList.add('pulled');
    
    const icons = ['❤️', '💖', '✨', '🌸', '💍'];
    const reels = [document.getElementById('r1'), document.getElementById('r2'), document.getElementById('r3')];
    
    const interval = setInterval(() => {
        reels.forEach(r => r.innerText = icons[Math.floor(Math.random()*icons.length)]);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        reels.forEach(r => r.innerText = '❤️'); // Üçü de kalp gelir
        rod.classList.remove('pulled');
        
        setTimeout(() => {
            const tl = document.getElementById('hidden-timeline');
            tl.style.display = "block";
            // Sayfayı yavaşça zaman tüneline kaydır
            window.scrollTo({ top: tl.offsetTop, behavior: 'smooth' });
            isSpinning = false;
        }, 1000);
    }, 2500);
}

// 8. SCROLL REVEAL (KAYDIRINCA BELİRME)
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.9) {
            el.classList.add('active');
        }
    });
});

// EVENT LISTENER
document.addEventListener('DOMContentLoaded', () => {
    const handle = document.getElementById('handle');
    if(handle) handle.addEventListener('click', spinSlot);
});
