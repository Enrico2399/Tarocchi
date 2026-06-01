# REQUIREMENTS — Tarocchi Growth

## G2 — Intenzione consulto (Fase 17)
- Campo testo opzionale prima del consulto (max 200 char)
- Persistenza localStorage
- Prompt AI include intenzione
- Cache interpretazioni separata per intenzione

## G3 — Share scheda PNG (Fase 18)
- Generazione canvas branded viola/oro
- Condivisione file o download fallback
- Include intenzione se presente

## G1 — Diario journal (Fase 19)
- Storico esteso a 25 letture
- Route `/journal` con dettaglio e note (max 500 char)
- Link da Settings

## G4 — Enciclopedia 22 Arcani (Fase 20)
- Route `/encyclopedia`
- Griglia 22 carte + modal keywords
- Link toolbar Home

## Non regressione
- Auto-generate, deal animation, flip, Leggi tutto
- i18n IT/EN
- `npm run verify` verde
