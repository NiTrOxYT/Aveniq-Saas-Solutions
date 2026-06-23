# Architecture

- **Framework**: React (v19)
- **Routing**: wouter
- **Build System**: Vite (v7)
- **State Management**: React state + TanStack Query
- **Hosting**: local / Vercel ready

# Important Files

- [App.tsx](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/src/App.tsx): route switcher, loading screen, global layout.
- [BackgroundVideo.tsx](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/src/components/BackgroundVideo.tsx): ambient hero background video.
- [ServicesSection.tsx](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/src/components/ServicesSection.tsx): bento service cards with deferred videos.
- [BackgroundEffects.tsx](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/src/components/BackgroundEffects.tsx): dynamic GSAP mouse spotlight & floating orbs.
- [vite.config.ts](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/vite.config.ts): Vite build settings.

# Performance Status

- **Largest Bundles**:
  - `vendor-supabase` (208.40 kB)
  - `vendor-react` (190.74 kB)
  - `vendor-framer-motion` (125.84 kB)
  - `vendor-gsap` (70.04 kB)
  - `vendor-ui` (56.33 kB)
  - `index` main chunk (43.17 kB)
- **Largest Assets**:
  - `mobile.webm` (~11.2 MB)
  - `design.webm` (~10.5 MB)
  - `ai.webm` (~5.8 MB)
  - `business.webm` (~3.2 MB)
  - `saas.webm` (~3.1 MB)
  - `hero-bg.webm` (~1.8 MB)
- **Bottlenecks**:
  - Solved: early video preload (saved ~30MB initial load), single monolithic JS bundle (reduced from 761.80 kB to 43.17 kB initial JS), Framer Motion leak to react-vendor, unused React Query (saved 54.09 KB), moved tailwind-merge out of main, migrated to WebM video formats, resolved mobile blank sections and lag (implemented low power overrides + static homepage import).

# Design System

- **Colors**: deep black, purple (#6750A4), violet highlight (#9C89D9).
- **Typography**: serif header (Instrument Serif), sans body/labels (Barlow).
- **Component Patterns**: liquid-glass cards, interactive bento grids.

# Decisions

- Dynamic imports (lazy + Suspense) for pages and below-fold sections.
- manualChunks Rollup config to isolate large libraries (React, Supabase, GSAP, Framer Motion, Lucide, Tailwind Merge, UI Primitives).
- Preload metadata on viewport entry, trigger full `.load()` on card hover/focus.
- Defer hero video load to idle callback or 1500ms timeout fallback.
- Wrap GSAP orbs initialization in requestIdleCallback and pause on visibilitychange.
- Removed React Query provider & dependency due to direct Supabase data fetch.
- Migrated all videos to WebM format using nested source tags inside the video elements.

# Recent Changes

- **2026-06-23**:
  - [vite.config.ts](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/vite.config.ts): updated manualChunks to resolve pnpm peer dependencies suffix leak; split framer-motion, tailwind-merge, and radix/floating-ui into separate vendor bundles.
  - [App.tsx](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/src/App.tsx): removed QueryClient and QueryClientProvider.
  - [package.json](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/package.json): removed unused `@tanstack/react-query` dependency.
  - [BackgroundVideo.tsx](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/src/components/BackgroundVideo.tsx): migrated to `/videos-webm/hero-bg.webm` using nested source element.
  - [ServicesSection.tsx](file:///Users/sourik/projects/aveniq/Aveniq-Saas-Solutions/artifacts/aveniq-landing/src/components/ServicesSection.tsx): migrated bento cards to `/videos-webm/*.webm` format using nested source elements.

# Current Tasks

- Active: none.
- Pending: user verification.
