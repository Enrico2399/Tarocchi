# Active Context

## Stato: Fase 4 completata (submit Play Console manuale)

App testata su emulatore **Pixel_6a** (Android 17). Documentazione store pronta.

## Completato Fase 4
- Install + launch su `emulator-5554`
- Privacy in-app (`/privacy`) + HTML `store/privacy-policy.html`
- Testi store IT+EN: `docs/STORE_LISTING.md`
- Data safety: `docs/DATA_SAFETY.md`
- Screenshot: `store/screenshots/` (4 file)
- Guida release: `docs/PLAYSTORE_RELEASE.md`
- Script keystore: `scripts/create-upload-keystore.ps1`

## Azioni manuali rimanenti
1. `.\scripts\create-upload-keystore.ps1` → `npm run android:bundle`
2. Pubblicare `store/privacy-policy.html` su HTTPS
3. Play Console: content rating, upload AAB internal testing
4. AdMob production IDs (`docs/ADMOB.md`)

## Decisioni
| Decisione | Valore |
|-----------|--------|
| appId | `com.enrico2399.tarocchi` |
| Monetizzazione | Google AdMob |
| Store listing | IT + EN |
