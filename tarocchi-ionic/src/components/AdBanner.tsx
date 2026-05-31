import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';

const AdBanner: React.FC = () => {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    let mounted = true;

    const showBanner = async () => {
      try {
        const { AdMob, BannerAdPosition, BannerAdSize } =
          await import('@capacitor-community/admob');

        await AdMob.initialize({ initializeForTesting: true });

        if (!mounted) {
          return;
        }

        await AdMob.showBanner({
          adId: TEST_BANNER_ID,
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
        });
      } catch {
        // AdMob non disponibile in dev — silenzioso
      }
    };

    showBanner();

    return () => {
      mounted = false;
      import('@capacitor-community/admob')
        .then(({ AdMob }) => AdMob.removeBanner().catch(() => {}))
        .catch(() => {});
    };
  }, []);

  return null;
};

export default AdBanner;
