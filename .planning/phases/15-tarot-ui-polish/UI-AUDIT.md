# UI-AUDIT — Fase 15

## Bug P0
- `.memory-card__read-more` fuori dal flip 3D → overlay sul dorso

## Fix
- Spostato in `.memory-card__face--front`
- `hasRevealed` + `showReadMore = hasRevealed && !flipped && ...`
- `[data-flipped="true"] .memory-card__read-more { display: none }`

## Polish P1
- Oro/viola carte, tavolo, chip, CTA, modal pergamena
- Anim: card-deal-in, text-fade-in, flip più fluido
