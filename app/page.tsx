"use client";

import { useEffect, useState } from "react";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default function Page() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("palprashant156@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handler = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const id = target.getAttribute("href");
      if (id && id.length > 1) {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, "", id);
        }
      }
    };
    anchors.forEach((a) => a.addEventListener("click", handler));
    const sections = Array.from(document.querySelectorAll("section[id]")) as HTMLElement[];
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]')) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navLinks.forEach((l) => {
              const isActive = l.getAttribute("href") === id;
              l.classList.toggle("!text-canvas-pure-white", isActive);
              l.classList.toggle("font-medium", isActive);
              if (isActive) l.classList.remove("text-text-secondary-dark");
              else l.classList.add("text-text-secondary-dark");
            });
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    // Dynamic island: nav pill grows/shrinks on scroll
    const header = document.querySelector("header.glass-nav-dynamic") as HTMLElement | null;
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 20) {
        header.classList.remove("at-top");
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
        header.classList.add("at-top");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Reveal on scroll — fade + translateY overshoot via IntersectionObserver
    const reveals = Array.from(document.querySelectorAll(".reveal")) as HTMLElement[];
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    return () => {
      anchors.forEach((a) => a.removeEventListener("click", handler));
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
<header className="fixed top-4 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50 glass-nav glass-nav-dynamic at-top h-[64px] flex items-center spring-hover"><div className="h-full w-full max-w-[75rem] mx-auto px-6 md:px-8 flex items-center justify-between"><div className="flex items-center gap-6"><a className="font-title-md text-title-md tracking-tight text-on-surface hover:text-canvas-pure-white transition-colors" data-path="portfolio-overview" href="#">Prashant Pal</a></div><nav className="hidden md:flex items-center gap-8" data-active-classes="text-canvas-pure-white font-medium"><a className="font-body-md text-body-md text-text-secondary-dark hover:text-on-surface transition-colors spring-link" data-path="about" href="#about">About</a><a className="font-body-md text-body-md text-text-secondary-dark hover:text-on-surface transition-colors spring-link" data-path="projects" href="#projects">Projects</a><a className="font-body-md text-body-md text-text-secondary-dark hover:text-on-surface transition-colors spring-link" data-path="experience" href="#experience">Experience</a><a className="font-body-md text-body-md text-text-secondary-dark hover:text-on-surface transition-colors spring-link" data-path="skills" href="#skills">Skills</a><a className="font-body-md text-body-md text-text-secondary-dark hover:text-on-surface transition-colors spring-link" data-path="contact" href="#contact">Contact</a></nav><div className="flex items-center gap-4"><a className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full glass-button-primary spring-hover text-on-primary-container font-label-md text-label-md" href="mailto:palprashant156@gmail.com">Get in touch</a><div className="w-8 h-8 rounded-full glass-button flex items-center justify-center flex-shrink-0 self-center"><span className="material-symbols-outlined text-[var(--text-primary)] text-[18px]">person</span></div><ThemeSwitcher inline /></div></div></header><main className="w-full pt-16 bg-background"><div className="flex flex-col w-full">
{/* SECTION 1: HERO — Vesper-style Video Background (100% opacity, no overlay) */}
<section className="relative w-full overflow-hidden bg-canvas-pure-black py-28 md:py-36 flex flex-col items-center justify-center text-center reveal" style={{ background: "#000000" }}>
{/* Video animation — exact CloudFront URL, 100% opacity, no overlay per Vesper spec */}
<div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="w-full h-full object-cover"
    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 1 }}
  >
    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4" type="video/mp4" />
  </video>
</div>
{/* No overlay — transparent scrim per spec (video at 100% opacity) */}
<div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: "transparent", zIndex: 1 }} />
{/* Subtle grain at z=2 to match Vesper layer stack, does not dim video */}
<div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 2, opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: "180px 180px" }} />
<div className="relative z-10 max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop flex flex-col items-center">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-canvas-dark text-primary font-label-sm text-label-sm uppercase tracking-widest mb-6">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        Full Stack Engineer & System Architect
      </div>
<h1 className="font-display-xl text-display-xl tracking-tight text-canvas-pure-white mb-6 max-w-4xl">
        Prashant Pal.
      </h1>
<p className="font-body-lg text-body-lg text-text-secondary-dark max-w-2xl mx-auto mb-10 text-center">
        Full Stack Developer — Building scalable web applications with React, Node.js & NestJS.
      </p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
<a className="inline-flex items-center justify-center px-8 py-3.5 rounded-full glass-button-primary spring-hover text-canvas-pure-white font-title-md text-title-md shadow-xl" href="#projects">
          View My Work
        </a>
<a className="inline-flex items-center gap-2 font-title-md text-title-md text-primary hover:text-canvas-pure-white transition-colors duration-200 group" href="mailto:palprashant156@gmail.com">
<span>palprashant156@gmail.com</span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">arrow_outward</span>
</a>
</div>
<div className="w-full max-w-3xl rounded-full glass-panel px-6 py-3.5 flex flex-wrap items-center justify-around gap-4 text-text-muted-dark font-label-md text-label-md">
<div className="flex items-center gap-2">
<span className="text-primary font-bold">40%</span>
<span>Backend Stability</span>
</div>
<span className="hidden sm:inline text-surface-variant">•</span>
<div className="flex items-center gap-2">
<span className="text-primary font-bold">30%</span>
<span>Memory Overhead Reduced</span>
</div>
<span className="hidden sm:inline text-surface-variant">•</span>
<div className="flex items-center gap-2">
<span className="text-primary font-bold">40%</span>
<span>LCP Core Web Vitals Lift</span>
</div>
</div>
</div>
</section>
{/* SECTION 2: ABOUT (Gallery-Grade Pure White Editorial) */}
<section className="w-full bg-canvas-pure-white text-canvas-dark py-24 md:py-32 reveal" id="about">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="font-label-md text-label-md uppercase tracking-wider text-primary-container mb-4">
        Engineering Philosophy
      </div>
<h2 className="font-headline-lg text-headline-lg text-canvas-dark max-w-4xl tracking-tight leading-tight mb-16">
        Speed is a feature. Reliability is the foundation.
      </h2>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
<div className="lg:col-span-6 flex flex-col gap-6 font-body-lg text-body-lg text-text-muted-light">
<p>
            I am a Full Stack Engineer at <strong className="text-canvas-dark font-medium">MediaNv Aidos Pvt Ltd</strong> based in Ahmedabad, architecting mission-critical platforms that balance high-throughput concurrent workloads with pixel-perfect client experiences.
          </p>
<p>
            My daily craft operates across the complete lifecycle — designing zero-friction interfaces in <strong className="text-canvas-dark font-medium">React 19, Next.js, and TypeScript</strong>, while engineering robust distributed backends in <strong className="text-canvas-dark font-medium">NestJS, Node.js, Express, PostgreSQL, and Redis</strong>.
          </p>
