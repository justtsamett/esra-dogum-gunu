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
    createCosmos();
    
    const h1 = document.getElementById('h1');
    const m1 = document.getElementById('m1');
    const wrapper = document.getElementById('intro-clock-wrapper');
    const texts = document.getElementById('intro-texts');

    setTimeout(() => {
        // SAAT HAREKETİ
        h1.style.transform = "translate(-50%, 0) rotate(720deg)";
        m1.style.transform = "translate(-50%, 0) rotate(1440deg)";
        
        setTimeout(() => {
            // MERKEZLEME VE KÜÇÜLME
            h1.style.transform = "translate(-50%, 0) rotate(360deg)";
            m1.style.transform = "translate(-50%, 0) rotate(360deg)";
            wrapper.classList.remove('center-focus');
            wrapper.classList.add('docked');

            setTimeout(() => {
                texts.style.display = "flex";
                setTimeout(() => texts.classList.add('visible'), 100);
            }, 2000);
        }, 3500);
    }, 1000);
}

function createCosmos() {
    const field = document.getElementById('star-field');
    for(let i=0; i<300; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = (Math.random() * 4 + 1) + 'px';
        s.style.width = size; s.style.height = size;
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.setProperty('--t', (2 + Math.random() * 5) + 's');
        field.appendChild(s);
    }
    for(let i=0; i<12; i++) {
        const ss = document.createElement('div');
        ss.className = 'shooting-star';
        ss.style.left = (Math.random() * 100) + '%';
        ss.style.top = (Math.random() * 30) + '%';
        ss.style.setProperty('--s', (5 + Math.random() * 10) + 's');
        ss.style.animationDelay = (Math.random() * 15) + 's';
        field.appendChild(ss);
    }
}

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
            startTimers();
        }, 1500);
        setTimeout(() => document.getElementById('final-text').style.opacity = "1", 3500);
    }
});

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
