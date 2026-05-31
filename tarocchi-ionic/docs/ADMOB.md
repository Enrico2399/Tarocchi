# AdMob — Tarocchi

## Stato attuale
Banner AdMob integrato con **ID configurabili via env** e fallback test Google.

| Platform | Test App ID | Test Banner ID |
|----------|-------------|----------------|
| Android | `ca-app-pub-3940256099942544~3347511713` | `ca-app-pub-3940256099942544/6300978111` |

Componente: `src/components/AdBanner.tsx` — banner in basso su piattaforma nativa, margin 8px, padding content via `.has-ad-banner`.

## Variabili env (`.env.production`)

```env
VITE_ADMOB_BANNER_ID=ca-app-pub-XXXX/YYYY
VITE_ADMOB_TESTING=false
```

Se `VITE_ADMOB_BANNER_ID` non è impostato, usa ID test Google.

## Impostazioni utente
Toggle **Banner pubblicitari** in `/settings` (solo nativo) — disattiva annunci per la sessione.

## Passaggio a produzione
1. Crea app in [AdMob Console](https://admob.google.com/)
2. Ottieni App ID e Banner Ad Unit ID reali
3. Sostituisci in:
   - `android/app/src/main/AndroidManifest.xml` → `APPLICATION_ID`
   - `.env.production` → `VITE_ADMOB_BANNER_ID`
4. Imposta `VITE_ADMOB_TESTING=false`
5. Play Console → **Ads declaration**: sì, contiene annunci
6. Aggiorna **Data safety** form (AdMob raccoglie dati per advertising)

## Note Play Store
- Dichiarare presenza annunci nella scheda store
- Privacy policy deve menzionare AdMob / Google advertising
- Non usare ID di test in production track
