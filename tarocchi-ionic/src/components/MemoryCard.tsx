import { useState } from 'react';
import { playFlipSound } from '../utils/audio';
import { triggerFlipHaptic } from '../utils/haptics';
import './MemoryCard.css';

type MemoryCardProps = {
  title: string;
  cardName: string;
  description: string;
  image: string;
  titleColor?: string;
};

const MemoryCard: React.FC<MemoryCardProps> = ({
  title,
  cardName,
  description,
  image,
  titleColor = '#fff',
}) => {
  const [flipped, setFlipped] = useState(true);

  const flipCard = () => {
    playFlipSound();
    triggerFlipHaptic();
    setFlipped((f) => !f);
  };

  return (
    <button
      type="button"
      className="memory-card"
      onClick={flipCard}
      aria-label={`Gira carta ${title}`}
      data-testid="memory-card"
      data-flipped={flipped}
    >
      <div className={`memory-card__inner ${flipped ? 'memory-card__inner--flipped' : ''}`}>
        <div className="memory-card__face memory-card__face--front">
          <p className="memory-card__name">{cardName}</p>
          <img src={image} alt={cardName} className="memory-card__image" />
          <div className="memory-card__scroll">
            <p className="memory-card__description">{description}</p>
          </div>
        </div>
        <div
          className="memory-card__face memory-card__face--back"
          style={{ backgroundImage: "url('/assets/images/backcarta.jpeg')" }}
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
