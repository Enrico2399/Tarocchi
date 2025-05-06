import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Image,
  Platform,
  Dimensions,
  ScrollView // Importa ScrollView
} from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getArcanaOfTheDay } from '../utils/arcanaUtils'; // Importa la funzione
import { styles as appStyles } from '../styles/appStyles'; // Importa gli stili specifici per questo componente

const { width } = Dimensions.get('window');

const CircleButtonWithPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showNotificationDot, setShowNotificationDot] = useState(false);
  const arcana = getArcanaOfTheDay(); // Ottieni l'arcano del giorno

  useEffect(() => {
    const setupNotifications = async () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false
        })
      });
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permessi di notifica non garantiti!');
        return;
      }

      // Controlla se la notifica è già schedulata per evitare duplicati
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      const dailyArcanaScheduled = scheduledNotifications.some(
        (notif: any) => notif.content.data && notif.content.data.type === 'daily-arcana'
      );

      if (Platform.OS !== 'web' && !dailyArcanaScheduled) {
        try {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "📯 Il tuo Arcano del Giorno!",
              body: "Scopri cosa le carte hanno in serbo per te oggi",
              sound: true,
              data: { type: "daily-arcana" }
            },
            trigger: {
              hour: 9,
              minute: 0,
              repeats: true,
              type: Notifications.SchedulableTriggerInputTypes.DAILY, // Usa DAILY per ripetizioni giornaliere precise
            } as Notifications.DailyTriggerInput, // Cast per garantire il tipo corretto
          });
          console.log('Notifica giornaliera schedulata con successo.');
        } catch (e) {
          console.error('Errore nella schedulazione della notifica:', e);
        }
      }


      const today = new Date().toDateString();
      const lastViewed = await AsyncStorage.getItem('lastArcanaView');
      setShowNotificationDot(lastViewed !== today);
    };

    setupNotifications();

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
       // Controlla se la notifica è quella del daily arcana
       if (response.notification.request.content.data && response.notification.request.content.data.type === 'daily-arcana') {
           setIsPopupVisible(true);
       }
    });

    return () => subscription.remove();
  }, []);

  const handleButtonPress = async () => {
    setIsPopupVisible(true);
    // Aggiorna il timestamp solo se il popup viene aperto manualmente o dalla notifica
    await AsyncStorage.setItem('lastArcanaView', new Date().toDateString());
    setShowNotificationDot(false);
  };

  return (
    <>
      <TouchableOpacity
        style={appStyles.button} // Usa gli stili importati
        onPress={handleButtonPress}
      >
        <Image
          source={require('@/assets/images/button.png')}
          style={appStyles.buttonImage} // Usa gli stili importati
        />
        {showNotificationDot && <View style={appStyles.notificationDot} />} {/* Usa gli stili importati */}
      </TouchableOpacity>

      <Modal
        visible={isPopupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPopupVisible(false)}
      >
        <View style={appStyles.popupOverlay}> {/* Usa gli stili importati */}
          <View style={appStyles.popupContent}> {/* Usa gli stili importati */}
            <Text style={appStyles.popupSubtitle}>Il tuo Arcano del Giorno</Text> {/* Usa gli stili importati */}
            <Text style={appStyles.popupTitle}>{arcana.name}</Text> {/* Usa gli stili importati */}
            <Image
              source={arcana.image}
              style={appStyles.arcanaImage} // Usa gli stili importati
              resizeMode="contain"
            />
            <ScrollView
              style={appStyles.descriptionScroll} // Usa gli stili importati
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <Text style={appStyles.arcanaDescription}> {/* Usa gli stili importati */}
                {arcana.description1}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={appStyles.closeButton} // Usa gli stili importati
              onPress={() => setIsPopupVisible(false)}
            >
              <Text style={appStyles.closeButtonText}>Chiudi</Text> {/* Usa gli stili importati */}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CircleButtonWithPopup;