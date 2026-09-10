"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeContext";

/**
 * ThemeSwitcher — reusable, isolated component
 * Fixed icon-only toggle top-right, dropdown with 6 options (icon+label), pill highlight, outside-click close, responsive anchoring
 */
export default function ThemeSwitcher({ inline = false }: { inline?: boolean }) {
  const { themeId, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const current = themes.find((t) => t.id === themeId);

  return (
    <div
      ref={wrapperRef}
      className={
        inline
          ? "relative flex flex-col items-end self-center"
          : "fixed top-4 right-4 z-[100] flex flex-col items-end"
      }
      // Ensure never overflows viewport on mobile — parent is fixed, dropdown anchored via right-0
    >
      {/* Toggle button — icon-only, Liquid Glass — matches profile icon (w-8 h-8, glass) */}
      <button
        aria-label="Toggle theme switcher"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={`rounded-full glass-button spring-hover flex items-center justify-center text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] self-center ${
          inline ? "w-8 h-8" : "w-10 h-10"
        }`}
      >
        <span
          className={`material-symbols-outlined leading-none select-none ${inline ? "text-[18px]" : "text-[20px]"}`}
          aria-hidden
        >
          {open ? "close" : current?.icon ?? "palette"}
        </span>
      </button>

      {/* Dropdown panel — Liquid Glass 24px */}
      <div
        role="menu"
        aria-orientation="vertical"
        className={`w-[min(280px,calc(100vw-2rem))] rounded-[24px] glass-panel overflow-hidden
          ${inline ? "absolute top-full right-0 mt-3" : "mt-3"}
          ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
        style={{
          transition: "opacity 280ms ease, transform 280ms cubic-bezier(0.16,1,0.3,1), background 700ms ease, border-color 700ms ease",
        }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <span className="font-label-md text-label-md text-[var(--text-secondary)] uppercase tracking-wider">
            Theme
          </span>
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" style={{ transition: "background-color 700ms ease" }} />
        </div>

        {/* Vertical list of 6 options */}
        <div className="px-2 pb-2 flex flex-col gap-1">
          {themes.map((t) => {
            const isActive = t.id === themeId;
            return (
              <button
                key={t.id}
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-full text-left transition-all duration-300
                  ${isActive
                    ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20"
                    : "text-[var(--text-primary)] hover:bg-[var(--surface-container-high)]"
                  }
                `}
                style={{
                  // pill highlight transitions smoothly
                  transition: "background-color 700ms ease, color 700ms ease, transform 200ms ease, box-shadow 300ms ease",
                }}
              >
                <span
                  className={`material-symbols-outlined text-[18px] leading-none flex-shrink-0 ${isActive ? "text-white" : "text-[var(--accent)]"}`}
                  style={{ transition: "color 700ms ease" }}
                >
                  {t.icon}
                </span>
                <span className="font-label-md text-label-md tracking-wide flex-1">{t.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" aria-hidden />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-3 border-t border-[var(--border-color)] bg-[var(--surface)]/50">
          <p className="font-label-sm text-label-sm text-[var(--text-muted)] leading-relaxed">
            Background, accent & text transition 700ms ease
          </p>
        </div>
      </div>
    </div>
  );
}