<p>
            By anchoring architectural decisions in clean domain-driven patterns, automated CI/CD pipelines, and cloud-native AWS deployments, I deliver systems engineered for fault tolerance, minimal TTFB, and continuous production agility.
          </p>
<div className="pt-2 flex flex-wrap gap-2">
<span className="px-3.5 py-1.5 rounded-full bg-canvas-light-gray font-label-sm text-label-sm text-canvas-dark">PostgreSQL</span>
<span className="px-3.5 py-1.5 rounded-full bg-canvas-light-gray font-label-sm text-label-sm text-canvas-dark">NestJS</span>
<span className="px-3.5 py-1.5 rounded-full bg-canvas-light-gray font-label-sm text-label-sm text-canvas-dark">Next.js App Router</span>
<span className="px-3.5 py-1.5 rounded-full bg-canvas-light-gray font-label-sm text-label-sm text-canvas-dark">AWS ECS/S3</span>
<span className="px-3.5 py-1.5 rounded-full bg-canvas-light-gray font-label-sm text-label-sm text-canvas-dark">Docker</span>
</div>
</div>
<div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="rounded-[24px] glass-panel-light spring-card p-8 flex flex-col justify-between">
<div className="font-display-xl text-display-xl text-canvas-dark font-bold tracking-tight">40%</div>
<div>
<div className="font-title-md text-title-md text-canvas-dark font-medium mb-1">Backend Stability</div>
<div className="font-body-md text-body-md text-text-muted-light">Sustained under peak burst traffic with zero unhandled drop-offs.</div>
</div>
</div>
<div className="rounded-[24px] glass-panel-light spring-card p-8 flex flex-col justify-between">
<div className="font-display-xl text-display-xl text-canvas-dark font-bold tracking-tight">30%</div>
<div>
<div className="font-title-md text-title-md text-canvas-dark font-medium mb-1">Memory Overhead</div>
<div className="font-body-md text-body-md text-text-muted-light">Optimized Node.js garbage collection and stream pipelines.</div>
</div>
</div>
<div className="rounded-[24px] glass-panel-light spring-card p-8 flex flex-col justify-between">
<div className="font-display-xl text-display-xl text-canvas-dark font-bold tracking-tight">30%</div>
<div>
<div className="font-title-md text-title-md text-canvas-dark font-medium mb-1">User Engagement</div>
<div className="font-body-md text-body-md text-text-muted-light">Instant reactive feedback with sub-50ms UI response times.</div>
</div>
</div>
<div className="rounded-[24px] glass-panel-light spring-card p-8 flex flex-col justify-between">
<div className="font-display-xl text-display-xl text-canvas-dark font-bold tracking-tight">40%</div>
<div>
<div className="font-title-md text-title-md text-canvas-dark font-medium mb-1">LCP Improvement</div>
<div className="font-body-md text-body-md text-text-muted-light">Strategic code splitting and edge-rendered asset hydration.</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 3: FEATURED PROJECTS */}
<div className="flex flex-col w-full" id="projects">
{/* Project 1: Dark Canvas (Fraud Monitoring) */}
<section className="w-full bg-canvas-dark text-on-surface py-24 md:py-32 reveal">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-5 flex flex-col">
<div className="flex items-center gap-2 mb-4">
<span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary-dark">Real-Time Threat Detection</span>
</div>
<h3 className="font-headline-lg text-headline-lg text-canvas-pure-white mb-4 tracking-tight">
              Digital Payment Fraud Monitoring System
            </h3>
<p className="font-body-lg text-body-lg text-text-secondary-dark mb-6">
              Real-time telemetry and risk orchestration engine monitoring high-velocity payment streams, anomalous IP footprints, and automated velocity rule evaluations.
            </p>
