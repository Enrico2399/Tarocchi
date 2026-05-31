# Upload Play Console — passo finale

## AAB firmato (pronto — aggiornato New Functions)
```
tarocchi-ionic/store/tarocchi-release.aab
```
Copia Gradle:
```
tarocchi-ionic/android/app/build/outputs/bundle/release/app-release.aab
```
Rigenerare: `npm run android:bundle` (richiede `android/keystore.properties` + upload keystore).

## Credenziali firma
Password upload key: **`tarocchi-ionic/android/SIGNING.local.txt`** (solo locale, gitignored).
**Backup obbligatorio** — senza keystore non puoi aggiornare l'app.

## Play Console (15 min)

1. [play.google.com/console](https://play.google.com/console) → **Create app**
2. Nome: **Tarocchi** · Default language: **Italian**
3. **Release → Testing → Internal testing → Create release**
4. Upload `tarocchi-release.aab`
5. **App content:**
   - Privacy policy: `https://enrico2399.github.io/Tarocchi/privacy-policy.html`
   - Ads: **Yes** · AdMob
   - Content rating: questionnaire IARC (13+, no violence)
   - Data safety: vedi `docs/DATA_SAFETY.md`
6. **Store listing:** testi da `docs/STORE_LISTING.md`
7. Screenshot: `store/screenshots/` (min 2)
8. **Publish internal testing** → aggiungi tester (email)

## GitHub Pages (privacy URL)

Push `docs/` su GitHub, poi:
**Settings → Pages → Branch main → /docs**

Verifica: https://enrico2399.github.io/Tarocchi/privacy-policy.html
