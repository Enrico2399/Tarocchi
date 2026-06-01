import { useTranslation } from '../i18n/useTranslation';
import { IonModal, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Onboarding.css';

const ONBOARDING_KEY = 'tarocchi-onboarding-v2';

const Onboarding: React.FC = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(ONBOARDING_KEY)) {
      setShow(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(ONBOARDING_KEY, 'done');
    setShow(false);
  };

  return (
    <IonModal
      isOpen={show}
      onDidDismiss={dismiss}
      className="onboarding-modal"
      backdropDismiss={false}
      data-testid="onboarding-alert"
    >
      <IonContent className="onboarding-modal__content">
        <div className="onboarding-modal__inner esoteric-grain">
          <p className="onboarding-modal__sigil" aria-hidden>
            ✦ ☽ ✦
          </p>
          <h1 className="onboarding-modal__title">{t.onboardingHeader}</h1>
          <div className="esoteric-divider" aria-hidden>
            ✦
          </div>
          <p className="onboarding-modal__message">{t.onboardingMessage}</p>
          <button type="button" className="esoteric-cta onboarding-modal__cta" onClick={dismiss}>
            <span className="esoteric-cta__label">{t.onboardingStart}</span>
          </button>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default Onboarding;
