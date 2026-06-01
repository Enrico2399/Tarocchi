# Fase 33 — Interaction unlock

## Problema
- Tap su carte e «Evoca le Carte» ignorati
- `dealComplete` bloccato → UI in stato deal permanente (ghost)
- MemoryCard smontate durante deal

## Fix
- Fallback timeout `dealComplete`
- MemoryCard sempre montate; ghost overlay
- `dealEnabled` solo con carte presenti
- CTA non disabilitato durante `reading.loading`
- Hook: onComplete quando `cardCount===0` && `!enabled`
- pointer-events su griglia, footer, CTA label

## Verifica
- `npm run verify` verde
- Tap flip + generate dopo ~2s deal
