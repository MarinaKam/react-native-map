type Location = {
  latitude: number;
  longitude: number;
};

export type AllPlacesRouteProps = {
  place: PlaceType;
}

export type PlaceType = {
  title: string;
  imageUri?: string;
  address: string | null;
  location: Location;
}

export class Place {
  title: string;
  imageUri: string;
  address: string | null;
  location: Location;
  id: string;

  constructor({
    title,
    imageUri,
    address,
    location,
  }: PlaceType) {
    this.title = title;
    this.imageUri = imageUri ?? '';
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
