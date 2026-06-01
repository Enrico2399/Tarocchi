# Tarocchi Esoteric UI — Milestone Summary

**Completata:** 27 maggio 2026  
**Fasi:** 21–28  
**Verify:** 68 test, lint, build OK

## Cosa è cambiato

### Design system (Fase 21)
- `theme/variables.css` — token esoterici estesi (palette, font, motion, shadow)
- `theme/esoteric.css` — pattern condivisi: page, toolbar, panel, CTA, sigil button, input, Ionic list

### Schermate (Fasi 22–27)
- **Home** — toolbar serif, sigil buttons, CTA cerimoniale, vignette tavolo
- **MemoryCard** — facciate pergamena, modal interpretazione, bordi oro
- **CardDealingStage** — status rituale uppercase, deck z-index fix
- **SpreadSelector** — chip sigillo con serif
- **ArcanaDelGiorno** — pulse oro (no cyan), modal studio
- **Onboarding** — IonModal rituale con sigilli ✦ ☽ ✦
- **Journal / Encyclopedia / Settings / Privacy** — shell esoteric-page + content gradient

### Copy (Fase 28)
- i18n IT/EN poetico: CTA, onboarding, empty states
- Onboarding key → `tarocchi-onboarding-v2`

## Non regressione
- Auto-generate, deal, flip, Leggi tutto, intenzione, share, journal, enciclopedia preservati

## Artifact
- `.planning/research/MARKET-ESOTERIC.md`, `UI-BENCHMARKS.md`, `DESIGN-PRINCIPLES.md`
- `.planning/phases/21-UI-SPEC.md`
