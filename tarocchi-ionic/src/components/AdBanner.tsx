import { useEffect } from 'react';
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
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
        await AdMob.initialize({ initializeForTesting: true });

        if (!mounted) {
          return;
        }

        const options: BannerAdOptions = {
          adId: TEST_BANNER_ID,
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
        };

        await AdMob.showBanner(options);
      } catch {
        // AdMob non disponibile in dev/web — silenzioso
      }
    };

    showBanner();

    return () => {
      mounted = false;
      AdMob.removeBanner().catch(() => {});
    };
  }, []);

  return null;
};

export default AdBanner;
