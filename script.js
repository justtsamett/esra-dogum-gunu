function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    if(pass === "kısa ve küçük") {
        document.getElementById('gate').style.opacity = "0";
        setTimeout(() => document.getElementById('gate').style.display = "none", 1000);
        document.getElementById('bg-music').play();
        runPhotoWall();
    }
}

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
        setTimeout(() => { img.style.opacity = "1"; img.style.transform = "scale(1)"; }, i * 15);
    });
    
    setTimeout(() => {
        wall.style.opacity = "0";
        setTimeout(showUniverse, 1500);
    }, 6000);
}

function showUniverse() {
    document.getElementById('main-universe').style.display = "block";
    createStars();
    
    const h1 = document.getElementById('h1');
    const m1 = document.getElementById('m1');
    const wrapper = document.getElementById('intro-clock-wrapper');
    const texts = document.getElementById('intro-texts');

    // 1. SAAT HAREKETİ (Zamanı Gösterir)
    setTimeout(() => {
        h1.style.transform = "translate(-50%, 0) rotate(720deg)";
        m1.style.transform = "translate(-50%, 0) rotate(1440deg)";
        
        // 2. KÜÇÜLME VE SOLA KENETLENME
        setTimeout(() => {
            h1.style.transform = "translate(-50%, 0) rotate(360deg)";
            m1.style.transform = "translate(-50%, 0) rotate(360deg)";
            wrapper.classList.remove('center-focus');
            wrapper.classList.add('docked');

            // 3. YAZILAR GELİR
            setTimeout(() => {
                texts.style.display = "flex";
                setTimeout(() => texts.classList.add('visible'), 100);
            }, 2000);
        }, 3500);
    }, 1000);
}

function createStars() {
    const field = document.getElementById('star-field');
    // Daha çok ve farklı boyutlarda yıldızlar
    for(let i=0; i<250; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = (Math.random() * 4) + 'px';
        s.style.width = size; s.style.height = size;
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.setProperty('--t', (2 + Math.random() * 5) + 's');
        field.appendChild(s);
    }
    // Daha büyük kayan yıldızlar
    for(let i=0; i<8; i++) {
        const ss = document.createElement('div');
        ss.className = 'shooting-star';
        ss.style.left = (Math.random() * 100) + '%';
        ss.style.top = (Math.random() * 40) + '%';
        ss.style.setProperty('--s', (8 + Math.random() * 15) + 's');
        ss.style.animationDelay = (Math.random() * 20) + 's';
        field.appendChild(ss);
    }
}

// Scroll ve Sayaç Fonksiyonları (V8 ile tamamen aynı)
window.addEventListener('scroll', () => {
    document.querySelectorAll('.news-row').forEach(row => {
        if(row.getBoundingClientRect().top < window.innerHeight * 0.8) row.classList.add('visible');
    });
    // Final tetikleyici kodları...
});
// startLiveTimers ve formatTime fonksiyonlarını buraya v8'den kopyala.
