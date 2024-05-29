import { Pin } from '../store';

const mapbox_api_key = process.env.MAPBOX_PUBLIC_API_KEY;

export const reverseGeocoding = async({ latitude, longitude }: Pin['location']) => {
  if (!latitude || !longitude) return;

  const request_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapbox_api_key}`;

  try {
    const response = await fetch(request_url);

    if (response.ok) {
      const data = await response.json();
      const place_name = data.features[0].place_name;

      return { address: place_name };
    } else {
      console.error('Error with MapBox API request');
      return { address: null };
    }
  } catch (error) {
    console.error(`Error with geocoding request: ${error}`);
    throw new Error('Failed to fetch address!');
  }
};
