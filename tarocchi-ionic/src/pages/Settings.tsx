import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { PRIVACY_POLICY_URL } from '../constants/appLinks';
import {
  DECK_THEME_IDS,
  TABLE_THEME_IDS,
  getStoredDeckThemeId,
  getStoredTableThemeId,
  setStoredDeckThemeId,
  setStoredTableThemeId,
  type DeckThemeId,
  type TableThemeId,
} from '../constants/visualThemes';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../i18n/useTranslation';
import type { Locale } from '../i18n/localeStorage';
import { clearInterpretationCache } from '../services/interpretation/interpretationService';
import { getAiReadingsEnabled, setAiReadingsEnabled } from '../utils/aiStorage';
import { getAdsEnabled, setAdsEnabled } from '../utils/adsStorage';
import {
  getLlmAvailability,
  isCloudConfigured,
  type LlmAvailability,
} from '../services/interpretation/interpretationService';
import {
  disableDailyNotifications,
  enableDailyNotifications,
} from '../utils/notifications';
import {
  getNotificationsEnabled,
  setNotificationsEnabled,
} from '../utils/notificationStorage';
import {
  getDealAnimationsEnabled,
  setDealAnimationsEnabled,
} from '../utils/dealAnimationStorage';
import {
  clearReadingHistory,
  getReadingHistory,
} from '../utils/readingHistory';
import './Settings.css';

