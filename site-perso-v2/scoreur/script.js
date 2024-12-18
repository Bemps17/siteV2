// document.addEventListener('DOMContentLoaded', () => {
//     // Éléments DOM
//     const playersContainer = document.getElementById('players');
//     const addPlayerBtn = document.getElementById('addPlayerBtn');
//     const settingsBtn = document.querySelector('.settings-button');
//     const settingsPanel = document.querySelector('.settings-panel');
//     const timerDisplay = document.getElementById('timerDisplay');
//     const timeLeftDisplay = document.getElementById('timeLeft');
    
//     // Gestion des onglets
//     const tabButtons = document.querySelectorAll('.tab-button');
//     const tabPanes = document.querySelectorAll('.tab-pane');

//     // Variables globales
//     let playerCount = 0;
//     let timer;
//     let timeLeft = 900; // 15 minutes en secondes
//     let isPaused = true;

//     // Configuration par défaut
//     let settings = {
//         winPoints: 100,
//         primaryColor: '#ff7700',
//         secondaryColor: '#ff9944',
//         soundEnabled: true,
//         timerAlertEnabled: true,
//         timerDuration: 45,
//         timeExtension: 15
//     };

//     // Gestion des onglets
//     tabButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             tabButtons.forEach(btn => btn.classList.remove('active'));
//             tabPanes.forEach(pane => pane.classList.remove('active'));
//             button.classList.add('active');
//             const targetTab = button.dataset.tab;
//             document.getElementById(targetTab).classList.add('active');
//         });
//     });

//     // Gestion des paramètres
//     settingsBtn.addEventListener('click', (e) => {
//         e.stopPropagation();
//         settingsPanel.classList.toggle('active');
//     });

//     // Fermer les paramètres en cliquant ailleurs
//     document.addEventListener('click', (e) => {
//         if (!settingsPanel.contains(e.target) && 
//             !settingsBtn.contains(e.target)) {
//             settingsPanel.classList.remove('active');
//         }
//     });

//     // Fonctions du Timer
//     function startTimer() {
//         if (isPaused) {
//             isPaused = false;
//             timer = setInterval(updateTimer, 1000);
//         }
//     }

//     function pauseTimer() {
//         isPaused = true;
//         clearInterval(timer);
//     }

//     function resetTimer() {
//         timeLeft = settings.timerDuration;
//         updateTimerDisplay();
//         pauseTimer();
//     }

//     function updateTimer() {
//         if (timeLeft > 0) {
//             timeLeft--;
//             updateTimerDisplay();
            
//             // Jouer le son d'alerte quand il reste 5 secondes ou moins
//             if (timeLeft <= 5 && timeLeft > 0) {
//                 playSound('timerAlertSound');
//                 timeLeftDisplay.classList.add('time-alert');
//             }
//         } else {
//             pauseTimer();
//             timeLeftDisplay.classList.remove('time-alert');
//             alert('Temps écoulé !');
//         }
//     }

//     function updateTimerDisplay() {
//         timeLeftDisplay.textContent = String(timeLeft).padStart(2, '0');
//     }

//     function addTimeExtension() {
//         if (settings.timeExtension) {
//             timeLeft += parseInt(settings.timeExtension);
//             updateTimerDisplay();
//             playSound('pointSound');
//         }
//     }

//     // Fonction pour jouer les sons
//     function playSound(soundId) {
//         if (settings.soundEnabled) {
//             const sound = document.getElementById(soundId);
//             if (sound) {
//                 sound.currentTime = 0;
//                 sound.play().catch(e => console.log('Erreur de lecture du son:', e));
//             }
//         }
//     }

//     // Création d'un nouveau joueur
//     function createPlayer() {
//         playerCount++;
//         const playerDiv = document.createElement('div');
//         playerDiv.className = 'player';
//         playerDiv.innerHTML = `
//             <button class="delete-player">×</button>
//             <input type="text" class="player-name" placeholder="Nom">
            
