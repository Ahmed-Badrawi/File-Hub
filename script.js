document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const enterBtn = document.getElementById('enter-btn');
    const intro = document.getElementById('intro');
    const osContainer = document.getElementById('os-container');
    const ambientSound = document.getElementById('ambient-sound');
    const uiClick = document.getElementById('ui-click');
    
    const sysPass = document.getElementById('sys-pass');
    const bgContainer = document.getElementById('bg-container');
    const mainVideo = document.getElementById('main-video');
    const errorTxt = document.getElementById('error-txt');
    const gateMsg = document.getElementById('gate-msg');

    const correctPassword = "admin"; 
    
    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        setTimeout(() => {
            ring.style.left = e.clientX - 15 + 'px';
            ring.style.top = e.clientY - 15 + 'px';
        }, 40);
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('.nav-link') || e.target.closest('.dl-btn') || e.target.closest('.file-card')) {
            if (uiClick) {
                uiClick.currentTime = 0; 
                uiClick.play().catch(err => console.log("Audio play blocked"));
            }
        }
    });

    enterBtn.addEventListener('click', () => {
        if (uiClick) {
            uiClick.currentTime = 0;
            uiClick.play().catch(err => console.log("Audio play blocked"));
        }

        if (sysPass.value === correctPassword) {
            if (errorTxt) errorTxt.style.display = "none";
            
            intro.style.transition = '1s';
            intro.style.opacity = '0';
            
            setTimeout(() => {
                intro.classList.add('hidden');
                osContainer.classList.remove('hidden');
                
                if (bgContainer && mainVideo) {
                    bgContainer.style.display = "block";
                    mainVideo.muted = true;
                    mainVideo.play().catch(e => console.log("Video playing"));
                }

                if(ambientSound && ambientSound.src !== "") {
                    ambientSound.volume = 0.5;
                    ambientSound.play().catch(e => console.log("Audio waiting for interaction"));
                }
                
                startClock();
                fetchIP();
            }, 1000);

        } else {
            if (errorTxt) errorTxt.style.display = "block";
            
            if (gateMsg) gateMsg.style.color = "var(--red)";
            sysPass.value = ""; 
            
            if (bgContainer && mainVideo) {
                bgContainer.style.display = "block";
                mainVideo.muted = false; 
                mainVideo.play().catch(e => console.log("Video restriction handled"));
            }
            if (ambientSound) {
                ambientSound.volume = 0.8; 
                ambientSound.play().catch(e => console.log("Audio restriction handled"));
            }
        }
    });

    sysPass.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            enterBtn.click();
        }
    });

    function startClock() {
        setInterval(() => {
            const now = new Date();
            const clockEl = document.getElementById('clock');
            if (clockEl) clockEl.innerText = now.toLocaleTimeString();
        }, 1000);
    }

    async function fetchIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            const ipEl = document.getElementById('user-ip');
            if (ipEl) ipEl.innerText = data.ip;
        } catch {
            const ipEl = document.getElementById('user-ip');
            if (ipEl) ipEl.innerText = "127.0.0.1";
        }
    }
});
