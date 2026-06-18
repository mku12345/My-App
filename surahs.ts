import { Surah, Reciter, Verse } from "../types";

export const RECITERS: Reciter[] = [
  {
    id: "ar.alafasy",
    name: "Mishary Rashid Alafasy",
    arabicName: "مشاري راشد العفاسي",
    description: "Renowned Kuwaiti Qari known for his beautiful melodic voice and precise control.",
    style: "Murattal",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy"
  },
  {
    id: "ar.abdurrahmaansudaes",
    name: "Abdur-Rahman As-Sudais",
    arabicName: "عبد الرحمن السديس",
    description: "Imam of Masjid Al-Haram in Makkah, famous for his distinctive fast, emotive, and classic style.",
    style: "Murattal",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.abdurrahmaansudaes"
  },
  {
    id: "ar.mahermuaiqly",
    name: "Maher Al-Muaiqly",
    arabicName: "ماهر المعيقلي",
    description: "Imam of Masjid Al-Haram, loved worldwide for his soothing, crisp, and high-clarity recitation.",
    style: "Murattal",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.mahermuaiqly"
  },
  {
    id: "ar.saadalgamdi",
    name: "Saad Al-Ghamdi",
    arabicName: "سعد الغامدي",
    description: "Highly popular reciter from Saudi Arabia known for his deep, spiritual, and emotional delivery.",
    style: "Murattal",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.saadalgamdi"
  },
  {
    id: "ar.abdulbasitmujawwad",
    name: "Abdul Basit Abdus Samad",
    arabicName: "عبد الباسط عبد الصمد",
    description: "Historical Egyptian grand master, standard-bearer of the slow, magnificent, power-breathing style.",
    style: "Mujawwad",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmujawwad"
  },
  {
    id: "ar.husary",
    name: "Mahmoud Khalil Al-Husary",
    arabicName: "محمود خليل الحصري",
    description: "Egyptian master of canonical pronunciation. Regarded as the absolute reference for perfect Tajweed rules.",
    style: "Murattal",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.husary"
  },
  {
    id: "ar.yasseraldossari",
    name: "Yasser Al-Dosari",
    arabicName: "ياسر الدوسري",
    description: "Imam of Masjid Al-Haram, popular among the youth for his highly energetic, rich, and moving tone.",
    style: "Murattal",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.yasseraldossari"
  },
  {
    id: "ar.minshawi",
    name: "Mohamed Siddiq Al-Minshawi",
    arabicName: "محمد صديق المنشاوي",
    description: "Classic Egyptian reciter celebrated for his profound spiritual depth, often called the 'crying voice'.",
    style: "Murattal",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.minshawi"
  },
  {
    id: "ar.shaatree",
    name: "Abu Bakr Al-Shatri",
    arabicName: "أبو بكر الشاطري",
    description: "Leading Saudi Qari famous for his modern, serene, very calming, and slow style of recitation.",
    style: "Murattal",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.shaatree"
  },
  {
    id: "ar.shuraym",
    name: "Saud Al-Shuraim",
    arabicName: "سعود الشريم",
    description: "Prominent former Imam of Holy Kaaba, known for his fast, powerful, and majestic classic recitation.",
    style: "Murattal",
    baseUrl: "https://cdn.islamic.network/quran/audio/128/ar.shuraym"
  }
];

