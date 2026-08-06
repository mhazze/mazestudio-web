/* mazestudio · app.js — GENERADO por build.mjs. NO editar a mano.
   Fuente: WEB/src/mazestudio-web.html · regenerar: npm run build */
/* MZLASTMOD:2026-08-06 */
(function(){
(function() {
  const { useRef, useState, useEffect } = React;
  function FadingVideo({ src, poster, preload, style }) {
    const ref = useRef(null);
    const [playing, setPlaying] = useState(false);
    const defer = !!window.__preloaderActive;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    useEffect(() => {
      if (reduced) return;
      const v = ref.current;
      if (!v) return;
      const onPlaying = () => setPlaying(true);
      v.addEventListener("playing", onPlaying);
      const start = () => {
        v.load();
        v.play().catch(() => {
        });
      };
      if (defer) {
        window.addEventListener("preloader-done", start, { once: true });
        return () => {
          window.removeEventListener("preloader-done", start);
          v.removeEventListener("playing", onPlaying);
        };
      }
      v.play().catch(() => {
      });
      return () => v.removeEventListener("playing", onPlaying);
    }, [src]);
    const vp = {
      ref,
      src,
      muted: true,
      playsInline: true,
      preload: preload ?? (defer ? "none" : "auto"),
      loop: true,
      className: "hero-fade" + (playing ? " is-playing" : ""),
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0 }
    };
    if (!defer) vp.autoPlay = true;
    return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, overflow: "hidden", ...style } }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: poster,
        alt: "",
        "aria-hidden": "true",
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
      }
    ), !reduced && /* @__PURE__ */ React.createElement("video", { ...vp }));
  }
  window.FadingVideo = FadingVideo;
})();
})();

(function(){
window.IconArrow = function IconArrow() {
  return /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("line", { x1: "7", y1: "17", x2: "17", y2: "7" }), /* @__PURE__ */ React.createElement("polyline", { points: "7 7 17 7 17 17" }));
};
window.IconDownload = function IconDownload() {
  return /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M12 3v12" }), /* @__PURE__ */ React.createElement("polyline", { points: "7 11 12 16 17 11" }), /* @__PURE__ */ React.createElement("path", { d: "M4 20h16" }));
};
window.MazeLogo = function MazeLogo() {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 132 52", width: "72", height: "29", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M3 44 L3 31 L19 31 L19 15 L33 15 L33 35 L47 35 L47 9 L61 9 L61 27 L75 27 L75 44 L129 44",
      fill: "none",
      stroke: "white",
      strokeWidth: "3.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ), /* @__PURE__ */ React.createElement("circle", { cx: "3", cy: "44", r: "4", fill: "#1E1D2C", stroke: "white", strokeWidth: "2.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "33", cy: "15", r: "3.2", fill: "#1E1D2C", stroke: "white", strokeWidth: "2.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "47", cy: "9", r: "3.2", fill: "#1E1D2C", stroke: "white", strokeWidth: "2.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "75", cy: "44", r: "3.2", fill: "#1E1D2C", stroke: "white", strokeWidth: "2.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "129", cy: "44", r: "4.4", fill: "#4B8CF7", stroke: "none" }));
};
})();

(function(){
(function() {
  const { useEffect, useRef, useState } = React;
  const motion = window.Motion.motion;
  window.Reveal = function Reveal({ children, delay = 0, y = 26, style, className }) {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      if (ref.current) io.observe(ref.current);
      return () => io.disconnect();
    }, []);
    return /* @__PURE__ */ React.createElement(
      motion.div,
      {
        ref,
        className,
        initial: { y, filter: "blur(8px)" },
        animate: inView ? { y: 0, filter: "blur(0px)" } : {},
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        style
      },
      children
    );
  };
  const HR_CHARS = "\u2593\u2592\u2591#$%&/{}[]<>=+*_01";
  function hrDecode(el) {
    const orig = el.dataset.hrOrig || el.textContent;
    el.dataset.hrOrig = orig;
    const dur = 950, t0 = performance.now();
    el.classList.add("hr-caret");
    const frame = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const lock = Math.floor(p * orig.length);
      let txt = orig.slice(0, lock);
      for (let i = lock; i < orig.length; i++)
        txt += orig[i] === " " ? " " : HR_CHARS[Math.random() * HR_CHARS.length | 0];
      el.textContent = txt;
      if (p < 1) requestAnimationFrame(frame);
      else {
        el.textContent = orig;
        setTimeout(() => el.classList.remove("hr-caret"), 650);
      }
    };
    requestAnimationFrame(frame);
  }
  function hrSplit(h2) {
    if (h2.dataset.hrSplit) return Array.from(h2.querySelectorAll(".hr-w"));
    const process = (node) => {
      const frag = document.createDocumentFragment();
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(" "));
              return;
            }
            const wm = document.createElement("span");
            wm.className = "hr-wm";
            const w = document.createElement("span");
            w.className = "hr-w";
            w.textContent = part;
            wm.appendChild(w);
            frag.appendChild(wm);
          });
        } else if (child.nodeType === 1 && child.tagName === "EM") {
          const em = document.createElement("em");
          em.appendChild(process(child));
          frag.appendChild(em);
        } else if (child.nodeType === 1) {
          frag.appendChild(child.cloneNode(true));
        }
      });
      return frag;
    };
    const out = process(h2);
    h2.textContent = "";
    h2.appendChild(out);
    h2.classList.add("hr-split");
    h2.dataset.hrSplit = "1";
    return Array.from(h2.querySelectorAll(".hr-w"));
  }
  window.HeadReveal = function HeadReveal({ children, delay = 0, y = 18, style, className }) {
    const ref = useRef(null);
    React.useLayoutEffect(() => {
      const el = ref.current;
      if (!el || !window.gsap || !window.ScrollTrigger) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const items = el.children.length ? Array.from(el.children) : [el];
      const h2 = el.querySelector(":scope > h2");
      const olh = el.querySelector(":scope > .hr-olh");
      const kicker = items.find((n) => n !== h2 && n.tagName === "P" && /^\s*\/\//.test(n.textContent));
      const others = items.filter((n) => n !== h2 && n !== kicker && n !== olh);
      const ctx = window.gsap.context(() => {
        const words = h2 ? hrSplit(h2) : [];
        const ems = h2 ? Array.from(h2.querySelectorAll("em")) : olh ? Array.from(olh.querySelectorAll(".hr-olfill em")) : [];
        const fill = olh ? olh.querySelector(".hr-olfill") : null;
        const beam = olh ? olh.querySelector(".hr-olbeam") : null;
        if (kicker) window.gsap.set(kicker, { y: 14 });
        if (words.length) window.gsap.set(words, { yPercent: 12, rotation: 4, transformOrigin: "0% 100%" });
        if (fill) window.gsap.set(fill, { clipPath: "inset(-10% 102% -10% -2%)" });
        if (others.length) window.gsap.set(others, { y });
        const tl = window.gsap.timeline({
          delay,
          scrollTrigger: { trigger: el, start: "top 84%", once: true }
        });
        if (kicker) {
          tl.to(kicker, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0);
          tl.call(() => hrDecode(kicker), null, 0.02);
        }
        if (words.length) {
          tl.to(words, { yPercent: 0, rotation: 0, duration: 0.85, ease: "expo.out", stagger: 0.07, clearProps: "transform" }, 0.1);
          if (ems.length) tl.call(() => ems.forEach((e) => e.classList.add("hr-ignite")), null, 1.05);
        }
        if (olh) {
          tl.to(olh, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.15);
          if (fill) {
            tl.to(fill, { clipPath: "inset(-10% -2% -10% -2%)", duration: 1.15, ease: "power2.inOut" }, 0.7);
            tl.set(fill, { clearProps: "clipPath" }, 1.95);
          }
          if (beam) {
            tl.to(beam, { opacity: 1, duration: 0.12, ease: "none" }, 0.7);
            tl.fromTo(beam, { left: "-2%" }, { left: "102%", duration: 1.15, ease: "power2.inOut" }, 0.7);
            tl.to(beam, { opacity: 0, duration: 0.15, ease: "none" }, 1.72);
          }
          if (ems.length) tl.call(() => ems.forEach((e) => e.classList.add("hr-ignite")), null, 1.6);
        }
        if (others.length) {
          tl.to(others, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09 }, olh ? 1.35 : 0.55);
        }
      }, ref);
      return () => ctx.revert();
    }, []);
    return /* @__PURE__ */ React.createElement("div", { ref, className, style }, children);
  };
  window.IconExternal = function IconExternal() {
    return /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("line", { x1: "7", y1: "17", x2: "17", y2: "7" }), /* @__PURE__ */ React.createElement("polyline", { points: "7 7 17 7 17 17" }));
  };
  window.IconCheck = function IconCheck() {
    return /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 13l4 4L19 7" }));
  };
})();
})();

