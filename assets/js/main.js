/* =========================================================
   Kartavya Kothari — site interactions
   vanilla JS, no dependencies (GitHub Pages friendly)
   ========================================================= */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- theme toggle (persisted) ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var icon = toggle ? toggle.querySelector(".theme-icon") : null;
  var saved = null;
  try { saved = localStorage.getItem("kk-theme"); } catch (e) {}
  if (saved) root.setAttribute("data-theme", saved);
  function syncIcon() { if (icon) icon.textContent = root.getAttribute("data-theme") === "light" ? "☀️" : "🌙"; }
  syncIcon();
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("kk-theme", next); } catch (e) {}
      syncIcon();
    });
  }

  /* ---------- nav: scrolled state + scroll progress ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scrollProgress");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 30);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.querySelector(".nav-links");
  function closeMenu() {
    if (!menuToggle) return;
    menuToggle.classList.remove("open");
    if (navLinks) navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var open = menuToggle.classList.toggle("open");
      navLinks.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      if (open) {
        var first = navLinks.querySelector("a");
        if (first) first.focus();
      }
    });
    navLinks.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    // Escape closes the menu and returns focus to the toggle
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuToggle.classList.contains("open")) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- typewriter roles ---------- */
  var typed = document.getElementById("typed");
  var roles = [
    "Senior ML Scientist @ Dream11.",
    "recommender-systems person.",
    "KDD · ECML-PKDD author.",
    "IIT Bombay graduate.",
    "friendly neighborhood koala. 🐨",
    "experimentation nerd.",
  ];
  if (typed && !prefersReduced) {
    var r = 0, c = 0, deleting = false;
    function tick() {
      var word = roles[r];
      typed.textContent = word.slice(0, c);
      if (!deleting) {
        if (c < word.length) { c++; setTimeout(tick, 55 + Math.random() * 45); }
        else { deleting = true; setTimeout(tick, 1600); }
      } else {
        if (c > 0) { c--; setTimeout(tick, 28); }
        else { deleting = false; r = (r + 1) % roles.length; setTimeout(tick, 350); }
      }
    }
    tick();
  } else if (typed) {
    typed.textContent = roles[0];
  }

  /* ---------- animated stat counters ---------- */
  var counters = document.querySelectorAll(".stat-num");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-target")) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) { el.textContent = prefix + target + suffix; return; }
    var start = null, dur = 1500;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- floating eucalyptus leaves ---------- */
  var field = document.getElementById("leafField");
  if (field && !prefersReduced) {
    var glyphs = ["🌿", "🍃"];
    var count = window.innerWidth < 680 ? 7 : 14;
    for (var i = 0; i < count; i++) {
      var leaf = document.createElement("span");
      leaf.className = "leaf";
      leaf.textContent = glyphs[i % glyphs.length];
      leaf.style.left = Math.random() * 100 + "vw";
      leaf.style.fontSize = (13 + Math.random() * 14) + "px";
      leaf.style.animationDuration = (12 + Math.random() * 12) + "s";
      leaf.style.animationDelay = -(Math.random() * 20) + "s";
      field.appendChild(leaf);
    }
  }

  /* ---------- toast helper ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 3200);
  }

  /* ---------- easter egg 1: click the koala for a koala fact ---------- */
  var facts = [
    "Koalas sleep up to 22 hours a day. Relatable for a debugging week.",
    "A koala's fingerprints are nearly identical to a human's — peak biometric fraud detection irony.",
    "Koalas have two thumbs on each hand. Better git-merge ergonomics.",
    "Baby koalas are called 'joeys'. My models are my joeys.",
    "Koalas aren't bears — they're marsupials. Names are hard; so is entity alignment.",
    "Eucalyptus is mildly toxic; koalas eat it anyway. We call that 'risk appetite'.",
  ];
  var koala = document.querySelector(".brand-koala");
  if (koala) {
    var fi = 0;
    koala.style.cursor = "pointer";
    koala.addEventListener("click", function (e) {
      // pop a koala fact without triggering the brand link's jump to #home
      e.preventDefault();
      e.stopPropagation();
      toast("🐨 " + facts[fi % facts.length]);
      fi++;
    });
  }

  /* ---------- easter egg 2: Konami code ---------- */
  var seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  var pos = 0;
  window.addEventListener("keydown", function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === seq[pos]) {
      pos++;
      if (pos === seq.length) {
        pos = 0;
        document.body.classList.add("party");
        toast("🎉 Koala party mode unlocked! Thanks for snooping around.");
        partyLeaves();
      }
    } else {
      pos = (k === seq[0]) ? 1 : 0;
    }
  });
  function partyLeaves() {
    if (!field || prefersReduced) return;
    var emojis = ["🐨","🌿","🎉","🍃","✨"];
    for (var i = 0; i < 30; i++) {
      var l = document.createElement("span");
      l.className = "leaf";
      l.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      l.style.left = Math.random() * 100 + "vw";
      l.style.fontSize = (16 + Math.random() * 20) + "px";
      l.style.animationDuration = (5 + Math.random() * 5) + "s";
      field.appendChild(l);
      (function (node) { setTimeout(function () { node.remove(); }, 11000); })(l);
    }
  }

  /* ---------- console hello ---------- */
  try {
    console.log("%c🐨 G'day, fellow developer!", "font-size:18px;font-weight:bold;color:#4ade80");
    console.log("%cYou found the console. Try the Konami code on the page. — Kartavya", "color:#38bdf8");
  } catch (e) {}
})();
