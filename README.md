# Ocean Depths

An interactive visualization of the ocean's vertical structure, mapping five pelagic zones from the sunlit surface to the deepest trenches on Earth. The project combines a 2D canvas column visualization, a 3D cross-section, guided narration, and ambient soundscape into a single-page educational experience.

## What It Explores

### The Five Pelagic Zones

The ocean is divided into five depth-based zones, each with distinct ecosystems shaped by light, temperature, and pressure:

| Zone | Name | Depth Range | Key Characteristics |
|------|------|-------------|-------------------|
| 1 | Epipelagic (Sunlight) | 0–200m | Photosynthesis, highest biodiversity, coral reefs, phytoplankton producing 50% of Earth's oxygen |
| 2 | Mesopelagic (Twilight) | 200–1,000m | No photosynthesis, oxygen minimum zone, 90%+ organisms bioluminescent, massive daily vertical migration |
| 3 | Bathypelagic (Midnight) | 1,000–4,000m | Total darkness, life depends on marine snow, Titanic wreck depth (3,800m) |
| 4 | Abyssopelagic (Abyssal) | 4,000–6,000m | 400+ atmospheres pressure, sparse life, deepest fish recorded at 8,336m |
| 5 | Hadopelagic (Hadal) | 6,000–11,000m | Ocean trenches only, extremophiles, Mariana Trench (10,916m) |

### Exploration Depth Records

Historical depth markers appear on the column, placing human and biological achievements in context:

- **Scuba limit** — 40m (recreational diving maximum)
- **Saturation dive** — 332m (deepest commercial saturation dive)
- **Submarine (WWII)** — 500m (typical military submarine depth)
- **Sperm whale** — 2,250m (deepest recorded dive, hunting giant squid)
- **Titanic** — 3,800m (wreck discovered by Alvin in 1985)
- **Alvin (DSV)** — 6,500m (deep submergence vehicle, 5,000+ dives since 1964)
- **Deepest fish** — 8,336m (snailfish filmed in Izu-Ogasawara Trench, 2022)
- **Trieste** — 10,916m (Piccard and Walsh reached the Challenger Deep, 1960)

### Environmental Gradients

Several overlays visualize the forces that shape ocean life:

- **Light penetration** — Exponential decay of sunlight with depth. Contour lines at 1% light, 0.1%, and the aphotic boundary.
- **Thermocline** — The steep temperature gradient separating the warm mixed layer from the cold deep ocean.
- **Pressure** — Darkening overlay showing hydrostatic pressure increasing linearly with depth (1 atm per 10m).
- **Marine snow** — Particle animation representing the biological pump — organic matter sinking from the surface that feeds deep-sea ecosystems.
- **Currents** — Animated horizontal flow lines showing wind-driven and thermohaline circulation at various depths.

### Toggle Layers

- **Bioluminescence** — Glowing particles in the mesopelagic and bathypelagic zones where 90%+ of organisms produce their own light.
- **Diel Vertical Migration** — The largest animal migration on Earth. Billions of organisms rise to the surface at night to feed, descend at dawn. Animated with a ~40-second day/night cycle showing organisms moving between daytime depths (~600m) and nighttime surface positions. Critical for the ocean's carbon pump.
- **SOFAR Sound Channel** — Animated wave lines showing how sound speed varies with depth. Fast at the warm surface (~1,520 m/s), slowest at ~1,000m where the SOFAR channel axis traps sound, fast again at depth due to pressure. Discovered during WWII — small explosions at the right depth could be detected across entire ocean basins. Today carries whale songs thousands of kilometers.

### Ocean Modes

Four configurations model different ocean conditions around the globe:

- **Tropical** — Warm surface (26°C), strong stratification, sharp thermocline, high biodiversity
- **Polar** — Near-freezing throughout, weak thermocline, high dissolved oxygen, supports seasonal blooms
- **Upwelling** — Cold nutrient-rich water rises to the surface. Less than 1% of ocean area but supports over 50% of global fish catch
- **Vent Field** — Hydrothermal ecosystems powered by chemical energy from Earth's interior, independent of sunlight

### Depth Profiles

Four profiles adjust the zone distribution to model different seafloor topographies:

- **Shelf** — Shallow coastal waters over a wide continental shelf
- **Slope** — Continental slope where the seafloor drops off
- **Abyss** — Open-ocean abyssal plain with deep zones dominating
- **Hadal** — Ocean trench reaching extreme depth (11,000m)

### Color Palettes

Five ocean-themed palettes, each with dark and light variants:

- **Abyss** — Deep blue-cyan (default)
- **Bioluminescent** — Green-teal inspired by deep-sea organisms
- **Thermal** — Warm amber-orange for hydrothermal themes
- **Arctic** — Cool blue-white polar tones
- **Coral** — Warm pink-coral reef colors

## Guided Tour

A five-chapter narrated tour walks through the visualization with synchronized animations. The narration is generated via ElevenLabs TTS and the tour engine coordinates:

- Text caption reveal (character-by-character synchronized to audio)
- Layer highlights and zone hover states timed to narration content
- Depth record markers appearing only when the narration mentions them
- Toggle states (bioluminescence, migration, SOFAR) activated for relevant chapters
- 3D orbit camera movement throughout
- Ambient ocean soundscape that swells between chapters and ducks under narration

### Tour Chapters

