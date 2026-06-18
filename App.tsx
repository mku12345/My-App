import React, { useState, useEffect } from "react";
import { AudioProvider } from "./context/AudioContext";
import { Dashboard } from "./components/Dashboard";
import { QuranViewer } from "./components/QuranViewer";
import { AudioPlayer } from "./components/AudioPlayer";
import { AIAssistant } from "./components/AIAssistant";
import { Bookmark, UserNote, ReadingProgress, Verse } from "./types";
import { RECITERS } from "./data/surahs";
import { Sparkles, Moon, Sun, BookMarked, Award, Layout, BookOpen, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Screen views manager
  const [screen, setScreen] = useState<"dashboard" | "reader">("dashboard");
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [startVerse, setStartVerse] = useState<number | null>(null);

  // Bookmarks state (persisted in localStorage)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  // Journal notes state (persisted in localStorage)
  const [notes, setNotes] = useState<UserNote[]>([]);
  // Reading Progress & habits (persisted in localStorage)
  const [progress, setProgress] = useState<ReadingProgress>({
    streak: 0,
    lastReadDate: "",
    dailyTarget: 10,
    versesReadToday: 0,
    totalVersesRead: 0
  });

  // AI reflection drawer state
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiSurahNum, setAiSurahNum] = useState<number>(1);
  const [aiSurahName, setAiSurahName] = useState<string>("");
  const [aiAyahNum, setAiAyahNum] = useState<number>(1);
  const [aiVerse, setAiVerse] = useState<Verse | null>(null);

  // Load persisted states on mount
  useEffect(() => {
    // 1. Bookmarks
    try {
      const storedB = localStorage.getItem("noor_quran_bookmarks");
      if (storedB) setBookmarks(JSON.parse(storedB));
    } catch (e) {
      console.error(e);
    }

    // 2. Journal Notes
    try {
      const storedN = localStorage.getItem("noor_quran_notes");
      if (storedN) setNotes(JSON.parse(storedN));
    } catch (e) {
      console.error(e);
    }

    // 3. Reading progress & streak logic
    try {
      const storedP = localStorage.getItem("noor_quran_progress");
      if (storedP) {
        const parsedP: ReadingProgress = JSON.parse(storedP);
        
        // Check streak consistency
        const todayStr = getTodayDateString();
        const yesterdayStr = getYesterdayDateString();

        let updatedProgress = { ...parsedP };

        if (!parsedP.lastReadDate) {
          // New progression tracker
          updatedProgress.lastReadDate = todayStr;
          updatedProgress.streak = 0;
          updatedProgress.versesReadToday = 0;
        } else if (parsedP.lastReadDate === todayStr) {
          // Already read or updated today, keep state
        } else if (parsedP.lastReadDate === yesterdayStr) {
          // Keep streak intact, but reset daily target counter
          updatedProgress.versesReadToday = 0;
        } else {
          // Missed more than 1 day, reset active streak, reset daily counter
          updatedProgress.streak = 0;
          updatedProgress.versesReadToday = 0;
        }
        setProgress(updatedProgress);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync state writes
  const saveProgress = (updated: ReadingProgress) => {
    setProgress(updated);
    localStorage.setItem("noor_quran_progress", JSON.stringify(updated));
  };

  const getTodayDateString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  const getYesterdayDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  // Toggle Bookmark
  const handleToggleBookmark = (surahNum: number, ayahNum: number, surahName: string) => {
    const idx = bookmarks.findIndex((b) => b.surahNumber === surahNum && b.ayahNumber === ayahNum);
    let updated: Bookmark[] = [];
    if (idx !== -1) {
      updated = bookmarks.filter((_, i) => i !== idx);
    } else {
      updated = [
        ...bookmarks,
        {
          id: `${surahNum}_${ayahNum}_${Date.now()}`,
          surahNumber: surahNum,
          ayahNumber: ayahNum,
          surahName: surahName,
          timestamp: Date.now()
        }
      ];
    }
    setBookmarks(updated);
    localStorage.setItem("noor_quran_bookmarks", JSON.stringify(updated));
  };

  const handleRemoveBookmarkById = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("noor_quran_bookmarks", JSON.stringify(updated));
  };

  // Notebook Journal notes management
  const handleAddNote = (surahNum: number, ayahNum: number, surahName: string, verse: Verse, text: string) => {
    const newNote: UserNote = {
      id: `${surahNum}_${ayahNum}_${Date.now()}`,
      surahNumber: surahNum,
      ayahNumber: ayahNum,
      surahName: surahName,
      verseText: verse.text,
      verseTranslation: verse.translation,
      text: text,
      timestamp: Date.now()
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem("noor_quran_notes", JSON.stringify(updated));

    // Also trigger reading progress addition to count as spiritual study!
    incrementProgressCounter(1);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem("noor_quran_notes", JSON.stringify(updated));
  };

  // Increment Read Progress
  const incrementProgressCounter = (count: number) => {
    const todayStr = getTodayDateString();
    let updated = { ...progress };

    if (updated.lastReadDate !== todayStr) {
      // First read today
      updated.streak += 1;
      updated.lastReadDate = todayStr;
      updated.versesReadToday = count;
    } else {
      updated.versesReadToday += count;
    }
    
    updated.totalVersesRead += count;
    saveProgress(updated);
  };

  const handleSetDailyTarget = (target: number) => {
    const updated = { ...progress, dailyTarget: target };
    saveProgress(updated);
  };

  // Open Study reader
  const handleSelectSurah = (surahNum: number, startVerseNum?: number | null) => {
    setSelectedSurah(surahNum);
    setStartVerse(startVerseNum || null);
    setScreen("reader");
  };

  // Open secure server side AI Reflections Study Drawer
  const handleOpenAI = (surahNum: number, surahName: string, ayahNum: number, verse: Verse) => {
    setAiSurahNum(surahNum);
    setAiSurahName(surahName);
    setAiAyahNum(ayahNum);
    setAiVerse(verse);
    setAiDrawerOpen(true);
  };

  // Event listener for automated Autoadvance surah swapper
  useEffect(() => {
    const handleAutoadvance = (e: any) => {
      const { surahNumber, startVerse } = e.detail;
      setSelectedSurah(surahNumber);
      setStartVerse(startVerse === "last" ? null : startVerse);
      setScreen("reader");
    };

    window.addEventListener("quran:autoadvance-surah", handleAutoadvance);
    return () => {
      window.removeEventListener("quran:autoadvance-surah", handleAutoadvance);
    };
  }, []);

  return (
    <AudioProvider>
      <div className="min-h-screen bg-[#faf9f6] text-slate-800 selection:bg-emerald-100 selection:text-emerald-950 font-sans flex flex-col relative">
        
        {/* Top Minimal Navigation Bar */}
        <header className="bg-white border-b border-slate-100/80 shadow-3xs sticky top-0 z-30 px-4 py-3 select-none">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div 
              onClick={() => {
                setScreen("dashboard");
                setAiDrawerOpen(false);
              }}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-slate-900 font-extrabold shadow-sm group-hover:scale-105 active:scale-95 transition-all">
                🌟
              </div>
              <div>
                <h1 className="font-sans font-extrabold text-[#033c2a] text-sm tracking-tight leading-none group-hover:text-emerald-800 transition">
                  Noor Al-Qur'an
                </h1>
                <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-0.5 leading-none">
                  Qur'anic companion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {screen === "reader" && (
                <button
                  onClick={() => setScreen("dashboard")}
                  className="px-3.5 py-1.5 rounded-xl bg-[#033c2a] text-emerald-400 text-xs font-bold hover:brightness-110 active:scale-95 transition"
                >
                  Dashboard Home
                </button>
              )}
              
              <div className="hidden sm:flex items-center gap-1.5 text-[9px] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 text-emerald-9a">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold tracking-wider font-sans leading-none uppercase">Uthmani Canonical Text</span>
              </div>
            </div>
          </div>
        </header>

        {/* Master Screen routers */}
        <main className="flex-1">
          {screen === "dashboard" ? (
            <Dashboard
              onSelectSurah={handleSelectSurah}
              bookmarks={bookmarks}
              onRemoveBookmark={handleRemoveBookmarkById}
              notes={notes}
              onDeleteNote={handleDeleteNote}
              progress={progress}
              onSetDailyTarget={handleSetDailyTarget}
            />
          ) : (
            <QuranViewer
              surahNumber={selectedSurah}
              startVerseNumber={startVerse}
              onBack={() => setScreen("dashboard")}
              onOpenAI={handleOpenAI}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onIncrementVersesRead={incrementProgressCounter}
            />
          )}
        </main>

        {/* Floating audio controller */}
        <AudioPlayer />

        {/* Secure server side AI Reflections Companion Drawer */}
        <AnimatePresence>
          {aiDrawerOpen && aiVerse && (
            <>
              {/* Backyard blurry click blocker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                onClick={() => setAiDrawerOpen(false)}
                className="fixed inset-0 bg-slate-900 z-30 cursor-pointer"
              />
              <AIAssistant
                surahNumber={aiSurahNum}
                surahName={aiSurahName}
                ayahNumber={aiAyahNum}
                verseText={aiVerse.text}
                verseTranslation={aiVerse.translation}
                onClose={() => setAiDrawerOpen(false)}
                onSaveNote={(reflectiveTafsirMarkdown) => {
                  handleAddNote(aiSurahNum, aiAyahNum, aiSurahName, aiVerse, reflectiveTafsirMarkdown);
                }}
              />
            </>
          )}
        </AnimatePresence>

      </div>
    </AudioProvider>
  );
}
