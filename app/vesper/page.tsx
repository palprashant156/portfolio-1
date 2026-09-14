"use client";

import { useEffect } from "react";

export default function VesperPage() {
  useEffect(() => {
    // Force black immediately per spec: body attribute style="background:#000;color:#fff"
    document.body.setAttribute("style", "background:#000;color:#fff");
    document.documentElement.style.background = "#000000";
    // 1) Each .appear → own animationend → add is-in
    const appears = Array.from(document.querySelectorAll<HTMLElement>(".vesper-root .appear"));
    const heroPhoto = document.querySelector<HTMLElement>(".vesper-root .hero-photo");
    const onAnimEnd = (e: Event) => {
      const t = e.target as HTMLElement;
      // only handle events where target is the element itself (not child bubbled differently? spec says each element's own animationend)
      if (t.classList.contains("appear") || t.classList.contains("hero-photo")) {
        t.classList.add("is-in");
      }
    };
    appears.forEach((el) => el.addEventListener("animationend", onAnimEnd, { once: true } as AddEventListenerOptions));
    if (heroPhoto) heroPhoto.addEventListener("animationend", onAnimEnd, { once: true } as unknown as AddEventListenerOptions);

    // 2) Fallback after two rAFs if animations not running
    let raf1 = 0, raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const all = Array.from(document.querySelectorAll<HTMLElement>(".vesper-root .appear, .vesper-root .hero-photo"));
        all.forEach((el) => {
          const anims = (el as HTMLElement).getAnimations ? (el as HTMLElement).getAnimations() : [];
          const hasRunning = anims.some((a: Animation) => a.playState === "running" || a.playState === "finished");
          if (!hasRunning && anims.length === 0) {
            el.classList.add("is-in");
          } else if (anims.length === 0) {
            el.classList.add("is-in");
          } else if (!hasRunning) {
            el.classList.add("is-in");
          }
        });
        // Also force all .appear and hero-photo if none running at all
        // spec: if el.getAnimations() has nothing running or finished, add .is-in to every .appear and .hero-photo
        // We do check above per element, but spec says add to every if fallback. Simpler: if any element has no running, force all.
        // To be safe, if after check we still have not is-in, force
        const stillHidden = Array.from(document.querySelectorAll<HTMLElement>(".vesper-root .appear:not(.is-in), .vesper-root .hero-photo:not(.is-in)"));
        if (stillHidden.length > 0) {
          // Check if animations are supported / running - if no animations detected at all, force all
          const anyRunning = Array.from(document.querySelectorAll<HTMLElement>(".vesper-root .appear")).some((el) => {
            const a = (el as HTMLElement).getAnimations?.() || [];
            return a.some((an: Animation) => an.playState === "running");
          });
          if (!anyRunning) {
            stillHidden.forEach((el) => el.classList.add("is-in"));
          }
        }
      });
    });

    // 3) Burger toggles body.menu-open
    const burger = document.querySelector<HTMLButtonElement>(".vesper-root .burger");
    const backdrop = document.querySelector<HTMLElement>(".vesper-root .menu-backdrop");
    const siteNav = document.getElementById("site-nav");
    const toggleMenu = () => {
      const isOpen = document.body.classList.toggle("menu-open");
      if (burger) {
        burger.setAttribute("aria-expanded", String(isOpen));
        burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      }
    };
    const closeMenu = () => {
      document.body.classList.remove("menu-open");
      if (burger) {
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Open menu");
      }
    };
    burger?.addEventListener("click", toggleMenu);
    backdrop?.addEventListener("click", closeMenu);
    // 4) Nav links and Escape close
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("#site-nav a"));
    navLinks.forEach((a) => a.addEventListener("click", closeMenu));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    // 5) Resize to (min-width:901px) closes menu
    const mql = window.matchMedia("(min-width: 901px)");
    const onResize = () => {
      if (mql.matches) closeMenu();
    };
    // listen to resize and mql change
    window.addEventListener("resize", onResize);
    // modern mql listener
    if (mql.addEventListener) mql.addEventListener("change", onResize);
    else (mql as unknown as { addListener: (cb: ()=>void)=>void }).addListener(onResize);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      appears.forEach((el) => el.removeEventListener("animationend", onAnimEnd));
      if (heroPhoto) heroPhoto.removeEventListener("animationend", onAnimEnd);
      burger?.removeEventListener("click", toggleMenu);
      backdrop?.removeEventListener("click", closeMenu);
      navLinks.forEach((a) => a.removeEventListener("click", closeMenu));
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      if (mql.removeEventListener) mql.removeEventListener("change", onResize);
      else (mql as unknown as { removeListener: (cb: ()=>void)=>void }).removeListener(onResize);
      document.body.classList.remove("menu-open");
      document.body.removeAttribute("style");
      document.documentElement.style.removeProperty("background");
    };
  }, []);

  return (
    <div className="vesper-root" style={{ background: "#000", color: "#fff" }}>
      {/* Favicon via link tag injected for this route */}
      {/* Google Fonts fallback if woff2 missing */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&family=Instrument+Serif:ital@1&display=swap"
        rel="stylesheet"
      />
      {/* Inline style: exact spec, first rule forced black */}
      <style>{`
        /* Force black immediately so the page can never flash white */
        html, body { background: #000000 !important; color: #ffffff; }
        @font-face {
          font-family: "Inter";
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url("inter.woff2") format("woff2");
        }
        @font-face {
          font-family: "Instrument Serif";
          font-style: italic;
          font-weight: 400;
          font-display: swap;
          src: url("instrument-serif-italic.woff2") format("woff2");
        }
        /* Second declaration after fonts */
        html, body { background: #000000; background: var(--bg, #000000); color: #ffffff; color: var(--text, #ffffff); }

        :root {
          --bg: #000000;
          --text: #ffffff;
          --muted: #9a9a9a;
          --stat: #d8d8d8;
          --border: rgba(255, 255, 255, 0.16);
          --border-soft: rgba(255, 255, 255, 0.12);
          --logo: 15.5px;
          --logo-mark: 22px;
          --nav: 14px;
          --nav-h: 40px;
          --btn: 13.5px;
          --btn-h: 40px;
          --hero-btn-h: 42px;
          --h1: 48px;
          --lede: 15.5px;
          --badge: 12.5px;
          --stat-size: 13.5px;
          --header-y: 22px;
          --header-x: 40px;
          --stats-x: 72px;
          --stats-y: 36px;
          --hero-gap: 85px;
          --copy-max: 860px;
          --lede-max: 470px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; overflow-x: hidden; position: relative; }
        .vesper-root a { color: inherit; text-decoration: none; }
        .vesper-root button { font-family: inherit; }

        /* Layer stack */
        .vesper-root {
          position: relative;
          background: #000;
          min-height: 100vh;
          isolation: isolate;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .vesper-root .grain {
          position: fixed;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
        .vesper-root .hero-photo {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #000;
          opacity: 1;
        }
        .vesper-root .hero-photo video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 1;
          display: block;
        }
        .vesper-root .hero-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          /* No overlay per spec - 100% opacity no overlay: transparent scrim */
          background: transparent;
          pointer-events: none;
        }
        .vesper-root .page {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-rows: auto 1fr auto;
          min-height: 100vh;
          min-height: 100dvh;
        }

        /* Header — 3-column grid */
        .vesper-root .header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: var(--header-y) var(--header-x) 10px;
          z-index: 50;
          position: relative;
        }
        .vesper-root .logo {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          justify-self: start;
          font-size: var(--logo);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #fff;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .vesper-root .logo-suffix { font-weight: 400; }
        .vesper-root .logo svg { width: var(--logo-mark); height: var(--logo-mark); display: block; }
        .vesper-root #site-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-self: center;
        }
        .vesper-root #site-nav a {
          height: var(--nav-h);
          padding: 0 18px;
          border-radius: 7px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(198,198,198,0.55);
          background: linear-gradient(105deg, #050505 0%, #2a2a2a 48%, #4a4a4a 100%);
          color: #f3f3f3;
          font-size: var(--nav);
          font-weight: 400;
          letter-spacing: -0.01em;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .vesper-root #site-nav a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 0.6s ease;
          pointer-events: none;
        }
        .vesper-root #site-nav a:hover {
          border-color: rgba(235,235,235,0.9);
          background: linear-gradient(105deg, #111 0%, #3a3a3a 45%, #6a6a6a 100%);
          box-shadow: 0 0 18px rgba(200,210,230,0.18);
        }
        .vesper-root #site-nav a:hover::before { transform: translateX(120%); }

        .vesper-root .header-cta { justify-self: end; }
        .vesper-root .burger {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: rgba(8,8,8,0.55);
          z-index: 60;
          place-items: center;
          cursor: pointer;
          gap: 5px;
          padding: 0;
          position: relative;
        }
        .vesper-root .burger span {
          display: block;
          width: 16px;
          height: 1.5px;
          background: #fff;
          border-radius: 1px;
          transition: transform 0.25s ease, opacity 0.2s ease;
          transform-origin: center;
        }
        .vesper-root .burger:hover { border-color: rgba(255,255,255,0.32); background: rgba(255,255,255,0.05); }
        .vesper-root .menu-open .burger span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .vesper-root .menu-open .burger span:nth-child(2) { opacity: 0; }
        .vesper-root .menu-open .burger span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .vesper-root .menu-backdrop {
          display: block;
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(8,8,8,0.42);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.28s ease, visibility 0.28s ease, backdrop-filter 0.28s ease;
          pointer-events: none;
        }
        .vesper-root .menu-open .menu-backdrop,
        body.menu-open .vesper-root .menu-backdrop,
        body.menu-open .menu-backdrop {
          opacity: 1;
          visibility: visible;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          pointer-events: auto;
        }

        /* Buttons shared */
        .vesper-root .btn {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--btn-h);
          padding: 0 16px;
          border-radius: 6px;
          font-size: var(--btn);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.35s ease, border 0.35s ease, box-shadow 0.35s ease, color 0.35s ease, filter 0.35s ease;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          text-decoration: none;
          border: 1px solid transparent;
        }
        .vesper-root .btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.45) 48%, transparent 76%);
          transform: translateX(-130%);
          transition: transform 0.65s ease;
          pointer-events: none;
          z-index: 1;
        }
        .vesper-root .btn:hover::after { transform: translateX(130%); }
        .vesper-root .btn-solid {
          background: linear-gradient(180deg, #ffffff 0%, #e7e7e7 48%, #cfcfcf 100%);
          color: #111;
          border: 1px solid #fff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.95);
        }
        .vesper-root .btn-solid:hover {
          background: linear-gradient(180deg, #ffffff 0%, #f3f6ff 42%, #d5def2 100%);
          border-color: #f2f6ff;
          box-shadow: inset 0 1px 0 #fff, 0 0 22px rgba(186,208,255,0.35), 0 8px 18px rgba(255,255,255,0.12);
        }
        .vesper-root .hero .btn-solid:hover {
          box-shadow: inset 0 1px 0 #fff, 0 0 26px rgba(186,208,255,0.4), 0 8px 18px rgba(255,255,255,0.14);
        }
        .vesper-root .btn-ghost {
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.45) 50%, rgba(160,175,200,0.08));
          color: #fff;
          border: 1px solid rgba(198,198,198,0.45);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .vesper-root .btn-ghost:hover {
          background: linear-gradient(135deg, rgba(210,225,255,0.18), rgba(0,0,0,0.35) 48%, rgba(180,195,220,0.16));
          border-color: rgba(220,230,255,0.75);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 0 20px rgba(170,200,255,0.22);
        }
        .vesper-root .hero .btn-ghost {
          background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(0,0,0,0.5) 46%, rgba(150,170,200,0.1));
          border: 1px solid rgba(198,198,198,0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .vesper-root .hero .btn-ghost:hover {
          border-color: rgba(220,230,255,0.8);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 0 24px rgba(170,200,255,0.28);
        }
        .vesper-root .hero .btn { height: var(--hero-btn-h); padding: 0 18px; }

        /* Hero bottom-centered */
        .vesper-root .hero {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 8px 24px var(--hero-gap);
          min-height: 0;
        }
        .vesper-root .hero-copy {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: var(--copy-max);
          width: 100%;
        }
        .vesper-root .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 22px;
          padding: 9px 15px;
          border: 0;
          border-radius: 5px;
          background: linear-gradient(90deg, #7d7d7d 0%, #2a2a2a 52%, #0a0a0a 100%);
          color: #f2f2f2;
          font-size: var(--badge);
          font-weight: 400;
          letter-spacing: -0.01em;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .vesper-root .badge-star {
          width: 18px;
          height: 20px;
          display: block;
          flex-shrink: 0;
          filter: drop-shadow(0 0 3px rgba(255,255,255,0.45));
          color: #fff;
        }
        .vesper-root .hero h1 {
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 1.12;
          color: #fff;
          font-size: var(--h1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .vesper-root .headline-line {
          display: block;
          overflow: hidden;
          padding: 0.06em 0.15em 0.14em;
        }
        .vesper-root .hero h1 em {
          font-family: "Instrument Serif", "Times New Roman", Times, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 1.08em;
          letter-spacing: -0.03em;
          color: #9a9a9a;
        }
        .vesper-root .lede {
          max-width: var(--lede-max);
          margin-top: 18px;
          color: #9a9a9a;
          font-size: var(--lede);
          font-weight: 400;
          line-height: 1.55;
          letter-spacing: -0.015em;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .vesper-root .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 26px;
        }

        /* Stats footer */
        .vesper-root .stats {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 0 var(--stats-x) var(--stats-y);
          padding-bottom: max(var(--stats-y), env(safe-area-inset-bottom));
          color: #d8d8d8;
        }
        .vesper-root .stat {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-size: var(--stat-size);
          letter-spacing: -0.015em;
          white-space: nowrap;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: var(--stat);
        }
        .vesper-root .stat svg { display: block; flex-shrink: 0; }
        .vesper-root .stat-icon { width: 20px; height: 20px; color: #e8e8e8; }
        .vesper-root .stat-icon-wide { width: 38px; height: 21px; }

        /* Entrance motion */
        .vesper-root .appear {
          opacity: 1;
          animation-duration: 1.05s;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-delay: var(--d, 0.08s);
        }
        .vesper-root .appear.is-in { animation: none !important; opacity: 1 !important; transform: none !important; clip-path: none !important; filter: none !important; }
        .vesper-root .hero-photo.is-in { animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
        .vesper-root .appear--scale { animation-name: in-scale; }
        .vesper-root .appear--soft { animation-name: in-soft; }
        .vesper-root .appear--mask { animation-name: in-mask; }
        .vesper-root .appear--pop { animation-name: in-pop; }
        .vesper-root .appear--btn { animation-name: in-btn; }
        .vesper-root .appear--side { animation-name: in-side; }
        .vesper-root .appear--stat { animation-name: in-stat; }

        @keyframes in-scale { from { opacity:0; transform: scale(0.84); } to { opacity:1; transform: scale(1); } }
        @keyframes in-soft { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: translateY(0); } }
        @keyframes in-mask { from { opacity:0; transform: translateY(40%); } to { opacity:1; transform: translateY(0); } }
        @keyframes in-pop { 0% { opacity:0; transform: scale(0.9); } 70% { opacity:1; transform: scale(1.03); } 100% { opacity:1; transform: scale(1); } }
        @keyframes in-btn { from { opacity:0; transform: translateY(18px) scale(0.94); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes in-side { from { opacity:0; transform: translateX(22px); } to { opacity:1; transform: translateX(0); } }
        @keyframes in-stat { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        @keyframes in-star {
          from { opacity:0; transform: scale(0.2) rotate(-50deg); }
          65% { opacity:1; transform: scale(1.2) rotate(8deg); }
          to { opacity:1; transform: scale(1) rotate(0); }
        }
        @keyframes in-em {
          from { opacity: 0.35; filter: blur(4px); }
          to { opacity: 1; filter: blur(0); }
        }
        .vesper-root .badge-star { animation: in-star 0.9s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 0.28s; }
        .vesper-root .hero h1 em { animation: in-em 1.2s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 0.72s; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { transition: none !important; animation: none !important; }
          .vesper-root .appear, .vesper-root .hero-photo, .vesper-root .hero h1 em, .vesper-root .badge-star { opacity:1 !important; transform:none !important; clip-path:none !important; filter:none !important; }
        }

        /* Responsive tokens */
        @media (min-width: 1600px) {
          :root { --logo:17px; --logo-mark:24px; --nav:15px; --nav-h:44px; --btn:15px; --btn-h:44px; --hero-btn-h:48px; --h1:64px; --lede:18px; --badge:13.5px; --stat-size:15px; --header-y:28px; --header-x:64px; --stats-x:96px; --stats-y:44px; --copy-max:980px; --lede-max:540px; }
          .vesper-root #site-nav { gap: 10px; }
          .vesper-root #site-nav a { padding: 0 20px; }
          .vesper-root .badge { margin-bottom: 26px; }
          .vesper-root .lede { margin-top: 22px; }
          .vesper-root .hero-actions { margin-top: 30px; gap:12px; }
          .vesper-root .stat-icon { width:22px; height:22px; }
          .vesper-root .stat-icon-wide { width:45px; height:24px; }
        }
        @media (min-width: 1920px) {
          :root { --logo:18px; --logo-mark:26px; --nav:16px; --nav-h:48px; --btn:16px; --btn-h:48px; --hero-btn-h:52px; --h1:76px; --lede:20px; --badge:14.5px; --stat-size:16px; --header-y:32px; --header-x:80px; --stats-x:120px; --stats-y:52px; --copy-max:1120px; --lede-max:620px; }
          .vesper-root #site-nav { gap: 10px; }
          .vesper-root #site-nav a { padding: 0 22px; }
          .vesper-root .btn { padding: 0 22px; }
          .vesper-root .badge { padding: 10px 15px; }
          .vesper-root .stat-icon-wide { width:48px; height:26px; }
        }
        @media (min-width: 2560px) {
          :root { --h1:88px; --lede:22px; --header-x:120px; --stats-x:160px; --copy-max:1280px; --lede-max:680px; }
        }
        @media (min-width: 1280px) and (max-width: 1599px) {
          :root { --h1:54px; --lede:16px; --header-x:48px; --stats-x:80px; --copy-max:900px; }
        }
        @media (min-width: 901px) and (max-width: 1279px) {
          :root { --logo:15px; --nav:13px; --nav-h:36px; --btn:13px; --btn-h:38px; --hero-btn-h:40px; --h1:42px; --lede:15px; --badge:12px; --stat-size:12.5px; --header-y:16px; --header-x:28px; --stats-x:36px; --stats-y:28px; --hero-gap:64px; --copy-max:760px; --lede-max:440px; }
          .vesper-root #site-nav a { padding: 0 14px; }
          .vesper-root .badge { margin-bottom:16px; }
          .vesper-root .lede { margin-top:14px; }
          .vesper-root .hero-actions { margin-top:20px; }
        }
        @media (min-width: 901px) and (max-height: 850px) {
          :root { --header-y:14px; --stats-y:24px; --hero-gap:48px; --h1:40px; }
          .vesper-root .badge { margin-bottom:12px; }
          .vesper-root .lede { margin-top:12px; }
          .vesper-root .hero-actions { margin-top:16px; }
        }
        @media (min-width: 901px) and (max-height: 720px) {
          :root { --h1:34px; --lede:14px; --hero-gap:32px; --stats-y:18px; --nav-h:30px; --btn-h:34px; --hero-btn-h:36px; }
          .vesper-root .badge { margin-bottom:8px; }
        }
        @media (min-width: 901px) {
          html, body { height: 100%; overflow: hidden; }
          .vesper-root .page { height: 100vh; height: 100dvh; overflow: hidden; }
        }

        /* Phone ≤900 */
        @media (max-width: 900px) {
          html, body { height: auto; overflow-y: auto; }
          :root { --logo:16px; --btn:15px; --btn-h:46px; --hero-btn-h:48px; --h1:36px; --lede:16.5px; --badge:13.5px; --stat-size:15px; --header-y:16px; --header-x:18px; --stats-x:20px; --stats-y:28px; --hero-gap:36px; }
          .vesper-root .header { grid-template-columns: 1fr auto auto; gap: 8px; padding: var(--header-y) var(--header-x) 10px; padding-top: max(var(--header-y), env(safe-area-inset-top)); padding-left: max(var(--header-x), env(safe-area-inset-left)); padding-right: max(var(--header-x), env(safe-area-inset-right)); }
          .vesper-root .logo, .vesper-root .header-cta, .vesper-root .burger { z-index: 80; }
          .vesper-root .burger { display: grid; }
          .vesper-root #site-nav {
            position: fixed;
            inset: 0;
            z-index: 45;
            flex-direction: column;
            justify-content: center;
            align-items: stretch;
            gap: 12px;
            padding: 96px 22px 32px;
            padding-top: max(96px, calc(env(safe-area-inset-top) + 88px));
            background: transparent;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 0.28s ease, visibility 0.28s ease;
          }
          body.menu-open .vesper-root #site-nav { opacity: 1; visibility: visible; pointer-events: auto; }
          body.menu-open { overflow: hidden; }
          .vesper-root #site-nav a { width: 100%; height: 56px; font-size: 19px; border-radius: 10px; justify-content: center; }
          .vesper-root .hero { padding: 20px 20px 64px; }
          .vesper-root .hero-copy { max-width: 100%; }
          .vesper-root .lede { max-width: 100%; }
          .vesper-root .stats { flex-direction: column; align-items: center; gap: 16px; white-space: normal; text-align: center; }
          .vesper-root .stat { white-space: normal; justify-content: center; text-align: left; }
        }
        @media (max-width: 560px) {
          :root { --h1:34px; --lede:16px; --header-x:16px; }
          .vesper-root .hero-actions { flex-direction: column; width: 100%; }
          .vesper-root .hero .btn { width: 100%; }
        }
      `}</style>

      {/* Layer order: grain, hero-photo, page */}
      <div className="grain" aria-hidden="true" />
      <div className="hero-photo appear" style={{ ["--d" as string]: "0.05s" } as React.CSSProperties} aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
          style={{ opacity: 1 }}
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="page">
        <div className="menu-backdrop" aria-hidden="true" />
        <header className="header">
          <a className="logo appear appear--scale" href="#top" aria-label="Vesper.ai" style={{ ["--d" as string]: "0.08s" } as React.CSSProperties}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <g transform="rotate(-30 12 12)">
                <circle cx="7.3" cy="3.2" r="1.45" />
                <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <circle cx="16.7" cy="20.8" r="1.45" />
              </g>
            </svg>
            <span>Vesper<span className="logo-suffix">.ai</span></span>
          </a>

          <nav id="site-nav" aria-label="Primary">
            <a className="appear appear--scale" href="#benefits" style={{ ["--d" as string]: "0.16s" } as React.CSSProperties}>Benefits</a>
            <a className="appear appear--soft" href="#how-it-works" style={{ ["--d" as string]: "0.28s" } as React.CSSProperties}>How It Works</a>
            <a className="appear appear--scale" href="#faqs" style={{ ["--d" as string]: "0.40s" } as React.CSSProperties}>FAQs</a>
            <a className="appear appear--soft" href="#pricing" style={{ ["--d" as string]: "0.52s" } as React.CSSProperties}>Pricing</a>
          </nav>

          <a className="btn btn-solid header-cta appear appear--scale" href="#start" style={{ ["--d" as string]: "0.34s" } as React.CSSProperties}>
            Start for Free
          </a>

          <button className="burger appear appear--scale" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu" style={{ ["--d" as string]: "0.34s" } as React.CSSProperties}>
            <span />
            <span />
            <span />
          </button>
        </header>

        <main className="hero" id="top">
          <div className="hero-copy">
            <div className="badge appear appear--pop" style={{ ["--d" as string]: "0.22s" } as React.CSSProperties}>
              <svg className="badge-star" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
              </svg>
              Operational AI Infrastructure
            </div>

            <h1>
              <span className="headline-line">
                <span className="appear appear--mask" style={{ ["--d" as string]: "0.42s", display: "block" } as React.CSSProperties}>
                  Train <em>AI agents</em> on your
                </span>
              </span>
              <span className="headline-line">
                <span className="appear appear--mask" style={{ ["--d" as string]: "0.62s", display: "block" } as React.CSSProperties}>
                  workflows in minutes.
                </span>
              </span>
            </h1>

            <p className="lede appear appear--soft" style={{ ["--d" as string]: "0.82s", animationDuration: "1.25s" } as React.CSSProperties}>
              Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.
            </p>

            <div className="hero-actions">
              <a className="btn btn-solid appear appear--btn" href="#start" style={{ ["--d" as string]: "0.96s" } as React.CSSProperties}>
                Start for Free
              </a>
              <a className="btn btn-ghost appear appear--side" href="#demo" style={{ ["--d" as string]: "1.10s" } as React.CSSProperties}>
                See it in action
              </a>
            </div>
          </div>
        </main>

        <footer className="stats">
          <div className="stat appear appear--stat" style={{ ["--d" as string]: "1.12s" } as React.CSSProperties}>
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="vg1" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0.62" />
                </linearGradient>
                <linearGradient id="vg2" x1="14" y1="2" x2="3" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
                </linearGradient>
              </defs>
              <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#vg1)" />
              <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#vg2)" />
              <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
            </svg>
            <span>4.2M+ workflows automated</span>
          </div>

          <div className="stat appear appear--stat" style={{ ["--d" as string]: "1.28s" } as React.CSSProperties}>
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
              <path d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85" stroke="#111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span>92% reduction in manual operations</span>
          </div>

          <div className="stat appear appear--stat" style={{ ["--d" as string]: "1.44s" } as React.CSSProperties}>
            <svg className="stat-icon-wide" viewBox="0 0 40 22" fill="none" aria-hidden="true">
              <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
              <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
              <path d="M7.2 7.5 L8.8 5.8 L9.6 7.3 Z" fill="#f4f4f4" />
              <path d="M13.2 7.5 L11.6 5.8 L10.8 7.3 Z" fill="#f4f4f4" />
              <circle cx="8.6" cy="11.2" r="0.7" fill="#1a1a1a" />
              <circle cx="11.8" cy="11.2" r="0.7" fill="#1a1a1a" />
              <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
              <circle cx="18.6" cy="10.8" r="1.7" fill="#1a1a1a" />
              <circle cx="21.8" cy="10.8" r="1.7" fill="#1a1a1a" />
              <ellipse cx="20.2" cy="13.2" rx="1.3" ry="0.9" fill="#111" />
              <path d="M17.8 14.6 Q20.2 16.5 22.6 14.6" stroke="#111" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
              <text x="30.2" y="15.1" fontFamily='"Inter", sans-serif' fontWeight="700" fontSize="12.5" textAnchor="middle" fill="white">e</text>
            </svg>
            <span>180+ operational teams onboarded</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