//             <button class="score-button minus-score">-</button>
//             <div class="score-display">0</div>
//             <button class="score-button plus-score">+</button>
            
//             <div class="farm-label">Fermes</div>
//             <button class="farm-button minus">-</button>
//             <div class="farm-count">
//                 <input type="number" value="0" readonly>
//             </div>
//             <button class="farm-button plus">+</button>
//         `;

//         playersContainer.appendChild(playerDiv);
//         setupPlayerControls(playerDiv);
//     }

//     function setupPlayerControls(playerDiv) {
//         const scoreDisplay = playerDiv.querySelector('.score-display');
//         const farmInput = playerDiv.querySelector('.farm-count input');
//         let score = 0;
//         let farms = 0;

//         playerDiv.querySelector('.plus-score').addEventListener('click', () => {
//             score++;
//             scoreDisplay.textContent = score;
//             playSound('pointSound');
//         });

//         playerDiv.querySelector('.minus-score').addEventListener('click', () => {
//             score = Math.max(0, score - 1);
//             scoreDisplay.textContent = score;
//             playSound('pointSound');
//         });

//         playerDiv.querySelector('.farm-button.plus').addEventListener('click', () => {
//             farms++;
//             farmInput.value = farms;
//             playSound('farmSound');
//         });

//         playerDiv.querySelector('.farm-button.minus').addEventListener('click', () => {
//             farms = Math.max(0, farms - 1);
//             farmInput.value = farms;
//             playSound('farmSound');
//         });

//         playerDiv.querySelector('.delete-player').addEventListener('click', () => {
//             playerDiv.remove();
//         });
//         if (score >= settings.winPoints) {
//             scoreDisplay.classList.add('winner'); // Ajoutez une classe spéciale pour les gagnants
//             alert(`${playerDiv.querySelector('.player-name').value || 'Joueur'} a gagné !`);
//         }
        
//     }

//     // Event Listeners
//     addPlayerBtn.addEventListener('click', createPlayer);
//     document.getElementById('startTimer').addEventListener('click', startTimer);
//     document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
//     document.getElementById('resetTimer').addEventListener('click', resetTimer);
//     document.getElementById('addTime').addEventListener('click', addTimeExtension);

//     // Initialisation
//     resetTimer();

//     // Dans la fonction saveSettings
//     function saveSettings() {
//         settings = {
//             winPoints: parseInt(document.getElementById('winPoints').value) || 100,
//             primaryColor: document.getElementById('primaryColor').value || '#ff7700',
//             secondaryColor: document.getElementById('secondaryColor').value || '#ff9944',
//             soundEnabled: document.getElementById('soundEnabled')?.checked ?? true,
//             timerAlertEnabled: document.getElementById('timerAlertEnabled')?.checked ?? true,
//             timerDuration: parseInt(document.getElementById('timerDuration').value) || 45,
//             timeExtension: parseInt(document.getElementById('timeExtension').value) || 15
//         };
        
//         localStorage.setItem('gameSettings', JSON.stringify(settings));
//         timeLeft = settings.timerDuration;
//         updateTimerDisplay();
//         updateStyles();
//     }

//     // Ajouter un event listener pour le bouton de sauvegarde
//     document.getElementById('saveSettings').addEventListener('click', () => {
//         saveSettings();
//         settingsPanel.classList.remove('active');
//     });

//     // Pour être cohérent, on peut aussi ajouter une constante pour cette valeur
//     const ALERT_THRESHOLD = 5; // Seuil d'alerte en secondes
// });
// function loadSettings() {
//     const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
//     if (savedSettings) {
//         settings = { ...settings, ...savedSettings }; // Fusionne les paramètres par défaut avec ceux sauvegardés
//     }

//     // Appliquer les valeurs chargées aux éléments DOM
//     document.getElementById('winPoints').value = settings.winPoints;
//     document.getElementById('primaryColor').value = settings.primaryColor;
//     document.getElementById('secondaryColor').value = settings.secondaryColor;
//     document.getElementById('soundEnabled').checked = settings.soundEnabled;
//     document.getElementById('timerAlertEnabled').checked = settings.timerAlertEnabled;
//     document.getElementById('timerDuration').value = settings.timerDuration;
//     document.getElementById('timeExtension').value = settings.timeExtension;

