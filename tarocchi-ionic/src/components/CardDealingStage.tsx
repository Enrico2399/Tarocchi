import {
  Children,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';
import type { ReadingSpreadId } from '../constants/readingSpreads';
import {
  DEAL_DURATION_MS,
  DEAL_INITIAL_DELAY_MS,
  DEAL_STAGGER_MS,
} from '../hooks/useCardDealAnimation';
import './CardDealingStage.css';

/** Must match `.card-dealing-stage__ritual-collapse` transition duration */
const RITUAL_COLLAPSE_MS = 720;

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
  const childSlots = Children.toArray(children);
  const [showDealSlots, setShowDealSlots] = useState(false);
  const [ritualVisible, setRitualVisible] = useState(false);
  const ritualExiting = ritualVisible && !isDealing;
  /** Deck stays mounted during exit so the collapse box keeps height until it animates away */
  const showDeckMounted = cardCount > 0 && (isDealing || ritualExiting);

  useLayoutEffect(() => {
    if (isDealing && cardCount > 0) {
      setShowDealSlots(false);
    }
  }, [isDealing, cardCount, generation]);

  useEffect(() => {
    if (!isDealing || cardCount <= 0) {
      setShowDealSlots(false);
      return undefined;
    }
    const id = window.setTimeout(() => {
      setShowDealSlots(true);
    }, DEAL_INITIAL_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [isDealing, cardCount, generation]);

  useEffect(() => {
    if (isDealing && cardCount > 0) {
      setRitualVisible(true);
      return undefined;
    }
    if (!ritualVisible) {
      return undefined;
    }
    const id = window.setTimeout(() => setRitualVisible(false), RITUAL_COLLAPSE_MS);
    return () => window.clearTimeout(id);
  }, [isDealing, cardCount, generation, ritualVisible]);

  const emptyDealSlots = positions.slice(0, cardCount).map((_, index) => (
    <div
      key={`wait-${generation}-${index}`}
      className="cards-stage__slot cards-stage__slot--empty"
      data-testid="card-deal-slot"
      aria-hidden
    />
  ));

  const ghostDealSlots = positions.slice(0, cardCount).map((position, index) => (
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
        aria-hidden
      >
        <span className="card-deal-ghost__label">{position}</span>
      </div>
    </div>
  ));

  const gridContent = isDealing
    ? showDealSlots
      ? ghostDealSlots
      : emptyDealSlots
    : childSlots.map((child, index) =>
        isValidElement(child) ? (
          <div key={child.key ?? `slot-${generation}-${index}`} className="cards-stage__slot">
            {child}
          </div>
        ) : null,
      );

  return (
    <div
      className="card-dealing-stage"
      data-testid="card-dealing-stage"
      data-dealing={isDealing ? 'true' : 'false'}
      aria-busy={isDealing}
      aria-live="polite"
    >
      {ritualVisible && (
        <div
          className={`card-dealing-stage__ritual${ritualExiting ? ' card-dealing-stage__ritual--exiting' : ''}`}
          data-testid="dealing-ritual"
        >
          <div className="card-dealing-stage__ritual-collapse">
            <div className="card-dealing-stage__ritual-inner">
              <p className="card-dealing-stage__status" data-testid="dealing-status">
                {dealingLabel}
              </p>
              {showDeckMounted && (
                <div className="card-dealing-stage__deck-slot">
                  <div
                    className={`card-deck-stack ${ritualExiting ? 'card-deck-stack--vanish' : 'card-deck-stack--enter'} ${deckClass}`.trim()}
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
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={`cards-stage cards-stage--${spreadId}${isDealing ? ' cards-stage--dealing' : ' cards-stage--landed'}`}
        data-testid="cards-grid"
      >
        {gridContent}
      </div>
    </div>
  );
};

export default CardDealingStage;
