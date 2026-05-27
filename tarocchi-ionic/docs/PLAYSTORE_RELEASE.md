# Fase 4 — Play Store

Checklist operativa per pubblicazione Tarocchi su Google Play.

## 1. Test su emulatore / device

```bash
npm run android:open          # Android Studio
npm run android:run           # install + run
```

Emulatore rilevato: **Pixel_6a** (`emulator-5554`).

Verificare manualmente:
- [ ] Home + genera carte + flip
- [ ] Arcano del giorno
- [ ] Impostazioni → tema scuro
- [ ] Impostazioni → privacy policy
- [ ] Condividi lettura (dopo generazione)
- [ ] Banner AdMob (test) in basso

## 2. Firma release (upload key)

```powershell
cd tarocchi-ionic
.\scripts\create-upload-keystore.ps1
npm run android:bundle
```

Output AAB: `android/app/build/outputs/bundle/release/app-release.aab`

In Play Console: **Setup → App signing** → Play App Signing + upload key.

## 3. Asset store (cartella `store/`)

| File | Uso Play Console |
|------|------------------|
| `store/icon-512.png` | Icona alta risoluzione |
| `store/feature-graphic.png` | Feature graphic 1024×500 |
| `store/screenshots/*.png` | Screenshot phone (min 2) |
| `store/privacy-policy.html` | Pubblicare su HTTPS |

## 4. Documentazione pronta

| Doc | Contenuto |
|-----|-----------|
| `docs/STORE_LISTING.md` | Titoli, descrizioni IT+EN, release notes |
| `docs/DATA_SAFETY.md` | Risposte form Data safety |
| `docs/PLAYSTORE_CHECKLIST.md` | Checklist completa |
| `docs/ADMOB.md` | Passaggio a ID produzione |

## 5. Play Console — ordine submit

1. Crea app → package `com.enrico2399.tarocchi`
2. **App content**: Privacy policy URL, Ads declaration (Yes), Content rating (IARC)
3. **Data safety**: vedi `docs/DATA_SAFETY.md`
4. **Store listing**: IT + EN da `docs/STORE_LISTING.md`
5. **Release → Internal testing**: upload AAB firmato
6. Pre-launch report → fix crash se presenti
7. Closed testing → Production (staged rollout)

## 6. Prima di production track

- [ ] Sostituire AdMob test IDs (`docs/ADMOB.md`)
- [ ] Privacy policy URL HTTPS live (non solo in-app)
- [ ] Email supporto in privacy policy
- [ ] Keystore backup sicuro (password salvate)

## Privacy policy URL

Opzione A: GitHub Pages — pubblica `store/privacy-policy.html`  
Opzione B: In-app route `/privacy` (già implementata) + URL esterno obbligatorio per Play Console
