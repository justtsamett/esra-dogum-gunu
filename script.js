function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    if(pass === "kısa ve küçük") {
        document.getElementById('gate').style.opacity = "0";
        setTimeout(() => document.getElementById('gate').style.display = "none", 1000);
        document.getElementById('bg-music').play();
        runPhotoFlow();
    }
}

// 1. FOTOĞRAFLARIN GELİŞİ
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
            setTimeout(() => { item.style.opacity = "1"; item.style.transform = "scale(1)"; }, i * 40);
        });
        
        // 2. HER ŞEY SÖNER VE NEONLAR BAŞLAR
        setTimeout(() => {
            wall.style.opacity = "0";
            setTimeout(runNeonSequence, 2000);
        }, (140 * 40) + 2000);
    }, 100);
}

// 2. NEON SEKANS
function runNeonSequence() {
    const n1 = document.getElementById('neon-intro-text');
    const n2 = document.getElementById('love-intro');

    n1.style.display = "block";
    setTimeout(() => {
        n1.style.opacity = "1";
        setTimeout(() => {
            n1.style.opacity = "0";
            setTimeout(() => {
                n2.style.display = "block";
                setTimeout(() => {
                    n2.style.opacity = "1";
                    setTimeout(() => {
                        n2.style.opacity = "0";
                        setTimeout(initUniverse, 1500);
                    }, 2500); // Esra & Samet 2.5 saniye kalır
                }, 100);
            }, 1000);
        }, 3000);
    }, 100);
}

// 3. ANA EVREN VE SAAT
function initUniverse() {
    const universe = document.getElementById('main-universe');
    const clock = document.getElementById('clock-container');
    const texts = document.getElementById('hero-texts');
    
    universe.style.display = "block";
    createStars();

    setTimeout(() => {
        universe.style.opacity = "1";
        clock.classList.add('active'); // Tozdan var olma (Blur -> Sharp)
        
        // Kolların 00:00'a gelmesi
        setTimeout(() => {
            document.getElementById('h1').style.transform = "translate(-50%, 0) rotate(360deg)";
            document.getElementById('m1').style.transform = "translate(-50%, 0) rotate(360deg)";
            
            // Köşeye çekilme ve metinlerin belirmesi
            setTimeout(() => {
                clock.classList.add('docked');
                setTimeout(() => { texts.classList.add('visible'); }, 1000);
            }, 3000);
        }, 2000);
    }, 100);
}

function createStars() {
    const field = document.getElementById('star-field');
    const h = document.documentElement.scrollHeight;
    for(let i=0; i<700; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.width = (Math.random() * 3) + 'px';
        s.style.height = s.style.width;
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * h + 'px';
        s.style.backgroundColor = i % 10 === 0 ? '#ff80ab' : '#fff'; // Bazı yıldızlar pembe
        s.style.setProperty('--t', (2 + Math.random() * 4) + 's');
        field.appendChild(s);
    }
}

// SCROLL REVEAL & SAYAÇLAR
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            el.classList.add('active');
            if(el.id === 'clocks-trigger' && !window.tStarted) {
                window.tStarted = true;
                startTimers();
            }
        }
    });
});

function startTimers() {
    const b = new Date("2009-04-04T00:00:00"), l = new Date("2023-01-01T00:00:00");
    setInterval(() => {
        const n = new Date();
        document.getElementById('life-timer').innerHTML = formatT(n - b);
        document.getElementById('love-timer').innerHTML = formatT(n - l);
        
        const m = n.getMinutes() * 6, h = (n.getHours() % 12) * 30 + (n.getMinutes() / 2);
        document.getElementById('m2').style.transform = `translate(-50%, 0) rotate(${m}deg)`;
        document.getElementById('h2').style.transform = `translate(-50%, 0) rotate(${h}deg)`;
        document.getElementById('m3').style.transform = `translate(-50%, 0) rotate(${m}deg)`;
        document.getElementById('h3').style.transform = `translate(-50%, 0) rotate(${h}deg)`;
    }, 1000);
}

function formatT(ms) {
    const s = Math.floor(ms/1000);
    const y = Math.floor(s/31536000), d = Math.floor((s%31536000)/86400);
    const h = Math.floor((s%86400)/3600), m = Math.floor((s%3600)/60), sn = s%60;
    return `${y} YIL ${d} GÜN ${h} SAAT ${m} DK ${sn} SN`;
}

// SLOT MAKİNESİ
let spinning = false;
function spinSlot() {
    if(spinning) return;
    spinning = true;
    const rod = document.getElementById('handle');
    rod.classList.add('pulled');
    
    const icons = ['❤️', '💖', '🎁', '🎀', '🌸'];
    const reels = [document.getElementById('r1'), document.getElementById('r2'), document.getElementById('r3')];
    
    const interval = setInterval(() => {
        reels.forEach(r => r.innerText = icons[Math.floor(Math.random()*icons.length)]);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        reels.forEach(r => r.innerText = '❤️');
        rod.classList.remove('pulled');
        spinning = false;
        document.querySelector('.slot-frame').style.boxShadow = "0 0 80px #ff80ab";
        document.getElementById('slot-hint').innerText = "SONSUZ AŞK KAZANILDI!";
    }, 3000);
}

// Slot kolu için event listener
document.addEventListener('DOMContentLoaded', () => {
    const handle = document.getElementById('handle');
    if(handle) handle.addEventListener('click', spinSlot);
});
