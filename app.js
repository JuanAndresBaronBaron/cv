/* ============================================================
   JUAN ANDRES BARON BARON — Engineer Portfolio v2
   GSAP + ScrollTrigger + Lenis + Three.js
   Apple scrollmation · Stripe gradients · Linear micro-UI
   Figma cursor · WebGL particle field · themes + i18n
   ============================================================ */

/* graceful degradation: if the CDNs are blocked/offline, show a static page */
if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
  document.documentElement.classList.add("no-anim");
  throw new Error("[portfolio] GSAP failed to load — static fallback enabled");
}
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

/* ---- theme ASAP so canvases read correct CSS vars ---- */
let currentTheme = localStorage.getItem("jb-theme") || "dark";
let currentLang = localStorage.getItem("jb-lang") || "en";
document.documentElement.setAttribute("data-theme", currentTheme);

/* ============================================================
   I18N
   ============================================================ */
const I18N = {
  en: {
    hero_avail: "Available for work",
    hero_build: "I build", scroll: "scroll",
    rotate: ["scalable systems", "cloud infrastructure", "AI automation", "resilient APIs", "CI/CD pipelines"],
    hero_blurb: "5+ years engineering resilient backends, dynamic frontends, cloud infrastructure and AI-driven automation for global markets.",
    about_text: "I design, build and scale high-performance systems — bridging robust backends, dynamic frontends and cloud-native infrastructure into intelligent, end-to-end solutions that drive real digital transformation.",
    st1_l: "years of experience", st2_l: "products live in production", st3_l: "technology certifications", st4_l: "clouds: AWS · Azure · GCP",
    stack_title: "Core capabilities",
    t1_h: "Backend & Architecture", t1_p: "Scalable, resilient services designed to perform under real production load.",
    t2_h: "Frontend & Mobile", t2_p: "Dynamic web UIs and cross-platform mobile apps.",
    t3_h: "Cloud & DevOps", t3_p: "Infrastructure as code, observability and reproducible, resilient environments across the major clouds.",
    t4_h: "CI/CD Pipelines", t4_p: "Automated build, test & deploy — ship with confidence.",
    t5_h: "AI Implementation & Automation", t5_p: "Integrating AI and LLMs to optimize engineering workflows and automate complex business processes end to end.",
    t6_h: "SAP Service Software", t6_p: "Software development for SAP service implementations.",
    t7_h: "Agile & Collaboration", t7_p: "Scrum delivery & leadership in multicultural teams.",
    p1: "Clean, scalable architecture — version-controlled from the first line.",
    p2: "Compile, containerize and package reproducibly.",
    p3: "Automated checks gate every change before it ships.",
    p4: "Continuous delivery to resilient cloud environments.",
    p5: "Observe, optimize and automate with AI in the loop.",
    work_title: "Shipped to production", work_hint: "scroll to explore", open: "open",
    r1_p: "A conversational AI voice-agent platform — intelligent, automated phone interactions powered by modern LLM and voice technology.",
    r2_p: "An immersive, scroll-driven website for a Colombian law firm — animated canvas, smooth scrolling and a premium motion design system.",
    r3_p: "A modern marketing site for a US remodeling company — clean, conversion-focused design that showcases services and drives leads.",
    log_title: "My commit history",
    c1_h: "Software Engineering", c1_d: "Jul 2021 → present", c1_m: "End-to-end software lifecycle, from architecture to production. Backend & frontend, DevOps & infrastructure, CI/CD automation and AI integration to optimize engineering workflows.",
    c2_h: "Full Stack Developer", c2_d: "Jan 2021 → Jun 2021", c2_m: "Updated & maintained system modules, monitored for errors and built new modules to automate company processes.",
    c3_h: "B.Sc. Software Engineering",
    c4_h: "Specialization in Python", c4_d: "Dec 2023",
    langs_label: "// languages", lang_en: "English", lang_es: "Spanish", lang_fr: "French",
    tag_pro: "C1 · professional", tag_native: "native", tag_learning: "learning",
    contact_avail: "Available for work", contact_title: "Let's build something.",
    contact_sub: "Available for full-stack, DevOps and AI engineering work. Reach out — I usually reply within a day.",
    ca_email: "Email", ca_email_go: "Send a message →", ca_li_go: "Connect on LinkedIn →",
    ca_phone: "Phone", ca_phone_go: "Call now →",
    ca_copy: "Copy email", ca_copy_v: "click to copy address", ca_copy_go: "Copy →", copied: "Copied to clipboard!",
    ca_loc: "Pereira, Risaralda · Colombia · remote-friendly",
    cv_download: "Download CV",
    footer_tag: "Full Stack & DevOps Engineer · Colombia", footer_built: "built from scratch",
  },
  es: {
    hero_avail: "Disponible para trabajar",
    hero_build: "Construyo", scroll: "desliza",
    rotate: ["sistemas escalables", "infraestructura cloud", "automatización con IA", "APIs resilientes", "pipelines CI/CD"],
    hero_blurb: "Más de 5 años creando backends resilientes, frontends dinámicos, infraestructura cloud y automatización con IA para mercados globales.",
    about_text: "Diseño, construyo y escalo sistemas de alto rendimiento — uniendo backends robustos, frontends dinámicos e infraestructura cloud-native en soluciones inteligentes de extremo a extremo que impulsan una transformación digital real.",
    st1_l: "años de experiencia", st2_l: "productos vivos en producción", st3_l: "certificaciones en tecnología", st4_l: "nubes: AWS · Azure · GCP",
    stack_title: "Capacidades principales",
    t1_h: "Backend y Arquitectura", t1_p: "Servicios escalables y resilientes, diseñados para rendir bajo carga real de producción.",
    t2_h: "Frontend y Móvil", t2_p: "Interfaces web dinámicas y apps móviles multiplataforma.",
    t3_h: "Cloud y DevOps", t3_p: "Infraestructura como código, observabilidad y entornos reproducibles y resilientes en las principales nubes.",
    t4_h: "Pipelines CI/CD", t4_p: "Build, test y deploy automatizados — despliega con confianza.",
    t5_h: "Implementación de IA y Automatización", t5_p: "Integro IA y LLMs para optimizar flujos de ingeniería y automatizar procesos de negocio complejos de extremo a extremo.",
    t6_h: "Software para Servicios SAP", t6_p: "Desarrollo de software para implementaciones de servicios SAP.",
    t7_h: "Ágil y Colaboración", t7_p: "Entrega Scrum y liderazgo en equipos multiculturales.",
    p1: "Arquitectura limpia y escalable — versionada desde la primera línea.",
    p2: "Compila, containeriza y empaqueta de forma reproducible.",
    p3: "Pruebas automatizadas validan cada cambio antes de publicarlo.",
    p4: "Entrega continua a entornos cloud resilientes.",
    p5: "Observa, optimiza y automatiza con IA en el ciclo.",
    work_title: "En producción", work_hint: "desliza para explorar", open: "abrir",
    r1_p: "Una plataforma de agente de voz con IA conversacional — interacciones telefónicas inteligentes y automatizadas con LLM y tecnología de voz moderna.",
    r2_p: "Un sitio web inmersivo y guiado por scroll para una firma de abogados colombiana — canvas animado, scroll suave y un sistema de animación premium.",
    r3_p: "Un sitio de marketing moderno para una empresa de remodelación en EE. UU. — diseño limpio enfocado en conversión que muestra servicios y genera clientes.",
    log_title: "Mi historial de commits",
    c1_h: "Ingeniería de Software", c1_d: "Jul 2021 → actualidad", c1_m: "Ciclo de vida completo del software, de la arquitectura a producción. Backend y frontend, DevOps e infraestructura, automatización CI/CD e integración de IA para optimizar los flujos de ingeniería.",
    c2_h: "Desarrollador Full Stack", c2_d: "Ene 2021 → Jun 2021", c2_m: "Actualicé y mantuve módulos del sistema, monitoreé errores y construí nuevos módulos para automatizar procesos de la empresa.",
    c3_h: "Ing. de Software (Pregrado)",
    c4_h: "Especialización en Python", c4_d: "Dic 2023",
    langs_label: "// idiomas", lang_en: "Inglés", lang_es: "Español", lang_fr: "Francés",
    tag_pro: "C1 · profesional", tag_native: "nativo", tag_learning: "aprendiendo",
    contact_avail: "Disponible para trabajar", contact_title: "Construyamos algo.",
    contact_sub: "Disponible para proyectos de full-stack, DevOps e IA. Escríbeme — suelo responder en menos de un día.",
    ca_email: "Correo", ca_email_go: "Enviar un mensaje →", ca_li_go: "Conéctate en LinkedIn →",
    ca_phone: "Teléfono", ca_phone_go: "Llamar →",
    ca_copy: "Copiar correo", ca_copy_v: "haz clic para copiar", ca_copy_go: "Copiar →", copied: "¡Copiado al portapapeles!",
    ca_loc: "Pereira, Risaralda · Colombia · trabajo remoto",
    cv_download: "Descargar CV",
    footer_tag: "Ingeniero Full Stack & DevOps · Colombia", footer_built: "hecho desde cero",
  },
  fr: {
    hero_avail: "Disponible",
    hero_build: "Je construis", scroll: "défiler",
    rotate: ["des systèmes évolutifs", "une infra cloud", "l'automatisation par IA", "des APIs résilientes", "des pipelines CI/CD"],
    hero_blurb: "Plus de 5 ans à concevoir des backends résilients, des frontends dynamiques, une infrastructure cloud et de l'automatisation par IA pour des marchés mondiaux.",
    about_text: "Je conçois, développe et fais évoluer des systèmes haute performance — reliant des backends robustes, des frontends dynamiques et une infrastructure cloud-native en solutions intelligentes de bout en bout qui génèrent une vraie transformation digitale.",
    st1_l: "années d'expérience", st2_l: "produits en production", st3_l: "certifications technologiques", st4_l: "clouds : AWS · Azure · GCP",
    stack_title: "Compétences clés",
    t1_h: "Backend & Architecture", t1_p: "Des services évolutifs et résilients, conçus pour tenir la charge réelle en production.",
    t2_h: "Frontend & Mobile", t2_p: "Interfaces web dynamiques et apps mobiles multiplateformes.",
    t3_h: "Cloud & DevOps", t3_p: "Infrastructure as code, observabilité et environnements reproductibles et résilients sur les principaux clouds.",
    t4_h: "Pipelines CI/CD", t4_p: "Build, test et déploiement automatisés — livrez en confiance.",
    t5_h: "Implémentation IA & Automatisation", t5_p: "J'intègre l'IA et les LLM pour optimiser les workflows d'ingénierie et automatiser des processus métier complexes de bout en bout.",
    t6_h: "Logiciels de service SAP", t6_p: "Développement logiciel pour des implémentations de services SAP.",
    t7_h: "Agilité & Collaboration", t7_p: "Livraison Scrum et leadership dans des équipes multiculturelles.",
    p1: "Architecture propre et évolutive — versionnée dès la première ligne.",
    p2: "Compiler, conteneuriser et packager de façon reproductible.",
    p3: "Des tests automatisés valident chaque changement avant la mise en production.",
    p4: "Livraison continue vers des environnements cloud résilients.",
    p5: "Observer, optimiser et automatiser avec l'IA dans la boucle.",
    work_title: "En production", work_hint: "défilez pour explorer", open: "ouvrir",
    r1_p: "Une plateforme d'agent vocal à IA conversationnelle — des interactions téléphoniques intelligentes et automatisées via LLM et technologie vocale moderne.",
    r2_p: "Un site web immersif piloté au scroll pour un cabinet d'avocats colombien — canvas animé, défilement fluide et un système d'animation premium.",
    r3_p: "Un site marketing moderne pour une entreprise de rénovation aux États-Unis — un design épuré axé conversion qui met en valeur les services et génère des leads.",
    log_title: "Mon historique de commits",
    c1_h: "Ingénierie logicielle", c1_d: "Juil. 2021 → présent", c1_m: "Cycle de vie logiciel de bout en bout, de l'architecture à la production. Backend & frontend, DevOps & infrastructure, automatisation CI/CD et intégration IA pour optimiser les workflows d'ingénierie.",
    c2_h: "Développeur Full Stack", c2_d: "Janv. 2021 → Juin 2021", c2_m: "Mise à jour et maintenance de modules, surveillance des erreurs et création de nouveaux modules pour automatiser les processus de l'entreprise.",
    c3_h: "Licence en ingénierie logicielle",
    c4_h: "Spécialisation en Python", c4_d: "Déc. 2023",
    langs_label: "// langues", lang_en: "Anglais", lang_es: "Espagnol", lang_fr: "Français",
    tag_pro: "C1 · professionnel", tag_native: "natif", tag_learning: "en cours",
    contact_avail: "Disponible", contact_title: "Construisons quelque chose.",
    contact_sub: "Disponible pour des missions full-stack, DevOps et IA. Écrivez-moi — je réponds généralement sous 24 h.",
    ca_email: "E-mail", ca_email_go: "Envoyer un message →", ca_li_go: "Connectons-nous sur LinkedIn →",
    ca_phone: "Téléphone", ca_phone_go: "Appeler →",
    ca_copy: "Copier l'e-mail", ca_copy_v: "cliquez pour copier", ca_copy_go: "Copier →", copied: "Copié dans le presse-papiers !",
    ca_loc: "Pereira, Risaralda · Colombie · télétravail",
    cv_download: "Télécharger le CV",
    footer_tag: "Ingénieur Full Stack & DevOps · Colombie", footer_built: "fait de zéro",
  },
};

