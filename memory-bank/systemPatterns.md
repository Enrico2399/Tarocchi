# System Patterns

## Struttura tarocchi-ionic/src/
```
src/
├── constants/cardsData.ts   # 22 arcani, POSITIONS, getDescriptionByIndex
├── utils/
│   ├── arcanaUtils.ts       # getArcanaOfTheDay()
│   └── audio.ts             # playFlipSound()
├── hooks/
│   └── useRainbowColor.ts   # animazione titoli retro carte
├── components/
│   ├── MemoryCard.tsx       # flip 3D, CSS co-located
│   └── ArcanaDelGiorno.tsx  # modal + localStorage dot
├── pages/
│   └── Home.tsx             # schermata principale
├── theme/variables.css      # Ionic theme tokens
└── App.tsx                  # router /home
```

## Pattern dati carte
```typescript
type CardData = {
  name: string;
  description: string;    // index 0 — Situazione
  description1: string;   // index 1 — Sfida
  description2: string;   // index 2 — Azione
  description3: string;   // index 3 — Esito
  image: string;          // /assets/images/Nome.jpeg
};
```

## Arcano del giorno
```typescript
dayOfYear = floor((now - startOfYear) / msPerDay)
arcana = cards[dayOfYear % 22]
```

## MemoryCard flip
- Stato iniziale: `flipped = true` → retro visibile (parity Taro)
- Key con `generation` counter in Home per reset stato su nuova generazione
- Suono flip via `HTMLAudioElement` → `/assets/audio/flip.mp3`

## ArcanoDelGiorno
- `localStorage.lastArcanaView` vs `Date.toDateString()` per pallino rosso
- IonModal con backdropDismiss

## Convenzioni
- CSS co-located (`Component.css` accanto a `Component.tsx`)
- Inline style solo per valori dinamici (backgroundImage, titleColor)
- Asset path assoluti da root: `/assets/images/...`
- Non modificare `tarocchi-app/` salvo porting mirato
