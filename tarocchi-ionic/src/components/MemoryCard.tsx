import { useState } from 'react';
import { playFlipSound } from '../utils/audio';
import { triggerFlipHaptic } from '../utils/haptics';
import type { InterpretationSource } from '../services/interpretation/interpretationService';
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
}) => {
  const [flipped, setFlipped] = useState(true);

  const flipCard = () => {
    playFlipSound();
    triggerFlipHaptic();
    setFlipped((f) => !f);
  };

  const showAiBadge =
    descriptionSource === 'ai' || descriptionSource === 'cloud';

  return (
    <button
      type="button"
      className={`memory-card ${deckClass}`.trim()}
      onClick={flipCard}
      aria-label={`${flipLabel} ${title}`}
      data-testid="memory-card"
      data-flipped={flipped}
    >
      <div className={`memory-card__inner ${flipped ? 'memory-card__inner--flipped' : ''}`}>
        <div className="memory-card__face memory-card__face--front">
          <p className="memory-card__name">{cardName}</p>
          <img src={image} alt={cardName} className="memory-card__image" />
          <div className="memory-card__scroll">
            {descriptionLoading ? (
              <p className="memory-card__description memory-card__description--loading" data-testid="description-loading">
                {loadingLabel}
              </p>
            ) : (
              <p className="memory-card__description" data-testid="card-description">
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
  );
};

export default MemoryCard;
