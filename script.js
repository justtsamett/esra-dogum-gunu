function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
    if(pass === "esra") { 
        document.getElementById('gate').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('gate').style.display = "none";
            document.getElementById('bg-music').play();
            runPhotoFlow();
        }, 1000);
    }
}

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
            setTimeout(() => { item.style.opacity = "1"; item.style.transform = "scale(1)"; }, i * 30);
        });
        setTimeout(() => {
            wall.style.opacity = "0";
            setTimeout(runNeonSequence, 1500);
        }, (140 * 30) + 1000);
    }, 100);
}

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
                setTimeout(() => { n2.style.opacity = "0"; setTimeout(initUniverse, 1000); }, 4000);
            }, 1000);
        }, 2500);
    }, 100);
}

function initUniverse() {
    const clock = document.getElementById('clock-container');
    const texts = document.getElementById('hero-texts');
    const hHand = document.getElementById('h1');
    const mHand = document.getElementById('m1');
    
    document.getElementById('main-universe').style.display = "block";
    setTimeout(() => {
        document.getElementById('main-universe').style.opacity = "1";
        clock.style.opacity = "1"; clock.style.filter = "blur(0)";
        
        // 10:10 AYARI
        setTimeout(() => {
            hHand.style.transition = "transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            mHand.style.transition = "transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            hHand.style.transform = "translate(-50%, 0) rotate(305deg)";
            mHand.style.transform = "translate(-50%, 0) rotate(60deg)";
            
            // KÜÇÜLME VE YAZI GİRİŞİ
            setTimeout(() => {
                clock.classList.add('docked');
                texts.classList.add('visible');
                startTimers();
            }, 1200);
        }, 1000);
    }, 100);
}

function startTimers() {
    const birth = new Date("2009-04-04T00:00:00");
    const love = new Date("2022-11-14T14:00:00");
    setInterval(() => {
        const now = new Date();
        document.getElementById('life-timer').innerText = formatDiff(now - birth);
        document.getElementById('love-timer').innerText = formatDiff(now - love);
    }, 1000);
}

function formatDiff(ms) {
    const s = Math.floor(ms/1000);
    const y = Math.floor(s/31536000);
    const d = Math.floor((s%31536000)/86400);
    const h = Math.floor((s%86400)/3600);
    const m = Math.floor((s%3600)/60);
    const sn = s%60;
    return `${y} YIL ${d} GÜN ${h}:${m}:${sn}`;
}

let isSpinning = false;
function spinSlot() {
    if(isSpinning) return;
    isSpinning = true;
    document.getElementById('handle').classList.add('pulled');
    const reels = [document.getElementById('r1'), document.getElementById('r2'), document.getElementById('r3')];
    const interval = setInterval(() => {
        reels.forEach(r => r.innerText = ['❤️', '💖', '✨'][Math.floor(Math.random()*3)]);
    }, 100);
    setTimeout(() => {
        clearInterval(interval);
        reels.forEach(r => r.innerText = '❤️');
        document.getElementById('handle').classList.remove('pulled');
        document.getElementById('hidden-timeline').style.display = "block";
        isSpinning = false;
    }, 2000);
}

window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('active');
    });
});

document.getElementById('handle').addEventListener('click', spinSlot);
