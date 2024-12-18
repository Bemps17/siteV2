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
    const initPopup = () => {
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

    // Gestion du scroll de l'en-tête
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    let isHeaderHidden = false;

    const handleHeaderScroll = () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(lastScrollTop - currentScrollTop) < 10) return;

        if (currentScrollTop > lastScrollTop) {
            if (!isHeaderHidden) {
                header.classList.add('header-hidden');
                isHeaderHidden = true;
            }
        } else {
            if (isHeaderHidden) {
                header.classList.remove('header-hidden');
                isHeaderHidden = false;
            }
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    // Throttle function to improve performance
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Initialisation des fonctionnalités principales
    initMenuToggle();
    initScrollToTop();
    initPopup();

    window.addEventListener(
        'scroll',
        debounce(() => {
            handleHeaderScroll();
        })
    );

    // Envoi de formulaire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
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
    }

    // Thème clair/sombre
    const toggleSwitch = document.getElementById('toggle-theme');
    const darkModeStylesheet = document.getElementById('dark-mode');
    const lightModeStylesheet = document.getElementById('light-mode');

    const applyTheme = () => {
        if (toggleSwitch.checked) {
            darkModeStylesheet.disabled = true;
            lightModeStylesheet.disabled = false;
        } else {
            darkModeStylesheet.disabled = false;
            lightModeStylesheet.disabled = true;
        }
    };

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', () => {
            localStorage.setItem('theme', toggleSwitch.checked ? 'light' : 'dark');
            applyTheme();
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            toggleSwitch.checked = savedTheme === 'light';
        }
        applyTheme();
    }

    // Gestion du carrousel
    const carousel = document.querySelector('.services-carousel');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');
    const indicators = document.querySelector('.carousel-indicators');
    const cards = document.querySelectorAll('.project-card');

    let currentIndex = 0;
    const cardCount = cards.length;

    const createIndicators = () => {
        if (!indicators) return;

        indicators.innerHTML = '';
        cards.forEach((_, index) => {
            const indicator = document.createElement('div');
            if (index === currentIndex) indicator.classList.add('active');
            indicators.appendChild(indicator);
        });
    };

    const updateIndicators = () => {
        if (!indicators) return;

        document.querySelectorAll('.carousel-indicators div').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const scrollToCard = (index) => {
        currentIndex = (index + cardCount) % cardCount;
        if (carousel) {
            carousel.scrollTo({
                left: cards[currentIndex].offsetLeft,
                behavior: 'smooth'
            });
        }
        updateIndicators();
    };

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            scrollToCard(currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            scrollToCard(currentIndex + 1);
        });
    }

    if (indicators) {
        document.querySelectorAll('.carousel-indicators div').forEach((dot, index) => {
            dot.addEventListener('click', () => scrollToCard(index));
        });
    }

    createIndicators();

    // Mode responsive pour le carrousel
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const carouselContainer = document.querySelector('.carousel-container');

    const updateCarouselDisplay = () => {
        if (mediaQuery.matches) {
            if (carouselContainer) {
                carouselContainer.classList.add('vertical');
                if (carousel) carousel.style.overflow = 'visible';
            }
        } else {
            if (carouselContainer) {
                carouselContainer.classList.remove('vertical');
                if (carousel) carousel.style.overflow = 'auto';
            }
        }
    };

    mediaQuery.addListener(updateCarouselDisplay);
    updateCarouselDisplay();
});