<div className="p-4 rounded-DEFAULT bg-surface-container mb-6">
<div className="font-label-sm text-label-sm text-primary uppercase mb-1">Measurable Impact</div>
<div className="font-title-md text-title-md text-canvas-pure-white font-medium">Reduced fraudulent exposure by 15% across real-time transaction streams.</div>
</div>
<div className="flex flex-wrap gap-2 mb-8">
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">MongoDB</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Express.js</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">React.js</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Node.js</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">WebSocket</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">GeoIP</span>
</div>
<div>
<a className="inline-flex items-center gap-2 text-primary font-title-md text-title-md hover:text-canvas-pure-white transition-colors group spring-link" href="#contact">
<span>View System Architecture</span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
</a>
</div>
</div>
<div className="lg:col-span-7 relative">
<div className="absolute -inset-6 -z-10 rounded-[32px] blur-[50px] opacity-20" style={{ background: "var(--hero-glow-1)", transition: "background 700ms ease" }} aria-hidden></div>
<div className="rounded-[32px] glass-panel spring-card p-6 md:p-8 overflow-hidden relative glass-tint-cool">
<div className="flex items-center justify-between pb-6 mb-6">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-error/70"></span>
<span className="w-3 h-3 rounded-full bg-tertiary/70"></span>
<span className="w-3 h-3 rounded-full bg-primary/70"></span>
<span className="ml-3 font-label-sm text-label-sm text-text-muted-dark">telemetry.fraud.engine.v2</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">LIVE MONITORING</span>
</div>
{/* Inline Mock SVG Telemetry Spark & Nodes */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
<div className="p-4 rounded-[20px] glass-panel-subtle">
<div className="font-label-sm text-label-sm text-text-muted-dark mb-1">Inbound Velocity</div>
<div className="font-title-lg text-title-lg text-canvas-pure-white font-bold">14,280 txn/s</div>
<div className="text-primary font-label-sm text-label-sm mt-1">↑ 12% peak surge</div>
</div>
<div className="p-4 rounded-[20px] glass-panel-subtle">
<div className="font-label-sm text-label-sm text-text-muted-dark mb-1">Blocked Exploits</div>
<div className="font-title-lg text-title-lg text-error font-bold">2,143</div>
<div className="text-on-surface-variant font-label-sm text-label-sm mt-1">99.98% precision</div>
</div>
<div className="p-4 rounded-[20px] glass-panel-subtle">
<div className="font-label-sm text-label-sm text-text-muted-dark mb-1">Latency Overhead</div>
<div className="font-title-lg text-title-lg text-primary font-bold">11.4 ms</div>
<div className="text-on-surface-variant font-label-sm text-label-sm mt-1">Stream pipeline</div>
</div>
</div>
{/* Stream Chart */}
<div className="rounded-DEFAULT bg-surface-container p-4 mb-4">
<div className="flex items-center justify-between mb-2">
<span className="font-label-sm text-label-sm text-text-secondary-dark">Risk Anomaly Detection Threshold</span>
<span className="font-label-sm text-label-sm text-primary">Dynamic EWMA Filter</span>
</div>
<svg className="w-full h-28 text-primary overflow-visible" fill="none" viewBox="0 0 500 100">
<path d="M0,80 Q50,40 100,65 T200,30 T300,70 T400,20 T500,45" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
<path d="M0,80 Q50,40 100,65 T200,30 T300,70 T400,20 T500,45 L500,100 L0,100 Z" fill="currentColor" fillOpacity="0.08"></path>
<circle className="fill-error animate-ping" cx="400" cy="20" r="5"></circle>
<circle className="fill-error" cx="400" cy="20" r="4"></circle>
</svg>
</div>
<div className="space-y-2 font-label-sm text-label-sm">
<div className="p-2.5 rounded bg-surface-container-high flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="text-error font-bold">[BLOCK]</span>
<span className="text-on-surface">IP: 185.220.101.5 — Rapid Card Sequence Attempt</span>
</div>
<span className="text-text-muted-dark">4ms ago</span>
</div>
<div className="p-2.5 rounded bg-surface-container-high flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="text-primary font-bold">[CLEAR]</span>
<span className="text-on-surface">TXN #920194 — 3DS Verified Seamless Checkout</span>
</div>
<span className="text-text-muted-dark">12ms ago</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Project 2: Light Canvas (Doomscrolling Tracker) */}
<section className="w-full bg-canvas-pure-white text-canvas-dark py-24 md:py-32 reveal">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-7 order-2 lg:order-1 relative">
<div className="absolute -inset-6 -z-10 rounded-[32px] blur-[50px] opacity-15" style={{ background: "var(--hero-glow-2)", transition: "background 700ms ease" }} aria-hidden></div>
<div className="rounded-[32px] glass-panel-light spring-card p-6 md:p-8 overflow-hidden relative glass-tint-warm">
<div className="flex items-center justify-between pb-6 mb-6">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container">psychology</span>
<span className="font-title-md text-title-md font-semibold text-canvas-dark">Cognitive Health Session</span>
</div>
<span className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-medium shadow-sm">Today: 1h 14m</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-6">
{/* SVG Donut Chart for Categories */}
<div className="flex flex-col items-center justify-center p-4 bg-canvas-pure-white rounded-DEFAULT shadow-sm">
<svg className="w-36 h-36" viewBox="0 0 36 36">
<path className="text-border-light" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="62, 100" strokeLinecap="round" strokeWidth="3.5"></path>
<path className="text-tertiary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="24, 100" strokeDashoffset="-62" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<div className="mt-3 text-center">
<div className="font-headline-sm text-headline-sm font-bold text-canvas-dark">62% Focus</div>
<div className="font-label-sm text-label-sm text-text-muted-light">Daily Mindfulness Target</div>
</div>
</div>
<div className="space-y-3">
<div className="p-3 bg-canvas-pure-white rounded-DEFAULT shadow-sm">
<div className="flex justify-between text-label-sm font-label-sm text-text-muted-light mb-1">
<span>Social Feeds Intercepted</span>
<span className="text-canvas-dark font-semibold">18 triggers</span>
</div>
<div className="w-full h-1.5 bg-canvas-light-gray rounded-full overflow-hidden">
<div className="h-full bg-primary-container w-[72%]"></div>
</div>
</div>
<div className="p-3 bg-canvas-pure-white rounded-DEFAULT shadow-sm">
<div className="flex justify-between text-label-sm font-label-sm text-text-muted-light mb-1">
<span>Bedtime Wind-down Strictness</span>
<span className="text-canvas-dark font-semibold">94% active</span>
</div>
<div className="w-full h-1.5 bg-canvas-light-gray rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container w-[94%]"></div>
</div>
</div>
<div className="p-3 bg-canvas-pure-white rounded-DEFAULT shadow-sm">
<div className="flex justify-between text-label-sm font-label-sm text-text-muted-light mb-1">
<span>Restored Attention Hours</span>
<span className="text-canvas-dark font-semibold">+2.4 hrs/day</span>
</div>
<div className="w-full h-1.5 bg-canvas-light-gray rounded-full overflow-hidden">
<div className="h-full bg-primary-container w-[85%]"></div>
</div>
</div>
</div>
</div>
<div className="p-4 rounded-DEFAULT bg-canvas-pure-white flex items-center justify-between shadow-sm">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container">lock_clock</span>
<span className="font-body-md text-body-md text-canvas-dark font-medium">Automatic Micro-Break Interventions</span>
</div>
<span className="px-3 py-1 rounded-full bg-primary-fixed font-label-sm text-label-sm text-on-primary-fixed font-semibold">ENABLED</span>
</div>
</div>
</div>
<div className="lg:col-span-5 flex flex-col order-1 lg:order-2">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container mb-4">Habit & Attention Engineering</span>
<h3 className="font-headline-lg text-headline-lg text-canvas-dark mb-4 tracking-tight">
              Doomscrolling Tracker Analytics App
            </h3>
<p className="font-body-lg text-body-lg text-text-muted-light mb-6">
              MERN-stack behavioral mental wellness platform featuring passive screen-time interception, circadian usage trend analytics, and reactive habit reinforcement engines.
            </p>
<div className="p-4 rounded-DEFAULT bg-canvas-light-gray mb-6">
<div className="font-label-sm text-label-sm text-primary-container uppercase mb-1">Measurable Impact</div>
<div className="font-title-md text-title-md text-canvas-dark font-medium">+21% sustained user engagement and conscious habit formation.</div>
</div>
<div className="flex flex-wrap gap-2 mb-8">
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">React.js</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">Node.js</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">Express.js</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">MongoDB</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">Tailwind CSS</span>
</div>
<div>
<a className="inline-flex items-center gap-2 text-primary-container font-title-md text-title-md hover:text-accent-electric-hover transition-colors group spring-link" href="#contact">
<span>View Behavioral Metrics</span>
<span className="material-symbols-outlined text-primary-container group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>
{/* Project 3: Dark Obsidian (Fuel Reservation) */}
<section className="w-full bg-surface-container-lowest text-on-surface py-24 md:py-32 reveal">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-5 flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary mb-4">Logistics & Scheduling Engine</span>
<h3 className="font-headline-lg text-headline-lg text-canvas-pure-white mb-4 tracking-tight">
              Daily Fuel Reservation Analytics
            </h3>
<p className="font-body-lg text-body-lg text-text-secondary-dark mb-6">
              End-to-end fuel pre-booking and inventory allocation platform with automated invoice reconciliation, pump queue predictive analytics, and regional demand forecasting.
            </p>