//     timeLeft = settings.timerDuration;
//     updateTimerDisplay();
//     updateStyles();
// }

// // Appelez `loadSettings()` au démarrage
// loadSettings();
// function updateStyles() {
//     document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
//     document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
// }
// function playSound(soundId) {
//     if (settings.soundEnabled) {
//         const sound = document.getElementById(soundId);
//         if (sound && sound.paused) { // Joue le son uniquement s'il n'est pas déjà en cours
//             sound.currentTime = 0;
//             sound.play().catch(e => console.log('Erreur de lecture du son:', e));
//         }
//     }
// }



// document.addEventListener('DOMContentLoaded', () => {
//     // Éléments DOM
//     const playersContainer = document.getElementById('players');
//     const addPlayerBtn = document.getElementById('addPlayerBtn');
//     const settingsBtn = document.querySelector('.settings-button');
//     const settingsPanel = document.querySelector('.settings-panel');
//     const timerDisplay = document.getElementById('timerDisplay');
//     const timeLeftDisplay = document.getElementById('timeLeft');

//     // Gestion des onglets
//     const tabButtons = document.querySelectorAll('.tab-button');
//     const tabPanes = document.querySelectorAll('.tab-pane');

//     // Variables globales
//     let playerCount = 0;
//     let timer;
//     let timeLeft = 900; // 15 minutes en secondes
//     let isPaused = true;

//     // Configuration par défaut
//     let settings = {
//         winPoints: 7,
//         primaryColor: '#ff7700',
//         secondaryColor: '#ff9944',
//         soundEnabled: true,
//         timerAlertEnabled: true,
//         timerDuration: 45,
//         timeExtension: 15,
//         winnerAnimationEnabled: true // Nouveau paramètre pour activer/désactiver
//     };

//     // Gestion des onglets
//     tabButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             tabButtons.forEach(btn => btn.classList.remove('active'));
//             tabPanes.forEach(pane => pane.classList.remove('active'));
//             button.classList.add('active');
//             const targetTab = button.dataset.tab;
//             document.getElementById(targetTab).classList.add('active');
//         });
//     });

//     // Gestion des paramètres
//     settingsBtn.addEventListener('click', (e) => {
//         e.stopPropagation();
//         settingsPanel.classList.toggle('active');
//     });

//     // Fermer les paramètres en cliquant ailleurs
//     document.addEventListener('click', (e) => {
//         if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
//             settingsPanel.classList.remove('active');
//         }
//     });

//     // Fonctions du Timer
//     function startTimer() {
//         if (isPaused) {
//             isPaused = false;
//             timer = setInterval(updateTimer, 1000);
//         }
//     }

//     function pauseTimer() {
//         isPaused = true;
//         clearInterval(timer);
//     }

//     function resetTimer() {
//         timeLeft = settings.timerDuration;
//         updateTimerDisplay();
//         pauseTimer();
//     }

//     function updateTimer() {
//         if (timeLeft > 0) {
//             timeLeft--;
//             updateTimerDisplay();

//             // Jouer le son d'alerte quand il reste 5 secondes ou moins
//             if (timeLeft <= 5 && timeLeft > 0) {
//                 playSound('timerAlertSound');
//                 timeLeftDisplay.classList.add('time-alert');
//             }
//         } else {
//             pauseTimer();
//             timeLeftDisplay.classList.remove('time-alert');
//             alert('Temps écoulé !');
//         }
//     }

//     function updateTimerDisplay() {
//         timeLeftDisplay.textContent = String(timeLeft).padStart(2, '0');
//     }

//     function addTimeExtension() {
//         if (settings.timeExtension) {
//             timeLeft += parseInt(settings.timeExtension);
//             updateTimerDisplay();
//             playSound('pointSound');
//         }
//     }

