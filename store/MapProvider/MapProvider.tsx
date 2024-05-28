import { createContext, useState, ReactNode, useContext } from 'react';
import { Location } from '@rnmapbox/maps';

export interface Pin {
  latitude: number;
  longitude: number;
}

type MapContextType = {
  pins: Pin[];
  userLocation?: Location;
  updatePins: (val: Pin) => void;
  deletePin: () => void;
  onUserLocationUpdate: (val: Location) => void;
};

type GlobalProviderType = {
  children: ReactNode | ReactNode[];
};

export const MapContext = createContext<MapContextType>({} as MapContextType);

export const MapProvider = ({ children }: GlobalProviderType) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [userLocation, setUserLocation] = useState<Location | undefined>();

  const onUserLocationUpdate = (newLocation: Location) => {
    setUserLocation(newLocation);
  };

  const updatePins = (val: Pin) => {
    setPins([val]);
    // setPins([...(pins || []), val]);
  };

  const deletePin = () => {
    setPins((prevPins) => {
      const newPins = [...prevPins];

      newPins?.pop?.();

      return newPins || [];
    });
  };

  const providerValue = {
    pins,
    userLocation,
    updatePins,
    deletePin,
    onUserLocationUpdate
  };
  return <MapContext.Provider value={providerValue}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);
