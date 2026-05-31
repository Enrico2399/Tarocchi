# Active Context

## Stato: Milestone **Tarocchi Pro** completata ✅

Tutte le fasi GSD 1–7 implementate. Play Store submit resta manuale.

## Completato
- Fasi 1–4: toolbar, AI pipeline, UX pro, spread multipli
- Fase 5: i18n IT/EN, temi tavolo (classic/velvet/night), mazzo (classic/alchemical/fantasy)
- Fase 6: AdMob via `VITE_ADMOB_*`, toggle annunci, padding safe area
- Fase 7: Cypress E2E (spread, settings), 44 test Vitest, docs

## Prossimo (manuale)
- AAB firmato + Play Console
- `VITE_AI_API_*` e `VITE_ADMOB_*` in produzione

## Decisioni
| Decisione | Valore |
|-----------|--------|
| i18n | `src/i18n/` — IT default, EN opzionale |
| Cache interpretazioni | include locale (v3) |
| Temi visuali | CSS overlay/filter su asset esistenti |