(function(){
(function() {
  const { useEffect } = React;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  window.ScrollFX = function ScrollFX() {
    useEffect(() => {
      if (window.ScrollTrigger) window.ScrollTrigger.config({ ignoreMobileResize: true });
      const bar = document.getElementById("scrollProgress");
      let raf = null;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const h = document.documentElement;
          const max = h.scrollHeight - h.clientHeight;
          const p = max > 0 ? (h.scrollTop || window.scrollY) / max : 0;
          if (bar) bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
          raf = null;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      const ctx = window.gsap && window.ScrollTrigger && !reduced && !coarse ? window.gsap.context(() => {
        document.querySelectorAll(".fx-glow").forEach((el) => {
          const depth = parseFloat(el.dataset.depth || "0.18");
          window.gsap.to(el, {
            yPercent: depth * 100,
            ease: "none",
            scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true }
          });
        });
        document.querySelectorAll(".v2-h2").forEach((el) => {
          window.gsap.fromTo(el, { yPercent: 0 }, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true }
          });
        });
        document.querySelectorAll("[data-parallax]").forEach((el) => {
          const depth = parseFloat(el.dataset.parallax || "0");
          if (!depth) return;
          window.gsap.fromTo(el, { yPercent: 0 }, {
            yPercent: depth * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") || el,
              start: el.dataset.parallaxStart || "top bottom",
              end: el.dataset.parallaxEnd || "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          });
        });
      }) : null;
      const cleanups = [];
      if (!reduced && !coarse) {
        document.querySelectorAll(".magnetic").forEach((el) => {
          const move = (e) => {
            const r = el.getBoundingClientRect();
            const mx = e.clientX - (r.left + r.width / 2);
            const my = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate(${mx * 0.22}px, ${my * 0.3}px)`;
          };
          const leave = () => {
            el.style.transform = "translate(0,0)";
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }
      let rfTimer;
      const refresh = () => {
        clearTimeout(rfTimer);
        rfTimer = setTimeout(() => window.ScrollTrigger && window.ScrollTrigger.refresh(), 120);
      };
      window.__refreshST = refresh;
      window.addEventListener("load", refresh);
      setTimeout(refresh, 1400);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("load", refresh);
        clearTimeout(rfTimer);
        cleanups.forEach((fn) => fn());
        if (ctx) ctx.revert();
      };
    }, []);
    return null;
  };
})();
})();

(function(){
(function() {
  const { useEffect } = React;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.CinematicTransitions = function CinematicTransitions() {
    useEffect(() => {
      const desktop = window.matchMedia("(min-width:881px)").matches;
      if (reduced || !desktop || !window.gsap || !window.ScrollTrigger) return;
      const ctx = window.gsap.context(() => {
        const cta = document.querySelector("#contacto .cta-converge");
        if (cta) window.gsap.from(cta, {
          scale: 0.82,
          filter: "blur(10px)",
          ease: "power2.out",
          scrollTrigger: { trigger: "#contacto", start: "top 80%", end: "top 38%", scrub: 0.6, invalidateOnRefresh: true }
        });
      });
      if (window.__refreshST) window.__refreshST();
      return () => {
        ctx.revert();
      };
    }, []);
    return null;
  };
})();
})();

(function(){
(function() {
  const { useState } = React;
  const t = window.t;
  function LangToggle() {
    const isEn = window.MS_LANG === "en";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "lang-toggle",
        "aria-label": isEn ? t("Cambiar a espa\xF1ol") : t("Switch to English"),
        onClick: () => {
          try {
            localStorage.setItem("mz_lang", isEn ? "es" : "en");
          } catch (e) {
          }
          const local = location.protocol === "file:";
          location.href = isEn ? local ? "mazestudio-web.html" : "/" : local ? "en.html" : "/en";
        }
      },
      /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M3 12h18M12 3c2.6 2.9 2.6 15.1 0 18M12 3c-2.6 2.9-2.6 15.1 0 18" })),
      /* @__PURE__ */ React.createElement("span", { className: "lang-toggle-txt" }, isEn ? "ES" : "EN")
    );
  }
  window.Navbar = function Navbar() {
    const [open, setOpen] = useState(false);
    const links = [
      { label: t("C\xF3mo funciona"), href: "#como" },
      { label: t("Ahorro"), href: "#roi" },
      { label: t("Servicios"), href: "#servicios" },
      { label: t("Diagn\xF3stico"), href: "#diagnostico" }
    ];
    return /* @__PURE__ */ React.createElement("nav", { className: "v2nav", style: {
      position: "fixed",
      top: 16,
      left: 0,
      right: 0,
      zIndex: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 clamp(16.8px,4vw,42px)"
    } }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "#top",
        className: "lg v2nav-brand",
        style: { display: "flex", alignItems: "center", gap: 10, borderRadius: 9999, padding: "8px 14px" }
      },
      /* @__PURE__ */ React.createElement(window.MazeLogo, null),
      /* @__PURE__ */ React.createElement("span", { className: "v2nav-brand-txt", style: {
        fontFamily: "Bricolage Grotesque",
        fontWeight: 600,
        fontSize: 17.8,
        color: "#EAE8F2",
        letterSpacing: "-.02em",
        whiteSpace: "nowrap"
      } }, "Maze studio", /* @__PURE__ */ React.createElement("span", { style: { color: "#4B8CF7" } }, "."))
    ), /* @__PURE__ */ React.createElement("div", { className: "lg v2nav-links", style: { display: "flex", alignItems: "center", borderRadius: 9999, padding: "6px 6px", gap: 2 } }, links.map((l) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: l.href,
        href: l.href,
        className: "nav-link",
        style: {
          fontFamily: "Bricolage Grotesque",
          fontSize: 13.6,
          fontWeight: 500,
          color: "rgba(234,232,242,.88)",
          padding: "8px 12px",
          borderRadius: 9999,
          whiteSpace: "nowrap",
          transition: "background .18s"
        }
      },
      l.label
    )), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "hablemos.html",
        style: {
          fontFamily: "Bricolage Grotesque",
          fontSize: 13.6,
          fontWeight: 600,
          background: "white",
          color: "#0B0A12",
          padding: "8px 18px",
          borderRadius: 9999,
          whiteSpace: "nowrap",
          marginLeft: 4
        }
      },
      t("Hablemos \u2192")
    )), /* @__PURE__ */ React.createElement("div", { className: "v2nav-right", style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(LangToggle, null), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "lg v2nav-burger",
        "aria-label": t("Abrir men\xFA"),
        "aria-expanded": open,
        onClick: () => setOpen((o) => !o),
        style: {
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          width: 46,
          height: 46,
          borderRadius: 9999,
          border: "none",
          background: "rgba(255,255,255,.015)",
          color: "#fff",
          cursor: "pointer"
        }
      },
      /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, open ? /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }), /* @__PURE__ */ React.createElement("line", { x1: "6", y1: "18", x2: "18", y2: "6" })) : /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "12", x2: "21", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "18", x2: "21", y2: "18" })))
    )), open && /* @__PURE__ */ React.createElement("div", { className: "lg", style: {
      position: "absolute",
      top: 66,
      left: "clamp(16.8px,4vw,42px)",
      right: "clamp(16.8px,4vw,42px)",
      borderRadius: 18,
      padding: 10,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      zIndex: 70
    } }, links.map((l) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: l.href,
        href: l.href,
        onClick: () => setOpen(false),
        style: { fontFamily: "Bricolage Grotesque", fontSize: 15.7, fontWeight: 500, color: "#EAE8F2", padding: "14px 14px", borderRadius: 12 }
      },
      l.label
    )), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "hablemos.html",
        onClick: () => setOpen(false),
        style: {
          fontFamily: "Bricolage Grotesque",
          fontSize: 15.7,
          fontWeight: 600,
          background: "#fff",
          color: "#0B0A12",
          padding: "14px 14px",
          borderRadius: 12,
          textAlign: "center",
          marginTop: 6
        }
      },
      t("Hablemos \u2192")
    )));
  };
})();
})();

(function(){
(function() {
  const { useRef, useState, useEffect } = React;
  const MOVIL = window.matchMedia("(max-width:860px)").matches;
  const HERO_VIDEO = MOVIL ? "assets/referencias/referencia-cubo-cristal-01-movil-loop.mp4" : "assets/referencias/referencia-cubo-cristal-01-4k60-loop.mp4";
  const HERO_POSTER = MOVIL ? "assets/referencias/poster-cubo-carga-movil.jpg" : "assets/referencias/poster-cubo-carga.jpg";
  const HERO_WORD = "Mazestudio";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const enableMagnet = !reducedMotion && !coarsePointer;
  window.HeroSection = function HeroSection() {
    const ctaRef = useRef(null);
    const faceRef = useRef(null);
    const [ready, setReady] = useState(!window.__preloaderActive);
    useEffect(() => {
      if (ready) return;
      if (!window.__preloaderActive) {
        setReady(true);
        return;
      }
      const onDone = () => setReady(true);
      window.addEventListener("preloader-done", onDone, { once: true });
      return () => window.removeEventListener("preloader-done", onDone);
    }, []);
    const onCtaMove = (e) => {
      const el = ctaRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${mx * 0.22}px, ${my * 0.3}px)`;
      if (faceRef.current) {
        faceRef.current.style.setProperty("--mx", (e.clientX - r.left) / r.width * 100 + "%");
        faceRef.current.style.setProperty("--my", (e.clientY - r.top) / r.height * 100 + "%");
      }
    };
    const onCtaLeave = () => {
      if (ctaRef.current) ctaRef.current.style.transform = "translate(0,0)";
    };
    return /* @__PURE__ */ React.createElement("section", { id: "top", style: { position: "relative", width: "100%", height: "100svh", minHeight: 640, background: "#08070C", overflow: "hidden" } }, /* @__PURE__ */ React.createElement(window.FadingVideo, { src: HERO_VIDEO, poster: HERO_POSTER, style: { zIndex: 0 } }), /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      inset: 0,
      zIndex: 1,
      pointerEvents: "none",
      background: "radial-gradient(60% 50% at 50% 46%, rgba(8,7,12,.2), rgba(8,7,12,.72) 72%), linear-gradient(180deg, rgba(8,7,12,.72) 0%, rgba(8,7,12,.22) 22%, rgba(8,7,12,.3) 62%, rgba(8,7,12,.86) 100%)"
    } }), /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      zIndex: 2,
      borderRadius: "50%",
      pointerEvents: "none",
      filter: "blur(90px)",
      width: "min(64vw,900px)",
      height: "min(40vw,560px)",
      left: "50%",
      top: "44%",
      transform: "translate(-50%,-50%)",
      background: "radial-gradient(ellipse at center,rgba(75,140,247,.34),transparent 70%)",
      opacity: 0.85
    } }), /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      zIndex: 2,
      borderRadius: "50%",
      pointerEvents: "none",
      filter: "blur(90px)",
      width: "min(46vw,620px)",
      height: "min(46vw,620px)",
      left: "50%",
      top: "40%",
      transform: "translate(-50%,-50%)",
      background: "radial-gradient(circle at center,rgba(99,80,170,.28),transparent 68%)",
      opacity: 0.7
    } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%" } }, /* @__PURE__ */ React.createElement(window.Navbar, null), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "hero-body" + (ready ? " hero-ready" : ""),
        "data-parallax": "-0.16",
        "data-parallax-start": "top top",
        "data-parallax-end": "bottom top",
        style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", willChange: "transform" }
      },
      /* @__PURE__ */ React.createElement("div", { className: "hero-title", role: "img", "aria-label": HERO_WORD + "." }, HERO_WORD.split("").map((ch, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "hw", style: { "--i": i, ...i === 4 ? { marginLeft: ".16em" } : {} }, "aria-hidden": "true" }, ch)), /* @__PURE__ */ React.createElement("span", { className: "hero-marble", style: { "--i": HERO_WORD.length }, "aria-hidden": "true" })),
      /* @__PURE__ */ React.createElement("h1", { className: "hero-sub" }, window.t("Consultor\xEDa e integraci\xF3n de IA "), /* @__PURE__ */ React.createElement("span", { className: "hero-sub-accent" }, window.t("para pymes en Tenerife"))),
      /* @__PURE__ */ React.createElement("div", { className: "hero-cta-row" }, /* @__PURE__ */ React.createElement(
        "a",
        {
          ref: ctaRef,
          href: "hablemos.html",
          className: "btn-glow",
          ...enableMagnet ? { onPointerMove: onCtaMove, onPointerLeave: onCtaLeave } : {}
        },
        /* @__PURE__ */ React.createElement("span", { ref: faceRef, className: "btn-glow-face" }, window.t("Solicita tu auditor\xEDa gratis"), /* @__PURE__ */ React.createElement("span", { className: "btn-glow-arrow", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(window.IconArrow, null)))
      ))
    )));
  };
})();
})();

(function(){
(function() {
  const { useEffect, useRef } = React;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.LineaRectaSection = function LineaRectaSection() {
    const secRef = useRef(null);
    const stageRef = useRef(null);
    const pathRef = useRef(null);
    const nodeRef = useRef(null);
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const ghostRef = useRef(null);
    const topRef = useRef(null);
    const botRef = useRef(null);
    useEffect(() => {
      const path = pathRef.current, node = nodeRef.current, ring = ringRef.current, dot = dotRef.current, stage = stageRef.current, ghost = ghostRef.current, top = topRef.current, bot = botRef.current;
      if (!path) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      const place = (frac) => {
        const pt = path.getPointAtLength(len * frac);
        dot.setAttribute("cx", pt.x);
        dot.setAttribute("cy", pt.y);
      };
      const setFinal = () => {
        path.style.strokeDashoffset = 0;
        if (node) {
          node.setAttribute("r", "13");
          node.style.opacity = 1;
        }
        if (ring) {
          ring.setAttribute("r", "26");
          ring.style.opacity = 1;
        }
        if (dot) {
          place(1);
          dot.style.opacity = 1;
        }
        if (ghost) ghost.style.opacity = 0.3;
        if (top) top.style.opacity = 1;
        if (bot) bot.style.opacity = 1;
        if (stage) stage.querySelectorAll(".lr-wp").forEach((wp) => {
          wp.setAttribute("r", "5.5");
          wp.style.opacity = 1;
        });
      };
      if (reduced || !window.gsap || !window.ScrollTrigger) {
        setFinal();
        return;
      }
      const lite = window.matchMedia("(max-width:860px)").matches;
      const ctx = window.gsap.context(() => {
        const tl = window.gsap.timeline({
          // termina ANTES de que la columna quede centrada, para poder leerlo todo ya completo
          scrollTrigger: lite ? { trigger: stage, start: "top 78%", once: true } : { trigger: stage, start: "top 88%", end: "center 65%", scrub: 1 }
        });
        tl.fromTo(path, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);
        const proxy = { p: 0 };
        tl.fromTo(proxy, { p: 0 }, { p: 1, duration: 1, ease: "none", onUpdate() {
          place(proxy.p);
        } }, 0);
        tl.fromTo(dot, { opacity: 0 }, { opacity: 1, duration: 0.05, ease: "none" }, 0);
        if (ghost) tl.fromTo(ghost, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "none" }, 0).to(ghost, { opacity: 0.3, duration: 0.5, ease: "none" }, 0.3);
        stage.querySelectorAll(".lr-wp").forEach((wp) => {
          const f = parseFloat(wp.dataset.frac || "0");
          tl.fromTo(
            wp,
            { opacity: 0, attr: { r: 0 } },
            { opacity: 1, attr: { r: 5.5 }, duration: 0.07, ease: "back.out(3)" },
            Math.max(0, f - 0.015)
          );
        });
        if (top) tl.fromTo(top, { opacity: 0, attr: { y: 48 } }, { opacity: 1, attr: { y: 58 }, duration: 0.16, ease: "power2.out" }, 0.03);
        tl.fromTo(node, { opacity: 0, attr: { r: 0 } }, { opacity: 1, attr: { r: 13 }, duration: 0.2, ease: "back.out(2.4)" }, 0.82);
        if (ring) tl.fromTo(ring, { opacity: 0, attr: { r: 8 } }, { opacity: 1, attr: { r: 26 }, duration: 0.2, ease: "power2.out" }, 0.82);
        if (bot) tl.fromTo(bot, { opacity: 0, attr: { y: 886 } }, { opacity: 1, attr: { y: 878 }, duration: 0.16, ease: "power2.out" }, 0.84);
        if (lite) tl.duration(2.8);
      }, stage);
      return () => ctx.revert();
    }, []);
    return /* @__PURE__ */ React.createElement("section", { ref: secRef, id: "idea", className: "lr-sec" }, /* @__PURE__ */ React.createElement("div", { className: "lr-blob", style: { width: 460, height: 460, left: "-8%", top: "2%", background: "rgba(99,80,170,.42)", animation: "lrFloat1 14s ease-in-out infinite" } }), /* @__PURE__ */ React.createElement("div", { className: "lr-blob", style: { width: 420, height: 420, right: "-6%", bottom: "-8%", background: "rgba(75,140,247,.4)", animation: "lrFloat2 17s ease-in-out infinite" } }), /* @__PURE__ */ React.createElement("div", { className: "lr-inner" }, /* @__PURE__ */ React.createElement(window.Reveal, null, /* @__PURE__ */ React.createElement("span", { className: "lr-kicker" }, window.t("// la idea, en una imagen")), /* @__PURE__ */ React.createElement("h2", { className: "lr-title" }, window.t("De lo enredado a lo simple. "), /* @__PURE__ */ React.createElement("em", null, window.t("Una l\xEDnea recta.")))), /* @__PURE__ */ React.createElement("div", { className: "lr-flank" }, /* @__PURE__ */ React.createElement("div", { ref: stageRef, className: "lr-stage" }, /* @__PURE__ */ React.createElement("svg", { className: "lr-svg", viewBox: "0 0 300 900", preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "lr-grad-v", gradientUnits: "userSpaceOnUse", x1: "150", y1: "96", x2: "150", y2: "840" }, /* @__PURE__ */ React.createElement("stop", { offset: "0", stopColor: "#6E6D7E" }), /* @__PURE__ */ React.createElement("stop", { offset: "0.34", stopColor: "#4B8CF7" }), /* @__PURE__ */ React.createElement("stop", { offset: "1", stopColor: "#86E6FF" }))), /* @__PURE__ */ React.createElement("text", { ref: topRef, className: "lr-axis-top", x: "150", y: "58", textAnchor: "middle", style: { opacity: 0 } }, window.t("ENREDADO")), /* @__PURE__ */ React.createElement("g", { ref: ghostRef, style: { opacity: 0 } }, /* @__PURE__ */ React.createElement("path", { className: "maze-ghost", d: "M70 140 V220 H180 V170 H120 V274" }), /* @__PURE__ */ React.createElement("path", { className: "maze-ghost", d: "M214 132 V214 H90 V292 H172" }), /* @__PURE__ */ React.createElement("path", { className: "maze-ghost", d: "M150 116 V152 H58 V206" })), /* @__PURE__ */ React.createElement(
      "path",
      {
        ref: pathRef,
        className: "maze-path",
        d: "M150 96 H60 V170 H240 V126 H96 V236 H210 V296 H130 V360 H150 V840"
      }
    ), /* @__PURE__ */ React.createElement("circle", { className: "lr-wp", cx: "240", cy: "170", r: "5.5", "data-frac": "0.236" }), /* @__PURE__ */ React.createElement("circle", { className: "lr-wp", cx: "96", cy: "126", r: "5.5", "data-frac": "0.364" }), /* @__PURE__ */ React.createElement("circle", { className: "lr-wp", cx: "210", cy: "236", r: "5.5", "data-frac": "0.518" }), /* @__PURE__ */ React.createElement("circle", { className: "lr-wp", cx: "130", cy: "296", r: "5.5", "data-frac": "0.614" }), /* @__PURE__ */ React.createElement("circle", { ref: ringRef, cx: "150", cy: "840", r: "26", fill: "none", stroke: "rgba(134,230,255,.4)", strokeWidth: "1.5", style: { opacity: 0 } }), /* @__PURE__ */ React.createElement("circle", { ref: nodeRef, className: "maze-node", cx: "150", cy: "840", r: "13", fill: "#86E6FF", style: { opacity: 0 } }), /* @__PURE__ */ React.createElement("circle", { ref: dotRef, className: "lr-traveldot", cx: "150", cy: "96", r: "7", style: { opacity: 0 } }), /* @__PURE__ */ React.createElement("text", { ref: botRef, className: "lr-axis-bot", x: "150", y: "878", textAnchor: "middle", style: { opacity: 0 } }, window.t("RESUELTO")))))));
  };
})();
})();

