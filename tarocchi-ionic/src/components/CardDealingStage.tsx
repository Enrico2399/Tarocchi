import { Children, isValidElement, type ReactNode } from 'react';
import type { ReadingSpreadId } from '../constants/readingSpreads';
import {
  DEAL_DURATION_MS,
  DEAL_INITIAL_DELAY_MS,
  DEAL_STAGGER_MS,
} from '../hooks/useCardDealAnimation';
import './CardDealingStage.css';

type CardDealingStageProps = {
  spreadId: ReadingSpreadId;
  cardCount: number;
  generation: number;
  positions: string[];
  cardBackImage: string;
  deckClass?: string;
  isDealing: boolean;
  dealingLabel: string;
  children: ReactNode;
};

const CardDealingStage: React.FC<CardDealingStageProps> = ({
  spreadId,
  cardCount,
  generation,
  positions,
  cardBackImage,
  deckClass = '',
  isDealing,
  dealingLabel,
  children,
}) => {
  const showDeck = isDealing && cardCount > 0;
  const childSlots = Children.toArray(children);

  return (
    <div
      className="card-dealing-stage"
      data-testid="card-dealing-stage"
      data-dealing={isDealing ? 'true' : 'false'}
      aria-busy={isDealing}
      aria-live="polite"
    >
      {isDealing && (
        <div className="card-dealing-stage__ritual" data-testid="dealing-ritual">
          <p className="card-dealing-stage__status" data-testid="dealing-status">
            {dealingLabel}
          </p>
          {showDeck && (
            <div
              className={`card-deck-stack card-deck-stack--enter ${deckClass}`.trim()}
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
        </div>
      )}

      <div
        className={`cards-stage cards-stage--${spreadId}`}
        data-testid="cards-grid"
      >
        {childSlots.map((child, index) => (
          <div
            key={
              isValidElement(child)
                ? (child.key ?? `slot-${generation}-${index}`)
                : `slot-${generation}-${index}`
            }
            className="cards-stage__slot"
            data-testid={isDealing ? 'card-deal-slot' : undefined}
          >
            {isValidElement(child) ? child : null}
            {isDealing && index < cardCount && (
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
                aria-hidden
              >
                <span className="card-deal-ghost__label">
                  {positions[index] ?? ''}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDealingStage;
