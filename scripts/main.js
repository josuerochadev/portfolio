// main.js

// Fonction pour vérifier et appliquer le mode sombre
function checkDarkMode() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Fonction pour basculer le mode sombre
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  localStorage.theme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

// Fonction pour créer le bouton de basculement du mode sombre
function setupDarkModeToggle() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      toggleDarkMode();
      checkDarkMode();
    });
  } else {
    console.error("Dark mode toggle button not found");
  }
}

// Fonction pour animer le texte du héros
function animateHero() {
  gsap.to(".hero-title span", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
  });
  gsap.to(".hero-subtitle", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.4,
  });
  gsap.to(".modern-button", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.6,
  });
}

// Fonction pour animer l'image de profil
function animateProfileImage() {
  const image = document.querySelector(".profile-image");
  if (image) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            image.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(image);
  }
}

// Fonction pour animer les cartes de projet
function animateProjectCards() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// Fonction pour gérer le scroll fluide
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href !== "#") {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// Fonction pour animer le texte de la bio
function animateBioText() {
  const bioText = document.querySelector(".bio-text");
  if (bioText) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bioText.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(bioText);
  }
}

function setupProjectCards() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    const content = card.querySelector(".card-content");
    const hoverContent = card.querySelector(".card-hover");
    const expandedContent = card.querySelector(".card-expanded");
    const seeMoreBtn = card.querySelector(".see-more-btn");
    const closeBtn = card.querySelector(".close-btn");

    card.addEventListener("mouseenter", () => {
      content.classList.add("hidden");
      hoverContent.classList.remove("hidden");
    });

    card.addEventListener("mouseleave", () => {
      if (!expandedContent.classList.contains("active")) {
        content.classList.remove("hidden");
        hoverContent.classList.add("hidden");
      }
    });

    seeMoreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      expandCard(card);
    });

    card.addEventListener("click", () => {
      expandCard(card);
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      collapseCard(card);
    });
  });
}

function expandCard(card) {
  card.style.transition = "all 1s cubic-bezier(0.25, 0.1, 0.25, 1)";
  card.classList.add("expanding");
  setTimeout(() => {
    card.classList.add("expanded");
    const expandedContent = card.querySelector(".card-expanded");
    expandedContent.style.display = "block";
    setTimeout(() => {
      expandedContent.style.opacity = "1";
      expandedContent.style.transform = "scale(1)";
    }, 50);
  }, 50);
}

function collapseCard(card) {
  const expandedContent = card.querySelector(".card-expanded");
  const cardContent = card.querySelector(".card-content");

  // Début de l'animation de fermeture
  expandedContent.style.opacity = "0";
  expandedContent.style.transform = "scale(0.98)";

  // Attendre que l'animation de fermeture du contenu étendu commence
  setTimeout(() => {
    // Réduire la taille du card
    card.style.gridColumn = "span 1";
    card.style.height = "";

    // Attendre que la réduction de taille commence
    setTimeout(() => {
      // Afficher le contenu original avec une animation fade-in
      cardContent.style.display = "block";
      cardContent.style.opacity = "0";

      setTimeout(() => {
        cardContent.style.opacity = "1";
      }, 50);

      // Cacher le contenu étendu
      expandedContent.style.display = "none";

      // Retirer la classe 'expanded'
      card.classList.remove("expanded");
    }, 300);
  }, 300);
}

// Fonction d'initialisation
function init() {
  checkDarkMode();
  setupDarkModeToggle();
  animateHero();
  animateProfileImage();
  animateProjectCards();
  setupSmoothScroll();
  animateBioText();
  setupProjectCards();
}

// Exécuter les fonctions au chargement de la page
document.addEventListener("DOMContentLoaded", init);
