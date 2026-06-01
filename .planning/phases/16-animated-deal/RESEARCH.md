# RESEARCH — Fase 16

## Scelta stack: CSS + WAAPI hooks (zero deps)

### Valutate
| Opzione | Verdict |
|---------|---------|
| GSAP | Timeline ottima ma +~30kB, chunk già pesante |
| Framer Motion | React-friendly ma bundle ionic ~1.1MB |
| **CSS keyframes + React state** | **Scelto** — 0 deps, 60fps transform, stagger via `--deal-delay` |

### Implementazione
- `CardDealingStage`: mazzo stack 4 layer + ghost cards con `deal-fly-in`
- `useCardDealAnimation`: timeline stagger 140ms × N + 550ms duration
- Haptics nativi a ogni carta
- `prefers-reduced-motion`: skip anim, istantaneo
- Toggle Settings: `tarocchi-deal-animations-v1`

### Durata deal (ms)
| Spread | Carte | Totale |
|--------|-------|--------|
| single | 1 | 550 |
| three | 3 | 830 |
| four | 4 | 970 |
| celtic | 6 | 1250 |

Bundle delta: **0 kB** (solo CSS/componenti)