(function(){
(function() {
  const TOOLS = [
    // auto-alojados en assets/integraciones/ (descargados de simpleicons.org,
    // CC0). Antes se pedían a cdn.simpleicons.org en caliente: eso contradecía
    // la política de cero-terceros del resto del sitio y mandaba la IP de cada
    // visitante a un CDN ajeno sin consentimiento. Para actualizarlos:
    // Invoke-WebRequest https://cdn.simpleicons.org/<slug> -OutFile <slug>.svg
    { name: "Gmail", icon: "assets/integraciones/gmail.svg" },
    { name: "Google Calendar", icon: "assets/integraciones/googlecalendar.svg" },
    { name: "Google Sheets", icon: "assets/integraciones/googlesheets.svg" },
    { name: "Google Drive", icon: "assets/integraciones/googledrive.svg" },
    { name: "WhatsApp", icon: "assets/integraciones/whatsapp.svg" },
    { name: "Notion", icon: "assets/integraciones/notion.svg" },
    { name: "Stripe", icon: "assets/integraciones/stripe.svg" },
    { name: "Cal.com", icon: "assets/integraciones/caldotcom.svg" },
    { name: "n8n", icon: "assets/integraciones/n8n.svg" },
    { name: "HubSpot", icon: "assets/integraciones/hubspot.svg" },
    { name: "Telegram", icon: "assets/integraciones/telegram.svg" },
    { name: "Make", icon: "assets/integraciones/make.svg" }
  ];
  const { useEffect, useRef } = React;
  window.MarqueeSection = function MarqueeSection() {
    const row = [...TOOLS, ...TOOLS];
    const maskRef = useRef(null);
    useEffect(() => {
      const el = maskRef.current;
      if (!el) return;
      const isTouch = window.matchMedia("(hover:none) and (pointer:coarse)").matches;
      if (!isTouch) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let raf, paused = false, resumeTimer, lastT = null;
      let pos = el.scrollLeft;
      const PX_S = 48;
      const tick = (t) => {
        if (lastT === null) lastT = t;
        const dt = (t - lastT) / 1e3;
        lastT = t;
        if (!paused) {
          const half = el.scrollWidth / 2;
          if (half > 0) {
            pos = (pos + PX_S * dt) % half;
            el.scrollLeft = pos;
          }
        } else {
          pos = el.scrollLeft;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      const onStart = () => {
        paused = true;
        clearTimeout(resumeTimer);
      };
      const onEnd = () => {
        resumeTimer = setTimeout(() => {
          paused = false;
        }, 2600);
      };
      el.addEventListener("touchstart", onStart, { passive: true });
      el.addEventListener("touchend", onEnd, { passive: true });
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(resumeTimer);
        el.removeEventListener("touchstart", onStart);
        el.removeEventListener("touchend", onEnd);
      };
    }, []);
    return /* @__PURE__ */ React.createElement("div", { className: "mq-sec" }, /* @__PURE__ */ React.createElement("p", { className: "mq-head" }, /* @__PURE__ */ React.createElement("span", { className: "mk" }, "//"), " ", window.t("nos conectamos a lo que ya usas "), /* @__PURE__ */ React.createElement("em", null, window.t("\u2014 sin migrar de software"))), /* @__PURE__ */ React.createElement("div", { className: "mq-mask", ref: maskRef }, /* @__PURE__ */ React.createElement("div", { className: "mq-track" }, row.map((t, i) => /* @__PURE__ */ React.createElement("span", { className: "mq-chip", key: i }, /* @__PURE__ */ React.createElement("img", { className: "mq-icon", src: t.icon, alt: "", "aria-hidden": "true", loading: "lazy" }), t.name)))));
  };
})();
})();

(function(){
(function() {
  const { useEffect, useRef, useState } = React;
  const Reveal = window.Reveal;
  const HeadReveal = window.HeadReveal;
  const PARES = [
    ["Correos que se acumulan sin responder", "Cada mensaje clasificado y respondido solo"],
    ["Facturas y albaranes que se traspapelan", "Facturas generadas y archivadas sin tocar nada"],
    ["Citas y reservas apuntadas a mano", "Reservas con disponibilidad real y recordatorios"],
    ["Datos copiados de una app a otra", "Tus herramientas sincronizadas entre ellas"],
    ["Tareas que dependen de que te acuerdes", "Funciona 24/7, aunque t\xFA no est\xE9s"]
  ].map(([a, d]) => [window.t(a), window.t(d)]);
  window.ServiciosSection = function ServiciosSection() {
    const [after, setAfter] = useState(false);
    const [hintOff, setHintOff] = useState(false);
    const secRef = useRef(null);
    const panelRef = useRef(null);
    const manualRef = useRef(false);
    const timersRef = useRef([]);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    useEffect(() => {
      const el = secRef.current;
      if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          setAfter(true);
          setHintOff(true);
          return;
        }
        timersRef.current.push(setTimeout(() => {
          if (!manualRef.current) setAfter(true);
        }, 2200));
        timersRef.current.push(setTimeout(() => {
          if (manualRef.current) return;
          timersRef.current.push(setInterval(() => {
            if (!manualRef.current) setAfter((a) => !a);
          }, 5200));
        }, 2300));
      }, { threshold: 0.35 });
      io.observe(el);
      return () => {
        io.disconnect();
        timersRef.current.forEach((t) => {
          clearTimeout(t);
          clearInterval(t);
        });
      };
    }, []);
    useEffect(() => {
      if (!after || reduced) return;
      const p = panelRef.current;
      if (!p) return;
      p.classList.remove("sweep");
      void p.offsetWidth;
      p.classList.add("sweep");
    }, [after]);
    const onToggle = () => {
      manualRef.current = true;
      timersRef.current.forEach((t) => {
        clearTimeout(t);
        clearInterval(t);
      });
      timersRef.current = [];
      setHintOff(true);
      setAfter((a) => !a);
    };
    return /* @__PURE__ */ React.createElement(
      "section",
      {
        id: "servicios",
        ref: secRef,
        className: after ? "is-after" : void 0,
        style: { position: "relative", zIndex: 1, minHeight: "100svh", background: "#08070C", overflow: "hidden" }
      },
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 } }, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: "assets/referencias/imagen-cubo-cristal.webp",
          alt: "",
          "aria-hidden": "true",
          className: "img-fade-in",
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0 }
        }
      )),
      /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(8,7,12,.72) 0%, rgba(8,7,12,.38) 26%, rgba(8,7,12,.8) 60%, rgba(8,7,12,.92) 100%)"
      } }),
      /* @__PURE__ */ React.createElement("div", { className: "ba-halo", style: { zIndex: 1 } }),
      /* @__PURE__ */ React.createElement("div", { style: {
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        padding: "96px clamp(21px,6vw,84px) 64px"
      } }, /* @__PURE__ */ React.createElement(HeadReveal, { style: { textAlign: "center", marginBottom: "clamp(36px,6vh,64px)" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "JetBrains Mono", fontSize: 13.6, color: "rgba(255,255,255,.5)", marginBottom: 20 } }, window.t("// lo que cambia")), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque", color: "white", fontSize: "clamp(48.3px,7.5vw,100.8px)", lineHeight: 0.9, letterSpacing: "-3px" } }, window.t("Antes. Y despu\xE9s."))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.1, style: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%" } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "ba-switch",
          role: "switch",
          "aria-checked": after,
          onClick: onToggle,
          "aria-label": window.t("Cambiar entre a mano y en autom\xE1tico")
        },
        /* @__PURE__ */ React.createElement("span", { className: "ba-thumb", "aria-hidden": "true" }),
        /* @__PURE__ */ React.createElement("span", { className: "ba-opt o-before" }, /* @__PURE__ */ React.createElement("span", { className: "ba-ico" }, "\u2715"), window.t("A mano")),
        /* @__PURE__ */ React.createElement("span", { className: "ba-opt o-after" }, /* @__PURE__ */ React.createElement("span", { className: "ba-ico" }, "\u26A1"), window.t("En autom\xE1tico"))
      ), /* @__PURE__ */ React.createElement("p", { className: "ba-hint" + (hintOff ? " off" : "") }, window.t("pulsa el interruptor \u2014 o espera, cambia solo"))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.2, style: { width: "100%", display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "ba-panel", ref: panelRef }, /* @__PURE__ */ React.createElement("div", { className: "ba-tags" }, /* @__PURE__ */ React.createElement("span", { className: "ba-tag-before" }, window.t("// antes \xB7 a mano")), /* @__PURE__ */ React.createElement("span", { className: "ba-tag-after" }, window.t("// despu\xE9s \xB7 solo"))), /* @__PURE__ */ React.createElement("div", null, PARES.map(([antes, despues], i) => /* @__PURE__ */ React.createElement("div", { className: "ba-row", key: i }, /* @__PURE__ */ React.createElement("div", { className: "ba-flip", style: { "--d": i * 0.09 + "s" } }, /* @__PURE__ */ React.createElement("div", { className: "ba-face f-before" }, /* @__PURE__ */ React.createElement("span", { className: "ba-x" }, "\u2715"), /* @__PURE__ */ React.createElement("span", null, antes)), /* @__PURE__ */ React.createElement("div", { className: "ba-face f-after" }, /* @__PURE__ */ React.createElement("span", { className: "ba-check" }, /* @__PURE__ */ React.createElement(window.IconCheck, null)), /* @__PURE__ */ React.createElement("span", null, despues), i === PARES.length - 1 && /* @__PURE__ */ React.createElement("span", { className: "ba-247" }, "24/7")))))))))
    );
  };
})();
})();

