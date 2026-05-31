# Feature Backlog — Tarocchi

Priorità derivata da `MinimalTODO.md` e gap vs tarocchi-app/Taro.

## P0 — Prossima release
| ID | Feature | Stato | Note |
|----|---------|-------|------|
| F-01 | Tema chiaro/scuro | ✅ | Ionic dark.class + localStorage |
| F-02 | Audit + test anti-regressione | ✅ | Fase 1 |

## P1 — Post-stabilizzazione
| ID | Feature | Stato | Note |
|----|---------|-------|------|
| F-10 | Notifiche oracolo giornaliero | ✅ | `@capacitor/local-notifications`; ore 9:00 |
| F-11 | Condivisione lettura | ✅ | `@capacitor/share` + Web Share API fallback |
| F-12 | Schermata impostazioni | ✅ | Toggle tema, notifiche, about |

## P2 — Polish
| ID | Feature | Stato | Note |
|----|---------|-------|------|
| F-20 | Tema mazzo Classico | ✅ | CSS + deck theme selector |
| F-21 | Tema mazzo Alchemico/Esoterico | ✅ | CSS filter alchemical |
| F-22 | Tema mazzo Fantasy | ✅ | CSS filter fantasy |
| F-23 | Tavoli lettura alternativi | ✅ | classic/velvet/night overlay |
| F-24 | Haptic feedback al flip | ✅ | `@capacitor/haptics` |
| F-25 | Animazioni flip avanzate | ✅ | cubic-bezier + scale |

## P3 — Monetizzazione
| ID | Feature | Stato | Note |
|----|---------|-------|------|
| F-30 | Google AdMob | 🔄 | Banner test ID; sostituire prima di production |

## Completato ✅
| ID | Feature | Note |
|----|---------|------|
| F-DONE-01 | Lettura 4 carte | Home + MemoryCard |
| F-DONE-02 | Arcano del giorno | ArcanaDelGiorno + modal |
| F-DONE-03 | Flip 3D + suono | MemoryCard + audio.ts |
| F-DONE-04 | Parity UI Taro | Rainbow titles, gold border, pulse btn |
| F-DONE-05 | Asset da repo Taro | 39 immagini + flip.mp3 |

## Workflow per feature
1. Aggiornare questo file (stato → in progress)
2. Implementare con test
3. `npm run build` + test
4. Aggiornare `memory-bank/progress.md`
