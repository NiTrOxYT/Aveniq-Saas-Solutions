# Design

## Visual Theme
Dark luxury, sleek, professional SaaS dashboard interface. Extremely high contrast, clean typography, dynamic layout. No glassmorphism, no gradients, no purple glow effects.

## Color Palette
Primary Neutrals:
- Page Background: `#08080a` (True off-black)
- Sidebar/Panel Background: `#0e0e11`
- Border Color: `#1a1a22`
- Text Primary: `#f5f5f5`
- Text Secondary: `#a1a1aa`

Accent:
- Key Accent (Emerald): `#10b981` (Semantic success, active selections)
- Error Accent: `#ef4444`

## Typography
- Fonts: System sans-serif stack (`Geist`, `Inter`, `system-ui`)
- Sizing: Fixed rem scale, tighter ratio (1.125 - 1.2) for interface accuracy.

## Spacing & Rhythm
- Sidebar navigation: `260px` fixed desktop width.
- Large spacing layout blocks (`gap-6`, `py-8`).

## Components
- Tables: Virtualized or clean semantic `table` layouts with borders.
- Buttons: Solid off-white backgrounds for primary CTAs (`bg-[#f5f5f5]`), transparent/border for secondary.
- Skeletons: Structural loaders matching data blocks.
- Toasts: High-contrast responsive popups.
