type Location = {
  latitude: number;
  longitude: number;
};

export type PlaceType = {
  title: string;
  imageUri?: string;
  address: string | null;
  location: Location;
}

export type PlaceResType = {
  title: string;
  imageUri?: string;
  address: string | null;
  location: Location;
  id: number;
}

export class Place {
  title: string;
  imageUri: string;
  address: string | null;
  location: Location;
  id: number;

  constructor({
    title,
    imageUri,
    address,
    location,
    id
  }: PlaceResType) {
    this.title = title;
    this.imageUri = imageUri ?? '';
    this.address = address;
    this.location = location;
    this.id = id;
  }
}
