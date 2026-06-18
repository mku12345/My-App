import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Reciter, Surah, Verse } from "../types";
import { RECITERS } from "../data/surahs";

interface AudioContextType {
  currentSurah: Surah | null;
  currentVerse: Verse | null;
  isPlaying: boolean;
  currentReciter: Reciter;
  playbackSpeed: number;
  repeatMode: "none" | "verse" | "surah";
  loading: boolean;
  error: string | null;
  audioDuration: number;
  audioCurrentTime: number;
  playVerse: (surah: Surah, verse: Verse) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  setReciterById: (id: string) => void;
  setPlaybackSpeed: (speed: number) => void;
  setRepeatMode: (mode: "none" | "verse" | "surah") => void;
  seek: (seconds: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentReciter, setCurrentReciter] = useState<Reciter>(RECITERS[0]);
  const [playbackSpeed, setPlaybackSpeedState] = useState<number>(1.0);
  const [repeatMode, setRepeatMode] = useState<"none" | "verse" | "surah">("none");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio element
  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setLoading(true);
    const handlePlaying = () => {
      setLoading(false);
      setError(null);
    };
    const handleDurationChange = () => setAudioDuration(audio.duration || 0);
    const handleTimeUpdate = () => setAudioCurrentTime(audio.currentTime || 0);
    const handleEnded = () => {
      handleVerseEnded();
    };
    const handleError = () => {
      setLoading(false);
      setError("Failed to stream audio file for this reciter. Continuing or retrying may help.");
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("waiting", handleWaiting);
        audio.removeEventListener("playing", handlePlaying);
        audio.removeEventListener("durationchange", handleDurationChange);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
      }
    };
  }, [currentSurah, currentVerse, repeatMode]);

  // Adjust playback rate when speed or src changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.defaultPlaybackRate = playbackSpeed;
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, currentVerse]);

  // Handle source URL change when verse or reciter changes
  useEffect(() => {
    if (audioRef.current && currentVerse) {
      const audioUrl = `https://cdn.islamic.network/quran/audio/128/${currentReciter.id}/${currentVerse.numberInQuran}.mp3`;
      
      const wasPlaying = isPlaying;
      setLoading(true);
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      
      if (wasPlaying || true) { // Always play when explicitly chosen or auto-advancing
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Audio playback interrupted/failed:", err);
            setIsPlaying(false);
            setLoading(false);
          });
      }
    }
  }, [currentVerse, currentReciter.id]);

  const playVerse = (surah: Surah, verse: Verse) => {
    setCurrentSurah(surah);
    setCurrentVerse(verse);
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (audioRef.current && currentVerse) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setAudioCurrentTime(seconds);
    }
  };

  const setPlaybackSpeed = (speed: number) => {
    setPlaybackSpeedState(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const setReciterById = (id: string) => {
    const reciter = RECITERS.find((r) => r.id === id);
    if (reciter) {
      setCurrentReciter(reciter);
    }
  };

  const playNext = () => {
    if (!currentSurah || !currentVerse) return;

    const currentIdx = currentSurah.verses?.findIndex((v) => v.number === currentVerse.number) ?? -1;
    
    if (currentSurah.verses && currentIdx !== -1 && currentIdx < currentSurah.verses.length - 1) {
      // Net verse in the same Surah
      setCurrentVerse(currentSurah.verses[currentIdx + 1]);
    } else {
      // Go to next Surah, verse 1
      const nextSurahNum = currentSurah.number + 1;
      if (nextSurahNum <= 114) {
        // We trigger an external state handler to load this surah and play its first verse
        // Handled via raising events or by listening in components.
        // For simple self-containment, we dispatch a custom event
        const event = new CustomEvent("quran:autoadvance-surah", {
          detail: { surahNumber: nextSurahNum, startVerse: 1 }
        });
        window.dispatchEvent(event);
      } else {
        // End of Quran reached, stop
        setIsPlaying(false);
        setCurrentVerse(null);
      }
    }
  };

  const playPrev = () => {
    if (!currentSurah || !currentVerse) return;

    const currentIdx = currentSurah.verses?.findIndex((v) => v.number === currentVerse.number) ?? -1;
    
    if (currentSurah.verses && currentIdx > 0) {
      setCurrentVerse(currentSurah.verses[currentIdx - 1]);
    } else {
      // Go to previous Surah, last verse
      const prevSurahNum = currentSurah.number - 1;
      if (prevSurahNum >= 1) {
        const event = new CustomEvent("quran:autoadvance-surah", {
          detail: { surahNumber: prevSurahNum, startVerse: "last" }
        });
        window.dispatchEvent(event);
      }
    }
  };

  const handleVerseEnded = () => {
    if (repeatMode === "verse") {
      // Replay current verse
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else if (repeatMode === "surah") {
      if (!currentSurah || !currentVerse) return;
      const currentIdx = currentSurah.verses?.findIndex((v) => v.number === currentVerse.number) ?? -1;
      if (currentSurah.verses && currentIdx === currentSurah.verses.length - 1) {
        // Start from verse 1 again
        setCurrentVerse(currentSurah.verses[0]);
      } else {
        playNext();
      }
    } else {
      // Standard: Play next verse
      playNext();
    }
  };

  return (
    <AudioContext.Provider
      value={{
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
        playVerse,
        pauseAudio,
        resumeAudio,
        togglePlay,
        playNext,
        playPrev,
        setReciterById,
        setPlaybackSpeed,
        setRepeatMode,
        seek,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