(function(){
(function() {
  const { useState, useEffect, useRef } = React;
  const Reveal = window.Reveal;
  const HeadReveal = window.HeadReveal;
  const IC = {
    folder: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="23" height="16" rx="1" fill="#2D4ECC"/><rect x="2" y="10" width="23" height="16" rx="1" fill="#4361F0"/><path d="M2 10h11l2-4h10v4H2z" fill="#2D4ECC"/><path d="M2 10h10l2-4h9v4H2z" fill="#8295F2"/><rect x="2" y="10" width="23" height="3" rx="1" fill="#8295F2" opacity=".25"/><rect x="6" y="18" width="13" height="2" rx="1" fill="#ECEDF2" opacity=".55"/><rect x="6" y="21" width="9" height="2" rx="1" fill="#ECEDF2" opacity=".35"/><rect x="21" y="20" width="3" height="3" rx="1" fill="#8295F2" opacity=".5"/></svg>`,
    calendar: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="22" height="21" rx="1" fill="#2D4ECC"/><rect x="2" y="5" width="22" height="21" rx="1" fill="#4361F0"/><rect x="2" y="5" width="22" height="7" rx="1" fill="#8295F2"/><rect x="7" y="3" width="3" height="5" rx="1" fill="#ECEDF2"/><rect x="16" y="3" width="3" height="5" rx="1" fill="#ECEDF2"/><rect x="5" y="16" width="4" height="4" rx="1" fill="#ECEDF2" opacity=".7"/><rect x="11" y="16" width="4" height="4" rx="1" fill="#ECEDF2" opacity=".7"/><rect x="17" y="16" width="4" height="4" rx="1" fill="#8295F2"/><rect x="5" y="22" width="4" height="2" rx="1" fill="#ECEDF2" opacity=".4"/><rect x="11" y="22" width="4" height="2" rx="1" fill="#ECEDF2" opacity=".4"/></svg>`,
    mountain: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="24" height="24" rx="1" fill="#14161E"/><polygon points="15,6 24,22 6,22" fill="#2D4ECC"/><polygon points="8,12 20,26 2,26 2,22" fill="#4361F0"/><polygon points="15,6 18,13 12,13" fill="#ECEDF2" opacity=".85"/><polygon points="8,12 11,17 5,17" fill="#ECEDF2" opacity=".55"/><rect x="20" y="5" width="2" height="2" fill="#8295F2"/><rect x="5" y="7" width="2" height="2" fill="#8295F2" opacity=".6"/></svg>`,
    chat: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="22" height="17" rx="2" fill="#2D4ECC"/><rect x="2" y="4" width="22" height="17" rx="2" fill="#4361F0"/><rect x="2" y="4" width="22" height="4" rx="2" fill="#8295F2" opacity=".3"/><polygon points="6,21 14,21 6,27" fill="#2D4ECC"/><polygon points="5,20 13,20 5,26" fill="#4361F0"/><rect x="7" y="11" width="3" height="3" rx="1" fill="#ECEDF2" opacity=".85"/><rect x="12" y="11" width="3" height="3" rx="1" fill="#ECEDF2" opacity=".85"/><rect x="17" y="11" width="3" height="3" rx="1" fill="#8295F2" opacity=".6"/></svg>`,
    envelope: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="13" rx="1" fill="#2D4ECC"/><rect x="1" y="5" width="20" height="13" rx="1" fill="#4361F0"/><path d="M1 5l10 8 10-8" stroke="#8295F2" stroke-width="1.5" fill="none"/><path d="M1 18l7-6M21 18l-7-6" stroke="#8295F2" stroke-width="1" opacity=".4"/></svg>`,
    robot: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="11" y="1" width="2" height="4" fill="#8295F2"/><rect x="9" y="4" width="6" height="2" rx="1" fill="#8295F2"/><rect x="4" y="8" width="16" height="14" rx="1" fill="#2D4ECC"/><rect x="3" y="7" width="16" height="14" rx="1" fill="#4361F0"/><rect x="6" y="11" width="4" height="4" rx="1" fill="#ECEDF2"/><rect x="14" y="11" width="4" height="4" rx="1" fill="#ECEDF2"/><rect x="7" y="12" width="2" height="2" rx="1" fill="#8295F2"/><rect x="15" y="12" width="2" height="2" rx="1" fill="#8295F2"/><rect x="7" y="17" width="10" height="2" rx="1" fill="#8295F2" opacity=".8"/><rect x="0" y="11" width="3" height="5" rx="1" fill="#2D4ECC"/><rect x="21" y="11" width="3" height="5" rx="1" fill="#2D4ECC"/></svg>`,
    driveFolder: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="9" width="20" height="13" rx="1" fill="#2D4ECC"/><rect x="1" y="8" width="20" height="13" rx="1" fill="#4361F0"/><path d="M1 8h9l2-3h9v3H1z" fill="#8295F2"/><rect x="4" y="15" width="12" height="2" rx="1" fill="#ECEDF2" opacity=".5"/><rect x="4" y="18" width="8" height="2" rx="1" fill="#ECEDF2" opacity=".35"/></svg>`,
    clipboard: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="1" width="10" height="5" rx="1" fill="#8295F2"/><rect x="3" y="5" width="18" height="19" rx="1" fill="#2D4ECC"/><rect x="2" y="4" width="18" height="19" rx="1" fill="#4361F0"/><rect x="6" y="10" width="10" height="2" rx="1" fill="#ECEDF2" opacity=".6"/><rect x="6" y="14" width="8" height="2" rx="1" fill="#ECEDF2" opacity=".5"/><rect x="6" y="18" width="6" height="2" rx="1" fill="#ECEDF2" opacity=".35"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="2" width="10" height="21" rx="2" fill="#2D4ECC"/><rect x="6" y="1" width="10" height="21" rx="2" fill="#4361F0"/><rect x="8" y="4" width="6" height="12" rx="1" fill="#0B0C10" opacity=".5"/><rect x="9" y="18" width="4" height="2" rx="1" fill="#8295F2" opacity=".7"/></svg>`,
    lightning: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="14,1 5,13 12,13 10,23 19,11 12,11" fill="#2D4ECC"/><polygon points="13,1 4,13 11,13 9,23 18,11 11,11" fill="#4361F0"/><polygon points="13,1 4,13 11,13 9,23 18,11 11,11" fill="#8295F2" opacity=".25"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="19" height="19" rx="2" fill="#1a4a38"/><rect x="2" y="2" width="19" height="19" rx="2" fill="#065f46"/><rect x="2" y="2" width="19" height="5" rx="2" fill="#34D399" opacity=".2"/><path d="M6 12l4.5 4.5L18 8" stroke="#34D399" stroke-width="2.5" stroke-linecap="square" fill="none"/></svg>`,
    grid: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="21" height="21" rx="1" fill="#2D4ECC"/><rect x="3" y="3" width="21" height="21" rx="1" fill="#4361F0"/><rect x="6" y="6" width="7" height="7" rx="1" fill="#ECEDF2" opacity=".85"/><rect x="15" y="6" width="6" height="7" rx="1" fill="#8295F2"/><rect x="6" y="15" width="7" height="6" rx="1" fill="#8295F2" opacity=".55"/><rect x="15" y="15" width="6" height="6" rx="1" fill="#ECEDF2" opacity=".5"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#2D4ECC"/><circle cx="11" cy="11" r="10" fill="#4361F0"/><ellipse cx="11" cy="11" rx="4.2" ry="10" fill="none" stroke="#8295F2" stroke-width="1.1"/><path d="M1 11h20M2.5 6.5h17M2.5 15.5h17" stroke="#8295F2" stroke-width="1.1"/><circle cx="11" cy="11" r="10" fill="none" stroke="#ECEDF2" stroke-width="1" opacity=".3"/></svg>`,
    radar: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#2D4ECC"/><circle cx="11" cy="11" r="10" fill="#4361F0"/><circle cx="11" cy="11" r="6.5" fill="none" stroke="#8295F2" stroke-width="1" opacity=".55"/><circle cx="11" cy="11" r="3" fill="none" stroke="#8295F2" stroke-width="1" opacity=".55"/><path d="M11 11 L18.5 6" stroke="#ECEDF2" stroke-width="1.6" stroke-linecap="round"/><path d="M11 11 L20 11 A9 9 0 0 0 15.5 3.2 Z" fill="#86E6FF" opacity=".28"/><circle cx="16" cy="7.5" r="1.6" fill="#86E6FF"/></svg>`
  };
  const DEMOS = [
    {
      id: "gestion",
      num: "01",
      name: "Gesti\xF3n documental",
      icon: "folder",
      desc: "Facturas y n\xF3minas que llegan por email se clasifican con IA y se archivan solas en Drive por proveedor.",
      time: "~60s",
      url: "https://gestion.demos.mazestudio.site/?v=2",
      live: true,
      mw: 1160,
      steps: [{ ic: "envelope", t: "Llega un email con una factura o n\xF3mina" }, { ic: "robot", t: "La IA la lee y la clasifica sola" }, { ic: "driveFolder", t: "Se archiva en su carpeta de Drive" }]
    },
    {
      id: "citas",
      num: "02",
      name: "Reservas y citas sin fricci\xF3n",
      icon: "calendar",
      desc: "Tu cliente reserva un hueco \u2014una cita, una mesa o una plaza en una excursi\xF3n\u2014 con disponibilidad real y confirmaci\xF3n autom\xE1tica, sin llamadas ni WhatsApp cruzados.",
      time: "~45s",
      url: "https://inmobiliaria-demo.demos.mazestudio.site/",
      live: true,
      mw: 1160,
      steps: [{ ic: "clipboard", t: "Tu cliente pide cita en un formulario" }, { ic: "calendar", t: "El sistema busca el hueco libre y lo reserva" }, { ic: "phone", t: "Le llega el aviso por WhatsApp" }]
    },
    {
      id: "crm",
      num: "03",
      name: "CRM centralizado",
      icon: "grid",
      desc: "WhatsApp, correo, la web y las llamadas entran, se convierten en ficha solas y aparecen ordenadas en un \xFAnico panel. Abres una app en vez de seis.",
      time: "~1 min",
      url: "https://crm.demos.mazestudio.site/",
      live: true,
      mw: 1200,
      steps: [{ ic: "chat", t: "Entra un WhatsApp, un correo o una llamada" }, { ic: "robot", t: "Se convierte en ficha y se ordena solo" }, { ic: "grid", t: "Todo en un panel: bandeja, clientes y agenda" }]
    },
    {
      id: "radar",
      num: "04",
      name: "Radar de mercado",
      icon: "radar",
      desc: "Tu CRM tambi\xE9n mira hacia fuera: lee webs p\xFAblicas \u2014precios de la competencia, negocios nuevos, rese\xF1as\u2014 y te avisa en cristiano cuando algo cambia.",
      time: "~1 min",
      url: "https://radar.demos.mazestudio.site/",
      live: true,
      mw: 1200,
      steps: [{ ic: "globe", t: "Lee webs p\xFAblicas: competencia, directorios, rese\xF1as" }, { ic: "robot", t: "Compara con ayer y decide si algo importa" }, { ic: "radar", t: "Te avisa en cristiano: \xABbajaron el catamar\xE1n a 39 \u20AC\xBB" }]
    },
    {
      id: "atencion",
      num: "05",
      name: "Atenci\xF3n al cliente",
      icon: "chat",
      desc: "Responde los emails de clientes con IA usando la informaci\xF3n real de tu negocio.",
      time: "~90s",
      url: "",
      live: false,
      steps: [{ ic: "envelope", t: "Entra el email de un cliente" }, { ic: "robot", t: "La IA responde con la info de tu negocio" }, { ic: "check", t: "Respuesta enviada \u2014 t\xFA no tocas nada" }]
    }
  ].map((d) => ({ ...d, name: window.t(d.name), desc: window.t(d.desc), steps: d.steps.map((s) => ({ ...s, t: window.t(s.t) })) }));
  const SERVICES = DEMOS.filter((d) => d.id !== "crm");
  const HUB = DEMOS.find((d) => d.id === "crm") || DEMOS[0];
  const SOURCES = [
    { c: "#34D399", t: "WhatsApp" },
    { c: "#4B8CF7", t: window.t("Correo") },
    { c: "#8B7FF0", t: "Web" },
    { c: "#F0A24B", t: window.t("Llamada") }
  ];
  const ROWS = [
    { c: "#34D399", st: window.t("Nuevo"), hot: true },
    { c: "#4B8CF7", st: "48 min", hot: false },
    { c: "#8B7FF0", st: window.t("Hoy"), hot: false }
  ];
  window.ComoFuncionaSection = function ComoFuncionaSection() {
    const [cur, setCur] = useState(HUB);
    const [modal, setModal] = useState(false);
    const [frameH, setFrameH] = useState(null);
    const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
    const [openId, setOpenId] = useState(() => {
      const f = SERVICES.find((s) => s.live);
      return f ? f.id : null;
    });
    const iframeRef = useRef(null);
    const crmRef = useRef(null);
    const busRef = useRef(null);
    useEffect(() => {
      const el = crmRef.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!el || reduced || !window.gsap || window.innerWidth <= 900) return;
      const qx = window.gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
      const qy = window.gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
      el.style.transformStyle = "preserve-3d";
      el.style.perspective = "1400px";
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        qx(((e.clientX - r.left) / r.width - 0.5) * 3.5);
        qy(((e.clientY - r.top) / r.height - 0.5) * -3.5);
      };
      const onLeave = () => {
        qx(0);
        qy(0);
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, []);
    useEffect(() => {
      const bus = busRef.current;
      if (!bus) return;
      const svg = bus.querySelector("svg");
      const update = () => {
        const hub = crmRef.current;
        if (!hub || !svg) return;
        const br = bus.getBoundingClientRect();
        if (br.width < 10 || br.height < 10) return;
        svg.setAttribute("viewBox", "0 0 " + br.width.toFixed(1) + " " + br.height.toFixed(1));
        const hr = hub.getBoundingClientRect();
        const endY = hr.top + hr.height / 2 - br.top;
        const bases = svg.querySelectorAll("path.base");
        const pulses = svg.querySelectorAll("path.pulse");
        bus.parentElement.querySelectorAll(".dgr-acc-head").forEach((head, i) => {
          const r = head.getBoundingClientRect();
          const y = r.top + r.height / 2 - br.top;
          const d = "M0 " + y.toFixed(1) + " C " + (br.width * 0.58).toFixed(1) + " " + y.toFixed(1) + ", " + (br.width - 16).toFixed(1) + " " + endY.toFixed(1) + ", " + br.width.toFixed(1) + " " + endY.toFixed(1);
          if (bases[i]) bases[i].setAttribute("d", d);
          if (pulses[i]) pulses[i].setAttribute("d", d);
        });
        const dot = svg.querySelector(".bus-dot");
        if (dot) {
          dot.setAttribute("cx", br.width.toFixed(1));
          dot.setAttribute("cy", endY.toFixed(1));
        }
      };
      update();
      let raf;
      const t0 = performance.now();
      const step = (t) => {
        update();
        if (t - t0 < 620) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      window.addEventListener("resize", update);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", update);
      };
    }, [openId, vw]);
    useEffect(() => {
      document.documentElement.style.overflowY = modal ? "hidden" : "";
      document.body.classList.toggle("demo-open", modal);
      return () => {
        document.documentElement.style.overflowY = "";
        document.body.classList.remove("demo-open");
      };
    }, [modal]);
    useEffect(() => {
      const fn = (e) => {
        if (e.key === "Escape") setModal(false);
      };
      window.addEventListener("keydown", fn);
      return () => window.removeEventListener("keydown", fn);
    }, []);
    useEffect(() => {
      const onR = () => setVw(window.innerWidth);
      window.addEventListener("resize", onR);
      return () => window.removeEventListener("resize", onR);
    }, []);
    useEffect(() => {
      if (!modal || window.innerWidth <= 860) {
        setFrameH(null);
        return;
      }
      let ro;
      const cap = () => Math.round(window.innerHeight * 0.92);
      const apply = (h) => {
        if (typeof h === "number" && h > 120) setFrameH(Math.min(h, cap()));
      };
      function fitSameOrigin() {
        const f2 = iframeRef.current;
        if (!f2) return;
        try {
          const d = f2.contentDocument;
          if (d && d.body) {
            apply(Math.max(d.body.scrollHeight, (d.documentElement || {}).scrollHeight || 0));
            if (!ro && "ResizeObserver" in window) {
              ro = new ResizeObserver(() => fitSameOrigin());
              ro.observe(d.body);
            }
          }
        } catch (e) {
        }
      }
      const onMsg = (e) => {
        const d = e && e.data;
        if (d && d.type === "mazeDemoHeight") apply(d.height);
      };
      window.addEventListener("message", onMsg);
      const f = iframeRef.current;
      const onLoad = () => fitSameOrigin();
      if (f) f.addEventListener("load", onLoad);
      const iv = setInterval(fitSameOrigin, 700);
      const tEnd = setTimeout(() => clearInterval(iv), 6e3);
      fitSameOrigin();
      return () => {
        window.removeEventListener("message", onMsg);
        if (f) f.removeEventListener("load", onLoad);
        if (ro) ro.disconnect();
        clearInterval(iv);
        clearTimeout(tEnd);
      };
    }, [modal, cur, vw]);
    function openDemo(d) {
      if (!d || !d.live) return;
      setCur(d);
      setModal(true);
    }
    return /* @__PURE__ */ React.createElement("section", { id: "como", className: "v2-sec" }, /* @__PURE__ */ React.createElement("div", { className: "fx-glow", "data-depth": "0.2", style: { width: 420, height: 420, right: "-8%", top: "4%", background: "rgba(75,140,247,.3)" } }), /* @__PURE__ */ React.createElement("div", { className: "fx-glow", "data-depth": "0.12", style: { width: 480, height: 480, left: "-60px", bottom: "-190px", background: "rgba(75,140,247,.16)", filter: "blur(90px)", opacity: 1 } }), /* @__PURE__ */ React.createElement("div", { className: "fx-glow", "data-depth": "0.12", style: { width: 420, height: 420, right: "-50px", bottom: "-160px", background: "rgba(99,80,170,.15)", filter: "blur(90px)", opacity: 1 } }), /* @__PURE__ */ React.createElement("div", { className: "v2-inner" }, /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker" }, window.t("// c\xF3mo funciona")), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2" }, window.t("Demo de "), /* @__PURE__ */ React.createElement("em", null, window.t("procesos"))), /* @__PURE__ */ React.createElement("p", { className: "v2-note" }, window.t("Estas automatizaciones est\xE1n funcionando ahora mismo. \xC1brelas y juega con ellas."))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.05, style: { marginTop: 44 } }, /* @__PURE__ */ React.createElement("div", { className: "pm-bento" }, /* @__PURE__ */ React.createElement("div", { className: "pm-rail" }, /* @__PURE__ */ React.createElement("p", { className: "dgr-glabel" }, window.t("automatizaciones que contratas")), /* @__PURE__ */ React.createElement("p", { className: "dgr-gsub" }, window.t("Cada proceso es una "), /* @__PURE__ */ React.createElement("em", null, window.t("pieza que puedes contratar por separado")), window.t(". Empieza por la que m\xE1s te aprieta.")), /* @__PURE__ */ React.createElement("div", { className: "dgr-acc" }, SERVICES.map((d) => {
      const isOpen = d.live && openId === d.id;
      return /* @__PURE__ */ React.createElement("div", { key: d.id, className: "dgr-acc-item " + (d.live ? "live" : "soon") + (isOpen ? " open" : "") }, /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "dgr-acc-head",
          type: "button",
          disabled: !d.live,
          "aria-expanded": isOpen,
          "aria-controls": "acc-" + d.id,
          onClick: d.live ? () => setOpenId(isOpen ? null : d.id) : void 0
        },
        /* @__PURE__ */ React.createElement("span", { className: "dgr-acc-ic", dangerouslySetInnerHTML: { __html: IC[d.icon] } }),
        /* @__PURE__ */ React.createElement("span", { className: "dgr-acc-name" }, d.live && /* @__PURE__ */ React.createElement("span", { className: "dgr-acc-dot" }), d.name),
        !d.live && /* @__PURE__ */ React.createElement("span", { className: "dgr-acc-soon" }, window.t("Pr\xF3ximamente"))
      ), d.live && /* @__PURE__ */ React.createElement("div", { className: "dgr-acc-body", id: "acc-" + d.id }, /* @__PURE__ */ React.createElement("div", { className: "dgr-acc-bodyin" }, /* @__PURE__ */ React.createElement("div", { className: "dgr-acc-pad" }, /* @__PURE__ */ React.createElement("p", { className: "dgr-acc-desc" }, d.desc), /* @__PURE__ */ React.createElement("button", { className: "dgr-acc-cta", onClick: () => openDemo(d) }, window.t("Ver demo"), " ", /* @__PURE__ */ React.createElement("em", null, "\u2192"))))));
    }))), /* @__PURE__ */ React.createElement("div", { className: "pm-bus", "aria-hidden": "true", ref: busRef }, /* @__PURE__ */ React.createElement("svg", null, SERVICES.map((d) => /* @__PURE__ */ React.createElement("path", { key: "b" + d.id, className: "base" + (openId === d.id ? " active" : "") })), SERVICES.map((d) => /* @__PURE__ */ React.createElement("path", { key: "p" + d.id, className: "pulse" + (openId === d.id ? " active" : "") })), /* @__PURE__ */ React.createElement("circle", { className: "bus-dot", cx: "0", cy: "0", r: "5" }))), /* @__PURE__ */ React.createElement("div", { className: "dgr-hub", ref: crmRef }, /* @__PURE__ */ React.createElement("div", { className: "dgr-hub-l" }, /* @__PURE__ */ React.createElement("span", { className: "dgr-hub-badge" }, /* @__PURE__ */ React.createElement("span", { className: "bdot" }), " ", window.t("El visualizador \xB7 en vivo")), /* @__PURE__ */ React.createElement("h3", { className: "dgr-hub-title" }, HUB.name), /* @__PURE__ */ React.createElement("p", { className: "dgr-hub-desc" }, window.t("Todo lo que automatizas termina aqu\xED. Un \xFAnico panel donde ver la bandeja, los clientes y la agenda sin abrir seis apps.")), /* @__PURE__ */ React.createElement("div", { className: "dgr-hub-cta" }, /* @__PURE__ */ React.createElement("button", { className: "dp-btn", onClick: () => openDemo(HUB) }, window.t("Ver el panel"), " ", /* @__PURE__ */ React.createElement("span", null, "\u2192"))), /* @__PURE__ */ React.createElement("div", { className: "dgr-mini", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("div", { className: "dgr-mini-src" }, SOURCES.map((s) => /* @__PURE__ */ React.createElement("span", { key: s.t, className: "dgr-schip" }, /* @__PURE__ */ React.createElement("i", { style: { background: s.c } }), s.t))), ROWS.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "dgr-mrow" + (r.hot ? " hot" : "") }, /* @__PURE__ */ React.createElement("i", { style: { background: r.c } }), /* @__PURE__ */ React.createElement("span", { className: "ln" }, /* @__PURE__ */ React.createElement("span", { className: "l1", style: { width: 62 - i * 10 + "%" } }), /* @__PURE__ */ React.createElement("span", { className: "l2", style: { width: 42 - i * 6 + "%" } })), /* @__PURE__ */ React.createElement("span", { className: "st" }, r.st))))))))), modal && ReactDOM.createPortal(
      /* @__PURE__ */ React.createElement("div", { className: "dp-modal", onClick: () => setModal(false) }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "dp-shell",
          style: vw > 860 ? { maxWidth: "min(94vw, " + (cur.mw || 760) + "px)" } : void 0,
          onClick: (e) => e.stopPropagation()
        },
        /* @__PURE__ */ React.createElement("button", { className: "dp-close", "aria-label": window.t("Cerrar demo"), onClick: () => setModal(false) }, "\u2715"),
        /* @__PURE__ */ React.createElement("div", { className: "dp-frame", style: vw > 860 && frameH ? { height: frameH + "px" } : void 0 }, /* @__PURE__ */ React.createElement("iframe", { ref: iframeRef, src: cur.url + (cur.url.indexOf("?") < 0 ? "?" : "&") + "embed=1", title: cur.name, allow: "fullscreen" }))
      )),
      document.body
    ));
  };
})();
})();

