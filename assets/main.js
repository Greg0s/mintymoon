(() => {
  const STRINGS = {
    fr: {
      "wwp.tags": "Catalogue de jeux · Entre amis · Gratuit",
      "wwp.desc": "Le catalogue des jeux en ligne à faire entre amis. Indiquez combien vous êtes et trouvez le bon jeu dans une sélection faite à la main : dessin, quiz, musique, mots…",
      "lyrix.tags": "Jeu musical · Chanson du jour · Gratuit",
      "lyrix.desc": "Le jeu de la chanson du jour. Les paroles sont cachées : proposez des mots pour les dévoiler et trouvez le titre. La même chanson pour tout le monde, en solo ou entre amis.",
      "wwp.cta": "Trouver un jeu",
      "lyrix.cta": "Jouer",
      by: "Par",
      toggleLabel: "Switch to English",
    },
    en: {
      "wwp.tags": "Game catalog · With friends · Free",
      "wwp.desc": "A catalog of online games to play with friends. Say how many you are and find the right game in a hand-picked selection: drawing, trivia, music, words…",
      "lyrix.tags": "Music game · Daily song · Free",
      "lyrix.desc": "The daily song game. The lyrics are hidden: suggest words to reveal them and find the title. Same song for everyone, solo or with friends. Songs are in French.",
      "wwp.cta": "Find a game",
      "lyrix.cta": "Play",
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
