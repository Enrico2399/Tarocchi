# AI Interpretazioni — Tarocchi

Tutte le interpretazioni visibili all'utente passano dalla pipeline in `src/services/interpretation/`.

## Priorità

1. **Cache** — localStorage (chiave: carta + posizione + contesto/data)
2. **On-device** — `@capacitor/local-llm` (iOS Apple Intelligence / Android Gemini Nano)
3. **Cloud** — API OpenAI-compatible via env (`VITE_AI_API_URL`, `VITE_AI_API_KEY`, `VITE_AI_API_MODEL`)
4. **Generazione dinamica** — template da keywords (web/dev senza API; mai paragrafi hardcoded)

## Dati carte

`cardsData.ts` contiene **solo metadati**: `id`, `name`, `image`, `keywords[]`.

## Impostazioni

Toggle **Interpretazioni AI on-device** in `/settings` — se disattivo, salta on-device/cloud e usa generazione dinamica.

## Cloud (opzionale)

```env
VITE_AI_API_URL=https://api.openai.com/v1/chat/completions
VITE_AI_API_KEY=sk-...
VITE_AI_API_MODEL=gpt-4o-mini
```

Documentare in privacy policy se si inviano prompt a terze parti.

## Codice

| File | Ruolo |
|------|-------|
| `interpretationService.ts` | Orchestratore |
| `onDeviceProvider.ts` | Local LLM (dynamic import) |
| `cloudProvider.ts` | Fetch API |
| `templateProvider.ts` | Fallback dinamico keywords |
| `cache.ts` | Persistenza interpretazioni |
| `prompts.ts` | System prompt tarot |

## Play Store

- On-device: nessun dato interpretazione al developer
- Cloud: aggiornare `docs/DATA_SAFETY.md` e privacy policy
