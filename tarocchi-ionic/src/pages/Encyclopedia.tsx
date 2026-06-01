import { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { cards } from '../constants/cardsData';
import { getCardDisplayName } from '../constants/readingSpreads';
import { useTranslation } from '../i18n/useTranslation';
import type { CardData } from '../constants/cardsData';
import './Encyclopedia.css';

const Encyclopedia: React.FC = () => {
  const { locale, t } = useTranslation();
  const [selected, setSelected] = useState<CardData | null>(null);

  return (
    <IonPage className="encyclopedia-page">
      <IonHeader>
        <IonToolbar className="encyclopedia-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text={t.back} />
          </IonButtons>
          <IonTitle>{t.encyclopediaTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="encyclopedia-content ion-padding">
        <p className="encyclopedia-intro">{t.encyclopediaIntro}</p>
        <ul className="encyclopedia-grid" data-testid="encyclopedia-grid">
          {cards.map((card) => (
            <li key={card.id}>
              <button
                type="button"
                className="encyclopedia-card"
                onClick={() => setSelected(card)}
                data-testid={`arcana-${card.id}`}
              >
                <img src={card.image} alt={getCardDisplayName(card, locale)} loading="lazy" />
                <span className="encyclopedia-card__num">{card.id}</span>
                <span className="encyclopedia-card__name">{getCardDisplayName(card, locale)}</span>
              </button>
            </li>
          ))}
        </ul>

        <IonModal
          isOpen={selected !== null}
          onDidDismiss={() => setSelected(null)}
          className="encyclopedia-modal"
        >
          {selected && (
            <div className="encyclopedia-detail">
              <img
                src={selected.image}
                alt={getCardDisplayName(selected, locale)}
                className="encyclopedia-detail__image"
              />
              <h2>{getCardDisplayName(selected, locale)}</h2>
              <p className="encyclopedia-detail__arcana">
                {t.encyclopediaArcana} {selected.id}
              </p>
              <div className="encyclopedia-detail__keywords">
                <h3>{t.encyclopediaKeywords}</h3>
                <ul>
                  {selected.keywords.map((keyword) => (
                    <li key={keyword}>{keyword}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="encyclopedia-detail__close"
                onClick={() => setSelected(null)}
              >
                {t.close}
              </button>
            </div>
          )}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Encyclopedia;
