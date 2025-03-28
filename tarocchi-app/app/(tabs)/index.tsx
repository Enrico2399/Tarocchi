import React, { useState } from 'react';
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import CardComponent from '@/components/CardComponent';

const cards = [
  { 
    name: "Il Matto",
    description: "Rappresenta un momento di nuova avventura...",
    description1: "La sfida potrebbe essere quella...",
    description2: "L'azione consigliata potrebbe essere...",
    description3: "L'esito potrebbe portare...",
    image: require('@/assets/images/Folle0.jpeg')
  },
  // Aggiungi tutte le altre carte allo stesso modo
];

export default function HomeScreen() {
  const [selectedCards, setSelectedCards] = useState<any[]>([]);

  const getDescriptionByIndex = (card: any, index: number) => {
    switch(index) {
      case 0: return card.description;
      case 1: return card.description1;
      case 2: return card.description2;
      case 3: return card.description3;
      default: return card.description;
    }
  };

  const generateCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5).slice(0, 4);
    setSelectedCards(shuffled);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.crossLayout}>
        {selectedCards.map((card, index) => (
          <CardComponent
            key={index}
            title={[
              'Situazione Attuale',
              'Sfida da Affrontare',
              'Azione Consigliata',
              'Esito'
            ][index]}
            cardName={card.name}
            description={getDescriptionByIndex(card, index)}
            image={card.image}
          />
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Genera Carte"
          onPress={generateCards}
          color="#007bff"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  crossLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%',
  },
});