// app/(tabs)/index.tsx
import React from 'react';
import HomeScreen from '../../screens/HomeScreen'; // Importa il tuo nuovo HomeScreen

export default function TabOneScreen() {
  return (
    // Qui renderizza il tuo HomeScreen
    <HomeScreen />
  );
}

// Potresti avere anche degli stili o altre cose qui,
// ma l'importante è che il componente di default esportato renderizzi HomeScreen.