/* ============================================================
   HELPERS
   ============================================================ */
function cssVar(el, name) { return getComputedStyle(el).getPropertyValue(name).trim(); }
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
/* run a module safely — one broken module must never kill the rest */
function safe(fn) { try { fn(); } catch (err) { console.error("[portfolio]", err); } }

/* split a line into chars (Apple-style masked reveal) */
function splitChars(el) {
  const text = el.textContent;
  el.setAttribute("aria-label", text);
  el.innerHTML = text.split("").map((c) =>
    c === " " ? '<span class="char">&nbsp;</span>' : `<span class="char">${c}</span>`
  ).join("");
}
document.querySelectorAll("[data-split]").forEach(splitChars);

/* ============================================================
   ABOUT — word-by-word scrub highlight
   ============================================================ */
let aboutST = null;
function buildAbout() {
  const el = document.getElementById("aboutText");
  if (!el) return;
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
  const spans = el.querySelectorAll(".word");
  if (prefersReduced) { spans.forEach((s) => s.classList.add("is-lit")); return; }
  if (aboutST) aboutST.kill();
  aboutST = ScrollTrigger.create({
    trigger: "#about", start: "top 70%", end: "bottom 65%", scrub: true,
    onUpdate: (self) => {
      const lit = Math.floor(self.progress * 1.25 * spans.length);
      spans.forEach((s, i) => s.classList.toggle("is-lit", i < lit));
    },
  });
}

