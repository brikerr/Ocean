# Deep Ocean — Implementation Progress

## Status: BUILT — ready for testing and refinement

## What's Done
- Created the `/Deep-Ocean/` directory
- Fully read and analyzed the template file (`Interactive-Anatomy/index.html`, ~3053 lines)
- Understood the complete architecture: CSS variables, HTML layout, JS state management, canvas 2D draw loop, Three.js 3D model, tour system, export/recording, URL state encoding
- **`index.html` written** (~2490 lines) with all planned features implemented

## Template Structure Reference
The template breaks down into these sections (by line number):

| Lines | Section |
|-------|---------|
| 1–11 | Head, meta, fonts |
| 12–455 | CSS (variables, layout, components, responsive) |
| 457–542 | HTML body (palette picker, theme toggle, tour btn, header, stats, canvas, controls, legend) |
| 544–558 | JS state object |
| 560–764 | PALETTES (5 palettes, each with css dark/light, canvas colors, three.js colors) |
| 766–772 | levelConfigs (4 levels with zone boundary ratios) |
| 774–992 | modeConfigs (4 modes with stats, phaseInfo, tooltips) |
| 994–999 | pathwayLines (5 lines with angle/length/width) |
| 1002–1082 | URL state encoding (defaults, load, push) |
| 1084–1236 | Event handlers (theme, palette, level, mode, tooltips, legend) |
| 1238–1305 | Canvas mouse interaction (hover detection — radial distance) |
| 1312–1365 | Canvas utilities (resize, lerp, tc, formatTime) |
| 1367–1837 | Canvas draw() loop (dot grid, phase fills, boundaries, labels, heatmap, density, pathways, gradient, flow, overlay, rim, pulse, highlights, center) |
| 1839–2453 | Three.js 3D (init, ground plane, puck layers, particles, saturation, overlay disc, pathways, heat glow, idle rotation, highlight sync, camera, animate) |
| 2455–2485 | Ambient sound |
| 2487–3050 | Tour system (chapters, actions, engine, pause/skip/end, audio preload) |
| 2654–2794 | PNG export + WebM recording |

## Implementation Plan (in order)
When resuming, write the entire `index.html` in one shot. The changes from template:

1. **Head**: Title "Pelagic Zones", favicon 🌊, ocean description
2. **Fonts**: Same (Cormorant Garamond + Karla + Material Symbols)
3. **CSS**: Identical structure — no CSS changes needed (palettes handle all colors via CSS variables)
4. **HTML body changes**:
   - Header: "Pelagic Zones"
   - Stats: Temperature, Pressure, Light, Dissolved O₂, Salinity
   - Controls: Level labels (Shelf/Slope/Abyss/Hadal), Mode labels (Tropical/Polar/Upwelling/Vent Field), toggle chips (Light Penetration, Bioluminescence)
   - Legend: Light Gradient, Thermocline, Currents, Bioluminescence, Marine Snow, Pressure, Zones
   - Info blurb: Ocean column description
   - Palette dots: Abyss, Bioluminescent, Thermal, Arctic, Coral

5. **JS Data Model**:
   - 5 ocean palettes (abyss, bioluminescent, thermal, arctic, coral) — full css/canvas/three.js color sets
   - 4 levelConfigs with 5 zone boundaries each (not 2 like template)
   - 4 modeConfigs (tropical, polar, upwelling, ventField) with 5-zone phaseInfo
   - currentLines instead of pathwayLines (horizontal flow at various depths)

6. **Canvas draw() — MAJOR REWRITE**:
   - Vertical column layout (not radial rings)
   - 5 horizontal zone bands with gradient fills
   - Light penetration gradient (toggle)
   - Thermocline band
   - Horizontal wavy current flow lines (animated)
   - Marine snow particles drifting downward
   - Bioluminescence sparkle particles (toggle)
   - Pressure darkening overlay
   - Depth scale ruler on right edge
   - "SEA LEVEL" label at top
   - Hover detection: Y-position in column → zone number

7. **getLevelValues()**: Interpolate 5 zone boundaries instead of 2

8. **Three.js 3D**: Tall vertical cylinder (5 stacked segments), marine snow particles drift down, bioluminescence glow rings, camera further back

9. **Tour**: 3 chapters with ocean-themed content and actions

10. **Export/Record**: Filenames `ocean-{mode}-level{level}.png` / `ocean-{mode}.webm`

11. **URL defaults**: `{ level: 2, mode: 'tropical', heatmap: 1, overlay: 1, theme: 'dark', palette: 'abyss' }`

## Key Architectural Differences from Template
- Template has **3 zones** (phases) with **2 boundary values** (phase1End, phase2End) → Ocean has **5 zones** with **5 boundary values** (zone1End through zone5End as fractions of column height)
- Template uses **radial geometry** (concentric circles from center) → Ocean uses **vertical column geometry** (horizontal bands from top to bottom)
- Template hover detection uses **distance from center** → Ocean uses **Y position within column**
- Template 3D is a short wide cylinder → Ocean 3D is a tall narrow cylinder
- `formatTime()` → `formatDepth()` (meters/km)
