document.addEventListener("DOMContentLoaded", () => {
  // Initialisation des sélecteurs principaux
  const carousel = document.querySelector(".services-carousel");
  const prevButton = document.querySelector(".carousel-nav.prev");
  const nextButton = document.querySelector(".carousel-nav.next");
  const indicatorsContainer = document.querySelector(".carousel-indicators");
  const cards = document.querySelectorAll(".project-card");
  const carouselContainer = document.querySelector(".carousel-container");
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  if (!carousel || !prevButton || !nextButton || !indicatorsContainer || cards.length === 0) {
    console.error("Certains éléments nécessaires au carrousel sont manquants.");
    return;
  }

  let currentIndex = 0;

  // Fonction : Création des indicateurs
  const createIndicators = () => {
    indicatorsContainer.innerHTML = ""; // Nettoyer les indicateurs existants
    cards.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.toggle("active", index === currentIndex);
      indicator.addEventListener("click", () => scrollToCard(index));
      indicatorsContainer.appendChild(indicator);
    });
  };

  // Fonction : Mise à jour des indicateurs
  const updateIndicators = () => {
    const indicators = indicatorsContainer.querySelectorAll("div");
    indicators.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  };

  // Fonction : Scroll vers une carte
  const scrollToCard = (index) => {
    currentIndex = (index + cards.length) % cards.length; // Boucle infinie
    carousel.scrollTo({
      left: cards[currentIndex].offsetLeft,
      behavior: "smooth",
    });
    updateIndicators();
  };

  // Gestion des boutons de navigation
  prevButton.addEventListener("click", () => scrollToCard(currentIndex - 1));
  nextButton.addEventListener("click", () => scrollToCard(currentIndex + 1));

  // Création des indicateurs initiaux
  createIndicators();

  // Fonction : Mettre à jour l'affichage du carrousel selon la taille de l'écran
  const updateCarouselDisplay = () => {
    if (mediaQuery.matches) {
      carouselContainer?.classList.add("vertical");
      carousel.style.overflow = "visible";
    } else {
      carouselContainer?.classList.remove("vertical");
      carousel.style.overflow = "auto";
    }
  };

  mediaQuery.addEventListener("change", updateCarouselDisplay);
  updateCarouselDisplay();

  // Animation avec IntersectionObserver
  const animatedElements = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((el) => observer.observe(el));

  // Ajustement des marges des cartes avec ResizeObserver
  const adjustCardMargins = () => {
    const carouselWidth = carousel.offsetWidth;
    cards.forEach((card) => {
      const cardWidth = card.offsetWidth;
      const leftOffset = (carouselWidth - cardWidth) / 2;
      card.style.marginLeft = `${leftOffset}px`;
    });
  };

  const resizeObserver = new ResizeObserver(adjustCardMargins);
  resizeObserver.observe(carousel);

  // Nettoyage à la suppression
  window.addEventListener("beforeunload", () => {
    resizeObserver.disconnect();
    observer.disconnect();
  });
});