<div className="p-4 rounded-DEFAULT bg-surface-container mb-6">
<div className="font-label-sm text-label-sm text-primary uppercase mb-1">Measurable Impact</div>
<div className="font-title-md text-title-md text-canvas-pure-white font-medium">+35% user interaction surge and fully automated reservation scheduling.</div>
</div>
<div className="flex flex-wrap gap-2 mb-8">
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">React.js</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Node.js</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Express.js</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">MongoDB</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Vercel</span>
</div>
<div>
<a className="inline-flex items-center gap-2 text-primary font-title-md text-title-md hover:text-canvas-pure-white transition-colors group spring-link" href="#contact">
<span>View System Architecture</span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
</a>
</div>
</div>
<div className="lg:col-span-7 relative">
<div className="absolute -inset-6 -z-10 rounded-[32px] blur-[50px] opacity-20" style={{ background: "var(--hero-glow-1)", transition: "background 700ms ease" }} aria-hidden></div>
<div className="rounded-[32px] glass-panel spring-card p-6 md:p-8 overflow-hidden relative glass-tint-cool">
<div className="flex items-center justify-between pb-6 mb-6">
<div>
<div className="font-title-md text-title-md text-canvas-pure-white font-medium">Terminal Station Node #04</div>
<div className="font-label-sm text-label-sm text-text-muted-dark">Ahmedabad Logistics Corridor</div>
</div>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">AUTONOMOUS SYNC</span>
</div>
{/* Bay Allocation Grid */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
<div className="p-3.5 rounded-DEFAULT bg-surface-container-high text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">BAY 01</div>
<div className="font-title-md text-title-md text-primary font-semibold mt-1">BUSY</div>
<div className="font-label-sm text-label-sm text-text-secondary-dark mt-0.5">3m rem</div>
</div>
<div className="p-3.5 rounded-DEFAULT bg-surface-container-high text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">BAY 02</div>
<div className="font-title-md text-title-md text-canvas-pure-white font-semibold mt-1">READY</div>
<div className="font-label-sm text-label-sm text-primary mt-0.5">Assigned</div>
</div>
<div className="p-3.5 rounded-DEFAULT bg-surface-container-high text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">BAY 03</div>
<div className="font-title-md text-title-md text-canvas-pure-white font-semibold mt-1">READY</div>
<div className="font-label-sm text-label-sm text-text-muted-dark mt-0.5">Open Slot</div>
</div>
<div className="p-3.5 rounded-DEFAULT bg-surface-container-high text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">BAY 04</div>
<div className="font-title-md text-title-md text-tertiary font-semibold mt-1">DRAIN</div>
<div className="font-label-sm text-label-sm text-text-muted-dark mt-0.5">Refill</div>
</div>
</div>
{/* Inventory Bar */}
<div className="p-4 rounded-DEFAULT bg-surface-container-high mb-4">
<div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-2">
<span>ULSD Bulk Storage Reservoir</span>
<span>78,400 L / 90,000 L</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary w-[87%]"></div>
</div>
</div>
<div className="p-3.5 rounded-DEFAULT bg-surface-container-high flex items-center justify-between font-label-sm text-label-sm">
<div className="flex items-center gap-2 text-on-surface">
<span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
<span>Auto-dispatched e-Invoice: #FL-2025-88319</span>
</div>
<span className="text-text-muted-dark">Instant PDF / SMS</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Project 4: Light Canvas (Quick Serve Marketplace) */}
<section className="w-full bg-canvas-pure-white text-canvas-dark py-24 md:py-32 reveal">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-7 order-2 lg:order-1 relative">
<div className="absolute -inset-6 -z-10 rounded-[32px] blur-[50px] opacity-15" style={{ background: "var(--hero-glow-2)", transition: "background 700ms ease" }} aria-hidden></div>
<div className="rounded-[32px] glass-panel-light spring-card p-6 md:p-8 overflow-hidden relative glass-tint-warm">
<div className="flex items-center justify-between pb-6 mb-6">
<div>
<div className="font-title-md text-title-md font-semibold text-canvas-dark">Quick Serve Dispatch</div>
<div className="font-label-sm text-label-sm text-text-muted-light">Instant Contractor Matching Engine</div>
</div>
<span className="px-3 py-1 rounded-full bg-canvas-pure-white text-primary-container font-label-sm text-label-sm font-semibold shadow-sm">MATCHED • 98.4%</span>
</div>
<div className="space-y-3">
<div className="p-4 rounded-DEFAULT bg-canvas-pure-white flex items-center justify-between shadow-sm">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-canvas-light-gray flex items-center justify-center font-bold text-primary-container">
<span className="material-symbols-outlined">person</span>
</div>
<div>
<div className="font-title-md text-title-md text-canvas-dark font-medium flex items-center gap-2">
<span>Aarav Mehta</span>
<span className="material-symbols-outlined text-primary-container text-[18px]">verified</span>
</div>
<div className="font-label-sm text-label-sm text-text-muted-light">HVAC & Electrical Specialist • 4.96 ★ (142 reviews)</div>
</div>
</div>
<button className="px-4 py-1.5 rounded-full glass-button-primary spring-hover text-canvas-pure-white font-label-md text-label-md">
                    Dispatch
                  </button>
</div>
<div className="p-4 rounded-DEFAULT bg-canvas-pure-white flex items-center justify-between shadow-sm">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-canvas-light-gray flex items-center justify-center font-bold text-primary-container">
<span className="material-symbols-outlined">person</span>
</div>
<div>
<div className="font-title-md text-title-md text-canvas-dark font-medium flex items-center gap-2">
<span>Priya Soni</span>
<span className="material-symbols-outlined text-primary-container text-[18px]">verified</span>
</div>
<div className="font-label-sm text-label-sm text-text-muted-light">Commercial Barista & Catering • 4.91 ★ (88 reviews)</div>
</div>
</div>
<button className="px-4 py-1.5 rounded-full glass-button-primary spring-hover text-canvas-pure-white font-label-md text-label-md">
                    Dispatch
                  </button>
</div>
</div>
<div className="mt-4 p-3 rounded-DEFAULT bg-canvas-pure-white flex items-center justify-between text-label-sm font-label-sm text-text-muted-light shadow-sm">
<span>Average Contractor ETA: <strong className="text-canvas-dark">18 mins</strong></span>
<span>Direct Stripe Micro-Payouts</span>
</div>
</div>
</div>
<div className="lg:col-span-5 flex flex-col order-1 lg:order-2">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container mb-4">On-Demand Talent Platform</span>
<h3 className="font-headline-lg text-headline-lg text-canvas-dark mb-4 tracking-tight">
              Quick Serve
            </h3>
<p className="font-body-lg text-body-lg text-text-muted-light mb-6">
              High-responsiveness marketplace matching local businesses with pre-vetted contractors through instant geo-query matching, direct rating pipelines, and frictionless booking.
            </p>
<div className="p-4 rounded-DEFAULT bg-canvas-light-gray mb-6">
<div className="font-label-sm text-label-sm text-primary-container uppercase mb-1">Measurable Impact</div>
<div className="font-title-md text-title-md text-canvas-dark font-medium">+22% user retention through intuitive job discovery UI and instant booking flows.</div>
</div>
<div className="flex flex-wrap gap-2 mb-8">
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">React.js</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">Node.js</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">MongoDB</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">RESTful APIs</span>
</div>
<div>
<a className="inline-flex items-center gap-2 text-primary-container font-title-md text-title-md hover:text-accent-electric-hover transition-colors group spring-link" href="#contact">
<span>View Marketplace Architecture</span>
<span className="material-symbols-outlined text-primary-container group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>