/* ============================================================
   I18N apply
   ============================================================ */
function applyLang(lang) {
  currentLang = lang;
  const dict = I18N[lang] || I18N.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (dict[k] != null) el.textContent = dict[k];
  });
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("jb-lang", lang);
  document.querySelectorAll("[data-lang-set]").forEach((b) => b.classList.toggle("is-active", b.dataset.langSet === lang));
  buildAbout();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}

/* ============================================================
   THEME
   ============================================================ */
const themeRefreshers = [];
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("jb-theme", theme);
  document.querySelectorAll("#themeSeg [data-theme-set]").forEach((b) => b.classList.toggle("is-active", b.dataset.themeSet === theme));
  requestAnimationFrame(() => themeRefreshers.forEach((fn) => fn()));
}

/* ============================================================
   SMOOTH SCROLL (Lenis)
   ============================================================ */
let lenis = null;
let scrollVelocity = 0;
if (!prefersReduced && typeof Lenis !== "undefined") {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on("scroll", (e) => { scrollVelocity = e.velocity || 0; ScrollTrigger.update(); });
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      scrollToTarget(id);
      menuOverlay.classList.remove("is-open");
      navBurger.classList.remove("is-open");
      if (lenis) lenis.start();
    }
  });
});

/* ============================================================
   TEXT SCRAMBLE (rotating word)
   ============================================================ */
