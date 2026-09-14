/**
 * Central Theme Config — single source of truth for all 6 time-of-day themes
 * Reusable: drop themeConfig.ts + ThemeSwitcher.tsx + ThemeContext.tsx into any Next.js app
 * Requirement: each theme is a config object { background: [...gradient stops], accent: '#...', textColor: '#...' }
 * All component colors must reference these variables, never hardcode.
 */

export type ThemeId = "pre-dawn" | "sunrise" | "daytime" | "dusk" | "sunset" | "night";

export interface Theme {
  id: ThemeId;
  label: string;
  icon: string; // Material Symbols Outlined name
  // Core config (required by spec — must stay)
  background: string[]; // gradient stops - array as per requirement
  accent: string;
  textColor: string;
  // Extended theming for full page transition (still central, not hardcoded in components)
  gradient: string; // full CSS gradient derived from background stops
  accentHover: string;
  textSecondary: string;
  textMuted: string;
  // Separate text for light vs dark surfaces to keep alternating rhythm readable
  textOnDark: string;
  textOnLight: string;
  textSecondaryOnDark: string;
  textSecondaryOnLight: string;
  textMutedOnDark: string;
  textMutedOnLight: string;
  surface: string; // main dark surface (header, etc)
  surfaceDark: string; // deepest dark (hero, footer)
  surfaceLight: string; // light sections — tinted white per theme
  surfaceLightContainer: string; // cards inside light sections
  surfaceContainer: string;
  surfaceContainerHigh: string;
  border: string;
  borderLight: string;
  particle: string; // rgba for particle effects
  heroGlow1: string;
  heroGlow2: string;
}

