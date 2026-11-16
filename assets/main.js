(() => {
  const STRINGS = {
    fr: {
      kicker: "Des petits jeux à lancer en un clic.",
      "wwp.tags": "Entre amis · 1 à 10+ joueurs · Gratuit",
      "wwp.desc": "Vous êtes combien ce soir ? Choisissez le nombre de joueurs et trouvez le jeu en ligne parfait à lancer entre amis. Une sélection faite à la main, directement dans le navigateur.",
      "lyrix.tags": "Musique · Une chanson par jour · Gratuit",
      "lyrix.desc": "Le jeu de la chanson du jour. Les paroles sont cachées : proposez des mots pour les dévoiler et trouvez le titre. La même chanson pour tout le monde, en solo ou entre amis.",
      cta: "Jouer",
      by: "Par",
      toggleLabel: "Switch to English",
    },
    en: {
      kicker: "Little games, one click away.",
      "wwp.tags": "With friends · 1 to 10+ players · Free",
      "wwp.desc": "How many of you tonight? Pick a player count and find the perfect online game to play with friends. Hand-picked, right in your browser.",
      "lyrix.tags": "Music · One song a day · Free",
      "lyrix.desc": "The daily song game. The lyrics are hidden: suggest words to reveal them and find the title. Same song for everyone, solo or with friends. Songs are in French.",
      cta: "Play",
      by: "By",
      toggleLabel: "Passer en français",
    },
  };

  const KEY = "mintymoon-lang";
  const toggle = document.getElementById("lang-toggle");

  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const save = (v) => { try { localStorage.setItem(KEY, v); } catch {} };

  function apply(lang) {
    const t = STRINGS[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t[el.dataset.i18n];
      if (v) el.textContent = v;
    });
    toggle.setAttribute("aria-label", t.toggleLabel);
    toggle.querySelectorAll("[data-lang-opt]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.langOpt === lang);
    });
  }

  const fromUrl = new URLSearchParams(location.search).get("lang");
  let lang = STRINGS[fromUrl] ? fromUrl
    : read() || ((navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : "en");
  if (!STRINGS[lang]) lang = "fr";
  apply(lang);

  toggle.addEventListener("click", () => {
    lang = lang === "fr" ? "en" : "fr";
    save(lang);
    apply(lang);
  });

  // Soft mint glow that follows the cursor on each card
  document.querySelectorAll(".portal").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
})();
