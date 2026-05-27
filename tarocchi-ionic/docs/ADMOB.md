# AdMob — Tarocchi

## Stato attuale
Banner AdMob integrato con **ID di test Google** (safe per dev e internal testing).

| Platform | Test App ID | Test Banner ID |
|----------|-------------|----------------|
| Android | `ca-app-pub-3940256099942544~3347511713` | `ca-app-pub-3940256099942544/6300978111` |

Componente: `src/components/AdBanner.tsx` — banner in basso su piattaforma nativa.

## Passaggio a produzione
1. Crea app in [AdMob Console](https://admob.google.com/)
2. Ottieni App ID e Banner Ad Unit ID reali
3. Sostituisci in:
   - `android/app/src/main/AndroidManifest.xml` → `APPLICATION_ID`
   - `src/components/AdBanner.tsx` → `adId`
4. Imposta `initializeForTesting: false` in `AdBanner.tsx`
5. Play Console → **Ads declaration**: sì, contiene annunci
6. Aggiorna **Data safety** form (AdMob raccoglie dati per advertising)

## Note Play Store
- Dichiarare presenza annunci nella scheda store
- Privacy policy deve menzionare AdMob / Google advertising
- Non usare ID di test in production track