{/* Project 5: Dark Canvas (AI Health Screening Voice App) */}
<section className="w-full bg-canvas-dark text-on-surface py-24 md:py-32 reveal">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-5 flex flex-col">
<div className="flex items-center gap-2 mb-4">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary-dark">Live Voice AI • Bilingual</span>
</div>
<h3 className="font-headline-lg text-headline-lg text-canvas-pure-white mb-4 tracking-tight">
              AI Health Screening Voice App
            </h3>
<p className="font-body-lg text-body-lg text-text-secondary-dark mb-6">
              Live push-to-talk voice conversation with an AI medical agent that conducts basic health screening — zero-latency via native Web Speech APIs, auto-detects Hindi/English, and outputs a structured JSON health report.
            </p>
<div className="p-4 rounded-DEFAULT bg-surface-container mb-6">
<div className="font-label-sm text-label-sm text-primary uppercase mb-1">Measurable Impact</div>
<div className="font-title-md text-title-md text-canvas-pure-white font-medium">Zero-cost, sub-300ms voice I/O with bilingual auto-detection and instant JSON report generation.</div>
</div>
<div className="flex flex-wrap gap-2 mb-8">
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">React (Vite)</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Node.js</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Express.js</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">WebSockets</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Gemini API</span>
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Web Speech API</span>
</div>
<div className="flex flex-wrap gap-3">
<a href="https://github.com/palprashant156/AI-Health-Screening-Voice-App" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary spring-hover font-label-md text-label-md">
<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0.3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 0.3z"/></svg>
<span>View Code</span>
<span className="material-symbols-outlined text-[16px]">arrow_outward</span>
</a>
</div>
</div>
<div className="lg:col-span-7 relative">
<div className="absolute -inset-6 -z-10 rounded-[32px] blur-[50px] opacity-20" style={{ background: "var(--hero-glow-1)", transition: "background 700ms ease" }} aria-hidden></div>
<div className="rounded-[32px] glass-panel spring-card p-6 md:p-8 overflow-hidden relative glass-tint-cool">
<div className="flex items-center justify-between pb-6 mb-6">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-error/70"></span>
<span className="w-3 h-3 rounded-full bg-tertiary/70"></span>
<span className="w-3 h-3 rounded-full bg-primary/70"></span>
<span className="ml-3 font-label-sm text-label-sm text-text-muted-dark">voice.health.agent — live session</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm animate-pulse">● LIVE MIC</span>
</div>
<div className="grid grid-cols-3 gap-3 mb-6">
<div className="p-3 rounded-[20px] glass-panel-subtle text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">Latency</div>
<div className="font-title-md text-title-md text-primary font-bold mt-1">&lt;300ms</div>
<div className="font-label-sm text-label-sm text-text-muted-dark">STT → LLM → TTS</div>
</div>
<div className="p-3 rounded-[20px] glass-panel-subtle text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">Languages</div>
<div className="font-title-md text-title-md text-canvas-pure-white font-bold mt-1">HI / EN</div>
<div className="font-label-sm text-label-sm text-primary">Auto-detect</div>
</div>
<div className="p-3 rounded-[20px] glass-panel-subtle text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">Cost</div>
<div className="font-title-md text-title-md text-tertiary font-bold mt-1">FREE</div>
<div className="font-label-sm text-label-sm text-text-muted-dark">Native APIs</div>
</div>
</div>
<div className="rounded-[20px] glass-panel-subtle p-4 mb-4">
<div className="flex items-center gap-2 mb-3">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-text-secondary-dark">Push-to-Talk Transcript</span>
<span className="ml-auto font-label-sm text-label-sm text-primary">हिन्दी • English</span>
</div>
<div className="space-y-2 font-body-md text-body-md">
<div className="flex gap-2"><span className="text-primary font-bold">You:</span><span className="text-on-surface">“मुझे पिछले दो दिन से बुखार है”</span></div>
<div className="flex gap-2"><span className="text-tertiary font-bold">AI:</span><span className="text-on-surface">“आपका तापमान कितना है? कोई अन्य लक्षण?”</span></div>
</div>
<div className="mt-3 flex items-center justify-center gap-2 py-2 rounded-full bg-surface-container-high/50">
<span className="material-symbols-outlined text-primary text-[18px] animate-pulse">mic</span>
<span className="font-label-sm text-label-sm text-text-muted-dark">Hold to talk • Release to send</span>
<span className="w-20 h-1.5 rounded-full bg-surface-container overflow-hidden"><span className="block h-full w-[65%] bg-primary animate-pulse"></span></span>
</div>
</div>
<div className="rounded-[20px] bg-surface-container-high p-3 font-mono text-[11px] leading-relaxed">
<div className="flex items-center justify-between mb-1.5"><span className="font-label-sm text-label-sm text-text-muted-dark">Generated JSON Report</span><span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm">JSON</span></div>
<div className="text-primary">{"{"}</div>
<div className="pl-3 text-on-surface">"symptoms": ["fever","cough"], "duration": "2 days", "language": "hi",</div>
<div className="pl-3 text-on-surface">"triage": "mild • self-care advised", "followUp": "if fever &gt; 101°F"</div>
<div className="text-primary">{"}"}</div>
</div>
</div>
</div>
</div>
</div>
</section>

