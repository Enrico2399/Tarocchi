import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text // Importa Text per il bottone
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import CircleButtonWithPopup from '../components/CircleButtonWithPopup';
import MemoryCard from '../components/MemoryCard';
import { cards, CardData } from '../constants/cardsData'; // Importa i dati e il tipo
import { styles as appStyles } from '../styles/appStyles'; // Importa gli stili generali

export default function HomeScreen(): JSX.Element {
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);

  // Non generare le carte all'avvio se vuoi che l'utente clicchi il pulsante
  // Se vuoi che siano visibili all'avvio, decommenta l'useEffect seguente:
  /*
  useEffect(() => {
    generateCards();
  }, []);
  */

  const getDescriptionByIndex = (card: CardData, index: number): string => {
    switch (index) {
      case 0:
        return card.description;
      case 1:
        return card.description1;
      case 2:
        return card.description2;
      case 3:
        return card.description3;
      default:
        return card.description;
    }
  };

  const generateCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5).slice(0, 4);
    setSelectedCards(shuffled);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ImageBackground style={appStyles.imageBackground} source={require('@/assets/images/TavoloGioco.jpeg')} resizeMode='cover'>
          <View style={appStyles.marginTop}>
            {/* Posiziona il CircleButtonWithPopup */}
             <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 100 }}>
                <CircleButtonWithPopup />
             </View>

            <ScrollView contentContainerStyle={appStyles.container}>
              <View style={appStyles.crossLayout}>
                {selectedCards.filter(card => card).map((card, index) => (
                  <MemoryCard
                    key={index}
                    title={[
                      'Situazione Attuale',
                      'Sfida da Affrontare',
                      'Azione Consigliata',
                      'Esito',
                    ][index]}
                    cardName={card.name}
                    description={getDescriptionByIndex(card, index)}
                    image={card.image}
                  />
                ))}
              </View>

              <TouchableOpacity
                onPress={generateCards}
                activeOpacity={0.9}
                style={appStyles.buttonContainer}
              >
                <LinearGradient
                  colors={['#8a2be2', '#4b0082']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={appStyles.esotericButton}
                >
                  <Text style={appStyles.buttonText}>🔮 Genera Carte</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}