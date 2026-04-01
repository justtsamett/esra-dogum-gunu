function startExperience() {
    const pass = document.getElementById('pass').value.toLowerCase().trim();
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
        alert("Yanlış anahtar...");
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
        document.querySelectorAll('.photo-item').forEach((p, i) => {
            setTimeout(() => { p.style.opacity = "0.7"; p.style.transform = "scale(1)"; }, i * 20);
        });
        
        setTimeout(() => {
            wall.style.opacity = "0";
            setTimeout(runIntroSequence, 1000);
        }, 4500);
    }, 100);
}

function runIntroSequence() {
    const n1 = document.getElementById('neon-intro-text');
    const n2 = document.getElementById('love-intro');
    
    n1.style.display = "block";
    setTimeout(() => { n1.style.opacity = "1"; }, 100);

    setTimeout(() => {
        n1.style.opacity = "0";
        setTimeout(() => {
            n2.style.display = "block";
            setTimeout(() => { n2.style.opacity = "1"; }, 100);
            setTimeout(() => {
                n2.style.opacity = "0";
                setTimeout(initMain, 1000);
            }, 3000);
        }, 1000);
    }, 2500);
}

function initMain() {
    const main = document.getElementById('main-universe');
    const clock = document.getElementById('clock-container');
    main.style.display = "block";
    setTimeout(() => {
        main.style.opacity = "1";
        document.getElementById('h1').style.transform = "translateX(-50%) rotate(305deg)";
        document.getElementById('m1').style.transform = "translateX(-50%) rotate(60deg)";
        
        setTimeout(() => {
            clock.classList.add('docked');
            document.getElementById('hero-texts').classList.add('visible');
            startTimers();
        }, 1500);
    }, 100);
}

function calculatePrecise(start) {
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (months < 0 || (months === 0 && days < 0)) years--;

    const diff = now - start;
    const dDays = Math.floor(diff / (1000*60*60*24)) % 365;
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');

    return `${years} YIL ${dDays} GÜN <br> ${h}:${m}:${s}`;
}

function startTimers() {
    const bDate = new Date("2009-04-04T00:00:00");
    const lDate = new Date("2022-11-14T14:00:00");
    setInterval(() => {
        document.getElementById('life-timer').innerHTML = calculatePrecise(bDate);
        document.getElementById('love-timer').innerHTML = calculatePrecise(lDate);
    }, 1000);
}

document.getElementById('handle').addEventListener('click', function() {
    if(this.classList.contains('active')) return;
    this.classList.add('active');
    const rod = this.querySelector('.rod');
    rod.classList.add('pulled');

    const reels = [document.getElementById('r1'), document.getElementById('r2'), document.getElementById('r3')];
    let count = 0;
    const spin = setInterval(() => {
        const sym = ['❤️','✨','🌸','💎'];
        reels.forEach(r => r.innerText = sym[Math.floor(Math.random()*4)]);
        count++;
        if(count > 20) {
            clearInterval(spin);
            reels.forEach(r => r.innerText = '❤️');
            rod.classList.remove('pulled');
            setTimeout(() => {
                document.getElementById('hidden-timeline').style.display = "block";
                window.scrollTo({ top: document.getElementById('hidden-timeline').offsetTop - 50, behavior: 'smooth' });
            }, 800);
        }
    }, 100);
});

// OYUNLAR
const compliments = ["Gülüşün ömre bedel.", "İyi ki benimsin.", "Seni her halinle çok seviyorum.", "Dünyanın en güzel meleği."];
function drawCompliment() {
    const d = document.getElementById('compliment-display');
    d.style.transform = "scale(0)";
    setTimeout(() => {
        d.innerText = compliments[Math.floor(Math.random()*compliments.length)];
        d.style.transform = "scale(1) rotate(-2deg)";
    }, 200);
}

function getFutureLuck() {
    const f = ["Çok mutlu olacağız.", "Yıldızlar bizimle.", "Gelecek bizim için parlıyor."];
    document.getElementById('fortune-display').innerText = f[Math.floor(Math.random()*f.length)];
}

window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('active');
    });
});