class Scramble {
  constructor(el) { this.el = el; this.chars = "!<>-_\\/[]{}=+*^?#________01"; this.update = this.update.bind(this); }
  setText(newText) {
    const old = this.el.textContent; const len = Math.max(old.length, newText.length);
    const p = new Promise((res) => (this.resolve = res));
    this.queue = [];
    for (let i = 0; i < len; i++) {
      const start = Math.floor(Math.random() * 38), end = start + Math.floor(Math.random() * 38);
      this.queue.push({ from: old[i] || "", to: newText[i] || "", start, end, char: "" });
    }
    cancelAnimationFrame(this.req); this.frame = 0; this.update(); return p;
  }
  update() {
    let out = "", done = 0;
    for (const q of this.queue) {
      if (this.frame >= q.end) { done++; out += q.to; }
      else if (this.frame >= q.start) { if (!q.char || Math.random() < 0.28) q.char = this.chars[Math.floor(Math.random() * this.chars.length)]; out += `<span class="dud">${q.char}</span>`; }
      else out += q.from;
    }
    this.el.innerHTML = out;
    if (done === this.queue.length) this.resolve && this.resolve();
    else { this.req = requestAnimationFrame(this.update); this.frame++; }
  }
}
const dudStyle = document.createElement("style");
dudStyle.textContent = ".dud{color:var(--txt-dim);opacity:.7}";
document.head.appendChild(dudStyle);

