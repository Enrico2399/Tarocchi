import { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { PRIVACY_POLICY_URL } from '../constants/appLinks';
import { useTheme } from '../hooks/useTheme';
import {
  disableDailyNotifications,
  enableDailyNotifications,
} from '../utils/notifications';
import {
  getNotificationsEnabled,
  setNotificationsEnabled,
} from '../utils/notificationStorage';
import './Settings.css';

const Settings: React.FC = () => {
  const { isDark, setThemeMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabledState] = useState(false);
  const [notificationError, setNotificationError] = useState<string | null>(null);

  useEffect(() => {
    setNotificationsEnabledState(getNotificationsEnabled());
  }, []);

  const handleThemeToggle = (enabled: boolean) => {
    setThemeMode(enabled ? 'dark' : 'light');
  };

  const handleNotificationsToggle = async (enabled: boolean) => {
    setNotificationError(null);

    if (enabled) {
      const success = await enableDailyNotifications();
      if (!success) {
        setNotificationError('Permesso notifiche negato o non disponibile su web.');
        setNotificationsEnabledState(false);
        setNotificationsEnabled(false);
        return;
      }
    } else {
      await disableDailyNotifications();
    }

    setNotificationsEnabledState(enabled);
    setNotificationsEnabled(enabled);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Indietro" />
          </IonButtons>
          <IonTitle>Impostazioni</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="settings-content ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>Tema scuro</IonLabel>
            <IonToggle
              checked={isDark}
              onIonChange={(e) => handleThemeToggle(e.detail.checked)}
              data-testid="theme-toggle"
            />
          </IonItem>
          <IonItem>
            <IonLabel>Notifica arcano giornaliero</IonLabel>
            <IonToggle
              checked={notificationsEnabled}
              onIonChange={(e) => handleNotificationsToggle(e.detail.checked)}
              data-testid="notifications-toggle"
            />
          </IonItem>
          <IonItem button routerLink="/privacy" detail data-testid="privacy-link">
            <IonLabel>Privacy Policy (in-app)</IonLabel>
          </IonItem>
          <IonItem button href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" detail>
            <IonLabel>Privacy Policy (web)</IonLabel>
          </IonItem>
        </IonList>

        {notificationError && (
          <p className="settings-error" data-testid="notification-error">
            {notificationError}
          </p>
        )}

        <section className="settings-about">
          <h2>Tarocchi</h2>
          <p>Versione 1.0</p>
          <p>Lettura a 4 carte e arcano del giorno.</p>
          <p className="settings-about__package">com.enrico2399.tarocchi</p>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
