import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CardComponent = ({ title, cardName, description, image }: any) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardName}>{cardName}</Text>
    <Image source={image} style={styles.cardImage} />
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '45%',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  cardImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'justify',
  },
});

export default CardComponent;