function rotateWords() {
  const el = document.getElementById("rotateWord");
  if (!el || prefersReduced) return;
  const s = new Scramble(el);
  let i = 0;
  const next = () => { const words = (I18N[currentLang] || I18N.en).rotate; i = (i + 1) % words.length; s.setText(words[i]).then(() => setTimeout(next, 1800)); };
  setTimeout(next, 2100);
}

/* ============================================================
   LOADER + HERO INTRO
   ============================================================ */
const loader = document.getElementById("loader");
const nav = document.getElementById("nav");

function heroIntro() {
  nav.classList.add("is-in");
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.to("#heroTitle .char", { y: 0, duration: 1.2, stagger: 0.028 }, 0)
    .to("#heroEyebrow", { opacity: 1, duration: 0.8 }, 0.35)
    .to(".hero-tagline", { opacity: 1, duration: 0.8 }, 0.55)
    .to(".hero-blurb", { opacity: 1, duration: 0.8 }, 0.7)
    .to(".hero-cta", { opacity: 1, duration: 0.8 }, 0.85)
    .to("#heroFoot", { opacity: 1, duration: 0.8 }, 1);
  rotateWords();
}

function startLoader() {
  if (prefersReduced) {
    loader.style.display = "none";
    nav.classList.add("is-in");
    gsap.set("#heroTitle .char", { y: 0 });
    gsap.set(["#heroEyebrow", ".hero-tagline", ".hero-blurb", ".hero-cta", "#heroFoot"], { opacity: 1 });
    return;
  }
  const count = document.getElementById("loadCount");
  const state = { v: 0 };
  gsap.timeline()
    .to(state, {
      v: 100, duration: 1.5, ease: "power2.inOut",
      onUpdate: () => { count.textContent = Math.round(state.v); },
    })
    .to("#loadBar", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
    .to(loader, {
      yPercent: -100, duration: 0.9, ease: "power4.inOut",
      onComplete: () => { loader.style.display = "none"; ScrollTrigger.refresh(); },
    }, "+=0.15")
    .add(heroIntro, "-=0.55");
}
window.addEventListener("load", startLoader);
if (document.readyState === "complete") startLoader();

/* ============================================================
   NAV behavior + controls
   ============================================================ */
ScrollTrigger.create({
  start: 80,
  onUpdate: (self) => {
    nav.classList.toggle("is-scrolled", self.scroll() > 80);
    if (self.direction === 1 && self.scroll() > 500) nav.classList.add("is-hidden");
    else nav.classList.remove("is-hidden");
  },
});
const navBurger = document.getElementById("navBurger");
const menuOverlay = document.getElementById("menuOverlay");
navBurger.addEventListener("click", () => {
  const open = menuOverlay.classList.toggle("is-open");
  navBurger.classList.toggle("is-open", open);
  if (lenis) open ? lenis.stop() : lenis.start();
});

document.querySelectorAll("#themeSeg [data-theme-set]").forEach((b) => b.addEventListener("click", () => applyTheme(b.dataset.themeSet)));
document.querySelectorAll("[data-lang-set]").forEach((b) => b.addEventListener("click", () => applyLang(b.dataset.langSet)));

gsap.to("#scrollProgress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
gsap.set("#scrollProgress", { scaleX: 0 });

/* copy email */
const copyBtn = document.getElementById("copyEmail");
copyBtn.addEventListener("click", async () => {
  const addr = "juanandresbaronbaron2001@gmail.com";
  try { await navigator.clipboard.writeText(addr); } catch (e) { /* ignore */ }
  const label = document.getElementById("copyLabel");
  copyBtn.classList.add("is-copied");
  label.textContent = (I18N[currentLang] || I18N.en).copied;
  setTimeout(() => { copyBtn.classList.remove("is-copied"); label.textContent = (I18N[currentLang] || I18N.en).ca_copy_v; }, 1900);
});

/* ============================================================
   CURSOR (Figma-style) + MAGNETIC + TILT + SPOTLIGHT
   ============================================================ */
if (!isTouch && !prefersReduced) {
  const cursor = document.getElementById("cursor");
  const cursorLabel = document.getElementById("cursorLabel");
  const dot = document.getElementById("cursorDot");
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; gsap.set(dot, { x: mouse.x, y: mouse.y }); });
  gsap.ticker.add(() => { pos.x += (mouse.x - pos.x) * 0.16; pos.y += (mouse.y - pos.y) * 0.16; gsap.set(cursor, { x: pos.x, y: pos.y }); });

  document.querySelectorAll("a, button, .tile, .caction").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
  });
  /* contextual label (e.g. "open ↗" on project panels) */
  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("mouseenter", () => { cursorLabel.textContent = el.dataset.cursor; cursor.classList.add("has-label"); });
    el.addEventListener("mouseleave", () => cursor.classList.remove("has-label"));
  });

  /* magnetic */
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const strength = 0.3;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength, duration: 0.5, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" }));
  });

  /* 3D tilt */
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 8, rotateX: -py * 8, duration: 0.5, ease: "power3.out", transformPerspective: 1100 });
    });
    card.addEventListener("mouseleave", () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" }));
  });

  /* spotlight (Linear) */
  document.querySelectorAll(".tile, .caction").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });
}

