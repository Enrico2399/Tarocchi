# Android — Setup & Build

## Prerequisiti
- Java 17+ (testato con Java 21)
- Android SDK in `%LOCALAPPDATA%\Android\Sdk`
- Android Studio (consigliato per emulatore e firma AAB)

## Config locale (non committare)
File `android/local.properties`:
```properties
sdk.dir=C\:\\Users\\<USER>\\AppData\\Local\\Android\\Sdk
```

## Comandi npm
```bash
npm run android:sync    # build web + cap sync
npm run android:open    # apre Android Studio
npm run android:run     # sync + run su device/emulatore
npm run android:bundle  # sync + bundleRelease (AAB)
```

## SDK Play Store (Capacitor 8 default)
| Setting | Valore |
|---------|--------|
| minSdk | 24 |
| targetSdk | 36 |
| compileSdk | 36 |
| AGP | 8.13.0 |
| Gradle | 8.14.3 |

Supera i requisiti Play Store API 35 e 16 KB page size.

## Package
- `applicationId`: `com.enrico2399.tarocchi`
- `versionCode`: 1
- `versionName`: "1.0"

## Icone & Splash
Generati con `@capacitor/assets` da `resources/icon.png` e `resources/splash.png`.
Rigenerare:
```bash
npx capacitor-assets generate --android \
  --iconBackgroundColor "#1a0a2e" \
  --splashBackgroundColor "#1a0a2e"
```

## Release AAB (Play Store)

### 1. Crea upload keystore (una tantum)
```bash
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```
Conserva `upload-keystore.jks` **fuori repo** o in path gitignored.

### 2. Configura firma locale
```bash
cp android/keystore.properties.example android/keystore.properties
# Modifica storeFile, password e alias
```
`keystore.properties` è gitignored — non committare.

### 3. Build AAB firmato
```bash
npm run android:bundle
```
Output: `android/app/build/outputs/bundle/release/app-release.aab`

### 4. Play Console
1. Play App Signing → usa upload key
2. Carica AAB su internal testing track
3. Verifica pre-launch report

> Senza `keystore.properties`, `bundleRelease` usa debug signing (OK per test locale, non per Play Store).

## Permessi manifest (v1)
- `INTERNET` — WebView Capacitor

## Note AdMob (Fase 3)
Richiederà `google-services.json` e dipendenza AdMob SDK.