(function(){
(function() {
  const Reveal = window.Reveal;
  const HeadReveal = window.HeadReveal;
  function spotlight(e) {
    const c = e.currentTarget, r = c.getBoundingClientRect();
    c.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
    c.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
  }
  const VALUES = [
    {
      ic: /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 21s-7-4.35-7-10a7 7 0 0 1 14 0c0 5.65-7 10-7 10z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "11", r: "2.5" })),
      h: window.t("Tenerife, de cerca"),
      p: window.t("Del sur de Tenerife. Conocemos tu mercado y estamos cerca.")
    },
    {
      ic: /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1.5" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1.5" }), /* @__PURE__ */ React.createElement("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1.5" }), /* @__PURE__ */ React.createElement("path", { d: "M14 17.5h7M17.5 14v7" })),
      h: window.t("Sobre tus herramientas"),
      p: window.t("Cero migraciones. Automatizamos con n8n sobre lo que ya tienes.")
    },
    {
      ic: /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })),
      h: window.t("Sin tecnicismos"),
      p: window.t("Demo de tu caso, antes de decidir nada.")
    },
    {
      ic: /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), /* @__PURE__ */ React.createElement("polyline", { points: "22 4 12 14.01 9 11.01" })),
      h: window.t("Te acompa\xF1amos"),
      p: window.t("Seguimos mejor\xE1ndolo contigo, mes a mes.")
    }
  ];
  function CuboMarca() {
    return /* @__PURE__ */ React.createElement("div", { className: "qd-cell qd-tr qd-anim", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("div", { className: "cubo-halo" }), /* @__PURE__ */ React.createElement("div", { className: "cubo-scene" }, /* @__PURE__ */ React.createElement("img", { className: "cubo-img", src: "assets/referencias/cubo-laberinto-3d.webp", alt: "", loading: "lazy", decoding: "async" })), /* @__PURE__ */ React.createElement("p", { className: "qd-cap" }, window.t("// el laberinto, bajo control")));
  }
  window.PorQueSection = function PorQueSection() {
    return /* @__PURE__ */ React.createElement("section", { id: "empresa", className: "qd-sec" }, /* @__PURE__ */ React.createElement("div", { className: "qd-grid" }, /* @__PURE__ */ React.createElement("div", { className: "qd-cell qd-tl" }, /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker" }, window.t("// qui\xE9nes somos")), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2" }, window.t("El laberinto, resuelto "), /* @__PURE__ */ React.createElement("em", null, window.t("con IA")), window.t(". En Tenerife.")), /* @__PURE__ */ React.createElement("p", { className: "v2-note" }, window.t("Excursiones en Costa Adeje, Los Cristianos y Las Am\xE9ricas, comercios y pymes de toda Canarias recuperan horas que hoy pierden en tareas repetitivas."))), /* @__PURE__ */ React.createElement("div", { className: "pq-grid" }, VALUES.map((v, i) => /* @__PURE__ */ React.createElement(Reveal, { key: v.h, delay: i * 0.06 }, /* @__PURE__ */ React.createElement("div", { className: "pq-card", onPointerMove: spotlight }, /* @__PURE__ */ React.createElement("div", { className: "pq-ic" }, v.ic), /* @__PURE__ */ React.createElement("h4", null, v.h), /* @__PURE__ */ React.createElement("p", null, v.p)))))), /* @__PURE__ */ React.createElement(CuboMarca, null), /* @__PURE__ */ React.createElement("div", { id: "diagnostico", className: "qd-cell qd-br cd-center" }, /* @__PURE__ */ React.createElement(window.DiagnosticoInner, null))));
  };
})();
})();

