import { Audio } from 'expo-av';

export const playFlipSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/audio/flip.mp3') // Assicurati che il percorso sia corretto
    );
    await sound.playAsync();
    // Opzionale: scarica il suono dopo la riproduzione per liberare memoria
    // await sound.unloadAsync();
  } catch (error) {
    console.error('Errore durante la riproduzione del suono:', error);
  }
};