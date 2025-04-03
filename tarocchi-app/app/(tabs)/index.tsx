import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const playFlipSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('@/assets/flip.mp3')
  );
  await sound.playAsync();
};

const CircleButtonWithPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showNotificationDot, setShowNotificationDot] = useState(false);

  useEffect(() => {
    const setupNotifications = async () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "📯 Il tuo Arcano del Giorno!",
          body: "Scopri cosa le carte hanno in serbo per te oggi",
          sound: true,
          data: { type: "daily-arcana" },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
          hour: 9,
          minute: 0,
          repeats: true
        },
      });

      const today = new Date().toDateString();
      const lastViewed = await AsyncStorage.getItem('lastArcanaView');
      setShowNotificationDot(lastViewed !== today);
    };

    setupNotifications();

    const subscription = Notifications.addNotificationResponseReceivedListener(() => {
      setIsPopupVisible(true);
    });

    return () => subscription.remove();
  }, []);

  const getArcanaOfTheDay = () => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
    const diff = currentDate.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const arcanaIndex = dayOfYear % 22;
    return cards[arcanaIndex];
  };

  const handleButtonPress = async () => {
    setIsPopupVisible(true);
    // Segna come visto oggi
    await AsyncStorage.setItem('lastArcanaView', new Date().toDateString());
    setShowNotificationDot(false);
  };

  const arcana = getArcanaOfTheDay();

  return (
    <>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleButtonPress}
      >
        <Image 
					source={require('@/assets/images/button.png')} 
					style={styles.buttonImage} 
				/>
        {showNotificationDot && <View style={styles.notificationDot} />}
      </TouchableOpacity>

      <Modal
        visible={isPopupVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setIsPopupVisible(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContent}>
            <Text style={styles.popupSubtitle}>Il tuo Arcano del Giorno</Text>
            <Text style={styles.popupTitle}>{arcana.name}</Text>
            
            <Image 
              source={arcana.image} 
              style={styles.arcanaImage}
              resizeMode="contain"
            />
            
            <ScrollView style={styles.descriptionScroll}>
              <Text style={styles.arcanaDescription}>
                {arcana.description}
              </Text>
            </ScrollView>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsPopupVisible(false)}
            >
              <Text style={styles.closeButtonText}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

type CardData = {
  name: string;
  description: string;
  description1: string;
  description2: string;
  description3: string;
  image: any;
};

