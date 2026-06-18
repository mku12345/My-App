import React, { useState } from "react";
import { Surah, Bookmark, UserNote, ReadingProgress } from "../types";
import { SURAH_INDEX, RECITERS } from "../data/surahs";
import { 
  BookOpen, Sparkles, Flame, Bookmark as BookmarkIcon, FileText, User, Search, 
  HelpCircle, Compass, Calendar, CheckCircle2, ChevronRight, Play, Award, Volume2, Globe, Sparkle
} from "lucide-react";
import { motion } from "motion/react";

// Simplified Juz' boundaries for fast browser lookup
const JUZ_INDEX = [
  { juzNumber: 1, startSurah: "Al-Fatihah", startPage: 1, description: "Starts from the opening chapter" },
  { juzNumber: 2, startSurah: "Al-Baqarah (v.142)", startPage: 22, description: "Focuses on patience & legislation" },
  { juzNumber: 3, startSurah: "Al-Baqarah (v.253)", startPage: 42, description: "Contains Ayat al-Kursi" },
  { juzNumber: 4, startSurah: "Ali 'Imran (v.93)", startPage: 62, description: "Examines steadfastness & battles" },
  { juzNumber: 5, startSurah: "An-Nisa (v.24)", startPage: 82, description: "Outlines equity and social treaties" },
  { juzNumber: 6, startSurah: "An-Nisa (v.148)", startPage: 102, description: "Focuses on justice & truth speaker" },
  { juzNumber: 7, startSurah: "Al-Ma'idah (v.82)", startPage: 121, description: "Addresses legal treaties & food rules" },
  { juzNumber: 8, startSurah: "Al-An'am (v.111)", startPage: 142, description: "Theological signs & monotheism" },
  { juzNumber: 9, startSurah: "Al-A'raf (v.88)", startPage: 162, description: "Lessons of previous prophets" },
  { juzNumber: 10, startSurah: "Al-Anfal (v.41)", startPage: 182, description: "Historical battles & peace treaties" },
  { juzNumber: 11, startSurah: "At-Tawbah (v.93)", startPage: 201, description: "Divine mercy & sincere repentance" },
  { juzNumber: 12, startSurah: "Hud (v.6)", startPage: 221, description: "Comprehensive story of Prophet Yusuf" },
  { juzNumber: 13, startSurah: "Yusuf (v.53)", startPage: 242, description: "Trust in God's divine execution" },
  { juzNumber: 14, startSurah: "Al-Hijr (v.1)", startPage: 262, description: "Protection of Quranic revelations" },
  { juzNumber: 15, startSurah: "Al-Isra (v.1)", startPage: 282, description: "Contains the Night Journey & Cave" },
  { juzNumber: 16, startSurah: "Al-Kahf (v.75)", startPage: 302, description: "Story of Khidr & Maryam" },
  { juzNumber: 17, startSurah: "Al-Anbiya (v.1)", startPage: 322, description: "Reverence of all global prophets" },
  { juzNumber: 18, startSurah: "Al-Mu'minun (v.1)", startPage: 342, description: "Signs of true believers & light rules" },
  { juzNumber: 19, startSurah: "Al-Furqan (v.21)", startPage: 362, description: "Criterion of truth & Quranic poets" },
  { juzNumber: 20, startSurah: "An-Naml (v.56)", startPage: 382, description: "Prophet Solomon, Sheba & Al-Qasas" },
  { juzNumber: 21, startSurah: "Al-`Ankabut (v.46)", startPage: 402, description: "Sajdah, Luqman and spider symbolisms" },
  { juzNumber: 22, startSurah: "Al-Ahzab (v.31)", startPage: 422, description: "Fatir, Yaseen & Prophetic households" },
  { juzNumber: 23, startSurah: "Ya-Sin (v.28)", startPage: 442, description: "Heart of the Quran & angels rows" },
  { juzNumber: 24, startSurah: "Az-Zumar (v.32)", startPage: 462, description: "Tawbah guidance & divine forgiveness" },
  { juzNumber: 25, startSurah: "Fussilat (v.47)", startPage: 482, description: "Explained in detail & consultation theme" },
  { juzNumber: 26, startSurah: "Al-Ahqaf (v.1)", startPage: 502, description: "Victory, chambers & beautiful letters" },
  { juzNumber: 27, startSurah: "Adh-Dhariyat (v.31)", startPage: 522, description: "Ar-Rahman, Waqiah & steel values" },
  { juzNumber: 28, startSurah: "Al-Mujadilah (v.1)", startPage: 542, description: "Congregations & legal marital oaths" },
  { juzNumber: 29, startSurah: "Al-Mulk (v.1)", startPage: 562, description: "Sovereignty, pen & real-life test specs" },
  { juzNumber: 30, startSurah: "An-Naba (v.1)", startPage: 582, description: "Juz' 'Amma - Quick short spiritual chapters" }
];

