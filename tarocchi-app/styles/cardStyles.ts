import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;

export const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    margin: 3,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    backfaceVisibility: 'hidden',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
    textAlign: 'center',
    maxWidth: '100%',
    // fontFamily: 'Papyrus' // Assicurati che il font sia caricato
  },
  scrollWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: '#666',
    textAlign: 'justify',
    width: '100%',
    // fontFamily: 'Papyrus', // Assicurati che il font sia caricato
    fontWeight: 'bold',
  },
  cardBack: {
    width: '100%',
    height: '100%',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
    textAlign: 'center',
    // fontFamily: 'Papyrus' // Assicurati che il font sia caricato
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: 'cover',
  }
});