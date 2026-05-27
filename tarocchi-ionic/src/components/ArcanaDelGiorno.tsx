import { useEffect, useState } from 'react';
import { IonContent, IonModal } from '@ionic/react';
import { getArcanaOfTheDay } from '../utils/arcanaUtils';
import { ARCANA_VIEW_STORAGE_KEY, shouldShowArcanaNotificationDot } from '../utils/arcanaStorage';
import './ArcanaDelGiorno.css';

const ArcanaDelGiorno: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const arcana = getArcanaOfTheDay();

  useEffect(() => {
    const lastViewed = localStorage.getItem(ARCANA_VIEW_STORAGE_KEY);
    setShowDot(shouldShowArcanaNotificationDot(lastViewed, new Date().toDateString()));
  }, []);

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
          <div className="arcana-modal__description">{arcana.description1}</div>
          <button type="button" className="arcana-modal__close" onClick={() => setOpen(false)}>
            Chiudi
          </button>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ArcanaDelGiorno;
