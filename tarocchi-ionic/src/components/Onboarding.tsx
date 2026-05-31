import { useTranslation } from '../i18n/useTranslation';
import { IonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';

const ONBOARDING_KEY = 'tarocchi-onboarding-v1';

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
    <IonAlert
      isOpen={show}
      onDidDismiss={dismiss}
      header={t.onboardingHeader}
      message={t.onboardingMessage}
      buttons={[
        {
          text: t.onboardingStart,
          handler: dismiss,
        },
      ]}
      data-testid="onboarding-alert"
    />
  );
};

export default Onboarding;
