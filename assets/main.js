(function () {
  var LANG_KEY = "psicopompo-lang";
  var langToggle = document.querySelector(".lang-toggle");

  function setLang(lang) {
    document.documentElement.setAttribute("data-active-lang", lang);
    if (langToggle) langToggle.textContent = lang === "es" ? "EN" : "ES";
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-active-lang") || "es";
      setLang(current === "es" ? "en" : "es");
    });
  }

  var storedLang = null;
  try { storedLang = localStorage.getItem(LANG_KEY); } catch (e) {}
  setLang(storedLang === "en" ? "en" : "es");

  var STORAGE_KEY = "psicopompo-audience";
  var buttons = document.querySelectorAll(".audience-btn");
  var voices = document.querySelectorAll(".voice");

  function setAudience(value) {
    voices.forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-voice") === value);
    });
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-audience") === value));
    });
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setAudience(btn.getAttribute("data-audience"));
    });
  });

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  setAudience(stored === "participantes" ? "participantes" : "facilitadores");

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(".reveal");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (!prefersReducedMotion) {
    var heroPhoto = document.querySelector(".hero-photo");
    if (heroPhoto) {
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var y = window.scrollY || 0;
            heroPhoto.style.transform = "translateY(" + Math.min(y * 0.18, 60) + "px)";
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }
})();
