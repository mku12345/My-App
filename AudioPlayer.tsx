import React, { useState } from "react";
import { useAudio } from "../context/AudioContext";
import { RECITERS } from "../data/surahs";
import { 
  Play, Pause, SkipForward, SkipBack, Repeat, Sliders, ChevronUp, ChevronDown, Music, Sparkles, Loader2, Volume2, User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const AudioPlayer: React.FC = () => {
  const {
    currentSurah,
    currentVerse,
    isPlaying,
    currentReciter,
    playbackSpeed,
    repeatMode,
    loading,
    error,
    audioDuration,
    audioCurrentTime,
    togglePlay,
    playNext,
    playPrev,
    setReciterById,
    setPlaybackSpeed,
    setRepeatMode,
    seek,
  } = useAudio();

  const [expanded, setExpanded] = useState(false);
  const [showReciters, setShowReciters] = useState(false);

  if (!currentVerse || !currentSurah) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentProgress = audioDuration > 0 ? (audioCurrentTime / audioDuration) * 100 : 0;

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const destination = (value / 100) * audioDuration;
    seek(destination);
  };

  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-2 sm:pb-4 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800 text-slate-100 pointer-events-auto overflow-hidden">
        
        {/* Progress Bar */}
        <div className="relative group w-full h-1 bg-slate-850 cursor-pointer">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={currentProgress}
            onChange={handleProgressBarChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-r-full" 
            style={{ width: `${currentProgress}%` }}
          />
        </div>

        {/* Player Layout */}
        <div className="p-3 sm:p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Left side: Surah and Reciter Metadata */}
            <div className="flex items-center gap-3 w-full md:w-1/3 justify-between md:justify-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800 animate-pulse-slow">
                  <Music className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-semibold font-sans tracking-tight line-clamp-1">
                    {currentSurah.englishName} • <span className="font-arabic text-emerald-300">{currentSurah.name}</span>
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
                    Ayah {currentVerse.number} of {currentSurah.numberOfAyahs}
                  </p>
                </div>
              </div>

              {/* Expand Toggle Mobile */}
              <div className="flex items-center gap-2 md:hidden">
                <button 
                  onClick={() => setExpanded(!expanded)} 
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-250 hover:bg-slate-800"
                >
                  {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Middle: Controls */}
            <div className="flex flex-col items-center gap-1.5 w-full md:w-1/3">
              <div className="flex items-center gap-5 sm:gap-6">
                
                {/* Repeat Button */}
                <button
                  onClick={() => {
                    if (repeatMode === "none") setRepeatMode("verse");
                    else if (repeatMode === "verse") setRepeatMode("surah");
                    else setRepeatMode("none");
                  }}
                  className={`p-1.5 rounded-lg transition-colors relative ${
                    repeatMode !== "none" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title={`Repeat: ${repeatMode}`}
                >
                  <Repeat className="w-4 h-4" />
                  {repeatMode === "verse" && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-[8px] font-bold px-1 rounded-full text-slate-900">
                      1
                    </span>
                  )}
                  {repeatMode === "surah" && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-[8px] font-bold px-1 rounded-full text-slate-900 font-mono">
                      ∞
                    </span>
                  )}
                </button>

                {/* Back Button */}
                <button
                  onClick={playPrev}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-850 active:scale-95 transition-all"
                  title="Previous Verse"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  disabled={loading}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-900 flex items-center justify-center font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 pointer-events-auto"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5 fill-slate-950 text-slate-950" />
                  ) : (
                    <Play className="w-5 h-5 fill-slate-950 text-slate-950 ml-0.5" />
                  )}
                </button>

                {/* Next Button */}
                <button
                  onClick={playNext}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-850 active:scale-95 transition-all"
                  title="Next Verse"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                {/* Sliders / Speed Button */}
                <div className="relative group">
                  <button
                    onClick={() => {
                      const speeds = [1.0, 1.25, 1.5, 0.75];
                      const nextSpeedIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                      setPlaybackSpeed(speeds[nextSpeedIdx]);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200"
                    title={`Speed: ${playbackSpeed}x`}
                  >
                    <span className="text-xs font-mono font-bold">{playbackSpeed}x</span>
                  </button>
                </div>

              </div>

              {/* Timeline Durations */}
              <div className="flex justify-between w-full max-w-xs text-[10px] text-slate-500 px-1 font-mono">
                <span>{formatTime(audioCurrentTime)}</span>
                <span>{formatTime(audioDuration)}</span>
              </div>
            </div>

            {/* Right Side: Reciter Swapping */}
            <div className="hidden md:flex items-center justify-end gap-3 w-full md:w-1/3">
              {/* Reciter quick selector */}
              <div className="relative">
                <button
                  onClick={() => setShowReciters(!showReciters)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs text-slate-200 border border-slate-700 transition"
                >
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-sans font-medium line-clamp-1 max-w-[140px]">{currentReciter.name}</span>
                </button>

                <AnimatePresence>
                  {showReciters && (
                    <>
                      {/* Backyard click blocker */}
                      <div className="fixed inset-0 z-40" onClick={() => setShowReciters(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-2 w-72 max-h-80 overflow-y-auto bg-slate-850 rounded-2xl border border-slate-750 shadow-2xl z-50 p-2"
                      >
                        <div className="px-3 py-2 border-b border-slate-750/50 mb-2">
                          <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                            Choose Reciter ({RECITERS.length} Available)
                          </p>
                        </div>
                        <div className="space-y-0.5">
                          {RECITERS.map((r) => (
                            <button
                              key={r.id}
                              onClick={() => {
                                setReciterById(r.id);
                                setShowReciters(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition ${
                                currentReciter.id === r.id
                                  ? "bg-emerald-500/10 text-emerald-400 font-semibold"
                                  : "text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              <div>
                                <p>{r.name}</p>
                                <p className="text-[9px] text-slate-455 font-mono">{r.style}</p>
                              </div>
                              <span className="font-arabic text-[10px] text-emerald-300">{r.arabicName}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Expanded Mobile Controls */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden mt-3 pt-3 border-t border-slate-800"
              >
                <div className="space-y-3 px-1 text-left">
                  {/* Reciter Picker for mobile */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Reciter & Voice</label>
                    <select
                      value={currentReciter.id}
                      onChange={(e) => setReciterById(e.target.value)}
                      className="mt-1 w-full p-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs focus:ring-1 focus:ring-emerald-500"
                    >
                      {RECITERS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} ({r.arabicName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
                    <p className="font-semibold text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      Recitation Info
                    </p>
                    <p className="mt-1 font-sans italic leading-tight">{currentReciter.description}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* General Playback Error bar */}
          {error && (
            <div className="mt-2 text-center text-[10px] text-red-400 font-semibold bg-red-950/40 p-1.5 rounded-lg border border-red-900/60 transition-all">
              {error}
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
};