/* ============================================================
   WEBGL HERO — Three.js particle field (sphere → wave morph)
   ============================================================ */
safe(function heroGL() {
  const canvas = document.getElementById("glCanvas");
  if (!canvas || prefersReduced || typeof THREE === "undefined") { if (canvas) canvas.style.display = "none"; return; }
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  } catch (e) { canvas.style.display = "none"; return; }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 40);
  camera.position.z = 3.4;

  const N = Math.min(9000, Math.floor((innerWidth * innerHeight) / 160));
  const sphere = new Float32Array(N * 3);
  const wave = new Float32Array(N * 3);
  const knot = new Float32Array(N * 3);

  /* shape A — fibonacci sphere */
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    sphere[i * 3] = Math.cos(th) * rad * 1.35;
    sphere[i * 3 + 1] = y * 1.35;
    sphere[i * 3 + 2] = Math.sin(th) * rad * 1.35;
  }
  /* shape B — wave grid */
  const side = Math.ceil(Math.sqrt(N));
  for (let i = 0; i < N; i++) {
    const gx = (i % side) / (side - 1) - 0.5;
    const gz = Math.floor(i / side) / (side - 1) - 0.5;
    wave[i * 3] = gx * 4.6;
    wave[i * 3 + 1] = Math.sin(gx * 6) * Math.cos(gz * 6) * 0.35;
    wave[i * 3 + 2] = gz * 3.2;
  }
  /* shape C — torus knot */
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2 * 3;
    const p = 2, q = 3, R = 1.05;
    const r = 0.42 * Math.cos(q * t) + R;
    knot[i * 3] = r * Math.cos(p * t) + (Math.random() - 0.5) * 0.12;
    knot[i * 3 + 1] = r * Math.sin(p * t) + (Math.random() - 0.5) * 0.12;
    knot[i * 3 + 2] = 0.42 * Math.sin(q * t) + (Math.random() - 0.5) * 0.12;
  }

  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(sphere);
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ size: 0.016, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
  const mat2 = new THREE.PointsMaterial({ size: 0.01, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geo, mat);
  const points2 = new THREE.Points(geo, mat2);
  points2.scale.setScalar(1.18);
  points2.rotation.z = 0.6;
  const group = new THREE.Group();
  group.add(points); group.add(points2);
  scene.add(group);

  function readColors() {
    mat.color.set(cssVar(canvas, "--gl") || "#5C8DFF");
    mat2.color.set(cssVar(canvas, "--gl-2") || "#36BFFA");
  }
  readColors();
  themeRefreshers.push(readColors);

  const morph = { t: 0 };
  ScrollTrigger.create({
    trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.6,
    onUpdate: (self) => { morph.t = self.progress * 2; },
  });

  const mouse3 = { x: 0, y: 0 };
  window.addEventListener("mousemove", (e) => {
    mouse3.x = (e.clientX / innerWidth - 0.5) * 2;
    mouse3.y = (e.clientY / innerHeight - 0.5) * 2;
  });

  function resize() {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  let running = true;
  ScrollTrigger.create({ trigger: "#hero", start: "top bottom", end: "bottom top", onToggle: (self) => (running = self.isActive) });
  document.addEventListener("visibilitychange", () => { running = !document.hidden; });

  const pos = geo.attributes.position;
  let t0 = 0;
  renderer.setAnimationLoop((time) => {
    if (!running) return;
    t0 = time * 0.001;
    const tt = clamp(morph.t, 0, 2);
    const arr = pos.array;
    for (let i = 0; i < N * 3; i += 3) {
      let x, y, z;
      if (tt <= 1) {
        x = sphere[i] + (wave[i] - sphere[i]) * tt;
        y = sphere[i + 1] + (wave[i + 1] - sphere[i + 1]) * tt;
        z = sphere[i + 2] + (wave[i + 2] - sphere[i + 2]) * tt;
      } else {
        const f = tt - 1;
        x = wave[i] + (knot[i] - wave[i]) * f;
        y = wave[i + 1] + (knot[i + 1] - wave[i + 1]) * f;
        z = wave[i + 2] + (knot[i + 2] - wave[i + 2]) * f;
      }
      /* organic breathing */
      arr[i] = x + Math.sin(t0 * 0.8 + i) * 0.012;
      arr[i + 1] = y + Math.cos(t0 * 0.7 + i * 0.5) * 0.012;
      arr[i + 2] = z;
    }
    pos.needsUpdate = true;
    group.rotation.y = t0 * 0.08 + mouse3.x * 0.25;
    group.rotation.x = mouse3.y * 0.18;
    group.position.x = 0.9;
    renderer.render(scene, camera);
  });
});

