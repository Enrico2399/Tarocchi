# Progress

## Funziona ✅
- Clone repo Tarocchi + asset da repo Taro
- Home Ionic con lettura 4 carte
- Flip 3D carte (retro first, parity Taro)
- Animazione colori titoli retro (`useRainbowColor`)
- Bordo dorato retro carta
- Pulsante arcano con alone pulsante + pallino notifica
- Modal arcano del giorno (localStorage)
- Suono flip (`flip.mp3`)
- Build production (`npm run build`) OK
- Capacitor Android platform + build debug/release OK
- Icone/splash Android generate

## Parity Taro migrata ✅
- [x] Carte partono dal retro
- [x] Titoli animati azzurro/giallo
- [x] Bordo gold inset
- [x] Pulse button arcano
- [x] Generate button gradient pill
- [x] Modal arcano + notification dot
- [x] 22 arcani + 4 posizioni
- [x] Shuffle 4 carte casuali

## Da fare ⏳

### Fase 1 — Stabilizzazione
- [x] Audit.md con gap analysis
- [x] Test unit utils/components/hooks
- [x] Test E2E Cypress flusso lettura
- [x] Script npm run verify
- [x] Fix dark mode (disabilitato dark.system)
- [ ] E2E run automatizzato in CI

### Fase 2 — Android
- [x] `npx cap add android`
- [x] targetSdk 36, AGP 8.13, minSdk 24
- [x] Icone e splash screen (@capacitor/assets)
- [x] assembleDebug + bundleRelease OK
- [x] Script android:sync, android:open, android:run, android:bundle
- [x] Template firma release (`keystore.properties.example` + Gradle)
- [x] Test su emulatore Pixel_6a (Android 17)
- [ ] AAB firmato upload key per Play Console

### Fase 3 — Features
- [x] Tema chiaro/scuro (P0)
- [x] Schermata impostazioni
- [x] Notifiche oracolo giornaliero
- [x] Condivisione lettura
- [x] Haptic feedback al flip
- [x] AdMob banner (test IDs — da sostituire pre-production)
- [ ] Temi mazzo/tavolo (P2)

### Fase 4 — Play Store
- [x] Test emulatore Pixel_6a
- [x] Privacy policy (in-app + HTML)
- [x] Store listing IT+EN (docs)
- [x] Data safety bozza
- [x] Screenshot (4)
- [ ] Upload keystore + AAB firmato
- [ ] Privacy URL HTTPS live
- [ ] Play Console submit

## Known issues
- AAB release usa debug signing — serve upload key per Play Store
- Dark mode disabilitato fino a P0 tema
- Audio flip: gestito catch su WebView mobile
