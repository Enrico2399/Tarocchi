# AI on-device — Tarocchi

Interpretazioni generate localmente quando il dispositivo supporta l'AI integrata. Nessun dato inviato a server esterni.

## Piattaforme

| Platform | Engine | Requisiti |
|----------|--------|-----------|
| **iOS** | Apple Intelligence (Foundation Models) | iOS 26+, dispositivo compatibile, AI attiva |
| **Android** | Gemini Nano (ML Kit) | API 28+, dispositivo con AI on-device (es. Pixel 9+) |
| **Web** | — | Fallback JSON automatico |

Plugin: [`@capacitor/local-llm`](https://capacitorjs.com/docs/apis/local-llm) (Capacitor Labs, sperimentale).

## Comportamento

1. **Genera Carte** / **Arcano del giorno** → mostra subito testo JSON
2. Se AI disponibile e toggle attivo → rigenera con LLM on-device
3. Badge **AI** sulla carta quando la risposta è generata localmente
4. Se AI non disponibile o errore → resta il JSON (nessun crash)

## Impostazioni

- Toggle **Interpretazioni AI on-device** in `/settings`
- Stato: disponibile / non disponibile / in preparazione / scaricabile

## Codice

- `src/services/localLlm.ts` — wrapper plugin + fallback
- `src/utils/aiStorage.ts` — preferenza utente

## Note Play Store / privacy

- L'AI gira **solo sul dispositivo** — aggiornare Data safety: nessuna raccolta developer per inferenza LLM
- `minSdk` Android portato a **28** per il plugin

## Test

Su emulatore Android l'AI **non** è disponibile (serve device fisico). Su iOS Simulator funziona se il Mac host ha Apple Intelligence attiva.
