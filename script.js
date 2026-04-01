// GİRİŞ KONTROLÜ
function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    if(pass === "esra") {
        document.getElementById('gate').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('gate').style.display = "none";
            const music = document.getElementById('bg-music');
            music.volume = 0.4;
            music.play().catch(() => console.log("Otomatik oynatma engellendi."));
            runPhotoFlow();
        }, 1200);
    } else {
        alert("Bu anahtar bu kalbe ait değil...");
    }
}

// FOTOĞRAF YAĞMURU
function runPhotoFlow() {
    const wall = document.getElementById('photo-wall');
    const fragment = document.createDocumentFragment();
    for(let i=1; i<=140; i++) {
        const img = document.createElement('img');
        img.src = `img/${i}.jpg`;
        img.onerror = function(){ this.src=`https://picsum.photos/200/200?random=${i}`; };
        img.className = 'photo-item';
        fragment.appendChild(img);
    }
    wall.appendChild(fragment);
    
    setTimeout(() => {
        wall.style.opacity = "1";
        document.querySelectorAll('.photo-item').forEach((p, i) => {
            setTimeout(() => { p.style.opacity = "0.7"; p.style.transform = "scale(1)"; }, i * 20);
        });
        
        setTimeout(() => {
            wall.style.opacity = "0";
            setTimeout(runIntroSequence, 1000);
        }, 4500);
    }, 100);
}

// SİNEMATİK GEÇİŞ
function runIntroSequence() {
    const n1 = document.getElementById('neon-intro-text');
    const n2 = document.getElementById('love-intro');
    
    n1.style.display = "block";
    setTimeout(() => {
        n1.style.opacity = "1";
        setTimeout(() => {
            n1.style.opacity = "0";
            setTimeout(() => {
                n2.style.display = "block";
                n2.style.opacity = "1";
                setTimeout(() => {
                    n2.style.opacity = "0";
                    setTimeout(initMain, 1000);
                }, 3500);
            }, 800);
        }, 2500);
    }, 100);
}

// ANA EKRAN VE SAAT AYARI
function initMain() {
    const main = document.getElementById('main-universe');
    const clock = document.getElementById('clock-container');
    const h = document.getElementById('h1');
    const m = document.getElementById('m1');

    main.style.display = "block";
    setTimeout(() => {
        main.style.opacity = "1";
        setTimeout(() => {
            h.style.transition = "2.5s cubic-bezier(0.19, 1, 0.22, 1)";
            m.style.transition = "2.5s cubic-bezier(0.19, 1, 0.22, 1)";
            h.style.transform = "translateX(-50%) rotate(305deg)"; // 10 Saat kolu
            m.style.transform = "translateX(-50%) rotate(60deg)";  // 10 Dakika kolu
            
            setTimeout(() => {
                clock.classList.add('docked');
                document.getElementById('hero-texts').classList.add('visible');
                startTimers();
            }, 1200);
        }, 800);
    }, 100);
}

// HASSAS YAŞ VE SÜRE HESABI (4 NİSAN KONTROLLÜ)
function calculatePrecise(startDate) {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    // Doğum günü/Tanışma günü henüz bu yıl gelmediyse yılı bir eksilt
    if (months < 0 || (months === 0 && days < 0)) { years--; }

    const diff = now - startDate;
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const displayDays = totalDays % 365;

    const hour = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');

    return `${years} YIL ${displayDays} GÜN <br> ${hour}:${min}:${sec}`;
}

function startTimers() {
    const bDate = new Date("2009-04-04T00:00:00");
    const lDate = new Date("2022-11-14T14:00:00");
    setInterval(() => {
        document.getElementById('life-timer').innerHTML = calculatePrecise(bDate);
        document.getElementById('love-timer').innerHTML = calculatePrecise(lDate);
    }, 1000);
}

// KALP KİLİDİ ÇALIŞMASI
document.getElementById('handle').addEventListener('click', function() {
    if(this.classList.contains('active')) return;
    this.classList.add('active');
    
    const rod = this.querySelector('.rod');
    rod.classList.add('pulled');
    
    const reels = [document.getElementById('r1'), document.getElementById('r2'), document.getElementById('r3')];
    const icons = ['❤️', '💖', '✨', '🌸', '💍'];
    
    let count = 0;
    const loop = setInterval(() => {
        reels.forEach(r => r.innerText = icons[Math.floor(Math.random()*5)]);
        count++;
        if(count > 25) {
            clearInterval(loop);
            reels.forEach(r => r.innerText = '❤️');
            rod.classList.remove('pulled');
            setTimeout(() => {
                const tl = document.getElementById('hidden-timeline');
                tl.style.display = "block";
                window.scrollTo({ top: tl.offsetTop - 50, behavior: 'smooth' });
            }, 800);
        }
    }, 100);
});

// İNTERAKTİF OYUNLAR
const compliments = [
    "Seninle geçen her dakika ömrüme ömür katıyor.",
    "Gülüşün, tüm yıldızlardan daha parlak sevgilim.",
    "İyi ki seni bulmuşum, iyi ki benimsin.",
    "Dünyadaki en güzel manzara, senin bana bakan gözlerin.",
    "Sen benim 7 dakikalık son anımın en güzel parçasısın.",
    "Varlığın hayatımın en büyük mucizesi Esra."
];

function drawCompliment() {
    const display = document.getElementById('compliment-display');
    display.style.transform = "scale(0) rotate(10deg)";
    setTimeout(() => {
        display.innerText = compliments[Math.floor(Math.random() * compliments.length)];
        display.style.transform = "scale(1) rotate(-2deg)";
    }, 300);
}

const fortunes = [
    "Yıldızlar diyor ki: El ele çok uzaklara gideceksiniz.",
    "Gelecekte bizi büyük bir mutluluk ve kahkaha bekliyor.",
    "Bugün ona 'Seni Seviyorum' de, günün aydınlansın.",
    "Gelecek planlarınızdaki o ev çok huzurlu olacak.",
    "Kalbini dinle, o zaten her an Esra diyor..."
];

function getFutureLuck() {
    const display = document.getElementById('fortune-display');
    display.style.opacity = "0";
    setTimeout(() => {
        display.innerText = fortunes[Math.floor(Math.random() * fortunes.length)];
        display.style.opacity = "1";
    }, 400);
}

// SCROLL REVEAL
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('active');
    });
});
