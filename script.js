// 1. GİRİŞ VE ŞİFRE KONTROLÜ
function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    // Şifreyi buraya istediğin gibi yazabilirsin
    if(pass === "esra") { 
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

// 2. FOTOĞRAF YAĞMURU (140 FOTOĞRAF)
function runPhotoFlow() {
    const wall = document.getElementById('photo-wall');
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
            }, i * 30);
        });
        
        setTimeout(() => {
            wall.style.opacity = "0";
            setTimeout(runNeonSequence, 1500);
        }, (140 * 30) + 1000);
    }, 100);
}

// 3. SİNEMATİK INTRO SIRALAMASI
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

// 4. ANA EVREN VE EŞ ZAMANLI SAAT ANİMASYONU
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
        clock.classList.add('active'); 

        // Saatin 10:10'a kurulması (Akrep: 305deg, Yelkovan: 60deg)
        setTimeout(() => {
            hHand.style.transition = "transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            mHand.style.transition = "transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            
            hHand.style.transform = "translate(-50%, 0) rotate(305deg)";
            mHand.style.transform = "translate(-50%, 0) rotate(60deg)";
            
            // SAAT KÜÇÜLÜRKEN YAZININ GELMESİ (TAM SENKRONİZASYON)
            setTimeout(() => {
                clock.classList.add('docked'); // Küçülme başlar
                texts.classList.add('visible'); // Yazı aynı anda belirir
                
                setTimeout(() => {
                    window.clocksActive = true;
                    startTimers(); 
                }, 1500);
            }, 1200); // 10:10'a otururken süzülme başlar
        }, 1000);
    }, 100);
}

// 5. YILDIZ TOZU
function createStars() {
    const field = document.getElementById('star-field');
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for(let i=0; i<500; i++) {
        const s = document.createElement('div');
        s.style.position = "absolute";
        s.style.width = (Math.random() * 2) + 'px';
        s.style.height = s.style.width;
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * height + 'px';
        s.style.backgroundColor = "#fff";
        s.style.borderRadius = "50%";
        s.style.opacity = Math.random();
        field.appendChild(s);
    }
}

// 6. SAYAÇLAR
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
    return `${y} YIL ${d} GÜN ${h} SAAT ${m} DK ${sn} SN`;
}

// 7. SLOT MAKİNESİ VE ZAMAN TÜNELİ KİLİDİ
let isSpinning = false;
function spinSlot() {
    if(isSpinning) return;
    isSpinning = true;

    const rod = document.getElementById('handle');
    rod.classList.add('pulled');
    
    const icons = ['❤️', '💖', '💍', '🌸', '✨'];
    const reels = [document.getElementById('r1'), document.getElementById('r2'), document.getElementById('r3')];
    
    const interval = setInterval(() => {
        reels.forEach(r => r.innerText = icons[Math.floor(Math.random()*icons.length)]);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        reels.forEach(r => r.innerText = '❤️'); 
        rod.classList.remove('pulled');
        
        const frame = document.querySelector('.slot-frame');
        frame.style.boxShadow = "0 0 100px var(--soft-pink)";
        document.getElementById('slot-hint').innerHTML = "<b style='color:#fff'>BİZİM HİKAYEMİZİN KİLİDİ AÇILDI!</b>";
        
        setTimeout(() => {
            const tl = document.getElementById('hidden-timeline');
            tl.style.display = "block";
            window.scrollTo({ top: tl.offsetTop, behavior: 'smooth' });
            isSpinning = false;
        }, 1000);
    }, 3000);
}

// 8. KAYDIRINCA BELİRME (SCROLL REVEAL)
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.85) {
            el.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const handle = document.getElementById('handle');
    if(handle) handle.addEventListener('click', spinSlot);
});
