import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/api/*', cors())

// ============================================
// ROUTES
// ============================================
app.get('/', (c) => c.html(LANDING_HTML))
app.get('/app', (c) => c.html(APP_HTML))

// ============================================
// API ROUTES
// ============================================
app.post('/api/analyze', async (c) => {
  const { message, mode, history } = await c.req.json()
  const response = generateStrategicResponse(message, mode || 'strategic', history || [])
  return c.json({ response, timestamp: new Date().toISOString(), mode, tokens: Math.floor(Math.random() * 200) + 100 })
})

app.post('/api/swot', async (c) => {
  const { business } = await c.req.json()
  return c.json({ response: generateSWOT(business), timestamp: new Date().toISOString() })
})

app.post('/api/coach', async (c) => {
  const { goal, currentState, obstacles } = await c.req.json()
  return c.json({ response: generateCoachResponse(goal, currentState, obstacles), timestamp: new Date().toISOString() })
})

app.get('/api/resources', (c) => c.json({ resources: RESOURCES_DATA }))
app.get('/api/insights', (c) => c.json({ insights: INSIGHTS_DATA }))
app.get('/api/quotes', (c) => {
  const q = QUOTES_DATA[Math.floor(Math.random() * QUOTES_DATA.length)]
  return c.json(q)
})
app.get('/api/health', (c) => c.json({
  status: 'ok', service: 'SparkMind V5.0 SOVEREIGN API', version: '5.0.0',
  engine: 'Sovereign AI Engine V5', categories: 18,
  features: ['chat-memory-persist','mobile-sidebar-fix','backup-restore-json','weekly-trend-chart','pomodoro-v2','smart-delete-modal','debounced-search','keyboard-shortcuts','spiritual-faith','side-hustle','animated-counters','micro-interactions']
}))

// ============================================
// AI STRATEGIC ENGINE V5 — 18+ CATEGORIES
// ============================================
function generateStrategicResponse(message: string, mode: string, history: any[]): string {
  const m = message.toLowerCase()
  const ctx = history.length > 0 ? `<div class="mb-3"><span class="text-[10px] bg-white/5 text-gray-500 px-2 py-0.5 rounded border border-white/5">💭 Context: ${history.length} pesan sebelumnya</span></div>` : ''

  if (mode === 'swot') return generateSWOT(message)
  if (mode === 'mindmap') return generateMindMap(message)
  if (mode === 'coach') return generateCoachResponse(message, '', '')

  const badge = (label: string, color: string, extra?: string) => `<span class="px-2.5 py-1 bg-${color}-500/10 text-${color}-400 rounded-lg text-xs font-bold border border-${color}-500/20">${label}</span>${extra ? `<span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">${extra}</span>` : ''}`
  const step = (n: number, color: string, title: string, desc: string) => `<div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] hover:border-${color}-500/20 transition-all"><span class="w-8 h-8 bg-${color}-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-${color}-500/20">${n}</span><div><p class="font-bold text-white text-sm">${title}</p><p class="text-gray-400 text-xs mt-1.5 leading-relaxed">${desc}</p></div></div>`
  const insight = (color: string, label: string, text: string) => `<div class="bg-gradient-to-r from-${color}-500/10 to-${color}-600/10 border border-${color}-500/20 rounded-xl p-4"><p class="text-${color}-400 text-xs font-bold">${label}</p><p class="text-gray-300 text-sm mt-1">${text}</p></div>`

  // Business
  if (m.match(/bisnis|usaha|jualan|startup|toko|online shop|e-commerce|dropship|franchise|modal|revenue|monetisasi|market/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2 flex-wrap">${badge('BISNIS','blue','V5 ENGINE')}</div>
      <p class="font-bold text-white text-lg">Deep Strategic Analysis: Memulai & Mengembangkan Bisnis</p>
      <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4"><p class="text-blue-400 text-xs font-bold mb-2">EXECUTIVE SUMMARY</p><p class="text-gray-300 text-sm">67% startup gagal karena tidak validasi pasar. Berikut <strong class="text-white">proven framework</strong> dari 500+ startup sukses:</p></div>
      <div class="space-y-3">
        ${step(1,'blue','Market Validation Sprint (Minggu 1-2)','Riset 5 kompetitor. Interview 15-20 calon customer via WA/IG. Identifikasi pain point terbesar. Hypothesis: "Orang bayar Rp X untuk Y".')}
        ${step(2,'blue','MVP Launch (Minggu 3-4)','Buat produk paling sederhana. Gunakan tools gratis: Canva, WA Business, IG Shop. Launch ke 50 orang. Kumpulkan feedback.')}
        ${step(3,'blue','Growth Engine (Bulan 2-3)','Content marketing 3x/minggu. Referral system diskon 20%. Paid ads Rp 50K/hari di IG. Target: 50 paying customers dalam 90 hari.')}
        ${step(4,'blue','Scale & Systemize (Bulan 4-6)','Buat SOP setiap proses. Hire 1 orang operasional. Diversifikasi 1-2 produk. Target MRR: Rp 5-10 jt/bulan.')}
      </div>
      ${insight('amber','SOVEREIGN INSIGHT','"Revenue is oxygen for business. Don\'t build in silence — sell first, build later."')}</div>`
  }

  // Productivity
  if (m.match(/produktivitas|produktif|fokus|wfh|manajemen waktu|time management|procrastina|malas|distraksi/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2 flex-wrap">${badge('PRODUKTIVITAS','emerald','V5 ENGINE')}</div>
      <p class="font-bold text-white text-lg">Sistem Produktivitas Tingkat Tinggi</p>
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4"><p class="text-emerald-400 text-xs font-bold mb-2">ROOT CAUSE</p><p class="text-gray-300 text-sm">3 akar: <strong class="text-white">kurang struktur</strong>, <strong class="text-white">distraksi</strong>, atau <strong class="text-white">energy management buruk</strong>.</p></div>
      <div class="space-y-3">
        ${step(1,'emerald','Deep Work Protocol','Blok 90 menit tanpa gangguan. HP silent, notif off. Otak butuh 23 menit untuk refocus setelah distraksi.')}
        ${step(2,'emerald','MIT Method','Setiap pagi, tentukan 1 tugas TERPENTING. Kerjakan PERTAMA sebelum buka email. Boost produktivitas 2x.')}
        ${step(3,'emerald','Energy Management','Tidur 7-8 jam, olahraga 3x/minggu. CEO top prioritaskan kesehatan = fondasi performa.')}
        ${step(4,'emerald','Pomodoro + Time Blocking','25m fokus, 5m istirahat. 4 siklus = 15-30m break. Block kalender. Gunakan Pomodoro V2 SparkMind!')}
      </div>
      ${insight('purple','QUICK WIN','Matikan notifikasi HP, kerjakan 1 MIT selama 90 menit pertama hari. Dalam 1 minggu, rasakan perbedaannya.')}</div>`
  }

  // Tech
  if (m.match(/programming|coding|developer|belajar|roadmap|javascript|python|react|web|ai|machine learning|data|tech|software/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2 flex-wrap">${badge('TECH & SKILL','purple','V5 ENGINE')}</div>
      <p class="font-bold text-white text-lg">Learning Roadmap: Nol ke Developer Profesional</p>
      <div class="bg-purple-500/5 border border-purple-500/10 rounded-xl p-4"><p class="text-purple-400 text-xs font-bold mb-2">MARKET INSIGHT</p><p class="text-gray-300 text-sm">Developer junior Indonesia: Rp 6-15 jt/bulan. Freelance: Rp 10-50 jt/project. AI engineer: Rp 20-60 jt/bulan.</p></div>
      <div class="space-y-3">
        ${step(1,'purple','Foundation (Bulan 1)','HTML + CSS + JS dasar. 3 mini project. freeCodeCamp, The Odin Project.')}
        ${step(2,'purple','Framework Mastery (Bulan 2-3)','React atau Next.js. 2 real project. API integration & state management.')}
        ${step(3,'purple','Portfolio & Job Hunt (Bulan 4-5)','Portfolio website + 3 showcase + GitHub aktif. Apply LinkedIn, Glints, Upwork.')}
        ${step(4,'purple','Monetize & Specialize (Bulan 6+)','Target Rp 5-15 jt/bulan. Specialize: AI/ML, mobile, cloud. Build SaaS.')}
      </div>
      ${insight('cyan','DAILY PROTOCOL','Minimal 2 jam belajar + 1 jam coding/hari. 100 hari konsisten = lebih baik dari 90% pemula.')}</div>`
  }

  // Career
  if (m.match(/karir|promosi|gaji|jabatan|interview|resign|pindah kerja|cv|resume|lowongan|kerja/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('KARIR','amber','V5')}</div>
      <p class="font-bold text-white text-lg">Career Acceleration Framework</p>
      <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4"><p class="text-amber-400 text-xs font-bold mb-2">INSIGHT</p><p class="text-gray-300 text-sm">80% promosi ditentukan <strong class="text-white">visibility + relationship</strong>, bukan hanya hard skill.</p></div>
      <div class="space-y-3">
        ${step(1,'amber','Visibility Strategy','Share progress di meeting, dokumentasi achievements, volunteer project high-impact.')}
        ${step(2,'amber','Skill Stacking','Kombinasi skill unik = rare & valuable. Technical + Communication = pemimpin.')}
        ${step(3,'amber','Strategic Networking','Build relationship dengan 3 decision makers. 1-on-1: "What would it take for me to get promoted?"')}
      </div>
      ${insight('rose','ACTION','Jadwalkan coffee chat dengan 1 senior leader minggu ini.')}</div>`
  }

  // Finance
  if (m.match(/uang|keuangan|tabung|investasi|finansial|hutang|income|nabung|saham|crypto|reksadana|budgeting/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('FINANSIAL','emerald')}</div>
      <p class="font-bold text-white text-lg">Financial Independence Blueprint</p>
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4"><p class="text-emerald-400 text-xs font-bold mb-2">INSIGHT</p><p class="text-gray-300 text-sm">Rata-rata orang Indonesia menabung &lt;10% income. Dengan strategi ini, emergency fund dalam 6 bulan.</p></div>
      <div class="space-y-3">
        ${step(1,'emerald','Financial Audit','Track SEMUA pengeluaran 30 hari. "Can\'t manage what you don\'t measure."')}
        ${step(2,'emerald','Emergency Fund First','Target 3-6 bulan pengeluaran. Rekening terpisah. Prioritas #1.')}
        ${step(3,'emerald','Multiple Income','Side hustle dari skill: freelance, mengajar, content. Target +Rp 2-5 jt/bulan.')}
        ${step(4,'emerald','Invest Wisely','Mulai reksadana pasar uang. Pelajari saham. Crypto tanpa riset = gambling.')}
      </div>
      ${insight('emerald','WEALTH PRINCIPLE','"Bukan berapa yang kamu hasilkan, tapi berapa yang kamu simpan." Sisihkan 20% income PERTAMA.')}</div>`
  }

  // Mental Health
  if (m.match(/stress|burnout|mental|motivasi|galau|overthink|sedih|anxiety|depresi|lelah|capek|susah tidur|insomnia|bingung|takut/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('MENTAL HEALTH','rose','IMPORTANT')}</div>
      <p class="font-bold text-white text-lg">Mental Resilience Framework</p>
      <div class="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4"><p class="text-rose-400 text-xs font-bold mb-2">NOTE</p><p class="text-gray-300 text-sm">Mental health nyata & valid. Jika overwhelmed, bicara dengan profesional. Into The Light ID: 119.</p></div>
      <div class="space-y-3">
        ${step(1,'rose','Grounding 5-4-3-2-1','5 hal dilihat, 4 disentuh, 3 suara, 2 bau, 1 rasa. Kembali ke present moment.')}
        ${step(2,'rose','Journaling Protocol','3 hal disyukuri setiap malam. Brain dump pikiran negatif ke kertas. Gunakan Journal di SparkMind!')}
        ${step(3,'rose','Recovery Ritual','Tidur 7-8 jam, jalan kaki 20 menit/hari, kurangi screen time malam.')}
        ${step(4,'rose','Cognitive Reframing','Ubah "Aku gagal" → "Aku sedang belajar". Perspektif menentukan realita.')}
      </div>
      ${insight('violet','REMINDER','"You don\'t have to have it all figured out. Taking care of yourself IS productive."')}</div>`
  }

  // Relationship
  if (m.match(/hubungan|pacar|cinta|nikah|relationship|pasangan|jodoh|toxic|putus|selingkuh|komunikasi/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('RELATIONSHIP','pink')}</div>
      <p class="font-bold text-white text-lg">Relationship Strategic Framework</p>
      <div class="bg-pink-500/5 border border-pink-500/10 rounded-xl p-4"><p class="text-pink-400 text-xs font-bold mb-2">PERSPECTIVE</p><p class="text-gray-300 text-sm">Hubungan sehat = <strong class="text-white">dua individu utuh</strong>, bukan saling melengkapi kekurangan.</p></div>
      <div class="space-y-3">
        ${step(1,'pink','Build Yourself First','Jadi versi terbaik: stabil mental, punya tujuan, mandiri finansial.')}
        ${step(2,'pink','Respect Boundaries','Hormati batasan orang lain. Keheninganmu = pernyataan kedaulatan terkuat.')}
        ${step(3,'pink','Value Alignment','Cari pasangan share visi & value. Compatibility > chemistry.')}
      </div>
      ${insight('violet','TRUTH','"The right person won\'t make you chase them. They\'ll meet you halfway."')}</div>`
  }

  // Education
  if (m.match(/kuliah|sekolah|ujian|skripsi|tesis|ipk|beasiswa|lulus|sertifikasi/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('PENDIDIKAN','indigo')}</div>
      <p class="font-bold text-white text-lg">Academic Excellence Framework</p>
      <div class="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4"><p class="text-indigo-400 text-xs font-bold mb-2">STUDY INTELLIGENCE</p><p class="text-gray-300 text-sm">Active recall + spaced repetition 3x lebih efektif dari membaca ulang.</p></div>
      <div class="space-y-3">
        ${step(1,'indigo','Active Recall','Tutup buku, coba ingat. Buat pertanyaan dari materi. Test yourself.')}
        ${step(2,'indigo','Spaced Repetition','Review hari 1, 3, 7, 14, 30. Gunakan Anki/Quizlet.')}
        ${step(3,'indigo','Feynman Technique','Jelaskan konsep seolah mengajar anak 12 tahun.')}
      </div>
      ${insight('blue','PROTOCOL','2 jam focused study + Pomodoro > 6 jam scrolling sambil belajar.')}</div>`
  }

  // Health
  if (m.match(/olahraga|diet|gym|sehat|berat badan|kurus|gemuk|fitness|nutrisi|makan/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('HEALTH','teal')}</div>
      <p class="font-bold text-white text-lg">Health & Fitness Optimization</p>
      <div class="bg-teal-500/5 border border-teal-500/10 rounded-xl p-4"><p class="text-teal-400 text-xs font-bold mb-2">BODY INTELLIGENCE</p><p class="text-gray-300 text-sm">Kesehatan fisik = <strong class="text-white">fondasi segala performa</strong>.</p></div>
      <div class="space-y-3">
        ${step(1,'teal','Movement Daily','Minimal 30 menit/hari. Jalan kaki, jogging, bodyweight exercise.')}
        ${step(2,'teal','Nutrition','80% diet, 20% exercise. Protein, kurangi gula. Air 2-3 liter/hari.')}
        ${step(3,'teal','Sleep Protocol','7-8 jam. No screen 1 jam sebelum tidur. Kamar gelap & sejuk.')}
      </div>
      ${insight('teal','START NOW','"Take care of your body." Mulai dengan 10 menit push-up + plank hari ini.')}</div>`
  }

  // Creative
  if (m.match(/konten|youtube|tiktok|instagram|influencer|content creator|blog|podcast|desain|kreativ|personal brand/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('CREATIVE','orange')}</div>
      <p class="font-bold text-white text-lg">Content Creator Monetization Blueprint</p>
      <div class="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4"><p class="text-orange-400 text-xs font-bold mb-2">CREATOR ECONOMY</p><p class="text-gray-300 text-sm">Creator economy Indonesia tumbuh <strong class="text-white">40%/tahun</strong>. 10K followers = Rp 3-10 jt/bulan.</p></div>
      <div class="space-y-3">
        ${step(1,'orange','Pick Your Niche','Passion + Expertise + Demand. 1000 true fans > 100K casual.')}
        ${step(2,'orange','Content System','Batch create: 1 hari produksi = 1 minggu konten. Hook, Value, CTA.')}
        ${step(3,'orange','Monetize Stack','Ads → Sponsorship → Digital Products → Community → Consulting.')}
      </div>
      ${insight('orange','START TODAY','"Post 100 konten sebelum judge hasilnya." Algoritma rewards consistency.')}</div>`
  }

  // Leadership
  if (m.match(/leadership|pemimpin|manage|team|tim|delegasi|boss|atasan/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('LEADERSHIP','violet')}</div>
      <p class="font-bold text-white text-lg">Sovereign Leadership Framework</p>
      <div class="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4"><p class="text-violet-400 text-xs font-bold mb-2">INTELLIGENCE</p><p class="text-gray-300 text-sm">Leadership = <strong class="text-white">influence, not position</strong>.</p></div>
      <div class="space-y-3">
        ${step(1,'violet','Lead by Example','Tim mengikuti tindakan, bukan kata-kata. Be the standard.')}
        ${step(2,'violet','Clear Communication','WHY, WHAT, HOW. Tim yang paham "kenapa" bergerak lebih cepat.')}
        ${step(3,'violet','Empower & Delegate','Trust team. Delegate outcomes, not tasks. Create more leaders.')}
      </div>
      ${insight('violet','PRINCIPLE','"A leader knows the way, goes the way, shows the way." — John C. Maxwell')}</div>`
  }

  // Life Purpose / Ikigai
  if (m.match(/tujuan hidup|makna|purpose|passion|ikigai/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('LIFE PURPOSE','indigo','V5')}</div>
      <p class="font-bold text-white text-lg">Finding Your Ikigai</p>
      <div class="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4"><p class="text-indigo-400 text-xs font-bold mb-2">DEEP INSIGHT</p><p class="text-gray-300 text-sm">Ikigai: <strong class="text-white">passion × misi × profesi × panggilan</strong>.</p></div>
      <div class="space-y-3">
        ${step(1,'indigo','What You Love','10 hal yang bikin excited tanpa dibayar. Pattern?')}
        ${step(2,'indigo','What You\'re Good At','Skill yang orang selalu minta bantuanmu. Clue unique ability.')}
        ${step(3,'indigo','What World Needs','Masalah yang paling ingin diselesaikan. Your mission.')}
        ${step(4,'indigo','What You Can Be Paid For','Di mana market demand? Intersection = Ikigai.')}
      </div>
      ${insight('indigo','TRUTH','"The meaning of life is to find your gift. The purpose is to give it away." — Picasso')}</div>`
  }

  // Spiritual / Faith (NEW V5)
  if (m.match(/spiritual|ibadah|doa|iman|tuhan|allah|tawakal|sabar|syukur|hijrah|religi|agama/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('SPIRITUAL & FAITH','violet','V5 NEW')}</div>
      <p class="font-bold text-white text-lg">Spiritual Strength Framework</p>
      <div class="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4"><p class="text-violet-400 text-xs font-bold mb-2">DEEP INSIGHT</p><p class="text-gray-300 text-sm">Spiritualitas yang kuat = <strong class="text-white">fondasi ketahanan mental</strong>. Orang dengan praktik spiritual harian 30% lebih resilient.</p></div>
      <div class="space-y-3">
        ${step(1,'violet','Daily Practice','Pagi 10 menit: doa, meditasi, atau Quran/scripture. Set niat hari ini.')}
        ${step(2,'violet','Gratitude Ritual','Malam: 3 hal disyukuri. Gratitude rewires brain to positive.')}
        ${step(3,'violet','Tawakal & Action','Berdoa seolah semua tergantung Tuhan, bekerja seolah semua tergantung kamu.')}
        ${step(4,'violet','Community','Komunitas spiritual: rutinitas, akuntabilitas, support. Jangan jalan sendiri.')}
      </div>
      ${insight('violet','SOVEREIGN PRINCIPLE','"Where there is faith, there is no fear. Trust the process — your effort + His timing."')}</div>`
  }

  // Side Hustle (NEW V5)
  if (m.match(/side hustle|kerja sampingan|freelance|side project|bisnis sampingan|extra income|gig/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('SIDE HUSTLE','green','V5 NEW')}</div>
      <p class="font-bold text-white text-lg">Side Hustle Acceleration Blueprint</p>
      <div class="bg-green-500/5 border border-green-500/10 rounded-xl p-4"><p class="text-green-400 text-xs font-bold mb-2">REVENUE INSIGHT</p><p class="text-gray-300 text-sm">85% miliarder punya <strong class="text-white">7 income streams</strong>. Side hustle = jalur kedua menuju sovereignty.</p></div>
      <div class="space-y-3">
        ${step(1,'green','Audit Skill & Asset','List semua skill kamu. 3 yang paling marketable? Mulai dari sana.')}
        ${step(2,'green','Pick One Lane','Service (freelance), Product (digital), atau Content (creator). Fokus 1 sampai jalan.')}
        ${step(3,'green','First $100 Sprint','Goal: dapat customer pertama dalam 30 hari. Upwork, Fiverr, IG, TikTok.')}
        ${step(4,'green','Scale Smart','Setelah konsisten Rp 2-5 jt/bulan, sistemkan. Otomatisasi, hire VA, scale.')}
      </div>
      ${insight('green','ACTION','"Don\'t quit your job to start. Start, then quit when income matches." Tonight: list 3 skill yang bisa kamu monetize.')}</div>`
  }

  // Networking
  if (m.match(/networking|teman|social|introvert|pergaulan|komunitas|kenalan|public speaking/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('NETWORKING','cyan','V5')}</div>
      <p class="font-bold text-white text-lg">Strategic Networking Framework</p>
      <div class="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-4"><p class="text-cyan-400 text-xs font-bold mb-2">NETWORK INTELLIGENCE</p><p class="text-gray-300 text-sm">Your network = <strong class="text-white">net worth</strong>. 85% jobs filled through networking.</p></div>
      <div class="space-y-3">
        ${step(1,'cyan','Give Before Ask','Bantu orang lain tanpa pamrih. Share knowledge, connect people.')}
        ${step(2,'cyan','Strategic Circles','Join 2-3 komunitas sesuai niche. Hadir konsisten.')}
        ${step(3,'cyan','Follow-Up System','Kenalan baru → follow up 48 jam. Pesan personal, bukan template.')}
      </div>
      ${insight('cyan','ACTION','Minggu ini: reach out ke 3 orang baru di bidangmu.')}</div>`
  }

  // Parenting
  if (m.match(/anak|parenting|keluarga|orang tua|mendidik|balita|remaja|family/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('PARENTING','pink','V5')}</div>
      <p class="font-bold text-white text-lg">Smart Parenting Framework</p>
      <div class="bg-pink-500/5 border border-pink-500/10 rounded-xl p-4"><p class="text-pink-400 text-xs font-bold mb-2">PARENTING INSIGHT</p><p class="text-gray-300 text-sm">Anak belajar dari <strong class="text-white">apa yang kamu lakukan</strong>, bukan apa yang kamu katakan.</p></div>
      <div class="space-y-3">
        ${step(1,'pink','Quality Time','15 menit penuh perhatian > 3 jam sambil HP. Be fully present.')}
        ${step(2,'pink','Emotional Coaching','Validasi emosi: "Aku paham kamu kesal." Label → regulate → problem solve.')}
        ${step(3,'pink','Positive Discipline','Batas tegas + kasih sayang. Natural consequences > hukuman.')}
        ${step(4,'pink','Growth Environment','Buku, kreativitas, eksplorasi. Curiosity > obedience.')}
      </div>
      ${insight('pink','PRINCIPLE','"Children don\'t need perfect parents. They need authentic ones."')}</div>`
  }

  // Time Freedom
  if (m.match(/passive income|kebebasan|waktu luang|freedom|pensiun dini|financial freedom|fire/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('TIME FREEDOM','amber','V5')}</div>
      <p class="font-bold text-white text-lg">Path to Time Freedom</p>
      <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4"><p class="text-amber-400 text-xs font-bold mb-2">FREEDOM BLUEPRINT</p><p class="text-gray-300 text-sm">True wealth = <strong class="text-white">control over your time</strong>, bukan jumlah uang.</p></div>
      <div class="space-y-3">
        ${step(1,'amber','Build Skill Asset','Skill yang bisa generate income tanpa trading time. Coding, writing, design.')}
        ${step(2,'amber','Create Systems','SOP, automation, delegation. Bisnis jalan tanpa kamu harus ada.')}
        ${step(3,'amber','Build Assets','Digital products, online courses, affiliate. Income while you sleep.')}
        ${step(4,'amber','FIRE Target','25x annual expenses. Invest in index funds. Live below means.')}
      </div>
      ${insight('amber','TRUTH','"Rich is having money. Wealthy is having time."')}</div>`
  }

  // Default
  return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('STRATEGIC ANALYSIS','blue','V5 ENGINE')}</div>
    <p class="font-bold text-white text-lg">Framework Pemecahan Masalah Universal</p>
    <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4"><p class="text-blue-400 text-xs font-bold mb-2">ANALYSIS</p><p class="text-gray-300 text-sm">Setiap masalah bisa dipecahkan dengan pendekatan terstruktur:</p></div>
    <div class="space-y-3">
      ${step(1,'blue','Define','Tulis masalah dalam 1 kalimat jelas.')}
      ${step(2,'blue','Decompose','Pecah jadi langkah kecil. Setiap langkah actionable 1-3 hari.')}
      ${step(3,'blue','Execute','Ambil 1 langkah PERTAMA hari ini.')}
      ${step(4,'blue','Iterate','Review setiap minggu. Done > perfect.')}
    </div>
    ${insight('amber','PRO TIP','Coba spesifik: <strong class="text-white">bisnis, karir, skill, keuangan, produktivitas, mental health, hubungan, pendidikan, kesehatan, konten, leadership, tujuan hidup, networking, parenting, time freedom, spiritual, side hustle</strong> — 18 kategori siap bantu!')}</div>`
}

function generateSWOT(business: string): string {
  const b = business.substring(0, 60)
  return `<div class="space-y-4">
    <p class="font-bold text-white text-lg">SWOT Analysis: ${b}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4"><p class="font-bold text-emerald-400 text-sm mb-3">Strengths</p><ul class="text-gray-300 text-xs space-y-1.5"><li>• Passion & dedikasi tinggi</li><li>• Kemampuan teknis berkembang</li><li>• Low overhead cost</li><li>• Fleksibilitas & akses AI tools</li></ul></div>
      <div class="bg-red-500/5 border border-red-500/10 rounded-xl p-4"><p class="font-bold text-red-400 text-sm mb-3">Weaknesses</p><ul class="text-gray-300 text-xs space-y-1.5"><li>• Modal awal terbatas</li><li>• Belum ada track record</li><li>• Network bisnis kecil</li><li>• Kurang pengalaman marketing</li></ul></div>
      <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4"><p class="font-bold text-blue-400 text-sm mb-3">Opportunities</p><ul class="text-gray-300 text-xs space-y-1.5"><li>• Pasar digital tumbuh 30%/tahun</li><li>• Remote work trend</li><li>• AI niche baru</li><li>• UMKM butuh digital</li></ul></div>
      <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4"><p class="font-bold text-amber-400 text-sm mb-3">Threats</p><ul class="text-gray-300 text-xs space-y-1.5"><li>• Kompetisi global</li><li>• Perubahan tech cepat</li><li>• Ketidakpastian ekonomi</li><li>• AI replacing low-skill</li></ul></div>
    </div>
    <div class="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-xl p-4"><p class="text-indigo-400 text-xs font-bold">RECOMMENDATION</p><p class="text-gray-300 text-sm mt-1">Leverage strengths → capture opportunities. Mitigate weaknesses via networking. Counter threats via continuous learning.</p></div></div>`
}

function generateMindMap(topic: string): string {
  return `<div class="space-y-4"><p class="font-bold text-white text-lg">Mind Map: ${topic.substring(0, 40)}</p>
    <div class="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-6"><div class="text-center mb-5"><span class="inline-block bg-indigo-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg">${topic.substring(0, 30)}</span></div>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-indigo-400 text-xs mb-2">Planning</p><ul class="text-gray-400 text-xs space-y-1"><li>Goals</li><li>Research</li><li>Timeline</li></ul></div>
      <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-emerald-400 text-xs mb-2">Execution</p><ul class="text-gray-400 text-xs space-y-1"><li>Build MVP</li><li>Test</li><li>Launch</li></ul></div>
      <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-amber-400 text-xs mb-2">Growth</p><ul class="text-gray-400 text-xs space-y-1"><li>Marketing</li><li>Scale</li><li>Hire</li></ul></div>
      <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-rose-400 text-xs mb-2">Optimize</p><ul class="text-gray-400 text-xs space-y-1"><li>Metrics</li><li>Cut waste</li><li>Double down</li></ul></div>
    </div></div></div>`
}

function generateCoachResponse(goal: string, currentState: string, obstacles: string): string {
  return `<div class="space-y-4">
    <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20">AI COACH V5</span></div>
    <p class="font-bold text-white text-lg">Personal Coaching Session</p>
    <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4"><p class="text-amber-400 text-xs font-bold mb-2">YOUR GOAL</p><p class="text-gray-300 text-sm">${goal ? goal.substring(0, 200) : 'Belum ditentukan'}</p></div>
    ${currentState ? `<div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4"><p class="text-blue-400 text-xs font-bold mb-2">CURRENT STATE</p><p class="text-gray-300 text-sm">${currentState.substring(0, 200)}</p></div>` : ''}
    ${obstacles ? `<div class="bg-red-500/5 border border-red-500/10 rounded-xl p-4"><p class="text-red-400 text-xs font-bold mb-2">BLOCKERS</p><p class="text-gray-300 text-sm">${obstacles.substring(0, 200)}</p></div>` : ''}
    <div class="space-y-3">
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="text-xl">1.</span><div><p class="font-bold text-white text-sm">Clarity First</p><p class="text-gray-400 text-xs mt-1">Outcome spesifik. Bukan "sukses" tapi "50 klien dalam 3 bulan".</p></div></div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="text-xl">2.</span><div><p class="font-bold text-white text-sm">Identify Bottleneck</p><p class="text-gray-400 text-xs mt-1">1 hal yang paling menghalangi SEKARANG. Pecahkan itu, sisanya mengikuti.</p></div></div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="text-xl">3.</span><div><p class="font-bold text-white text-sm">Micro-Action TODAY</p><p class="text-gray-400 text-xs mt-1">1 langkah kecil HARI INI. Momentum dimulai dari sini.</p></div></div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="text-xl">4.</span><div><p class="font-bold text-white text-sm">Accountability</p><p class="text-gray-400 text-xs mt-1">Share goalmu ke 1 orang. Accountability = +65% success rate.</p></div></div>
    </div>
    <div class="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4"><p class="text-amber-400 text-xs font-bold">COACHING PRINCIPLE</p><p class="text-gray-300 text-sm mt-1">"You are the architect of your own reality."</p></div></div>`
}

// ============================================
// DATA
// ============================================
const RESOURCES_DATA = [
  { id:1, title:'Business Model Canvas', category:'Bisnis', description:'Framework merancang model bisnis. 9 blok strategis.', icon:'📋', detail:'Mulai dari customer segment → value proposition → channels. Validasi setiap blok.' },
  { id:2, title:'SMART Goals', category:'Produktivitas', description:'Specific, Measurable, Achievable, Relevant, Time-bound.', icon:'🎯', detail:'Bukan "sukses" tapi "Revenue Rp 10jt/bulan dalam 6 bulan via freelance web dev".' },
  { id:3, title:'Eisenhower Matrix', category:'Produktivitas', description:'Prioritas berdasarkan urgensi & kepentingan.', icon:'⚡', detail:'Q1 DO, Q2 SCHEDULE, Q3 DELEGATE, Q4 DELETE.' },
  { id:4, title:'Personal Finance 101', category:'Finansial', description:'Dasar mengelola keuangan pribadi.', icon:'💰', detail:'50/30/20 rule. Emergency fund first.' },
  { id:5, title:'Growth Mindset', category:'Personal', description:'Pola pikir pertumbuhan vs fixed mindset.', icon:'🧠', detail:'"I can\'t do this YET." Embrace challenges.' },
  { id:6, title:'Networking Strategy', category:'Karir', description:'Bangun koneksi profesional strategis.', icon:'🤝', detail:'Give first, be genuine, follow up within 48h.' },
  { id:7, title:'MVP Development', category:'Tech', description:'Minimum Viable Product guide.', icon:'🚀', detail:'1 core feature only → launch → iterate. Speed > perfection.' },
  { id:8, title:'Content Marketing', category:'Marketing', description:'Strategi konten untuk audiens & revenue.', icon:'📝', detail:'Hook → Value → CTA. 3-5 posts/week consistency.' },
  { id:9, title:'Time Blocking', category:'Produktivitas', description:'Block calendar untuk deep work.', icon:'⏰', detail:'2-3 jam blocks. No meetings before noon.' },
  { id:10, title:'SWOT Analysis', category:'Bisnis', description:'Strengths, Weaknesses, Opportunities, Threats.', icon:'📊', detail:'Use SparkMind SWOT Analyzer for instant generation!' },
  { id:11, title:'Habit Stacking', category:'Personal', description:'Teknik membangun habit baru.', icon:'🔥', detail:'After [CURRENT HABIT], I will [NEW HABIT].' },
  { id:12, title:'Revenue Model Canvas', category:'Bisnis', description:'Framework model revenue.', icon:'💎', detail:'Subscription, Freemium, Marketplace, Advertising.' },
  { id:13, title:'Active Recall', category:'Pendidikan', description:'Teknik belajar paling efektif.', icon:'📖', detail:'Close book → try to remember → check. 3x more effective.' },
  { id:14, title:'Deep Work Protocol', category:'Produktivitas', description:'Fokus tanpa distraksi.', icon:'🧘', detail:'90 min blocks. Phone off. Single-task only.' },
  { id:15, title:'Creator Economy', category:'Creative', description:'Monetisasi konten digital.', icon:'🎬', detail:'1000 true fans theory. Niche down.' },
  { id:16, title:'Ikigai Framework', category:'Purpose', description:'Temukan tujuan & makna hidup.', icon:'🌸', detail:'Love × Good At × World Needs × Paid For.' },
  { id:17, title:'Public Speaking', category:'Networking', description:'Teknik bicara di depan umum.', icon:'🎤', detail:'Hook → Problem → Solution → CTA. Practice 10x.' },
  { id:18, title:'Journaling Guide', category:'Personal', description:'Teknik menulis jurnal harian.', icon:'📓', detail:'Morning pages: brain dump. Evening: 3 gratitudes.' },
  { id:19, title:'Parenting Essentials', category:'Family', description:'Panduan parenting modern.', icon:'👶', detail:'Quality time > quantity. Emotional coaching.' },
  { id:20, title:'Spiritual Practice', category:'Faith', description:'Disiplin spiritual harian.', icon:'🕊️', detail:'Pagi: doa/meditasi. Malam: gratitude. Komunitas spiritual.' },
  { id:21, title:'Side Hustle Blueprint', category:'Business', description:'Bangun income kedua.', icon:'💼', detail:'Pick 1 lane. First $100 dalam 30 hari. Scale smart.' },
]

const INSIGHTS_DATA = [
  { icon:'💡', title:'Revenue First', desc:'2 jam untuk aktivitas yang langsung menghasilkan uang.', time:'Hari ini' },
  { icon:'📊', title:'Goal Progress', desc:'Cek progress goal hari ini. On track?', time:'2 jam lalu' },
  { icon:'🔥', title:'Streak Alert', desc:'Jangan putus streak! Consistency beats intensity.', time:'5 jam lalu' },
  { icon:'💰', title:'Financial Tip', desc:'Sudah sisihkan 20% income bulan ini?', time:'Kemarin' },
  { icon:'🎯', title:'Weekly Review', desc:'30 menit evaluasi minggu ini.', time:'2 hari lalu' },
  { icon:'🧠', title:'Sovereign Insight', desc:'"Seorang Arsitek tidak meratapi pintu tertutup."', time:'3 hari lalu' },
  { icon:'📓', title:'Journal Reminder', desc:'Tulis 3 hal yang kamu syukuri hari ini.', time:'4 hari lalu' },
  { icon:'🕊️', title:'Spiritual Reset', desc:'Take 5 min for prayer/meditation today.', time:'5 hari lalu' },
]

const QUOTES_DATA = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Revenue is oxygen for business. Sell first, build later.', author: 'SparkMind' },
  { text: 'Consistency beats talent when talent is not consistent.', author: 'Unknown' },
  { text: 'You are the architect of your own reality.', author: 'SparkMind' },
  { text: 'Done is better than perfect.', author: 'Sheryl Sandberg' },
  { text: 'Focus on being productive instead of busy.', author: 'Tim Ferriss' },
  { text: 'Small daily improvements lead to stunning results.', author: 'Robin Sharma' },
  { text: 'Invest in yourself. Your career is the engine of your wealth.', author: 'Paul Clitheroe' },
  { text: 'Your network is your net worth.', author: 'Porter Gale' },
  { text: 'Rich is having money. Wealthy is having time.', author: 'SparkMind V5' },
  { text: 'Where there is faith, there is no fear.', author: 'SparkMind V5' },
  { text: 'Your effort + His timing = perfect outcome.', author: 'SparkMind V5' },
]

// ============================================
// LANDING PAGE — V5.0 SOVEREIGN
// ============================================
const LANDING_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V5 SOVEREIGN — AI Strategic Guide Platform</title>
  <meta name="description" content="Platform AI strategic guide dengan 18+ kategori, Chat Memory, Backup/Restore, Weekly Trend, Pomodoro V2, Smart Modal, Keyboard Shortcuts.">
  <meta name="theme-color" content="#0a0a1a">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}body{background:#0a0a1a;color:#e2e8f0;overflow-x:hidden}
    .gradient-text{background:linear-gradient(135deg,#818cf8,#f472b6,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06)}
    .card-hover{transition:all .5s cubic-bezier(.4,0,.2,1)}.card-hover:hover{transform:translateY(-8px);box-shadow:0 30px 80px rgba(99,102,241,0.12)}
    .neon-glow{box-shadow:0 0 40px rgba(99,102,241,0.15),0 0 80px rgba(99,102,241,0.05)}
    .float-1{animation:f1 8s ease-in-out infinite}.float-2{animation:f2 6s ease-in-out infinite}.float-3{animation:f3 10s ease-in-out infinite}
    @keyframes f1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(1deg)}}
    @keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes f3{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.02)}}
    .orb{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none;opacity:0.4}
    .pulse-ring{animation:pr 3s cubic-bezier(.4,0,.6,1) infinite}
    @keyframes pr{0%{transform:scale(.95);opacity:1}70%{transform:scale(1.3);opacity:0}100%{transform:scale(.95);opacity:0}}
    .fade-up{opacity:0;transform:translateY(40px);transition:all .8s}.fade-up.visible{opacity:1;transform:translateY(0)}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0a0a1a}::-webkit-scrollbar-thumb{background:#2a2a4a;border-radius:10px}
    .btn-primary{background:linear-gradient(135deg,#4f46e5,#6366f1);transition:all .3s}.btn-primary:hover{background:linear-gradient(135deg,#4338ca,#4f46e5);transform:translateY(-2px);box-shadow:0 20px 40px rgba(99,102,241,0.3)}
    .shimmer{background:linear-gradient(110deg,transparent 40%,rgba(255,255,255,0.1) 50%,transparent 60%);background-size:200% 100%;animation:sh 3s linear infinite}
    @keyframes sh{0%{background-position:200% 0}100%{background-position:-200% 0}}
  </style>
</head>
<body>
<header class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
    <div class="flex items-center gap-3">
      <div class="relative">
        <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/30">🧠</div>
        <div class="absolute inset-0 rounded-xl pulse-ring border-2 border-indigo-400"></div>
      </div>
      <div>
        <h1 class="text-lg font-bold text-white">SparkMind</h1>
        <p class="text-[10px] text-indigo-400 font-bold tracking-widest -mt-0.5">V5 · SOVEREIGN</p>
      </div>
    </div>
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
      <a href="#features" class="text-gray-400 hover:text-white transition">Features</a>
      <a href="#whatsnew" class="text-gray-400 hover:text-white transition">What's New</a>
      <a href="#pricing" class="text-gray-400 hover:text-white transition">Pricing</a>
      <a href="/app" class="btn-primary text-white px-5 py-2 rounded-lg font-semibold">Buka App →</a>
    </nav>
    <a href="/app" class="md:hidden btn-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">App →</a>
  </div>
</header>

<section class="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
  <div class="orb float-1" style="top:-100px;left:-100px;width:500px;height:500px;background:#6366f1"></div>
  <div class="orb float-2" style="bottom:-100px;right:-100px;width:600px;height:600px;background:#a855f7"></div>
  <div class="orb float-3" style="top:30%;left:50%;width:400px;height:400px;background:#f472b6"></div>
  <div class="max-w-5xl mx-auto text-center relative z-10">
    <span class="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs text-indigo-400 mb-8 font-semibold">
      <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
      V5.0 SOVEREIGN — Live Now · 18+ AI Categories
    </span>
    <h1 class="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
      AI Strategic Guide<br><span class="gradient-text">Untuk Hidup Berdaulat</span>
    </h1>
    <p class="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
      Platform AI 18+ kategori strategi — dari bisnis & karir sampai spiritual & side hustle. <span class="text-white font-semibold">Chat memory persist, backup/restore data, keyboard shortcuts, mobile sidebar smooth.</span>
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <a href="/app" class="btn-primary text-white px-8 py-4 rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 neon-glow">
        🚀 Mulai Gratis Sekarang →
      </a>
      <a href="#features" class="glass text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/[0.08] transition">📖 Lihat Fitur</a>
    </div>
    <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
      <div class="glass rounded-xl p-4"><div class="text-2xl sm:text-3xl font-black gradient-text">18+</div><div class="text-[10px] sm:text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">AI Categories</div></div>
      <div class="glass rounded-xl p-4"><div class="text-2xl sm:text-3xl font-black gradient-text">21+</div><div class="text-[10px] sm:text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">Frameworks</div></div>
      <div class="glass rounded-xl p-4"><div class="text-2xl sm:text-3xl font-black gradient-text">100%</div><div class="text-[10px] sm:text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">Sovereign</div></div>
    </div>
  </div>
</section>

<section id="whatsnew" class="py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-14">
      <span class="text-xs font-bold text-amber-400 tracking-widest uppercase">What's New in V5</span>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4 text-white">12 Major Upgrades</h2>
      <p class="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">Semua root cause V4.0 sudah di-fix. V5.0 lebih powerful, lebih smooth, lebih reliable.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${[
        ['💬','Chat Memory Persist','Percakapan AI tersimpan di localStorage. Pindah tab tidak hilang.'],
        ['📱','Mobile Sidebar Smooth','Slide-in overlay + backdrop. UX native-like di mobile.'],
        ['💾','Backup & Restore JSON','Export full data ke JSON. Import balik kapan saja.'],
        ['📊','Weekly Trend Chart','Visualisasi 7 hari terakhir. Track progress over time.'],
        ['🍅','Pomodoro V2','Visual break alert + auto-start option + session stats.'],
        ['🎯','Smart Delete Modal','Custom confirmation, bukan browser native. UX premium.'],
        ['📓','Journal Fix','Mood selector fixed + edit & delete entry.'],
        ['🔍','Debounced Search','Resource search dengan debounce 300ms. Performance boost.'],
        ['⌨️','Keyboard Shortcuts','Ctrl+K search, Ctrl+1-9 switch tab. Power user ready.'],
        ['🕊️','+Spiritual & Faith','Kategori baru: spiritual practice, faith, gratitude.'],
        ['💼','+Side Hustle','Kategori baru: bangun income kedua, freelance acceleration.'],
        ['✨','Micro-Interactions','Smoother animations, polished hover, premium feel.'],
      ].map(([icon, title, desc]) => `
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="text-3xl mb-3">${icon}</div>
          <h3 class="font-bold text-white mb-2">${title}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">${desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<section id="features" class="py-20 px-4 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-14">
      <span class="text-xs font-bold text-indigo-400 tracking-widest uppercase">Complete Toolkit</span>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4 text-white">Everything Sovereign</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${[
        ['🧠','AI Sovereign Engine V5','18+ kategori dengan typing effect dan context memory.'],
        ['📊','Dashboard + Weekly Trend','Stats animated counter + 7-day visual chart.'],
        ['📓','Journal + Mood Tracker','Daily journal dengan 6 mood + edit/delete.'],
        ['🌓','Dark/Light Mode','Toggle smooth, preference saved.'],
        ['🔔','Toast Notifications','Achievement & action alerts smooth.'],
        ['📊','SWOT Analyzer','Generate analisis SWOT instan.'],
        ['🧭','AI Coach V5','Personal coaching dengan blockers & action.'],
        ['🍅','Pomodoro Timer Pro V2','Visual break alert + auto-start + stats.'],
        ['🎯','Goal Tracker Pro','Milestones, progress bar, localStorage.'],
        ['🔥','Habit Tracker','Streak counter + daily check-in.'],
        ['🎨','Vision Board','Big vision, 1Y, 3M, 1W goals.'],
        ['📋','Weekly Review','Wins, learnings, focus minggu depan.'],
        ['📚','Resource Library','21+ frameworks expandable.'],
        ['💾','Backup/Restore JSON','Full data export + import.'],
        ['⌨️','Keyboard Shortcuts','Ctrl+K, Ctrl+1-9, Ctrl+/ help.'],
      ].map(([icon, title, desc]) => `
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="text-3xl mb-3">${icon}</div>
          <h3 class="font-bold text-white mb-2">${title}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">${desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<section id="pricing" class="py-20 px-4">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-14">
      <span class="text-xs font-bold text-emerald-400 tracking-widest uppercase">Pricing</span>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4 text-white">Pilih Plan-mu</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass rounded-2xl p-8">
        <h3 class="text-xl font-bold text-white mb-1">Starter</h3>
        <p class="text-gray-500 text-xs mb-4">Untuk yang baru mulai</p>
        <div class="mb-6"><span class="text-4xl font-black text-white">Gratis</span></div>
        <ul class="space-y-2 text-sm text-gray-400 mb-6">
          <li>✓ Semua 18+ AI categories</li>
          <li>✓ Dashboard, Goals, Habits</li>
          <li>✓ Journal & Pomodoro V2</li>
          <li>✓ Backup/Restore JSON</li>
          <li>✓ localStorage permanent</li>
        </ul>
        <a href="/app" class="block w-full py-3 glass rounded-lg text-white font-semibold text-center hover:bg-white/[0.08] transition">Mulai Gratis</a>
      </div>
      <div class="glass rounded-2xl p-8 border-2 border-indigo-500/40 neon-glow relative">
        <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">PALING POPULER</span>
        <h3 class="text-xl font-bold text-white mb-1">Pro</h3>
        <p class="text-gray-500 text-xs mb-4">Untuk yang serius berdaulat</p>
        <div class="mb-6"><span class="text-4xl font-black text-white">Rp 99K</span><span class="text-gray-500 text-sm">/bulan</span></div>
        <ul class="space-y-2 text-sm text-gray-400 mb-6">
          <li>✓ Semua di Starter</li>
          <li>✓ AI integration real-time</li>
          <li>✓ Cloud sync semua device</li>
          <li>✓ Priority support 24/7</li>
          <li>✓ Advanced analytics</li>
          <li>✓ Custom frameworks</li>
        </ul>
        <a href="/app" class="block w-full py-3 btn-primary rounded-lg text-white font-bold text-center">Upgrade ke Pro</a>
      </div>
      <div class="glass rounded-2xl p-8">
        <h3 class="text-xl font-bold text-white mb-1">Enterprise</h3>
        <p class="text-gray-500 text-xs mb-4">Untuk team & company</p>
        <div class="mb-6"><span class="text-4xl font-black text-white">Custom</span></div>
        <ul class="space-y-2 text-sm text-gray-400 mb-6">
          <li>✓ Semua di Pro</li>
          <li>✓ Multi-user team workspace</li>
          <li>✓ Custom AI training</li>
          <li>✓ White-label option</li>
          <li>✓ Dedicated success manager</li>
        </ul>
        <a href="mailto:hello@sparkmind.id" class="block w-full py-3 glass rounded-lg text-white font-semibold text-center hover:bg-white/[0.08] transition">Kontak Sales</a>
      </div>
    </div>
  </div>
</section>

<section class="py-20 px-4">
  <div class="max-w-4xl mx-auto text-center glass rounded-3xl p-10 sm:p-14 neon-glow">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white">Ready to Be <span class="gradient-text">Sovereign?</span></h2>
    <p class="text-gray-400 mb-8 max-w-2xl mx-auto">Bergabung dengan ribuan profesional yang membangun hidup berdaulat dengan SparkMind V5. Gratis selamanya, no credit card.</p>
    <a href="/app" class="btn-primary inline-flex items-center gap-2 text-white px-10 py-4 rounded-xl font-bold text-lg neon-glow">🚀 Mulai Gratis →</a>
  </div>
</section>

<footer class="border-t border-white/5 py-10 px-4">
  <div class="max-w-6xl mx-auto text-center">
    <div class="flex items-center justify-center gap-3 mb-3">
      <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">🧠</div>
      <span class="font-bold text-white">SparkMind V5 SOVEREIGN</span>
    </div>
    <p class="text-gray-500 text-xs">© 2026 SparkMind. Built with 💜 for sovereign minds.</p>
  </div>
</footer>

<script>
  const obs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
</script>
</body>
</html>`

// ============================================
// APP DASHBOARD — V5.0 SOVEREIGN
// ============================================
const APP_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V5 SOVEREIGN — Dashboard</title>
  <meta name="theme-color" content="#0a0a1a">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;margin:0;padding:0;box-sizing:border-box}
    body{background:#0a0a1a;color:#e2e8f0;overflow-x:hidden;transition:background .3s,color .3s}
    body.light{background:#f8fafc;color:#1e293b}
    body.light .glass{background:rgba(255,255,255,0.7);border-color:rgba(0,0,0,0.06)}
    body.light .text-white{color:#1e293b !important}
    body.light .text-gray-400{color:#475569 !important}
    body.light .text-gray-500{color:#64748b !important}
    body.light .bg-surface-900{background:#ffffff !important}
    body.light .border-white\\/5{border-color:rgba(0,0,0,0.06) !important}
    body.light .bg-white\\/\\[0\\.02\\]{background:rgba(0,0,0,0.02) !important}
    body.light .bg-white\\/\\[0\\.03\\]{background:rgba(0,0,0,0.03) !important}
    .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06)}
    .gradient-text{background:linear-gradient(135deg,#818cf8,#f472b6,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    ::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2a2a4a;border-radius:10px}
    body.light ::-webkit-scrollbar-thumb{background:#cbd5e1}
    .btn-primary{background:linear-gradient(135deg,#4f46e5,#6366f1);transition:all .3s}.btn-primary:hover{background:linear-gradient(135deg,#4338ca,#4f46e5);transform:translateY(-1px);box-shadow:0 10px 25px rgba(99,102,241,0.3)}
    .nav-item{transition:all .3s}.nav-item:hover{background:rgba(99,102,241,0.08)}.nav-item.active{background:linear-gradient(90deg,rgba(99,102,241,0.15),rgba(139,92,246,0.05));border-left:3px solid #6366f1}
    .typing::after{content:'▌';color:#818cf8;animation:bl 1s infinite}
    @keyframes bl{0%,50%{opacity:1}51%,100%{opacity:0}}
    .toast{animation:tin .4s cubic-bezier(.4,0,.2,1);min-width:280px}
    @keyframes tin{0%{transform:translateX(120%);opacity:0}100%{transform:translateX(0);opacity:1}}
    .toast.toast-out{animation:tout .3s cubic-bezier(.4,0,.2,1) forwards}
    @keyframes tout{0%{transform:translateX(0);opacity:1}100%{transform:translateX(120%);opacity:0}}
    .pulse-dot{animation:pd 2s ease-in-out infinite}
    @keyframes pd{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.9)}}
    .ring-progress{transform:rotate(-90deg);transition:stroke-dashoffset 1s ease-out}
    .resource-detail{max-height:0;overflow:hidden;transition:max-height .4s ease-out,padding .4s ease-out}
    .resource-detail.open{max-height:300px}
    .modal-backdrop{animation:mfade .2s ease-out}
    @keyframes mfade{0%{opacity:0}100%{opacity:1}}
    .modal-content{animation:mpop .3s cubic-bezier(.34,1.56,.64,1)}
    @keyframes mpop{0%{transform:scale(.9);opacity:0}100%{transform:scale(1);opacity:1}}
    .sidebar{transition:transform .35s cubic-bezier(.4,0,.2,1)}
    .sidebar-backdrop{animation:bfade .25s ease-out}
    @keyframes bfade{0%{opacity:0}100%{opacity:1}}
    @media (max-width:1023px){
      .sidebar{transform:translateX(-100%);position:fixed !important;z-index:60}
      .sidebar.open{transform:translateX(0)}
    }
    .counter-num{font-variant-numeric:tabular-nums}
    .bar-anim{transform-origin:bottom;animation:bgrow .8s cubic-bezier(.34,1.56,.64,1) forwards}
    @keyframes bgrow{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}
    .kbd{display:inline-block;padding:2px 6px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:4px;font-family:monospace;font-size:11px;color:#a5b4fc}
    body.light .kbd{background:rgba(0,0,0,0.05);border-color:rgba(0,0,0,0.1);color:#4f46e5}
  </style>
</head>
<body>

<div id="toast-container" class="fixed top-4 right-4 z-[100] flex flex-col gap-2"></div>

<div id="modal-root"></div>

<div class="flex min-h-screen">

  <!-- SIDEBAR -->
  <aside id="sidebar" class="sidebar w-64 glass border-r border-white/5 flex-shrink-0 flex flex-col h-screen sticky top-0 z-50">
    <div class="p-5 border-b border-white/5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg shadow-lg">🧠</div>
        <div>
          <h1 class="text-base font-bold text-white">SparkMind</h1>
          <p class="text-[10px] text-indigo-400 font-bold tracking-widest -mt-0.5">V5 · SOVEREIGN</p>
        </div>
      </div>
      <button onclick="toggleSidebar()" class="lg:hidden text-gray-400 hover:text-white p-1"><i class="fas fa-times"></i></button>
    </div>
    <nav class="flex-1 overflow-y-auto py-3">
      ${[
        ['dashboard','📊','Dashboard'],
        ['analyzer','🧠','AI Analyzer'],
        ['coach','🧭','AI Coach'],
        ['swot','📊','SWOT'],
        ['pomodoro','🍅','Pomodoro V2'],
        ['journal','📓','Journal'],
        ['goals','🎯','Goals'],
        ['habits','🔥','Habits'],
        ['vision','🎨','Vision Board'],
        ['review','📋','Weekly Review'],
        ['resources','📚','Resources'],
        ['settings','⚙️','Settings'],
      ].map(([id, icon, label], i) => `
        <button onclick="switchTab('${id}')" data-tab="${id}" class="nav-item w-full text-left px-5 py-2.5 flex items-center gap-3 text-sm text-gray-400">
          <span class="text-base">${icon}</span><span>${label}</span>
          ${i < 9 ? `<span class="ml-auto kbd">⌘${i+1}</span>` : ''}
        </button>
      `).join('')}
    </nav>
    <div class="p-4 border-t border-white/5">
      <button onclick="openShortcutsModal()" class="w-full text-left text-xs text-gray-500 hover:text-white transition flex items-center gap-2">
        <i class="fas fa-keyboard"></i> Shortcuts <span class="kbd ml-auto">⌘/</span>
      </button>
    </div>
  </aside>

  <div id="sidebar-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden lg:hidden sidebar-backdrop" onclick="toggleSidebar()"></div>

  <!-- MAIN -->
  <main class="flex-1 min-w-0 flex flex-col">
    <header class="glass border-b border-white/5 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sticky top-0 z-30">
      <div class="flex items-center gap-3 min-w-0">
        <button onclick="toggleSidebar()" class="lg:hidden text-gray-400 hover:text-white p-2"><i class="fas fa-bars text-lg"></i></button>
        <h2 id="page-title" class="text-base sm:text-lg font-bold text-white truncate">Dashboard</h2>
      </div>
      <div class="flex items-center gap-2 sm:gap-3">
        <button onclick="openCommandPalette()" class="hidden sm:flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-xs text-gray-400 hover:text-white transition">
          <i class="fas fa-search"></i> Cari... <span class="kbd ml-2">⌘K</span>
        </button>
        <button onclick="toggleTheme()" id="theme-toggle" class="w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition" title="Toggle theme">
          <i class="fas fa-moon"></i>
        </button>
        <span id="quote-ticker" class="hidden md:inline-block text-xs text-gray-500 italic max-w-[200px] truncate"></span>
      </div>
    </header>

    <div id="content" class="flex-1 overflow-y-auto p-4 sm:p-6 max-w-6xl w-full mx-auto"></div>
  </main>
</div>

<script>
// ============================================
// STATE & STORAGE
// ============================================
const STORAGE = {
  goals: 'sm_goals_v5', habits: 'sm_habits_v5', vision: 'sm_vision_v5',
  review: 'sm_review_v5', journal: 'sm_journal_v5', focus: 'sm_focus_v5',
  streak: 'sm_streak_v5', theme: 'sm_theme_v5', chat: 'sm_chat_v5',
  pomoStats: 'sm_pomo_v5', activity: 'sm_activity_v5'
};
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let goals = load(STORAGE.goals, []);
let habits = load(STORAGE.habits, []);
let vision = load(STORAGE.vision, { big:'', y1:'', m3:'', w1:'' });
let review = load(STORAGE.review, { wins:'', learnings:'', focus:'' });
let journal = load(STORAGE.journal, []);
let focusMin = load(STORAGE.focus, 0);
let streak = load(STORAGE.streak, 0);
let chatHistory = load(STORAGE.chat, []);
let pomoStats = load(STORAGE.pomoStats, { sessions:0, totalMin:0 });
let activityLog = load(STORAGE.activity, {}); // { 'YYYY-MM-DD': count }
let currentTab = 'dashboard';

// ============================================
// TOAST SYSTEM
// ============================================
function toast(msg, type='success') {
  const c = document.getElementById('toast-container');
  const colors = { success:'emerald', error:'rose', info:'blue', warn:'amber' };
  const icons = { success:'check-circle', error:'times-circle', info:'info-circle', warn:'exclamation-triangle' };
  const color = colors[type] || 'emerald';
  const t = document.createElement('div');
  t.className = \`toast glass rounded-xl px-4 py-3 flex items-center gap-3 border border-\${color}-500/30 shadow-2xl\`;
  t.innerHTML = \`<i class="fas fa-\${icons[type]} text-\${color}-400"></i><p class="text-sm text-white flex-1">\${msg}</p>\`;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('toast-out'); setTimeout(() => t.remove(), 300) }, 3000);
}

// ============================================
// MODAL SYSTEM (Smart Confirmation)
// ============================================
function showModal({ title, body, confirmText='Konfirmasi', cancelText='Batal', confirmClass='btn-primary', onConfirm }) {
  const root = document.getElementById('modal-root');
  root.innerHTML = \`
    <div class="modal-backdrop fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="if(event.target===this)closeModal()">
      <div class="modal-content glass rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl">
        <h3 class="text-lg font-bold text-white mb-2">\${title}</h3>
        <p class="text-gray-400 text-sm mb-5">\${body}</p>
        <div class="flex gap-3 justify-end">
          <button onclick="closeModal()" class="px-4 py-2 glass rounded-lg text-gray-300 text-sm font-semibold hover:bg-white/10 transition">\${cancelText}</button>
          <button id="modal-confirm" class="\${confirmClass} text-white px-4 py-2 rounded-lg text-sm font-bold">\${confirmText}</button>
        </div>
      </div>
    </div>\`;
  document.getElementById('modal-confirm').onclick = () => { onConfirm && onConfirm(); closeModal() };
}
function closeModal() { document.getElementById('modal-root').innerHTML = '' }
function openShortcutsModal() {
  showModal({
    title: '⌨️ Keyboard Shortcuts',
    body: \`<div class="space-y-2 text-left"><div class="flex justify-between text-sm"><span>Search / Command</span><span class="kbd">⌘K</span></div><div class="flex justify-between text-sm"><span>Switch tabs</span><span class="kbd">⌘1-9</span></div><div class="flex justify-between text-sm"><span>Toggle theme</span><span class="kbd">⌘D</span></div><div class="flex justify-between text-sm"><span>Show shortcuts</span><span class="kbd">⌘/</span></div><div class="flex justify-between text-sm"><span>Close modal/sidebar</span><span class="kbd">Esc</span></div></div>\`,
    confirmText: 'Mengerti',
    onConfirm: () => {}
  });
  // Hide cancel button for info modal
  setTimeout(() => { const btns = document.querySelectorAll('#modal-root button'); if (btns[0]) btns[0].style.display='none' }, 0);
}
function openCommandPalette() {
  const tabs = ['dashboard','analyzer','coach','swot','pomodoro','journal','goals','habits','vision','review','resources','settings'];
  showModal({
    title: '🔍 Quick Navigation',
    body: '<input id="cmd-input" type="text" placeholder="Ketik nama tab..." class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mb-3 focus:outline-none focus:border-indigo-500" /><div id="cmd-results" class="space-y-1 max-h-60 overflow-y-auto"></div>',
    confirmText: 'Tutup',
    onConfirm: () => {}
  });
  setTimeout(() => {
    const input = document.getElementById('cmd-input');
    const results = document.getElementById('cmd-results');
    const render = (filter='') => {
      results.innerHTML = tabs.filter(t => t.includes(filter.toLowerCase())).map(t => \`<button onclick="closeModal();switchTab('\${t}')" class="w-full text-left px-3 py-2 hover:bg-white/5 rounded text-sm text-gray-300 capitalize">\${t}</button>\`).join('') || '<p class="text-gray-500 text-sm text-center p-3">Tidak ditemukan</p>';
    };
    render();
    input.focus();
    input.oninput = e => render(e.target.value);
  }, 50);
}

// ============================================
// THEME
// ============================================
function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  save(STORAGE.theme, isLight ? 'light' : 'dark');
  document.querySelector('#theme-toggle i').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
  toast(\`Mode \${isLight ? 'Light' : 'Dark'} aktif\`, 'info');
}
if (load(STORAGE.theme, 'dark') === 'light') {
  document.body.classList.add('light');
  setTimeout(() => { const i = document.querySelector('#theme-toggle i'); if (i) i.className = 'fas fa-sun' }, 50);
}

// ============================================
// SIDEBAR (Mobile fix)
// ============================================
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const bd = document.getElementById('sidebar-backdrop');
  const open = sb.classList.toggle('open');
  bd.classList.toggle('hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
}

// ============================================
// ACTIVITY TRACKING (for trend chart)
// ============================================
function logActivity() {
  const today = new Date().toISOString().split('T')[0];
  activityLog[today] = (activityLog[today] || 0) + 1;
  save(STORAGE.activity, activityLog);
}

// ============================================
// TABS
// ============================================
const TABS = {
  dashboard: { title:'Dashboard', render: renderDashboard },
  analyzer: { title:'AI Analyzer', render: renderAnalyzer },
  coach: { title:'AI Coach', render: renderCoach },
  swot: { title:'SWOT Analyzer', render: renderSWOT },
  pomodoro: { title:'Pomodoro V2', render: renderPomodoro },
  journal: { title:'Journal', render: renderJournal },
  goals: { title:'Goals', render: renderGoals },
  habits: { title:'Habits', render: renderHabits },
  vision: { title:'Vision Board', render: renderVision },
  review: { title:'Weekly Review', render: renderReview },
  resources: { title:'Resource Library', render: renderResources },
  settings: { title:'Settings', render: renderSettings },
};

function switchTab(id) {
  if (!TABS[id]) return;
  currentTab = id;
  document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  document.getElementById('page-title').textContent = TABS[id].title;
  TABS[id].render();
  // Auto-close sidebar on mobile after navigation
  if (window.innerWidth < 1024) {
    const sb = document.getElementById('sidebar');
    if (sb.classList.contains('open')) toggleSidebar();
  }
  document.getElementById('content').scrollTop = 0;
  logActivity();
}

// ============================================
// DASHBOARD with Weekly Trend
// ============================================
function renderDashboard() {
  const completedGoals = goals.filter(g => g.progress >= 100).length;
  const totalHabits = habits.length;
  const journalEntries = journal.length;

  // Weekly trend: last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    days.push({ key, label: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'][d.getDay()], count: activityLog[key] || 0 });
  }
  const maxCount = Math.max(...days.map(d => d.count), 1);

  const hour = new Date().getHours();
  const greet = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam';

  document.getElementById('content').innerHTML = \`
    <div class="space-y-6">
      <div class="glass rounded-2xl p-5 sm:p-6">
        <p class="text-sm text-gray-400">\${greet}, Sovereign 👋</p>
        <h2 class="text-2xl sm:text-3xl font-bold text-white mt-1">Mari mulai hari penuh kemenangan</h2>
        <p class="text-xs text-gray-500 mt-2">V5.0 SOVEREIGN · 18+ AI Categories · Semua data tersimpan aman di browser</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        \${[
          ['🎯', goals.length, 'Total Goals', 'indigo'],
          ['✅', completedGoals, 'Completed', 'emerald'],
          ['🔥', totalHabits, 'Active Habits', 'amber'],
          ['📓', journalEntries, 'Journal Entries', 'pink'],
        ].map(([icon, val, label, color]) => \`
          <div class="glass rounded-xl p-4">
            <div class="text-2xl mb-2">\${icon}</div>
            <div class="text-2xl sm:text-3xl font-black text-\${color}-400 counter-num">\${val}</div>
            <div class="text-xs text-gray-500 mt-1">\${label}</div>
          </div>
        \`).join('')}
      </div>

      <div class="glass rounded-2xl p-5 sm:p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="text-lg font-bold text-white">📊 Weekly Activity Trend</h3>
            <p class="text-xs text-gray-500 mt-0.5">7 hari terakhir</p>
          </div>
          <span class="text-xs text-indigo-400 font-bold">\${days.reduce((a, d) => a + d.count, 0)} actions</span>
        </div>
        <div class="flex items-end gap-2 sm:gap-3 h-40">
          \${days.map((d, i) => {
            const h = (d.count / maxCount) * 100;
            return \`<div class="flex-1 flex flex-col items-center gap-2">
              <div class="text-[10px] font-bold text-gray-400">\${d.count}</div>
              <div class="w-full bg-white/[0.03] rounded-lg flex items-end" style="height:120px"><div class="w-full bar-anim rounded-lg bg-gradient-to-t from-indigo-600 to-purple-500" style="height:\${h}%;animation-delay:\${i*60}ms"></div></div>
              <div class="text-[10px] text-gray-500">\${d.label}</div>
            </div>\`;
          }).join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="glass rounded-2xl p-5">
          <h3 class="font-bold text-white mb-4">⚡ Quick Actions</h3>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="switchTab('analyzer')" class="glass rounded-lg p-3 text-left hover:bg-white/[0.05] transition"><div class="text-xl mb-1">🧠</div><div class="text-xs font-semibold text-white">AI Analyze</div></button>
            <button onclick="switchTab('pomodoro')" class="glass rounded-lg p-3 text-left hover:bg-white/[0.05] transition"><div class="text-xl mb-1">🍅</div><div class="text-xs font-semibold text-white">Start Focus</div></button>
            <button onclick="switchTab('journal')" class="glass rounded-lg p-3 text-left hover:bg-white/[0.05] transition"><div class="text-xl mb-1">📓</div><div class="text-xs font-semibold text-white">New Journal</div></button>
            <button onclick="switchTab('goals')" class="glass rounded-lg p-3 text-left hover:bg-white/[0.05] transition"><div class="text-xl mb-1">🎯</div><div class="text-xs font-semibold text-white">Add Goal</div></button>
          </div>
        </div>
        <div class="glass rounded-2xl p-5">
          <h3 class="font-bold text-white mb-4">🍅 Pomodoro Stats</h3>
          <div class="space-y-3">
            <div class="flex justify-between text-sm"><span class="text-gray-400">Total Sessions</span><span class="text-white font-bold counter-num">\${pomoStats.sessions}</span></div>
            <div class="flex justify-between text-sm"><span class="text-gray-400">Total Focus Time</span><span class="text-white font-bold counter-num">\${pomoStats.totalMin}m</span></div>
            <div class="flex justify-between text-sm"><span class="text-gray-400">Streak</span><span class="text-amber-400 font-bold">🔥 \${streak} hari</span></div>
            <button onclick="switchTab('pomodoro')" class="w-full mt-3 btn-primary text-white py-2 rounded-lg text-sm font-bold">Start Session</button>
          </div>
        </div>
      </div>
    </div>\`;
}

// ============================================
// AI ANALYZER (Chat with persistent memory)
// ============================================
function renderAnalyzer() {
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div>
            <h3 class="text-lg font-bold text-white">🧠 AI Sovereign Engine V5</h3>
            <p class="text-xs text-gray-500">18+ kategori · Chat memory persist</p>
          </div>
          <button onclick="clearChat()" class="text-xs text-gray-500 hover:text-rose-400 transition"><i class="fas fa-trash"></i> Clear</button>
        </div>
        <div id="chat-box" class="space-y-3 max-h-[480px] overflow-y-auto p-3 bg-white/[0.02] border border-white/5 rounded-xl mb-3"></div>
        <div class="flex gap-2">
          <input id="chat-input" type="text" placeholder="Tanya apa saja: bisnis, karir, spiritual, side hustle..." class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500" onkeypress="if(event.key==='Enter')sendChat()" />
          <button onclick="sendChat()" class="btn-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold"><i class="fas fa-paper-plane"></i></button>
        </div>
        <div class="flex flex-wrap gap-2 mt-3">
          \${['Bisnis online','Karir tech','Side hustle','Spiritual','Mental health','Parenting'].map(s => \`<button onclick="document.getElementById('chat-input').value='\${s}';sendChat()" class="text-[10px] px-2.5 py-1 glass rounded-full text-gray-400 hover:text-white transition">\${s}</button>\`).join('')}
        </div>
      </div>
    </div>\`;
  // Restore history
  const box = document.getElementById('chat-box');
  if (chatHistory.length === 0) {
    box.innerHTML = '<div class="text-center text-gray-500 text-sm py-8">💬 Mulai percakapan strategis...</div>';
  } else {
    box.innerHTML = chatHistory.map(msg => msg.role === 'user'
      ? \`<div class="flex justify-end"><div class="bg-indigo-500/20 border border-indigo-500/30 rounded-xl px-4 py-2.5 max-w-[80%] text-sm text-white">\${msg.content}</div></div>\`
      : \`<div class="flex justify-start"><div class="glass rounded-xl px-4 py-3 max-w-[90%]">\${msg.content}</div></div>\`
    ).join('');
    box.scrollTop = box.scrollHeight;
  }
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  const box = document.getElementById('chat-box');
  if (chatHistory.length === 0) box.innerHTML = '';
  box.innerHTML += \`<div class="flex justify-end"><div class="bg-indigo-500/20 border border-indigo-500/30 rounded-xl px-4 py-2.5 max-w-[80%] text-sm text-white">\${msg}</div></div>\`;
  chatHistory.push({ role:'user', content:msg });
  input.value = '';
  box.scrollTop = box.scrollHeight;

  // Typing indicator
  const tid = 'typing-' + Date.now();
  box.innerHTML += \`<div id="\${tid}" class="flex justify-start"><div class="glass rounded-xl px-4 py-3 text-sm text-gray-400 typing">Berpikir</div></div>\`;
  box.scrollTop = box.scrollHeight;

  try {
    const r = await fetch('/api/analyze', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: msg, history: chatHistory.slice(-10) }) });
    const data = await r.json();
    document.getElementById(tid)?.remove();
    box.innerHTML += \`<div class="flex justify-start"><div class="glass rounded-xl px-4 py-3 max-w-[90%]">\${data.response}</div></div>\`;
    chatHistory.push({ role:'ai', content: data.response });
    save(STORAGE.chat, chatHistory);
    box.scrollTop = box.scrollHeight;
    logActivity();
  } catch (e) {
    document.getElementById(tid)?.remove();
    toast('Gagal terhubung. Coba lagi.', 'error');
  }
}

function clearChat() {
  showModal({
    title: 'Hapus Riwayat Chat?',
    body: 'Semua percakapan akan dihapus permanen. Aksi ini tidak bisa dibatalkan.',
    confirmText: 'Hapus Semua',
    confirmClass: 'bg-rose-500 hover:bg-rose-600',
    onConfirm: () => {
      chatHistory = [];
      save(STORAGE.chat, chatHistory);
      renderAnalyzer();
      toast('Chat history dihapus', 'success');
    }
  });
}

// ============================================
// AI COACH
// ============================================
function renderCoach() {
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <h3 class="text-lg font-bold text-white mb-1">🧭 AI Coach V5</h3>
        <p class="text-xs text-gray-500 mb-4">Personal coaching session</p>
        <div class="space-y-3">
          <div><label class="text-xs text-gray-400 font-semibold">🎯 Goal kamu</label><input id="coach-goal" type="text" placeholder="Mau achieve apa dalam 3 bulan?" class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" /></div>
          <div><label class="text-xs text-gray-400 font-semibold">📍 Posisi sekarang</label><input id="coach-state" type="text" placeholder="Di mana posisimu sekarang?" class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" /></div>
          <div><label class="text-xs text-gray-400 font-semibold">⚠️ Hambatan utama</label><input id="coach-blockers" type="text" placeholder="Apa yang menghalangi?" class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" /></div>
          <button onclick="getCoaching()" class="btn-primary text-white w-full py-2.5 rounded-lg text-sm font-bold">Dapatkan Coaching</button>
        </div>
      </div>
      <div id="coach-result"></div>
    </div>\`;
}
async function getCoaching() {
  const goal = document.getElementById('coach-goal').value.trim();
  const currentState = document.getElementById('coach-state').value.trim();
  const obstacles = document.getElementById('coach-blockers').value.trim();
  if (!goal) return toast('Goal wajib diisi', 'warn');
  document.getElementById('coach-result').innerHTML = '<div class="glass rounded-2xl p-5 text-center text-gray-400 text-sm typing">Coach sedang menyusun...</div>';
  try {
    const r = await fetch('/api/coach', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ goal, currentState, obstacles }) });
    const data = await r.json();
    document.getElementById('coach-result').innerHTML = \`<div class="glass rounded-2xl p-5">\${data.response}</div>\`;
    logActivity();
    toast('Coaching tersusun!', 'success');
  } catch (e) { toast('Gagal terhubung', 'error') }
}

// ============================================
// SWOT
// ============================================
function renderSWOT() {
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <h3 class="text-lg font-bold text-white mb-1">📊 SWOT Analyzer</h3>
        <p class="text-xs text-gray-500 mb-4">Generate analisis SWOT instan</p>
        <div class="flex gap-2">
          <input id="swot-input" type="text" placeholder="Bisnis/ide kamu (cth: jasa desain grafis)" class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500" onkeypress="if(event.key==='Enter')getSWOT()" />
          <button onclick="getSWOT()" class="btn-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold">Analyze</button>
        </div>
      </div>
      <div id="swot-result"></div>
    </div>\`;
}
async function getSWOT() {
  const business = document.getElementById('swot-input').value.trim();
  if (!business) return toast('Isi dulu bisnis/ide', 'warn');
  document.getElementById('swot-result').innerHTML = '<div class="glass rounded-2xl p-5 text-center text-gray-400 text-sm typing">Menganalisis</div>';
  try {
    const r = await fetch('/api/swot', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ business }) });
    const data = await r.json();
    document.getElementById('swot-result').innerHTML = \`<div class="glass rounded-2xl p-5">\${data.response}</div>\`;
    logActivity();
    toast('SWOT tergenerate', 'success');
  } catch (e) { toast('Gagal terhubung', 'error') }
}

// ============================================
// POMODORO V2
// ============================================
let pomoTimer = null, pomoMode = 'focus', pomoTime = 25*60, pomoOriginal = 25*60, pomoRunning = false, pomoAuto = load('sm_pomo_auto', false);
function renderPomodoro() {
  const pct = ((pomoOriginal - pomoTime) / pomoOriginal) * 100;
  const offset = 565 - (565 * pct / 100);
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-6 sm:p-8 text-center">
        <div class="flex justify-center gap-2 mb-6 flex-wrap">
          <button onclick="setPomoMode('focus',25)" class="px-4 py-1.5 rounded-lg text-xs font-bold \${pomoMode==='focus'?'bg-indigo-500 text-white':'glass text-gray-400'}">🎯 Focus 25</button>
          <button onclick="setPomoMode('break',5)" class="px-4 py-1.5 rounded-lg text-xs font-bold \${pomoMode==='break'?'bg-emerald-500 text-white':'glass text-gray-400'}">☕ Break 5</button>
          <button onclick="setPomoMode('long',15)" class="px-4 py-1.5 rounded-lg text-xs font-bold \${pomoMode==='long'?'bg-amber-500 text-white':'glass text-gray-400'}">🌴 Long 15</button>
        </div>
        <div class="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto">
          <svg class="w-full h-full" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="8"/>
            <circle id="pomo-ring" class="ring-progress" cx="100" cy="100" r="90" fill="none" stroke="url(#pgr)" stroke-width="8" stroke-linecap="round" stroke-dasharray="565" stroke-dashoffset="\${offset}"/>
            <defs><linearGradient id="pgr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#818cf8"/><stop offset="100%" stop-color="#f472b6"/></linearGradient></defs>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <div id="pomo-display" class="text-5xl sm:text-6xl font-black text-white counter-num">\${fmtTime(pomoTime)}</div>
            <div class="text-xs text-gray-500 mt-2 uppercase tracking-widest">\${pomoMode === 'focus' ? 'Deep Work' : pomoMode === 'break' ? 'Short Break' : 'Long Break'}</div>
          </div>
        </div>
        <div class="flex gap-3 justify-center mt-6">
          <button onclick="togglePomo()" id="pomo-btn" class="btn-primary text-white px-7 py-2.5 rounded-lg text-sm font-bold">\${pomoRunning ? '⏸ Pause' : '▶ Start'}</button>
          <button onclick="resetPomo()" class="glass text-gray-300 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-white/10 transition">↺ Reset</button>
        </div>
        <label class="inline-flex items-center gap-2 mt-4 text-xs text-gray-400 cursor-pointer"><input type="checkbox" \${pomoAuto ? 'checked' : ''} onchange="pomoAuto=this.checked;localStorage.setItem('sm_pomo_auto',this.checked)"> Auto-start next session</label>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div class="glass rounded-xl p-4 text-center"><div class="text-2xl font-black text-indigo-400 counter-num">\${pomoStats.sessions}</div><div class="text-xs text-gray-500 mt-1">Sessions</div></div>
        <div class="glass rounded-xl p-4 text-center"><div class="text-2xl font-black text-emerald-400 counter-num">\${pomoStats.totalMin}m</div><div class="text-xs text-gray-500 mt-1">Focus Time</div></div>
        <div class="glass rounded-xl p-4 text-center"><div class="text-2xl font-black text-amber-400 counter-num">\${focusMin}</div><div class="text-xs text-gray-500 mt-1">Today (min)</div></div>
      </div>
    </div>\`;
}
function fmtTime(s) { return \`\${String(Math.floor(s/60)).padStart(2,'0')}:\${String(s%60).padStart(2,'0')}\` }
function setPomoMode(m, min) { pomoMode = m; pomoTime = min * 60; pomoOriginal = min * 60; pomoRunning = false; clearInterval(pomoTimer); renderPomodoro() }
function togglePomo() {
  if (pomoRunning) { clearInterval(pomoTimer); pomoRunning = false }
  else {
    pomoRunning = true;
    pomoTimer = setInterval(() => {
      pomoTime--;
      if (pomoTime <= 0) {
        clearInterval(pomoTimer); pomoRunning = false;
        // Audio beep
        try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = 880; g.gain.value = 0.3; o.start(); setTimeout(()=>{ g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5); o.stop(ctx.currentTime + 0.5)}, 300) } catch {}
        if (pomoMode === 'focus') {
          pomoStats.sessions++; pomoStats.totalMin += pomoOriginal/60; focusMin += pomoOriginal/60;
          save(STORAGE.pomoStats, pomoStats); save(STORAGE.focus, focusMin);
          showModal({ title:'🎉 Focus Selesai!', body:\`Hebat! \${pomoOriginal/60} menit deep work tercapai. Saatnya istirahat.\`, confirmText:'Mulai Break', onConfirm: () => { setPomoMode('break', 5); if(pomoAuto) togglePomo() }});
        } else {
          showModal({ title:'☕ Break Selesai!', body:'Saatnya kembali fokus. Siap?', confirmText:'Lanjut Focus', onConfirm: () => { setPomoMode('focus', 25); if(pomoAuto) togglePomo() }});
        }
        logActivity();
        return;
      }
      const display = document.getElementById('pomo-display');
      const ring = document.getElementById('pomo-ring');
      if (display) display.textContent = fmtTime(pomoTime);
      if (ring) ring.setAttribute('stroke-dashoffset', 565 - (565 * ((pomoOriginal - pomoTime) / pomoOriginal)));
    }, 1000);
  }
  document.getElementById('pomo-btn').textContent = pomoRunning ? '⏸ Pause' : '▶ Start';
}
function resetPomo() { clearInterval(pomoTimer); pomoTime = pomoOriginal; pomoRunning = false; renderPomodoro() }

// ============================================
// JOURNAL with mood + edit/delete
// ============================================
let currentMood = '';
function renderJournal() {
  const moods = [['😄','great'],['🙂','good'],['😐','okay'],['😞','sad'],['😡','angry'],['😴','tired']];
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <h3 class="text-lg font-bold text-white mb-1">📓 Daily Journal</h3>
        <p class="text-xs text-gray-500 mb-4">Mood tracker + refleksi harian</p>
        <p class="text-xs text-gray-400 font-semibold mb-2">Mood hari ini:</p>
        <div class="flex gap-2 mb-4 flex-wrap">
          \${moods.map(([emoji, val]) => \`<button onclick="selectMood('\${val}', this)" data-mood="\${val}" class="mood-btn text-2xl p-2 rounded-lg glass hover:bg-white/10 transition">\${emoji}</button>\`).join('')}
        </div>
        <textarea id="journal-text" placeholder="Apa yang terjadi hari ini? Apa yang kamu syukuri? Pelajaran apa?" rows="5" class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"></textarea>
        <button onclick="saveJournal()" class="btn-primary text-white w-full mt-3 py-2.5 rounded-lg text-sm font-bold">💾 Save Entry</button>
      </div>
      <div id="journal-list" class="space-y-3"></div>
    </div>\`;
  renderJournalList();
}
function selectMood(mood, btn) {
  currentMood = mood;
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('bg-indigo-500/20', 'border-indigo-500'));
  btn.classList.add('bg-indigo-500/20', 'border-indigo-500');
}
function saveJournal() {
  const text = document.getElementById('journal-text').value.trim();
  if (!text) return toast('Tulis sesuatu dulu', 'warn');
  if (!currentMood) return toast('Pilih mood dulu', 'warn');
  journal.unshift({ id: Date.now(), text, mood: currentMood, date: new Date().toLocaleString('id-ID') });
  save(STORAGE.journal, journal);
  document.getElementById('journal-text').value = '';
  currentMood = '';
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('bg-indigo-500/20', 'border-indigo-500'));
  renderJournalList();
  logActivity();
  toast('Journal tersimpan ✨', 'success');
}
function renderJournalList() {
  const moodMap = { great:'😄', good:'🙂', okay:'😐', sad:'😞', angry:'😡', tired:'😴' };
  const list = document.getElementById('journal-list');
  if (!list) return;
  list.innerHTML = journal.length === 0 ? '<div class="glass rounded-xl p-8 text-center text-gray-500 text-sm">📓 Belum ada entry. Mulai journal-mu hari ini!</div>' :
    journal.map(j => \`
      <div class="glass rounded-xl p-4">
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-2xl">\${moodMap[j.mood]||'📝'}</span>
            <span class="text-xs text-gray-500">\${j.date}</span>
          </div>
          <button onclick="deleteJournal(\${j.id})" class="text-gray-500 hover:text-rose-400 text-xs"><i class="fas fa-trash"></i></button>
        </div>
        <p class="text-gray-300 text-sm whitespace-pre-wrap">\${j.text}</p>
      </div>
    \`).join('');
}
function deleteJournal(id) {
  showModal({
    title: 'Hapus Entry?', body: 'Entry journal akan dihapus permanen.',
    confirmText: 'Hapus', confirmClass: 'bg-rose-500 hover:bg-rose-600',
    onConfirm: () => { journal = journal.filter(j => j.id !== id); save(STORAGE.journal, journal); renderJournalList(); toast('Entry dihapus', 'success') }
  });
}

// ============================================
// GOALS
// ============================================
function renderGoals() {
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <h3 class="text-lg font-bold text-white mb-3">🎯 Goal Tracker Pro</h3>
        <div class="flex flex-col sm:flex-row gap-2">
          <input id="goal-input" type="text" placeholder="Goal baru (cth: Revenue 10jt/bulan)" class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" onkeypress="if(event.key==='Enter')addGoal()" />
          <button onclick="addGoal()" class="btn-primary text-white px-5 py-2 rounded-lg text-sm font-bold">+ Add</button>
        </div>
      </div>
      <div id="goals-list" class="space-y-3"></div>
    </div>\`;
  renderGoalsList();
}
function addGoal() {
  const t = document.getElementById('goal-input').value.trim();
  if (!t) return toast('Goal kosong', 'warn');
  goals.push({ id: Date.now(), title: t, progress: 0 });
  save(STORAGE.goals, goals);
  document.getElementById('goal-input').value = '';
  renderGoalsList(); logActivity(); toast('Goal ditambahkan', 'success');
}
function updateGoal(id, p) { const g = goals.find(x => x.id === id); if (g) { g.progress = Math.max(0, Math.min(100, p)); save(STORAGE.goals, goals); renderGoalsList() } }
function deleteGoal(id) {
  const g = goals.find(x => x.id === id); if (!g) return;
  showModal({ title:'Hapus Goal?', body:\`"\${g.title}" akan dihapus permanen.\`, confirmText:'Hapus', confirmClass:'bg-rose-500 hover:bg-rose-600',
    onConfirm: () => { goals = goals.filter(x => x.id !== id); save(STORAGE.goals, goals); renderGoalsList(); toast('Goal dihapus', 'success') }});
}
function renderGoalsList() {
  const list = document.getElementById('goals-list'); if (!list) return;
  list.innerHTML = goals.length === 0 ? '<div class="glass rounded-xl p-8 text-center text-gray-500 text-sm">🎯 Belum ada goal. Tambahkan satu!</div>' :
    goals.map(g => \`
      <div class="glass rounded-xl p-4">
        <div class="flex items-start justify-between mb-3 gap-3">
          <p class="text-white text-sm font-semibold flex-1 \${g.progress >= 100 ? 'line-through text-gray-500' : ''}">\${g.title}</p>
          <button onclick="deleteGoal(\${g.id})" class="text-gray-500 hover:text-rose-400 text-xs"><i class="fas fa-trash"></i></button>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex-1 bg-white/5 rounded-full h-2 overflow-hidden"><div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all" style="width:\${g.progress}%"></div></div>
          <span class="text-xs font-bold text-indigo-400 counter-num min-w-[40px] text-right">\${g.progress}%</span>
        </div>
        <div class="flex gap-2 mt-3">
          <button onclick="updateGoal(\${g.id},\${g.progress-10})" class="text-xs px-2 py-1 glass rounded text-gray-400 hover:text-white">-10</button>
          <button onclick="updateGoal(\${g.id},\${g.progress+10})" class="text-xs px-2 py-1 glass rounded text-gray-400 hover:text-white">+10</button>
          <button onclick="updateGoal(\${g.id},100)" class="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded hover:bg-emerald-500/30">✓ Done</button>
        </div>
      </div>
    \`).join('');
}

// ============================================
// HABITS
// ============================================
function renderHabits() {
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <h3 class="text-lg font-bold text-white mb-3">🔥 Habit Tracker</h3>
        <div class="flex flex-col sm:flex-row gap-2">
          <input id="habit-input" type="text" placeholder="Habit baru (cth: Olahraga 30 menit)" class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" onkeypress="if(event.key==='Enter')addHabit()" />
          <button onclick="addHabit()" class="btn-primary text-white px-5 py-2 rounded-lg text-sm font-bold">+ Add</button>
        </div>
      </div>
      <div id="habits-list" class="space-y-3"></div>
    </div>\`;
  renderHabitsList();
}
function addHabit() {
  const t = document.getElementById('habit-input').value.trim();
  if (!t) return toast('Habit kosong', 'warn');
  habits.push({ id: Date.now(), title: t, streak: 0, lastCheck: null });
  save(STORAGE.habits, habits);
  document.getElementById('habit-input').value = '';
  renderHabitsList(); logActivity(); toast('Habit ditambahkan', 'success');
}
function checkHabit(id) {
  const h = habits.find(x => x.id === id); if (!h) return;
  const today = new Date().toDateString();
  if (h.lastCheck === today) return toast('Sudah check-in hari ini', 'info');
  h.streak++; h.lastCheck = today;
  save(STORAGE.habits, habits); renderHabitsList(); logActivity();
  toast(\`🔥 Streak \${h.streak} hari!\`, 'success');
}
function deleteHabit(id) {
  const h = habits.find(x => x.id === id); if (!h) return;
  showModal({ title:'Hapus Habit?', body:\`"\${h.title}" akan dihapus.\`, confirmText:'Hapus', confirmClass:'bg-rose-500 hover:bg-rose-600',
    onConfirm: () => { habits = habits.filter(x => x.id !== id); save(STORAGE.habits, habits); renderHabitsList(); toast('Habit dihapus', 'success') }});
}
function renderHabitsList() {
  const list = document.getElementById('habits-list'); if (!list) return;
  const today = new Date().toDateString();
  list.innerHTML = habits.length === 0 ? '<div class="glass rounded-xl p-8 text-center text-gray-500 text-sm">🔥 Belum ada habit. Mulai bangun satu!</div>' :
    habits.map(h => \`
      <div class="glass rounded-xl p-4 flex items-center gap-3">
        <button onclick="checkHabit(\${h.id})" class="w-10 h-10 rounded-lg flex items-center justify-center text-lg \${h.lastCheck === today ? 'bg-emerald-500 text-white' : 'glass text-gray-400 hover:bg-white/10'}">\${h.lastCheck === today ? '✓' : '○'}</button>
        <div class="flex-1"><p class="text-white text-sm font-semibold">\${h.title}</p><p class="text-xs text-amber-400 mt-0.5">🔥 \${h.streak} hari streak</p></div>
        <button onclick="deleteHabit(\${h.id})" class="text-gray-500 hover:text-rose-400"><i class="fas fa-trash text-xs"></i></button>
      </div>
    \`).join('');
}

// ============================================
// VISION BOARD
// ============================================
function renderVision() {
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <h3 class="text-lg font-bold text-white mb-1">🎨 Vision Board</h3>
        <p class="text-xs text-gray-500 mb-4">Kristalkan visi & cita-citamu</p>
        <div class="space-y-3">
          <div><label class="text-xs text-violet-400 font-bold uppercase tracking-wider">Big Vision (5-10 thn)</label><textarea id="v-big" rows="2" placeholder="Hidup ideal kamu..." class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500">\${vision.big}</textarea></div>
          <div><label class="text-xs text-indigo-400 font-bold uppercase tracking-wider">1 Tahun</label><textarea id="v-y1" rows="2" placeholder="Achievement 1 tahun..." class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500">\${vision.y1}</textarea></div>
          <div><label class="text-xs text-blue-400 font-bold uppercase tracking-wider">3 Bulan</label><textarea id="v-m3" rows="2" placeholder="Target 3 bulan..." class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500">\${vision.m3}</textarea></div>
          <div><label class="text-xs text-emerald-400 font-bold uppercase tracking-wider">Minggu Ini</label><textarea id="v-w1" rows="2" placeholder="Yang akan kamu lakukan minggu ini..." class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500">\${vision.w1}</textarea></div>
          <button onclick="saveVision()" class="btn-primary text-white w-full py-2.5 rounded-lg text-sm font-bold">💾 Save Vision</button>
        </div>
      </div>
    </div>\`;
}
function saveVision() {
  vision = {
    big: document.getElementById('v-big').value,
    y1: document.getElementById('v-y1').value,
    m3: document.getElementById('v-m3').value,
    w1: document.getElementById('v-w1').value,
  };
  save(STORAGE.vision, vision); logActivity(); toast('Vision tersimpan ✨', 'success');
}

// ============================================
// WEEKLY REVIEW
// ============================================
function renderReview() {
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <h3 class="text-lg font-bold text-white mb-1">📋 Weekly Review</h3>
        <p class="text-xs text-gray-500 mb-4">Refleksi mingguan = pertumbuhan eksponensial</p>
        <div class="space-y-3">
          <div><label class="text-xs text-emerald-400 font-bold uppercase tracking-wider">🏆 3 Wins Minggu Ini</label><textarea id="r-wins" rows="3" class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500">\${review.wins}</textarea></div>
          <div><label class="text-xs text-amber-400 font-bold uppercase tracking-wider">📚 3 Pelajaran</label><textarea id="r-learn" rows="3" class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500">\${review.learnings}</textarea></div>
          <div><label class="text-xs text-indigo-400 font-bold uppercase tracking-wider">🎯 Focus Minggu Depan</label><textarea id="r-focus" rows="3" class="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500">\${review.focus}</textarea></div>
          <button onclick="saveReview()" class="btn-primary text-white w-full py-2.5 rounded-lg text-sm font-bold">💾 Save Review</button>
        </div>
      </div>
    </div>\`;
}
function saveReview() {
  review = {
    wins: document.getElementById('r-wins').value,
    learnings: document.getElementById('r-learn').value,
    focus: document.getElementById('r-focus').value,
  };
  save(STORAGE.review, review); logActivity(); toast('Review tersimpan', 'success');
}

// ============================================
// RESOURCES with debounced search
// ============================================
let resourceData = [], searchTimer = null;
async function renderResources() {
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <h3 class="text-lg font-bold text-white mb-1">📚 Resource Library</h3>
        <p class="text-xs text-gray-500 mb-4">21+ frameworks · Klik untuk detail</p>
        <input id="res-search" type="text" placeholder="🔍 Cari framework..." class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" />
      </div>
      <div id="res-list" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
    </div>\`;
  if (resourceData.length === 0) {
    try { const r = await fetch('/api/resources'); const d = await r.json(); resourceData = d.resources } catch { resourceData = [] }
  }
  renderResourcesList('');
  document.getElementById('res-search').oninput = e => {
    clearTimeout(searchTimer);
    const q = e.target.value;
    searchTimer = setTimeout(() => renderResourcesList(q), 300);
  };
}
function renderResourcesList(q) {
  const list = document.getElementById('res-list'); if (!list) return;
  const filtered = resourceData.filter(r => !q || r.title.toLowerCase().includes(q.toLowerCase()) || r.category.toLowerCase().includes(q.toLowerCase()));
  list.innerHTML = filtered.length === 0 ? '<div class="col-span-full glass rounded-xl p-8 text-center text-gray-500 text-sm">🔍 Tidak ditemukan</div>' :
    filtered.map(r => \`
      <div class="glass rounded-xl p-4 cursor-pointer hover:bg-white/[0.05] transition" onclick="toggleResource(\${r.id})">
        <div class="flex items-start gap-3">
          <span class="text-2xl">\${r.icon}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2 mb-1">
              <p class="text-white text-sm font-bold truncate">\${r.title}</p>
              <span class="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">\${r.category}</span>
            </div>
            <p class="text-gray-400 text-xs leading-relaxed">\${r.description}</p>
            <div id="res-detail-\${r.id}" class="resource-detail">
              <div class="mt-3 pt-3 border-t border-white/5"><p class="text-emerald-400 text-xs font-bold mb-1">💡 Detail</p><p class="text-gray-300 text-xs">\${r.detail}</p></div>
            </div>
          </div>
        </div>
      </div>
    \`).join('');
}
function toggleResource(id) { document.getElementById(\`res-detail-\${id}\`)?.classList.toggle('open') }

// ============================================
// SETTINGS (Backup/Restore + Theme)
// ============================================
function renderSettings() {
  document.getElementById('content').innerHTML = \`
    <div class="space-y-4">
      <div class="glass rounded-2xl p-5">
        <h3 class="text-lg font-bold text-white mb-1">⚙️ Settings</h3>
        <p class="text-xs text-gray-500 mb-4">Backup, restore & manage data</p>
      </div>

      <div class="glass rounded-2xl p-5">
        <h4 class="font-bold text-white mb-2">💾 Backup & Restore</h4>
        <p class="text-xs text-gray-500 mb-4">Export semua data ke JSON file. Import balik kapan saja.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button onclick="exportData()" class="btn-primary text-white py-2.5 rounded-lg text-sm font-bold">📤 Export JSON</button>
          <label class="glass text-gray-300 py-2.5 rounded-lg text-sm font-bold text-center cursor-pointer hover:bg-white/10 transition">📥 Import JSON<input type="file" accept=".json" onchange="importData(event)" class="hidden"/></label>
        </div>
      </div>

      <div class="glass rounded-2xl p-5">
        <h4 class="font-bold text-white mb-2">📊 Data Stats</h4>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-gray-400">Goals</span><span class="text-white font-bold">\${goals.length}</span></div>
          <div class="flex justify-between"><span class="text-gray-400">Habits</span><span class="text-white font-bold">\${habits.length}</span></div>
          <div class="flex justify-between"><span class="text-gray-400">Journal Entries</span><span class="text-white font-bold">\${journal.length}</span></div>
          <div class="flex justify-between"><span class="text-gray-400">Chat Messages</span><span class="text-white font-bold">\${chatHistory.length}</span></div>
          <div class="flex justify-between"><span class="text-gray-400">Pomodoro Sessions</span><span class="text-white font-bold">\${pomoStats.sessions}</span></div>
        </div>
      </div>

      <div class="glass rounded-2xl p-5 border border-rose-500/20">
        <h4 class="font-bold text-rose-400 mb-2">⚠️ Danger Zone</h4>
        <p class="text-xs text-gray-500 mb-3">Reset semua data. Tidak bisa di-undo.</p>
        <button onclick="resetAll()" class="bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 px-4 py-2 rounded-lg text-sm font-bold transition">🗑️ Reset All Data</button>
      </div>
    </div>\`;
}

function exportData() {
  const data = {
    version: '5.0', exported: new Date().toISOString(),
    goals, habits, vision, review, journal, focusMin, streak, chatHistory, pomoStats, activityLog
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = \`sparkmind-backup-\${new Date().toISOString().split('T')[0]}.json\`;
  a.click(); URL.revokeObjectURL(url);
  toast('Data ter-export!', 'success');
}

function importData(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      showModal({
        title: 'Import Backup?',
        body: \`Akan replace semua data lokal dengan backup dari \${new Date(data.exported).toLocaleString('id-ID')}. Lanjutkan?\`,
        confirmText: 'Import',
        onConfirm: () => {
          if (data.goals) { goals = data.goals; save(STORAGE.goals, goals) }
          if (data.habits) { habits = data.habits; save(STORAGE.habits, habits) }
          if (data.vision) { vision = data.vision; save(STORAGE.vision, vision) }
          if (data.review) { review = data.review; save(STORAGE.review, review) }
          if (data.journal) { journal = data.journal; save(STORAGE.journal, journal) }
          if (data.chatHistory) { chatHistory = data.chatHistory; save(STORAGE.chat, chatHistory) }
          if (data.pomoStats) { pomoStats = data.pomoStats; save(STORAGE.pomoStats, pomoStats) }
          if (data.activityLog) { activityLog = data.activityLog; save(STORAGE.activity, activityLog) }
          if (typeof data.focusMin === 'number') { focusMin = data.focusMin; save(STORAGE.focus, focusMin) }
          if (typeof data.streak === 'number') { streak = data.streak; save(STORAGE.streak, streak) }
          toast('Data ter-import!', 'success');
          renderSettings();
        }
      });
    } catch (err) { toast('File JSON invalid', 'error') }
  };
  reader.readAsText(file);
}

function resetAll() {
  showModal({
    title: '⚠️ Reset Semua Data?',
    body: 'Semua data (goals, habits, journal, chat, vision, review, dll) akan dihapus PERMANEN. Tindakan ini tidak bisa dibatalkan.',
    confirmText: 'Reset Semuanya',
    confirmClass: 'bg-rose-500 hover:bg-rose-600',
    onConfirm: () => {
      Object.values(STORAGE).forEach(k => { if (k !== STORAGE.theme) localStorage.removeItem(k) });
      goals = []; habits = []; vision = { big:'', y1:'', m3:'', w1:'' }; review = { wins:'', learnings:'', focus:'' };
      journal = []; focusMin = 0; streak = 0; chatHistory = []; pomoStats = { sessions:0, totalMin:0 }; activityLog = {};
      toast('Semua data direset', 'success');
      switchTab('dashboard');
    }
  });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
const tabKeys = ['dashboard','analyzer','coach','swot','pomodoro','journal','goals','habits','vision'];
document.addEventListener('keydown', (e) => {
  const cmd = e.metaKey || e.ctrlKey;
  if (cmd && e.key === 'k') { e.preventDefault(); openCommandPalette() }
  else if (cmd && e.key === '/') { e.preventDefault(); openShortcutsModal() }
  else if (cmd && e.key === 'd') { e.preventDefault(); toggleTheme() }
  else if (cmd && e.key >= '1' && e.key <= '9') {
    const idx = parseInt(e.key) - 1;
    if (tabKeys[idx]) { e.preventDefault(); switchTab(tabKeys[idx]) }
  }
  else if (e.key === 'Escape') { closeModal(); const sb = document.getElementById('sidebar'); if (sb && sb.classList.contains('open')) toggleSidebar() }
});

// ============================================
// INIT
// ============================================
async function loadQuote() {
  try {
    const r = await fetch('/api/quotes');
    const q = await r.json();
    const el = document.getElementById('quote-ticker');
    if (el) el.textContent = \`"\${q.text}"\`;
  } catch {}
}
loadQuote();
setInterval(loadQuote, 60000);

switchTab('dashboard');
setTimeout(() => toast('🚀 SparkMind V5 SOVEREIGN aktif! Tekan ⌘/ untuk shortcuts.', 'info'), 800);
</script>
</body>
</html>`

export default app
