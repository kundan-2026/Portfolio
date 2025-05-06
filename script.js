document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navbar = document.querySelector(".navbar");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const navLinks = document.querySelectorAll(".navbar a");
  const logo = document.querySelector(".logo");

  // Initialize mobile menu state
  let isMobileMenuOpen = false;

  // Toggle mobile menu function
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    mobileMenuBtn.classList.toggle("active");
    navbar.classList.toggle("active");
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

    // Toggle a class on the body when menu is open
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }

  // Mobile menu button click handler
  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (isMobileMenuOpen) {
        toggleMobileMenu();
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      isMobileMenuOpen &&
      !navbar.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      toggleMobileMenu();
    }
  });

  // Dark Mode Toggle
  const body = document.body;

  // Check for saved user preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Using icon instead of emoji
  } else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Using icon instead of emoji
  }

  // Update dark mode toggle to use icons
  darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("darkMode", "enabled");
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("darkMode", "disabled");
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  // Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server
      // For this example, we'll just log it and show an alert
      console.log({ name, email, subject, message });

      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  // Active link highlighting
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Animation on Scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".home-content, .about-content, .skill-category, .project-card, .contact-info, .contact-form"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for animation
  window.addEventListener("load", function () {
    document
      .querySelectorAll(
        ".home-content, .about-content, .skill-category, .project-card, .contact-info, .contact-form"
      )
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      });

    animateOnScroll();
  });

  window.addEventListener("scroll", animateOnScroll);

  // Toggle between About and Education views (single implementation)
  const moreAboutBtn = document.getElementById("more-about-btn");
  const backToAboutBtn = document.getElementById("back-to-about");
  const mainAboutContent = document.getElementById("main-about-content");
  const educationContent = document.getElementById("education-content");

  if (moreAboutBtn && backToAboutBtn) {
    moreAboutBtn.addEventListener("click", function () {
      mainAboutContent.style.display = "none";
      educationContent.classList.add("active");
    });

    backToAboutBtn.addEventListener("click", function () {
      mainAboutContent.style.display = "flex";
      educationContent.classList.remove("active");
    });
  }
  // Pause marquee on hover
  const marquee = document.querySelector(".social-marquee-content");
  if (marquee) {
    marquee.addEventListener("mouseenter", function () {
      marquee.style.animationPlayState = "paused";
    });
    marquee.addEventListener("mouseleave", function () {
      marquee.style.animationPlayState = "running";
    });
  }
});
