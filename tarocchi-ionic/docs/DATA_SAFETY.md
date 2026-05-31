# Data Safety — Play Console (bozza Tarocchi)

## Riepilogo

| Domanda | Risposta |
|---------|----------|
| L'app raccoglie dati? | Sì (AdMob) + dati locali sul dispositivo |
| L'app condivide dati? | Sì (AdMob / Google) |
| Account richiesto | No |

## Dati locali (solo dispositivo)

| Chiave | Scopo |
|--------|-------|
| `lastArcanaView` | Pallino notifica arcano |
| `tarocchi-theme` | Tema chiaro/scuro |
| `dailyArcanaNotifications` | Preferenza notifiche |
| `tarocchi-spread` | Tipo consulto selezionato |
| `tarocchi-locale` | Lingua IT/EN |
| `tarocchi-table-theme` | Tavolo da lettura |
| `tarocchi-deck-theme` | Stile mazzo |
| `tarocchi-ads-enabled` | Toggle banner AdMob |
| `tarocchi-interpretation:*` | Cache interpretazioni generate |
| `tarocchi-onboarding-v1` | Onboarding completato |

Non trasmessi al developer (salvo cloud AI opzionale — vedi sotto).

## Interpretazioni AI

| Modalità | Dati inviati al developer |
|----------|---------------------------|
| On-device LLM | No |
| Cloud API (`VITE_AI_API_*`) | Prompt inviato al provider configurato — dichiarare in privacy |
| Generazione dinamica (keywords) | No |

## Google AdMob

Dichiarare: Device IDs, App interactions, Diagnostics — Purpose: Advertising — Shared: Yes (Google).

## Permessi

INTERNET, POST_NOTIFICATIONS (opt-in), VIBRATE (haptic). No USE_EXACT_ALARM.

## Pre-submit

- [ ] Privacy policy URL HTTPS live
- [ ] AdMob production IDs
- [ ] Ads declaration: Yes
