import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share } from '@capacitor/share';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { settingsOutline, shareOutline } from 'ionicons/icons';
import ArcanaDelGiorno from '../components/ArcanaDelGiorno';
import MemoryCard from '../components/MemoryCard';
import { CardData, POSITIONS, cards, getDescriptionByIndex } from '../constants/cardsData';
import { pickRandomCards } from '../utils/cardUtils';
import { formatReadingText } from '../utils/shareReading';
import { useRainbowColor } from '../hooks/useRainbowColor';
import './Home.css';

const Home: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [generation, setGeneration] = useState(0);
  const titleColor = useRainbowColor(selectedCards.length > 0);

  const generateCards = () => {
    setSelectedCards(pickRandomCards(cards, 4));
    setGeneration((g) => g + 1);
  };

  const shareReading = async () => {
    if (selectedCards.length === 0) {
      return;
    }

    const text = formatReadingText(selectedCards);

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
            {selectedCards.length > 0 && (
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
                  description={getDescriptionByIndex(card, index)}
                  image={card.image}
                  titleColor={titleColor}
                />
              ))}
            </div>

            <button type="button" className="generate-btn" onClick={generateCards} data-testid="generate-btn">
              <span className="generate-btn__label">🔮 Genera Carte</span>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
