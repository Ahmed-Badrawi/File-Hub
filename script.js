document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const enterBtn = document.getElementById('enter-btn');
    const intro = document.getElementById('intro');
    const osContainer = document.getElementById('os-container');
    const ambientSound = document.getElementById('ambient-sound');
    const uiClick = document.getElementById('ui-click');

    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        setTimeout(() => {
            ring.style.left = e.clientX - 15 + 'px';
            ring.style.top = e.clientY - 15 + 'px';
        }, 40);
    });

    enterBtn.addEventListener('click', () => {
        uiClick.play();
        
        intro.style.transition = '1s';
        intro.style.opacity = '0';
        
        setTimeout(() => {
            intro.classList.add('hidden');
            osContainer.classList.remove('hidden');
            
            if(ambientSound.src !== "") {
                ambientSound.volume = 0.5;
                ambientSound.play().catch(e => console.log("Audio waiting for interaction"));
            }
            
            startClock();
            fetchIP();
        }, 1000);
    });

    function startClock() {
        setInterval(() => {
            const now = new Date();
            document.getElementById('clock').innerText = now.toLocaleTimeString();
        }, 1000);
    }

    async function fetchIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            document.getElementById('user-ip').innerText = data.ip;
        } catch {
            document.getElementById('user-ip').innerText = "127.0.0.1";
        }
    }
});