const Settings: React.FC = () => {
  const { isDark, setThemeMode } = useTheme();
  const { locale, setLocale, t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabledState] = useState(false);
  const [notificationError, setNotificationError] = useState<string | null>(null);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [adsEnabled, setAdsEnabledState] = useState(true);
  const [tableThemeId, setTableThemeId] = useState<TableThemeId>('classic');
  const [deckThemeId, setDeckThemeId] = useState<DeckThemeId>('classic');
  const [dealAnimationsEnabled, setDealAnimationsEnabledState] = useState(true);
  const [llmStatus, setLlmStatus] = useState<LlmAvailability>('unavailable');
  const [history, setHistory] = useState(getReadingHistory());
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    setNotificationsEnabledState(getNotificationsEnabled());
    setAiEnabled(getAiReadingsEnabled());
    setAdsEnabledState(getAdsEnabled());
    setTableThemeId(getStoredTableThemeId());
    setDeckThemeId(getStoredDeckThemeId());
    setDealAnimationsEnabledState(getDealAnimationsEnabled());
    getLlmAvailability().then(setLlmStatus);
  }, []);

  const handleThemeToggle = (enabled: boolean) => {
    setThemeMode(enabled ? 'dark' : 'light');
  };

  const handleNotificationsToggle = async (enabled: boolean) => {
    setNotificationError(null);

    if (enabled) {
      const success = await enableDailyNotifications();
      if (!success) {
        setNotificationError(t.notificationDenied);
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

  const handleAiToggle = (enabled: boolean) => {
    setAiEnabled(enabled);
    setAiReadingsEnabled(enabled);
  };

  const handleAdsToggle = (enabled: boolean) => {
    setAdsEnabledState(enabled);
    setAdsEnabled(enabled);
  };

  const handleLocaleChange = (value: Locale) => {
    setLocale(value);
    clearInterpretationCache();
  };

  const llmStatusLabel: Record<LlmAvailability, string> = {
    available: t.settingsAiAvailable,
    unavailable: isCloudConfigured() ? t.settingsAiCloud : t.settingsAiFallback,
    notready: t.settingsAiNotReady,
    downloadable: t.settingsAiDownloadable,
  };

  return (
    <IonPage className="esoteric-page settings-page">
      <IonHeader>
        <IonToolbar className="esoteric-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text={t.back} />
          </IonButtons>
          <IonTitle>{t.settings}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="settings-content esoteric-content ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>{t.settingsLanguage}</IonLabel>
            <IonSelect
              value={locale}
              onIonChange={(e) => handleLocaleChange(e.detail.value as Locale)}
              interface="popover"
              data-testid="language-select"
            >
              <IonSelectOption value="it">Italiano</IonSelectOption>
              <IonSelectOption value="en">English</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>{t.settingsDarkTheme}</IonLabel>
            <IonToggle
              checked={isDark}
              onIonChange={(e) => handleThemeToggle(e.detail.checked)}
              data-testid="theme-toggle"
            />
          </IonItem>
          <IonItem>
            <IonLabel>{t.settingsTableTheme}</IonLabel>
            <IonSelect
              value={tableThemeId}
              onIonChange={(e) => {
                const id = e.detail.value as TableThemeId;
                setTableThemeId(id);
                setStoredTableThemeId(id);
              }}
              interface="popover"
              data-testid="table-theme-select"
            >
              {TABLE_THEME_IDS.map((id) => (
                <IonSelectOption key={id} value={id}>
                  {t.tableThemes[id]}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>{t.settingsDeckTheme}</IonLabel>
            <IonSelect
              value={deckThemeId}
              onIonChange={(e) => {
                const id = e.detail.value as DeckThemeId;
                setDeckThemeId(id);
                setStoredDeckThemeId(id);
              }}
              interface="popover"
              data-testid="deck-theme-select"
            >
              {DECK_THEME_IDS.map((id) => (
                <IonSelectOption key={id} value={id}>
                  {t.deckThemes[id]}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>{t.settingsDealAnimations}</h2>
              <p>{t.settingsDealAnimationsHint}</p>
            </IonLabel>
            <IonToggle
              checked={dealAnimationsEnabled}
              onIonChange={(e) => {
                setDealAnimationsEnabledState(e.detail.checked);
                setDealAnimationsEnabled(e.detail.checked);
              }}
              data-testid="deal-animations-toggle"
            />
          </IonItem>
          <IonItem>
            <IonLabel>{t.settingsNotifications}</IonLabel>
            <IonToggle
              checked={notificationsEnabled}
              onIonChange={(e) => handleNotificationsToggle(e.detail.checked)}
              data-testid="notifications-toggle"
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>{t.settingsAiTitle}</h2>
              <p>{llmStatusLabel[llmStatus]}</p>
            </IonLabel>
            <IonToggle
              checked={aiEnabled}
              onIonChange={(e) => handleAiToggle(e.detail.checked)}
              data-testid="ai-toggle"
            />
          </IonItem>
          {isNative && (
            <IonItem>
              <IonLabel>
                <h2>{t.settingsAds}</h2>
                <p>{t.settingsAdsHint}</p>
              </IonLabel>
              <IonToggle
                checked={adsEnabled}
                onIonChange={(e) => handleAdsToggle(e.detail.checked)}
                data-testid="ads-toggle"
              />
            </IonItem>
          )}
          <IonItem button routerLink="/privacy" detail data-testid="privacy-link">
            <IonLabel>{t.settingsPrivacyInApp}</IonLabel>
          </IonItem>
          <IonItem button href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" detail>
            <IonLabel>{t.settingsPrivacyWeb}</IonLabel>
          </IonItem>
        </IonList>

        {notificationError && (
          <p className="settings-error" data-testid="notification-error">
            {notificationError}
          </p>
        )}

        <section className="settings-history" data-testid="reading-history">
          <div className="settings-history__header">
            <h2>{t.historyTitle}</h2>
            <Link to="/journal" className="settings-history__journal-link" data-testid="journal-link">
              {t.journalOpen}
            </Link>
          </div>
          {history.length === 0 ? (
            <p className="settings-history__empty">{t.historyEmpty}</p>
          ) : (
            <>
              <ul className="settings-history__list">
                {history.map((entry) => (
                  <li key={entry.id} className="settings-history__item">
                    <time dateTime={entry.createdAt}>
                      {new Date(entry.createdAt).toLocaleString(locale === 'en' ? 'en-GB' : 'it-IT')}
                    </time>
                    <span>{entry.lines.map((l) => l.cardName).join(' · ')}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="settings-history__clear"
                onClick={() => {
                  clearReadingHistory();
                  setHistory([]);
                }}
                data-testid="clear-history-btn"
              >
                {t.historyClear}
              </button>
            </>
          )}
        </section>

        <section className="settings-about">
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutVersion}</p>
          <p>{t.aboutDesc}</p>
          <p className="settings-about__package">com.enrico2399.tarocchi</p>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
