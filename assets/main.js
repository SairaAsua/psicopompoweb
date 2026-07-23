(function () {
  var LANG_KEY = "psicopompo-lang";
  var langOpts = document.querySelectorAll(".lang-switch-opt");
  var i18nMeta = document.querySelectorAll("[data-es][data-en]");

  function setLang(lang) {
    document.documentElement.setAttribute("data-active-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    langOpts.forEach(function (opt) {
      opt.setAttribute("aria-pressed", String(opt.getAttribute("data-set-lang") === lang));
    });
    i18nMeta.forEach(function (el) {
      var val = el.getAttribute(lang === "en" ? "data-en" : "data-es");
      if (val == null) return;
      if (el.tagName === "META") el.setAttribute("content", val);
      else el.textContent = val;
    });
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", lang === "en" ? "en_US" : "es_AR");
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  langOpts.forEach(function (opt) {
    opt.addEventListener("click", function () {
      setLang(opt.getAttribute("data-set-lang"));
    });
  });

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

  if (prefersReducedMotion) {
    var heroVideo = document.querySelector("video.hero-photo");
    if (heroVideo) {
      heroVideo.removeAttribute("autoplay");
      heroVideo.pause();
      heroVideo.removeAttribute("src");
      heroVideo.querySelectorAll("source").forEach(function (s) { s.removeAttribute("src"); });
      heroVideo.load();
    }
  }

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
