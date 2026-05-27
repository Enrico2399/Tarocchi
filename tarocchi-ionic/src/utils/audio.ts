let flipAudio: HTMLAudioElement | null = null;

export const playFlipSound = () => {
  try {
    if (!flipAudio) {
      flipAudio = new Audio('/assets/audio/flip.mp3');
    }
    flipAudio.currentTime = 0;
    void flipAudio.play().catch(() => {
      // Su Android WebView il suono richiede un gesto utente (flip click)
    });
  } catch {
    // audio opzionale
  }
};
