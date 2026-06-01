import { Children, isValidElement, useEffect, useState, type ReactNode } from 'react';
import type { ReadingSpreadId } from '../constants/readingSpreads';
import {
  DEAL_DURATION_MS,
  DEAL_INITIAL_DELAY_MS,
  DEAL_STAGGER_MS,
  DECK_EXIT_MS,
  DECK_HOLD_AFTER_DEAL_MS,
  useCardDealAnimation,
} from '../hooks/useCardDealAnimation';
import './CardDealingStage.css';

type CardDealingStageProps = {
  spreadId: ReadingSpreadId;
  cardCount: number;
  generation: number;
  positions: string[];
  cardBackImage: string;
  deckClass?: string;
  dealEnabled: boolean;
  dealingLabel: string;
  onDealComplete: () => void;
  children: ReactNode;
};

const CardDealingStage: React.FC<CardDealingStageProps> = ({
  spreadId,
  cardCount,
  generation,
  positions,
  cardBackImage,
  deckClass = '',
  dealEnabled,
  dealingLabel,
  onDealComplete,
  children,
}) => {
  const isDealing = useCardDealAnimation({
    cardCount,
    generation,
    enabled: dealEnabled,
    onComplete: onDealComplete,
  });

  const [deckVisible, setDeckVisible] = useState(false);
  const [deckExiting, setDeckExiting] = useState(false);

  useEffect(() => {
    if (dealEnabled && cardCount > 0) {
      setDeckVisible(true);
      setDeckExiting(false);
    }
  }, [dealEnabled, cardCount, generation]);

  useEffect(() => {
    if (isDealing || !deckVisible) {
      return;
    }

    const holdTimer = setTimeout(() => {
      setDeckExiting(true);
    }, DECK_HOLD_AFTER_DEAL_MS);

    const hideTimer = setTimeout(() => {
      setDeckVisible(false);
      setDeckExiting(false);
    }, DECK_HOLD_AFTER_DEAL_MS + DECK_EXIT_MS);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(hideTimer);
    };
  }, [isDealing, deckVisible]);

  const showDeck = deckVisible && cardCount > 0;

  return (
    <div
      className="card-dealing-stage"
      data-testid="card-dealing-stage"
      aria-busy={isDealing}
      aria-live="polite"
    >
      {isDealing && (
        <p className="card-dealing-stage__status" data-testid="dealing-status">
          {dealingLabel}
        </p>
      )}

      {showDeck && (
        <div
          className={`card-deck-stack ${deckExiting ? 'card-deck-stack--exit' : 'card-deck-stack--enter'} ${deckClass}`.trim()}
          data-testid="card-deck-stack"
          aria-hidden
        >
          {[0, 1, 2, 3].map((layer) => (
            <div
              key={layer}
              className="card-deck-stack__layer"
              style={{
                backgroundImage: `url('${cardBackImage}')`,
                ['--deck-layer' as string]: layer,
              }}
            />
          ))}
        </div>
      )}

      <div
        className={`cards-stage cards-stage--${spreadId}`}
        data-testid="cards-grid"
      >
        {isDealing
          ? positions.slice(0, cardCount).map((position, index) => (
              <div
                key={`deal-${generation}-${index}`}
                className="cards-stage__slot"
                data-testid="card-deal-slot"
              >
                <div
                  className={`card-deal-ghost ${deckClass}`.trim()}
                  style={{
                    ['--deal-index' as string]: index,
                    ['--deal-fan' as string]: index - (cardCount - 1) / 2,
                    ['--deal-duration' as string]: `${DEAL_DURATION_MS}ms`,
                    ['--deal-delay' as string]: `${DEAL_INITIAL_DELAY_MS + index * DEAL_STAGGER_MS}ms`,
                    backgroundImage: `url('${cardBackImage}')`,
                  }}
                  data-testid="card-deal-ghost"
                >
                  <span className="card-deal-ghost__label">{position}</span>
                </div>
              </div>
            ))
          : Children.toArray(children).map((child, index) =>
              isValidElement(child) ? (
                <div
                  key={child.key ?? `slot-${generation}-${index}`}
                  className="cards-stage__slot"
                >
                  {child}
                </div>
              ) : null,
            )}
      </div>
    </div>
  );
};

export default CardDealingStage;
