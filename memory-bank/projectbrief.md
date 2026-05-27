# Project Brief — Tarocchi Ionic

## Obiettivo
Portare l'app **Tarocchi** (lettura con carte dei tarocchi) su **Ionic React + Capacitor** e pubblicarla su **Google Play Store**.

## Scope funzionale core
- Lettura a **4 carte** con posizioni: Situazione Attuale, Sfida, Azione Consigliata, Esito
- **22 arcani maggiori** con descrizioni contestuali per posizione
- **Arcano del giorno** con modal e indicatore notifica (localStorage)
- Flip 3D delle carte con suono
- Sfondo tavolo da lettura, estetica esoterica

## Repository
| Path | Ruolo |
|------|-------|
| `tarocchi-ionic/` | **App canonica** — sviluppo attivo |
| `tarocchi-app/` | Riferimento Expo/React Native (legacy) |
| [Enrico2399/Taro](https://github.com/Enrico2399/Taro) | Riferimento web + asset |
| [Enrico2399/Tarocchi](https://github.com/Enrico2399/Tarocchi) | Monorepo originale |

## Vincoli
- Zero regressioni rispetto alle funzionalità già migrate da Taro
- Target Play Store: API 35, AAB, Data safety, privacy policy
- Package Android: `com.enrico2399.tarocchi`

## Success criteria
1. App stabile su web e Android
2. Test automatizzati su flussi critici
3. Build AAB pronta per Play Console
4. Store listing e compliance completati
