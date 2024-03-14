import { ExpoConfig } from '@expo/config-types';
import * as dotenv from 'dotenv';
dotenv.config();

const androidPackage = 'com.newnative.app';
const iosBundleIdentifier = 'com.newnative.app';

export default ({ config }: { config: ExpoConfig }): ExpoConfig => {
  return {
    ...config,
    name: 'react-native-map',
    slug: 'react-native-map',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      ...config.ios,
      bundleIdentifier: iosBundleIdentifier,
      supportsTablet: true,
    },
    android: {
      ...config.android,
      package: androidPackage,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      ...config.extra,
      eas: {
        projectId: 'd7946d85-3b17-4cff-b232-fc78c1b10249'
      },
      MAPBOX_PUBLIC_API_KEY: process.env.MAPBOX_PUBLIC_API_KEY || '',
      MAPBOX_SECURE_API_KEY: process.env.MAPBOX_SECURE_API_KEY || '',
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
    },
    plugins: [
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsImpl: 'mapbox',
          RNMapboxMapsDownloadToken: process.env.MAPBOX_SECURE_API_KEY
        },
      ],
      [
        'expo-location',
        {
          locationWhenInUsePermission: 'Show current location on map.',
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission: 'The app needs access to your photos to let you share them with your friends.',
          cameraPermission: 'The app needs access to your camera in order to take phone of your favorite places',
        },
      ],
    ],
  };
};