export const themes: Theme[] = [
  {
    id: "pre-dawn",
    label: "Pre-dawn",
    icon: "nights_stay",
    background: ["#040a14", "#0a1628", "#12233f"],
    gradient: "linear-gradient(135deg, #040a14 0%, #0a1628 45%, #12233f 100%)",
    accent: "#8b9bff",
    accentHover: "#a0b1ff",
    textColor: "#e4e8f0",
    textSecondary: "#8b9bbf",
    textMuted: "#6b7a9e",
    textOnDark: "#e4e8f0",
    textOnLight: "#0a1628",
    textSecondaryOnDark: "#8b9bbf",
    textSecondaryOnLight: "#3a4a6b",
    textMutedOnDark: "#6b7a9e",
    textMutedOnLight: "#5a6a90",
    surface: "#0a0f1c",
    surfaceDark: "#060a14",
    surfaceLight: "#f0f4ff",
    surfaceLightContainer: "#e6eeff",
    surfaceContainer: "#111a2e",
    surfaceContainerHigh: "#1a2744",
    border: "rgba(139,155,255,0.12)",
    borderLight: "rgba(10,22,40,0.08)",
    particle: "rgba(139,155,255,0.18)",
    heroGlow1: "rgba(139,155,255,0.20)",
    heroGlow2: "rgba(91,115,180,0.12)",
  },
  {
    id: "sunrise",
    label: "Sunrise",
    icon: "wb_twilight",
    background: ["#1a0a0e", "#3a1a2e", "#8b3a2a"],
    gradient: "linear-gradient(135deg, #1a0a0e 0%, #3a1a2e 45%, #8b3a2a 100%)",
    accent: "#ff8e53",
    accentHover: "#ff9a66",
    textColor: "#f5e6d3",
    textSecondary: "#d4b89e",
    textMuted: "#a68a6e",
    textOnDark: "#f5e6d3",
    textOnLight: "#2d1b0e",
    textSecondaryOnDark: "#d4b89e",
    textSecondaryOnLight: "#6b4a2e",
    textMutedOnDark: "#a68a6e",
    textMutedOnLight: "#8c6a4a",
    surface: "#1a0f14",
    surfaceDark: "#110a0f",
    surfaceLight: "#fff7ed",
    surfaceLightContainer: "#ffedd5",
    surfaceContainer: "#22151a",
    surfaceContainerHigh: "#332027",
    border: "rgba(255,142,83,0.12)",
    borderLight: "rgba(45,27,14,0.07)",
    particle: "rgba(255,142,83,0.22)",
    heroGlow1: "rgba(255,142,83,0.22)",
    heroGlow2: "rgba(255,180,123,0.12)",
  },
  {
    id: "daytime",
    label: "Daytime",
    icon: "light_mode",
    background: ["#eef4ff", "#ffffff", "#e6f0ff"],
    gradient: "linear-gradient(135deg, #eef4ff 0%, #ffffff 55%, #dbe9ff 100%)",
    accent: "#0071e3",
    accentHover: "#0077ED",
    textColor: "#1D1D1F",
    textSecondary: "#3a3a4a",
    textMuted: "#6E6E73",
    textOnDark: "#1D1D1F",
    textOnLight: "#1D1D1F",
    textSecondaryOnDark: "#3a3a4a",
    textSecondaryOnLight: "#3a3a4a",
    textMutedOnDark: "#6E6E73",
    textMutedOnLight: "#6E6E73",
    surface: "#ffffff",
    surfaceDark: "#f5f5f7",
    surfaceLight: "#ffffff",
    surfaceLightContainer: "#f5f5f7",
    surfaceContainer: "#f0f4ff",
    surfaceContainerHigh: "#e1ebff",
    border: "rgba(0,113,227,0.08)",
    borderLight: "rgba(0,0,0,0.06)",
    particle: "rgba(0,113,227,0.10)",
    heroGlow1: "rgba(0,113,227,0.08)",
    heroGlow2: "rgba(171,199,255,0.14)",
  },
  {
    id: "dusk",
    label: "Dusk",
    icon: "routine",
    background: ["#0f0a1a", "#1a1033", "#3d2480"],
    gradient: "linear-gradient(135deg, #0f0a1a 0%, #1a1033 45%, #3d2480 100%)",
    accent: "#a78bfa",
    accentHover: "#b9a2ff",
    textColor: "#ede9fe",
    textSecondary: "#b8aee0",
    textMuted: "#8b7fb8",
    textOnDark: "#ede9fe",
    textOnLight: "#1a1033",
    textSecondaryOnDark: "#b8aee0",
    textSecondaryOnLight: "#4a3a6b",
    textMutedOnDark: "#8b7fb8",
    textMutedOnLight: "#6b5a90",
    surface: "#0f0a1a",
    surfaceDark: "#0a0612",
    surfaceLight: "#f5f0ff",
    surfaceLightContainer: "#ede9fe",
    surfaceContainer: "#181028",
    surfaceContainerHigh: "#241a3d",
    border: "rgba(167,139,250,0.12)",
    borderLight: "rgba(26,16,51,0.06)",
    particle: "rgba(167,139,250,0.18)",
    heroGlow1: "rgba(167,139,250,0.20)",
    heroGlow2: "rgba(124,58,237,0.10)",
  },
  {
    id: "sunset",
    label: "Sunset",
    icon: "wb_sunny",
    background: ["#0a0a0f", "#2a0f1e", "#7a2a0a"],
    gradient: "linear-gradient(135deg, #0a0a0f 0%, #2a0f1e 40%, #7a2a0a 100%)",
    accent: "#ff5a1f",
    accentHover: "#ff6b35",
    textColor: "#ffedd5",
    textSecondary: "#e0b8a0",
    textMuted: "#a67c5a",
    textOnDark: "#ffedd5",
    textOnLight: "#2a0f0a",
    textSecondaryOnDark: "#e0b8a0",
    textSecondaryOnLight: "#6b3a1e",
    textMutedOnDark: "#a67c5a",
    textMutedOnLight: "#8c5a2e",
    surface: "#0f0a0f",
    surfaceDark: "#08050a",
    surfaceLight: "#fff0e6",
    surfaceLightContainer: "#ffedd5",
    surfaceContainer: "#1a0f0c",
    surfaceContainerHigh: "#2e1a12",
    border: "rgba(255,90,31,0.12)",
    borderLight: "rgba(42,15,10,0.07)",
    particle: "rgba(255,90,31,0.20)",
    heroGlow1: "rgba(255,90,31,0.22)",
    heroGlow2: "rgba(255,120,40,0.12)",
  },
  {
    id: "night",
    label: "Night",
    icon: "dark_mode",
    background: ["#020208", "#0e0e10", "#1D1D1F"],
    gradient: "linear-gradient(135deg, #020208 0%, #0e0e10 50%, #1D1D1F 100%)",
    accent: "#0071e3",
    accentHover: "#0077ED",
    textColor: "#e4e2e4",
    textSecondary: "#A1A1A6",
    textMuted: "#86868B",
    textOnDark: "#e4e2e4",
    textOnLight: "#1D1D1F",
    textSecondaryOnDark: "#A1A1A6",
    textSecondaryOnLight: "#3a3a4a",
    textMutedOnDark: "#86868B",
    textMutedOnLight: "#6E6E73",
    surface: "#131315",
    surfaceDark: "#000000",
    surfaceLight: "#FFFFFF",
    surfaceLightContainer: "#F5F5F7",
    surfaceContainer: "#1f1f21",
    surfaceContainerHigh: "#2a2a2c",
    border: "rgba(255,255,255,0.08)",
    borderLight: "rgba(0,0,0,0.06)",
    particle: "rgba(171,199,255,0.15)",
    heroGlow1: "rgba(0,113,227,0.20)",
    heroGlow2: "rgba(171,199,255,0.08)",
  },
];

export const defaultThemeId: ThemeId = "sunrise";

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes.find((t) => t.id === defaultThemeId)!;
}