{/* Project 6: Light Canvas (Kapture CX Voicebot Integration "Maya") */}
<section className="w-full bg-canvas-pure-white text-canvas-dark py-24 md:py-32 reveal">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-7 order-2 lg:order-1 relative">
<div className="absolute -inset-6 -z-10 rounded-[32px] blur-[50px] opacity-15" style={{ background: "var(--hero-glow-2)", transition: "background 700ms ease" }} aria-hidden></div>
<div className="rounded-[32px] glass-panel-light spring-card p-6 md:p-8 overflow-hidden relative glass-tint-warm">
<div className="flex items-center justify-between pb-6 mb-6">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container">support_agent</span>
<span className="font-title-md text-title-md font-semibold text-canvas-dark">Maya — Outbound Collections</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">RBI 8AM–7PM IST</span>
</div>
<div className="space-y-3 mb-6">
<div className="p-3 rounded-[16px] glass-panel-subtle flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-canvas-dark font-medium">State: AUTHENTICATING</span>
<span className="font-label-sm text-label-sm text-text-muted-light">webhook → verify</span>
</div>
<span className="font-mono text-[11px] bg-canvas-light-gray px-2 py-1 rounded-full">DOB + •••• 4821</span>
</div>
<div className="grid grid-cols-3 gap-3">
<div className="p-3 rounded-[16px] bg-canvas-pure-white shadow-sm text-center">
<div className="font-label-sm text-label-sm text-text-muted-light">Auth</div>
<div className="font-title-md text-title-md text-primary-container font-bold">✓ Verified</div>
<div className="font-label-sm text-label-sm text-text-muted-light">Backend, not prompt</div>
</div>
<div className="p-3 rounded-[16px] bg-canvas-pure-white shadow-sm text-center">
<div className="font-label-sm text-label-sm text-text-muted-light">Call Window</div>
<div className="font-title-md text-title-md text-canvas-dark font-bold">08:00–19:00</div>
<div className="font-label-sm text-label-sm text-primary">IST enforced</div>
</div>
<div className="p-3 rounded-[16px] bg-canvas-pure-white shadow-sm text-center">
<div className="font-label-sm text-label-sm text-text-muted-light">Tone</div>
<div className="font-title-md text-title-md text-tertiary-container font-bold">Polite</div>
<div className="font-label-sm text-label-sm text-text-muted-light">Compliant</div>
</div>
</div>
</div>
<div className="rounded-[16px] bg-canvas-pure-white shadow-sm p-3 mb-3">
<div className="flex items-center gap-2 mb-2"><span className="material-symbols-outlined text-primary-container text-[16px]">call</span><span className="font-label-sm text-label-sm text-canvas-dark font-medium">Webhook State Machine — Node.js</span></div>
<div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted-light overflow-x-auto">
<span className="px-2 py-1 rounded-full bg-canvas-light-gray">init</span><span>→</span><span className="px-2 py-1 rounded-full bg-primary-container text-white">auth</span><span>→</span><span className="px-2 py-1 rounded-full bg-canvas-light-gray">collect</span><span>→</span><span className="px-2 py-1 rounded-full bg-canvas-light-gray">close</span>
<span className="ml-auto text-primary">server controls transition</span>
</div>
</div>
<div className="p-3 rounded-[16px] bg-canvas-light-gray flex items-center justify-between">
<div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary-container text-[18px]">record_voice_over</span><span className="font-body-md text-body-md text-canvas-dark font-medium">Vapi.ai • GPT-4o • Deepgram Nova-3 • ElevenLabs</span></div>
</div>
</div>
</div>
<div className="lg:col-span-5 flex flex-col order-1 lg:order-2">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container mb-4">Outbound Voice AI • Finance</span>
<h3 className="font-headline-lg text-headline-lg text-canvas-dark mb-4 tracking-tight">
              Kapture CX Voicebot Integration — "Maya"
            </h3>
<p className="font-body-lg text-body-lg text-text-muted-light mb-6">
              Outbound finance collections voice agent that calls customers for overdue EMIs — politely, compliantly. Backend-enforced auth via Node.js webhook controls state transitions and sensitive data, verifying DOB + last 4 digits and enforcing RBI 8 AM–7 PM IST window.
            </p>
<div className="p-4 rounded-DEFAULT bg-canvas-light-gray mb-6">
<div className="font-label-sm text-label-sm text-primary-container uppercase mb-1">Measurable Impact</div>
<div className="font-title-md text-title-md text-canvas-dark font-medium">Compliant, human-like collections at scale with server-side guardrails — not just prompt instructions.</div>
</div>
<div className="flex flex-wrap gap-2 mb-8">
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">Node.js</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">Express.js</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">Vapi.ai</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">GPT-4o</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">Deepgram Nova-3</span>
<span className="px-3 py-1 rounded-full bg-canvas-light-gray text-canvas-dark font-label-sm text-label-sm">ElevenLabs</span>
</div>
<div className="flex flex-wrap gap-3">
<a href="https://github.com/palprashant156/Kapture-CX-Voicebot-Integration" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary spring-hover font-label-md text-label-md">
<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0.3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 0.3z"/></svg>
<span>View Code</span>
<span className="material-symbols-outlined text-[16px]">arrow_outward</span>
</a>
</div>
</div>
</div>
</div>
</section>

{/* Project 7: Dark Obsidian (System Design Simulator Backend) */}
<section className="w-full bg-surface-container-lowest text-on-surface py-24 md:py-32 reveal">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-5 flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary mb-4">Backend Simulation • Distributed Systems</span>
<h3 className="font-headline-lg text-headline-lg text-canvas-pure-white mb-4 tracking-tight">
              System Design Simulator (Backend)
            </h3>
<p className="font-body-lg text-body-lg text-text-secondary-dark mb-6">
              NestJS backend for simulating system design concepts — Prisma for DB modeling, WebSockets for real-time sync, BullMQ for background jobs/queues, all containerized with Docker.
            </p>
<div className="p-4 rounded-DEFAULT bg-surface-container mb-6">
<div className="font-label-sm text-label-sm text-primary uppercase mb-1">Measurable Impact</div>
<div className="font-title-md text-title-md text-canvas-pure-white font-medium">Production-grade NestJS + Prisma + BullMQ architecture with real-time WebSocket updates.</div>
</div>
<div className="flex flex-wrap gap-2 mb-8">
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">NestJS</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Prisma</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">PostgreSQL</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">WebSockets</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">BullMQ</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">TypeScript</span>
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Docker</span>
</div>
<div className="flex flex-wrap gap-3">
<a href="https://github.com/palprashant156/system-design-simulator-BE" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary spring-hover font-label-md text-label-md">
<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0.3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 0.3z"/></svg>
<span>View Code</span>
<span className="material-symbols-outlined text-[16px]">arrow_outward</span>
</a>
</div>
</div>
<div className="lg:col-span-7 relative">
<div className="absolute -inset-6 -z-10 rounded-[32px] blur-[50px] opacity-20" style={{ background: "var(--hero-glow-1)", transition: "background 700ms ease" }} aria-hidden></div>
<div className="rounded-[32px] glass-panel spring-card p-6 md:p-8 overflow-hidden relative glass-tint-cool">
<div className="flex items-center justify-between pb-6 mb-6">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-error/70"></span>
<span className="w-3 h-3 rounded-full bg-tertiary/70"></span>
<span className="w-3 h-3 rounded-full bg-primary/70"></span>
<span className="ml-3 font-label-sm text-label-sm text-text-muted-dark">simulator.be — nest start</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">● DOCKER</span>
</div>
<div className="grid grid-cols-3 gap-3 mb-6">
<div className="p-3 rounded-[16px] glass-panel-subtle text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">Prisma</div>
<div className="font-label-md text-label-md text-canvas-pure-white font-bold mt-1">Schema → DB</div>
<div className="font-label-sm text-label-sm text-primary">PostgreSQL</div>
</div>
<div className="p-3 rounded-[16px] glass-panel-subtle text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">BullMQ</div>
<div className="font-title-md text-title-md text-tertiary font-bold">Queue</div>
<div className="font-label-sm text-label-sm text-text-muted-dark">Jobs • Workers</div>
</div>
<div className="p-3 rounded-[16px] glass-panel-subtle text-center">
<div className="font-label-sm text-label-sm text-text-muted-dark">WebSockets</div>
<div className="font-title-md text-title-md text-primary font-bold">Realtime</div>
<div className="font-label-sm text-label-sm text-text-muted-dark">Gateway</div>
</div>
</div>
<div className="rounded-[16px] glass-panel-subtle p-3 mb-4 font-mono text-[11px]">
<div className="flex items-center gap-2 mb-2 text-text-muted-dark"><span className="material-symbols-outlined text-primary text-[14px]">terminal</span><span>prisma/schema.prisma</span><span className="ml-auto text-primary">● synced</span></div>
<div className="text-primary">model <span className="text-tertiary">Simulation</span> {"{"}</div>
<div className="pl-3 text-on-surface">id String @id @default(cuid())</div>
<div className="pl-3 text-on-surface">status String // queued | running | done</div>
<div className="pl-3 text-on-surface">createdAt DateTime @default(now())</div>
<div className="text-primary">{"}"}</div>
</div>
<div className="space-y-2 font-mono text-[11px]">
<div className="p-2.5 rounded-[12px] bg-surface-container-high flex items-center justify-between">
<span className="text-primary">BullMQ • job:8321</span><span className="text-tertiary">completed</span><span className="text-text-muted-dark">42ms</span>
</div>
<div className="p-2.5 rounded-[12px] bg-surface-container-high flex items-center justify-between">
<span className="text-primary">WS • broadcast</span><span className="text-on-surface">simulation:update</span><span className="text-text-muted-dark">realtime</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