//     // Fonction pour jouer les sons
//     function playSound(soundId) {
//         if (settings.soundEnabled) {
//             const sound = document.getElementById(soundId);
//             if (sound && sound.paused) {
//                 sound.currentTime = 0;
//                 sound.play().catch(e => console.log('Erreur de lecture du son:', e));
//             }
//         }
//     }

//     // Création d'un nouveau joueur
//     function createPlayer() {
//         playerCount++;
//         const playerDiv = document.createElement('div');
//         playerDiv.className = 'player';
//         playerDiv.innerHTML = `
//             <button class="delete-player">×</button>
//             <input type="text" class="player-name" placeholder="Nom">
            
//             <button class="score-button minus-score">-</button>
//             <div class="score-display">0</div>
//             <button class="score-button plus-score">+</button>
            
//             <div class="farm-label">Fermes</div>
//             <button class="farm-button minus">-</button>
//             <div class="farm-count">
//                 <input type="number" value="0" readonly>
//             </div>
//             <button class="farm-button plus">+</button>
//         `;

//         playersContainer.appendChild(playerDiv);
//         setupPlayerControls(playerDiv);
//     }

//     function setupPlayerControls(playerDiv) {
//         const scoreDisplay = playerDiv.querySelector('.score-display');
//         const farmInput = playerDiv.querySelector('.farm-count input');
//         let score = 0;
//         let farms = 0;
    
//         function checkWinner() {
//             if (score >= settings.winPoints) {
//                 scoreDisplay.classList.add('winner'); // Ajouter l'animation
//                 alert(`${playerDiv.querySelector('.player-name').value || 'Joueur'} a atteint ${settings.winPoints} points et a gagné !`);
//             } else {
//                 scoreDisplay.classList.remove('winner'); // Retirer l'animation si score diminue
//             }
//         }
    
//         playerDiv.querySelector('.plus-score').addEventListener('click', () => {
//             score++;
//             scoreDisplay.textContent = score;
//             playSound('pointSound');
//             checkWinner();
//         });
    
//         playerDiv.querySelector('.minus-score').addEventListener('click', () => {
//             score = Math.max(0, score - 1);
//             scoreDisplay.textContent = score;
           
//             checkWinner();
//         });
    
//         playerDiv.querySelector('.farm-button.plus').addEventListener('click', () => {
//             farms++;
//             farmInput.value = farms;
//             playSound('farmSound');
//         });
    
//         playerDiv.querySelector('.farm-button.minus').addEventListener('click', () => {
//             farms = Math.max(0, farms - 1);
//             farmInput.value = farms;
           
//         });

       
//         playerDiv.querySelector('.delete-player').addEventListener('click', (event) => {
//             event.preventDefault(); // Empêche tout comportement par défaut
//             const playerName = playerDiv.querySelector('.player-name').value || 'Ce joueur';
//             const confirmation = confirm(`Voulez-vous vraiment supprimer ${playerName} ?`);
        
//             if (confirmation === true) { // Suppression uniquement si confirmation est positive
//                 playerDiv.remove();
//             }
            
//         });
        
        
//     }
//     // Fonction pour afficher l'animation
// function showWinnerAnimation() {
//     const overlay = document.getElementById('winnerOverlay');
//     overlay.classList.remove('hidden');

//     setTimeout(() => {
//         overlay.classList.add('hidden');
//     }, 3000); // Masque l'overlay après 3 secondes
// }

//     // Sauvegarde des paramètres
//     function saveSettings() {
//         settings = {
//             winPoints: parseInt(document.getElementById('winPoints').value) || 100,
//             primaryColor: document.getElementById('primaryColor').value || '#ff7700',
//             secondaryColor: document.getElementById('secondaryColor').value || '#ff9944',
//             soundEnabled: document.getElementById('soundEnabled')?.checked ?? true,
//             timerAlertEnabled: document.getElementById('timerAlertEnabled')?.checked ?? true,
//             timerDuration: parseInt(document.getElementById('timerDuration').value) || 45,
//             timeExtension: parseInt(document.getElementById('timeExtension').value) || 15
//         };

