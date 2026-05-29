import { useEffect, useMemo, useState } from 'react';
import { IonContent, IonModal } from '@ionic/react';
import { getArcanaOfTheDay } from '../utils/arcanaUtils';
import { ARCANA_VIEW_STORAGE_KEY, shouldShowArcanaNotificationDot } from '../utils/arcanaStorage';
import { getAiReadingsEnabled } from '../utils/aiStorage';
import {
  generateDailyArcanaDescription,
  getJsonArcanaDescription,
  type DescriptionSource,
} from '../services/localLlm';
import './ArcanaDelGiorno.css';

const ArcanaDelGiorno: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionSource, setDescriptionSource] = useState<DescriptionSource>('json');
  const [loadingDescription, setLoadingDescription] = useState(false);
  const arcana = useMemo(() => getArcanaOfTheDay(), []);

  useEffect(() => {
    const lastViewed = localStorage.getItem(ARCANA_VIEW_STORAGE_KEY);
    setShowDot(shouldShowArcanaNotificationDot(lastViewed, new Date().toDateString()));
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const jsonText = getJsonArcanaDescription(arcana);
    setDescription(jsonText);
    setDescriptionSource('json');

    if (!getAiReadingsEnabled()) {
      return;
    }

    let cancelled = false;
    setLoadingDescription(true);

    generateDailyArcanaDescription(arcana).then((aiText) => {
      if (cancelled) {
        return;
      }

      if (aiText) {
        setDescription(aiText);
        setDescriptionSource('ai');
      }

      setLoadingDescription(false);
    });

    return () => {
      cancelled = true;
    };
  }, [open, arcana]);

  const openModal = () => {
    setOpen(true);
    localStorage.setItem(ARCANA_VIEW_STORAGE_KEY, new Date().toDateString());
    setShowDot(false);
  };

  return (
    <>
      <button
        type="button"
        className="arcana-btn"
        onClick={openModal}
        aria-label="Arcano del giorno"
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
      >
        <IonContent className="arcana-modal__content ion-padding">
          <p className="arcana-modal__subtitle">Il tuo Arcano del Giorno</p>
          <h2 className="arcana-modal__title" data-testid="arcana-modal-title">{arcana.name}</h2>
          <img src={arcana.image} alt={arcana.name} className="arcana-modal__image" />
          <div className="arcana-modal__description" data-testid="arcana-description">
            {loadingDescription ? '✨ L\'oracolo sta interpretando...' : description}
            {!loadingDescription && descriptionSource === 'ai' && (
              <span className="arcana-modal__ai-badge" data-testid="arcana-ai-badge"> AI</span>
            )}
          </div>
          <button type="button" className="arcana-modal__close" onClick={() => setOpen(false)}>
            Chiudi
          </button>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ArcanaDelGiorno;
