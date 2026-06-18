import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, X, Send, BookOpen, Clock, Lightbulb, Compass, MessageSquare, Flame, RefreshCw 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";

interface Message {
  role: "user" | "model";
  content: string;
}

interface AIAssistantProps {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  verseText: string;
  verseTranslation: string;
  onClose: () => void;
  onSaveNote: (text: string) => void;
}

const THINKING_PHRASES = [
  "Gathering classical tafasir commentary...",
  "Analyzing Arabic root structures...",
  "Translating contextual applications...",
  "Synthesizing moral takeaways...",
  "Reviewing historical narratives (Asbab al-Nuzul)..."
];

export const AIAssistant: React.FC<AIAssistantProps> = ({
  surahNumber,
  surahName,
  ayahNumber,
  verseText,
  verseTranslation,
  onClose,
  onSaveNote
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thinkingIdx, setThinkingIdx] = useState(0);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Rotate thinking phrases in loading state
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setThinkingIdx((prev) => (prev + 1) % THINKING_PHRASES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Fetch initial analysis when verse changes
  useEffect(() => {
    setMessages([]);
    setError(null);
    triggerAnalysis();
  }, [surahNumber, ayahNumber]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const triggerAnalysis = async (customPrompt?: string) => {
    setLoading(true);
    setError(null);
    const textToSend = customPrompt || `Provide classical tafsir, historical context, linguistic insights, and daily applications for Surah ${surahName} (${surahNumber}), Ayah ${ayahNumber}.`;

    const userMsg: Message = { role: "user", content: customPrompt || `Reflecting on Ayah ${ayahNumber}` };
    
    // If it's a follow-up, show on screen
    if (customPrompt) {
      setMessages((prev) => [...prev, userMsg]);
    }

    try {
      const response = await fetch("/api/ai/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surahName,
          surahNumber,
          ayahNumber,
          verseText,
          verseTranslation,
          userMessage: textToSend,
          chatHistory: messages.slice(0, -1) // Excluding current user msg if we just added it
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "The server side is busy. Please verify your internet connection.");
      }

      const data = await response.json();
      const modelMsg: Message = { role: "model", content: data.text || "No insights returned." };
      
      setMessages((prev) => {
        if (!customPrompt) {
          // If initial load, replace initial text to look premium
          return [modelMsg];
        } else {
          return [...prev, modelMsg];
        }
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while communicating with Noor AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;
    const prompt = inputVal.trim();
    setInputVal("");
    triggerAnalysis(prompt);
  };

  const saveToPersonalNotebook = (content: string) => {
    onSaveNote(content);
    alert("Saved successfully to your personal Note Journal!");
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[#fbfbfa] border-l border-slate-200 shadow-2xl z-40 flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 bg-slate-900 text-slate-100 flex items-center justify-between border-b border-emerald-950">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse-slow" />
          <div>
            <h3 className="font-sans font-bold text-sm tracking-tight">Noor AI Reflection</h3>
            <p className="text-[10px] text-emerald-400/80 font-mono tracking-wider">
              STUDY COMPANION • SURAH {surahNumber}:{ayahNumber}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Selected Ayah Banner Context */}
      <div className="p-3 bg-emerald-50/50 border-b border-emerald-100 px-4 text-left">
        <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
          Selected Verse Context
        </span>
        <h4 className="font-arabic text-right text-lg text-slate-900 mt-2 leading-relaxed" dir="rtl">
          {verseText}
        </h4>
        <p className="text-xs text-slate-600 line-clamp-3 mt-1.5 italic">
          &ldquo;{verseTranslation}&rdquo;
        </p>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !loading && !error && (
          <div className="text-center py-8">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 mt-2">No logs found. Click below to start.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-slate-900 text-slate-100 rounded-tr-none px-4 py-2.5 font-sans"
                  : "bg-white border border-slate-200 shadow-sm text-slate-800 rounded-tl-none font-sans"
              }`}
            >
              {msg.role === "model" ? (
                <div className="markdown-body prose max-w-none text-left prose-headings:font-sans prose-headings:font-semibold prose-p:my-1.5 prose-ul:list-disc prose-ul:ml-4 prose-li:my-0.5">
                  <Markdown>{msg.content}</Markdown>
                  
                  {/* Save note helper button inside model message */}
                  <div className="mt-4 pt-3 border-t border-slate-150 flex items-center justify-between">
                    <span className="text-[9px] text-slate-400 font-mono">Commentary powered by Gemini</span>
                    <button
                      onClick={() => saveToPersonalNotebook(`**Surah ${surahName} (${surahNumber}:${ayahNumber}) Reflection:**\n\n${msg.content}`)}
                      className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      Save to Note Journal
                    </button>
                  </div>
                </div>
              ) : (
                <p className="font-medium whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {/* Loading Skeleton */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-none p-4 max-w-[90%] w-full">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
                <span className="text-xs font-semibold text-slate-600 font-sans tracking-tight">
                  {THINKING_PHRASES[thinkingIdx]}
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-100 rounded-full w-full animate-pulse" />
                <div className="h-3 bg-slate-100 rounded-full w-5/6 animate-pulse" />
                <div className="h-3 bg-slate-100 rounded-full w-4/5 animate-pulse" />
                <div className="h-3 bg-slate-100 rounded-full w-11/12 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs text-left">
            <h5 className="font-bold">Offline or Unconfigured Key</h5>
            <p className="mt-1 font-sans text-slate-600">{error}</p>
            <button
              onClick={() => triggerAnalysis()}
              className="mt-2 text-[10px] font-bold text-red-800 uppercase tracking-wider flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3 h-3" /> Retry Analysis
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Recommended Topics Selector - Quick click triggers */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/80 flex gap-2 overflow-x-auto whitespace-nowrap">
        <button
          disabled={loading}
          onClick={() => triggerAnalysis("Can you explain the historical reason of revelation (Asbab Al-Nuzul) for this Surah/verse?")}
          className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] text-slate-600 font-medium hover:border-emerald-500 hover:text-emerald-700 transition"
        >
          🎓 Asbab Al-Nuzul (History)
        </button>
        <button
          disabled={loading}
          onClick={() => triggerAnalysis("What are some deeper secrets and beautiful nuances of Arabic vocabulary, roots, or grammar in this verse?")}
          className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] text-slate-600 font-medium hover:border-emerald-500 hover:text-emerald-700 transition"
        >
          🕌 Linguistic Treasures
        </button>
        <button
          disabled={loading}
          onClick={() => triggerAnalysis("Provide 3 practical, daily personal lessons or actions I can implement from this verse today.")}
          className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] text-slate-600 font-medium hover:border-emerald-500 hover:text-emerald-700 transition"
        >
          🌱 Practical Actions
        </button>
      </div>

      {/* Input Message Footer */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask Noor AI anything about this verse..."
          disabled={loading}
          className="flex-1 px-3 py-2 rounded-xl bg-slate-100 text-xs border border-transparent focus:bg-white focus:border-emerald-500 font-sans focus:outline-none transition"
        />
        <button
          type="submit"
          disabled={loading || !inputVal.trim()}
          className="p-2 bg-emerald-600 rounded-xl text-slate-900 hover:bg-emerald-500 transition active:scale-95 disabled:opacity-55"
        >
          <Send className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>
    </motion.div>
  );
};
