document.addEventListener("DOMContentLoaded", () => {
  /* ===== Custom Cursor ===== */
  const cursor = document.querySelector(".custom-cursor");
  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${
      e.clientY - 10
    }px)`;
  });

  /* ===== Dark/Light Theme Toggle ===== */
  const themeToggleBtn = document.getElementById("theme-toggle");
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
  // Apply stored theme on load
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  /* ===== Scroll-Based Animations via IntersectionObserver ===== */
  const scrollElements = document.querySelectorAll(
    ".section, .card, .team-member, .auth-form"
  );

  const elementInView = (el, dividend = 1.25) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("in-view");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("in-view");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
    updateActiveNav();
  });
  // Initial check
  handleScrollAnimation();

  /* ===== Update Active Navigation Links ===== */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let currentSection = "home";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        currentSection = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active");
      }
    });
  }

  /* ===== Order Form Validation ===== */
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const address = document.getElementById("address").value.trim();
      if (!name || !email || !address) {
        alert("Please fill out all fields.");
        return;
      }
      alert("Order placed successfully!");
      orderForm.reset();
    });
  }

  /* ===== Login/Register Form Demo (using localStorage) ===== */
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const regUsername = document.getElementById("reg-username").value.trim();
      const regEmail = document.getElementById("reg-email").value.trim();
      const regPassword = document.getElementById("reg-password").value.trim();
      if (!regUsername || !regEmail || !regPassword) {
        alert("Please fill out all fields for registration.");
        return;
      }
      // Demo: Save user details (not secure)
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
        })
      );
      alert("Registration successful!");
      registerForm.reset();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      if (!username || !password) {
        alert("Please enter username and password.");
        return;
      }
      let user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.username === username && user.password === password) {
        alert("Login successful!");
        loginForm.reset();
      } else {
        alert("Invalid credentials.");
      }
    });
  }

  /* ===== Initialize VanillaTilt for 3D Tilt Effects ===== */
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
  });
});
