// scripts.js

// Function to load components
async function loadComponents() {
  try {
    // Load header
    const headerResponse = await fetch('components/header.html');
    if (!headerResponse.ok) throw new Error('Header not found');
    const headerData = await headerResponse.text();
    document.getElementById('header').innerHTML = headerData;

    // Load footer
    const footerResponse = await fetch('components/footer.html');
    if (!footerResponse.ok) throw new Error('Footer not found');
    const footerData = await footerResponse.text();
    document.getElementById('footer').innerHTML = footerData;

    // Initialize scripts after components are loaded
    initializeHeaderScripts();
    initializeFooterScripts();
    initializeTestimonials();
    initializeAccordions();
    initializeForms();
    
  } catch (error) {
    console.error('Error loading components:', error);
  }
}

// Mobile Menu Toggle
function initializeHeaderScripts() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });
}

// Back to Top Button
function initializeFooterScripts() {
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove("opacity-0", "invisible");
        backToTopButton.classList.add("opacity-100", "visible");
      } else {
        backToTopButton.classList.remove("opacity-100", "visible");
        backToTopButton.classList.add("opacity-0", "invisible");
      }
    });

    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

// Testimonial Animation
function initializeTestimonials() {
  const testimonialCards = document.querySelectorAll(".testimonial-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("active");
          }, index * 200);
        }
      });
    },
    { threshold: 0.1 }
  );

  testimonialCards.forEach((card) => {
    observer.observe(card);
  });
}

// Accordion Functionality
function initializeAccordions() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const button = accordion.querySelector(".accordion-button");

    button.addEventListener("click", () => {
      accordion.classList.toggle("active");
    });
  });
}

// Form Submission
function initializeForms() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value;

      alert(
        `Thank you, ${name}! Your message has been received. We'll contact you soon at ${email} or ${phone} regarding your ${service} needs.`
      );

      contactForm.reset();
    });
  }
}

// Load components when DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadComponents);