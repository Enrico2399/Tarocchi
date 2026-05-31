import { useEffect, useState } from 'react';
import { IonAlert } from '@ionic/react';

const ONBOARDING_KEY = 'tarocchi-onboarding-v1';

const Onboarding: React.FC = () => {
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
      header="Benvenuto nello Studio Tarocchi"
      message={
        'Scegli il tipo di consulto, genera le carte e lascia che l\'oracolo AI interpreti il messaggio. ' +
        'L\'Arcano del giorno ti attende in alto a sinistra.'
      }
      buttons={[
        {
          text: 'Inizia',
          handler: dismiss,
        },
      ]}
      data-testid="onboarding-alert"
    />
  );
};

export default Onboarding;