(function(){
(function() {
  const { useState, useRef, useEffect, useLayoutEffect } = React;
  window.CatalogoSection = function CatalogoSection() {
    const rootRef = useRef(null);
    const btnRef = useRef(null);
    const [estado, setEstado] = useState("idle");
    const timers = useRef([]);
    useLayoutEffect(() => {
      const root = rootRef.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!root || reduced || !window.gsap || !window.ScrollTrigger) return;
      const ctx = window.gsap.context(() => {
        const tl = window.gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 84%", once: true }
        });
        tl.from(".dl-kicker", { y: 10, duration: 0.5, ease: "power2.out" }).from(".dl-rule i", { scaleX: 0, duration: 1.05, ease: "expo.out" }, "-=.2").from(".dl-slot", { y: 18, scale: 0.92, duration: 0.75, ease: "back.out(1.6)" }, "-=.72");
      }, root);
      return () => ctx.revert();
    }, []);
    useEffect(() => {
      const el = btnRef.current;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      if (!el || coarse) return;
      const move = (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) / r.width * 100 + "%");
        el.style.setProperty("--my", (e.clientY - r.top) / r.height * 100 + "%");
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    }, []);
    useEffect(() => () => timers.current.forEach(clearTimeout), []);
    const alPulsar = () => {
      timers.current.forEach(clearTimeout);
      setEstado("yendo");
      timers.current = [
        setTimeout(() => setEstado("listo"), 950),
        setTimeout(() => setEstado("idle"), 4200)
      ];
    };
    const etiqueta = estado === "yendo" ? window.t("Preparando la descarga\u2026") : estado === "listo" ? window.t("Cat\xE1logo descargado") : window.t("Descargar el cat\xE1logo");
    return /* @__PURE__ */ React.createElement("section", { className: "dl-band", ref: rootRef, "aria-label": window.t("Cat\xE1logo de servicios") }, /* @__PURE__ */ React.createElement("div", { className: "dl-wrap" }, /* @__PURE__ */ React.createElement("p", { className: "dl-kicker" }, window.t("// cat\xE1logo de servicios"), " \xB7 ", /* @__PURE__ */ React.createElement("b", null, window.t("descarga directa, sin formulario"))), /* @__PURE__ */ React.createElement("div", { className: "dl-rule" }, /* @__PURE__ */ React.createElement("i", { "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "dl-slot" }, /* @__PURE__ */ React.createElement("span", { className: "dl-sheet dl-sheet-b", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", { className: "dl-sheet dl-sheet-a", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: "mk" }), /* @__PURE__ */ React.createElement("span", { className: "l l1" }), /* @__PURE__ */ React.createElement("span", { className: "l l2" }), /* @__PURE__ */ React.createElement("span", { className: "l l3" })), /* @__PURE__ */ React.createElement(
      "a",
      {
        ref: btnRef,
        href: window.CATALOGO_PDF,
        download: true,
        onClick: alPulsar,
        "aria-label": window.t("Descargar cat\xE1logo de servicios (PDF)"),
        className: "dl-btn" + (estado === "yendo" ? " is-yendo" : estado === "listo" ? " is-listo" : "")
      },
      /* @__PURE__ */ React.createElement("span", { className: "dl-fill", "aria-hidden": "true" }),
      /* @__PURE__ */ React.createElement("span", { className: "dl-ico", "aria-hidden": "true" }, estado === "listo" ? /* @__PURE__ */ React.createElement("svg", { className: "ok", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("polyline", { points: "4 12.5 9.5 18 20 6.5" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(window.IconDownload, null), /* @__PURE__ */ React.createElement(window.IconDownload, null))),
      /* @__PURE__ */ React.createElement("span", { className: "dl-label" }, etiqueta),
      /* @__PURE__ */ React.createElement("span", { className: "dl-tag", "aria-hidden": "true" }, "PDF")
    )), /* @__PURE__ */ React.createElement("i", { "aria-hidden": "true" }))));
  };
})();
})();

(function(){
(function() {
  const { useState, useEffect, useRef } = React;
  const Reveal = window.Reveal;
  const HeadReveal = window.HeadReveal;
  const fmt = (n) => window.fmtNum(n);
  function useCountUp(target, duration = 850) {
    const [display, setDisplay] = useState(0);
    const fromRef = useRef(0);
    const rafRef = useRef(0);
    useEffect(() => {
      const from = fromRef.current;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const e = 1 - Math.pow(1 - t, 3);
        const cur = from + (target - from) * e;
        fromRef.current = cur;
        setDisplay(cur);
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }, [target, duration]);
    return display;
  }
  window.RoiSection = function RoiSection() {
    const [horas, setHoras] = useState(12);
    const [coste, setCoste] = useState(18);
    const [lvl, setLvl] = useState(0.85);
    const wrapRef = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      }, { threshold: 0.25 });
      if (wrapRef.current) io.observe(wrapRef.current);
      return () => io.disconnect();
    }, []);
    const hMonth = horas * 4.33 * lvl;
    const mMonth = hMonth * coste;
    const yEUR = mMonth * 12;
    const dDays = hMonth * 12 / 8;
    const gate = inView ? 1 : 0;
    const cY = useCountUp(yEUR * gate);
    const cM = useCountUp(mMonth * gate);
    const cH = useCountUp(hMonth * gate);
    const cD = useCountUp(dDays * gate);
    const levels = [["Alta", 0.85], ["Media", 0.6], ["Baja", 0.35]].map(([l, v]) => [window.t(l), v]);
    const hPct = horas / 40 * 100;
    const cPct = (coste - 8) / (30 - 8) * 100;
    const recPct = Math.round(lvl * 100);
    return /* @__PURE__ */ React.createElement("section", { id: "roi", className: "roi2-sec", ref: wrapRef }, /* @__PURE__ */ React.createElement("div", { className: "roi2-atmos", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-blob", style: { width: 480, height: 480, background: "rgba(75,140,247,.16)", top: "-120px", left: "-60px", animation: "roi2Float 14s ease-in-out infinite" } }), /* @__PURE__ */ React.createElement("div", { className: "roi2-blob", style: { width: 420, height: 420, background: "rgba(99,80,170,.15)", bottom: "-150px", right: "-50px", animation: "roi2Float 17s ease-in-out infinite reverse" } })), /* @__PURE__ */ React.createElement("div", { className: "roi2-inner" }, /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("div", { className: "roi2-head" }, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker", style: { textAlign: "center" } }, window.t("// tu ahorro estimado")), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2", style: { fontSize: "clamp(26px,5.6vw,69.3px)", textAlign: "center" } }, window.t("\xBFCu\xE1nto te ahorras "), /* @__PURE__ */ React.createElement("em", null, window.t("al mes?"))))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.12 }, /* @__PURE__ */ React.createElement("div", { className: "roi2-card" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-controls" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-field" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-flbl" }, /* @__PURE__ */ React.createElement("span", null, window.t("Horas/semana en tareas repetitivas")), /* @__PURE__ */ React.createElement("span", { className: "roi2-fval" }, horas, /* @__PURE__ */ React.createElement("small", null, "h"))), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "roi2-range",
        type: "range",
        min: "0",
        max: "40",
        step: "1",
        value: horas,
        style: { "--p": hPct + "%" },
        onChange: (e) => setHoras(+e.target.value),
        "aria-label": window.t("Horas por semana en tareas repetitivas")
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "roi2-field" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-flbl" }, /* @__PURE__ */ React.createElement("span", null, window.t("Coste por hora de ese trabajo")), /* @__PURE__ */ React.createElement("span", { className: "roi2-fval" }, coste, /* @__PURE__ */ React.createElement("small", null, "\u20AC"))), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "roi2-range",
        type: "range",
        min: "8",
        max: "30",
        step: "1",
        value: coste,
        style: { "--p": cPct + "%" },
        onChange: (e) => setCoste(+e.target.value),
        "aria-label": window.t("Coste por hora")
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "roi2-field" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-flbl" }, /* @__PURE__ */ React.createElement("span", null, window.t("Nivel de repetici\xF3n de esas tareas"))), /* @__PURE__ */ React.createElement("div", { className: "roi2-levels" }, levels.map(([lbl, v]) => /* @__PURE__ */ React.createElement("button", { key: lbl, type: "button", className: "roi2-lvl" + (lvl === v ? " active" : ""), onClick: () => setLvl(v) }, lbl))))), /* @__PURE__ */ React.createElement("div", { className: "roi2-result" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-glow", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("p", { className: "roi2-rlabel" }, window.t("tu ahorro cada mes")), /* @__PURE__ */ React.createElement("div", { className: "roi2-big" }, fmt(cM), /* @__PURE__ */ React.createElement("span", { className: "roi2-big-cur" }, window.t(" \u20AC/mes"))), /* @__PURE__ */ React.createElement("p", { className: "roi2-sub" }, "\u2248 ", fmt(cY), window.t(" \u20AC al a\xF1o \xB7 sobre las herramientas que ya usas")), /* @__PURE__ */ React.createElement("div", { className: "roi2-split" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-stat" }, /* @__PURE__ */ React.createElement("div", { className: "n" }, fmt(cH), /* @__PURE__ */ React.createElement("small", null, "h")), /* @__PURE__ */ React.createElement("div", { className: "l" }, window.t("horas que recuperas"), /* @__PURE__ */ React.createElement("br", null), window.t("al mes"))), /* @__PURE__ */ React.createElement("div", { className: "roi2-stat" }, /* @__PURE__ */ React.createElement("div", { className: "n" }, fmt(cD), /* @__PURE__ */ React.createElement("small", null, window.t("d\xEDas"))), /* @__PURE__ */ React.createElement("div", { className: "l" }, window.t("jornadas libres"), /* @__PURE__ */ React.createElement("br", null), window.t("al a\xF1o")))), /* @__PURE__ */ React.createElement("div", { className: "roi2-barwrap" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-barlbl" }, /* @__PURE__ */ React.createElement("span", null, window.t("De ese trabajo repetitivo")), /* @__PURE__ */ React.createElement("span", null, window.t("automatizable"))), /* @__PURE__ */ React.createElement("div", { className: "roi2-bar" }, /* @__PURE__ */ React.createElement("div", { className: "roi2-bar-fill", style: { width: (inView ? recPct : 0) + "%" } })), /* @__PURE__ */ React.createElement("div", { className: "roi2-barnote" }, window.t("Nos encargamos de ~"), recPct, window.t("% de esas tareas"), window.t(", sin que t\xFA toques nada."))), /* @__PURE__ */ React.createElement("div", { className: "roi2-cta" }, /* @__PURE__ */ React.createElement("a", { className: "v2-btn v2-btn-ghost", href: "#como" }, window.t("Ver c\xF3mo funciona"))), /* @__PURE__ */ React.createElement("p", { className: "roi2-note" }, window.t("// estimaci\xF3n orientativa \u2014 los n\xFAmeros exactos los afinamos contigo, gratis")))))));
  };
})();
})();

