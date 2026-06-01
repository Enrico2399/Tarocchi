# Fase 14 — CONTEXT

## Obiettivo
Testi carte leggibili (template + AI) e polish UX incrementale.

## Decisioni (auto)
- Doppio layer: vincolo sorgente + UI adattiva
- AI max ~80–100 parole; token limit 128
- `interpretationText.ts`: normalize, truncate, buckets, expand threshold 120 char
- Carta: line-clamp 4 + font bucket + IonModal "Leggi tutto"
- Template accorciato (~2 frasi)
- NO redesign; NO testi in cardsData

## DoD
- Leggibile 375px; modal per testi lunghi; verify verde
