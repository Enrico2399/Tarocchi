import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Share } from '@capacitor/share';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { settingsOutline, shareOutline } from 'ionicons/icons';
import ArcanaDelGiorno from '../components/ArcanaDelGiorno';
import MemoryCard from '../components/MemoryCard';
import { CardData, POSITIONS, cards } from '../constants/cardsData';
import { pickRandomCards } from '../utils/cardUtils';
import { formatReadingText } from '../utils/shareReading';
import { getAiReadingsEnabled } from '../utils/aiStorage';
import {
  generateReadingDescriptions,
  getJsonDescriptions,
  type DescriptionSource,
} from '../services/localLlm';
import { useRainbowColor } from '../hooks/useRainbowColor';
import './Home.css';

type ReadingState = {
  descriptions: string[];
  sources: DescriptionSource[];
  loading: boolean;
};

const Home: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [reading, setReading] = useState<ReadingState>({
    descriptions: [],
    sources: [],
    loading: false,
  });
  const [generation, setGeneration] = useState(0);
  const titleColor = useRainbowColor(selectedCards.length > 0);

  const generateCards = useCallback(async () => {
    const picked = pickRandomCards(cards, 4);
    const jsonDescriptions = getJsonDescriptions(picked);

    setSelectedCards(picked);
    setGeneration((g) => g + 1);
    setReading({
      descriptions: jsonDescriptions,
      sources: picked.map(() => 'json' as const),
      loading: false,
    });

    if (!getAiReadingsEnabled()) {
      return;
    }

    setReading({
      descriptions: jsonDescriptions,
      sources: picked.map(() => 'json' as const),
      loading: true,
    });

    const aiDescriptions = await generateReadingDescriptions(picked);

    if (aiDescriptions) {
      setReading({
        descriptions: aiDescriptions,
        sources: picked.map(() => 'ai' as const),
        loading: false,
      });
    } else {
      setReading({
        descriptions: jsonDescriptions,
        sources: picked.map(() => 'json' as const),
        loading: false,
      });
    }
  }, []);

  const shareReading = async () => {
    if (selectedCards.length === 0) {
      return;
    }

    const text = formatReadingText(selectedCards, reading.descriptions);

    try {
      await Share.share({
        title: 'La mia lettura Tarocchi',
        text,
        dialogTitle: 'Condividi lettura',
      });
    } catch {
      if (navigator.share) {
        await navigator.share({ title: 'La mia lettura Tarocchi', text });
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="home-content">
        <div
          className="home-bg"
          style={{ backgroundImage: "url('/assets/images/TavoloGioco.jpeg')" }}
        >
          <div className="home-toolbar">
            <Link to="/settings" className="home-icon-btn" aria-label="Impostazioni" data-testid="settings-link">
              <IonIcon icon={settingsOutline} />
            </Link>
            {selectedCards.length > 0 && !reading.loading && (
              <button
                type="button"
                className="home-icon-btn"
                onClick={shareReading}
                aria-label="Condividi lettura"
                data-testid="share-btn"
              >
                <IonIcon icon={shareOutline} />
              </button>
            )}
          </div>

          <ArcanaDelGiorno />

          <div className="home-inner">
            <div className="cards-grid" data-testid="cards-grid">
              {selectedCards.map((card, index) => (
                <MemoryCard
                  key={`${generation}-${index}`}
                  title={POSITIONS[index]}
                  cardName={card.name}
                  description={reading.descriptions[index] ?? ''}
                  image={card.image}
                  titleColor={titleColor}
                  descriptionLoading={reading.loading}
                  descriptionSource={reading.sources[index]}
                />
              ))}
            </div>

            <button
              type="button"
              className="generate-btn"
              onClick={generateCards}
              disabled={reading.loading}
              data-testid="generate-btn"
            >
              <span className="generate-btn__label">
                {reading.loading ? '✨ Interpretazione...' : '🔮 Genera Carte'}
              </span>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