(function(){
(function() {
  const { useState, useEffect, useRef } = React;
  const Reveal = window.Reveal;
  const HeadReveal = window.HeadReveal;
  const CARDS = [
    "\xBFHas contestado otra vez la pregunta de siempre \u2014 horarios, precios, disponibilidad?",
    "\xBFHas pasado datos a mano de un sitio a otro: del WhatsApp al calendario, del correo al Excel?",
    "\xBFSe te ha quedado alg\xFAn mensaje de un cliente sin responder hasta el d\xEDa siguiente?",
    "\xBFHas hecho papeleo de noche o en fin de semana, fuera de tu horario?",
    '\xBFHas pensado al menos una vez "esto deber\xEDa hacerse solo"?'
  ].map(window.t);
  function verdict(n) {
    if (n <= 1) return {
      tag: window.t("resultado \xB7 quiz\xE1 no es el momento"),
      title: /* @__PURE__ */ React.createElement(React.Fragment, null, window.t("Tu semana ya va bastante "), /* @__PURE__ */ React.createElement("em", null, window.t("fluida."))),
      body: window.t("No detectamos una fuga de tiempo clara ahora mismo. Si esto cambia, nos cuentas y lo miramos sin compromiso.")
    };
    if (n <= 3) return {
      tag: window.t("resultado \xB7 vale la pena mirarlo"),
      title: /* @__PURE__ */ React.createElement(React.Fragment, null, window.t("Hay una fuga de tiempo "), /* @__PURE__ */ React.createElement("em", null, window.t("ah\xED."))),
      body: window.t("Lo que has marcado se repite semana tras semana. Una conversaci\xF3n de 20 minutos aclara cu\xE1ntas horas puedes recuperar.")
    };
    return {
      tag: window.t("resultado \xB7 encajamos"),
      title: /* @__PURE__ */ React.createElement(React.Fragment, null, window.t("S\xED. Podemos "), /* @__PURE__ */ React.createElement("em", null, window.t("ayudarte."))),
      body: window.t("Todo lo que has marcado pasa cada semana \u2014 y se puede automatizar sobre las herramientas que ya usas. Hablemos y te ense\xF1amos por d\xF3nde empezar.")
    };
  }
  function ResultBox({ res, onRestart }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
      const id = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(id);
    }, []);
    return /* @__PURE__ */ React.createElement("div", { className: "cd-result" + (show ? " show" : ""), "aria-live": "polite" }, /* @__PURE__ */ React.createElement("span", { className: "rtag" }, res.tag), /* @__PURE__ */ React.createElement("h3", null, res.title), /* @__PURE__ */ React.createElement("p", null, res.body), /* @__PURE__ */ React.createElement("div", { className: "acts" }, /* @__PURE__ */ React.createElement("a", { className: "v2-btn v2-btn-accent", href: "hablemos.html" }, window.t("\u2192 Solicita tu auditor\xEDa gratis")), /* @__PURE__ */ React.createElement("a", { className: "v2-btn v2-btn-ghost", href: "#como" }, window.t("Ver c\xF3mo funciona"))), /* @__PURE__ */ React.createElement("button", { className: "cd-restart", onClick: onRestart }, window.t("Volver a intentarlo")));
  }
  window.DiagnosticoInner = function DiagnosticoInner() {
    const [idx, setIdx] = useState(0);
    const [yes, setYes] = useState(0);
    const done = idx >= CARDS.length;
    const frontRef = useRef(null);
    const busyRef = useRef(false);
    const dragRef = useRef({ on: false, x0: 0, dx: 0 });
    function resolve(isYes) {
      if (busyRef.current || done) return;
      busyRef.current = true;
      const el = frontRef.current;
      if (el) {
        el.style.transition = "transform .45s cubic-bezier(.16,1,.3,1), opacity .4s";
        el.style.transform = "translateX(" + (isYes ? 140 : -140) + "%) rotate(" + (isYes ? 18 : -18) + "deg)";
        el.style.opacity = "0";
      }
      setTimeout(() => {
        if (isYes) setYes((y) => y + 1);
        setIdx((i) => i + 1);
        busyRef.current = false;
      }, 260);
    }
    function onDown(e) {
      if (busyRef.current) return;
      dragRef.current = { on: true, x0: e.clientX, dx: 0 };
      const el = frontRef.current;
      if (el) {
        if (el.setPointerCapture) el.setPointerCapture(e.pointerId);
        el.classList.add("dragging");
      }
    }
    function onMove(e) {
      if (!dragRef.current.on) return;
      const dx = e.clientX - dragRef.current.x0;
      dragRef.current.dx = dx;
      const el = frontRef.current;
      if (!el) return;
      el.style.transform = "translateX(" + dx + "px) rotate(" + dx / 18 + "deg)";
      const p = Math.min(Math.abs(dx) / 120, 1);
      const bn = el.querySelector(".cd-badge.no"), bs = el.querySelector(".cd-badge.si");
      if (bn) bn.style.opacity = dx < 0 ? p : 0;
      if (bs) bs.style.opacity = dx > 0 ? p : 0;
    }
    function onUp() {
      if (!dragRef.current.on) return;
      const dx = dragRef.current.dx;
      dragRef.current.on = false;
      const el = frontRef.current;
      if (el) el.classList.remove("dragging");
      if (Math.abs(dx) > 100) {
        resolve(dx > 0);
      } else if (el) {
        el.style.transform = "";
        const bn = el.querySelector(".cd-badge.no"), bs = el.querySelector(".cd-badge.si");
        if (bn) bn.style.opacity = 0;
        if (bs) bs.style.opacity = 0;
      }
    }
    function restart() {
      setIdx(0);
      setYes(0);
    }
    const res = done ? verdict(yes) : null;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker" }, window.t("// \xBFlo necesitas?")), /* @__PURE__ */ React.createElement("div", { className: "hr-olh" }, /* @__PURE__ */ React.createElement("h2", { className: "v2-h2 hr-olbase", "aria-hidden": "true" }, window.t("\xBFNos "), /* @__PURE__ */ React.createElement("em", null, window.t("necesitas?"))), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2 hr-olfill" }, window.t("\xBFNos "), /* @__PURE__ */ React.createElement("em", null, window.t("necesitas?"))), /* @__PURE__ */ React.createElement("span", { className: "hr-olbeam", "aria-hidden": "true" })), /* @__PURE__ */ React.createElement("p", { className: "v2-note" }, window.t("Piensa solo en tus \xFAltimos 7 d\xEDas. Desliza o pulsa \u2014 al final te decimos si encajamos."))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.05 }, /* @__PURE__ */ React.createElement("div", { className: "cd-dots", "aria-hidden": "true" }, CARDS.map((_, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "cd-dot" + (i < idx ? " done" : "") + (i === idx && !done ? " cur" : "") }))), !done && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "cd-stage" }, CARDS.map((q, i) => /* @__PURE__ */ React.createElement("div", { key: "sz" + i, className: "cd-sizer", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: "cd-num" }, "01 / 05"), /* @__PURE__ */ React.createElement("p", { className: "cd-txt" }, q))), [0, 1, 2].map((k) => {
      const i = idx + k;
      if (i >= CARDS.length) return null;
      const front = k === 0;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: i,
          ref: front ? frontRef : null,
          className: "cd-card",
          style: { zIndex: 10 - k, transform: "translateY(" + k * 12 + "px) scale(" + (1 - k * 0.055) + ")", opacity: k === 2 ? 0.5 : k === 1 ? 0.8 : 1 },
          onPointerDown: front ? onDown : void 0,
          onPointerMove: front ? onMove : void 0,
          onPointerUp: front ? onUp : void 0,
          onPointerCancel: front ? onUp : void 0
        },
        /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "cd-badge no" }, window.t("No")), /* @__PURE__ */ React.createElement("span", { className: "cd-badge si" }, window.t("S\xED")), /* @__PURE__ */ React.createElement("span", { className: "cd-num" }, "0" + (i + 1) + " / 0" + CARDS.length), /* @__PURE__ */ React.createElement("p", { className: "cd-txt" }, CARDS[i]))
      );
    })), /* @__PURE__ */ React.createElement("div", { className: "cd-actions" }, /* @__PURE__ */ React.createElement("button", { className: "cd-abtn no", onClick: () => resolve(false) }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M6 6l12 12M18 6L6 18" })), window.t("No me pasa")), /* @__PURE__ */ React.createElement("button", { className: "cd-abtn si", onClick: () => resolve(true) }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 12l5 5L20 6" })), window.t("S\xED, me suena")))), done && res && /* @__PURE__ */ React.createElement(ResultBox, { res, onRestart: restart })));
  };
})();
})();

(function(){
(function() {
  const { useState } = React;
  const Reveal = window.Reveal;
  const HeadReveal = window.HeadReveal;
  const FAQS = [
    {
      tag: window.t("Precio"),
      q: window.t("\xBFCu\xE1nto cuesta automatizar procesos con IA?"),
      a: window.t("El precio var\xEDa dependiendo del proceso a llevar a cabo. Trabajamos con un diagn\xF3stico inicial gratuito: analizamos lo que ya usas y te damos presupuesto antes de empezar, sin sorpresas ni compromiso.")
    },
    {
      tag: window.t("Reservas"),
      q: window.t("\xBFSirve esto para gestionar reservas de excursiones o actividades tur\xEDsticas?"),
      a: window.t("S\xED. Conectamos tu sistema de reservas actual (plataforma de reservas, Google Calendar, WhatsApp) para que las consultas se respondan solas, se compruebe la disponibilidad real y se confirme la plaza sin que tengas que estar pendiente del m\xF3vil todo el d\xEDa, pudiendo configurarlo plenamente a tu gusto.")
    },
    {
      tag: window.t("Herramientas"),
      q: window.t("\xBFQu\xE9 necesito tener ya montado para empezar?"),
      a: window.t("Nada nuevo. No te cambiamos de programa: nos conectamos a las herramientas que ya usas \u2014tu sistema de reservas, Google Calendar, hojas de c\xE1lculo, CRM, WhatsApp\u2014 y automatizamos encima.")
    },
    {
      tag: window.t("Plazos"),
      q: window.t("\xBFCu\xE1nto se tarda en implementar?"),
      a: window.t("Depende de la complejidad, pero muchas automatizaciones sencillas est\xE1n listas en pocos d\xEDas. En el diagn\xF3stico inicial te damos un plazo real, no una estimaci\xF3n gen\xE9rica.")
    },
    {
      tag: window.t("Migraci\xF3n"),
      q: window.t("\xBFHay que cambiar de herramientas o software?"),
      a: window.t("No. Es uno de los principios del servicio: automatizamos sobre lo que ya tienes, no te obligamos a migrar a un sistema nuevo.")
    },
    {
      tag: window.t("Resultados"),
      q: window.t("\xBFC\xF3mo se muestran los resultados?"),
      a: window.t("Por defecto, en las mismas herramientas que ya usas: tu calendario se actualiza solo, te llega la confirmaci\xF3n por WhatsApp o email, tu hoja de c\xE1lculo se rellena sin que tengas que tocar nada. Si quieres verlo todo junto, podemos a\xF1adir un resumen o panel sencillo con lo que se ha hecho, explicado en lenguaje claro, sin tecnicismos.")
    }
  ];
  const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
  window.FaqSection = function FaqSection() {
    const [open, setOpen] = useState(() => /* @__PURE__ */ new Set([0]));
    const toggle = (i) => {
      setOpen((prev) => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i);
        else next.add(i);
        return next;
      });
    };
    return /* @__PURE__ */ React.createElement("section", { id: "faq", className: "v2-sec" }, /* @__PURE__ */ React.createElement("div", { className: "v2-inner" }, /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker" }, window.t("// antes de escribirnos")), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2" }, window.t("Lo que sueles "), /* @__PURE__ */ React.createElement("em", null, window.t("preguntar")), window.t(" antes de decidirte")), /* @__PURE__ */ React.createElement("p", { className: "v2-note" }, window.t("Las dudas m\xE1s habituales antes de pedir el diagn\xF3stico \u2014 sin gen\xE9ricos de blog, con la l\xF3gica real de Mazestudio."))), /* @__PURE__ */ React.createElement("div", { className: "faq-list" }, FAQS.map((f, i) => {
      const isOpen = open.has(i);
      return /* @__PURE__ */ React.createElement(Reveal, { key: f.q, delay: i * 0.05 }, /* @__PURE__ */ React.createElement("div", { className: "faq-item" + (isOpen ? " open" : "") }, /* @__PURE__ */ React.createElement("button", { className: "faq-q", "aria-expanded": isOpen, onClick: () => toggle(i) }, /* @__PURE__ */ React.createElement("span", { className: "faq-tag" }, f.tag), /* @__PURE__ */ React.createElement("span", { className: "faq-question" }, f.q), /* @__PURE__ */ React.createElement("span", { className: "faq-toggle", "aria-hidden": "true" }, "+")), /* @__PURE__ */ React.createElement("div", { className: "faq-a-wrap" }, /* @__PURE__ */ React.createElement("div", { className: "faq-a-inner" }, /* @__PURE__ */ React.createElement("p", { className: "faq-answer" }, f.a)))));
    }))), /* @__PURE__ */ React.createElement("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(FAQ_SCHEMA) } }));
  };
})();
})();