//         localStorage.setItem('gameSettings', JSON.stringify(settings));
//         timeLeft = settings.timerDuration;
//         updateTimerDisplay();
//         updateStyles();
//     }

//     // Chargement des paramètres
//     function loadSettings() {
//         const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
//         if (savedSettings) {
//             settings = { ...settings, ...savedSettings };
//         }
//         document.getElementById('winPoints').value = settings.winPoints;
//         document.getElementById('primaryColor').value = settings.primaryColor;
//         document.getElementById('secondaryColor').value = settings.secondaryColor;
//         document.getElementById('soundEnabled').checked = settings.soundEnabled;
//         document.getElementById('timerAlertEnabled').checked = settings.timerAlertEnabled;
//         document.getElementById('timerDuration').value = settings.timerDuration;
//         document.getElementById('timeExtension').value = settings.timeExtension;

//         timeLeft = settings.timerDuration;
//         updateTimerDisplay();
//         updateStyles();
//     }

//     function updateStyles() {
//         document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
//         document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
//     }

//     // Initialisation
//     addPlayerBtn.addEventListener('click', createPlayer);
//     document.getElementById('startTimer').addEventListener('click', startTimer);
//     document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
//     document.getElementById('resetTimer').addEventListener('click', resetTimer);
//     document.getElementById('addTime').addEventListener('click', addTimeExtension);
//     document.getElementById('saveSettings').addEventListener('click', saveSettings);

//     loadSettings();
//     resetTimer();
// });


