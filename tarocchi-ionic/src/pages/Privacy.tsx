import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Privacy.css';

const Privacy: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/settings" text="Indietro" />
        </IonButtons>
        <IonTitle>Privacy Policy</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="privacy-content ion-padding">
      <p className="privacy-updated">Ultimo aggiornamento: 27 maggio 2026</p>

      <p>
        Tarocchi (<code>com.enrico2399.tarocchi</code>) è un&apos;app per letture con carte dei
        tarocchi. Non richiede account e non possiede server propri.
      </p>

      <h2>Dati sul dispositivo</h2>
      <p>Memorizziamo solo in locale:</p>
      <ul>
        <li>Preferenza tema (chiaro/scuro)</li>
        <li>Data ultima visualizzazione arcano del giorno</li>
        <li>Preferenza notifiche (on/off)</li>
      </ul>
      <p>
        Puoi eliminarli disinstallando l&apos;app o cancellando i dati dalle impostazioni Android.
      </p>

      <h2>Annunci (Google AdMob)</h2>
      <p>
        L&apos;app mostra annunci tramite Google AdMob. Google può raccogliere identificatori
        pubblicitari e dati di interazione secondo la{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy di Google
        </a>
        .
      </p>

      <h2>Permessi</h2>
      <ul>
        <li>Internet — funzionamento app e annunci</li>
        <li>Notifiche — solo se attivi il promemoria arcano (opzionale)</li>
        <li>Vibrazione — feedback al girare le carte</li>
      </ul>

      <h2>Condivisione</h2>
      <p>
        Se condividi una lettura, il testo va alle app che scegli tu. Tarocchi non riceve una
        copia.
      </p>

      <h2>Contatti</h2>
      <p>Per domande: usa la email di supporto indicata su Google Play.</p>
    </IonContent>
  </IonPage>
);

export default Privacy;