1. **The Ocean Column** (54s) — Introduction to the five zones and the forces that shape them: light, thermocline, pressure, marine snow
2. **Descent Through the Zones** (105s) — Zone-by-zone descent weaving in exploration records: scuba limit, sperm whales, Titanic/Alvin, deepest fish, Trieste
3. **The SOFAR Channel** (88s) — Sound speed physics, the channel as a natural waveguide, WWII military discovery, whale song propagation
4. **The Great Migration** (69s) — Diel vertical migration, the carbon cycle implications, CO2 regulation
5. **Ocean Conditions** (71s) — Tropical, polar, upwelling, and vent field modes with vivid descriptions

## How It's Built

### Architecture

Single-file HTML application (`index.html`, ~2,800 lines) with inline CSS and JavaScript. No build step, no frameworks, no dependencies beyond Three.js loaded from CDN.

### Technology

| Component | Technology |
|-----------|-----------|
| 2D Visualization | HTML5 Canvas 2D API |
| 3D Cross-section | Three.js r128 (CDN) |
| Ambient Sound | Web Audio API (3 layered WAV sources with crossfades) |
| Tour Narration | ElevenLabs TTS (pre-generated MP3 files) |
| State Management | Plain JS object with lerp-based animation |
| Theming | CSS custom properties (5 palettes x 2 themes) |
| URL State | `history.pushState` for shareable configurations |
| Responsive | ResizeObserver on canvas and 3D containers |
| Fonts | Google Fonts (Cormorant Garamond + Karla) |
| Icons | Google Material Symbols Outlined |

### File Structure

```
Deep-Ocean/
  index.html              — Complete application (HTML + CSS + JS)
  README.md               — This file
  PROGRESS.md             — Internal development notes
  scripts/
    generate-audio.js     — ElevenLabs TTS generation script (Node.js)
  audio/
    01-overview.mp3       — Chapter 1 narration (851 KB)
    02-zones.mp3          — Chapter 2 narration (1.6 MB)
    03-sound.mp3          — Chapter 3 narration (1.4 MB)
    04-migration.mp3      — Chapter 4 narration (1.1 MB)
    05-modes.mp3          — Chapter 5 narration (1.1 MB)
    gentle-waves.wav      — Ambient layer 1 (30s loop)
    immersive-sea.wav     — Ambient layer 2 (20s loop)
    ocean-waves.wav       — Ambient layer 3 (30s loop)
```

### Code Structure (index.html)

| Section | Description |
|---------|-------------|
| Head / Meta / Fonts | Title, favicon, Google Fonts + Material Symbols |
| CSS (~300 lines) | Variables, layout, components, animations, responsive, tour styles |
| HTML Body | Header, stats bar, tooltip, canvas container, 3D container, tour controls, control buttons, legend bar |
| JS: State + Palettes | State object, 5 palette definitions (CSS + canvas + Three.js colors) |
| JS: Configs | Level configs (4 depth profiles), mode configs (4 ocean types with zone data), current lines |
| JS: URL State | Default values, load from URL, push to URL |
| JS: Event Handlers | Theme, palette, level, mode, tooltip hover/positioning, legend highlights |
| JS: Mouse Interaction | Canvas hover detection (Y-position maps to zone) |
| JS: Canvas Utilities | Resize, lerp, color token function, formatDepth |
| JS: Particles | Marine snow, bioluminescence, migration organisms (initialization) |
| JS: draw() Loop | Zone fills, boundaries, labels, light gradient, thermocline, currents, marine snow, bioluminescence, migration, SOFAR channel, pressure overlay, column border, sea level/seafloor labels, depth ruler, exploration records, flow pulse, highlight overlays |
| JS: Three.js 3D | Scene init, cylinder segments, water particles, bioluminescence glow, channeling lines, temperature glow, migration organisms, SOFAR rings, orbit controls, camera, animate loop |
| JS: Ambient Sound | Web Audio API layered soundscape (3 sources, staggered starts, loop with crossfade margins) |
| JS: Tour System | 5 chapters with timed actions, audio playback, caption reveal, tour engine (tick, pause, skip, end), ambient duck/unduck |
| JS: Audio Preload | Pre-cache all chapter audio files |

### Regenerating Narration Audio

Requires an ElevenLabs API key and voice ID:

```bash
ELEVENLABS_API_KEY=<key> ELEVENLABS_VOICE_ID=<voice_id> node scripts/generate-audio.js
```

The script reads chapter texts from its internal array, calls the ElevenLabs v1 TTS endpoint with `eleven_multilingual_v2` model, and saves MP3 files to the `audio/` directory.

### Key Design Decisions

- **Vertical column geometry** — The ocean is naturally vertical. A column layout maps depth to Y-position intuitively, unlike radial or horizontal layouts.
- **Single-file architecture** — Zero build complexity. Open `index.html` in a browser and everything works. Keeps the project portable and easy to share.
- **Layered information** — Toggle overlays let users explore one phenomenon at a time without visual overload. The guided tour sequences layers to match narration.
- **Calm, informative aesthetic** — Subtle opacity hierarchies, restrained animations, no flashy transitions. The data and storytelling carry the experience.
- **Depth records as context anchors** — Abstract depth numbers become meaningful when tied to human achievements and biological extremes (scuba limit, Titanic, Trieste).
- **Tour-synchronized state** — Every layer, toggle, and highlight is controlled by timed actions that match the spoken narration, creating a documentary-like experience.
