import {
  getAllSpreads,
  READING_SPREAD_IDS,
  type ReadingSpreadId,
} from '../constants/readingSpreads';
import { useTranslation } from '../i18n/useTranslation';
import './SpreadSelector.css';

type SpreadSelectorProps = {
  value: ReadingSpreadId;
  onChange: (id: ReadingSpreadId) => void;
  disabled?: boolean;
};

const SpreadSelector: React.FC<SpreadSelectorProps> = ({ value, onChange, disabled }) => {
  const { locale } = useTranslation();
  const spreads = getAllSpreads(locale);

  return (
    <div className="spread-selector" role="tablist" aria-label="Tipo di consulto">
      {READING_SPREAD_IDS.map((id) => {
        const spread = spreads.find((s) => s.id === id)!;
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`spread-selector__chip ${active ? 'spread-selector__chip--active' : ''}`}
            onClick={() => onChange(id)}
            disabled={disabled}
            data-testid={`spread-${id}`}
          >
            {spread.name}
          </button>
        );
      })}
    </div>
  );
};

export default SpreadSelector;
