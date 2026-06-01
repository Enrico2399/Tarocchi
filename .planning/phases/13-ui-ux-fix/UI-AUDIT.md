# UI/UX Audit — Fase 13

## Problemi rilevati
1. **Empty state iniziale** — placeholder statici invece di carte; l'utente deve cliccare Genera
2. **Spread picker troppo invasivo** — 4 box grandi occupano metà schermo mobile
3. **Griglia CSS rigida** — 3/6 carte in colonne strette su phone (~120px), layout "sballato"
4. **Gerarchia visiva** — spread + empty message + carte + bottone competono; il tavolo perde focus
5. **Card width 100% in grid** — aspect ratio ok ma celle inconsistenti tra spread

## Obiettivi fix
- Auto-generazione lettura al mount e al cambio spread
- Spread selector compatto (chip scroll orizzontale)
- Layout carte flex 2×2 (4), 1×3 (3), 2×3 (6) — dimensioni fisse coerenti
- CTA "Genera" in footer fisso, tavolo come hero
- Rimuovere empty state e placeholder

## Verifica
- Phone 375px: 4 carte visibili senza overlap
- Toolbar: arcano + settings senza overlap
- `npm run verify` + Cypress aggiornato
