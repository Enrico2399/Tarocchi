import { useEffect, useMemo, useState } from 'react';
import { IonContent, IonModal } from '@ionic/react';
import { getArcanaOfTheDay } from '../utils/arcanaUtils';
import { ARCANA_VIEW_STORAGE_KEY, shouldShowArcanaNotificationDot } from '../utils/arcanaStorage';
import {
  getDailyArcanaInterpretation,
  type InterpretationSource,
} from '../services/interpretation/interpretationService';
import { getCardDisplayName } from '../constants/readingSpreads';
import { useTranslation } from '../i18n/useTranslation';
import './ArcanaDelGiorno.css';

type ArcanaDelGiornoProps = {
  variant?: 'toolbar' | 'floating';
};

const ArcanaDelGiorno: React.FC<ArcanaDelGiornoProps> = ({ variant = 'floating' }) => {
  const { locale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionSource, setDescriptionSource] = useState<InterpretationSource | null>(null);
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const arcana = useMemo(() => getArcanaOfTheDay(), []);
  const todayKey = useMemo(() => new Date().toDateString(), []);
  const displayName = getCardDisplayName(arcana, locale);

  useEffect(() => {
    const lastViewed = localStorage.getItem(ARCANA_VIEW_STORAGE_KEY);
    setShowDot(shouldShowArcanaNotificationDot(lastViewed, todayKey));
  }, [todayKey]);

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;
    setLoadingDescription(true);
    setLoadError(null);
    setDescription('');
    setDescriptionSource(null);

    getDailyArcanaInterpretation(arcana, todayKey)
      .then((result) => {
        if (cancelled) {
          return;
        }
        setDescription(result.text);
        setDescriptionSource(result.source);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(t.arcanaError);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingDescription(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, arcana, todayKey, t.arcanaError]);

  const openModal = () => {
    setOpen(true);
    localStorage.setItem(ARCANA_VIEW_STORAGE_KEY, todayKey);
    setShowDot(false);
  };

  const showAiBadge =
    descriptionSource === 'ai' || descriptionSource === 'cloud';

  return (
    <>
      <button
        type="button"
        className={`arcana-btn ${variant === 'toolbar' ? 'arcana-btn--toolbar' : ''}`}
        onClick={openModal}
        aria-label={t.dailyArcana}
        data-testid="arcana-btn"
      >
        <img src="/assets/images/button.png" alt="" className="arcana-btn__img" />
        {showDot && <span className="arcana-btn__dot" data-testid="arcana-dot" />}
      </button>

      <IonModal
        isOpen={open}
        onDidDismiss={() => setOpen(false)}
        backdropDismiss
        className="arcana-modal"
        data-testid="arcana-modal"
        breakpoints={[0, 0.55, 0.92]}
        initialBreakpoint={0.92}
      >
        <IonContent className="arcana-modal__content ion-padding">
          <p className="arcana-modal__subtitle">{t.arcanaModalSubtitle}</p>
          <h2 className="arcana-modal__title" data-testid="arcana-modal-title">{displayName}</h2>
          <img src={arcana.image} alt={displayName} className="arcana-modal__image" />
          <div className="arcana-modal__description" data-testid="arcana-description">
            {loadingDescription && t.arcanaLoading}
            {!loadingDescription && loadError && loadError}
            {!loadingDescription && !loadError && description}
            {!loadingDescription && !loadError && showAiBadge && (
              <span className="arcana-modal__ai-badge" data-testid="arcana-ai-badge">{t.aiBadge}</span>
            )}
          </div>
          <button type="button" className="arcana-modal__close" onClick={() => setOpen(false)}>
            {t.close}
          </button>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ArcanaDelGiorno;