</div>
{/* SECTION 4: EXPERIENCE TIMELINE */}
<section className="w-full bg-canvas-dark text-on-surface py-24 md:py-32 reveal" id="experience">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="text-center max-w-2xl mx-auto mb-20">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary mb-2 block">Career Milestones</span>
<h2 className="font-headline-lg text-headline-lg text-canvas-pure-white tracking-tight">Professional Experience</h2>
</div>
<div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20"><div className="w-[600px] h-[300px] rounded-full blur-[80px]" style={{ background: "var(--hero-glow-1)" }}></div></div><div className="relative max-w-3xl mx-auto">
{/* Center glowing track line */}
<div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 -translate-x-1/2 bg-surface-variant"></div>
<div className="space-y-16">
{/* Item 1 */}
<div className="relative flex flex-col md:flex-row items-start">
<div className="md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right">
<div className="inline-block px-3 py-1 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm font-semibold mb-2">
                Dec 2025 – Present
              </div>
<div className="font-title-lg text-title-lg text-canvas-pure-white font-semibold">MediaNv Aidos Pvt Ltd</div>
<div className="font-body-md text-body-md text-secondary mb-3">Full Stack Engineer</div>
<p className="font-body-md text-body-md text-text-secondary-dark">
                Architecting core NestJS and Node.js microservices with PostgreSQL. Scaling high-load transactional systems, streamlining automated cloud CI/CD pipelines, and driving infrastructure modernization across AWS.
              </p>
</div>
<div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 ring-4 ring-canvas-dark"></div>
<div className="hidden md:block md:w-1/2 pl-12"></div>
</div>
{/* Item 2 */}
<div className="relative flex flex-col md:flex-row items-start">
<div className="hidden md:block md:w-1/2 pr-12"></div>
<div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface-bright shadow-lg ring-4 ring-canvas-dark"></div>
<div className="md:w-1/2 pl-12">
<div className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-text-secondary-dark font-label-sm text-label-sm font-semibold mb-2">
                May 2024 – Nov 2024
              </div>
<div className="font-title-lg text-title-lg text-canvas-pure-white font-semibold">My Virtual Team</div>
<div className="font-body-md text-body-md text-secondary mb-3">Full Stack Developer</div>
<p className="font-body-md text-body-md text-text-secondary-dark">
                Engineered responsive single-page web applications utilizing React.js, Express, and MongoDB. Optimized database query performance and streamlined reusable UI component libraries for multi-tenant deployment.
              </p>
</div>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 5: SKILLS MATRIX */}
<section className="w-full bg-canvas-pure-white text-canvas-dark py-24 md:py-32 reveal relative overflow-hidden" id="skills">
<div className="absolute inset-0 pointer-events-none opacity-15"><div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[90px]" style={{ background: "var(--hero-glow-2)" }}></div></div><div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop relative">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary-container mb-2 block">Capability Matrix</span>
<h2 className="font-headline-lg text-headline-lg text-canvas-dark tracking-tight">Technical Expertise & Architecture</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/* Frontend */}
<div className="rounded-[24px] glass-panel-light spring-card p-8 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-full bg-canvas-pure-white flex items-center justify-center text-primary-container shadow-sm mb-6">
<span className="material-symbols-outlined text-[24px]">terminal</span>
</div>
<div className="font-title-lg text-title-lg text-canvas-dark font-semibold mb-3">Frontend</div>
<p className="font-body-md text-body-md text-text-muted-light mb-6">Reactive, edge-rendered user interfaces with strict type guarantees.</p>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">React 19</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Next.js</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Angular</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">TypeScript</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Tailwind CSS</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">HTML5/CSS3</span>
</div>
</div>
{/* Backend */}
<div className="rounded-[24px] glass-panel-light spring-card p-8 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-full bg-canvas-pure-white flex items-center justify-center text-primary-container shadow-sm mb-6">
<span className="material-symbols-outlined text-[24px]">dns</span>
</div>
<div className="font-title-lg text-title-lg text-canvas-dark font-semibold mb-3">Backend</div>
<p className="font-body-md text-body-md text-text-muted-light mb-6">High-throughput microservices and streaming event architectures.</p>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Node.js</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">NestJS</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Express.js</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">REST APIs</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">WebSockets</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">JWT Auth</span>
</div>
</div>
{/* Databases */}
<div className="rounded-[24px] glass-panel-light spring-card p-8 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-full bg-canvas-pure-white flex items-center justify-center text-primary-container shadow-sm mb-6">
<span className="material-symbols-outlined text-[24px]">database</span>
</div>
<div className="font-title-lg text-title-lg text-canvas-dark font-semibold mb-3">Databases</div>
<p className="font-body-md text-body-md text-text-muted-light mb-6">Relational and document schemas built for high concurrent write volumes.</p>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">PostgreSQL</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">MongoDB</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Data Modeling</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Query Plan Tuning</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Index Optimization</span>
</div>
</div>
{/* Cloud & DevOps */}
<div className="rounded-[24px] glass-panel-light spring-card p-8 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-full bg-canvas-pure-white flex items-center justify-center text-primary-container shadow-sm mb-6">
<span className="material-symbols-outlined text-[24px]">cloud_sync</span>
</div>
<div className="font-title-lg text-title-lg text-canvas-dark font-semibold mb-3">Cloud & DevOps</div>
<p className="font-body-md text-body-md text-text-muted-light mb-6">Continuous integration, immutable containers, and edge distribution.</p>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">AWS (EC2, S3)</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Docker</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">GitHub Actions</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Render</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Vercel</span>
<span className="px-2.5 py-1 rounded-full bg-canvas-pure-white text-canvas-dark font-label-sm text-label-sm shadow-sm">Netlify</span>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 6: CERTIFICATIONS STRIP */}
<section className="w-full bg-canvas-dark py-12 reveal">
<div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop">
<div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 font-label-md text-label-md text-text-secondary-dark">
<div className="flex items-center gap-2 hover:text-canvas-pure-white transition-colors">
<span className="material-symbols-outlined text-primary text-[20px]">verified</span>
<span>AWS Cloud (Coursera)</span>
</div>
<div className="flex items-center gap-2 hover:text-canvas-pure-white transition-colors">
<span className="material-symbols-outlined text-primary text-[20px]">verified</span>
<span>IBM Cloud Essentials (edX)</span>
</div>
<div className="flex items-center gap-2 hover:text-canvas-pure-white transition-colors">
<span className="material-symbols-outlined text-primary text-[20px]">verified</span>
<span>Offensive Penetration Testing (Cybrary)</span>
</div>
<div className="flex items-center gap-2 hover:text-canvas-pure-white transition-colors">
<span className="material-symbols-outlined text-primary text-[20px]">verified</span>
<span>Python Data Science (Coursera)</span>
</div>
</div>
</div>
</section>
{/* SECTION 7: CONTACT / OUTRO */}
<section className="w-full bg-canvas-pure-black py-28 md:py-36 text-center reveal relative overflow-hidden" id="contact">
<div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20"><div className="w-[900px] h-[500px] rounded-full blur-[100px]" style={{ background: "var(--hero-glow-1)" }}></div></div><div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop flex flex-col items-center relative">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary mb-4 block">Get in Touch</span>
<h2 className="font-headline-lg text-headline-lg text-canvas-pure-white tracking-tight mb-6 max-w-2xl">
        Let’s build something great.
      </h2>
