import { useState } from 'react';
import { IonContent, IonModal } from '@ionic/react';
import { playFlipSound } from '../utils/audio';
import { triggerFlipHaptic } from '../utils/haptics';
import type { InterpretationSource } from '../services/interpretation/interpretationService';
import {
  getTextLengthBucket,
  shouldShowReadMore,
} from '../utils/interpretationText';
import './MemoryCard.css';

type MemoryCardProps = {
  title: string;
  cardName: string;
  description: string;
  image: string;
  titleColor?: string;
  descriptionLoading?: boolean;
  descriptionSource?: InterpretationSource;
  deckClass?: string;
  cardBackImage?: string;
  flipLabel?: string;
  loadingLabel?: string;
  aiBadge?: string;
  readMoreLabel?: string;
  fullInterpretationLabel?: string;
  closeLabel?: string;
};

const MemoryCard: React.FC<MemoryCardProps> = ({
  title,
  cardName,
  description,
  image,
  titleColor = '#fff',
  descriptionLoading = false,
  descriptionSource,
  deckClass = '',
  cardBackImage = '/assets/images/backcarta.jpeg',
  flipLabel = 'Gira carta',
  loadingLabel = "✨ L'oracolo sta interpretando...",
  aiBadge = ' AI',
  readMoreLabel = 'Leggi tutto',
  fullInterpretationLabel = 'Interpretazione completa',
  closeLabel = 'Chiudi',
}) => {
  const [flipped, setFlipped] = useState(true);
  const [expandOpen, setExpandOpen] = useState(false);

  const flipCard = () => {
    playFlipSound();
    triggerFlipHaptic();
    setFlipped((f) => !f);
  };

  const showAiBadge =
    descriptionSource === 'ai' || descriptionSource === 'cloud';

  const textBucket = getTextLengthBucket(description);
  const showReadMore =
    !flipped && !descriptionLoading && description.length > 0 && shouldShowReadMore(description);

  const openExpand = () => {
    setExpandOpen(true);
  };

  return (
    <>
      <div
        className={`memory-card ${deckClass}`.trim()}
        data-testid="memory-card"
        data-flipped={flipped}
      >
        <button
          type="button"
          className="memory-card__flip"
          onClick={flipCard}
          aria-label={`${flipLabel} ${title}`}
        >
          <div className={`memory-card__inner ${flipped ? 'memory-card__inner--flipped' : ''}`}>
            <div className="memory-card__face memory-card__face--front">
              <p className="memory-card__name">{cardName}</p>
              <img src={image} alt={cardName} className="memory-card__image" />
              <div className="memory-card__text-area">
                {descriptionLoading ? (
                  <div className="memory-card__skeleton" data-testid="description-loading" aria-label={loadingLabel}>
                    <div className="memory-card__skeleton-line" />
                    <div className="memory-card__skeleton-line" />
                    <div className="memory-card__skeleton-line memory-card__skeleton-line--short" />
                  </div>
                ) : (
                  <p
                    className={`memory-card__description memory-card__description--${textBucket}`}
                    data-testid="card-description"
                  >
                    {description}
                    {showAiBadge && (
                      <span className="memory-card__ai-badge" data-testid="ai-badge">{aiBadge}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
            <div
              className="memory-card__face memory-card__face--back"
              style={{ backgroundImage: `url('${cardBackImage}')` }}
            >
              <p className="memory-card__title" style={{ color: titleColor }}>
                {title}
              </p>
            </div>
          </div>
        </button>
        {showReadMore && (
          <button
            type="button"
            className="memory-card__read-more"
            onClick={openExpand}
            data-testid="read-more-btn"
          >
            {readMoreLabel}
          </button>
        )}
      </div>

      <IonModal
        isOpen={expandOpen}
        onDidDismiss={() => setExpandOpen(false)}
        backdropDismiss
        className="card-text-modal"
        data-testid="card-text-modal"
        breakpoints={[0, 0.5, 0.85]}
        initialBreakpoint={0.85}
      >
        <IonContent className="card-text-modal__content ion-padding">
          <p className="card-text-modal__subtitle">{fullInterpretationLabel}</p>
          <h2 className="card-text-modal__title">{cardName}</h2>
          <p className="card-text-modal__position">{title}</p>
          <img src={image} alt={cardName} className="card-text-modal__image" />
          <div className="card-text-modal__description" data-testid="card-full-description">
            {description}
            {showAiBadge && (
              <span className="memory-card__ai-badge">{aiBadge}</span>
            )}
          </div>
          <button
            type="button"
            className="card-text-modal__close"
            onClick={() => setExpandOpen(false)}
          >
            {closeLabel}
          </button>
        </IonContent>
      </IonModal>
    </>
  );
};

export default MemoryCard;
