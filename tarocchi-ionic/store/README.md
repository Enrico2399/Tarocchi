# Store assets — Tarocchi

Asset pronti per Google Play Console.

## Screenshot phone (`screenshots/`)

| File | Contenuto | Risoluzione |
|------|-----------|-------------|
| `01-home.png` | Home iniziale | 1080×2400 |
| `02-reading.png` | Lettura 4 carte generata | 1080×2400 |
| `03-settings.png` | Schermata Impostazioni | 1080×2400 |
| `04-privacy.png` | Privacy policy in-app | 1080×2400 |

Catturati da emulatore **Pixel_6a** (Android 17).

## Icona 512×512

Esportare da Android Studio: `app → res → mipmap-xxxhdpi → ic_launcher.png`  
Oppure rigenerare con:

```bash
npx capacitor-assets generate --android \
  --iconBackgroundColor "#1a0a2e" \
  --splashBackgroundColor "#1a0a2e"
```

Poi ridimensionare l'icona sorgente a 512×512 per Play Console.

## Feature graphic 1024×500

Creare in Canva/Figma con:
- Sfondo `#1a0a2e`
- Titolo "Tarocchi"
- Sottotitolo "Lettura a 4 carte · Arcano del giorno"
- Asset carte dal mazzo

## Privacy policy

- HTML: `store/privacy-policy.html` — pubblicare su HTTPS
- In-app: route `/privacy`

## Upload Play Console

1. Store listing → carica screenshot (min 2)
2. Graphic assets → feature graphic + icon 512
3. App content → privacy URL + ads + content rating

## AAB release

- File locale: `store/tarocchi-release.aab` (gitignored — rigenerare con `npm run android:bundle`)
- Gradle output: `android/app/build/outputs/bundle/release/app-release.aab`
- Ultimo build: maggio 2026 — fasi 13–16 UI/UX + deal animato
