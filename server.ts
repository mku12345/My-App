import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dns from "dns";

// Initialize express app
const app = express();
const PORT = 3000;

app.use(express.json());

// Set up Gemini Client secure lazy-initialization
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Features will be disabled.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "dummy_key",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// SECURE API ENDPOINTS FOR GEMINI
app.post("/api/ai/reflect", async (req: Request, res: Response) => {
  try {
    const { 
      surahName, 
      surahNumber, 
      ayahNumber, 
      verseText, 
      verseTranslation,
      userMessage,
      chatHistory = []
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      res.status(503).json({ 
        error: "Gemini API key is not configured. Please add your GEMINI_API_KEY in the Secrets panel." 
      });
      return;
    }

    const ai = getGeminiClient();

    // Construct a deeply spiritual, highly informative academic and beautiful system instuction
    const systemInstruction = `You are a respectful, deeply knowledgeable, objective, and spiritually sensitive Islamic scholar, linguist, and historian.
Your task is to provide profound tafsir insights, historical context, linguistic treasures, and practical personal reflections for the Qur'an.
The user is selecting Surah ${surahNumber} (${surahName}), Ayah ${ayahNumber}.
Arabic: "${verseText}"
Translation: "${verseTranslation}"

Guidelines:
1. Always maintain the utmost respect and reverence for the sacred text.
2. Structure your response beautifully with clean Markdown, clear sections, and readable spacing.
3. Include:
   - **Tafsir Summary**: Briefly explain the core meaning and divine message of this Ayah.
   - **Historical Context (Asbab al-Nuzul)**: If applicable, discuss when and why this Ayah or Surah was revealed. Otherwise, mention its location (Meccan/Medinan vibes).
   - **Linguistic Jewel**: Point out any beautiful Arabic word roots, rhetorical devices, or linguistic nuances in this Ayah.
   - **Daily Application & Reflection**: Provide concrete, practical actions or moral lessons that the reader can apply to their daily life in the 21st century.
4. If the user asks a subsequent follow-up question, answer it in direct alignment with the verse, classical tafsir (like Ibn Kathir, Al-Jalalayn, or Maariful Quran), and positive moral guidance. Avoid sectarian debates and provide balanced perspectives. Keep formatting clean.`;

    // Setup chat format or content format
    const contents: any[] = [];
    
    // Add chat history
    for (const msg of chatHistory) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage || `Provide details, commentary, and practical reflection for Surah ${surahName} Ayah ${ayahNumber}.` }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Server Error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred while communicating with the AI Study Companion." });
  }
});

// A simple health check route
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// Integrating Vite Dev Server / Static files handler
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite middleware (Development Mode)");
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files from dist/ (Production Mode)");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Noor Al-Qur'an server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start Noor Al-Qur'an server:", err);
});