/* hero parallax exit (Apple) */
if (!prefersReduced) {
  gsap.to("#heroInner", { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to("#heroFoot", { opacity: 0, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "18% top", scrub: true } });
}

/* ============================================================
   TICKER — velocity-reactive marquee
   ============================================================ */
safe(() => {
  if (prefersReduced) return;
  const inner = document.getElementById("tickerInner");
  const loop = gsap.to(inner, { xPercent: -50, ease: "none", duration: 28, repeat: -1 });
  const skewTo = gsap.quickTo(inner, "skewX", { duration: 0.4, ease: "power2.out" });
  gsap.ticker.add(() => {
    const v = clamp(scrollVelocity * 0.5, -14, 14);
    skewTo(v);
    loop.timeScale(clamp(1 + Math.abs(scrollVelocity) * 0.06, 1, 3.4));
  });
});

/* ============================================================
   ABOUT — photo veil + stat counters
   ============================================================ */
safe(() => {
  if (prefersReduced) {
    document.querySelectorAll(".stat-val").forEach((el) => (el.textContent = el.dataset.to));
    return;
  }
  gsap.to("#photoVeil", {
    scaleY: 0, duration: 1.4, ease: "power4.inOut",
    scrollTrigger: { trigger: ".about-photo", start: "top 78%", once: true },
  });
  gsap.utils.toArray(".stat-val").forEach((el) => {
    const to = parseInt(el.dataset.to, 10) || 0;
    gsap.fromTo(el, { innerText: 0 }, {
      innerText: to, duration: 1.8, ease: "power2.out", snap: { innerText: 1 },
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
});

/* ============================================================
   PIPELINE — scroll-driven CI/CD canvas (Apple scrollmation)
   ============================================================ */
safe(function pipeline() {
  const canvas = document.getElementById("pipeCanvas");
  const ctx = canvas.getContext("2d");
  let w, h, dpr, progress = prefersReduced ? 1 : 0;
  const STAGES = ["commit", "build", "test", "deploy", "monitor"];
  /* defaults up-front so an early draw() never hits undefined colors */
  let C = { c1: "#5C8DFF", c2: "#36BFFA", c3: "#2DD4BF", packet: "#9DBBFF", line: "rgba(226,232,255,0.16)", panel: "#121624", txt: "#EDF0FA", txtDim: "#97A0B6" };
  function readColors() {
    C = {
      c1: cssVar(canvas, "--cv-1") || "#5C8DFF",
      c2: cssVar(canvas, "--cv-2") || "#36BFFA",
      c3: cssVar(canvas, "--cv-3") || "#2DD4BF",
      packet: cssVar(canvas, "--cv-packet") || "#9DBBFF",
      line: cssVar(canvas, "--line-2") || "rgba(226,232,255,0.16)",
      panel: cssVar(canvas, "--panel-2") || "#121624",
      txt: cssVar(canvas, "--txt") || "#EDF0FA",
      txtDim: cssVar(canvas, "--txt-dim") || "#97A0B6",
    };
    draw();
  }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
  }
  function nodes() {
    const n = STAGES.length;
    if (w < 760) { const mY = h * 0.18, useH = h * 0.6, x = w * 0.5; return STAGES.map((_, i) => ({ x, y: mY + (useH * i) / (n - 1) })); }
    const mX = w * 0.1, useW = w * 0.8, y = h * 0.48; return STAGES.map((_, i) => ({ x: mX + (useW * i) / (n - 1), y }));
  }
  function lerp(a, b, f) { return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f }; }
  function posAt(p, ns) { const total = ns.length - 1, f = p * total, i = Math.min(total - 1, Math.floor(f)); return lerp(ns[i], ns[i + 1], f - i); }
  function draw() {
    if (!w || !h) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
    const ns = nodes();
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ns.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
    const last = posAt(progress, ns), total = ns.length - 1, fEnd = progress * total;
    const grad = ctx.createLinearGradient(ns[0].x, ns[0].y, ns[total].x, ns[total].y);
    grad.addColorStop(0, C.c1); grad.addColorStop(0.5, C.c2); grad.addColorStop(1, C.c3);
    ctx.beginPath(); ctx.moveTo(ns[0].x, ns[0].y);
    for (let i = 1; i <= total; i++) { if (fEnd >= i) ctx.lineTo(ns[i].x, ns[i].y); else { ctx.lineTo(last.x, last.y); break; } }
    ctx.strokeStyle = grad; ctx.lineWidth = 5; ctx.shadowColor = C.c1; ctx.shadowBlur = 18 * progress; ctx.stroke(); ctx.shadowBlur = 0;
    ns.forEach((p, i) => {
      const reached = progress >= i / total - 0.001;
      ctx.beginPath(); ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = reached ? C.c1 + "28" : "rgba(128,128,128,0.06)"; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = reached ? C.c1 : C.panel; ctx.strokeStyle = reached ? C.c1 : C.line; ctx.lineWidth = 2; ctx.fill(); ctx.stroke();
      ctx.font = "500 13px 'JetBrains Mono', monospace"; ctx.fillStyle = reached ? C.txt : C.txtDim; ctx.textAlign = "center";
      ctx.fillText(STAGES[i], p.x, p.y - 28);
    });
    if (progress > 0 && progress < 1) {
      ctx.beginPath(); ctx.arc(last.x, last.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = C.packet; ctx.shadowColor = C.packet; ctx.shadowBlur = 22; ctx.fill(); ctx.shadowBlur = 0;
    }
  }
  readColors(); resize();
  window.addEventListener("resize", resize);
  themeRefreshers.push(readColors);
  const steps = document.querySelectorAll(".pipe-step");
  if (prefersReduced) { draw(); steps.forEach((s) => s.classList.add("is-active")); return; }
  ScrollTrigger.create({
    trigger: "#pipeline", start: "top top", end: "+=300%", pin: true, scrub: 0.4,
    onUpdate: (self) => {
      progress = self.progress; draw();
      const idx = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length));
      steps.forEach((s, i) => s.classList.toggle("is-active", i === idx));
    },
  });
});

/* ============================================================
   WORK — pinned horizontal gallery (Apple/agency style)
   ============================================================ */
const mm = gsap.matchMedia();
safe(() => mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
  const track = document.getElementById("workTrack");
  const stage = document.getElementById("workStage");
  const dist = () => Math.max(0, track.scrollWidth - innerWidth);
  const tween = gsap.to(track, {
    x: () => -dist(), ease: "none",
    scrollTrigger: {
      trigger: stage, start: "top top", end: () => "+=" + dist(),
      pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
      onUpdate: (self) => gsap.set("#workProgress", { scaleX: self.progress }),
    },
  });
  /* inner parallax on each art layer while the track moves */
  gsap.utils.toArray(".panel-art .art").forEach((art) => {
    gsap.fromTo(art, { xPercent: -6 }, {
      xPercent: 6, ease: "none",
      scrollTrigger: { trigger: art.closest(".panel"), containerAnimation: tween, start: "left right", end: "right left", scrub: true },
    });
  });
  return () => {};
}));

