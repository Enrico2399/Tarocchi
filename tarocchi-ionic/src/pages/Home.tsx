import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Share } from '@capacitor/share';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { settingsOutline, shareOutline } from 'ionicons/icons';
import ArcanaDelGiorno from '../components/ArcanaDelGiorno';
import MemoryCard from '../components/MemoryCard';
import { CardData, cards } from '../constants/cardsData';
import {
  getSpreadById,
  getStoredSpreadId,
  READING_SPREADS,
  setStoredSpreadId,
  type ReadingSpreadId,
} from '../constants/readingSpreads';
import { pickRandomCards } from '../utils/cardUtils';
import { formatReadingText } from '../utils/shareReading';
import {
  getReadingInterpretations,
  type InterpretationSource,
} from '../services/interpretation/interpretationService';
import { useRainbowColor } from '../hooks/useRainbowColor';
import './Home.css';

type ReadingState = {
  descriptions: string[];
  sources: InterpretationSource[];
  loading: boolean;
  error: string | null;
};

const Home: React.FC = () => {
  const [spreadId, setSpreadId] = useState<ReadingSpreadId>(getStoredSpreadId);
  const spread = getSpreadById(spreadId);
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [activePositions, setActivePositions] = useState<string[]>([]);
  const [reading, setReading] = useState<ReadingState>({
    descriptions: [],
    sources: [],
    loading: false,
    error: null,
  });
  const [generation, setGeneration] = useState(0);
  const titleColor = useRainbowColor(selectedCards.length > 0);

  const handleSpreadChange = (id: ReadingSpreadId) => {
    setSpreadId(id);
    setStoredSpreadId(id);
    setSelectedCards([]);
    setActivePositions([]);
    setReading({ descriptions: [], sources: [], loading: false, error: null });
  };

  const generateCards = useCallback(async () => {
    const currentSpread = getSpreadById(spreadId);
    const picked = pickRandomCards(cards, currentSpread.cardCount);
    const positions = [...currentSpread.positions];

    setSelectedCards(picked);
    setActivePositions(positions);
    setGeneration((g) => g + 1);
    setReading({
      descriptions: positions.map(() => ''),
      sources: [],
      loading: true,
      error: null,
    });

    try {
      const results = await getReadingInterpretations(picked, positions);
      setReading({
        descriptions: results.map((r) => r.text),
        sources: results.map((r) => r.source),
        loading: false,
        error: null,
      });
    } catch {
      setReading({
        descriptions: positions.map(() => ''),
        sources: [],
        loading: false,
        error: 'Impossibile generare le interpretazioni. Riprova.',
      });
    }
  }, [spreadId]);

  const shareReading = async () => {
    if (selectedCards.length === 0 || reading.loading) {
      return;
    }

    const text = formatReadingText(selectedCards, reading.descriptions, activePositions);

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

  const hasReading = selectedCards.length > 0;
  const placeholderPositions = [...spread.positions];

  return (
    <IonPage>
      <IonHeader className="home-header">
        <IonToolbar className="home-toolbar-bar">
          <IonButtons slot="start">
            <ArcanaDelGiorno variant="toolbar" />
          </IonButtons>
          <IonTitle className="home-title">Tarocchi</IonTitle>
          <IonButtons slot="end" className="home-toolbar-actions">
            {hasReading && !reading.loading && (
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
            <Link
              to="/settings"
              className="home-icon-btn"
              aria-label="Impostazioni"
              data-testid="settings-link"
            >
              <IonIcon icon={settingsOutline} />
            </Link>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-content">
        <div
          className="home-bg"
          style={{ backgroundImage: "url('/assets/images/TavoloGioco.jpeg')" }}
        >
          <div className="home-inner">
            <section className="spread-picker" aria-label="Tipo di consulto">
              {(Object.keys(READING_SPREADS) as ReadingSpreadId[]).map((id) => {
                const item = READING_SPREADS[id];
                return (
                  <button
                    key={id}
                    type="button"
                    className={`spread-picker__btn ${spreadId === id ? 'spread-picker__btn--active' : ''}`}
                    onClick={() => handleSpreadChange(id)}
                    data-testid={`spread-${id}`}
                  >
                    <span className="spread-picker__name">{item.name}</span>
                    <span className="spread-picker__subtitle">{item.subtitle}</span>
                  </button>
                );
              })}
            </section>

            {!hasReading && (
              <p className="home-empty" data-testid="home-empty">
                Prepara il tuo consulto — l&apos;oracolo ti attende.
              </p>
            )}

            <div
              className={`cards-grid cards-grid--${spreadId}`}
              data-testid="cards-grid"
            >
              {hasReading
                ? selectedCards.map((card, index) => (
                    <MemoryCard
                      key={`${generation}-${index}`}
                      title={activePositions[index] ?? `Carta ${index + 1}`}
                      cardName={card.name}
                      description={reading.descriptions[index] ?? ''}
                      image={card.image}
                      titleColor={titleColor}
                      descriptionLoading={reading.loading}
                      descriptionSource={reading.sources[index]}
                    />
                  ))
                : placeholderPositions.map((position) => (
                    <div key={position} className="cards-grid__placeholder" aria-hidden="true">
                      <div
                        className="cards-grid__placeholder-back"
                        style={{ backgroundImage: "url('/assets/images/backcarta.jpeg')" }}
                      />
                      <span className="cards-grid__placeholder-label">{position}</span>
                    </div>
                  ))}
            </div>

            {reading.error && (
              <p className="home-error" data-testid="reading-error">
                {reading.error}
              </p>
            )}

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
