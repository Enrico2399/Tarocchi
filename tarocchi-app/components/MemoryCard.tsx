import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { playFlipSound } from '../utils/audio'; // Importa la funzione audio

// Importa gli stili specifici per le card
import { styles as cardStyles } from '../styles/cardStyles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;

type MemoryCardProps = {
  title: string;
  cardName: string;
  description: string;
  image: any;
};

const MemoryCard: React.FC<MemoryCardProps> = ({ title, cardName, description, image }) => {
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
          <ImageBackground
            source={require('@/assets/images/backcarta.jpeg')} // Assicurati che il percorso sia corretto
            style={cardStyles.cardBack}
            resizeMode="cover"
          >
            <Text style={[cardStyles.cardTitle, { color: 'white' }]}>{title}</Text>
            <View style={cardStyles.scrollWrapper}>
            </View>
          </ImageBackground>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default MemoryCard;