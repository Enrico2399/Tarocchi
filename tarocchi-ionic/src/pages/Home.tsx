import { useCallback, useEffect, useRef, useState } from 'react';
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
import SpreadSelector from '../components/SpreadSelector';
import { CardData, cards } from '../constants/cardsData';
import {
  getCardDisplayName,
  getSpreadById,
  getStoredSpreadId,
  setStoredSpreadId,
  type ReadingSpreadId,
} from '../constants/readingSpreads';
import {
  getDeckTheme,
  getStoredDeckThemeId,
  getStoredTableThemeId,
  getTableTheme,
} from '../constants/visualThemes';
import { useTranslation } from '../i18n/useTranslation';
import { pickRandomCards } from '../utils/cardUtils';
import { formatReadingText } from '../utils/shareReading';
import {
  getReadingInterpretations,
  type InterpretationSource,
} from '../services/interpretation/interpretationService';
import { useRainbowColor } from '../hooks/useRainbowColor';
import { saveReadingToHistory } from '../utils/readingHistory';
import './Home.css';

type ReadingState = {
  descriptions: string[];
  sources: InterpretationSource[];
  loading: boolean;
  error: string | null;
};

const Home: React.FC = () => {
  const { locale, t } = useTranslation();
  const [spreadId, setSpreadId] = useState<ReadingSpreadId>(getStoredSpreadId);
  const tableTheme = getTableTheme(getStoredTableThemeId());
  const deckTheme = getDeckTheme(getStoredDeckThemeId());
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [activePositions, setActivePositions] = useState<string[]>([]);
  const [reading, setReading] = useState<ReadingState>({
    descriptions: [],
    sources: [],
    loading: true,
    error: null,
  });
  const [generation, setGeneration] = useState(0);
  const requestIdRef = useRef(0);
  const titleColor = useRainbowColor(selectedCards.length > 0);

  const runReading = useCallback(
    async (nextSpreadId: ReadingSpreadId) => {
      const currentSpread = getSpreadById(nextSpreadId, locale);
      const picked = pickRandomCards(cards, currentSpread.cardCount);
      const positions = [...currentSpread.positions];
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

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
        if (requestIdRef.current !== requestId) {
          return;
        }

        const descriptions = results.map((r) => r.text);
        const cardNames = picked.map((c) => getCardDisplayName(c, locale));

        saveReadingToHistory(nextSpreadId, picked, positions, descriptions, cardNames);

        setReading({
          descriptions,
          sources: results.map((r) => r.source),
          loading: false,
          error: null,
        });
      } catch {
        if (requestIdRef.current !== requestId) {
          return;
        }
        setReading({
          descriptions: positions.map(() => ''),
          sources: [],
          loading: false,
          error: t.readingError,
        });
      }
    },
    [locale, t.readingError],
  );

  useEffect(() => {
    void runReading(spreadId);
  }, [spreadId, locale, runReading]);

  const handleSpreadChange = (id: ReadingSpreadId) => {
    if (id === spreadId) {
      return;
    }
    setSpreadId(id);
    setStoredSpreadId(id);
  };

  const regenerate = () => {
    void runReading(spreadId);
  };

  const shareReading = async () => {
    if (selectedCards.length === 0 || reading.loading) {
      return;
    }

    const text = formatReadingText(
      selectedCards,
      reading.descriptions,
      activePositions,
      locale,
    );

    try {
      await Share.share({
        title: t.shareTitle,
        text,
        dialogTitle: t.shareDialog,
      });
    } catch {
      if (navigator.share) {
        await navigator.share({ title: t.shareTitle, text });
      }
    }
  };

  const hasReading = selectedCards.length > 0;

  return (
    <IonPage className="home-page">
      <IonHeader className="home-header">
        <IonToolbar className="home-toolbar-bar">
          <IonButtons slot="start">
            <ArcanaDelGiorno variant="toolbar" />
          </IonButtons>
          <IonTitle className="home-title">{t.appTitle}</IonTitle>
          <IonButtons slot="end" className="home-toolbar-actions">
            {hasReading && !reading.loading && (
              <button
                type="button"
                className="home-icon-btn"
                onClick={shareReading}
                aria-label={t.shareReading}
                data-testid="share-btn"
              >
                <IonIcon icon={shareOutline} />
              </button>
            )}
            <Link
              to="/settings"
              className="home-icon-btn"
              aria-label={t.settings}
              data-testid="settings-link"
            >
              <IonIcon icon={settingsOutline} />
            </Link>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-content">
        <div
          className={`home-bg ${tableTheme.overlayClass}`.trim()}
          style={{ backgroundImage: `url('${tableTheme.backgroundImage}')` }}
        >
          <div className="home-inner">
            <SpreadSelector
              value={spreadId}
              onChange={handleSpreadChange}
              disabled={reading.loading}
            />

            <div
              className={`cards-stage cards-stage--${spreadId}`}
              data-testid="cards-grid"
            >
              {selectedCards.map((card, index) => (
                <MemoryCard
                  key={`${generation}-${index}`}
                  title={activePositions[index] ?? `Carta ${index + 1}`}
                  cardName={getCardDisplayName(card, locale)}
                  description={reading.descriptions[index] ?? ''}
                  image={card.image}
                  titleColor={titleColor}
                  descriptionLoading={reading.loading}
                  descriptionSource={reading.sources[index]}
                  deckClass={deckTheme.deckClass}
                  cardBackImage={deckTheme.cardBackImage}
                  flipLabel={t.flipCard}
                  loadingLabel={t.arcanaLoading}
                  aiBadge={t.aiBadge}
                  readMoreLabel={t.readMore}
                  fullInterpretationLabel={t.fullInterpretation}
                  closeLabel={t.close}
                  revealDelayMs={index * 80}
                />
              ))}
            </div>

            {reading.error && (
              <p className="home-error" data-testid="reading-error">
                {reading.error}
              </p>
            )}
          </div>

          <div className="home-footer">
            <button
              type="button"
              className="generate-btn"
              onClick={regenerate}
              disabled={reading.loading}
              data-testid="generate-btn"
            >
              <span className="generate-btn__label">
                {reading.loading ? t.generating : t.generate}
              </span>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
