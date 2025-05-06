import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet, // Mantenuto per ogni evenienza, anche se usi appStyles
  Text,
  Image,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getArcanaOfTheDay } from '../utils/arcanaUtils';
import { styles as appStyles } from '../styles/appStyles'; // Assicurati che il percorso sia corretto

const { width } = Dimensions.get('window');

const CircleButtonWithPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showNotificationDot, setShowNotificationDot] = useState(false);
  // Ottieni l'arcano del giorno all'inizio, è statico per il giorno
  const arcana = getArcanaOfTheDay();

  useEffect(() => {
    const initializeNotifications = async () => {
      // Imposta il gestore notifiche (può essere fatto anche fuori da useEffect se lo inizializzi una sola volta)
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Richiedi i permessi solo su piattaforme native
      if (Platform.OS !== 'web') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Permessi di notifica non garantiti!');
          // Potresti voler mostrare un messaggio all'utente
          return; // Esci se i permessi non sono garantiti
        }

        // Controlla e schedula la notifica solo su piattaforme native
        try {
          // ### QUI ABBIAMO AGGIUNTO IL CONTROLLO DELLA PIATTAFORMA ###
          const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
          const dailyArcanaScheduled = scheduledNotifications.some(
            // Aggiungi un controllo per notif.content prima di accedere a data, per sicurezza
            (notif: any) => notif.content?.data && notif.content.data.type === 'daily-arcana'
          );

          if (!dailyArcanaScheduled) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "📯 Il tuo Arcano del Giorno!",
                body: "Scopri cosa le carte hanno in serbo per te oggi",
                sound: true,
                data: { type: "daily-arcana" },
              },
              trigger: {
                hour: 9,
                minute: 0,
                repeats: true,
                type: Notifications.SchedulableTriggerInputTypes.DAILY,
              } as Notifications.DailyTriggerInput,
            });
            console.log('Notifica giornaliera schedulata con successo.');
          }
        } catch (e) {
           // Gestisci specificamente l'errore di non disponibilità su web se decidi di non usare il Platform.OS !== 'web' fuori
           // if (e.message.includes('is not available on web')) {
           //   console.log('Tentativo di schedulare/ottenere notifiche su web ignorato.');
           // } else {
             console.error('Errore nella gestione o schedulazione delle notifiche:', e);
           // }
        }
      }


      // Gestione del pallino di notifica (indipendente dalla piattaforma)
      const today = new Date().toDateString();
      const lastViewed = await AsyncStorage.getItem('lastArcanaView');
      setShowNotificationDot(lastViewed !== today);
    };

    // Chiama la funzione async
    initializeNotifications();

    // Listener per le notifiche ricevute (funziona su native, su web dipende dal supporto)
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // Controlla se la notifica è quella del daily arcana
      if (response.notification.request.content.data && response.notification.request.content.data.type === 'daily-arcana') {
        setIsPopupVisible(true);
        // Quando il popup si apre da notifica, segna come visualizzato
        AsyncStorage.setItem('lastArcanaView', new Date().toDateString()).then(() => {
             setShowNotificationDot(false);
        });
      }
    });

    // Cleanup del listener
    return () => subscription.remove();

    // Dipendenze vuote, questo useEffect viene eseguito solo al montaggio
  }, []);

  const handleButtonPress = async () => {
    setIsPopupVisible(true);
    // Aggiorna il timestamp SOLO quando si apre il popup manualmente o dalla notifica
    // La logica di aggiornamento dalla notifica è stata spostata nel listener
     await AsyncStorage.setItem('lastArcanaView', new Date().toDateString());
     setShowNotificationDot(false);
  };

  return (
    <>
      {/* Pulsante principale */}
      <TouchableOpacity
        style={appStyles.button}
        onPress={handleButtonPress}
      >
        <Image
          source={require('@/assets/images/button.png')} // Assicurati che il percorso sia corretto
          style={appStyles.buttonImage}
          resizeMode="contain" // Aggiunto resizeMode per buona pratica con le immagini
        />
        {/* Pallino di notifica */}
        {showNotificationDot && <View style={appStyles.notificationDot} />}
      </TouchableOpacity>

      {/* Modal del Popup */}
      <Modal
        visible={isPopupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPopupVisible(false)}
      >
        <View style={appStyles.popupOverlay}>
          <View style={appStyles.popupContent}>
            {/* Titoli e immagine dell'arcano */}
            <Text style={appStyles.popupSubtitle}>Il tuo Arcano del Giorno</Text>
            <Text style={appStyles.popupTitle}>{arcana.name}</Text>
            <Image
              source={arcana.image} // Assicurati che arcana.image sia un require() o un URI
              style={appStyles.arcanaImage}
              resizeMode="contain"
            />
            {/* Descrizione scrollabile */}
            <ScrollView
              style={appStyles.descriptionScroll}
              contentContainerStyle={appStyles.descriptionScrollContent} // Usa uno stile specifico per il contenuto
            >
              <Text style={appStyles.arcanaDescription}>
                {arcana.description1} {/* O arcana.description, a seconda della struttura */}
              </Text>
            </ScrollView>
            {/* Pulsante di chiusura */}
            <TouchableOpacity
              style={appStyles.closeButton}
              onPress={() => setIsPopupVisible(false)}
            >
              <Text style={appStyles.closeButtonText}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Puoi definire gli stili qui se non li importi da un file esterno
// const appStyles = StyleSheet.create({
//   button: { /* ... */ },
//   buttonImage: { /* ... */ },
//   notificationDot: { /* ... */ },
//   popupOverlay: { /* ... */ },
//   popupContent: { /* ... */ },
//   popupSubtitle: { /* ... */ },
//   popupTitle: { /* ... */ },
//   arcanaImage: { /* ... */ },
//   descriptionScroll: { /* ... */ },
//   descriptionScrollContent: { /* ... */ }, // Aggiunto per consistenza
//   arcanaDescription: { /* ... */ },
//   closeButton: { /* ... */ },
//   closeButtonText: { /* ... */ },
// });


export default CircleButtonWithPopup;