# Progress

## Tarocchi Pro (GSD) ✅ COMPLETATA

### Fase 1 — Fix critici ✅
- Toolbar IonHeader, lazy AdMob/local-llm, verify verde

### Fase 2 — AI-first ✅
- cardsData metadati only, pipeline interpretation + cache

### Fase 3 — UI/UX pro ✅
- Design tokens, empty state, onboarding

### Fase 4 — Tipi lettura ✅
- 1/3/4/6 carte, spread picker

### Fase 5 — Personalizzazione ✅
- i18n IT/EN (`src/i18n/`)
- Temi tavolo: classic, velvet, night
- Temi mazzo: classic, alchemical, fantasy (CSS filter)
- Nomi carte localizzati, prompt AI per lingua

### Fase 6 — Polish nativo ✅
- AdMob: `VITE_ADMOB_BANNER_ID`, `VITE_ADMOB_TESTING`
- Toggle banner in Settings (nativo)
- Classe `.has-ad-banner` + padding content

### Fase 7 — QA + Play Store ✅
- 44 test Vitest
- Cypress: spread 3 carte, settings, onboarding skip
- Docs: ADMOB, ARCHITECTURE, DATA_SAFETY, ON_DEVICE_AI

## Test
```bash
cd tarocchi-ionic
npm run verify      # 44 test + build
npm run test.e2e    # Cypress (serve dev attivo)
```

## Azioni manuali ⏳
- [ ] AAB firmato upload Play Console
- [ ] Privacy URL HTTPS
- [ ] Env produzione AI + AdMob