(function(){
(function() {
  const motion = window.Motion.motion;
  function fu(delay) {
    return {
      initial: { filter: "blur(10px)", y: 20 },
      whileInView: { filter: "blur(0px)", y: 0 },
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 0.7, delay, ease: "easeOut" }
    };
  }
  window.CtaSection = function CtaSection() {
    return /* @__PURE__ */ React.createElement("section", { id: "contacto", style: { position: "relative", overflow: "hidden", background: "#08070C", padding: "clamp(100.8px,16vh,176.4px) clamp(21px,6vw,84px)" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "assets/referencias/referencia-cubo-cristal-movil.webp",
        alt: "",
        "aria-hidden": "true",
        decoding: "async",
        className: "img-fade-in",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(.78) saturate(.92) blur(1px)"
        }
      }
    )), /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      inset: 0,
      zIndex: 1,
      pointerEvents: "none",
      background: "radial-gradient(120% 120% at 50% 30%, rgba(8,7,12,0) 40%, rgba(8,7,12,.74) 100%)"
    } }), /* @__PURE__ */ React.createElement("div", { className: "cta-converge", style: { position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" } }, /* @__PURE__ */ React.createElement(motion.h2, { ...fu(0), style: { fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1.5px", lineHeight: 1.1, color: "#fff", marginBottom: 42, maxWidth: 560 } }, window.t("Empieza a trazar tu l\xEDnea recta")), /* @__PURE__ */ React.createElement(motion.div, { ...fu(0.12), style: { transform: "scale(1.2)", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(window.MazeLogo, null)), /* @__PURE__ */ React.createElement(motion.div, { ...fu(0.28), className: "cta-acciones", style: { marginTop: 34 } }, /* @__PURE__ */ React.createElement("a", { href: "hablemos.html", className: "v2-btn v2-btn-white magnetic", style: { padding: "15px 28px", fontSize: 16.2 } }, window.t("Solicita tu auditor\xEDa gratis"), " ", /* @__PURE__ */ React.createElement(window.IconArrow, null)), /* @__PURE__ */ React.createElement("a", { href: window.CATALOGO_PDF, download: true, className: "v2-btn v2-btn-ghost", style: { padding: "15px 28px", fontSize: 16.2 } }, /* @__PURE__ */ React.createElement(window.IconDownload, null), " ", window.t("Descargar cat\xE1logo de servicios (PDF)"))), /* @__PURE__ */ React.createElement(motion.p, { ...fu(0.4), style: { marginTop: 22, fontFamily: "JetBrains Mono", fontSize: 13.2, color: "rgba(255,255,255,.65)" } }, window.t("info@mazestudio.site \xB7 respondemos en 24 h"))));
  };
  window.Footer = function Footer() {
    const links = [
      { label: window.t("C\xF3mo funciona"), href: "#como" },
      { label: window.t("Ahorro"), href: "#roi" },
      { label: window.t("Servicios"), href: "#servicios" },
      { label: window.t("\xBFNos necesitas?"), href: "#diagnostico" }
    ];
    return /* @__PURE__ */ React.createElement("footer", { className: "v2-footer" }, /* @__PURE__ */ React.createElement("div", { className: "inner" }, /* @__PURE__ */ React.createElement("div", { className: "top" }, /* @__PURE__ */ React.createElement("a", { href: "#top", style: { display: "flex", alignItems: "center", gap: 10 }, "aria-label": "Mazestudio" }, /* @__PURE__ */ React.createElement(window.MazeLogo, null), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque", fontWeight: 600, fontSize: 18.9, color: "#EAE8F2", letterSpacing: "-.02em" } }, "Maze studio", /* @__PURE__ */ React.createElement("span", { style: { color: "#4B8CF7" } }, "."))), /* @__PURE__ */ React.createElement("nav", null, links.map((l) => /* @__PURE__ */ React.createElement("a", { key: l.href, href: l.href }, l.label)), /* @__PURE__ */ React.createElement("a", { href: window.CATALOGO_PDF, download: true, className: "f-pdf" }, /* @__PURE__ */ React.createElement(window.IconDownload, null), " ", window.t("Cat\xE1logo de servicios"), " ", /* @__PURE__ */ React.createElement("span", null, "PDF")))), /* @__PURE__ */ React.createElement("div", { className: "bot" }, /* @__PURE__ */ React.createElement("span", null, window.t("\xA9 2026 Mazestudio \xB7 estudio de automatizaci\xF3n con IA \xB7 Tenerife"), " \xB7 ", window.t("\xDAltima actualizaci\xF3n"), ": ", "2026-08-06"), /* @__PURE__ */ React.createElement("span", { className: "legal" }, /* @__PURE__ */ React.createElement("a", { href: "aviso-legal.html" }, window.t("Aviso legal")), /* @__PURE__ */ React.createElement("a", { href: "privacidad.html" }, window.t("Privacidad")), /* @__PURE__ */ React.createElement("a", { href: "cookies.html" }, "Cookies")))));
  };
})();
})();

(function(){
(function() {
  const { useState, useEffect, useRef } = React;
  const motion = window.Motion.motion;
  const PRE_MOVIL = window.matchMedia("(max-width:860px)").matches;
  const PRE_VIDEO = PRE_MOVIL ? "assets/referencias/referencia-cubo-cristal-01-movil-loop.mp4" : "assets/referencias/referencia-cubo-cristal-01-4k60-loop.mp4";
  const PRE_POSTER = PRE_MOVIL ? "assets/referencias/poster-cubo-carga-movil.jpg" : "assets/referencias/poster-cubo-carga.jpg";
  window.__preloaderActive = true;
  function MazeSolve() {
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 240 240", width: "100%", height: "100%", style: { display: "block", overflow: "visible" } }, /* @__PURE__ */ React.createElement("g", { stroke: "rgba(255,255,255,.16)", strokeWidth: "2", fill: "none", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "2", y: "2", width: "236", height: "236", rx: "8" }), /* @__PURE__ */ React.createElement("line", { x1: "0", y1: "42", x2: "198", y2: "42" }), /* @__PURE__ */ React.createElement("line", { x1: "42", y1: "82", x2: "240", y2: "82" }), /* @__PURE__ */ React.createElement("line", { x1: "0", y1: "122", x2: "198", y2: "122" }), /* @__PURE__ */ React.createElement("line", { x1: "42", y1: "162", x2: "240", y2: "162" }), /* @__PURE__ */ React.createElement("line", { x1: "0", y1: "202", x2: "198", y2: "202" })), /* @__PURE__ */ React.createElement(
      "path",
      {
        d: "M20 22 H220 V62 H20 V102 H220 V142 H20 V182 H220 V222 H20",
        fill: "none",
        stroke: "var(--accent)",
        strokeOpacity: ".14",
        strokeWidth: "4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ), /* @__PURE__ */ React.createElement(
      motion.path,
      {
        d: "M20 22 H220 V62 H20 V102 H220 V142 H20 V182 H220 V222 H20",
        fill: "none",
        stroke: "var(--accent)",
        strokeWidth: "4.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: { filter: "drop-shadow(0 0 5px var(--accent)) drop-shadow(0 0 12px rgba(75,140,247,.55))" },
        initial: { pathLength: 0, opacity: 0.9 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 3.4, ease: "easeInOut" }
      }
    ));
  }
  function Preloader() {
    const [pct, setPct] = useState(0);
    const [hide, setHide] = useState(false);
    const [gone, setGone] = useState(false);
    const [playing, setPlaying] = useState(false);
    const vref = useRef(null);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    useEffect(() => {
      if (reduced) return;
      const v = vref.current;
      if (!v) return;
      const onPlaying = () => setPlaying(true);
      v.addEventListener("playing", onPlaying);
      v.play().catch(() => {
      });
      return () => v.removeEventListener("playing", onPlaying);
    }, []);
    useEffect(() => {
      const DUR = 3400, start = performance.now();
      let raf;
      const tick = (t) => {
        const p = Math.min(1, (t - start) / DUR);
        const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        setPct(Math.round(e * 100));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, []);
    useEffect(() => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        setHide(true);
        window.__preloaderActive = false;
        window.dispatchEvent(new Event("preloader-done"));
        setTimeout(() => setGone(true), 650);
      };
      const t = setTimeout(() => {
        if (document.readyState === "complete") finish();
        else window.addEventListener("load", finish, { once: true });
      }, 2500);
      const hard = setTimeout(finish, 3e3);
      return () => {
        clearTimeout(t);
        clearTimeout(hard);
        window.removeEventListener("load", finish);
      };
    }, []);
    useEffect(() => {
      document.documentElement.style.overflowY = gone ? "" : "hidden";
    }, [gone]);
    if (gone) return null;
    return /* @__PURE__ */ React.createElement(
      motion.div,
      {
        animate: { opacity: hide ? 0 : 1 },
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#08070C",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: hide ? "none" : "auto"
        }
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: PRE_POSTER,
          alt: "",
          "aria-hidden": "true",
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
        }
      ),
      !reduced && /* @__PURE__ */ React.createElement(
        "video",
        {
          ref: vref,
          src: PRE_VIDEO,
          muted: true,
          playsInline: true,
          loop: true,
          autoPlay: true,
          preload: "auto",
          style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: playing ? 1 : 0,
            transition: "opacity .5s ease"
          }
        }
      ),
      /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(120% 120% at 50% 50%, rgba(8,7,12,.42) 0%, rgba(8,7,12,.84) 100%)"
      } }),
      /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "clamp(180px,40vw,256px)", aspectRatio: "1" } }, /* @__PURE__ */ React.createElement(MazeSolve, null)), /* @__PURE__ */ React.createElement("div", { style: {
        fontFamily: "JetBrains Mono",
        fontSize: 12.6,
        letterSpacing: ".2em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,.62)"
      } }, window.t("Trazando la l\xEDnea recta"), " \xB7 ", pct, "%"))
    );
  }
  window.Preloader = Preloader;
})();
})();

(function(){
(function() {
  const { useEffect, useRef } = React;
  const MotionConfig = window.Motion.MotionConfig;
  function SmoothScroll() {
    useEffect(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      if (reduced || coarse || !window.gsap || !window.ScrollTrigger || !window.ScrollSmoother) return;
      window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollSmoother);
      const smoother = window.ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        // segundos de "catch-up" del contenido
        effects: true
        // habilita data-speed / data-lag
      });
      const refresh = () => window.ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = setTimeout(refresh, 1e3);
      return () => {
        window.removeEventListener("load", refresh);
        clearTimeout(t);
        if (smoother) smoother.kill();
      };
    }, []);
    return null;
  }
  function App() {
    return /* @__PURE__ */ React.createElement(MotionConfig, { reducedMotion: "user" }, /* @__PURE__ */ React.createElement(SmoothScroll, null), /* @__PURE__ */ React.createElement(window.Preloader, null), /* @__PURE__ */ React.createElement("div", { id: "smooth-wrapper" }, /* @__PURE__ */ React.createElement("div", { id: "smooth-content" }, /* @__PURE__ */ React.createElement(window.ScrollFX, null), /* @__PURE__ */ React.createElement(window.CinematicTransitions, null), /* @__PURE__ */ React.createElement(window.HeroSection, null), /* @__PURE__ */ React.createElement(window.LineaRectaSection, null), /* @__PURE__ */ React.createElement(window.MarqueeSection, null), /* @__PURE__ */ React.createElement(window.ComoFuncionaSection, null), /* @__PURE__ */ React.createElement(window.CatalogoSection, null), /* @__PURE__ */ React.createElement(window.RoiSection, null), /* @__PURE__ */ React.createElement(window.ServiciosSection, null), /* @__PURE__ */ React.createElement(window.PorQueSection, null), /* @__PURE__ */ React.createElement(window.FaqSection, null), /* @__PURE__ */ React.createElement(window.CtaSection, null), /* @__PURE__ */ React.createElement(window.Footer, null))));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
})();
})();
