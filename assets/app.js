/* mazestudio · app.js — GENERADO por build.mjs. NO editar a mano.
   Fuente: WEB/src/mazestudio-web.html · regenerar: npm run build */
/* MZLASTMOD:2026-08-24 */
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
      }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
      if (ref.current) io.observe(ref.current);
      return () => io.disconnect();
    }, []);
    return /* @__PURE__ */ React.createElement(
      motion.div,
      {
        ref,
        className,
        initial: { y, opacity: 0 },
        animate: inView ? { y: 0, opacity: 1 } : {},
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
      let raf = null, max = 0;
      const medir = () => {
        const h = document.documentElement;
        max = h.scrollHeight - h.clientHeight;
      };
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const p = max > 0 ? window.scrollY / max : 0;
          if (bar) bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
          raf = null;
        });
      };
      medir();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", medir);
      onScroll();
      const ctx = window.gsap && window.ScrollTrigger && !reduced && !coarse ? window.gsap.context(() => {
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
          let cx = 0, cy = 0;
          const enter = () => {
            const r = el.getBoundingClientRect();
            cx = r.left + r.width / 2;
            cy = r.top + r.height / 2;
          };
          const move = (e) => {
            el.style.transform = `translate(${(e.clientX - cx) * 0.22}px, ${(e.clientY - cy) * 0.3}px)`;
          };
          const leave = () => {
            el.style.transform = "translate(0,0)";
          };
          el.addEventListener("pointerenter", enter);
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointerenter", enter);
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }
      let rfTimer;
      const refresh = () => {
        clearTimeout(rfTimer);
        rfTimer = setTimeout(() => {
          medir();
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        }, 120);
      };
      window.__refreshST = refresh;
      window.addEventListener("load", refresh);
      setTimeout(refresh, 1400);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", medir);
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
      { label: t("Qu\xE9 cambia"), href: "#servicios" },
      { label: t("Servicios"), href: "#como" },
      { label: t("Ahorro"), href: "#roi" },
      { label: t("FAQ"), href: "#faq" }
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
    )), /* @__PURE__ */ React.createElement("div", { className: "v2nav-right", style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("a", { href: "hablemos.html", className: "v2nav-cta-movil" }, t("Hablemos \u2192")), /* @__PURE__ */ React.createElement(LangToggle, null), /* @__PURE__ */ React.createElement(
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
  const HERO_POSTER = MOVIL ? "assets/referencias/poster-cubo-carga-movil.webp" : "assets/referencias/poster-cubo-carga.webp";
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
    const cajaCta = useRef(null);
    const onCtaEnter = () => {
      const el = ctaRef.current;
      if (el) cajaCta.current = el.getBoundingClientRect();
    };
    const onCtaMove = (e) => {
      const el = ctaRef.current, r = cajaCta.current;
      if (!el || !r) return;
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
    return /* @__PURE__ */ React.createElement("section", { id: "top", style: { position: "relative", width: "100%", height: "82svh", minHeight: 640, background: "#08070C", overflow: "hidden" } }, /* @__PURE__ */ React.createElement(window.FadingVideo, { src: HERO_VIDEO, poster: HERO_POSTER, style: { zIndex: 0 } }), /* @__PURE__ */ React.createElement("div", { style: {
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
      /* @__PURE__ */ React.createElement("div", { className: "hero-chips" }, /* @__PURE__ */ React.createElement("span", { className: "chip" }, window.t("Sur de Tenerife")), /* @__PURE__ */ React.createElement("span", { className: "chip chip-on" }, window.t("Sobre las herramientas que ya usas")), /* @__PURE__ */ React.createElement("span", { className: "chip" }, window.t("Demos en vivo, sin registro"))),
      /* @__PURE__ */ React.createElement("div", { className: "hero-cta-row" }, /* @__PURE__ */ React.createElement(
        "a",
        {
          ref: ctaRef,
          href: "hablemos.html",
          className: "btn-glow",
          ...enableMagnet ? { onPointerEnter: onCtaEnter, onPointerMove: onCtaMove, onPointerLeave: onCtaLeave } : {}
        },
        /* @__PURE__ */ React.createElement("span", { ref: faceRef, className: "btn-glow-face" }, window.t("Auditor\xEDa gratis en 3 d\xEDas"), /* @__PURE__ */ React.createElement("span", { className: "btn-glow-arrow", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(window.IconArrow, null)))
      ))
    )));
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
  const HeadReveal = window.HeadReveal;
  const Reveal = window.Reveal;
  const APPS = ["WhatsApp", "Gmail", window.t("Calendario"), window.t("Hojas de c\xE1lculo")];
  const VERBOS = ["responder", "agendar", "archivar", "avisar"].map((w) => window.t(w));
  const PARES = [
    ["Correos que se acumulan sin responder", "Cada mensaje clasificado y respondido solo"],
    ["Facturas y albaranes que se traspapelan", "Facturas generadas y archivadas sin tocar nada"],
    ["Citas y reservas apuntadas a mano", "Reservas con disponibilidad real y recordatorios"],
    ["Datos copiados de una app a otra", "Tus herramientas sincronizadas entre ellas"],
    ["Tareas que dependen de que te acuerdes", "Funciona aunque t\xFA no est\xE9s"]
  ].map(([a, d]) => [window.t(a), window.t(d)]);
  window.ServiciosSection = function ServiciosSection() {
    const flowRef = useRef(null);
    const [verbo, setVerbo] = useState(0);
    useEffect(() => {
      const els = flowRef.current ? Array.from(flowRef.current.querySelectorAll(".lc-ch")) : [];
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        els.forEach((el) => el.classList.add("in"));
        return;
      }
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.35, rootMargin: "0px 0px -8% 0px" });
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, []);
    useEffect(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const id = setInterval(() => setVerbo((v) => (v + 1) % VERBOS.length), 1400);
      return () => clearInterval(id);
    }, []);
    return /* @__PURE__ */ React.createElement(
      "section",
      {
        id: "servicios",
        className: "v2-sec",
        style: { paddingTop: "clamp(60px,9vh,110px)", paddingBottom: "clamp(90px,13vh,150px)" }
      },
      /* @__PURE__ */ React.createElement("div", { className: "v2-inner lc-rail" }, /* @__PURE__ */ React.createElement("aside", { className: "lc-side" }, /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker" }, window.t("// qu\xE9 es esto")), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2", style: { fontSize: "clamp(30px,3.5vw,48px)", lineHeight: 1.03, letterSpacing: "-1.7px" } }, window.t("Ponemos tus tareas repetitivas "), /* @__PURE__ */ React.createElement("em", null, window.t("en piloto autom\xE1tico")), "."), /* @__PURE__ */ React.createElement("p", { className: "v2-note", style: { marginTop: 20, maxWidth: "42ch" } }, window.t("Conectamos con IA las herramientas que ya usas para que buena parte del trabajo diario se haga solo. Sin software nuevo que aprender ni migraciones: automatizamos sobre lo que ya tienes."))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.15 }, /* @__PURE__ */ React.createElement("div", { className: "lc-con" }, /* @__PURE__ */ React.createElement("div", { className: "lc-con-top" }, /* @__PURE__ */ React.createElement("i", null), " ", window.t("mazestudio \xB7 en vivo")), /* @__PURE__ */ React.createElement("div", { className: "lc-apps" }, APPS.map((a) => /* @__PURE__ */ React.createElement("span", { key: a }, /* @__PURE__ */ React.createElement("i", null), a))), /* @__PURE__ */ React.createElement("div", { className: "lc-pipe" }), /* @__PURE__ */ React.createElement("div", { className: "lc-line" }, /* @__PURE__ */ React.createElement("b", null, "IA"), /* @__PURE__ */ React.createElement("span", { className: "w" }, VERBOS[verbo]), /* @__PURE__ */ React.createElement("span", { className: "lc-caret" }, "\u258D"))))), /* @__PURE__ */ React.createElement("div", { className: "lc-flow", ref: flowRef }, /* @__PURE__ */ React.createElement("div", { className: "lc-head" }, /* @__PURE__ */ React.createElement("span", null, window.t("lo que cambia")), /* @__PURE__ */ React.createElement("small", null, window.t("05 cambios"))), PARES.map(([antes, despues], i) => /* @__PURE__ */ React.createElement("article", { className: "lc-ch", key: i }, /* @__PURE__ */ React.createElement("span", { className: "lc-n" }, "0" + (i + 1)), /* @__PURE__ */ React.createElement("p", { className: "lc-antes" }, antes), /* @__PURE__ */ React.createElement("p", { className: "lc-despues" }, despues, i === PARES.length - 1 && /* @__PURE__ */ React.createElement("span", { className: "lc-247" }, "24/7"))))))
    );
  };
})();
})();

(function(){
(function() {
  const { useState, useEffect, useRef } = React;
  const Reveal = window.Reveal;
  const HeadReveal = window.HeadReveal;
  const t = window.t;
  const IC = {
    folder: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="23" height="16" rx="1" fill="#2D4ECC"/><rect x="2" y="10" width="23" height="16" rx="1" fill="#4361F0"/><path d="M2 10h11l2-4h10v4H2z" fill="#2D4ECC"/><path d="M2 10h10l2-4h9v4H2z" fill="#8295F2"/><rect x="6" y="18" width="13" height="2" rx="1" fill="#ECEDF2" opacity=".55"/><rect x="6" y="21" width="9" height="2" rx="1" fill="#ECEDF2" opacity=".35"/></svg>`,
    calendar: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="22" height="21" rx="1" fill="#2D4ECC"/><rect x="2" y="5" width="22" height="21" rx="1" fill="#4361F0"/><rect x="2" y="5" width="22" height="7" rx="1" fill="#8295F2"/><rect x="7" y="3" width="3" height="5" rx="1" fill="#ECEDF2"/><rect x="16" y="3" width="3" height="5" rx="1" fill="#ECEDF2"/><rect x="5" y="16" width="4" height="4" rx="1" fill="#ECEDF2" opacity=".7"/><rect x="11" y="16" width="4" height="4" rx="1" fill="#ECEDF2" opacity=".7"/><rect x="17" y="16" width="4" height="4" rx="1" fill="#8295F2"/></svg>`,
    chat: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="22" height="17" rx="2" fill="#2D4ECC"/><rect x="2" y="4" width="22" height="17" rx="2" fill="#4361F0"/><polygon points="6,21 14,21 6,27" fill="#2D4ECC"/><polygon points="5,20 13,20 5,26" fill="#4361F0"/><rect x="7" y="11" width="3" height="3" rx="1" fill="#ECEDF2" opacity=".85"/><rect x="12" y="11" width="3" height="3" rx="1" fill="#ECEDF2" opacity=".85"/><rect x="17" y="11" width="3" height="3" rx="1" fill="#8295F2" opacity=".6"/></svg>`,
    phone: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="3" width="13" height="24" rx="2.5" fill="#2D4ECC"/><rect x="7" y="2" width="13" height="24" rx="2.5" fill="#4361F0"/><rect x="9" y="5" width="9" height="15" rx="1" fill="#0B0C10" opacity=".55"/><rect x="11" y="22" width="5" height="2" rx="1" fill="#8295F2" opacity=".75"/><path d="M22 6a7 7 0 0 1 0 10" stroke="#86E6FF" stroke-width="1.4" fill="none" opacity=".8"/><path d="M24.5 3.5a11 11 0 0 1 0 15" stroke="#86E6FF" stroke-width="1.2" fill="none" opacity=".45"/></svg>`,
    radar: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="12" fill="#2D4ECC"/><circle cx="14" cy="14" r="12" fill="#4361F0"/><circle cx="14" cy="14" r="7.8" fill="none" stroke="#8295F2" stroke-width="1.1" opacity=".55"/><circle cx="14" cy="14" r="3.6" fill="none" stroke="#8295F2" stroke-width="1.1" opacity=".55"/><path d="M14 14 L23 8" stroke="#ECEDF2" stroke-width="1.7" stroke-linecap="round"/><path d="M14 14 L26 14 A12 12 0 0 0 20 3.6 Z" fill="#86E6FF" opacity=".28"/><circle cx="20" cy="9" r="1.9" fill="#86E6FF"/></svg>`,
    funnel: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h21l-8 10v10l-5 3V14z" fill="#2D4ECC"/><path d="M3 3h21l-8 10v10l-5 3V13z" fill="#4361F0"/><path d="M3 3h21l-3 3.8H6z" fill="#8295F2"/><circle cx="13" cy="20" r="2.2" fill="#86E6FF" opacity=".85"/></svg>`,
    megafono: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 11h5l11-6v18l-11-6H5z" fill="#2D4ECC"/><path d="M4 10h5l11-6v18L9 16H4z" fill="#4361F0"/><path d="M4 10h5v6H4z" fill="#8295F2" opacity=".7"/><path d="M23 9a6 6 0 0 1 0 8" stroke="#86E6FF" stroke-width="1.5" fill="none"/><rect x="6" y="16" width="4" height="8" rx="1.5" fill="#2D4ECC"/></svg>`,
    grafica: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="22" height="22" rx="1.5" fill="#2D4ECC"/><rect x="3" y="3" width="22" height="22" rx="1.5" fill="#4361F0"/><rect x="6" y="15" width="3.6" height="7" rx="1" fill="#ECEDF2" opacity=".75"/><rect x="11.4" y="11" width="3.6" height="11" rx="1" fill="#8295F2"/><rect x="16.8" y="7" width="3.6" height="15" rx="1" fill="#86E6FF" opacity=".9"/><path d="M6 12l5.4-4 5.4-3 4 2" stroke="#ECEDF2" stroke-width="1.2" fill="none" opacity=".4"/></svg>`,
    equipo: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="9" r="4.4" fill="#4361F0"/><path d="M2 24c0-4.4 3.6-7.2 8-7.2s8 2.8 8 7.2z" fill="#2D4ECC"/><circle cx="20" cy="11" r="3.6" fill="#8295F2"/><path d="M13.5 24c0-3.6 2.9-6 6.5-6s6 2.4 6 6z" fill="#4361F0" opacity=".75"/><circle cx="24" cy="6" r="2.6" fill="#86E6FF" opacity=".9"/></svg>`,
    estrella: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="15,3 18.6,10.4 26.8,11.6 20.9,17.3 22.3,25.4 15,21.6 7.7,25.4 9.1,17.3 3.2,11.6 11.4,10.4" fill="#2D4ECC"/><polygon points="14,2 17.6,9.4 25.8,10.6 19.9,16.3 21.3,24.4 14,20.6 6.7,24.4 8.1,16.3 2.2,10.6 10.4,9.4" fill="#4361F0"/><polygon points="14,2 17.6,9.4 25.8,10.6 19.9,16.3 14,13" fill="#8295F2" opacity=".55"/><circle cx="23" cy="22" r="3.4" fill="#34D399"/></svg>`
  };
  const MOMENTOS = [
    {
      n: "01",
      tit: "Te escriben",
      c: "var(--m1)",
      gloss: "Llega una consulta, venga por donde venga \u2014 y se responde sola, a cualquier hora.",
      procesos: [
        {
          id: "atencion",
          num: "01",
          ic: "chat",
          live: true,
          mw: 540,
          url: "https://atencion.demos.mazestudio.site/",
          name: "Atenci\xF3n al cliente",
          desc: "Tu WhatsApp responde solo, 24/7, con la informaci\xF3n real de tu negocio. Al segundo y a cualquier hora."
        },
        {
          id: "telefonica",
          num: "02",
          ic: "phone",
          live: true,
          mw: 1180,
          url: "https://procesos.demos.mazestudio.site/telefonica/",
          name: "Atenci\xF3n telef\xF3nica",
          desc: "La IA descuelga, entiende y reserva por voz. Al colgar, la cita ya est\xE1 puesta y el resumen escrito."
        }
      ]
    },
    {
      n: "02",
      tit: "Se cierra",
      c: "var(--m2)",
      gloss: "El momento que cobra: el lead se cualifica, sale el presupuesto y se coge el hueco.",
      procesos: [
        {
          id: "captacion",
          num: "03",
          ic: "funnel",
          live: true,
          mw: 1240,
          url: "https://procesos.demos.mazestudio.site/captacion/",
          name: "Captaci\xF3n y ventas",
          desc: "Llegue de donde llegue \u2014web, WhatsApp, Instagram\u2014, la IA lo lee, lo punt\xFAa y manda presupuesto. Nadie se queda sin seguimiento."
        },
        {
          id: "citas",
          num: "04",
          ic: "calendar",
          live: true,
          mw: 1160,
          url: "https://inmobiliaria-demo.demos.mazestudio.site/",
          name: "Reservas y citas",
          desc: "Tu cliente coge hueco con disponibilidad real y confirmaci\xF3n autom\xE1tica. Sin llamadas ni WhatsApp cruzados."
        }
      ]
    },
    {
      n: "03",
      tit: "Lo hac\xE9is",
      c: "var(--m3)",
      gloss: "El trabajo del d\xEDa: sin papeleo, sin reenviar nada a mano, sin grupos de WhatsApp.",
      procesos: [
        {
          id: "documental",
          num: "05",
          ic: "folder",
          live: true,
          mw: 1160,
          url: "https://gestion.demos.mazestudio.site/?v=2",
          name: "Gesti\xF3n documental",
          desc: "Facturas y n\xF3minas llegan por correo, se leen, se clasifican con IA y se archivan solas en Drive."
        },
        {
          id: "equipo",
          num: "06",
          ic: "equipo",
          live: true,
          mw: 1140,
          url: "https://procesos.demos.mazestudio.site/equipo/",
          name: "Equipo y operativa",
          desc: "Cada evento del d\xEDa decide solo a qui\xE9n le toca. Sin grupos de WhatsApp, sin reenviar nada a mano."
        },
        {
          id: "marketing",
          num: "07",
          ic: "megafono",
          live: true,
          mw: 1240,
          url: "https://procesos.demos.mazestudio.site/marketing/",
          name: "Comunicaci\xF3n y marketing",
          desc: "Un evento dispara el env\xEDo: la IA lo redacta con tu tono, elige el canal y t\xFA ves subir el contador."
        }
      ]
    },
    {
      n: "04",
      tit: "Vuelven",
      c: "var(--m4)",
      gloss: "Rese\xF1a, informe y aviso de lo que pasa ah\xED fuera \u2014 para que haya un d\xEDa siguiente.",
      procesos: [
        {
          id: "reputacion",
          num: "08",
          ic: "estrella",
          live: true,
          mw: 1240,
          url: "https://procesos.demos.mazestudio.site/reputacion/",
          name: "Reputaci\xF3n y postventa",
          desc: "Cada servicio pide rese\xF1a solo. Si es buena, se publica y se agradece. Si es mala, te avisa a ti antes que a nadie."
        },
        {
          id: "reporting",
          num: "09",
          ic: "grafica",
          live: true,
          mw: 1240,
          url: "https://procesos.demos.mazestudio.site/reporting/",
          name: "Control y reporting",
          desc: "Los datos se agregan solos. Cada semana, un resumen en tu idioma y no una tabla: \xABentraron 23 reservas, un 18 % m\xE1s\xBB."
        },
        {
          id: "radar",
          num: "10",
          ic: "radar",
          live: true,
          mw: 1200,
          url: "https://radar.demos.mazestudio.site/",
          name: "Radar de mercado",
          desc: "Tu panel tambi\xE9n mira hacia fuera: precios de la competencia, negocios nuevos, rese\xF1as \u2014 \xABbajaron el catamar\xE1n a 39 \u20AC\xBB."
        }
      ]
    }
  ];
  const HUB = {
    id: "crm",
    live: true,
    mw: 1240,
    url: "https://crm.demos.mazestudio.site/",
    feeds: ["whatsapp", "correo", "la web", "llamadas", "agenda", "presupuestos"]
  };
  const PARADAS = MOMENTOS.reduce((a, m) => a.concat(m.procesos), []);
  window.ComoFuncionaSection = function ComoFuncionaSection() {
    const [cur, setCur] = useState(null);
    const [frameH, setFrameH] = useState(null);
    const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
    const iframeRef = useRef(null);
    const modal = !!cur;
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
        if (e.key === "Escape") setCur(null);
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
        const f2 = iframeRef.current;
        if (!f2 || !e.source || e.source !== f2.contentWindow) return;
        const d = e.data;
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
    const abrir = (p) => {
      if (p && p.live) setCur(p);
    };
    return /* @__PURE__ */ React.createElement("section", { id: "como", className: "v2-sec rc-sec" }, /* @__PURE__ */ React.createElement("div", { className: "fx-glow", "data-depth": "0.2", style: { width: 420, height: 420, right: "-8%", top: "4%", background: "rgba(75,140,247,.3)" } }), /* @__PURE__ */ React.createElement("div", { className: "fx-glow", "data-depth": "0.12", style: { width: 480, height: 480, left: "-60px", bottom: "-190px", background: "rgba(75,140,247,.16)", filter: "blur(90px)", opacity: 1 } }), /* @__PURE__ */ React.createElement("div", { className: "fx-glow", "data-depth": "0.12", style: { width: 420, height: 420, right: "-50px", bottom: "-160px", background: "rgba(99,80,170,.15)", filter: "blur(90px)", opacity: 1 } }), /* @__PURE__ */ React.createElement("div", { className: "v2-inner" }, /* @__PURE__ */ React.createElement("div", { className: "rc-head" }, /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker" }, t("// servicios")), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2" }, t("Los procesos que tu negocio repite cada d\xEDa, "), /* @__PURE__ */ React.createElement("em", null, t("ya automatizados")), "."), /* @__PURE__ */ React.createElement("p", { className: "v2-note" }, t("Procesos ya dise\xF1ados e implementados. Cada parada es una automatizaci\xF3n que ya funciona y que se puede contratar por separado. Todo desde un panel \xFAnico donde ves todos los servicios que tienes contratados.")))), /* @__PURE__ */ React.createElement("div", { className: "rc-bandas" }, MOMENTOS.map((m, i) => /* @__PURE__ */ React.createElement(
      Reveal,
      {
        key: m.n,
        className: "rc-banda",
        delay: i * 0.04,
        style: { "--ac": m.c, "--span": 6 / m.procesos.length }
      },
      /* @__PURE__ */ React.createElement("div", { className: "rc-rotulo" }, /* @__PURE__ */ React.createElement("p", { className: "rc-num" }, m.n), /* @__PURE__ */ React.createElement("h3", { className: "rc-tit" }, t(m.tit)), /* @__PURE__ */ React.createElement("p", { className: "rc-gloss" }, t(m.gloss)), /* @__PURE__ */ React.createElement("span", { className: "rc-cuenta" }, m.procesos.length, " ", t("procesos"))),
      /* @__PURE__ */ React.createElement("div", { className: "rc-modulos" }, m.procesos.map((p) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: p.id,
          type: "button",
          disabled: !p.live,
          className: "rc-mod " + (p.live ? "live" : "soon"),
          onClick: () => abrir(p)
        },
        /* @__PURE__ */ React.createElement("span", { className: "rc-mrow" }, /* @__PURE__ */ React.createElement("span", { className: "rc-micon", dangerouslySetInnerHTML: { __html: IC[p.ic] } }), /* @__PURE__ */ React.createElement("span", { className: "rc-mnum" }, p.num), !p.live && /* @__PURE__ */ React.createElement("span", { className: "rc-mtag" }, t("en preparaci\xF3n"))),
        /* @__PURE__ */ React.createElement("span", { className: "rc-mname" }, t(p.name)),
        /* @__PURE__ */ React.createElement("span", { className: "rc-mdesc" }, t(p.desc)),
        p.live && /* @__PURE__ */ React.createElement("span", { className: "rc-mcta" }, t("Ver demo"), " ", /* @__PURE__ */ React.createElement("em", null, "\u2192"))
      )))
    ))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.06 }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "rc-cierre", onClick: () => abrir(HUB) }, /* @__PURE__ */ React.createElement("span", { className: "rc-cbody" }, /* @__PURE__ */ React.createElement("span", { className: "rc-ckick" }, t("// y todo aterriza en el mismo sitio")), /* @__PURE__ */ React.createElement("span", { className: "rc-ctit" }, t("Todo tu negocio, en un solo sitio.")), /* @__PURE__ */ React.createElement("span", { className: "rc-cdesc" }, t("Las diez paradas anteriores acaban aqu\xED: un solo panel con tus clientes, sus mensajes, sus citas y sus documentos. Dejas de saltar entre seis apps y abres solo una.")), /* @__PURE__ */ React.createElement("span", { className: "rc-cbtn" }, t("Abrir el panel"), " ", /* @__PURE__ */ React.createElement("em", null, "\u2192"))), /* @__PURE__ */ React.createElement("span", { className: "rc-feeds" }, HUB.feeds.map((f) => /* @__PURE__ */ React.createElement("span", { key: f }, t(f)))))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.1, className: "rc-foot" }, /* @__PURE__ */ React.createElement("p", null, t("\xBFNo ves el tuyo? Casi siempre es una mezcla de dos. Cu\xE9ntanos qu\xE9 haces a mano y te montamos la demo con tus datos antes de decidir nada.")), /* @__PURE__ */ React.createElement("a", { href: "hablemos.html" }, t("Hablemos"), " ", /* @__PURE__ */ React.createElement("em", null, "\u2192")))), modal && ReactDOM.createPortal(
      /* @__PURE__ */ React.createElement("div", { className: "dp-modal", onClick: () => setCur(null) }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "dp-shell",
          style: vw > 860 ? { maxWidth: "min(94vw, " + (cur.mw || 760) + "px)" } : void 0,
          onClick: (e) => e.stopPropagation()
        },
        /* @__PURE__ */ React.createElement("button", { className: "dp-close", "aria-label": t("Cerrar demo"), onClick: () => setCur(null) }, "\u2715"),
        /* @__PURE__ */ React.createElement("div", { className: "dp-frame", style: vw > 860 && frameH ? { height: frameH + "px" } : void 0 }, /* @__PURE__ */ React.createElement("iframe", { ref: iframeRef, src: cur.url + (cur.url.indexOf("?") < 0 ? "?" : "&") + "embed=1", title: t(cur.name || "Todo tu negocio, en un solo sitio."), allow: "fullscreen" }))
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
    return /* @__PURE__ */ React.createElement("section", { id: "empresa", className: "qd-sec" }, /* @__PURE__ */ React.createElement("div", { className: "qd-grid" }, /* @__PURE__ */ React.createElement("div", { className: "qd-cell qd-tl" }, /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker" }, window.t("// qui\xE9nes somos")), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2" }, window.t("El laberinto, resuelto "), /* @__PURE__ */ React.createElement("em", null, window.t("con IA")), window.t(". En Tenerife.")), /* @__PURE__ */ React.createElement("p", { className: "v2-note" }, window.t("Excursiones en Costa Adeje, Los Cristianos y Las Am\xE9ricas, comercios y pymes de toda Canarias recuperan horas que hoy pierden en tareas repetitivas."))), /* @__PURE__ */ React.createElement("div", { className: "pq-grid" }, VALUES.map((v, i) => /* @__PURE__ */ React.createElement(Reveal, { key: v.h, delay: i * 0.06 }, /* @__PURE__ */ React.createElement("div", { className: "pq-card", onPointerMove: spotlight }, /* @__PURE__ */ React.createElement("div", { className: "pq-ic" }, v.ic), /* @__PURE__ */ React.createElement("h3", null, v.h), /* @__PURE__ */ React.createElement("p", null, v.p)))))), /* @__PURE__ */ React.createElement(CuboMarca, null)));
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
      let r = null;
      const enter = () => {
        r = el.getBoundingClientRect();
      };
      const move = (e) => {
        if (!r) return;
        el.style.setProperty("--mx", (e.clientX - r.left) / r.width * 100 + "%");
        el.style.setProperty("--my", (e.clientY - r.top) / r.height * 100 + "%");
      };
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointermove", move);
      return () => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointermove", move);
      };
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
        className: "dl-btn" + (estado === "yendo" ? " is-yendo" : estado === "listo" ? " is-listo" : "")
      },
      /* @__PURE__ */ React.createElement("span", { className: "dl-fill", "aria-hidden": "true" }),
      /* @__PURE__ */ React.createElement("span", { className: "dl-ico", "aria-hidden": "true" }, estado === "listo" ? /* @__PURE__ */ React.createElement("svg", { className: "ok", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("polyline", { points: "4 12.5 9.5 18 20 6.5" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(window.IconDownload, null), /* @__PURE__ */ React.createElement(window.IconDownload, null))),
      /* @__PURE__ */ React.createElement("span", { className: "dl-label" }, etiqueta),
      /* @__PURE__ */ React.createElement("span", { className: "dl-tag" }, "PDF")
    )), /* @__PURE__ */ React.createElement("i", { "aria-hidden": "true" }))));
  };
})();
})();

(function(){
(function() {
  const { useState, useEffect, useRef } = React;
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
    const recDate = (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
    return /* @__PURE__ */ React.createElement("section", { id: "roi", className: "roi2-sec", ref: wrapRef }, /* @__PURE__ */ React.createElement("div", { className: "roi2-inner" }, /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("div", { className: "roi2-head" }, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker", style: { textAlign: "center" } }, window.t("// tu ahorro estimado")), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2", style: { fontSize: "clamp(23px,4.9vw,61px)", textAlign: "center" } }, window.t("\xBFCu\xE1nto te ahorras "), /* @__PURE__ */ React.createElement("em", null, window.t("al mes?"))))), /* @__PURE__ */ React.createElement("div", { className: "rec-stage" }, /* @__PURE__ */ React.createElement("div", { className: "slot", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "rec" + (inView ? " on" : "") }, /* @__PURE__ */ React.createElement("div", { className: "rec-grain", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "rec-stamp" }, window.t("estimaci\xF3n"), /* @__PURE__ */ React.createElement("b", null, window.t("orientativa"))), /* @__PURE__ */ React.createElement("div", { className: "rec-brand" }, "Mazestudio", /* @__PURE__ */ React.createElement("small", null, window.t("Automatizaci\xF3n con IA \xB7 Tenerife"))), /* @__PURE__ */ React.createElement("hr", { className: "rule" }), /* @__PURE__ */ React.createElement("div", { className: "rec-meta" }, /* @__PURE__ */ React.createElement("span", null, "N\xBA 0001"), /* @__PURE__ */ React.createElement("span", null, recDate)), /* @__PURE__ */ React.createElement("hr", { className: "rule" }), /* @__PURE__ */ React.createElement("div", { className: "rec-lbl" }, /* @__PURE__ */ React.createElement("span", null, window.t("Horas/semana repetitivas")), /* @__PURE__ */ React.createElement("b", null, horas, /* @__PURE__ */ React.createElement("i", null, "h"))), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "rec-rng",
        type: "range",
        min: "0",
        max: "40",
        step: "1",
        value: horas,
        style: { "--p": hPct + "%", marginBottom: 19 },
        onChange: (e) => setHoras(+e.target.value),
        "aria-label": window.t("Horas por semana en tareas repetitivas")
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "rec-lbl" }, /* @__PURE__ */ React.createElement("span", null, window.t("Coste por hora")), /* @__PURE__ */ React.createElement("b", null, coste, /* @__PURE__ */ React.createElement("i", null, "\u20AC"))), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "rec-rng",
        type: "range",
        min: "8",
        max: "30",
        step: "1",
        value: coste,
        style: { "--p": cPct + "%", marginBottom: 19 },
        onChange: (e) => setCoste(+e.target.value),
        "aria-label": window.t("Coste por hora")
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "rec-lbl", style: { marginBottom: 0 } }, /* @__PURE__ */ React.createElement("span", null, window.t("Nivel de repetici\xF3n"))), /* @__PURE__ */ React.createElement("div", { className: "rec-lvls" }, levels.map(([lbl, v]) => /* @__PURE__ */ React.createElement("button", { key: lbl, type: "button", className: "rec-lvl" + (lvl === v ? " active" : ""), onClick: () => setLvl(v) }, lbl))), /* @__PURE__ */ React.createElement("hr", { className: "rule" }), /* @__PURE__ */ React.createElement("div", { className: "rec-row" }, /* @__PURE__ */ React.createElement("span", null, window.t("Horas que recuperas / mes")), /* @__PURE__ */ React.createElement("b", null, fmt(cH), " h")), /* @__PURE__ */ React.createElement("div", { className: "rec-row" }, /* @__PURE__ */ React.createElement("span", null, window.t("Jornadas libres / a\xF1o")), /* @__PURE__ */ React.createElement("b", null, fmt(cD), " ", window.t("d\xEDas"))), /* @__PURE__ */ React.createElement("hr", { className: "rule solid" }), /* @__PURE__ */ React.createElement("div", { className: "rec-total" }, /* @__PURE__ */ React.createElement("span", null, window.t("Total")), /* @__PURE__ */ React.createElement("b", null, fmt(cM), /* @__PURE__ */ React.createElement("i", null, window.t(" \u20AC/mes")))), /* @__PURE__ */ React.createElement("div", { className: "rec-year" }, fmt(cY), window.t(" \u20AC al a\xF1o")), /* @__PURE__ */ React.createElement("div", { className: "rec-cut" }, /* @__PURE__ */ React.createElement("a", { className: "rec-cta", href: "hablemos.html" }, window.t("Confirmar estos n\xFAmeros \u2014 gratis"), " ", /* @__PURE__ */ React.createElement(window.IconArrow, null)), /* @__PURE__ */ React.createElement("span", { className: "rec-cut-lbl" }, window.t("corta aqu\xED"))), /* @__PURE__ */ React.createElement("p", { className: "rec-foot", style: { marginTop: 14 } }, window.t("Sobre las herramientas que ya usas."), /* @__PURE__ */ React.createElement("br", null), window.t("Los n\xFAmeros exactos los afinamos contigo, gratis."))))));
  };
})();
})();

(function(){
(function() {
  const { useState } = React;
  const Reveal = window.Reveal;
  const HeadReveal = window.HeadReveal;
  const FAQS = window.FAQ_DATA.map((f) => ({
    tag: window.t(f.tag),
    q: window.t(f.q),
    a: window.t(f.a)
  }));
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
    return /* @__PURE__ */ React.createElement("section", { id: "faq", className: "v2-sec" }, /* @__PURE__ */ React.createElement("div", { className: "v2-inner" }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { className: "frase" }, /* @__PURE__ */ React.createElement("p", { className: "frase-lbl" }, window.t("Automatizaci\xF3n para pymes en Tenerife, en una frase")), /* @__PURE__ */ React.createElement("p", { className: "frase-txt" }, window.t("Mazestudio automatiza atenci\xF3n al cliente, papeleo y reservas para pymes del sur de Tenerife conect\xE1ndose a las herramientas que ya usas \u2014Gmail, Google Calendar, Sheets, Drive, WhatsApp\u2014 sin cambiarte de programa; los tres productos cerrados (Hilo Respuesta, Hilo Papeleo e Hilo Reserva) cuestan desde 1.200 \u20AC de alta m\xE1s 150 \u20AC/mes sin permanencia y est\xE1n funcionando en dos semanas, y antes de contratar hay una auditor\xEDa gratuita que entrega un informe en 3 d\xEDas laborables con qu\xE9 automatizar, cu\xE1nto ahorras y el precio.")))), /* @__PURE__ */ React.createElement(HeadReveal, null, /* @__PURE__ */ React.createElement("p", { className: "v2-kicker" }, window.t("// antes de escribirnos")), /* @__PURE__ */ React.createElement("h2", { className: "v2-h2" }, window.t("Lo que sueles "), /* @__PURE__ */ React.createElement("em", null, window.t("preguntar")), window.t(" antes de decidirte")), /* @__PURE__ */ React.createElement("p", { className: "v2-note" }, window.t("Las dudas m\xE1s habituales antes de pedir el diagn\xF3stico \u2014 sin gen\xE9ricos de blog, con la l\xF3gica real de Mazestudio."))), /* @__PURE__ */ React.createElement("div", { className: "faq-list" }, FAQS.map((f, i) => {
      const isOpen = open.has(i);
      return /* @__PURE__ */ React.createElement(Reveal, { key: f.q, delay: i * 0.05 }, /* @__PURE__ */ React.createElement("div", { className: "faq-item" + (isOpen ? " open" : "") }, /* @__PURE__ */ React.createElement("button", { className: "faq-q", "aria-expanded": isOpen, onClick: () => toggle(i) }, /* @__PURE__ */ React.createElement("span", { className: "faq-tag" }, f.tag), /* @__PURE__ */ React.createElement("span", { className: "faq-question" }, f.q), /* @__PURE__ */ React.createElement("span", { className: "faq-toggle", "aria-hidden": "true" }, "+")), /* @__PURE__ */ React.createElement("div", { className: "faq-a-wrap" }, /* @__PURE__ */ React.createElement("div", { className: "faq-a-inner" }, /* @__PURE__ */ React.createElement("p", { className: "faq-answer" }, f.a)))));
    }))));
  };
})();
})();

(function(){
(function() {
  const Reveal = window.Reveal;
  window.CtaSection = function CtaSection() {
    return /* @__PURE__ */ React.createElement("section", { id: "contacto", style: { position: "relative", overflow: "hidden", background: "#08070C", padding: "clamp(100.8px,16vh,176.4px) clamp(21px,6vw,84px)" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "assets/referencias/referencia-cubo-cristal-movil.webp",
        alt: "",
        "aria-hidden": "true",
        loading: "lazy",
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
    } }), /* @__PURE__ */ React.createElement("div", { className: "cta-converge", style: { position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" } }, /* @__PURE__ */ React.createElement(Reveal, { delay: 0 }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: "clamp(24.6px,3.5vw,45.8px)", letterSpacing: "-1.5px", lineHeight: 1.1, color: "#fff", marginBottom: 42, maxWidth: 560 } }, window.t("Empieza a trazar tu l\xEDnea recta"))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.12, style: { transform: "scale(1.2)", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(window.MazeLogo, null)), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.28, className: "cta-acciones", style: { marginTop: 34 } }, /* @__PURE__ */ React.createElement("a", { href: window.CATALOGO_PDF, download: true, className: "v2-btn v2-btn-ghost", style: { padding: "15px 28px", fontSize: 16.2 } }, /* @__PURE__ */ React.createElement(window.IconDownload, null), " ", window.t("Descargar cat\xE1logo de servicios (PDF)"))), /* @__PURE__ */ React.createElement(Reveal, { delay: 0.4 }, /* @__PURE__ */ React.createElement("p", { style: { marginTop: 22, fontFamily: "JetBrains Mono", fontSize: 13.2, color: "rgba(255,255,255,.65)" } }, window.t("info@mazestudio.site \xB7 respondemos en 24 h")))));
  };
  window.Footer = function Footer() {
    const links = [
      { label: window.t("Qu\xE9 cambia"), href: "#servicios" },
      { label: window.t("Servicios"), href: "#como" },
      { label: window.t("Ahorro"), href: "#roi" },
      { label: window.t("FAQ"), href: "#faq" }
    ];
    return /* @__PURE__ */ React.createElement("footer", { className: "v2-footer" }, /* @__PURE__ */ React.createElement("div", { className: "inner" }, /* @__PURE__ */ React.createElement("div", { className: "top" }, /* @__PURE__ */ React.createElement("a", { href: "#top", style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(window.MazeLogo, null), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque", fontWeight: 600, fontSize: 18.9, color: "#EAE8F2", letterSpacing: "-.02em" } }, "Maze studio", /* @__PURE__ */ React.createElement("span", { style: { color: "#4B8CF7" } }, "."))), /* @__PURE__ */ React.createElement("nav", null, links.map((l) => /* @__PURE__ */ React.createElement("a", { key: l.href, href: l.href }, l.label)), /* @__PURE__ */ React.createElement("a", { href: window.CATALOGO_PDF, download: true, className: "f-pdf" }, /* @__PURE__ */ React.createElement(window.IconDownload, null), " ", window.t("Cat\xE1logo de servicios"), " ", /* @__PURE__ */ React.createElement("span", null, "PDF")))), /* @__PURE__ */ React.createElement("div", { className: "bot" }, /* @__PURE__ */ React.createElement("span", null, window.t("\xA9 2026 Mazestudio \xB7 estudio de automatizaci\xF3n con IA \xB7 Tenerife"), " \xB7 ", window.t("\xDAltima actualizaci\xF3n"), ": ", "2026-08-24"), /* @__PURE__ */ React.createElement("span", { className: "legal" }, /* @__PURE__ */ React.createElement("a", { href: "aviso-legal.html" }, window.t("Aviso legal")), /* @__PURE__ */ React.createElement("a", { href: "privacidad.html" }, window.t("Privacidad")), /* @__PURE__ */ React.createElement("a", { href: "cookies.html" }, "Cookies")))));
  };
})();
})();

(function(){
(function() {
  const { useState, useEffect, useRef } = React;
  const motion = window.Motion.motion;
  const PRE_MOVIL = window.matchMedia("(max-width:860px)").matches;
  const PRE_VIDEO = PRE_MOVIL ? "assets/referencias/referencia-cubo-cristal-01-movil-loop.mp4" : "assets/referencias/referencia-cubo-cristal-01-4k60-loop.mp4";
  const PRE_POSTER = PRE_MOVIL ? "assets/referencias/poster-cubo-carga-movil.webp" : "assets/referencias/poster-cubo-carga.webp";
  const IS_BOT = /bot|crawl|spider|slurp|mediapartners|lighthouse|pagespeed/i.test(navigator.userAgent);
  window.__preloaderActive = !IS_BOT;
  const INTRO_MS = 700;
  const INTRO_TOPE_MS = INTRO_MS + 1500;
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
        transition: { duration: INTRO_MS / 1e3, ease: "easeInOut" }
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
      if (reduced || IS_BOT) return;
      const v = vref.current;
      if (!v) return;
      const onPlaying = () => setPlaying(true);
      v.addEventListener("playing", onPlaying);
      v.play().catch(() => {
      });
      return () => v.removeEventListener("playing", onPlaying);
    }, []);
    useEffect(() => {
      const DUR = INTRO_MS, start = performance.now();
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
      }, INTRO_MS);
      const hard = setTimeout(finish, INTRO_TOPE_MS);
      return () => {
        clearTimeout(t);
        clearTimeout(hard);
        window.removeEventListener("load", finish);
      };
    }, []);
    useEffect(() => {
      document.documentElement.style.overflowY = gone ? "" : "hidden";
    }, [gone]);
    if (gone || IS_BOT) return null;
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
    return /* @__PURE__ */ React.createElement(MotionConfig, { reducedMotion: "user" }, /* @__PURE__ */ React.createElement(SmoothScroll, null), /* @__PURE__ */ React.createElement(window.Preloader, null), /* @__PURE__ */ React.createElement("div", { id: "smooth-wrapper" }, /* @__PURE__ */ React.createElement("div", { id: "smooth-content" }, /* @__PURE__ */ React.createElement(window.ScrollFX, null), /* @__PURE__ */ React.createElement(window.HeroSection, null), /* @__PURE__ */ React.createElement(window.MarqueeSection, null), /* @__PURE__ */ React.createElement(window.ServiciosSection, null), /* @__PURE__ */ React.createElement(window.ComoFuncionaSection, null), /* @__PURE__ */ React.createElement(window.CatalogoSection, null), /* @__PURE__ */ React.createElement(window.RoiSection, null), /* @__PURE__ */ React.createElement(window.PorQueSection, null), /* @__PURE__ */ React.createElement(window.FaqSection, null), /* @__PURE__ */ React.createElement(window.CtaSection, null), /* @__PURE__ */ React.createElement(window.Footer, null))));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
})();
})();
