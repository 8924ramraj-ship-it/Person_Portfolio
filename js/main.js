
(() => {
  const html = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-primary-nav]");
  const savedTheme = localStorage.getItem("omprakash-theme");
  html.dataset.theme = savedTheme || "dark";

  const updateThemeButton = () => {
    if (!themeButton) return;
    const isDark = html.dataset.theme === "dark";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeButton.innerHTML = isDark ? "☼" : "◐";
  };
  updateThemeButton();

  themeButton?.addEventListener("click", () => {
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("omprakash-theme", html.dataset.theme);
    updateThemeButton();
  });

  menuButton?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open") || false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
      if (menuButton) {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation");
      }
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }


  // Typewriter effect: erase the current role letter by letter, then type the next.
  const roleElement = document.querySelector("[data-changing-role]");
  if (roleElement) {
    const roles = [
      "Full Stack Developer",
      "Laravel Developer",
      "Frontend Developer",
      "PHP Developer",
      "Backend Developer"
    ];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion) {
      let roleIndex = 0;
      let characterIndex = roles[0].length;
      let deleting = true;

      const typeNextRole = () => {
        const currentRole = roles[roleIndex];

        if (deleting) {
          characterIndex -= 1;
          roleElement.textContent = currentRole.slice(0, characterIndex);

          if (characterIndex <= 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            window.setTimeout(typeNextRole, 280);
            return;
          }
          window.setTimeout(typeNextRole, 42);
          return;
        }

        const nextRole = roles[roleIndex];
        characterIndex += 1;
        roleElement.textContent = nextRole.slice(0, characterIndex);

        if (characterIndex >= nextRole.length) {
          deleting = true;
          window.setTimeout(typeNextRole, 1250);
          return;
        }
        window.setTimeout(typeNextRole, 78);
      };

      window.setTimeout(typeNextRole, 1250);
    }
  }

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
