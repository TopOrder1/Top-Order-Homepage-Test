(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ------------------------------------------------------------------
     Smooth scroll (Lenis) — desktop only, skipped for reduced motion
     ------------------------------------------------------------------ */
  var lenis = null;
  if (!reduceMotion && !isTouch && typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", hasGSAP && window.ScrollTrigger ? ScrollTrigger.update : undefined);
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    if (hasGSAP) {
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ------------------------------------------------------------------
     Header: scrolled state + mobile nav
     ------------------------------------------------------------------ */
  var header = document.getElementById("site-header");
  var lastScrolled = null;
  function onScroll() {
    var scrolled = window.scrollY > 12;
    if (scrolled !== lastScrolled && header) {
      header.classList.toggle("is-scrolled", scrolled);
      lastScrolled = scrolled;
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navToggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
      });
    });
  }

  /* ------------------------------------------------------------------
     Cursor glow (desktop, non-touch, motion allowed)
     ------------------------------------------------------------------ */
  var glow = document.getElementById("cursor-glow");
  if (glow && hasGSAP && !reduceMotion && !isTouch) {
    var glowX = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3" });
    var glowY = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3" });
    window.addEventListener("pointermove", function (e) {
      glowX(e.clientX);
      glowY(e.clientY);
    });
  } else if (glow) {
    glow.style.display = "none";
  }

  /* ------------------------------------------------------------------
     Fallback: no GSAP (CDN failed / offline) — reveal everything
     ------------------------------------------------------------------ */
  if (!hasGSAP) {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.style.opacity = 1;
    });
    return;
  }

  /* ------------------------------------------------------------------
     Reduced motion: static, fully visible, no scroll hijacking
     ------------------------------------------------------------------ */
  if (reduceMotion) {
    document.documentElement.classList.add("reduced-motion");
    gsap.set("[data-reveal]", { opacity: 1, y: 0 });
    gsap.set(".hero-title .line-inner", { y: 0 });
    gsap.set(".ring-outer, .ring-mid, .ring-inner", { strokeDashoffset: 0 });
    gsap.set(".hero-crest, .hero-badge", { opacity: 1, scale: 1, y: 0 });
    document.querySelectorAll("[data-count-to]").forEach(function (el) {
      var decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
      el.textContent = parseFloat(el.getAttribute("data-count-to")).toFixed(decimals) + (el.getAttribute("data-suffix") || "");
    });
    return;
  }

  /* ------------------------------------------------------------------
     Hero entrance timeline
     ------------------------------------------------------------------ */
  gsap.set(".hero-title .line-inner", { yPercent: 120 });
  gsap.set([".hero-eyebrow", ".hero-lede", ".hero-cta-row", ".hero-stats"], { opacity: 0, y: 22 });
  gsap.set(".hero-crest", { opacity: 0, scale: 0.85 });
  gsap.set(".hero-badge", { opacity: 0, y: 16 });

  var heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });

  heroTl
    .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
    .to(".hero-title .line-inner", { yPercent: 0, duration: 1, stagger: 0.09 }, 0.15)
    .to(".hero-lede", { opacity: 1, y: 0, duration: 0.8 }, 0.55)
    .to(".hero-cta-row", { opacity: 1, y: 0, duration: 0.8 }, 0.68)
    .to(".hero-stats", { opacity: 1, y: 0, duration: 0.8 }, 0.8)
    .to(".ring-outer", { strokeDashoffset: 0, duration: 1.6, ease: "power3.out" }, 0.35)
    .to(".ring-mid", { strokeDashoffset: 0, duration: 1.6, ease: "power3.out" }, 0.5)
    .to(".ring-inner", { strokeDashoffset: 0, duration: 1.6, ease: "power3.out" }, 0.65)
    .to(".hero-crest", { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)" }, 0.7)
    .to(".hero-badge", { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 }, 1.1)
    .add(function () {
      gsap.to(".hero-badge-1", { y: -10, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".hero-badge-2", { y: -10, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5 });
      gsap.to(".hero-badge-3", { y: -10, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
      gsap.to(".hero-ring-svg", { rotate: 360, duration: 90, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
    });

  /* ------------------------------------------------------------------
     Scroll reveals: single elements
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-reveal]").forEach(function (el) {
    if (el.closest(".hero")) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  });

  /* ------------------------------------------------------------------
     Scroll reveals: staggered grids
     ------------------------------------------------------------------ */
  [
    "#service-grid",
    "#steps-grid",
  ].forEach(function (sel) {
    var grid = document.querySelector(sel);
    if (!grid) return;
    var items = grid.children;
    gsap.fromTo(
      items,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.09,
        scrollTrigger: { trigger: grid, start: "top 85%", once: true },
      }
    );
  });

  /* ------------------------------------------------------------------
     Stat counters
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-count-to]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
    var counter = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: function () {
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = counter.val.toFixed(decimals) + suffix;
          },
        });
      },
    });
  });

  /* ------------------------------------------------------------------
     Magnetic primary buttons (desktop only)
     ------------------------------------------------------------------ */
  if (!isTouch) {
    document.querySelectorAll(".btn-primary").forEach(function (btn) {
      var moveX = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
      var moveY = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
      btn.addEventListener("pointermove", function (e) {
        var rect = btn.getBoundingClientRect();
        moveX((e.clientX - rect.left - rect.width / 2) * 0.25);
        moveY((e.clientY - rect.top - rect.height / 2) * 0.35);
      });
      btn.addEventListener("pointerleave", function () {
        moveX(0);
        moveY(0);
      });
    });
  }

  /* ------------------------------------------------------------------
     Contact form: inline validation + mailto handoff
     ------------------------------------------------------------------ */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var errorId = field.id + "-error";
        var existing = document.getElementById(errorId);
        if (existing) existing.remove();

        if (!field.value.trim()) {
          valid = false;
          var msg = document.createElement("p");
          msg.id = errorId;
          msg.className = "field-error";
          msg.setAttribute("role", "alert");
          msg.textContent = "This field is required.";
          field.insertAdjacentElement("afterend", msg);
          field.setAttribute("aria-invalid", "true");
        } else {
          field.removeAttribute("aria-invalid");
        }
      });

      var status = document.getElementById("form-status");
      if (!valid) {
        if (status) status.textContent = "Please fill in the highlighted fields.";
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var data = new FormData(form);
      var name = (data.get("name") || "").toString();
      var email = (data.get("email") || "").toString();
      var phone = (data.get("phone") || "").toString();
      var projectType = (data.get("project-type") || "").toString();
      var message = (data.get("message") || "").toString();

      var subject = "New enquiry from " + (name || "website contact form");
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Project type: " + projectType + "\n\n" +
        message;

      window.location.href =
        "mailto:simon@toporderdigital.com.au" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (status) status.textContent = "Opening your email app to send this through — thanks!";
    });
  }
})();
