import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { getAdsEnabled } from '../utils/adsStorage';

const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';
const AD_BANNER_CLASS = 'has-ad-banner';

function getBannerAdId(): string {
  return (import.meta.env.VITE_ADMOB_BANNER_ID as string | undefined) ?? TEST_BANNER_ID;
}

function isTestingMode(): boolean {
  return import.meta.env.VITE_ADMOB_TESTING !== 'false';
}

const AdBanner: React.FC = () => {
  useEffect(() => {
    if (!Capacitor.isNativePlatform() || !getAdsEnabled()) {
      document.documentElement.classList.remove(AD_BANNER_CLASS);
      return;
    }

    let mounted = true;

    const showBanner = async () => {
      try {
        const { AdMob, BannerAdPosition, BannerAdSize } =
          await import('@capacitor-community/admob');

        await AdMob.initialize({ initializeForTesting: isTestingMode() });

        if (!mounted) {
          return;
        }

        await AdMob.showBanner({
          adId: getBannerAdId(),
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 8,
        });

        document.documentElement.classList.add(AD_BANNER_CLASS);
      } catch {
        document.documentElement.classList.remove(AD_BANNER_CLASS);
      }
    };

    showBanner();

    return () => {
      mounted = false;
      document.documentElement.classList.remove(AD_BANNER_CLASS);
      import('@capacitor-community/admob')
        .then(({ AdMob }) => AdMob.removeBanner().catch(() => {}))
        .catch(() => {});
    };
  }, []);

  return null;
};

export default AdBanner;