/* ============================================================
   REVEALS + TIMELINE + LANG BARS + PARALLAX TITLES
   ============================================================ */
if (!prefersReduced) {
  gsap.utils.toArray("[data-reveal]").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: (i % 3) * 0.08,
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
  gsap.to("#commitsFill", {
    scaleY: 1, ease: "none",
    scrollTrigger: { trigger: ".commits", start: "top 75%", end: "bottom 55%", scrub: 0.5 },
  });
  gsap.set("#commitsFill", { scaleY: 0 });
  gsap.utils.toArray(".sec-title").forEach((el) => {
    gsap.from(el, { yPercent: 22, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: true } });
  });
} else {
  document.querySelectorAll("[data-reveal]").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
  gsap.set("#commitsFill", { scaleY: 1 });
}
document.querySelectorAll(".lang").forEach((el) => {
  if (prefersReduced) { el.classList.add("is-in"); return; }
  ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => el.classList.add("is-in") });
});

/* ============================================================
   FOOTER + INIT
   ============================================================ */
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("toTop").addEventListener("click", () => scrollToTarget("#hero"));

applyTheme(currentTheme);
applyLang(currentLang);

/* recalc scroll positions once assets settle */
window.addEventListener("load", () => setTimeout(() => ScrollTrigger.refresh(), 300));
window.addEventListener("orientationchange", () => setTimeout(() => ScrollTrigger.refresh(), 250));