document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const playersContainer = document.getElementById('players');
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const settingsBtn = document.querySelector('.settings-button');
    const settingsPanel = document.querySelector('.settings-panel');
    const timerDisplay = document.getElementById('timerDisplay');
    const timeLeftDisplay = document.getElementById('timeLeft');
    const winnerOverlay = document.getElementById('winnerOverlay');

    // Gestion des onglets
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Variables globales
    let playerCount = 0;
    let timer;
    let timeLeft = 900; // 15 minutes en secondes
    let isPaused = true;

    // Configuration par défaut
    let settings = {
        winPoints: 7,
        primaryColor: '#ff7700',
        secondaryColor: '#ff9944',
        soundEnabled: true,
        timerAlertEnabled: true,
        timerDuration: 45,
        timeExtension: 15,
        winnerAnimationEnabled: true // Animation désactivable
    };

    // Gestion des onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            button.classList.add('active');
            const targetTab = button.dataset.tab;
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Paramètres
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsPanel.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });

    // Timer
    function startTimer() {
        if (isPaused) {
            isPaused = false;
            timer = setInterval(updateTimer, 1000);
        }
    }

    function pauseTimer() {
        isPaused = true;
        clearInterval(timer);
    }

    function resetTimer() {
        timeLeft = settings.timerDuration;
        updateTimerDisplay();
        pauseTimer();
    }

    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 5 && timeLeft > 0) {
                playSound('timerAlertSound');
                timeLeftDisplay.classList.add('time-alert');
            }
        } else {
            pauseTimer();
            timeLeftDisplay.classList.remove('time-alert');
            alert('Temps écoulé !');
        }
    }

    function updateTimerDisplay() {
        timeLeftDisplay.textContent = String(timeLeft).padStart(2, '0');
    }

    function addTimeExtension() {
        timeLeft += settings.timeExtension;
        updateTimerDisplay();
        playSound('pointSound');
    }

    // Sons
    function playSound(soundId) {
        if (settings.soundEnabled) {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(e => console.log('Erreur de lecture du son:', e));
            }
        }
    }

    // Animation gagnant
    function showWinnerAnimation() {
        if (settings.winnerAnimationEnabled) {
            const overlay = document.getElementById('winnerOverlay');
            overlay.innerHTML = ''; // Nettoyer les anciennes particules
    
            // Créer et ajouter 30 particules
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = `${Math.random() * 100}vw`; // Position aléatoire en X
                particle.style.setProperty('--random-x', Math.random() - 0.5); // Décalage aléatoire
                particle.style.animationDuration = `${1 + Math.random() * 2}s`; // Durée aléatoire
                overlay.appendChild(particle);
            }
    
            overlay.classList.remove('hidden'); // Affiche l'overlay
    
            // Masquer après 3 secondes
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 3000);
        }
    }
    
    

    // Création des joueurs
    function createPlayer() {
        playerCount++;
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.innerHTML = `
            <button class="delete-player">×</button>
            <input type="text" class="player-name" placeholder="Nom">
            <button class="score-button minus-score">-</button>
            <div class="score-display">0</div>
            <button class="score-button plus-score">+</button>
            <div class="farm-label">Fermes</div>
            <button class="farm-button minus">-</button>
            <div class="farm-count">
                <input type="number" value="0" readonly>
            </div>
            <button class="farm-button plus">+</button>
        `;
        playersContainer.appendChild(playerDiv);
        setupPlayerControls(playerDiv);
    }

    // Gestion des contrôles des joueurs
    function setupPlayerControls(playerDiv) {
        const scoreDisplay = playerDiv.querySelector('.score-display');
        const farmInput = playerDiv.querySelector('.farm-count input');
        let score = 0;
        let farms = 0;

        function checkWinner() {
            if (score >= settings.winPoints) {
                scoreDisplay.classList.add('winner');
                showWinnerAnimation();
               
            }
        }

        playerDiv.querySelector('.plus-score').addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            playSound('pointSound');
            checkWinner();
        });

        playerDiv.querySelector('.minus-score').addEventListener('click', () => {
            score = Math.max(0, score - 1);
            scoreDisplay.textContent = score;
        });

        playerDiv.querySelector('.farm-button.plus').addEventListener('click', () => {
            farms++;
            farmInput.value = farms;
            playSound('farmSound');
        });

        playerDiv.querySelector('.farm-button.minus').addEventListener('click', () => {
            farms = Math.max(0, farms - 1);
            farmInput.value = farms;
            
        });

        playerDiv.querySelector('.delete-player').addEventListener('click', () => {
            const playerName = playerDiv.querySelector('.player-name').value || 'Ce joueur';
            if (confirm(`Voulez-vous vraiment supprimer ${playerName} ?`)) {
                playerDiv.remove();
            }
        });
    }

    // Sauvegarde et chargement des paramètres
    function saveSettings() {
        settings = {
            winPoints: parseInt(document.getElementById('winPoints').value) || 100,
            primaryColor: document.getElementById('primaryColor').value || '#ff7700',
            secondaryColor: document.getElementById('secondaryColor').value || '#ff9944',
            soundEnabled: document.getElementById('soundEnabled').checked,
            timerAlertEnabled: document.getElementById('timerAlertEnabled').checked,
            timerDuration: parseInt(document.getElementById('timerDuration').value) || 45,
            timeExtension: parseInt(document.getElementById('timeExtension').value) || 15,
            winnerAnimationEnabled: document.getElementById('winnerAnimationEnabled').checked
        };

        localStorage.setItem('gameSettings', JSON.stringify(settings));
        updateStyles();
    }

    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        if (savedSettings) settings = { ...settings, ...savedSettings };

        document.getElementById('winPoints').value = settings.winPoints;
        document.getElementById('primaryColor').value = settings.primaryColor;
        document.getElementById('secondaryColor').value = settings.secondaryColor;
        document.getElementById('soundEnabled').checked = settings.soundEnabled;
        document.getElementById('winnerAnimationEnabled').checked = settings.winnerAnimationEnabled;

        updateStyles();
    }

    function updateStyles() {
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    }

    // Initialisation
    addPlayerBtn.addEventListener('click', createPlayer);
    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);
    document.getElementById('addTime').addEventListener('click', addTimeExtension);
    document.getElementById('saveSettings').addEventListener('click', saveSettings);

    loadSettings();
    resetTimer();
});


