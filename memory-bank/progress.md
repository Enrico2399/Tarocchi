# Progress

## Tarocchi Pro (GSD) 🔄

### Fase 1 — Fix critici ✅
- [x] Toolbar IonHeader (arcano, share, settings) — no overlap
- [x] Lazy import AdMob + local-llm (fix web white screen)
- [x] `npm run verify` verde (33+ test)

### Fase 2 — AI-first ✅
- [x] `cardsData.ts` solo id, name, image, keywords
- [x] `services/interpretation/` pipeline + cache
- [x] Rimosso `localLlm.ts` e fallback JSON hardcoded

### Fase 3 — UI/UX pro ✅ (base)
- [x] Design tokens in `theme/variables.css`
- [x] Empty state + griglia responsive
- [x] Onboarding first-run
- [x] Modal arcano con loading/error

### Fase 4 — Tipi lettura ✅
- [x] 1 carta, 3 carte, 4 carte, Croce Celtica (6)
- [x] Persistenza spread in localStorage

### Fase 5 — Personalizzazione ⏳
- [ ] Temi mazzo (Classico, Alchemico, Fantasy)
- [ ] Tavoli lettura alternativi
- [ ] Lingua IT/EN

### Fase 6 — Polish nativo ⏳
- [x] Haptic (già presente)
- [x] Notifiche arcano (già presente)
- [ ] AdMob production IDs

### Fase 7 — QA + Play Store ⏳
- [ ] E2E Cypress aggiornato per spread
- [ ] Upload AAB firmato
- [ ] Privacy URL HTTPS live

## Funziona ✅ (legacy)
- Ionic + Capacitor Android, flip 3D, suono, build AAB template
- Store docs, privacy in-app, screenshot

## Known issues
- Cloud AI richiede env vars manuali per web senza on-device LLM
- Template keywords ≠ AI vera — configurare `VITE_AI_API_*` per produzione web