interface DashboardProps {
  onSelectSurah: (surahNumber: number, startVerse?: number | null) => void;
  bookmarks: Bookmark[];
  onRemoveBookmark: (id: string) => void;
  notes: UserNote[];
  onDeleteNote: (id: string) => void;
  progress: ReadingProgress;
  onSetDailyTarget: (target: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectSurah,
  bookmarks,
  onRemoveBookmark,
  notes,
  onDeleteNote,
  progress,
  onSetDailyTarget
}) => {
  const [activeTab, setActiveTab] = useState<"surah" | "juz" | "bookmarks" | "notebook" | "reciters">("surah");
  const [surahQuery, setSurahQuery] = useState("");
  const [juzQuery, setJuzQuery] = useState("");

  const filteredSurahs = SURAH_INDEX.filter(s =>
    s.englishName.toLowerCase().includes(surahQuery.toLowerCase()) ||
    s.englishNameTranslation.toLowerCase().includes(surahQuery.toLowerCase()) ||
    s.name.includes(surahQuery) ||
    s.number.toString() === surahQuery
  );

  const filteredJuzs = JUZ_INDEX.filter(j =>
    j.juzNumber.toString() === juzQuery ||
    j.startSurah.toLowerCase().includes(juzQuery.toLowerCase()) ||
    j.description.toLowerCase().includes(juzQuery.toLowerCase())
  );

  const getProgressPercentage = () => {
    return Math.min(100, Math.floor((progress.versesReadToday / progress.dailyTarget) * 100));
  };

  // Static Hijri Date calculation for 2026-06-10
  // Gregorian: June 10, 2026 -> Hijri: 24 Dhul-Hijjah 1447 AH
  const hijriDateString = "24 Dhul-Hijjah 1447 AH";
  const gregorianDateString = "Wednesday, June 10, 2026";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-32 text-left">
      
      {/* High-Prestige Greeting Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Welcome and Calendar */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-850 to-[#043e2e] text-slate-100 flex flex-col justify-between border border-emerald-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
          
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkle className="w-4 h-4 animate-spin" />
              <span>Assalamu Alaikum</span>
            </div>
            <h1 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight mt-1">
              Noor Al-Qur'an
            </h1>
            <p className="text-xs sm:text-sm text-slate-350 max-w-sm mt-1">
              Your comprehensive desktop sanctuary for reading, color-coded interactive study, and AI reflection support.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs font-semibold text-slate-150 font-sans leading-none">{gregorianDateString}</p>
                <p className="text-[10px] text-emerald-300 font-mono mt-1 leading-none">{hijriDateString}</p>
              </div>
            </div>
            <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono font-bold px-2 py-1 rounded-lg border border-slate-750 uppercase">
              100% Offline Capable
            </span>
          </div>
        </div>

        {/* Daily Reading Target card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-150 flex flex-col justify-between shadow-sm relative text-slate-800">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reading Habit Goal</span>
              
              {/* Daily Streak Indicator */}
              <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full text-amber-800 font-bold text-xs">
                <Flame className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                <span>{progress.streak} Day streak</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              {/* Ring Progress Indicator */}
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="transparent"
                    stroke="#f1f0ea"
                    strokeWidth="4"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeDasharray={150.79}
                    strokeDashoffset={150.79 - (getProgressPercentage() / 100) * 150.79}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute text-[10px] font-bold font-mono text-slate-900">{getProgressPercentage()}%</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-mono leading-none">
                  {progress.versesReadToday} <span className="text-slate-400 text-xs">/ {progress.dailyTarget} verses</span>
                </h3>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider leading-none">Read Today</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            {/* Quick increase target button */}
            <span className="text-[10px] text-slate-400 font-medium">Daily Goal:</span>
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-150">
              {[5, 10, 20, 50].map((t) => (
                <button
                  key={t}
                  onClick={() => onSetDailyTarget(t)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono leading-none font-bold ${
                    progress.dailyTarget === t 
                      ? "bg-slate-900 text-emerald-400" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Tabs Navigator */}
      <div className="flex border-b border-slate-150 gap-4 mb-6 sticky top-0 bg-[#faf9f6]/90 backdrop-blur z-20 py-2.5 overflow-x-auto whitespace-nowrap scrollbar-none">
        
        <button
          onClick={() => setActiveTab("surah")}
          className={`flex items-center gap-2 pb-2.5 text-xs font-bold font-sans tracking-tight border-b-2 transition uppercase ${
            activeTab === "surah"
              ? "border-emerald-700 text-emerald-850"
              : "border-transparent text-slate-450 hover:text-slate-700"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Surah directory ({SURAH_INDEX.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("juz")}
          className={`flex items-center gap-2 pb-2.5 text-xs font-bold font-sans tracking-tight border-b-2 transition uppercase ${
            activeTab === "juz"
              ? "border-emerald-700 text-emerald-850"
              : "border-transparent text-slate-450 hover:text-slate-700"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Juz' Explorer (30 Sections)</span>
        </button>

        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`flex items-center gap-2 pb-2.5 text-xs font-bold font-sans tracking-tight border-b-2 transition uppercase relative ${
            activeTab === "bookmarks"
              ? "border-emerald-700 text-emerald-850"
              : "border-transparent text-slate-450 hover:text-slate-700"
          }`}
        >
          <BookmarkIcon className="w-4 h-4" />
          <span>My bookmarks</span>
          {bookmarks.length > 0 && (
            <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-full font-mono leading-none">
              {bookmarks.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("notebook")}
          className={`flex items-center gap-2 pb-2.5 text-xs font-bold font-sans tracking-tight border-b-2 transition uppercase relative ${
            activeTab === "notebook"
              ? "border-emerald-700 text-emerald-850"
              : "border-transparent text-slate-450 hover:text-slate-700"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Note Journal</span>
          {notes.length > 0 && (
            <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-full font-mono leading-none">
              {notes.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("reciters")}
          className={`flex items-center gap-2 pb-2.5 text-xs font-bold font-sans tracking-tight border-b-2 transition uppercase ${
            activeTab === "reciters"
              ? "border-emerald-700 text-emerald-850"
              : "border-transparent text-slate-450 hover:text-slate-700"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Qaris (Reciters Profile)</span>
        </button>

      </div>

      {/* TAB CONTENT 1: SURAH DIRECTORY */}
      {activeTab === "surah" && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-12.5 text-slate-400 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search chapters by English, Arabic name, translation or number..."
              value={surahQuery}
              onChange={(e) => setSurahQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 text-xs bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans shadow-2xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filteredSurahs.map((s) => (
              <div
                key={s.number}
                onClick={() => onSelectSurah(s.number)}
                className="p-4 bg-white border border-slate-150 rounded-2xl flex items-center justify-between cursor-pointer hover:border-emerald-500/50 hover:shadow-sm active:scale-98 transition group text-slate-800"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-xl border border-slate-150 group-hover:border-emerald-250 flex items-center justify-center text-xs font-extrabold text-slate-600 font-mono bg-[#fbfbfa] leading-none shrink-0 transition">
                    {s.number}
                  </span>
                  <div>
                    <h4 className="font-sans font-bold text-sm tracking-tight text-slate-900 group-hover:text-emerald-800 transition">
                      {s.englishName}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-none font-sans font-medium">
                      {s.englishNameTranslation}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h4 className="font-arabic text-emerald-850 text-base leading-none">
                    {s.name}
                  </h4>
                  <p className="text-[9px] text-slate-400 mt-1 leading-none font-mono">
                    {s.numberOfAyahs} ayahs
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredSurahs.length === 0 && (
            <div className="text-center py-20 bg-white border border-slate-150 rounded-2xl p-6">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 mt-1.5 font-semibold">No Chapters matched your criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: JUZ SECTION EXPLORER */}
      {activeTab === "juz" && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter 30 Juz sections..."
              value={juzQuery}
              onChange={(e) => setJuzQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 text-xs bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans shadow-2xs"
            />
          </div>

          <div className="space-y-2.5">
            {filteredJuzs.map((j) => {
              // Extract Surah number for click handling
              // e.g., "Al-Baqarah (v.142)" or "Al-Fatihah"
              const getSurahNumberFromJuzStart = (startS: string) => {
                if (startS.startsWith("Al-Fatihah")) return 1;
                if (startS.startsWith("Al-Baqarah (v.142)")) return 2; // Verse is handled in viewer
                if (startS.startsWith("Al-Baqarah (v.253)")) return 2;
                if (startS.startsWith("Ali 'Imran (v.93)")) return 3;
                if (startS.startsWith("An-Nisa (v.24)")) return 4;
                if (startS.startsWith("An-Nisa (v.148)")) return 4;
                if (startS.startsWith("Al-Ma'idah (v.82)")) return 5;
                if (startS.startsWith("Al-An'am (v.111)")) return 6;
                if (startS.startsWith("Al-A'raf (v.88)")) return 7;
                if (startS.startsWith("Al-Anfal (v.41)")) return 8;
                if (startS.startsWith("At-Tawbah (v.93)")) return 9;
                if (startS.startsWith("Hud (v.6)")) return 11;
                if (startS.startsWith("Yusuf (v.53)")) return 12;
                if (startS.startsWith("Al-Hijr (v.1)")) return 15;
                if (startS.startsWith("Al-Isra (v.1)")) return 17;
                if (startS.startsWith("Al-Kahf (v.75)")) return 18;
                if (startS.startsWith("Al-Anbiya (v.1)")) return 21;
                if (startS.startsWith("Al-Mu'minun (v.1)")) return 23;
                if (startS.startsWith("Al-Furqan (v.21)")) return 25;
                if (startS.startsWith("An-Naml (v.56)")) return 27;
                if (startS.startsWith("Al-`Ankabut (v.46)")) return 29;
                if (startS.startsWith("Al-Ahzab (v.31)")) return 33;
                if (startS.startsWith("Ya-Sin (v.28)")) return 36;
                if (startS.startsWith("Az-Zumar (v.32)")) return 39;
                if (startS.startsWith("Fussilat (v.47)")) return 41;
                if (startS.startsWith("Al-Ahqaf (v.1)")) return 46;
                if (startS.startsWith("Adh-Dhariyat (v.31)")) return 51;
                if (startS.startsWith("Al-Mujadilah (v.1)")) return 58;
                if (startS.startsWith("Al-Mulk (v.1)")) return 67;
                if (startS.startsWith("An-Naba (v.1)")) return 78;
                return 1;
              };

              const getSurahStartVerse = (startS: string) => {
                if (startS.includes("v.142")) return 142;
                if (startS.includes("v.253")) return 253;
                if (startS.includes("v.93")) return 93;
                if (startS.includes("v.24")) return 24;
                if (startS.includes("v.148")) return 148;
                if (startS.includes("v.82")) return 82;
                if (startS.includes("v.111")) return 111;
                if (startS.includes("v.88")) return 88;
                if (startS.includes("v.41")) return 41;
                if (startS.includes("v.93")) return 93;
                if (startS.includes("v.6")) return 6;
                if (startS.includes("v.53")) return 53;
                if (startS.includes("v.75")) return 75;
                if (startS.includes("v.21")) return 21;
                if (startS.includes("v.56")) return 56;
                if (startS.includes("v.46")) return 46;
                if (startS.includes("v.31")) return 31;
                if (startS.includes("v.28")) return 28;
                if (startS.includes("v.32")) return 32;
                if (startS.includes("v.47")) return 47;
                if (startS.includes("v.31")) return 31;
                return 1;
              };

              const onClickJuzItem = () => {
                const sNum = getSurahNumberFromJuzStart(j.startSurah);
                const startV = getSurahStartVerse(j.startSurah);
                onSelectSurah(sNum, startV);
              };

              return (
                <div
                  key={j.juzNumber}
                  onClick={onClickJuzItem}
                  className="bg-white border border-slate-150 rounded-2xl p-3.5 px-4 flex items-center justify-between cursor-pointer hover:border-emerald-500/50 hover:shadow-xs transition group text-slate-800"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 group-hover:bg-slate-100 flex flex-col items-center justify-center font-mono shrink-0 transition leading-none">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Juz</span>
                      <span className="text-sm font-extrabold text-slate-700 leading-tight mt-0.5">{j.juzNumber}</span>
                    </span>
                    <div>
                      <h4 className="font-sans font-bold text-sm tracking-tight text-slate-900 group-hover:text-emerald-800 transition">
                        Starts at {j.startSurah}
                      </h4>
                      <p className="text-xs text-slate-450 italic mt-0.5 font-sans leading-tight">
                        {j.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-50 border border-slate-150 text-slate-600 font-mono px-2 py-1 rounded-lg">
                      Page {j.startPage}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: BOOKMARKS JUMP */}
      {activeTab === "bookmarks" && (
        <div className="space-y-3.5">
          <div className="p-4 bg-emerald-50/50 border border-emerald-100/80 rounded-2xl px-5 text-emerald-900">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 leading-none">
              <BookmarkIcon className="w-4 h-4 text-emerald-800" /> Spiritual Bookmarks Tracker
            </h4>
            <p className="text-[11px] text-emerald-850 mt-1 pb-0.5 leading-relaxed font-sans">
              Keep bookmarks of specific divine verses. Click any Bookmark card to quickly launch the viewer at that exact verse coordinate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {bookmarks.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-150 rounded-2xl p-4 flex items-center justify-between text-slate-850 shadow-2xs hover:border-emerald-350 transition"
              >
                <div 
                  onClick={() => onSelectSurah(b.surahNumber, b.ayahNumber)}
                  className="flex-1 cursor-pointer pr-3"
                >
                  <h4 className="font-sans font-bold text-sm tracking-tight text-slate-900 hover:text-emerald-800 leading-none">
                    Surah {b.surahName} • Ayah {b.ayahNumber}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-mono leading-none">
                    Saved on {new Date(b.timestamp).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => onRemoveBookmark(b.id)}
                  className="text-[10px] font-bold text-red-600 hover:text-red-800 hover:underline cursor-pointer uppercase font-mono tracking-wide"
                >
                  Unmark
                </button>
              </div>
            ))}

            {bookmarks.length === 0 && (
              <div className="sm:col-span-2 text-center py-20 bg-white border border-slate-150 rounded-2xl p-6">
                <BookmarkIcon className="w-8 h-8 text-slate-350 mx-auto" />
                <p className="text-xs text-slate-550 mt-1.5 font-semibold">Your Bookmark index is empty.</p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">Click the bookmark icon bottom-right of any verse while studying to pin it here.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: PERSONAL REFLECTIONS NOTEBOOK */}
      {activeTab === "notebook" && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl px-5 text-amber-900">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 leading-none">
              <FileText className="w-4 h-4 text-amber-800" /> Reflection Notebook Journal
            </h4>
            <p className="text-[11px] text-amber-850 mt-1 pb-0.5 leading-relaxed font-sans">
              Review personal reflective thoughts, annotations, or study logs you attached to Quranic sections. You can edit, search, or print your spiritual records offline.
            </p>
          </div>

          <div className="space-y-3.5">
            {notes.map((n) => (
              <div
                key={n.id}
                className="bg-white border border-[#eae9e0] rounded-2xl p-5 text-left text-slate-850 shadow-2xs relative"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <span 
                    onClick={() => onSelectSurah(n.surahNumber, n.ayahNumber)}
                    className="text-xs font-bold text-amber-850 hover:underline cursor-pointer font-sans"
                  >
                    Surah {n.surahName} ({n.surahNumber}:{n.ayahNumber}) Reflective Log
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono tracking-tight">
                    {new Date(n.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl mb-3">
                  <h4 className="font-arabic text-right text-base text-slate-900 leading-normal mb-1.5" dir="rtl">
                    {n.verseText}
                  </h4>
                  <p className="text-[11px] text-slate-500 italic leading-tight">&ldquo;{n.verseTranslation}&rdquo;</p>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap bg-amber-50/30 p-3.5 border border-amber-100 rounded-xl">
                  {n.text}
                </div>

                <div className="mt-3 flex gap-4 text-[10px] justify-end">
                  <button
                    onClick={() => onDeleteNote(n.id)}
                    className="text-red-650 hover:text-red-800 hover:underline font-bold uppercase cursor-pointer"
                  >
                    Delete Entry
                  </button>
                </div>
              </div>
            ))}

            {notes.length === 0 && (
              <div className="text-center py-20 bg-white border border-slate-150 rounded-2xl p-6">
                <FileText className="w-8 h-8 text-slate-350 mx-auto" />
                <p className="text-xs text-slate-550 mt-1.5 font-semibold">Your Notebook Journal is currently empty.</p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">Open any chapter, click the notebook page icon below a verse, and log your thoughts instantly.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: RECITERS VOCALS LIST */}
      {activeTab === "reciters" && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl px-5 text-emerald-990 font-sans">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 leading-none">
              <User className="w-4 h-4 text-emerald-800" /> Prominent Global Qaris (10 Reciters)
            </h4>
            <p className="text-[11px] text-emerald-850 mt-1 pb-0.5 leading-relaxed">
              Browse world-renowned classical and modern reciters integrated into Noor Al-Qur'an. Go to the Study Reader, click any verse, and switch reciters instantly from the player tray.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RECITERS.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-slate-150 rounded-2xl p-4 flex gap-4 text-slate-805 shadow-2xs hover:border-slate-200 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-900 to-[#043e2e] text-emerald-400 flex items-center justify-center font-bold text-lg border border-slate-800 animate-pulse-slow font-sans shrink-0">
                  {r.name.split(" ").slice(-1)[0][0]}
                </div>

                <div className="text-left font-sans">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm tracking-tight text-slate-900 leading-tight">{r.name}</h4>
                    <span className="font-arabic text-emerald-700 text-xs text-right leading-none shrink-0">{r.arabicName}</span>
                  </div>
                  <span className="text-[9px] uppercase font-extrabold tracking-wider bg-slate-100 text-slate-650 px-2 py-0.5 rounded-md inline-block mt-1 font-mono leading-relaxed">
                    Style: {r.style}
                  </span>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed italic">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Helpful Hints section */}
      <div className="mt-12 border-t border-slate-200 pt-8 max-w-4xl">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tajweed Reference Guide</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 font-sans">
          <div className="bg-white p-4 border border-slate-150 rounded-2xl">
            <h5 className="font-bold text-slate-900 flex items-center gap-1">🗣️ What is Tajweed?</h5>
            <p className="mt-1.5 leading-relaxed text-slate-500">
              Tajweed literally means 'doing beautifully'. It is the system of linguistic rules governing pronunciation, stopping, and musical flow when reciting the Holy Qur'an, honoring its divine classical dialect.
            </p>
          </div>
          <div className="bg-white p-4 border border-slate-150 rounded-2xl">
            <h5 className="font-bold text-slate-900 flex items-center gap-1">📱 Offline Access Notes</h5>
            <p className="mt-1.5 leading-relaxed text-slate-500">
              Once you load and read any Surah from the index while online, its text is saved internally in your local Web Database. It becomes 100% accessible thereafter even with deep airplane mode.
            </p>
          </div>
          <div className="bg-[#032d21]/5 p-4 border border-emerald-500/10 rounded-2xl">
            <h5 className="font-bold text-emerald-950 flex items-center gap-1">✨ AI Reflector</h5>
            <p className="mt-1.5 leading-relaxed text-slate-500">
              Our secure server-side AI study assistance uses the advanced Google Gemini 3.5 Flash model. It offers Tafsir commentary, moral summaries, and linguistic secrets on call.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
