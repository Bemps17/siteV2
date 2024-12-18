function toggleChronometer() {
    const controls = document.getElementById('controls');
    if (controls.style.display === 'none' || controls.style.display === '') {
        controls.style.display = 'block';
    } else {
        controls.style.display = 'none';
    }
}



let chronoTime = 0;
let chronoInterval;
let timerTime = 0;
let timerInterval;

function startChronometer() {
    clearInterval(chronoInterval);
    chronoInterval = setInterval(() => {
        chronoTime++;
        displayChronoTime();
    }, 1000);
}

function stopChronometer() {
    clearInterval(chronoInterval);
}

function resetChronometer() {
    chronoTime = 0;
    displayChronoTime();
}

function displayChronoTime() {
    const minutes = Math.floor(chronoTime / 60);
    const seconds = chronoTime % 60;
    document.getElementById('chrono-display').textContent =
        `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer(duration) {
    clearInterval(timerInterval);
    timerTime = duration;
    displayTimerTime();

    timerInterval = setInterval(() => {
        if (timerTime > 0) {
            timerTime--;
            displayTimerTime();
        } else {
            clearInterval(timerInterval);
            alert("Temps écoulé !");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    timerTime = 0;
    displayTimerTime();
}

function startTimerFromInput() {
    const inputSeconds = document.getElementById('timer-input-seconds').value;
    const inputMinutes = document.getElementById('timer-input-minutes').value;

    let totalSeconds = 0;

    // Si les minutes sont saisies, on les convertit en secondes
    if (!isNaN(inputMinutes) && inputMinutes > 0) {
        totalSeconds += parseInt(inputMinutes) * 60;
    }

    // Ajouter les secondes si elles sont saisies
    if (!isNaN(inputSeconds) && inputSeconds > 0) {
        totalSeconds += parseInt(inputSeconds);
    }

    // Démarrer le timer si un temps valide a été entré
    if (totalSeconds > 0) {
        startTimer(totalSeconds);
    } else {
        alert("Veuillez entrer un temps valide en secondes ou en minutes.");
    }
}


function displayTimerTime() {
    if (timerTime >= 60) {
        const minutes = Math.floor(timerTime / 60);
        const seconds = timerTime % 60;
        document.getElementById('timer-display').textContent =
            `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        document.getElementById('timer-display').textContent =
            `00:${timerTime < 10 ? '0' : ''}${timerTime}`;
    }
}
// Déclarez l'audio
const timerSound = new Audio('sound/bellding-254774.mp3');
timerSound.volume = 1;
timerSound.loop = false;

function startTimer(duration) {
    clearInterval(timerInterval);
    timerTime = duration;
    displayTimerTime();

    timerInterval = setInterval(() => {
        if (timerTime > 1) {
            timerTime--;
            displayTimerTime();
        } else if (timerTime === 1) {
            // Jouer le son lorsque le timer atteint 1 seconde restante
            timerSound.play().catch((error) => {
                console.error("Erreur lors de la lecture du son :", error);
            });

            timerTime--; // Décrémente pour arriver à zéro
            displayTimerTime();
        } else {
            // Timer terminé
            clearInterval(timerInterval);
            alert("Temps écoulé !");
        }
    }, 1000);
}

    

timerSound.volume = 1; // Réglez le volume à 50 %
    timerSound.loop = false; // Ne pas répéter le son

    function closeChronometer() {
        const controls = document.getElementById('controls');
        controls.style.display = 'none';
    }
    
    const draggable = document.getElementById('controls');

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    
    draggable.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - draggable.getBoundingClientRect().left;
        offsetY = e.clientY - draggable.getBoundingClientRect().top;
    
        // Améliorez les performances en désactivant les transitions
        draggable.style.transition = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            draggable.style.position = 'absolute';
            draggable.style.left = `${e.clientX - offsetX}px`;
            draggable.style.top = `${e.clientY - offsetY}px`;
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        // Réactivez les transitions si nécessaire
        draggable.style.transition = '';
    });
    