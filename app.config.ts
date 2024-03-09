import { ExpoConfig } from '@expo/config-types';

export default ({ config }: { config: ExpoConfig }): ExpoConfig => {
  config.extra = config.extra || {};
  config.extra.MAPBOX_API_KEY = process.env.MAPBOX_API_KEY || '';
  config.extra.GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

  return config;
};
