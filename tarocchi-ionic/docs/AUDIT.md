# Audit — Parity & Stabilizzazione (Fase 1)

Data: 2026-05-27 | App: `tarocchi-ionic` v0.0.1

## Decisioni prodotto confermate
| Item | Valore |
|------|--------|
| Package Android | `com.enrico2399.tarocchi` ✅ |
| Monetizzazione | **Google AdMob** (pubblicità Play Store) |
| Store listing | **IT + EN** |

---

## Parity checklist

| Comportamento | Taro | tarocchi-app | tarocchi-ionic | Note |
|---------------|------|--------------|----------------|------|
| Genera 4 carte casuali | ✅ | ✅ | ✅ | `pickRandomCards` |
| Retro visibile all'inizio | ✅ | ✅ | ✅ | `flipped=true` |
| Flip mostra arcano + testo | ✅ | ✅ | ✅ | |
| Suono flip | ✅ | ✅ | ✅ | Web Audio; mobile da verificare Fase 2 |
| 4 posizioni / descrizioni | ✅ | ✅ | ✅ | `getDescriptionByIndex` |
| Arcano del giorno | ✅ | ✅ | ✅ | day-of-year % 22 |
| Modal arcano description1 | ✅ | ✅ | ✅ | |
| Pallino notifica localStorage | ✅ | ✅ | ✅ | `lastArcanaView` |
| Titoli retro animati | ✅ | ❌ | ✅ | Rainbow 200ms |
| Bordo dorato retro | ✅ | ❌ | ✅ | |
| Pulse button arcano | ✅ | ❌ | ✅ | |
| Gradient pill Genera | ✅ | parziale | ✅ | |
| Sfondo tavolo | ✅ | ✅ | ✅ | TavoloGioco.jpeg |
| Notifiche push | ❌ | ✅ | ❌ | Fase 3 P1 |
| Tema dark/light toggle | ❌ | parziale | ❌ | Fase 3 P0; dark.system disabilitato |
| Share social | ❌ | ❌ | ❌ | Fase 3 P1 |
| Temi mazzo alternativi | ❌ | ❌ | ❌ | Fase 3 P2 |
| AdMob ads | ❌ | ❌ | ❌ | Fase 3 — monetizzazione |

**Parity Taro: 12/12 ✅** — nessuna regressione UI core.

---

## Bug hunt & fix applicati

| Issue | Severità | Fix |
|-------|----------|-----|
| Dark mode system altera UI su tavolo | Media | Disabilitato `dark.system.css` fino a P0 tema |
| Logica arcano/notifica non testabile | Bassa | Estratto `arcanaStorage.ts`, `getArcanaForDate` |
| Shuffle inline non testabile | Bassa | Estratto `cardUtils.pickRandomCards` |
| Cypress boilerplate obsoleto | Bassa | Sostituito con `tarot-reading.cy.ts` |
| Mancanza test suite | Alta | 7 file test Vitest + E2E |

## Aperti (non blocker Fase 1 web)

| Issue | Piano |
|-------|-------|
| Audio autopolicy Android WebView | Test device Fase 2 |
| IonModal backdrop dismiss E2E flaky | Monitor Cypress CI |
| Bundle JS > 500KB | Code-split opzionale pre-release |

---

## Test coverage Fase 1

| Area | File test | Stato |
|------|-----------|-------|
| cardsData | `cardsData.test.ts` | ✅ |
| arcanaUtils | `arcanaUtils.test.ts` | ✅ |
| arcanaStorage | `arcanaStorage.test.ts` | ✅ |
| cardUtils | `cardUtils.test.ts` | ✅ |
| useRainbowColor | `useRainbowColor.test.ts` | ✅ |
| MemoryCard | `MemoryCard.test.tsx` | ✅ |
| ArcanaDelGiorno | `ArcanaDelGiorno.test.tsx` | ✅ |
| E2E flusso lettura | `tarot-reading.cy.ts` | ✅ (richiede dev server) |

## Gate Fase 1

- [x] AUDIT.md completato
- [x] Fix regressioni note
- [x] Test unit Vitest
- [x] E2E Cypress scritto
- [x] `npm run verify` script — **19 test, lint OK, build OK**
- [ ] E2E eseguito in CI locale (richiede `npm run dev` + cypress)
