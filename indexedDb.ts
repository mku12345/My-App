import { Verse } from "../types";

const DB_NAME = "NoorQuranOfflineDB";
const STORE_NAME = "surah_cache";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error("Failed to open IndexedDB"));
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "number" });
      }
    };
  });
}

export async function getSurahFromOfflineStorage(surahNumber: number): Promise<Verse[] | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(surahNumber);

      request.onsuccess = () => {
        const result = request.result;
        if (result && result.verses) {
          resolve(result.verses);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  } catch (error) {
    console.error("Offline DB Read Error: ", error);
    return null;
  }
}

export async function saveSurahToOfflineStorage(surahNumber: number, verses: Verse[]): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const data = {
        number: surahNumber,
        verses: verses,
        cachedAt: Date.now()
      };
      const request = store.put(data);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        resolve(false);
      };
    });
  } catch (error) {
    console.error("Offline DB Write Error: ", error);
    return false;
  }
}

export async function getDownloadedSurahNumbers(): Promise<number[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAllKeys();

      request.onsuccess = () => {
        resolve((request.result as number[]) || []);
      };

      request.onerror = () => {
        resolve([]);
      };
    });
  } catch (error) {
    console.error("Offline DB Keys Error: ", error);
    return [];
  }
}

export async function deleteSurahFromOfflineStorage(surahNumber: number): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(surahNumber);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        resolve(false);
      };
    });
  } catch (error) {
    console.error("Offline DB Delete Error: ", error);
    return false;
  }
}
