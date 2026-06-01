# UI-AUDIT — Fase 14

## Problemi
1. Font fisso 11px — non adatta testi AI lunghi (256 token)
2. Scroll interno carta poco discoverable
3. Template 3 keyword + 2 frasi lunghe
4. Spread celtic (6) — carte piccole, testo ancora più critico

## Fix
- Vincolo AI 128 token + prompt brevità
- normalizeInterpretation max 320 char
- line-clamp 4 + font 11/10/10px per bucket
- Tap "Leggi tutto" → IonModal sheet (pattern arcano)
- Template 2 keyword, frase più corta
