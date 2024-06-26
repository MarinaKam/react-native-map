import * as SQLite from 'expo-sqlite/next';
import { Place, PlaceType } from '../models/place';

let db: SQLite.SQLiteDatabase;

export const init = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabaseAsync('places.db');

    await db.runAsync(`CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL
    )`, []);

    // await db.runAsync('CREATE TABLE IF NOT EXISTS <table_name>(id INTEGER PRIMARY KEY, name TEXT NOT NULL)');
  } catch (err) {
    console.error(`An error occurred while starting a transaction: ${err}`);
    throw err;
  }
};

export const getPlaces = async (): Promise<Place[]> => {
  try {
    const allPlaces = await db.getAllAsync('SELECT * FROM places');

    return allPlaces.map(row => new Place({
      title: (row as any).title,
      imageUri: (row as any).imageUri,
      address: (row as any).address,
      location: {
        latitude: (row as any).latitude,
        longitude: (row as any).longitude,
      },
      id: (row as any).id
    }));
  } catch (error) {
    console.error(`An error occurred while fetching places: ${error}`);
    throw error;
  }
};

export const getPlace = async (id: string): Promise<Place> => {
  try {
    const statement = await db.prepareAsync('SELECT * FROM places WHERE id = ?');
    const result = await statement.executeAsync(id);
    const row = await result.getFirstAsync();

    if (row) {
      return new Place({
        title: (row as any).title,
        imageUri: (row as any).imageUri,
        address: (row as any).address,
        location: {
          latitude: (row as any).latitude,
          longitude: (row as any).longitude,
        },
        id: (row as any).id
      });
    }

    throw new Error(`No place found with id:${id}`);
  } catch (error) {
    console.error(`An error occurred while fetching the place with id:${id}. ${error}`);
    throw error;
  }
};

export const addPlace = async (place: PlaceType): Promise<Place> => {
  const statement = await db.prepareAsync(`
    INSERT INTO places (title, imageUri, address, latitude, longitude)
    VALUES (?, ?, ?, ?, ?)
    RETURNING *`);

  let newPlace;

  try {
    const result = await statement.executeAsync(
      place.title,
      place?.imageUri || '',
      place.address,
      place.location.latitude,
      place.location.longitude
    );

    console.log('lastInsertRowId:', result.lastInsertRowId);

    for await (const row of result) {
      newPlace = new Place({
        title: (row as any).title,
        imageUri: (row as any).imageUri,
        address: (row as any).address,
        location: {
          latitude: (row as any).latitude,
          longitude: (row as any).longitude,
        },
        id: (row as any).id
      });
    }

    if (typeof newPlace === 'undefined') {
      throw new Error('No place was added in the database');
    }

    return newPlace;
  } catch (err) {
    console.error(`An error occurred while inserting a place: ${err}`);
    throw err;
  }
};
