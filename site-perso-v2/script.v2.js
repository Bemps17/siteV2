document.addEventListener('DOMContentLoaded', () => {
    // Utilitaires
    const debounce = (func, wait = 100) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Gestion du menu hamburger
    const initMenuToggle = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const navbar = document.getElementById('navbar');

        if (!menuToggle || !navbar) return;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');

            // Accessibilité : mise à jour de l'état aria
            const isExpanded = navbar.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.setAttribute('aria-label', isExpanded ? 'Fermer le menu' : 'Ouvrir le menu');
        });
    };


    // Animations GSAP des cartes projets
    // const initGSAPAnimations = () => {
    //     if (typeof gsap === 'undefined') {
    //         console.warn('GSAP non chargé. Animations désactivées.');
    //         return;
    //     }

    //     const cards = document.querySelectorAll('.project-card');
    //     cards.forEach((card) => {
    //         gsap.fromTo(
    //             card,
    //             { opacity: 0, y: 50 },
    //             {
    //                 opacity: 1,
    //                 y: 0,
    //                 duration: 0.4,
    //                 scrollTrigger: {
    //                     trigger: card,
    //                     start: 'top 98%',
    //                     toggleActions: 'play none none reverse',
    //                 },
    //             }
    //         );
    //     });
    // };

    // Gestion du bouton "Retour en haut"
    const initScrollToTop = () => {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        const scrollThreshold = window.innerHeight;

        if (!scrollToTopBtn) return;

        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('visible', window.scrollY > scrollThreshold);
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };



    // Gestion du pop-up
    function initPopup() {
        const fish = document.getElementById('animatedFish');
        const popup = document.getElementById('pop-up1');
        const overlay = document.createElement('div');

        overlay.id = 'overlay';
        document.body.appendChild(overlay);

        fish.addEventListener('click', () => {
            popup.classList.add('active');
            overlay.classList.add('active');
            popup.setAttribute('aria-hidden', 'false');
            overlay.setAttribute('aria-hidden', 'false');
        });

        overlay.addEventListener('click', () => {
            popup.classList.remove('active');
            overlay.classList.remove('active');
            popup.setAttribute('aria-hidden', 'true');
            overlay.setAttribute('aria-hidden', 'true');
        });
    };
    // Masquer le loading overlay après 2 secondes
    const initLoadingOverlay = () => {
        const loadingOverlay = document.getElementById('loading-overlay');

        if (!loadingOverlay) return;

        setTimeout(() => {
            loadingOverlay.classList.add('loading-hidden');
        }, 2000);
    };



    // Événements scroll optimisés
    window.addEventListener(
        'scroll',
        debounce(() => {
            handleHeaderScroll();
        })
    );

       // Initialisation des fonctionnalités
       initMenuToggle();
       initScrollToTop();
       initPopup();
       initLoadingOverlay(); // Appel à la fonction pour masquer l'overlay
   });
   

// Envoi de formulaire
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch('backend/traitement-contact.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.statut === 'succes') {
                alert('Message envoyé !');
            } else {
                alert('Erreur : ' + data.message);
            }
        });
});

// Gestion du scroll de l'en-tête
let lastScrollTop = 0;
const header = document.querySelector('header');
let isHeaderHidden = false;

const handleHeaderScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Condition pour éviter les micro-mouvements
    if (Math.abs(lastScrollTop - currentScrollTop) < 10) return;

    if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        if (!isHeaderHidden) {
            header.classList.add('header-hidden');
            isHeaderHidden = true;
        }
    } else {
        // Scrolling up
        if (isHeaderHidden) {
            header.classList.remove('header-hidden');
            isHeaderHidden = false;
        }
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
};

// Throttle function to improve performance
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Gestion des cartes projets
const projectCards = document.querySelectorAll('.project-card');
// Vérifie si la media query pour les écrans de petite taille est vraie
if (window.matchMedia("(max-width: 768px)").matches) {
    // Applique du JavaScript uniquement si la media query est activée
    console.log("La largeur de l'écran est inférieure ou égale à 768px.");
} else {
    // Applique du JavaScript pour les écrans plus grands
    console.log("La largeur de l'écran est supérieure à 768px.");
}

projectCards.forEach(card => {
    const img = card.querySelector('img'); // Image dans la carte
    const hiddenText = card.querySelector('.hidden-text'); // Texte caché à afficher

    // Fonction pour gérer l'interaction au survol ou au clic
    const handleInteraction = () => {
        card.classList.toggle('active'); // Ajouter ou retirer la classe active
        hiddenText.style.opacity = card.classList.contains('active') ? '1' : '0'; // Rendre visible ou invisible le texte
    };

    //   // Fonction pour gérer les interactions en fonction de la taille de l'écran
    //   const handleResponsiveInteraction = () => {
    //     if (window.innerWidth > 768) {
    //       // Survol
    //       img.addEventListener('mouseenter', () => {
    //         card.classList.add('active'); // Ajouter la classe active pour montrer le texte caché
    //         hiddenText.style.opacity = '1'; // Rendre visible le texte caché
    //       });

    //       img.addEventListener('mouseleave', () => {
    //         card.classList.remove('active'); // Retirer la classe active
    //         hiddenText.style.opacity = '0'; // Cacher de nouveau le texte
    //       });

    //       img.removeEventListener('click', handleInteraction); // Enlever l'événement clic si on est sur un écran large
    //     } else {
    //       // Clic
    //       img.removeEventListener('mouseenter', handleInteraction); // Enlever les événements de survol
    //       img.removeEventListener('mouseleave', handleInteraction);
    //       img.addEventListener('click', handleInteraction); // Ajouter l'événement clic si l'écran est petit
    //     }
    //   };



    document.addEventListener('DOMContentLoaded', () => {
        const toggleSwitch = document.getElementById('toggle-theme');
        const darkModeStylesheet = document.getElementById('dark-mode');
        const lightModeStylesheet = document.getElementById('light-mode');

        // Vérifie et applique le mode basé sur le toggle au chargement
        const applyTheme = () => {
            if (toggleSwitch.checked) {
                darkModeStylesheet.disabled = true;
                lightModeStylesheet.disabled = false;
            } else {
                darkModeStylesheet.disabled = false;
                lightModeStylesheet.disabled = true;
            }
        };

        // Basculer le thème à chaque clic sur le toggle switch
        toggleSwitch.addEventListener('change', applyTheme);

        // Stocker le choix de l'utilisateur
        toggleSwitch.addEventListener('change', () => {
            localStorage.setItem('theme', toggleSwitch.checked ? 'light' : 'dark');
            applyTheme();
        });

        // Charger le thème initial
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            toggleSwitch.checked = savedTheme === 'light';
        }
        applyTheme();


        // Initialisation de l'état au chargement
        applyTheme();
    });
    document.addEventListener("DOMContentLoaded", function () {
        const heroContainer = document.querySelector(".hero-container");
        if (heroContainer) {
          // Ajoute la classe "start" après 3 secondes
          setTimeout(() => {
            heroContainer.classList.add("start");
          }, 3000); // 3000 millisecondes = 3 secondes
        }
      });
      
      

});

//   // Initialisation au chargement
//   handleResponsiveInteraction();

//   // Redétecter la taille de l'écran au redimensionnement pour ajuster l'événement
//   window.addEventListener('resize', handleResponsiveInteraction);
// 
