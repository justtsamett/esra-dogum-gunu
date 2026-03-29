
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
        setTimeout(() => { img.style.opacity = "1"; img.style.transform = "scale(1)"; }, i * 20);
    });
    
    setTimeout(() => {
        wall.style.opacity = "0";
        setTimeout(showUniverse, 1500);
    }, 7500);
}

function showUniverse() {
    document.getElementById('main-universe').style.display = "block";
    const h1 = document.getElementById('h1');
    const m1 = document.getElementById('m1');
    
    setTimeout(() => {
        h1.style.transform = "translate(-50%, 0) rotate(300deg)";
        m1.style.transform = "translate(-50%, 0) rotate(60deg)";
        setTimeout(() => {
            h1.style.transform = "translate(-50%, 0) rotate(360deg)";
            m1.style.transform = "translate(-50%, 0) rotate(360deg)";
            // Saat küçülme efekti
            setTimeout(() => {
                document.querySelector('.clock-main').style.transform = "scale(0.6)";
            }, 3000);
        }, 3000);
    }, 500);
}

// Kaydırma İzleyici
window.addEventListener('scroll', () => {
    // Haberler
    document.querySelectorAll('.news-row').forEach(row => {
        if(row.getBoundingClientRect().top < window.innerHeight * 0.8) row.classList.add('visible');
    });

    // Final Tetikleyici
    const trigger = document.getElementById('clocks-trigger').getBoundingClientRect().top;
    if(trigger < window.innerHeight * 0.7) {
        document.getElementById('en-onemli').style.opacity = "1";
        document.getElementById('en-onemli').style.transform = "translateY(0)";
        setTimeout(() => document.getElementById('bugun-itibariyle').style.opacity = "1", 600);
        setTimeout(() => {
            document.querySelector('.dual-clocks').style.opacity = "1";
            startLiveTimers();
        }, 1500);
        setTimeout(() => document.getElementById('final-text').style.opacity = "1", 3500);
    }
});

function startLiveTimers() {
    const birth = new Date("2009-04-04T00:00:00");
    const love = new Date("2023-01-01T00:00:00");

    setInterval(() => {
        const now = new Date();
        document.getElementById('life-timer').innerHTML = formatTime(now - birth);
        document.getElementById('love-timer').innerHTML = formatTime(now - love);
        
        // Küçük Saatlerin Yelkovanları
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
