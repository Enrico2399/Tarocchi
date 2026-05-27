# Play Store Checklist — Tarocchi

Riferimenti: [Target API](https://developer.android.com/google/play/requirements/target-sdk) · [16KB pages](https://developer.android.com/guide/practices/page-sizes) · [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469) · [App review](https://support.google.com/googleplay/android-developer/answer/9859455) · [App Signing](https://support.google.com/googleplay/android-developer/answer/9842756)

## Tecnico

- [x] Platform Android aggiunta (`npx cap add android`)
- [x] `appId`: `com.enrico2399.tarocchi`
- [x] `targetSdkVersion` 36, `compileSdk` 36, `minSdk` 24
- [x] AGP 8.13.0 (16 KB page size alignment)
- [x] AAB build (`bundleRelease`)
- [ ] AAB firmato con upload key (eseguire `scripts/create-upload-keystore.ps1`)
- [ ] Play App Signing configurato (Play Console)
- [x] `versionCode` / `versionName` (1 / 1.0)
- [x] Icone adaptive + splash screen
- [x] Test su emulatore Pixel_6a (Android 17)
- [ ] Pre-launch report Play Console
- [x] Permessi manifest documentati

### Permessi v1
| Permesso | Necessario | Motivo |
|----------|------------|--------|
| INTERNET | Sì | WebView + AdMob |
| POST_NOTIFICATIONS | Sì (opt-in) | Notifiche arcano |

## Store listing

- [x] Testi pronti: `docs/STORE_LISTING.md` (IT + EN)
- [x] Screenshot phone (4): `store/screenshots/`
- [ ] Feature graphic 1024×500 (da creare)
- [ ] Icona 512×512 finale (candidato: `store/icon-512-candidate.png`)
- [ ] Categoria + content rating IARC (Play Console)
- [ ] Target audience 13+

## Policy & privacy

- [x] Privacy policy HTML: `store/privacy-policy.html`
- [x] Privacy policy in-app: `/privacy` + link in Impostazioni
- [ ] Privacy policy URL HTTPS pubblico (GitHub Pages o hosting)
- [x] Data safety bozza: `docs/DATA_SAFETY.md`
- [x] Ads declaration: Yes (AdMob test IDs)
- [ ] AdMob production IDs prima di production track

## Pre-lancio

- [ ] Internal testing track upload
- [ ] Release notes (in `docs/STORE_LISTING.md`)
- [ ] Production rollout

## Test emulatore (28/05/2026)

- [x] App installata su Pixel_6a (`emulator-5554`)
- [x] Launch MainActivity OK
- [x] Screenshot catturati

Guida completa: `docs/PLAYSTORE_RELEASE.md`
