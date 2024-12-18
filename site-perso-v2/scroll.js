function scrollToBottom() {
  // Masque le bouton après clic
  const scrollButton = document.getElementById('scroll-button');
  scrollButton.classList.add('hidden');

  // Défilement fluide rapide vers le bas
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  // Effet de particules
  const particleContainer = document.getElementById('particle-container');
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.bottom = '20px';
    particle.style.setProperty('--random-x', Math.random());

    particleContainer.appendChild(particle);

    // Supprime les particules après l'animation
    particle.addEventListener('animationend', () => {
      particleContainer.removeChild(particle);
    });
  }
}

let hasPassedStop = false; // Variable pour suivre si l'utilisateur a dépassé "stop"

// Vérifie la position de défilement pour afficher ou masquer le bouton
function checkScrollButtonVisibility() {
  const scrollButton = document.getElementById('scroll-button');
  const stopDiv = document.getElementById('stop');

  if (!stopDiv) return; // Si l'élément "stop" n'existe pas, arrête la fonction

  const stopPosition = stopDiv.getBoundingClientRect();

  // Si l'utilisateur a dépassé "stop", le bouton doit disparaître définitivement
  if (stopPosition.top <= 0 && !hasPassedStop) {
    hasPassedStop = true; // Marque que "stop" a été dépassé
    scrollButton.classList.add('hidden'); // Masque le bouton
  }

  // Si l'utilisateur n'a pas encore dépassé "stop", affiche le bouton
  if (!hasPassedStop) {
    scrollButton.classList.remove('hidden');
  }
}

// Exécuter au chargement de la page et lors du défilement
document.addEventListener('DOMContentLoaded', checkScrollButtonVisibility);
window.addEventListener('scroll', checkScrollButtonVisibility);