const cards: CardData[] = [
  {
    "name": "Il Matto",
    "description": "Rappresenta un momento di nuova avventura e inizio. Se appare nella situazione attuale, potresti trovarti in un periodo di grande cambiamento e apertura verso nuove opportunità, anche se potrebbero essere imprevedibili.",
    "description1": "La sfida potrebbe essere quella di affrontare l'incertezza e l'imprevedibilità della vita con coraggio e fiducia, nonostante le paure o le insicurezze.",
    "description2": "L'azione consigliata potrebbe essere quella di abbracciare l'incertezza con coraggio e fiducia, e di essere aperti alle nuove opportunità che si presentano senza esitazione.",
    "description3": "L'esito potrebbe portare a nuove avventure e opportunità. Sei aperto a nuove esperienze e pronti per un nuovo inizio.",
    "image": require('@/assets/images/Folle0.jpeg')
  },
  {
    "name": "Il Mago",
    "description": "Indica che hai le risorse e le capacità necessarie per affrontare la situazione attuale con successo. Sei dotato del potere di manifestare i tuoi obiettivi e influenzare positivamente ciò che ti circonda.",
    "description1": "La sfida potrebbe essere quella di utilizzare le proprie risorse e capacità in modo efficace per superare gli ostacoli attuali e manifestare i propri obiettivi con successo.",
    "description2": "L'azione consigliata potrebbe essere quella di utilizzare le proprie risorse e capacità in modo creativo e focalizzato per manifestare i propri obiettivi con determinazione e fiducia.",
    "description3": "L'esito è positivo in termini di manifestazione e realizzazione dei tuoi obiettivi. Hai utilizzato con successo le tue risorse e le tue capacità per ottenere ciò che desideri.",
    "image": require('@/assets/images/Mago1.jpeg')
  },
  {
    "name": "La Papessa",
    "description": "Suggerisce un periodo di intuizione profonda e riflessione interiore. Potresti essere guidato dalla tua saggezza interiore mentre affronti le sfide presenti.",
    "description1": "La sfida potrebbe essere quella di ascoltare la propria intuizione e accedere alla propria saggezza interiore per trovare soluzioni creative ai problemi presenti.",
    "description2": "L'azione consigliata potrebbe essere quella di ascoltare la voce della tua intuizione e di accedere alla tua saggezza interiore per trovare soluzioni creative e non convenzionali ai problemi presenti.",
    "description3": "L'esito potrebbe portare a una maggiore consapevolezza e intuizione. Hai trovato risposte alle tue domande interiori e sei in armonia con te stesso.",
    "image": require('@/assets/images/Papessa2.jpeg')
  },
  {
    "name": "L'Imperatrice",
    "description": "Rappresenta un momento di fertilità, creatività e abbondanza. La gentilezza, l'amore e la cura possono influenzare positivamente la tua situazione attuale.",
    "description1": "La sfida potrebbe essere quella di abbracciare la propria femminilità e la capacità di nutrire se stessi e gli altri durante i momenti difficili.",
    "description2": "L'azione consigliata potrebbe essere quella di coltivare la gentilezza, l'amore e la cura verso te stesso e gli altri, e di abbracciare la creatività come strumento per superare le sfide.",
    "description3": "L'esito è di abbondanza e fertilità. Hai raggiunto una posizione di comfort e soddisfazione, e sei in grado di nutrire te stesso e gli altri.",
    "image": require('@/assets/images/Imperatrice3.jpeg')
  },
  {
    "name": "L'Imperatore",
    "description": "Indica un periodo in cui devi assumere un approccio razionale e strategico per gestire le tue responsabilità. Potresti essere chiamato a esercitare il tuo potere e la tua autorità per raggiungere i tuoi obiettivi.",
    "description1": "La sfida potrebbe essere quella di esercitare l'autodisciplina e il controllo per gestire efficacemente la situazione attuale e prendere decisioni responsabili.",
    "description2": "L'azione consigliata potrebbe essere quella di esercitare il tuo potere personale in modo responsabile e di agire con determinazione e fermezza per raggiungere i tuoi obiettivi.",
    "description3": "L'esito è di leadership e controllo. Hai preso il comando della situazione e hai raggiunto il successo attraverso la tua autorità e determinazione.",
    "image": require('@/assets/images/Imperatore4.jpeg')
  },
  {
    "name": "Il Papa",
    "description": "Suggerisce che potresti essere influenzato dalle tradizioni, dalla guida spirituale o dagli insegnamenti morali mentre affronti la situazione attuale. Cerchi consigli da fonti esterne o fai affidamento su principi etici per prendere decisioni.",
    "description1": "La sfida potrebbe essere quella di trovare un equilibrio tra le proprie credenze personali e le esigenze della situazione attuale, cercando saggezza e guida da fonti esterne.",
    "description2": "L'azione consigliata potrebbe essere quella di cercare consiglio e guida da fonti autorevoli e di seguire i principi etici e morali che guidano le tue decisioni.",
    "description3": "L'esito potrebbe portare a una maggiore saggezza e guida. Hai ricevuto consigli preziosi e sei in grado di prendere decisioni con sicurezza e discernimento.",
    "image": require('@/assets/images/Papa5.jpeg')
  },
  {
    "name": "Gli Amanti",
    "description": "Indica un momento di scelta e connessione emotiva. Potresti essere influenzato dai legami affettivi o dalle decisioni riguardanti le relazioni mentre affronti la situazione attuale.",
    "description1": "La sfida potrebbe essere quella di fare una scelta importante o di risolvere un conflitto emotivo che richiede coraggio e chiarezza di intenti.",
    "description2": "L'azione consigliata potrebbe essere quella di seguire il tuo cuore e di fare una scelta che risuoni con il tuo vero sé, anche se potrebbe essere difficile o controcorrente.",
    "description3": "L'esito è di scelta e connessione emotiva. Hai fatto una decisione importante o hai stabilito un legame significativo con qualcuno o qualcosa.",
    "image": require('@/assets/images/Amanti6.jpeg')
  },
  {
    "name": "Il Carro",
    "description": "Suggerisce che stai affrontando la situazione attuale con determinazione e direzione. Sei determinato a raggiungere i tuoi obiettivi e superare gli ostacoli lungo il cammino.",
    "description1": "La sfida potrebbe essere quella di superare gli ostacoli e le sfide con determinazione e volontà, mantenendo il controllo delle proprie azioni e del proprio destino.",
    "description2": "L'azione consigliata potrebbe essere quella di essere determinati e focalizzati nel perseguire i tuoi obiettivi, superando gli ostacoli con coraggio e determinazione.",
    "description3": "L'esito è di vittoria e successo. Hai superato gli ostacoli e hai raggiunto i tuoi obiettivi con determinazione e coraggio.",
    "image": require('@/assets/images/Carro7.jpeg')
  },
  {
    "name": "La Giustizia",
    "description": "Indica l'importanza di fare scelte basate sulla verità e sull'equilibrio. Potresti essere chiamato a prendere decisioni etiche o a fare i conti con le conseguenze delle tue azioni.",
    "description1": "La sfida potrebbe essere quella di agire con equità e integrità, prendendo decisioni basate sulla verità e sul rispetto delle leggi o dei principi morali.",
    "description2": "L'azione consigliata potrebbe essere quella di agire con equità, integrità e responsabilità, prendendo decisioni basate sulla verità e sul rispetto delle leggi o dei principi morali.",
    "description3": "L'esito è di equilibrio e giustizia. Hai agito con integrità e rispetto per gli altri, e hai ottenuto ciò che meriti.",
    "image": require('@/assets/images/Giustizia8.jpeg')
  },
  {
    "name": "L'Eremita",
    "description": "Suggerisce un periodo di solitudine e ricerca interiore. Potresti dover fare una pausa dal mondo esterno per trovare risposte o percorri la tua strada personale.",
    "description1": "La sfida potrebbe essere quella di affrontare la solitudine e l'isolamento interiore per trovare risposte e chiarezza nelle proprie riflessioni e meditazioni.",
    "description2": "L'azione consigliata potrebbe essere quella di ritirarti in solitudine per riflettere e meditare sulle tue azioni e le tue scelte, cercando la saggezza interiore e la guida spirituale.",
    "description3": "L'esito potrebbe portare a una maggiore saggezza e consapevolezza. Hai trovato risposte dentro di te e sei pronto per un nuovo inizio basato sulla tua comprensione interiore.",
    "image": require('@/assets/images/Eremita9.jpeg')
  },
  {
    "name": "La Ruota",
    "description": "Rappresenta i cicli della vita, il destino e il cambiamento. Se appare nella situazione attuale, potresti essere di fronte a un momento di fluttuazione e opportunità che richiede adattabilità e flessibilità.",
    "description1": "La sfida potrebbe essere quella di accettare i cicli della vita e di adattarsi ai cambiamenti imprevisti, cercando opportunità anche nelle sfide apparenti.",
    "description2": "L'azione consigliata potrebbe essere quella di accettare i cicli della vita e di adattarsi ai cambiamenti imprevisti, mantenendo una prospettiva positiva e cercando opportunità nelle sfide.",
    "description3": "L'esito è di cambiamento e fortuna. Le cose stanno migliorando e sei aperto a nuove possibilità e opportunità.",
    "image": require('@/assets/images/RuotaDellaFortuna10.jpeg')
  },
  {
    "name": "La Forza",
    "description": "Indica che stai affrontando la situazione attuale con coraggio e compassione. Sei in grado di gestire le sfide con forza interiore e gentilezza, trovando un equilibrio tra determinazione e empatia.",
    "description1": "La sfida potrebbe essere quella di affrontare le proprie paure e debolezze con coraggio e gentilezza, trovando la forza interiore per superarle.",
    "description2": "L'azione consigliata potrebbe essere quella di affrontare le tue paure e le tue debolezze con gentilezza e compassione, e di trovare la forza interiore per superarle.",
    "description3": "L'esito è di coraggio e resistenza. Hai affrontato le tue paure e le tue debolezze con determinazione e gentilezza.",
    "image": require('@/assets/images/Forza11.jpeg')
  },
  {
    "name": "L'Appeso",
    "description": "Suggerisce un momento di sospensione e aspettativa nella situazione attuale. Potresti trovarti in una fase di transizione o di sacrificio, dove è necessario accettare la situazione attuale e lasciare andare il controllo.",
    "description1": "La sfida potrebbe essere quella di accettare il sacrificio o la rinuncia necessaria per ottenere una prospettiva più ampia o una maggiore comprensione della situazione.",
    "description2": "L'azione consigliata potrebbe essere quella di accettare il sacrificio o la rinuncia necessaria per guadagnare una nuova prospettiva e una maggiore comprensione della situazione.",
    "description3": "L'esito potrebbe portare a una maggiore consapevolezza e accettazione. Hai accettato il sacrificio necessario per ottenere una nuova prospettiva e crescita personale.",
    "image": require('@/assets/images/Appeso12.jpg')
  },
  {
    "name": "La Morte",
    "description": "Rappresenta la trasformazione e il cambiamento inevitabile. Se appare nella situazione attuale, potresti essere di fronte a un'importante fine o a un nuovo inizio che richiede adattamento e accettazione.",
    "description1": "La sfida potrebbe essere quella di abbracciare la trasformazione e il cambiamento come parte naturale del ciclo della vita, lasciando andare ciò che non serve più per fare spazio a nuove opportunità.",
    "description2": "L'azione consigliata potrebbe essere quella di abbracciare la trasformazione e il cambiamento come parte naturale del ciclo della vita, lasciando andare ciò che non serve più per fare spazio a nuove opportunità.",
    "description3": "L'esito è di trasformazione e rinascita. Hai lasciato andare ciò che non serve più e sei pronto per un nuovo inizio.",
    "image": require('@/assets/images/Morte13.jpeg')
  },
  {
    "name": "La Temperanza",
    "description": "Indica l'importanza di trovare l'equilibrio e l'armonia nella situazione attuale. Potresti essere chiamato a integrare diverse forze o a trovare un compromesso per risolvere le sfide presenti.",
    "description1": "La sfida potrebbe essere quella di trovare l'equilibrio e l'armonia tra le diverse parti della propria vita, cercando di integrare le proprie energie in modo armonioso.",
    "description2": "L'azione consigliata potrebbe essere quella di trovare l'equilibrio e l'armonia tra le diverse parti della tua vita, cercando di integrare le tue energie in modo armonioso e bilanciato.",
    "description3": "L'esito è di equilibrio e armonia. Hai integrato le diverse parti della tua vita e sei in pace con te stesso e il mondo che ti circonda.",
    "image": require('@/assets/images/Temperanza14.jpg')
  },
  {
    "name": "Il Diavolo",
    "description": "Suggerisce che potresti essere influenzato da influenze negative o da pattern dannosi nella situazione attuale. La sfida è superare le tue paure o dipendenze e trovare la libertà interiore.",
    "description1": "La sfida potrebbe essere quella di liberarsi da legami tossici o da comportamenti dannosi che ostacolano il proprio progresso e la propria felicità.",
    "description2": "L'azione consigliata potrebbe essere quella di rompere le catene delle dipendenze o dei comportamenti dannosi, e di liberarti dalle influenze negative che ostacolano il tuo progresso.",
    "description3": "L'esito potrebbe portare a liberazione e consapevolezza. Hai superato le tue dipendenze e le tue illusioni e sei libero di perseguire il tuo vero scopo.",
    "image": require('@/assets/images/Diavolo15.jpeg')
  },
  {
    "name": "La Torre",
    "description": "Rappresenta la distruzione e la rivelazione improvvisa. Se appare nella situazione attuale, potresti essere di fronte a un cambiamento drastico o a una crisi che richiede adattabilità e resilienza.",
    "description1": "La sfida potrebbe essere quella di affrontare una crisi improvvisa o un cambiamento drastico che richiede di riconsiderare le proprie priorità e adattarsi a nuove circostanze.",
    "description2": "L'azione consigliata potrebbe essere quella di accettare il cambiamento e la trasformazione con resilienza e apertura, e di trovare opportunità anche nelle situazioni più difficili.",
    "description3": "L'esito potrebbe portare a un cambiamento improvviso ma necessario. Hai affrontato una crisi e ora sei pronto per ricostruire su basi più solide.",
    "image": require('@/assets/images/Torre16.jpeg')
  },
  {
    "name": "La Stella",
    "description": "Indica speranza, ispirazione e rinascita. Se appare nella situazione attuale, potrebbe portare un senso di ottimismo e fiducia nel futuro, anche dopo periodi difficili.",
    "description1": "La sfida potrebbe essere quella di mantenere la speranza e la fiducia nel futuro nonostante le difficoltà attuali, cercando l'ispirazione e la guarigione nelle situazioni più oscure.",
    "description2": "L'azione consigliata potrebbe essere quella di mantenere la speranza e la fiducia nel futuro nonostante le difficoltà, cercando l'ispirazione e la guarigione nelle situazioni più oscure.",
    "description3": "L'esito è di speranza e ispirazione. Hai superato le tue difficoltà e ora sei pronto per un nuovo inizio pieno di speranza e luce.",
    "image": require('@/assets/images/Stelle17.jpeg')
  },
  {
    "name": "La Luna",
    "description": "Suggerisce che potresti essere influenzato dall'illusione o dall'incertezza nella situazione attuale. È importante fidarsi della tua intuizione e navigare attraverso le emozioni per trovare la verità.",
    "description1": "La sfida potrebbe essere quella di navigare attraverso l'incertezza e l'illusione, fidandosi della propria intuizione e cercando la verità nelle situazioni più sfuggenti.",
    "description2": "L'azione consigliata potrebbe essere quella di navigare attraverso l'incertezza e l'illusione con fiducia nella tua intuizione, cercando la verità nelle situazioni più complesse.",
    "description3": "L'esito potrebbe portare a una maggiore intuizione e comprensione. Hai navigato attraverso l'incertezza e le illusioni e ora sei in grado di vedere la verità con chiarezza.",
    "image": require('@/assets/images/Luna18.jpeg')
  },
  {
    "name": "Il Sole",
    "description": "Rappresenta la felicità, la gioia e la chiarezza. Se appare nella situazione attuale, indica un momento di realizzazione e di benessere, in cui le cose si stanno illuminando positivamente.",
    "description1": "La sfida potrebbe essere quella di abbracciare la gioia e la felicità nonostante le sfide attuali, cercando la luce e la chiarezza anche nei momenti più bui.",
    "description2": "L'azione consigliata potrebbe essere quella di abbracciare la gioia e la felicità, cercando la luce e la chiarezza anche nei momenti più bui, e di celebrare i tuoi successi.",
    "description3": "L'esito è di gioia e felicità. Hai superato le tue sfide e ora sei pronto per goderti il successo e la realizzazione.",
    "image": require('@/assets/images/Sole19.jpeg')
  },
  {
    "name": "Il Giudizio",
    "description": "Indica un risveglio spirituale e una valutazione delle tue azioni. Se appare nella situazione attuale, potresti essere chiamato a fare i conti con le tue scelte passate e a prepararti per un nuovo inizio.",
    "description1": "La sfida potrebbe essere quella di fare i conti con le proprie azioni passate e di accettare la responsabilità per il proprio destino, cercando la redenzione e la rinascita attraverso il perdono e la consapevolezza.",
    "description2": "L'azione consigliata potrebbe essere quella di fare i conti con le tue azioni passate e di accettare la responsabilità per il tuo destino, cercando la redenzione e la rinascita attraverso il perdono e la consapevolezza.",
    "description3": "L'esito è di risveglio e rinnovamento. Hai fatto i conti con il tuo passato e ora sei pronto per un nuovo inizio pieno di consapevolezza e redenzione.",
    "image": require('@/assets/images/Giudizio20.jpeg')
  },
  {
    "name": "Il Mondo",
    "description": "Rappresenta il completamento di un ciclo e il successo. Se appare nella situazione attuale, suggerisce che stai per raggiungere i tuoi obiettivi e realizzare il tuo pieno potenziale.",
    "description1": "La sfida potrebbe essere quella di raggiungere il completamento e il successo attraverso la realizzazione dei propri obiettivi e il raggiungimento dell'armonia universale.",
    "description2": "L'azione consigliata è quella di celebrare il tuo successo, guardare al futuro con ottimismo e fiducia, e rimanere connesso con te stesso e con il mondo che ti circonda mentre continui il tuo viaggio verso la realizzazione personale.",
    "description3": "L'esito è di completamento e realizzazione. Hai raggiunto i tuoi obiettivi e ora sei in armonia con te stesso e il mondo che ti circonda.",
    "image": require('@/assets/images/Mondo21.jpeg')
  }
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;


export default function HomeScreen(): JSX.Element {
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);

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

  const MemoryCard: React.FC<{
    title: string;
    cardName: string;
    description: string;
    image: any;
  }> = ({ title, cardName, description, image }) => {
    const rotation = useSharedValue(180);

    const frontStyle = useAnimatedStyle(() => ({
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotation.value}deg` },
      ],
      opacity: interpolate(rotation.value, [0, 90], [1, 0]),
    }));

    const backStyle = useAnimatedStyle(() => ({
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotation.value - 180}deg` },
      ],
      opacity: interpolate(rotation.value, [90, 180], [0, 1]),
    }));

    const flipCard = () => {
      playFlipSound();
      rotation.value = withTiming(rotation.value === 0 ? 180 : 0, { duration: 500 });
    };

    return (
      <TouchableWithoutFeedback onPress={flipCard}>
        <Animated.View style={cardStyles.cardContainer}>
          {/* Fronte della card */}
          <Animated.View style={[cardStyles.card, frontStyle]}>
            <Text style={cardStyles.cardName}>{cardName}</Text>
            <Image source={image} style={cardStyles.cardImage} />
            <View style={cardStyles.scrollWrapper}>
              <ScrollView>
                <Text style={cardStyles.cardDescription}>{description}</Text>
              </ScrollView>
            </View>
          </Animated.View>
    
          {/* Retro della card */}
          <Animated.View style={[cardStyles.card, cardStyles.cardBack, backStyle]}>
            <Text style={[cardStyles.cardTitle, { color: 'white' }]}>{title}</Text>
            <View style={cardStyles.scrollWrapper}>
              <ScrollView>
                <Text style={[cardStyles.cardDescription, { color: 'white' }]}>
                  Informazioni extra
                </Text>
              </ScrollView>
            </View>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Pulsante sovrapposto */}
      <CircleButtonWithPopup />
      
      {/* Contenuto principale */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.crossLayout}>
          {selectedCards.map((card, index) => (
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
        <View style={styles.buttonContainer}>
          <Button title="Genera Carte" onPress={generateCards} color="#007bff" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2,
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingRight: 10,
  },
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
  popupContent: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    maxHeight: '80%',
  },
  popupSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  arcanaImage: {
    width: 150,
    height: 250,
    marginVertical: 10,
  },
  descriptionScroll: {
    maxHeight: 120,
    width: '100%',
    marginVertical: 10,
  },
  arcanaDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#6e3b6e',
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
});

const cardStyles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    margin: 5,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
    maxWidth: '100%',
  },
  scrollWrapper: {
    flex: 1, // Occupa lo spazio rimanente
    width: '100%',
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'justify',
    width: '100%',
  },

  cardBack: {
    backgroundColor: 'tomato',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
    textAlign: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: 'cover',
  }
});