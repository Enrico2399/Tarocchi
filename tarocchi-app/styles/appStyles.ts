import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    position: 'relative',
  },
  button: {
    position: 'absolute',
    top: 15,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  container: {
    paddingTop: 70,
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
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },
  esotericButton: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    // fontFamily: 'Papyrus', // Assicurati che il font sia caricato
    letterSpacing: 1.5,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  popupContent: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    maxHeight: '80%'
  },
  popupSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    // fontFamily: 'Papyrus' // Assicurati che il font sia caricato
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
    // fontFamily: 'Papyrus' // Assicurati che il font sia caricato
  },
  arcanaImage: {
    width: 150,
    height: 250,
    marginVertical: 8,
  },
  descriptionScroll: {
    maxHeight: 150,
    width: '100%',
    marginVertical: 8,
    paddingHorizontal: 5,
    flexGrow: 1,
  },
  arcanaDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
    textAlign: 'justify',
    // fontFamily: 'Papyrus', // Assicurati che il font sia caricato
    paddingHorizontal: 5,
  },
  closeButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#6e3b6e',
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    // fontFamily: 'Papyrus' // Assicurati che il font sia caricato
  },
  notificationDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  buttonImage: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  marginTop: {
    marginTop: 40,
    flex: 1
  }
});