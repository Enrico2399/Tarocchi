import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useTranslation } from '../i18n/useTranslation';
import './Privacy.css';

const Privacy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage className="esoteric-page privacy-page">
      <IonHeader>
        <IonToolbar className="esoteric-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" text={t.back} />
          </IonButtons>
          <IonTitle>{t.privacyTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="privacy-content esoteric-content ion-padding">
        <p className="privacy-updated">{t.privacyUpdated}</p>
        <p>{t.privacyIntro}</p>

        <h2>{t.privacyLocalTitle}</h2>
        <p>{t.privacyLocalBody}</p>

        <h2>{t.privacyAiTitle}</h2>
        <p>{t.privacyAiBody}</p>

        <h2>{t.privacyAdsTitle}</h2>
        <p>{t.privacyAdsBody}</p>

        <h2>{t.privacyPermissionsTitle}</h2>
        <p>{t.privacyPermissionsBody}</p>

        <h2>{t.privacyShareTitle}</h2>
        <p>{t.privacyShareBody}</p>

        <h2>{t.privacyContactTitle}</h2>
        <p>{t.privacyContactBody}</p>
      </IonContent>
    </IonPage>
  );
};

export default Privacy;