export const SURAH_INDEX: Surah[] = [
  { number: 1, name: "سُورَةُ الْفَاتِحَةِ", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "سُورَةُ الْبَقَرَةِ", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 3, name: "سُورَةُ آلِ عِمْرَانَ", englishName: "Ali 'Imran", englishNameTranslation: "Family of Imran", numberOfAyahs: 200, revelationType: "Medinan" },
  { number: 4, name: "سُورَةُ النِّسَاءِ", englishName: "An-Nisa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan" },
  { number: 5, name: "سُورَةُ الْمَائِدَةِ", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan" },
  { number: 6, name: "سُورَةُ الْأَنْعَامِ", englishName: "Al-An'am", englishNameTranslation: "The Cattle", numberOfAyahs: 165, revelationType: "Meccan" },
  { number: 7, name: "سُورَةُ الْأَعْرَافِ", englishName: "Al-A'raf", englishNameTranslation: "The Heights", numberOfAyahs: 206, revelationType: "Meccan" },
  { number: 8, name: "سُورَةُ الْأَنْفَالِ", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", numberOfAyahs: 75, revelationType: "Medinan" },
  { number: 9, name: "سُورَةُ التَّوْبَةِ", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", numberOfAyahs: 129, revelationType: "Medinan" },
  { number: 10, name: "سُورَةُ يُونُسَ", englishName: "Yunus", englishNameTranslation: "Jonah", numberOfAyahs: 109, revelationType: "Meccan" },
  { number: 11, name: "سُورَةُ هُودٍ", englishName: "Hud", englishNameTranslation: "Hud", numberOfAyahs: 123, revelationType: "Meccan" },
  { number: 12, name: "سُورَةُ يُوسُفَ", englishName: "Yusuf", englishNameTranslation: "Joseph", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 13, name: "سُورَةُ الرَّعْدِ", englishName: "Ar-Ra'd", englishNameTranslation: "The Thunder", numberOfAyahs: 43, revelationType: "Medinan" },
  { number: 14, name: "سُورَةُ إِبْرَاهِيمَ", englishName: "Ibrahim", englishNameTranslation: "Abraham", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 15, name: "سُورَةُ الْحِجْرِ", englishName: "Al-Hijr", englishNameTranslation: "The Rocky Tract", numberOfAyahs: 99, revelationType: "Meccan" },
  { number: 16, name: "سُورَةُ النَّحْلِ", englishName: "An-Nahl", englishNameTranslation: "The Bee", numberOfAyahs: 128, revelationType: "Meccan" },
  { number: 17, name: "سُورَةُ الْإِسْرَاءِ", englishName: "Al-Isra", englishNameTranslation: "The Night Journey", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 18, name: "سُورَةُ الْكَهْفِ", englishName: "Al-Kahf", englishNameTranslation: "The Cave", numberOfAyahs: 110, revelationType: "Meccan" },
  { number: 19, name: "سُورَةُ مَرْيَمَ", englishName: "Maryam", englishNameTranslation: "Mary", numberOfAyahs: 98, revelationType: "Meccan" },
  { number: 20, name: "سُورَةُ طه", englishName: "Taha", englishNameTranslation: "Ta-Ha", numberOfAyahs: 135, revelationType: "Meccan" },
  { number: 21, name: "سُورَةُ الْأَنْبِيَاءِ", englishName: "Al-Anbiya", englishNameTranslation: "The Prophets", numberOfAyahs: 112, revelationType: "Meccan" },
  { number: 22, name: "سُورَةُ الْحَجِّ", englishName: "Al-Hajj", englishNameTranslation: "The Pilgrimage", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 23, name: "سُورَةُ الْمُؤْمِنُونَ", englishName: "Al-Mu'minun", englishNameTranslation: "The Believers", numberOfAyahs: 118, revelationType: "Meccan" },
  { number: 24, name: "سُورَةُ النُّورِ", englishName: "An-Nur", englishNameTranslation: "The Light", numberOfAyahs: 64, revelationType: "Medinan" },
  { number: 25, name: "سُورَةُ الْفُرْقَانِ", englishName: "Al-Furqan", englishNameTranslation: "The Criterion", numberOfAyahs: 77, revelationType: "Meccan" },
  { number: 26, name: "سُورَةُ الشُّعَرَاءِ", englishName: "Ash-Shu'ara", englishNameTranslation: "The Poets", numberOfAyahs: 227, revelationType: "Meccan" },
  { number: 27, name: "سُورَةُ النَّمْلِ", englishName: "An-Naml", englishNameTranslation: "The Ant", numberOfAyahs: 93, revelationType: "Meccan" },
  { number: 28, name: "سُورَةُ الْقَصَصِ", englishName: "Al-Qasas", englishNameTranslation: "The Stories", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 29, name: "سُورَةُ الْعَنْكَبُوتِ", englishName: "Al-`Ankabut", englishNameTranslation: "The Spider", numberOfAyahs: 69, revelationType: "Meccan" },
  { number: 30, name: "سُورَةُ الرُّومِ", englishName: "Ar-Rum", englishNameTranslation: "The Romans", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 31, name: "سُورَةُ لُقْمَانَ", englishName: "Luqman", englishNameTranslation: "Luqman", numberOfAyahs: 34, revelationType: "Meccan" },
  { number: 32, name: "سُورَةُ السَّجْدَةِ", englishName: "As-Sajdah", englishNameTranslation: "The Prostration", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 33, name: "سُورَةُ الْأَحْزَابِ", englishName: "Al-Ahzab", englishNameTranslation: "The Combined Forces", numberOfAyahs: 73, revelationType: "Medinan" },
  { number: 34, name: "سُورَةُ سَبَإٍ", englishName: "Saba", englishNameTranslation: "Sheba", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 35, name: "سُورَةُ فَاطِرٍ", englishName: "Fatir", englishNameTranslation: "The Originator", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 36, name: "سُورَةُ يس", englishName: "Ya-Sin", englishNameTranslation: "Ya-Sin", numberOfAyahs: 83, revelationType: "Meccan" },
  { number: 37, name: "سُورَةُ الصَّافَّاتِ", englishName: "As-Saffat", englishNameTranslation: "Those Who Set The Ranks", numberOfAyahs: 182, revelationType: "Meccan" },
  { number: 38, name: "سُورَةُ ص", englishName: "Sad", englishNameTranslation: "The Letter Sad", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 39, name: "سُورَةُ الزُّمَرِ", englishName: "Az-Zumar", englishNameTranslation: "The Groups", numberOfAyahs: 75, revelationType: "Meccan" },
  { number: 40, name: "سُورَةُ غَافِرٍ", englishName: "Ghafir", englishNameTranslation: "The Forgiver", numberOfAyahs: 85, revelationType: "Meccan" },
  { number: 41, name: "سُورَةُ فُصِّلَتْ", englishName: "Fussilat", englishNameTranslation: "Explained In Detail", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 42, name: "سُورَةُ الشُّورَىٰ", englishName: "Ash-Shura", englishNameTranslation: "The Consultation", numberOfAyahs: 53, revelationType: "Meccan" },
  { number: 43, name: "سُورَةُ الزُّخْرُفِ", englishName: "Az-Zukhruf", englishNameTranslation: "The Ornaments of Gold", numberOfAyahs: 89, revelationType: "Meccan" },
  { number: 44, name: "سُورَةُ الدُّخَانِ", englishName: "Ad-Dukhan", englishNameTranslation: "The Smoke", numberOfAyahs: 59, revelationType: "Meccan" },
  { number: 45, name: "سُورَةُ الْجَاثِيَةِ", englishName: "Al-Jathiyah", englishNameTranslation: "The Crouching", numberOfAyahs: 37, revelationType: "Meccan" },
  { number: 46, name: "سُورَةُ الْأَحْقَافِ", englishName: "Al-Ahqaf", englishNameTranslation: "The Wind-Curved Sandhills", numberOfAyahs: 35, revelationType: "Meccan" },
  { number: 47, name: "سُورَةُ مُحَمَّدٍ", englishName: "Muhammad", englishNameTranslation: "Muhammad", numberOfAyahs: 38, revelationType: "Medinan" },
  { number: 48, name: "سُورَةُ الْفَتْحِ", englishName: "Al-Fath", englishNameTranslation: "The Victory", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 49, name: "سُورَةُ الْحُجُرَاتِ", englishName: "Al-Hujurat", englishNameTranslation: "The Dwellings", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 50, name: "سُورَةُ ق", englishName: "Qaf", englishNameTranslation: "The Letter Qaf", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 51, name: "سُورَةُ الذَّارِيَاتِ", englishName: "Adh-Dhariyat", englishNameTranslation: "The Winnowing Winds", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 52, name: "سُورَةُ الطُّورِ", englishName: "At-Tur", englishNameTranslation: "The Mount", numberOfAyahs: 49, revelationType: "Meccan" },
  { number: 53, name: "سُورَةُ النَّجْمِ", englishName: "An-Najm", englishNameTranslation: "The Star", numberOfAyahs: 62, revelationType: "Meccan" },
  { number: 54, name: "سُورَةُ الْقَمَرِ", englishName: "Al-Qamar", englishNameTranslation: "The Moon", numberOfAyahs: 55, revelationType: "Meccan" },
  { number: 55, name: "سُورَةُ الرَّحْمَٰنِ", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 56, name: "سُورَةُ الْوَاقِعَةِ", englishName: "Al-Waqi'ah", englishNameTranslation: "The Inevitable", numberOfAyahs: 96, revelationType: "Meccan" },
  { number: 57, name: "سُورَةُ الْحَدِيدِ", englishName: "Al-Hadid", englishNameTranslation: "The Iron", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 58, name: "سُورَةُ الْمُجَادِلَةِ", englishName: "Al-Mujadilah", englishNameTranslation: "The Pleading Woman", numberOfAyahs: 22, revelationType: "Medinan" },
  { number: 59, name: "سُورَةُ الْحَشْرِ", englishName: "Al-Hashr", englishNameTranslation: "The Exile", numberOfAyahs: 24, revelationType: "Medinan" },
  { number: 60, name: "سُورَةُ الْمُمْتَحَنَةِ", englishName: "Al-Mumtahanah", englishNameTranslation: "She That Is To Be Examined", numberOfAyahs: 13, revelationType: "Medinan" },
  { number: 61, name: "سُورَةُ الصَّفِّ", englishName: "As-Saff", englishNameTranslation: "The Ranks", numberOfAyahs: 14, revelationType: "Medinan" },
  { number: 62, name: "سُورَةُ الْجُمُعَةِ", englishName: "Al-Jumu'ah", englishNameTranslation: "The Congregation", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 63, name: "سُورَةُ الْمُنَافِقُونَ", englishName: "Al-Munafiqun", englishNameTranslation: "The Hypocrites", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 64, name: "سُورَةُ التَّغَابُنِ", englishName: "At-Taghabun", englishNameTranslation: "The Mutual Disillusion", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 65, name: "سُورَةُ الطَّلَاقِ", englishName: "At-Talaq", englishNameTranslation: "The Divorce", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 66, name: "سُورَةُ التَّحْرِيمِ", englishName: "At-Tahrim", englishNameTranslation: "The Prohibition", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 67, name: "سُورَةُ الْمُلْكِ", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 68, name: "سُورَةُ الْقَلَمِ", englishName: "Al-Qalam", englishNameTranslation: "The Pen", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 69, name: "سُورَةُ الْحَاقَّةِ", englishName: "Al-Haqqah", englishNameTranslation: "The Reality", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 70, name: "سُورَةُ الْمَعَارِجِ", englishName: "Al-Ma'arij", englishNameTranslation: "The Ascending Stairways", numberOfAyahs: 44, revelationType: "Meccan" },
  { number: 71, name: "سُورَةُ نُوحٍ", englishName: "Nuh", englishNameTranslation: "Noah", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 72, name: "سُورَةُ الْجِنِّ", englishName: "Al-Jinn", englishNameTranslation: "The Jinn", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 73, name: "سُورَةُ الْمُزَّمِّلِ", englishName: "Al-Muzzammil", englishNameTranslation: "The Enshrouded One", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 74, name: "سُورَةُ الْمُدَّثِّرِ", englishName: "Al-Muddaththir", englishNameTranslation: "The Cloaked One", numberOfAyahs: 56, revelationType: "Meccan" },
  { number: 75, name: "سُورَةُ الْقِيَامَةِ", englishName: "Al-Qiyamah", englishNameTranslation: "The Resurrection", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 76, name: "سُورَةُ الْإِنْسَانِ", englishName: "Al-Insan", englishNameTranslation: "The Man", numberOfAyahs: 31, revelationType: "Medinan" },
  { number: 77, name: "سُورَةُ الْمُرْسَلَاتِ", englishName: "Al-Mursalat", englishNameTranslation: "The Emissaries", numberOfAyahs: 50, revelationType: "Meccan" },
  { number: 78, name: "سُورَةُ النَّبَإِ", englishName: "An-Naba", englishNameTranslation: "The Announcement", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 79, name: "سُورَةُ النَّازِعَاتِ", englishName: "An-Nazi'at", englishNameTranslation: "Those Who Drag Forth", numberOfAyahs: 46, revelationType: "Meccan" },
  { number: 80, name: "سُورَةُ عَبَسَ", englishName: "`Abasa", englishNameTranslation: "He Frowned", numberOfAyahs: 42, revelationType: "Meccan" },
  { number: 81, name: "سُورَةُ التَّكْوِيرِ", englishName: "At-Takwir", englishNameTranslation: "The Overthrowing", numberOfAyahs: 29, revelationType: "Meccan" },
  { number: 82, name: "سُورَةُ الِانْفِطَارِ", englishName: "Al-Infitar", englishNameTranslation: "The Cleaving", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 83, name: "سُورَةُ الْمُطَفِّفِينَ", englishName: "Al-Mutaffifin", englishNameTranslation: "The Defrauders", numberOfAyahs: 36, revelationType: "Meccan" },
  { number: 84, name: "سُورَةُ الِانْشِقَاقِ", englishName: "Al-Inshiqaq", englishNameTranslation: "The Sundering", numberOfAyahs: 25, revelationType: "Meccan" },
  { number: 85, name: "سُورَةُ الْبُرُوجِ", englishName: "Al-Buruj", englishNameTranslation: "The Mansions of the Stars", numberOfAyahs: 22, revelationType: "Meccan" },
  { number: 86, name: "سُورَةُ الطَّارِقِ", englishName: "At-Tariq", englishNameTranslation: "The Morning Star", numberOfAyahs: 17, revelationType: "Meccan" },
  { number: 87, name: "سُورَةُ الْأَعْلَىٰ", englishName: "Al-A'la", englishNameTranslation: "The Most High", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 88, name: "سُورَةُ الْغَاشِيَةِ", englishName: "Al-Ghashiyah", englishNameTranslation: "The Overwhelming", numberOfAyahs: 26, revelationType: "Meccan" },
  { number: 89, name: "سُورَةُ الْفَجْرِ", englishName: "Al-Fajr", englishNameTranslation: "The Dawn", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 90, name: "سُورَةُ الْبَلَدِ", englishName: "Al-Balad", englishNameTranslation: "The City", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 91, name: "سُورَةُ الشَّمْسِ", englishName: "Ash-Shams", englishNameTranslation: "The Sun", numberOfAyahs: 15, revelationType: "Meccan" },
  { number: 92, name: "سُورَةُ اللَّيْلِ", englishName: "Al-Lail", englishNameTranslation: "The Night", numberOfAyahs: 21, revelationType: "Meccan" },
  { number: 93, name: "سُورَةُ الضُّحَىٰ", englishName: "Ad-Duha", englishNameTranslation: "The Morning Hours", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 94, name: "سُورَةُ الشَّرْحِ", englishName: "Ash-Sharh", englishNameTranslation: "The Consolation", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 95, name: "سُورَةُ التِّينِ", englishName: "At-Tin", englishNameTranslation: "The Fig", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 96, name: "سُورَةُ الْعَلَقِ", englishName: "Al-'Alaq", englishNameTranslation: "The Clot", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 97, name: "سُورَةُ الْقَدْرِ", englishName: "Al-Qadr", englishNameTranslation: "The Power", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 98, name: "سُورَةُ الْبَيِّنَةِ", englishName: "Al-Bayyinah", englishNameTranslation: "The Clear Proof", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 99, name: "سُورَةُ الزَّلْزَلَةِ", englishName: "Az-Zalzalah", englishNameTranslation: "The Earthquake", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 100, name: "سُورَةُ الْعَادِيَاتِ", englishName: "Al-'Adiyat", englishNameTranslation: "The Courser", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 101, name: "سُورَةُ الْقَارِعَةِ", englishName: "Al-Qari'ah", englishNameTranslation: "The Calamity", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 102, name: "سُورَةُ التَّكَاثُرِ", englishName: "At-Takathur", englishNameTranslation: "The Rivalry in World Increase", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 103, name: "سُورَةُ الْعَصْرِ", englishName: "Al-'Asr", englishNameTranslation: "The Declining Day", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 104, name: "سُورَةُ الْهُمَزَةِ", englishName: "Al-Humazah", englishNameTranslation: "The Slanderer", numberOfAyahs: 9, revelationType: "Meccan" },
  { number: 105, name: "سُورَةُ الْفِيلِ", englishName: "Al-Fil", englishNameTranslation: "The Elephant", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 106, name: "سُورَةُ قُرَيْشٍ", englishName: "Quraysh", englishNameTranslation: "Quraysh", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 107, name: "سُورَةُ الْمَاعُونَ", englishName: "Al-Ma'un", englishNameTranslation: "The Small Kindnesses", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 108, name: "سُورَةُ الْكَوْثَرِ", englishName: "Al-Kawthar", englishNameTranslation: "The Abundance", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 109, name: "سُورَةُ الْكافِرُونَ", englishName: "Al-Kafirun", englishNameTranslation: "The Disbelievers", numberOfAyahs: 6, revelationType: "Meccan" },
  { number: 110, name: "سُورَةُ النَّصْرِ", englishName: "An-Nasr", englishNameTranslation: "The Divine Support", numberOfAyahs: 3, revelationType: "Medinan" },
  { number: 111, name: "سُورَةُ الْمَسَدِ", englishName: "Al-Masad", englishNameTranslation: "The Palm Fiber", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 112, name: "سُورَةُ الْإِخْلَاصِ", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 113, name: "سُورَةُ الْفَلَقِ", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 114, name: "سُورَةُ النَّاسِ", englishName: "An-Nas", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "Meccan" }
];

export const AYAT_AL_KURSI: Verse = {
  number: 255,
  numberInQuran: 262,
  text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
  translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
  transliteration: "Allahu la ilaha illa huwal hayyul qayyum, la ta'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard, man dhal-ladhi yashfa'u 'indahu illa bi-idhnihi, ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay'im-min 'ilmihi illa bima sha', wasi'a kursiyyuhus-samawati wal-arda, wa la ya'uduhu hifdhuhuma, wa huwal 'aliyyul 'adheem.",
  juz: 3,
  page: 42
};

export const OFFLINE_SURAH_DATA: Record<number, Verse[]> = {
  // Surah 1: Al-Fatihah
  1: [
    {
      number: 1,
      numberInQuran: 1,
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      transliteration: "Bismillaahir Rahmaanir Raheem",
      juz: 1,
      page: 1
    },
    {
      number: 2,
      numberInQuran: 2,
      text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "[All] praise is [due] to Allah, Lord of the worlds -",
      transliteration: "Alhamdu lillaahi Rabbil 'aalameen",
      juz: 1,
      page: 1
    },
    {
      number: 3,
      numberInQuran: 3,
      text: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Entirely Merciful, the Especially Merciful,",
      transliteration: "Ar-Rahmaanir-Raheem",
      juz: 1,
      page: 1
    },
    {
      number: 4,
      numberInQuran: 4,
      text: "مَالِكِ يَوْمِ الدِّينِ",
      translation: "Sovereign of the Day of Recompense.",
      transliteration: "Maaliki Yawmid-Deen",
      juz: 1,
      page: 1
    },
    {
      number: 5,
      numberInQuran: 5,
      text: "إِيَّاكَا نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      translation: "It is You we worship and You we ask for help.",
      transliteration: "Iyyaaka na'budu wa iyyaaka nasta'een",
      juz: 1,
      page: 1
    },
    {
      number: 6,
      numberInQuran: 6,
      text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      translation: "Guide us to the straight path -",
      transliteration: "Ihdinas-Siraatal-Mustaqeem",
      juz: 1,
      page: 1
    },
    {
      number: 7,
      numberInQuran: 7,
      text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
      transliteration: "Siraatal-ladheena an'amta 'alayhim ghairil-maghdoobi 'alayhim wa lad-daalleen",
      juz: 1,
      page: 1
    }
  ],

  // Surah 112: Al-Ikhlas
  112: [
    {
      number: 1,
      numberInQuran: 6222,
      text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      translation: "Say, 'He is Allah, [who is] One,",
      transliteration: "Qul huwal-Laahu Ahad",
      juz: 30,
      page: 604
    },
    {
      number: 2,
      numberInQuran: 6223,
      text: "اللَّهُ الصَّمَدُ",
      translation: "Allah, the Eternal Refuge.",
      transliteration: "Allahus-Samad",
      juz: 30,
      page: 604
    },
    {
      number: 3,
      numberInQuran: 6224,
      text: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      translation: "He neither begets nor is born,",
      transliteration: "Lam yalid wa lam yoolad",
      juz: 30,
      page: 604
    },
    {
      number: 4,
      numberInQuran: 6225,
      text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      translation: "Nor is there to Him any equivalent.'",
      transliteration: "Wa lam yakul-lahu kufuwan ahad",
      juz: 30,
      page: 604
    }
  ],

  // Surah 113: Al-Falaq
  113: [
    {
      number: 1,
      numberInQuran: 6226,
      text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
      translation: "Say, 'I seek refuge in the Lord of daybreak",
      transliteration: "Qul a'oodhu bi Rabbil-Falaq",
      juz: 30,
      page: 604
    },
    {
      number: 2,
      numberInQuran: 6227,
      text: "مِن شَرِّ مَا خَلَقَ",
      translation: "From the evil of that which He created",
      transliteration: "Min sharri ma khalaq",
      juz: 30,
      page: 604
    },
    {
      number: 3,
      numberInQuran: 6228,
      text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      translation: "And from the evil of darkness when it settles",
      transliteration: "Wa min sharri ghaasiqin idhaa waqab",
      juz: 30,
      page: 604
    },
    {
      number: 4,
      numberInQuran: 6229,
      text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
      translation: "And from the evil of the blowers in knots",
      transliteration: "Wa min sharrin-naffaathaati fil-'uqad",
      juz: 30,
      page: 604
    },
    {
      number: 5,
      numberInQuran: 6230,
      text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      translation: "And from the evil of an envier when he envies.'",
      transliteration: "Wa min sharri haasidin idhaa hasad",
      juz: 30,
      page: 604
    }
  ],

  // Surah 114: An-Nas
  114: [
    {
      number: 1,
      numberInQuran: 6231,
      text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      translation: "Say, 'I seek refuge in the Lord of mankind,",
      transliteration: "Qul a'oodhu bi Rabbin-Naas",
      juz: 30,
      page: 604
    },
    {
      number: 2,
      numberInQuran: 6232,
      text: "مَلِكِ النَّاسِ",
      translation: "The Sovereign of mankind,",
      transliteration: "Malikin-Naas",
      juz: 30,
      page: 604
    },
    {
      number: 3,
      numberInQuran: 6233,
      text: "إِلَٰهِ النَّاسِ",
      translation: "The God of mankind,",
      transliteration: "Ilaahin-Naas",
      juz: 30,
      page: 604
    },
    {
      number: 4,
      numberInQuran: 6234,
      text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      translation: "From the evil of the retreating whisperer -",
      transliteration: "Min sharril-waswaasil-khannaas",
      juz: 30,
      page: 604
    },
    {
      number: 5,
      numberInQuran: 6235,
      text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
      translation: "Who whispers [evil] into the breasts of mankind -",
      transliteration: "Alladhee yuwaswisu fee sudoorin-naas",
      juz: 30,
      page: 604
    },
    {
      number: 6,
      numberInQuran: 6236,
      text: "مِنَ الْجِنَّةِ وَالنَّاسِ",
      translation: "From among the jinn and mankind.'",
      transliteration: "Minal-jinnati wan-naas",
      juz: 30,
      page: 604
    }
  ]
};

// Returns verse offset count before a given Surah number to calculate absolute numberInQuran (1 to 6236)
export function getAbsoluteVerseOffset(surahNum: number): number {
  let count = 0;
  for (let i = 1; i < surahNum; i++) {
    const s = SURAH_INDEX.find(x => x.number === i);
    if (s) count += s.numberOfAyahs;
  }
  return count;
}
