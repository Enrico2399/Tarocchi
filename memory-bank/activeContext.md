# Active Context

## Stato: Milestone **Tarocchi Pro** in corso

Fasi 1–4 implementate nel codice; fasi 5–7 parziali.

## Completato (Tarocchi Pro)
- GSD `.planning/` inizializzato
- Fase 1: toolbar IonHeader, fix overlap arcano, lazy-load AdMob/local-llm
- Fase 2: `cardsData` solo metadati, pipeline `services/interpretation/`, cache
- Fase 3: design tokens, empty state, onboarding, spread picker UI
- Fase 4: 1/3/4/6 carte (Croce Celtica semplificata)

## Prossimo
- Fase 5: temi mazzo/tavolo, i18n IT/EN
- Fase 6–7: polish AdMob, E2E aggiornato, Play Store final

## Decisioni
| Decisione | Valore |
|-----------|--------|
| Interpretazioni | cache → on-device → cloud (env) → template keywords |
| Cloud fallback | `VITE_AI_API_URL` + `VITE_AI_API_KEY` |
| Spread default | Consulto classico (4 carte) |
