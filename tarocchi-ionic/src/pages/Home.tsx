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
import { settingsOutline, shareOutline, bookOutline, imagesOutline } from 'ionicons/icons';
import ArcanaDelGiorno from '../components/ArcanaDelGiorno';
import CardDealingStage from '../components/CardDealingStage';
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
import { getDealAnimationsEnabled } from '../utils/dealAnimationStorage';
import { formatReadingText } from '../utils/shareReading';
import { shareReadingAsImage } from '../utils/readingShareImage';
import {
  getStoredIntention,
  setStoredIntention,
} from '../utils/intentionStorage';
import {
  getReadingInterpretations,
  type InterpretationSource,
} from '../services/interpretation/interpretationService';
import { useRainbowColor } from '../hooks/useRainbowColor';
import { getCardsDealEndMs } from '../hooks/useCardDealAnimation';
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
  const [dealComplete, setDealComplete] = useState(false);
  const [intention, setIntention] = useState(getStoredIntention);
  const dealAnimationsEnabled = getDealAnimationsEnabled();
  const requestIdRef = useRef(0);
  const titleColor = useRainbowColor(selectedCards.length > 0);

  const runReading = useCallback(
    async (nextSpreadId: ReadingSpreadId) => {
      const currentSpread = getSpreadById(nextSpreadId, locale);
      const picked = pickRandomCards(cards, currentSpread.cardCount);
      const positions = [...currentSpread.positions];
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      setDealComplete(false);
      setSelectedCards(picked);
      setActivePositions(positions);
      setGeneration((g) => g + 1);
      setReading({
        descriptions: positions.map(() => ''),
        sources: [],
        loading: true,
        error: null,
      });

      if (!dealAnimationsEnabled) {
        setDealComplete(true);
      }

      try {
        const results = await getReadingInterpretations(picked, positions);
        if (requestIdRef.current !== requestId) {
          return;
        }

        const descriptions = results.map((r) => r.text);
        const cardNames = picked.map((c) => getCardDisplayName(c, locale));

        saveReadingToHistory(
          nextSpreadId,
          picked,
          positions,
          descriptions,
          cardNames,
          getStoredIntention(),
        );

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
    [dealAnimationsEnabled, locale, t.readingError],
  );

  useEffect(() => {
    void runReading(spreadId);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run on spread/locale only
  }, [spreadId, locale]);

  /** Safety net: never leave UI locked if deal timers are cleared (Strict Mode, fast regen) */
  useEffect(() => {
    if (!dealAnimationsEnabled || dealComplete || selectedCards.length === 0) {
      return undefined;
    }
    const id = window.setTimeout(() => {
      setDealComplete(true);
    }, getCardsDealEndMs(selectedCards.length) + 450);
    return () => window.clearTimeout(id);
  }, [dealAnimationsEnabled, dealComplete, selectedCards.length, generation]);

  const handleSpreadChange = (id: ReadingSpreadId) => {
    if (id === spreadId || !dealComplete) {
      return;
    }
    setSpreadId(id);
    setStoredSpreadId(id);
  };

  const regenerate = () => {
    if (!dealComplete) {
      return;
    }
    void runReading(spreadId);
  };

  const handleDealComplete = useCallback(() => {
    setDealComplete(true);
  }, []);

  const handleIntentionChange = (value: string) => {
    setIntention(value);
    setStoredIntention(value);
  };

  const shareReading = async () => {
    if (selectedCards.length === 0 || reading.loading || !dealComplete) {
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

  const shareReadingImage = async () => {
    if (selectedCards.length === 0 || reading.loading || !dealComplete) {
      return;
    }

    try {
      await shareReadingAsImage({
        cards: selectedCards,
        descriptions: reading.descriptions,
        positions: activePositions,
        locale,
        intention: getStoredIntention(),
      });
    } catch {
      // Utente ha annullato o share non disponibile
    }
  };

  const hasReading = selectedCards.length > 0;
  const isDealing = dealAnimationsEnabled && !dealComplete && hasReading;
  const footerLabel = isDealing
    ? t.dealingInProgress
    : reading.loading
      ? t.generating
      : t.generate;

  return (
    <IonPage className="home-page esoteric-page">
      <IonHeader className="home-header">
        <IonToolbar className="home-toolbar-bar esoteric-toolbar">
          <IonButtons slot="start">
            <ArcanaDelGiorno variant="toolbar" />
          </IonButtons>
          <IonTitle className="home-title">{t.appTitle}</IonTitle>
          <IonButtons slot="end" className="home-toolbar-actions">
            <Link
              to="/encyclopedia"
              className="esoteric-sigil-btn"
              aria-label={t.encyclopediaTitle}
              data-testid="encyclopedia-link"
            >
              <IonIcon icon={bookOutline} />
            </Link>
            {hasReading && dealComplete && !reading.loading && (
              <>
                <button
                  type="button"
                  className="esoteric-sigil-btn"
                  onClick={shareReadingImage}
                  aria-label={t.shareImage}
                  data-testid="share-image-btn"
                >
                  <IonIcon icon={imagesOutline} />
                </button>
                <button
                  type="button"
                  className="esoteric-sigil-btn"
                  onClick={shareReading}
                  aria-label={t.shareReading}
                  data-testid="share-btn"
                >
                  <IonIcon icon={shareOutline} />
                </button>
              </>
            )}
            <Link
              to="/settings"
              className="esoteric-sigil-btn"
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
            <label className="home-intention esoteric-field" htmlFor="reading-intention">
              <span className="esoteric-label">{t.intentionLabel}</span>
              <input
                id="reading-intention"
                type="text"
                className="esoteric-input"
                value={intention}
                onChange={(e) => handleIntentionChange(e.target.value)}
                placeholder={t.intentionPlaceholder}
                maxLength={200}
                disabled={!dealComplete || reading.loading}
                data-testid="intention-input"
              />
            </label>

            <SpreadSelector
              value={spreadId}
              onChange={handleSpreadChange}
              disabled={!dealComplete || reading.loading}
            />

            <CardDealingStage
              spreadId={spreadId}
              cardCount={selectedCards.length}
              generation={generation}
              positions={activePositions}
              cardBackImage={deckTheme.cardBackImage}
              deckClass={deckTheme.deckClass}
              dealEnabled={
                dealAnimationsEnabled && !dealComplete && selectedCards.length > 0
              }
              dealingLabel={t.dealingInProgress}
              onDealComplete={handleDealComplete}
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
                />
              ))}
            </CardDealingStage>

            {reading.error && dealComplete && (
              <p className="home-error" data-testid="reading-error">
                {reading.error}
              </p>
            )}
          </div>

          <div className="home-footer">
            <button
              type="button"
              className="esoteric-cta"
              onClick={regenerate}
              disabled={!dealComplete}
              data-testid="generate-btn"
            >
              <span className="esoteric-cta__label">{footerLabel}</span>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
