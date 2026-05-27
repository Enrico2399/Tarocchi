import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.enrico2399.tarocchi',
  appName: 'Tarocchi',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
    backgroundColor: '#1a0a2e',
  },
};

export default config;
