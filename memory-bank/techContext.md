# Tech Context

## Stack (tarocchi-ionic)
| Layer | Tecnologia | Versione |
|-------|------------|----------|
| UI | Ionic React | ^8.5 |
| Framework | React | 19.0 |
| Build | Vite | ^5 |
| Language | TypeScript | ~5.9 |
| Mobile | Capacitor | 8.3 |
| Router | react-router-dom | ^5.3 |
| Unit test | Vitest | ^0.34 |
| E2E | Cypress | ^13 |

## Capacitor plugins installati
- `@capacitor/app`, `@capacitor/haptics`, `@capacitor/keyboard`, `@capacitor/status-bar`

## Config
- `capacitor.config.ts`: `appId: com.enrico2399.tarocchi`, `appName: Tarocchi`, `webDir: dist`
- Asset statici: `public/assets/images/`, `public/assets/audio/`

## Comandi
```bash
cd tarocchi-ionic
npm run dev           # dev server Vite
npm run build         # tsc + vite build → dist/
npm run test.unit     # vitest
npm run test.e2e      # cypress run
npm run lint          # eslint
npm run verify        # lint + test + build (da Fase 1)
npx cap sync android  # dopo build
npx cap open android  # Android Studio
```

## Mancante (Fase 2)
- Cartella `android/` (Capacitor platform non ancora aggiunta)
- `@capacitor/android` come dipendenza
- Icone/splash Capacitor generate
- targetSdk 35 in Gradle

## Play Store requirements (2025-2026)
- Target API **35** per nuove app/update
- **16 KB page size** (AGP ≥ 8.5.1)
- Release come **AAB** con Play App Signing
- Data safety form + privacy policy URL