<p className="font-body-lg text-body-lg text-text-secondary-dark max-w-xl mb-12">
        Available for full stack engineering leadership, complex system design engagements, and high-performance product development.
      </p>
<div className="inline-flex flex-col sm:flex-row items-center gap-4 mb-10">
<div className="flex items-center gap-2 px-6 py-3 rounded-full glass-panel">
<a className="font-title-md text-title-md text-canvas-pure-white hover:text-primary transition-colors" href="mailto:palprashant156@gmail.com">
            palprashant156@gmail.com
          </a>
<button
                onClick={handleCopy}
                className="ml-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm hover:bg-surface-bright transition-colors"
                title="Copy to clipboard"
              >
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
</div>
<a className="px-8 py-3.5 rounded-full glass-button-primary spring-hover text-canvas-pure-white font-title-md text-title-md" href="mailto:palprashant156@gmail.com">
          Send Email
        </a>
</div>
<div className="flex items-center gap-4 font-label-md text-label-md">
<a className="px-5 py-2.5 rounded-full glass-panel spring-hover text-text-secondary-dark flex items-center gap-2" href="https://www.linkedin.com/in/prashant-fullstack/" rel="noreferrer" target="_blank">
<span>LinkedIn</span>
<span className="material-symbols-outlined text-[16px]">arrow_outward</span>
</a>
<a className="px-5 py-2.5 rounded-full glass-panel spring-hover text-text-secondary-dark flex items-center gap-2" href="https://github.com/palprashant156" rel="noreferrer" target="_blank">
<span>GitHub</span>
<span className="material-symbols-outlined text-[16px]">arrow_outward</span>
</a>
</div>
</div>
</section>
</div></main><footer className="w-full bg-canvas-card-dark border-t border-border-dark reveal" style={{ backdropFilter: "blur(20px) saturate(150%)" }}><div className="max-w-[75rem] mx-auto px-gutter-mobile md:px-gutter-desktop py-12 md:py-16"><div className="flex items-center gap-2 pb-8 border-b border-border-dark text-label-sm font-label-sm text-text-muted-dark"><a className="hover:text-on-surface transition-colors" href="#">Portfolio</a><span>/</span><span className="text-on-surface-variant">Prashant Pal</span><span>/</span><span className="text-on-surface">Full Stack Engineer</span></div><div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10 border-b border-border-dark"><div><div className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-4">Featured Systems</div><ul className="space-y-3 font-body-md text-body-md text-text-secondary-dark"><li><a className="hover:text-primary transition-colors" href="#projects">Fraud Monitoring Platform</a></li><li><a className="hover:text-primary transition-colors" href="#projects">Doomscrolling Analytics Engine</a></li><li><a className="hover:text-primary transition-colors" href="#projects">Daily Fuel Logistics</a></li><li><a className="hover:text-primary transition-colors" href="#projects">Quick Serve Microservices</a></li><li><a className="hover:text-primary transition-colors" href="#projects">AI Health Screening Voice App</a></li><li><a className="hover:text-primary transition-colors" href="#projects">Kapture CX Voicebot — Maya</a></li><li><a className="hover:text-primary transition-colors" href="#projects">System Design Simulator</a></li></ul></div><div><div className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-4">Core Engineering Stack</div><ul className="space-y-3 font-body-md text-body-md text-text-secondary-dark"><li><span className="hover:text-on-surface transition-colors">Node.js & NestJS Architecture</span></li><li><span className="hover:text-on-surface transition-colors">React 19 & Next.js App Router</span></li><li><span className="hover:text-on-surface transition-colors">PostgreSQL & Redis Caching</span></li><li><span className="hover:text-on-surface transition-colors">AWS Infrastructure & Docker</span></li></ul></div><div><div className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-4">Connect & Dispatch</div><ul className="space-y-3 font-body-md text-body-md text-text-secondary-dark"><li><a className="hover:text-on-surface transition-colors flex items-center gap-2" href="https://github.com/palprashant156" rel="noreferrer" target="_blank">GitHub</a></li><li><a className="hover:text-on-surface transition-colors flex items-center gap-2" href="https://www.linkedin.com/in/prashant-fullstack/" rel="noreferrer" target="_blank">LinkedIn</a></li><li><a className="hover:text-on-surface transition-colors flex items-center gap-2" href="mailto:palprashant156@gmail.com">palprashant156@gmail.com</a></li></ul></div></div><div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-label-sm text-label-sm text-text-muted-dark"><div>Copyright © 2025 Prashant Pal. All rights reserved. Built with precision & performance in mind.</div><div className="flex items-center gap-6"><a className="hover:text-on-surface transition-colors" href="#">Architecture Blueprint</a><a className="hover:text-on-surface transition-colors" href="#">Telemetry & Privacy</a><a className="hover:text-on-surface transition-colors" href="#">Sitemap</a></div></div></div></footer>


    </>
  );
}
