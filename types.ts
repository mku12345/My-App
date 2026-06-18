export interface Verse {
  number: number;         // Verse number within the surah (e.g. 1 to 7)
  numberInQuran: number;  // Absolute verse number (1 to 6236)
  text: string;           // Arabic Uthmani text
  translation: string;    // English translation
  transliteration: string; // English transliteration
  juz: number;
  page: number;
}

export interface Surah {
  number: number;
  name: string;             // Arabic name (e.g., سُورَةُ الْفَاتِحَةِ)
  englishName: string;      // English transliteration (e.g., Al-Fatiha)
  englishNameTranslation: string; // English translation of name
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
  verses?: Verse[];         // Array of verses, optionally loaded
}

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  style: "Hafs" | "Mujawwad" | "Murattal";
  baseUrl: string; // Base URL pattern or ID
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  timestamp: number;
}

export interface UserNote {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  verseText: string;
  verseTranslation: string;
  text: string;
  timestamp: number;
}

export interface SearchResult {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  verse: Verse;
}

export interface ReadingProgress {
  streak: number;
  lastReadDate: string; // YYYY-MM-DD
  dailyTarget: number; // in verses
  versesReadToday: number;
  totalVersesRead: number;
}

export interface OfflineSurah {
  number: number;
  verses: Verse[];
  downloadedAt: number;
}
