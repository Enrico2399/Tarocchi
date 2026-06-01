import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Suspense, lazy, useEffect } from 'react';
import Home from './pages/Home';
import { LocaleProvider } from './i18n/LocaleProvider';
import Onboarding from './components/Onboarding';
import AdBanner from './components/AdBanner';
import { applyTheme, getStoredTheme } from './utils/themeStorage';
import { warmupTarotLlm } from './services/interpretation/interpretationService';

const Settings = lazy(() => import('./pages/Settings'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Journal = lazy(() => import('./pages/Journal'));
const Encyclopedia = lazy(() => import('./pages/Encyclopedia'));

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.class.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    applyTheme(getStoredTheme());
    warmupTarotLlm();
  }, []);

  return (
    <LocaleProvider>
      <IonApp>
        <IonReactRouter>
          <Suspense fallback={null}>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route exact path="/journal">
                <Journal />
              </Route>
              <Route exact path="/encyclopedia">
                <Encyclopedia />
              </Route>
              <Route exact path="/privacy">
                <Privacy />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
          </Suspense>
        </IonReactRouter>
        <Onboarding />
        <AdBanner />
      </IonApp>
    </LocaleProvider>
  );
};

export default App;
