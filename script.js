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
    
    const wrapper = document.getElementById('intro-clock-wrapper');
    const h1 = document.getElementById('h1');
    const m1 = document.getElementById('m1');
    const texts = document.getElementById('intro-texts');

    setTimeout(() => {
        wrapper.classList.add('center-focus');
        setTimeout(() => {
            h1.style.transform = "translate(-50%, 0) rotate(720deg)";
            m1.style.transform = "translate(-50%, 0) rotate(1440deg)";
            setTimeout(() => {
                h1.style.transform = "translate(-50%, 0) rotate(360deg)";
                m1.style.transform = "translate(-50%, 0) rotate(360deg)";
                wrapper.classList.remove('center-focus');
                wrapper.classList.add('docked');
                setTimeout(() => {
                    texts.style.display = "flex";
                    setTimeout(() => texts.classList.add('visible'), 100);
                }, 1800);
            }, 3500);
        }, 1500);
    }, 500);
}

function createCosmos() {
    const field = document.getElementById('star-field');
    const pageHeight = document.documentElement.scrollHeight;
    for(let i=0; i<600; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.width = (Math.random() * 3 + 1) + 'px';
        s.style.height = s.style.width;
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * pageHeight + 'px';
        s.style.setProperty('--t', (2 + Math.random() * 5) + 's');
        field.appendChild(s);
    }
}

window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            el.classList.add('active');
            if(el.id === 'clocks-trigger') startTimers();
        }
    });
});

function startTimers() {
    if(window.timerStarted) return;
    window.timerStarted = true;
    const birth = new Date("2009-04-04T00:00:00");
    const love = new Date("2023-01-01T00:00:00");
    setInterval(() => {
        const now = new Date();
        document.getElementById('life-timer').innerHTML = formatTime(now - birth);
        document.getElementById('love-timer').innerHTML = formatTime(now - love);
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
