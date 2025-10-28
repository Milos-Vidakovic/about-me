// ==============================================
// NAVIGATION FUNCTIONS
// ==============================================

function initNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    console.log("Navigation elements found");

    // Toggle Event for Mobile Menu
    navToggle.addEventListener("click", function () {
      console.log("Nav Toggle clicked");
      navMenu.classList.toggle("active");
      this.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      const isNavToggle = e.target.closest("#navToggle");
      const isNavMenu = e.target.closest("#navMenu");

      if (!isNavToggle && !isNavMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  } else {
    console.error("Navigation elements not found!");
  }
}

// ==============================================
// DARK MODE FUNCTIONS
// ==============================================

function initDarkMode() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");

  if (!themeToggle || !themeIcon) {
    console.error("Theme Toggle elements not found!");
    return;
  }

  // Load saved theme setting from localStorage
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  setTheme(initialTheme);

  // Theme Toggle Event Listener
  themeToggle.addEventListener("click", function () {
    console.log("Theme Toggle clicked");

    // Add animation
    this.classList.add("rotating");
    setTimeout(() => {
      this.classList.remove("rotating");
    }, 300);

    // Switch theme
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // React to system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
}

// Set theme function
function setTheme(theme) {
  const themeIcon = document.querySelector(".theme-icon");

  document.documentElement.setAttribute("data-theme", theme);

  if (theme === "dark") {
    themeIcon.textContent = "☀️";
    console.log("Dark Mode activated");
  } else {
    themeIcon.textContent = "🌙";
    console.log("Light Mode activated");
  }
}

// ==============================================
// GALLERY & UI FUNCTIONS
// ==============================================

// Gallery Interactivity (if on About Me page)
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (galleryItems.length > 0) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Small click effect for better UX
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
      });
    });
  }
}

// Scroll effect for header
function initScrollEffect() {
  const header = document.querySelector("header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
}

// ==============================================
// CONTACT FORM FUNCTIONS
// ==============================================

function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) {
    return; // No contact form on this page
  }

  console.log("✅ Contact Form found - initializing...");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevents normal form submission

    console.log("📧 Contact form is being processed...");

    // Collect form data
    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    // Validation
    if (!name || !email || !message) {
      showFormMessage("Please fill in all fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    // Set button to loading state
    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.classList.add("loading");
    submitBtn.innerHTML =
      '<span class="btn-icon">⏳</span><span class="btn-text">Sending</span>';
    submitBtn.disabled = true;

    // Create and open mailto: link
    setTimeout(() => {
      const subject = encodeURIComponent(`Message from ${name} via Portfolio`);
      const body = encodeURIComponent(`Hello Milos,

${message}

Best regards,
${name}

---
Email: ${email}
Sent via your portfolio contact form`);

      const mailtoLink = `mailto:milos.vidakovic@students.bfh.ch?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      showFormMessage("Email client is opening! 📧", "success");

      // Reset form
      contactForm.reset();

      // Reset button
      submitBtn.classList.remove("loading");
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      console.log("✅ Email successfully prepared!");
    }, 1000); // Short delay for UX
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show messages
function showFormMessage(message, type = "info") {
  // Remove existing messages
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.innerHTML = `
    <div class="message-content">
      <span class="message-icon">${
        type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"
      }</span>
      <span class="message-text">${message}</span>
    </div>
  `;

  // CSS for the message
  messageDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${
      type === "success" ? "#d4edda" : type === "error" ? "#f8d7da" : "#d1ecf1"
    };
    color: ${
      type === "success" ? "#155724" : type === "error" ? "#721c24" : "#0c5460"
    };
    border: 1px solid ${
      type === "success" ? "#c3e6cb" : type === "error" ? "#f5c6cb" : "#bee5eb"
    };
    border-radius: 8px;
    padding: 16px 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    max-width: 300px;
    font-weight: 500;
  `;

  // Add message to DOM
  document.body.appendChild(messageDiv);

  // Fade in animation
  setTimeout(() => {
    messageDiv.style.opacity = "1";
    messageDiv.style.transform = "translateX(0)";
  }, 100);

  // Fade out after 4 seconds
  setTimeout(() => {
    messageDiv.style.opacity = "0";
    messageDiv.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv);
      }
    }, 300);
  }, 4000);
}

// CSS for message-content
const messageStyles = document.createElement("style");
messageStyles.textContent = `
  .message-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .message-icon {
    font-size: 18px;
  }
  
  .message-text {
    font-size: 14px;
    line-height: 1.4;
  }
  
  /* Dark Mode Support */
  [data-theme="dark"] .form-message {
    background: var(--bg-card) !important;
    color: var(--text-color) !important;
    border-color: var(--border-color) !important;
  }
`;
document.head.appendChild(messageStyles);

// ==============================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ==============================================

// Smooth Scroll for all internal anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ==============================================
// INITIALIZATION - MAIN FUNCTION
// ==============================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 JavaScript is running!");
  console.log("🔧 Initializing all components...");

  // Initialize all base functions
  initNavigation();
  initDarkMode();
  initGallery();
  initScrollEffect();
  initContactForm();

  console.log("✅ All components successfully initialized!");
});
