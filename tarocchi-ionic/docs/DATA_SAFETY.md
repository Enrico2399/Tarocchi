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

Non trasmessi al developer.

## Google AdMob

Dichiarare: Device IDs, App interactions, Diagnostics — Purpose: Advertising — Shared: Yes (Google).

## Permessi

INTERNET, POST_NOTIFICATIONS (opt-in), VIBRATE (haptic). No USE_EXACT_ALARM.

## Pre-submit

- [ ] Privacy policy URL HTTPS live
- [ ] AdMob production IDs
- [ ] Ads declaration: Yes
