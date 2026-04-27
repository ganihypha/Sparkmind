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
  status: 'ok', service: 'SparkMind V4.0 API', version: '4.0.0',
  engine: 'Sovereign AI Engine V4', categories: 16,
  features: ['dashboard-charts','journal','dark-light-mode','toast-notifications','ai-typing-effect','vision-board','export-import','focus-mode','expandable-resources']
}))

// ============================================
// AI STRATEGIC ENGINE V4 — 16+ CATEGORIES
// ============================================
function generateStrategicResponse(message: string, mode: string, history: any[]): string {
  const m = message.toLowerCase()
  const ctx = history.length > 0 ? `<div class="mb-3"><span class="text-[10px] bg-white/5 dark:bg-white/5 text-gray-500 px-2 py-0.5 rounded border border-white/5">Context: ${history.length} messages</span></div>` : ''

  if (mode === 'swot') return generateSWOT(message)
  if (mode === 'mindmap') return generateMindMap(message)
  if (mode === 'coach') return generateCoachResponse(message, '', '')

  const badge = (label: string, color: string, extra?: string) => `<span class="px-2.5 py-1 bg-${color}-500/10 text-${color}-400 rounded-lg text-xs font-bold border border-${color}-500/20">${label}</span>${extra ? `<span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">${extra}</span>` : ''}`
  const step = (n: number, color: string, title: string, desc: string) => `<div class="flex gap-3 bg-white/[0.02] dark:bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition"><span class="w-8 h-8 bg-${color}-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-${color}-500/20">${n}</span><div><p class="font-bold text-white text-sm">${title}</p><p class="text-gray-400 text-xs mt-1.5 leading-relaxed">${desc}</p></div></div>`
  const insight = (color: string, label: string, text: string) => `<div class="bg-gradient-to-r from-${color}-500/10 to-${color}-600/10 border border-${color}-500/20 rounded-xl p-4"><p class="${color === 'amber' ? 'text-amber-400' : `text-${color}-400`} text-xs font-bold">${label}</p><p class="text-gray-300 text-sm mt-1">${text}</p></div>`

  // Business
  if (m.match(/bisnis|usaha|jualan|startup|toko|online shop|e-commerce|dropship|franchise|modal|revenue|monetisasi|market/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2 flex-wrap">${badge('BISNIS','blue','V4 ENGINE')}</div>
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
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2 flex-wrap">${badge('PRODUKTIVITAS','emerald','V4 ENGINE')}</div>
      <p class="font-bold text-white text-lg">Sistem Produktivitas Tingkat Tinggi</p>
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4"><p class="text-emerald-400 text-xs font-bold mb-2">ROOT CAUSE</p><p class="text-gray-300 text-sm">3 akar: <strong class="text-white">kurang struktur</strong>, <strong class="text-white">distraksi</strong>, atau <strong class="text-white">energy management buruk</strong>.</p></div>
      <div class="space-y-3">
        ${step(1,'emerald','Deep Work Protocol','Blok 90 menit tanpa gangguan. HP silent, notif off. Otak butuh 23 menit untuk refocus setelah distraksi.')}
        ${step(2,'emerald','MIT Method','Setiap pagi, tentukan 1 tugas TERPENTING. Kerjakan PERTAMA sebelum buka email. Boost produktivitas 2x.')}
        ${step(3,'emerald','Energy Management','Tidur 7-8 jam, olahraga 3x/minggu. CEO top prioritaskan kesehatan = fondasi performa.')}
        ${step(4,'emerald','Pomodoro + Time Blocking','25m fokus, 5m istirahat. 4 siklus = 15-30m break. Block kalender. Gunakan Pomodoro Timer SparkMind!')}
      </div>
      ${insight('purple','QUICK WIN','Matikan notifikasi HP, kerjakan 1 MIT selama 90 menit pertama hari. Dalam 1 minggu, rasakan perbedaannya.')}</div>`
  }

  // Tech / Programming
  if (m.match(/programming|coding|developer|belajar|roadmap|javascript|python|react|web|ai|machine learning|data|tech|software/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2 flex-wrap">${badge('TECH & SKILL','purple','V4 ENGINE')}</div>
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
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('KARIR','amber','V4')}</div>
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

  // Creative / Content
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
      <div class="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4"><p class="text-violet-400 text-xs font-bold mb-2">INTELLIGENCE</p><p class="text-gray-300 text-sm">Leadership = <strong class="text-white">influence, not position</strong>. Forged through intentional practice.</p></div>
      <div class="space-y-3">
        ${step(1,'violet','Lead by Example','Tim mengikuti tindakan, bukan kata-kata. Be the standard.')}
        ${step(2,'violet','Clear Communication','WHY, WHAT, HOW. Tim yang paham "kenapa" bergerak lebih cepat.')}
        ${step(3,'violet','Empower & Delegate','Trust team. Delegate outcomes, not tasks. Create more leaders.')}
      </div>
      ${insight('violet','PRINCIPLE','"A leader knows the way, goes the way, shows the way." — John C. Maxwell')}</div>`
  }

  // Life Purpose / Ikigai
  if (m.match(/tujuan hidup|makna|purpose|spiritual|ibadah|doa|iman|passion|ikigai/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('LIFE PURPOSE','indigo','V4 NEW')}</div>
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

  // Networking
  if (m.match(/networking|teman|social|introvert|pergaulan|komunitas|kenalan|public speaking/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('NETWORKING','cyan','V4')}</div>
      <p class="font-bold text-white text-lg">Strategic Networking Framework</p>
      <div class="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-4"><p class="text-cyan-400 text-xs font-bold mb-2">NETWORK INTELLIGENCE</p><p class="text-gray-300 text-sm">Your network = <strong class="text-white">net worth</strong>. 85% jobs filled through networking.</p></div>
      <div class="space-y-3">
        ${step(1,'cyan','Give Before Ask','Bantu orang lain tanpa pamrih. Share knowledge, connect people.')}
        ${step(2,'cyan','Strategic Circles','Join 2-3 komunitas sesuai niche. Hadir konsisten.')}
        ${step(3,'cyan','Follow-Up System','Kenalan baru → follow up 48 jam. Pesan personal, bukan template.')}
      </div>
      ${insight('cyan','ACTION','Minggu ini: reach out ke 3 orang baru di bidangmu.')}</div>`
  }

  // Parenting / Family (NEW V4)
  if (m.match(/anak|parenting|keluarga|orang tua|mendidik|balita|remaja|family/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('PARENTING','pink','V4 NEW')}</div>
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

  // Time Freedom (NEW V4)
  if (m.match(/passive income|kebebasan|waktu luang|freedom|pensiun dini|financial freedom|fire/)) {
    return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('TIME FREEDOM','amber','V4 NEW')}</div>
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
  return `<div class="space-y-4">${ctx}<div class="flex items-center gap-2">${badge('STRATEGIC ANALYSIS','blue','V4 ENGINE')}</div>
    <p class="font-bold text-white text-lg">Framework Pemecahan Masalah Universal</p>
    <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4"><p class="text-blue-400 text-xs font-bold mb-2">ANALYSIS</p><p class="text-gray-300 text-sm">Setiap masalah bisa dipecahkan dengan pendekatan terstruktur:</p></div>
    <div class="space-y-3">
      ${step(1,'blue','Define','Tulis masalah dalam 1 kalimat jelas.')}
      ${step(2,'blue','Decompose','Pecah jadi langkah kecil. Setiap langkah actionable 1-3 hari.')}
      ${step(3,'blue','Execute','Ambil 1 langkah PERTAMA hari ini.')}
      ${step(4,'blue','Iterate','Review setiap minggu. Done > perfect.')}
    </div>
    ${insight('amber','PRO TIP','Coba spesifik: <strong class="text-white">bisnis, karir, skill, keuangan, produktivitas, mental health, hubungan, pendidikan, kesehatan, konten, leadership, tujuan hidup, networking, parenting, time freedom</strong> — 16 kategori siap bantu!')}</div>`
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
    <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20">AI COACH V4</span></div>
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
  { id:1, title:'Business Model Canvas', category:'Bisnis', description:'Framework merancang model bisnis. 9 blok: value proposition, customer segments, channels, revenue streams, key resources, activities, partners, cost structure.', icon:'📋', detail:'Mulai dari customer segment → value proposition → channels. Validasi setiap blok.' },
  { id:2, title:'SMART Goals', category:'Produktivitas', description:'Specific, Measurable, Achievable, Relevant, Time-bound goals.', icon:'🎯', detail:'Bukan "sukses" tapi "Revenue Rp 10jt/bulan dalam 6 bulan via freelance web dev".' },
  { id:3, title:'Eisenhower Matrix', category:'Produktivitas', description:'Prioritas berdasarkan urgensi & kepentingan.', icon:'⚡', detail:'Q1: Urgent+Important (DO). Q2: Not Urgent+Important (SCHEDULE). Q3: Urgent+Not Important (DELEGATE). Q4: Neither (DELETE).' },
  { id:4, title:'Personal Finance 101', category:'Finansial', description:'Dasar mengelola keuangan pribadi.', icon:'💰', detail:'50/30/20 rule: 50% needs, 30% wants, 20% savings. Emergency fund first.' },
  { id:5, title:'Growth Mindset', category:'Personal', description:'Pola pikir pertumbuhan vs fixed mindset.', icon:'🧠', detail:'"I can\'t do this YET." Embrace challenges, persist through setbacks, learn from criticism.' },
  { id:6, title:'Networking Strategy', category:'Karir', description:'Bangun koneksi profesional strategis.', icon:'🤝', detail:'Give first, be genuine, follow up within 48h, join 2-3 communities.' },
  { id:7, title:'MVP Development', category:'Tech', description:'Minimum Viable Product guide.', icon:'🚀', detail:'1 core feature only → launch → get feedback → iterate. Speed > perfection.' },
  { id:8, title:'Content Marketing', category:'Marketing', description:'Strategi konten untuk audiens & revenue.', icon:'📝', detail:'Hook → Value → CTA. Consistency: 3-5 posts/week. Repurpose across platforms.' },
  { id:9, title:'Time Blocking', category:'Produktivitas', description:'Block calendar untuk deep work.', icon:'⏰', detail:'2-3 jam blocks. No meetings before noon. Color code categories.' },
  { id:10, title:'SWOT Analysis', category:'Bisnis', description:'Analisis Strengths, Weaknesses, Opportunities, Threats.', icon:'📊', detail:'Use SparkMind SWOT Analyzer for instant generation!' },
  { id:11, title:'Habit Stacking', category:'Personal', description:'Teknik membangun habit baru.', icon:'🔥', detail:'After [CURRENT HABIT], I will [NEW HABIT]. Stack small habits.' },
  { id:12, title:'Revenue Model Canvas', category:'Bisnis', description:'Framework model revenue.', icon:'💎', detail:'Subscription, Freemium, Marketplace, Advertising, Licensing.' },
  { id:13, title:'Active Recall', category:'Pendidikan', description:'Teknik belajar paling efektif.', icon:'📖', detail:'Close book → try to remember → check. 3x more effective than re-reading.' },
  { id:14, title:'Deep Work Protocol', category:'Produktivitas', description:'Fokus tanpa distraksi.', icon:'🧘', detail:'90 min blocks. Phone off. Door closed. Single-task only.' },
  { id:15, title:'Creator Economy', category:'Creative', description:'Monetisasi konten digital.', icon:'🎬', detail:'1000 true fans theory. Niche down. Multiple revenue streams.' },
  { id:16, title:'Ikigai Framework', category:'Purpose', description:'Temukan tujuan & makna hidup.', icon:'🌸', detail:'Intersection: Love × Good At × World Needs × Paid For.' },
  { id:17, title:'Public Speaking', category:'Networking', description:'Teknik bicara di depan umum.', icon:'🎤', detail:'Structure: Hook → Problem → Solution → CTA. Practice 10x.' },
  { id:18, title:'Journaling Guide', category:'Personal', description:'Teknik menulis jurnal harian.', icon:'📓', detail:'Morning pages: brain dump. Evening: 3 gratitudes + 1 lesson. Weekly review.' },
  { id:19, title:'Parenting Essentials', category:'Family', description:'Panduan parenting modern.', icon:'👶', detail:'Quality time > quantity. Emotional coaching. Positive discipline.' },
]

const INSIGHTS_DATA = [
  { icon:'💡', title:'Revenue First', desc:'2 jam untuk aktivitas yang langsung menghasilkan uang.', time:'Hari ini' },
  { icon:'📊', title:'Goal Progress', desc:'Cek progress goal hari ini. On track?', time:'2 jam lalu' },
  { icon:'🔥', title:'Streak Alert', desc:'Jangan putus streak! Consistency beats intensity.', time:'5 jam lalu' },
  { icon:'💰', title:'Financial Tip', desc:'Sudah sisihkan 20% income bulan ini?', time:'Kemarin' },
  { icon:'🎯', title:'Weekly Review', desc:'30 menit evaluasi minggu ini.', time:'2 hari lalu' },
  { icon:'🧠', title:'Sovereign Insight', desc:'"Seorang Arsitek tidak meratapi pintu tertutup."', time:'3 hari lalu' },
  { icon:'📓', title:'Journal Reminder', desc:'Tulis 3 hal yang kamu syukuri hari ini di Journal.', time:'4 hari lalu' },
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
  { text: 'The best time to plant a tree was 20 years ago. The second best is now.', author: 'Chinese Proverb' },
  { text: 'Rich is having money. Wealthy is having time.', author: 'SparkMind V4' },
  { text: 'Journal your thoughts. Clarity comes from writing.', author: 'SparkMind V4' },
]

// ============================================
// LANDING PAGE HTML — SparkMind V4.0
// ============================================
const LANDING_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V4 — AI Strategic Guide Platform</title>
  <meta name="description" content="Platform AI strategic guide dengan 16+ kategori analisis, Dashboard Charts, Journal, Dark/Light Mode & lebih.">
  <meta name="theme-color" content="#0a0a1a">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script>tailwind.config={theme:{extend:{colors:{brand:{50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81'},neon:{blue:'#60a5fa',purple:'#a78bfa',pink:'#f472b6',green:'#34d399',amber:'#fbbf24'},surface:{50:'#f8fafc',100:'#f1f5f9',800:'#12122a',900:'#0a0a1a',950:'#06060f'}}}}}</script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}body{background:#0a0a1a;color:#e2e8f0}
    .gradient-text{background:linear-gradient(135deg,#818cf8,#f472b6,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06)}
    .glass-light{background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08)}
    .card-hover{transition:all .5s cubic-bezier(.4,0,.2,1)}.card-hover:hover{transform:translateY(-8px);box-shadow:0 30px 80px rgba(99,102,241,0.12)}
    .neon-glow{box-shadow:0 0 40px rgba(99,102,241,0.15),0 0 80px rgba(99,102,241,0.05)}
    .neon-border{border:1px solid rgba(99,102,241,0.2);box-shadow:inset 0 0 30px rgba(99,102,241,0.03)}
    .float-1{animation:f1 8s ease-in-out infinite}.float-2{animation:f2 6s ease-in-out infinite}.float-3{animation:f3 10s ease-in-out infinite}
    @keyframes f1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(1deg)}}
    @keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes f3{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.02)}}
    .orb{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none;opacity:0.4}
    .pulse-ring{animation:pr 3s cubic-bezier(.4,0,.6,1) infinite}
    @keyframes pr{0%{transform:scale(.95);opacity:1}70%{transform:scale(1.3);opacity:0}100%{transform:scale(.95);opacity:0}}
    .counter{opacity:0;transform:translateY(30px);transition:all .8s}.counter.visible{opacity:1;transform:translateY(0)}
    .fade-up{opacity:0;transform:translateY(40px);transition:all .8s}.fade-up.visible{opacity:1;transform:translateY(0)}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0a0a1a}::-webkit-scrollbar-thumb{background:#2a2a4a;border-radius:10px}
    .btn-primary{background:linear-gradient(135deg,#4f46e5,#6366f1);transition:all .3s}.btn-primary:hover{background:linear-gradient(135deg,#4338ca,#4f46e5);transform:translateY(-2px);box-shadow:0 20px 40px rgba(99,102,241,0.3)}
    .btn-secondary{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);transition:all .3s}.btn-secondary:hover{background:rgba(255,255,255,0.1)}
    .feature-icon{transition:all .5s}.group:hover .feature-icon{transform:scale(1.15) rotate(-5deg)}
  </style>
</head>
<body>
  <nav class="fixed top-0 w-full z-50 bg-surface-900/80 backdrop-blur-2xl border-b border-white/[0.04]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16">
      <div class="flex items-center gap-2.5"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 rotate-3"><i class="fas fa-brain text-white text-sm"></i></div><span class="text-white font-black text-xl tracking-tight">Spark<span class="text-neon-amber">Mind</span><sup class="text-[10px] text-brand-300 font-medium ml-0.5">V4</sup></span></div>
      <div class="hidden md:flex items-center gap-8"><a href="#features" class="text-gray-400 hover:text-white transition text-sm font-medium">Fitur</a><a href="#how" class="text-gray-400 hover:text-white transition text-sm font-medium">Cara Kerja</a><a href="#pricing" class="text-gray-400 hover:text-white transition text-sm font-medium">Harga</a><a href="/app" class="btn-primary text-white px-6 py-2.5 rounded-full text-sm font-bold">Mulai Gratis</a></div>
      <button id="mob-btn" class="md:hidden text-white p-2"><i class="fas fa-bars text-lg"></i></button>
    </div></div>
    <div id="mob-nav" class="hidden md:hidden bg-surface-900/98 backdrop-blur-2xl border-t border-white/[0.04] pb-4"><div class="px-4 space-y-2 pt-3"><a href="#features" class="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5">Fitur</a><a href="#how" class="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5">Cara Kerja</a><a href="#pricing" class="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5">Harga</a><a href="/app" class="block btn-primary text-white px-5 py-3 rounded-xl text-sm font-bold text-center mt-3">Mulai Gratis</a></div></div>
  </nav>

  <section class="min-h-screen flex items-center pt-16 relative overflow-hidden">
    <div class="orb w-[600px] h-[600px] bg-brand-500 top-[-100px] left-[-200px]"></div>
    <div class="orb w-[500px] h-[500px] bg-neon-pink -bottom-40 right-[-150px]"></div>
    <div class="orb w-[350px] h-[350px] bg-neon-green top-1/3 right-[10%] opacity-20"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"><span class="relative flex h-2.5 w-2.5"><span class="pulse-ring absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green"></span></span><span class="text-gray-300 text-xs font-medium">V4.0 Engine | 16+ Categories | Charts | Journal | Dark/Light Mode</span></div>
          <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.08] mb-6 tracking-tight">Ubah Masalahmu<br>Jadi <span class="gradient-text">Strategi Sukses</span></h1>
          <p class="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">Platform AI yang menganalisis tantanganmu dan memberikan <strong class="text-white">action plan strategis</strong>. <span class="text-brand-400">16+ kategori</span> + Dashboard Charts + Journal + Dark/Light Mode.</p>
          <div class="flex flex-col sm:flex-row gap-4 mb-14">
            <a href="/app" class="btn-primary text-white px-8 py-4 rounded-full font-bold text-center flex items-center justify-center gap-2 text-base"><i class="fas fa-rocket"></i>Mulai Gratis Sekarang</a>
            <a href="#features" class="btn-secondary text-white px-8 py-4 rounded-full font-semibold text-center flex items-center justify-center gap-2"><i class="fas fa-play-circle"></i>Lihat Fitur</a>
          </div>
          <div class="flex items-center gap-6"><div class="flex -space-x-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">H</div><div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-amber to-orange-500 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">R</div><div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-emerald-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">D</div><div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-rose-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">A</div><div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-violet-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">+</div></div><div><p class="text-white font-bold text-sm">20,000+ Users Aktif</p><p class="text-gray-500 text-xs">Sudah bergabung & bertumbuh</p></div></div>
        </div>
        <div class="hidden lg:block relative">
          <div class="glass rounded-3xl p-6 float-1 neon-glow">
            <div class="flex items-center gap-2 mb-5"><div class="w-3 h-3 rounded-full bg-red-400"></div><div class="w-3 h-3 rounded-full bg-neon-amber"></div><div class="w-3 h-3 rounded-full bg-neon-green"></div><span class="text-gray-500 text-xs ml-3 font-medium">SparkMind V4 — Dashboard</span></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-2"><div class="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 text-center"><p class="text-brand-300 text-[10px] font-bold">Goals</p><p class="text-white text-xl font-black">12</p></div><div class="bg-neon-green/10 border border-neon-green/20 rounded-xl p-3 text-center"><p class="text-neon-green text-[10px] font-bold">Habits</p><p class="text-white text-xl font-black">8</p></div><div class="bg-neon-amber/10 border border-neon-amber/20 rounded-xl p-3 text-center"><p class="text-neon-amber text-[10px] font-bold">Focus</p><p class="text-white text-xl font-black">4.5h</p></div></div>
              <div class="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3"><div class="flex items-center justify-between mb-2"><p class="text-white text-xs font-bold">Weekly Progress</p><p class="text-neon-green text-xs font-bold">82%</p></div><div class="w-full bg-white/5 rounded-full h-2"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-2 rounded-full" style="width:82%"></div></div></div>
              <div class="flex gap-2"><div class="flex-1 bg-neon-green/5 border border-neon-green/10 rounded-xl p-2.5"><p class="text-neon-green text-[9px] font-bold">CHART</p><div class="flex items-end gap-1 h-8 mt-1"><div class="flex-1 bg-brand-500/40 rounded-sm" style="height:40%"></div><div class="flex-1 bg-brand-500/50 rounded-sm" style="height:60%"></div><div class="flex-1 bg-brand-500/60 rounded-sm" style="height:45%"></div><div class="flex-1 bg-brand-500/70 rounded-sm" style="height:80%"></div><div class="flex-1 bg-neon-green rounded-sm" style="height:90%"></div></div></div><div class="flex-1 bg-pink-500/5 border border-pink-500/10 rounded-xl p-2.5"><p class="text-pink-400 text-[9px] font-bold">JOURNAL</p><p class="text-gray-400 text-[9px] mt-1">"Today I..."</p></div></div>
            </div>
          </div>
          <div class="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 float-2"><div class="flex items-center gap-2"><span class="text-lg">📊</span><div><p class="text-white text-xs font-bold">Charts</p><p class="text-gray-500 text-[10px]">Visual analytics</p></div></div></div>
          <div class="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 float-3"><div class="flex items-center gap-2"><span class="text-lg">📓</span><div><p class="text-white text-xs font-bold">Journal</p><p class="text-gray-500 text-[10px]">Daily reflection</p></div></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 border-y border-white/[0.04]"><div class="max-w-7xl mx-auto px-4"><div class="grid grid-cols-2 md:grid-cols-4 gap-8">
    <div class="text-center counter"><p class="text-4xl font-black text-white" data-target="20000">0</p><p class="text-gray-500 text-sm mt-1">Active Users</p></div>
    <div class="text-center counter"><p class="text-4xl font-black text-white" data-target="100000">0</p><p class="text-gray-500 text-sm mt-1">Strategi Dibuat</p></div>
    <div class="text-center counter"><p class="text-4xl font-black gradient-text">16+</p><p class="text-gray-500 text-sm mt-1">AI Categories</p></div>
    <div class="text-center counter"><p class="text-4xl font-black text-white">24/7</p><p class="text-gray-500 text-sm mt-1">Always On</p></div>
  </div></div></section>

  <section id="features" class="py-24 relative"><div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16 fade-up"><span class="inline-block glass-light text-brand-300 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-4">V4.0 ULTIMATE</span><h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Premium Tools untuk <span class="gradient-text">Growth Maker</span></h2><p class="text-gray-400 max-w-2xl mx-auto">Dashboard Charts, Journal, Dark/Light Mode, AI Typing Effect, 16+ Categories & lebih.</p></div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-brand-500/20"><i class="fas fa-brain text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">AI Engine V4</h3><p class="text-gray-400 text-sm">16+ kategori: +parenting, +time freedom. AI typing effect untuk UX natural.</p><span class="inline-block mt-3 text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-lg font-bold border border-brand-500/20">UPGRADED</span></div>
      <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-cyan-500/20"><i class="fas fa-chart-bar text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Dashboard Charts</h3><p class="text-gray-400 text-sm">Visual bar chart progress goals. Tidak hanya angka — lihat trend pertumbuhan.</p><span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V4</span></div>
      <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-purple-500/20"><i class="fas fa-book text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Journal System</h3><p class="text-gray-400 text-sm">Daily journal + mood tracker. Tulis refleksi, gratitude & lesson setiap hari.</p><span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V4</span></div>
      <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-amber-500/20"><i class="fas fa-moon text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Dark/Light Mode</h3><p class="text-gray-400 text-sm">Toggle sesuai preferensi. Auto-detect system preference. Eye comfort.</p><span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V4</span></div>
      <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-neon-green to-emerald-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-emerald-500/20"><i class="fas fa-bell text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Toast Notifications</h3><p class="text-gray-400 text-sm">Achievement alerts, save confirmations, action feedback — smooth toast UI.</p><span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V4</span></div>
      <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-neon-amber to-orange-500 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-amber-500/20"><i class="fas fa-stopwatch text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Pomodoro Pro</h3><p class="text-gray-400 text-sm">Sound notifications, visual ring, auto switch, session stats.</p></div>
      <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-neon-pink to-rose-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-pink-500/20"><i class="fas fa-images text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Vision Board</h3><p class="text-gray-400 text-sm">Visualisasi goals & dreams. Proven meningkatkan achievement 42%.</p></div>
      <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-blue-500/20"><i class="fas fa-file-export text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Export & Import</h3><p class="text-gray-400 text-sm">Export data ke file, import kembali. Data kamu, control kamu.</p><span class="inline-block mt-3 text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-lg font-bold border border-brand-500/20">UPGRADED</span></div>
      <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-rose-500/20"><i class="fas fa-expand text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Expandable Resources</h3><p class="text-gray-400 text-sm">Klik resource untuk detail lengkap. 19+ framework strategis dengan panduan.</p><span class="inline-block mt-3 text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-lg font-bold border border-brand-500/20">UPGRADED</span></div>
    </div>
  </div></section>

  <section id="how" class="py-24 relative"><div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent"></div><div class="max-w-7xl mx-auto px-4 relative z-10">
    <div class="text-center mb-16 fade-up"><span class="inline-block glass-light text-neon-amber px-5 py-2 rounded-full text-xs font-bold uppercase mb-4">Cara Kerja</span><h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Semudah <span class="gradient-text">3 Langkah</span></h2></div>
    <div class="grid md:grid-cols-3 gap-10">
      <div class="text-center fade-up"><div class="w-20 h-20 glass neon-glow rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-all duration-500"><span class="text-white text-3xl font-black">1</span></div><h3 class="text-xl font-bold text-white mb-3">Ceritakan Masalahmu</h3><p class="text-gray-400 text-sm">Tulis natural. AI V4 paham 16+ kategori.</p></div>
      <div class="text-center fade-up"><div class="w-20 h-20 glass neon-glow rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-2 hover:rotate-0 transition-all duration-500"><span class="text-white text-3xl font-black">2</span></div><h3 class="text-xl font-bold text-white mb-3">AI V4 Menganalisis</h3><p class="text-gray-400 text-sm">Sovereign Engine memproses, rancang strategi dengan typing effect.</p></div>
      <div class="text-center fade-up"><div class="w-20 h-20 glass neon-glow rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-1 hover:rotate-0 transition-all duration-500"><span class="text-white text-3xl font-black">3</span></div><h3 class="text-xl font-bold text-white mb-3">Track & Journal</h3><p class="text-gray-400 text-sm">Dashboard charts, journal harian, habit streaks — semua di 1 tempat.</p></div>
    </div>
  </div></section>

  <section id="pricing" class="py-24 relative"><div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16 fade-up"><span class="inline-block glass-light text-brand-300 px-5 py-2 rounded-full text-xs font-bold uppercase mb-4">Pricing</span><h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Investasi untuk <span class="gradient-text">Masa Depanmu</span></h2></div>
    <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div class="glass-light rounded-3xl p-8 card-hover neon-border"><div class="mb-6"><h3 class="text-lg font-bold text-white">Starter</h3><p class="text-gray-400 text-sm mt-1">Untuk eksplorasi</p></div><div class="mb-6"><span class="text-5xl font-black text-white">Gratis</span><span class="text-gray-500 text-sm ml-1">/selamanya</span></div><ul class="space-y-3 mb-8"><li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i>5 AI Analysis / hari</li><li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i>Dashboard + Charts</li><li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i>Journal (3 entries/hari)</li><li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i>Pomodoro Timer</li></ul><a href="/app" class="block w-full text-center btn-secondary text-white py-3.5 rounded-full font-bold">Mulai Gratis</a></div>
      <div class="relative bg-gradient-to-b from-brand-600/20 to-brand-800/20 border-2 border-brand-500/30 rounded-3xl p-8 scale-105 shadow-2xl shadow-brand-500/10"><div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-amber to-orange-500 text-surface-900 px-4 py-1 rounded-full text-xs font-black">PALING POPULER</div><div class="mb-6"><h3 class="text-lg font-bold text-white">Pro</h3><p class="text-brand-200 text-sm mt-1">Untuk yang serius</p></div><div class="mb-6"><span class="text-5xl font-black text-white">Rp 79K</span><span class="text-brand-200 text-sm ml-1">/bulan</span></div><ul class="space-y-3 mb-8"><li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i>Unlimited AI Analysis</li><li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i>All 16+ Categories</li><li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i>Unlimited Journal</li><li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i>Export + Import</li><li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i>Priority Support</li></ul><a href="/app" class="block w-full text-center bg-white hover:bg-gray-100 text-brand-700 py-3.5 rounded-full font-black transition">Upgrade ke Pro</a></div>
      <div class="glass-light rounded-3xl p-8 card-hover neon-border"><div class="mb-6"><h3 class="text-lg font-bold text-white">Enterprise</h3><p class="text-gray-400 text-sm mt-1">Tim & organisasi</p></div><div class="mb-6"><span class="text-5xl font-black text-white">Custom</span></div><ul class="space-y-3 mb-8"><li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i>All Pro features</li><li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i>Team Collaboration</li><li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i>Custom AI Training</li><li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i>API Access</li></ul><a href="#" class="block w-full text-center btn-secondary text-white py-3.5 rounded-full font-bold">Hubungi Kami</a></div>
    </div>
  </div></section>

  <section class="py-24 relative overflow-hidden"><div class="orb w-[500px] h-[500px] bg-brand-500 top-0 left-1/4 opacity-20"></div><div class="max-w-4xl mx-auto px-4 text-center relative z-10">
    <h2 class="text-3xl sm:text-5xl font-black text-white mb-6">Siap Mengubah Hidupmu?</h2>
    <p class="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Join 20,000+ orang yang sudah menemukan kejelasan strategis.</p>
    <a href="/app" class="inline-flex items-center gap-2 bg-gradient-to-r from-neon-amber to-orange-500 hover:from-orange-500 hover:to-neon-amber text-surface-900 px-12 py-5 rounded-full font-black text-lg transition shadow-2xl shadow-neon-amber/30"><i class="fas fa-bolt"></i>Mulai Sekarang — Gratis!</a>
  </div></section>

  <footer class="text-gray-400 py-16 border-t border-white/[0.04]"><div class="max-w-7xl mx-auto px-4"><div class="grid md:grid-cols-4 gap-10">
    <div><div class="flex items-center gap-2 mb-4"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-xl flex items-center justify-center"><i class="fas fa-brain text-white text-sm"></i></div><span class="text-white font-black text-lg">Spark<span class="text-neon-amber">Mind</span><sup class="text-[10px] text-brand-300 ml-0.5">V4</sup></span></div><p class="text-sm leading-relaxed">AI strategic guide. 16+ categories, Dashboard Charts, Journal, Dark/Light Mode.</p></div>
    <div><h4 class="text-white font-bold mb-4 text-sm">AI Tools</h4><ul class="space-y-2.5 text-sm"><li><a href="/app" class="hover:text-white transition">AI Analyzer V4</a></li><li><a href="/app" class="hover:text-white transition">SWOT Analyzer</a></li><li><a href="/app" class="hover:text-white transition">AI Coach</a></li><li><a href="/app" class="hover:text-white transition">Journal</a></li></ul></div>
    <div><h4 class="text-white font-bold mb-4 text-sm">Productivity</h4><ul class="space-y-2.5 text-sm"><li><a href="/app" class="hover:text-white transition">Dashboard Charts</a></li><li><a href="/app" class="hover:text-white transition">Vision Board</a></li><li><a href="/app" class="hover:text-white transition">Goal Tracker</a></li><li><a href="/app" class="hover:text-white transition">Habit Tracker</a></li></ul></div>
    <div><h4 class="text-white font-bold mb-4 text-sm">Connect</h4><div class="flex gap-3"><a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-instagram text-white"></i></a><a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-twitter text-white"></i></a><a href="https://github.com/ganihypha/Sparkmind" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-github text-white"></i></a></div></div>
  </div><div class="border-t border-white/[0.04] mt-12 pt-8 text-center text-sm"><p>&copy; 2026 SparkMind V4.0. Built with power by Haidar.</p></div></div></footer>

  <script>
    document.getElementById('mob-btn').addEventListener('click',()=>document.getElementById('mob-nav').classList.toggle('hidden'));
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');const c=e.target.querySelector('[data-target]');if(c){const t=parseInt(c.dataset.target);let cur=0;const inc=t/60;const timer=setInterval(()=>{cur+=inc;if(cur>=t){cur=t;clearInterval(timer)}c.textContent=Math.floor(cur).toLocaleString()},16)}}})},{threshold:0.2});
    document.querySelectorAll('.counter,.fade-up').forEach(el=>obs.observe(el));
    document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});document.getElementById('mob-nav').classList.add('hidden')})});
  </script>
</body>
</html>`

// ============================================
// APP DASHBOARD HTML — SparkMind V4.0 ULTIMATE
// ============================================
const APP_HTML = `<!DOCTYPE html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V4 — Dashboard</title>
  <meta name="theme-color" content="#0a0a1a">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script>tailwind.config={darkMode:'class',theme:{extend:{colors:{brand:{50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81'},neon:{blue:'#60a5fa',purple:'#a78bfa',pink:'#f472b6',green:'#34d399',amber:'#fbbf24'},surface:{50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',800:'#12122a',900:'#0a0a1a',950:'#06060f'}}}}}</script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;box-sizing:border-box}
    /* Dark mode */
    .dark body{background:#0a0a1a;color:#e2e8f0}
    .dark .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06)}
    .dark .sidebar-bg{background:#06060f;border-color:rgba(255,255,255,0.04)}
    .dark .header-bg{background:rgba(6,6,15,0.8)}
    .dark .input-bg{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);color:#fff}
    .dark .text-main{color:#e2e8f0}.dark .text-sub{color:#94a3b8}.dark .text-muted{color:#64748b}
    .dark .card-bg{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06)}
    /* Light mode */
    body{background:#f8fafc;color:#1e293b;margin:0}
    .glass{background:rgba(255,255,255,0.8);backdrop-filter:blur(24px);border:1px solid rgba(0,0,0,0.06)}
    .sidebar-bg{background:#fff;border-color:rgba(0,0,0,0.06)}
    .header-bg{background:rgba(248,250,252,0.8)}
    .input-bg{background:#fff;border:1px solid #e2e8f0;color:#1e293b}
    .text-main{color:#1e293b}.text-sub{color:#64748b}.text-muted{color:#94a3b8}
    .card-bg{background:#fff;border:1px solid #e2e8f0}
    /* Shared */
    .gradient-text{background:linear-gradient(135deg,#818cf8,#f472b6,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .sidebar-link.active{background:rgba(99,102,241,0.1);color:#6366f1;border-right:3px solid #6366f1;font-weight:600}
    .dark .sidebar-link{color:#94a3b8}.sidebar-link{color:#64748b}
    .sidebar-link:hover:not(.active){background:rgba(99,102,241,0.05)}
    .typing-dot{animation:td 1.4s infinite}.typing-dot:nth-child(2){animation-delay:.2s}.typing-dot:nth-child(3){animation-delay:.4s}
    @keyframes td{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
    .msg-in{animation:mi .4s cubic-bezier(.4,0,.2,1)}@keyframes mi{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .progress-bar{transition:width .8s cubic-bezier(.4,0,.2,1)}
    textarea:focus,input:focus,select:focus{outline:none}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}.dark ::-webkit-scrollbar-thumb{background:#2a2a4a;border-radius:10px}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}
    .timer-ring{transition:stroke-dashoffset 1s linear}
    .btn-primary{background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;transition:all .3s}.btn-primary:hover{box-shadow:0 8px 24px rgba(99,102,241,0.3)}
    .toast{animation:toastin .4s ease-out}@keyframes toastin{from{opacity:0;transform:translateY(20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
    .toast-out{animation:toastout .3s ease-in forwards}@keyframes toastout{to{opacity:0;transform:translateY(-10px) scale(.95)}}
    .stat-card{transition:all .3s}.stat-card:hover{transform:translateY(-4px)}
    .dark .stat-card:hover{box-shadow:0 12px 40px rgba(99,102,241,0.1)}.stat-card:hover{box-shadow:0 12px 40px rgba(99,102,241,0.08)}
    .onboard-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center}
    .dark .onboard-overlay{background:rgba(0,0,0,0.85)}.onboard-overlay{background:rgba(0,0,0,0.5)}
    .chart-bar{transition:height .8s cubic-bezier(.4,0,.2,1)}
    .typing-char{display:inline;animation:typeChar .05s ease}@keyframes typeChar{from{opacity:0}to{opacity:1}}
    .resource-detail{max-height:0;overflow:hidden;transition:max-height .3s ease}.resource-detail.open{max-height:200px}
    .mood-btn.selected{transform:scale(1.3);filter:drop-shadow(0 0 8px rgba(99,102,241,0.5))}
  </style>
</head>
<body class="h-screen flex overflow-hidden">
  <!-- TOAST CONTAINER -->
  <div id="toast-container" class="fixed top-4 right-4 z-[200] space-y-2"></div>

  <!-- ONBOARDING -->
  <div id="onboarding" class="onboard-overlay hidden">
    <div class="max-w-lg w-full mx-4 card-bg rounded-3xl p-8 text-center" style="backdrop-filter:blur(24px)">
      <div class="w-20 h-20 bg-gradient-to-br from-brand-500 to-neon-pink rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/20"><i class="fas fa-brain text-white text-3xl"></i></div>
      <h2 class="text-2xl font-black text-main mb-2">Selamat Datang di SparkMind V4</h2>
      <p class="text-sub text-sm mb-6">16+ AI categories • Dashboard Charts • Journal • Dark/Light Mode</p>
      <div class="space-y-3 text-left mb-6">
        <div class="flex items-center gap-3 card-bg rounded-xl p-3"><i class="fas fa-chart-bar text-brand-400 w-6 text-center"></i><div><p class="text-main text-sm font-bold">Dashboard Charts</p><p class="text-muted text-xs">Visual progress analytics</p></div></div>
        <div class="flex items-center gap-3 card-bg rounded-xl p-3"><i class="fas fa-book text-violet-400 w-6 text-center"></i><div><p class="text-main text-sm font-bold">Journal System</p><p class="text-muted text-xs">Daily reflection + mood tracker</p></div></div>
        <div class="flex items-center gap-3 card-bg rounded-xl p-3"><i class="fas fa-moon text-amber-400 w-6 text-center"></i><div><p class="text-main text-sm font-bold">Dark/Light Mode</p><p class="text-muted text-xs">Sesuaikan tampilan kamu</p></div></div>
      </div>
      <input id="onboard-name" type="text" placeholder="Masukkan nama kamu..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 mb-4 text-center">
      <button onclick="completeOnboarding()" class="w-full btn-primary py-3.5 rounded-xl font-bold shadow-lg shadow-brand-500/20">Mulai SparkMind V4</button>
    </div>
  </div>

  <!-- SIDEBAR -->
  <aside id="sidebar" class="w-64 sidebar-bg border-r flex-shrink-0 flex flex-col hidden md:flex">
    <div class="p-5 border-b" style="border-color:inherit"><a href="/" class="flex items-center gap-2.5"><div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-neon-pink rounded-xl flex items-center justify-center"><i class="fas fa-brain text-white text-sm"></i></div><span class="font-black text-lg text-main">Spark<span class="text-neon-amber">Mind</span><sup class="text-[9px] text-brand-400 ml-0.5">V4</sup></span></a></div>
    <nav class="flex-1 py-4 overflow-auto">
      <div class="px-6 mb-3"><p class="text-[10px] font-bold text-muted uppercase tracking-widest">Overview</p></div>
      <a href="#" onclick="switchTab('dashboard')" class="sidebar-link active flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="dashboard"><i class="fas fa-chart-line w-5 text-center"></i><span>Dashboard</span></a>
      <div class="px-6 mb-3 mt-5"><p class="text-[10px] font-bold text-muted uppercase tracking-widest">AI Tools</p></div>
      <a href="#" onclick="switchTab('analyzer')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="analyzer"><i class="fas fa-brain w-5 text-center"></i><span>AI Analyzer</span></a>
      <a href="#" onclick="switchTab('swot')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="swot"><i class="fas fa-chart-pie w-5 text-center"></i><span>SWOT</span></a>
      <a href="#" onclick="switchTab('coach')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="coach"><i class="fas fa-user-tie w-5 text-center"></i><span>AI Coach</span></a>
      <div class="px-6 mb-3 mt-5"><p class="text-[10px] font-bold text-muted uppercase tracking-widest">Productivity</p></div>
      <a href="#" onclick="switchTab('pomodoro')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="pomodoro"><i class="fas fa-stopwatch w-5 text-center"></i><span>Pomodoro</span></a>
      <a href="#" onclick="switchTab('goals')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="goals"><i class="fas fa-bullseye w-5 text-center"></i><span>Goals</span></a>
      <a href="#" onclick="switchTab('habits')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="habits"><i class="fas fa-fire w-5 text-center"></i><span>Habits</span></a>
      <div class="px-6 mb-3 mt-5"><p class="text-[10px] font-bold text-muted uppercase tracking-widest">Insights</p></div>
      <a href="#" onclick="switchTab('journal')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="journal"><i class="fas fa-book w-5 text-center"></i><span>Journal</span><span class="ml-auto text-[9px] bg-neon-green/20 text-neon-green px-1.5 py-0.5 rounded font-bold">NEW</span></a>
      <a href="#" onclick="switchTab('vision')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="vision"><i class="fas fa-images w-5 text-center"></i><span>Vision Board</span></a>
      <a href="#" onclick="switchTab('review')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="review"><i class="fas fa-calendar-check w-5 text-center"></i><span>Weekly Review</span></a>
      <a href="#" onclick="switchTab('resources')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm transition" data-tab="resources"><i class="fas fa-book-open w-5 text-center"></i><span>Resources</span></a>
    </nav>
    <div class="p-4 border-t" style="border-color:inherit"><div class="card-bg rounded-2xl p-4"><p class="text-sm font-bold text-main mb-1">Free Plan</p><p class="text-xs text-sub mb-3">5/5 analyses tersisa</p><div class="w-full bg-brand-500/10 rounded-full h-1.5 mb-3"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-1.5 rounded-full" style="width:100%"></div></div><button class="w-full btn-primary text-xs py-2.5 rounded-xl font-bold">Upgrade Pro</button></div></div>
  </aside>

  <!-- MAIN -->
  <main class="flex-1 flex flex-col overflow-hidden">
    <header class="header-bg backdrop-blur-xl border-b px-6 py-3 flex items-center justify-between flex-shrink-0" style="border-color:inherit">
      <div class="flex items-center gap-4">
        <button id="sb-toggle" class="md:hidden text-sub hover:text-main transition"><i class="fas fa-bars text-lg"></i></button>
        <h1 id="page-title" class="text-base font-bold text-main">Dashboard</h1>
        <span class="hidden sm:inline-block text-[10px] bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-lg font-bold border border-brand-500/20">V4.0</span>
      </div>
      <div class="flex items-center gap-3">
        <div id="quote-ticker" class="hidden sm:block max-w-xs text-xs text-muted italic truncate"></div>
        <button onclick="toggleTheme()" title="Toggle Theme" class="text-sub hover:text-main transition w-8 h-8 rounded-lg flex items-center justify-center hover:bg-brand-500/10"><i id="theme-icon" class="fas fa-moon"></i></button>
        <button onclick="exportData()" title="Export" class="text-sub hover:text-main transition w-8 h-8 rounded-lg flex items-center justify-center hover:bg-brand-500/10"><i class="fas fa-file-export"></i></button>
        <div id="user-avatar" class="w-8 h-8 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center cursor-pointer"><span class="text-white text-xs font-bold" id="user-initial">H</span></div>
      </div>
    </header>

    <div class="flex-1 overflow-auto">
      <!-- DASHBOARD -->
      <div id="tab-dashboard" class="tab-content p-6"><div class="max-w-6xl mx-auto">
        <div class="mb-8"><h2 class="text-2xl font-black text-main mb-1">Selamat datang, <span id="dash-name" class="gradient-text">User</span>!</h2><p class="text-sub text-sm">Overview progress & analytics.</p></div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="card-bg rounded-2xl p-5 stat-card"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-brand-500/20 rounded-xl flex items-center justify-center"><i class="fas fa-bullseye text-brand-400"></i></div><span class="text-muted text-xs font-bold">GOALS</span></div><p id="dash-goals" class="text-3xl font-black text-main">0</p><p class="text-muted text-xs mt-1">active goals</p></div>
          <div class="card-bg rounded-2xl p-5 stat-card"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-neon-green/20 rounded-xl flex items-center justify-center"><i class="fas fa-fire text-neon-green"></i></div><span class="text-muted text-xs font-bold">HABITS</span></div><p id="dash-habits" class="text-3xl font-black text-main">0</p><p class="text-muted text-xs mt-1">active habits</p></div>
          <div class="card-bg rounded-2xl p-5 stat-card"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-neon-amber/20 rounded-xl flex items-center justify-center"><i class="fas fa-stopwatch text-neon-amber"></i></div><span class="text-muted text-xs font-bold">FOCUS</span></div><p id="dash-focus" class="text-3xl font-black text-main">0m</p><p class="text-muted text-xs mt-1">today</p></div>
          <div class="card-bg rounded-2xl p-5 stat-card"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-neon-pink/20 rounded-xl flex items-center justify-center"><i class="fas fa-fire-flame-curved text-neon-pink"></i></div><span class="text-muted text-xs font-bold">STREAK</span></div><p id="dash-streak" class="text-3xl font-black text-main">0</p><p class="text-muted text-xs mt-1">best streak</p></div>
        </div>
        <!-- CHART -->
        <div class="card-bg rounded-2xl p-6 mb-8">
          <h3 class="font-bold text-main mb-4 flex items-center gap-2"><i class="fas fa-chart-bar text-brand-400"></i> Goal Progress Chart</h3>
          <div id="goal-chart" class="flex items-end gap-3 h-40"></div>
        </div>
        <div class="grid lg:grid-cols-2 gap-6 mb-8">
          <div class="card-bg rounded-2xl p-6"><h3 class="font-bold text-main mb-4 flex items-center gap-2"><i class="fas fa-bullseye text-brand-400"></i> Goals</h3><div id="dash-goal-list" class="space-y-3"></div></div>
          <div class="card-bg rounded-2xl p-6"><h3 class="font-bold text-main mb-4 flex items-center gap-2"><i class="fas fa-fire text-neon-pink"></i> Today's Habits</h3><div id="dash-habit-list" class="space-y-3"></div></div>
        </div>
        <div class="card-bg rounded-2xl p-6"><h3 class="font-bold text-main mb-4">Quick Actions</h3><div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button onclick="switchTab('analyzer')" class="card-bg rounded-xl p-4 text-center hover:bg-brand-500/10 transition"><i class="fas fa-brain text-brand-400 text-xl mb-2"></i><p class="text-main text-xs font-bold">Analyzer</p></button>
          <button onclick="switchTab('journal')" class="card-bg rounded-xl p-4 text-center hover:bg-violet-500/10 transition"><i class="fas fa-book text-violet-400 text-xl mb-2"></i><p class="text-main text-xs font-bold">Journal</p></button>
          <button onclick="switchTab('pomodoro')" class="card-bg rounded-xl p-4 text-center hover:bg-neon-amber/10 transition"><i class="fas fa-stopwatch text-neon-amber text-xl mb-2"></i><p class="text-main text-xs font-bold">Pomodoro</p></button>
          <button onclick="switchTab('vision')" class="card-bg rounded-xl p-4 text-center hover:bg-neon-pink/10 transition"><i class="fas fa-images text-neon-pink text-xl mb-2"></i><p class="text-main text-xs font-bold">Vision</p></button>
          <button onclick="switchTab('coach')" class="card-bg rounded-xl p-4 text-center hover:bg-neon-green/10 transition"><i class="fas fa-user-tie text-neon-green text-xl mb-2"></i><p class="text-main text-xs font-bold">Coach</p></button>
        </div></div>
      </div></div>

      <!-- ANALYZER -->
      <div id="tab-analyzer" class="tab-content hidden h-full flex flex-col">
        <div id="chat-msgs" class="flex-1 overflow-auto p-6 space-y-4">
          <div class="msg-in flex gap-3"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div><div class="card-bg rounded-2xl rounded-tl-sm p-5 max-w-2xl"><p class="text-sub text-sm leading-relaxed">Halo! Aku <strong class="text-main">SparkMind AI V4</strong> — <strong class="text-brand-400">16+ kategori</strong>.<br><br><strong class="text-main">Coba:</strong></p><div class="mt-3 space-y-2"><button onclick="useEx('Aku mau mulai bisnis online dari HP, modal minim')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">"Aku mau mulai bisnis online"</button><button onclick="useEx('Gimana cara jadi lebih produktif?')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">"Gimana cara lebih produktif?"</button><button onclick="useEx('Aku mau temukan tujuan hidup dan ikigai')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">"Temukan tujuan hidup"</button><button onclick="useEx('Aku merasa burnout dan butuh recovery')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">"Burnout & recovery"</button></div></div></div>
        </div>
        <div class="border-t header-bg backdrop-blur-xl p-4" style="border-color:inherit"><div class="max-w-3xl mx-auto"><div class="flex items-end gap-3"><div class="flex-1 input-bg rounded-2xl px-4 py-3 focus-within:border-brand-500/30 transition"><textarea id="user-input" rows="1" placeholder="Ceritakan masalah atau goal kamu..." class="w-full bg-transparent text-sm text-main placeholder-gray-400 resize-none max-h-32" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea></div><button onclick="sendMsg()" class="btn-primary w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-paper-plane text-sm"></i></button></div><p class="text-center text-[10px] text-muted mt-2">SparkMind V4 — 16+ Categories • AI Typing Effect</p></div></div>
      </div>

      <!-- SWOT -->
      <div id="tab-swot" class="tab-content hidden p-6"><div class="max-w-3xl mx-auto"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-neon-green to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20"><i class="fas fa-chart-pie text-white text-2xl"></i></div><h2 class="text-2xl font-black text-main">SWOT Analyzer</h2><p class="text-sub text-sm mt-1">Strengths, Weaknesses, Opportunities & Threats</p></div><div class="card-bg rounded-2xl p-6"><textarea id="swot-input" rows="3" placeholder="Deskripsikan bisnis/ide kamu..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none mb-4"></textarea><button onclick="runSWOT()" class="bg-gradient-to-r from-neon-green to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm w-full shadow-lg shadow-emerald-500/20">Generate SWOT</button></div><div id="swot-result" class="mt-6"></div></div></div>

      <!-- COACH -->
      <div id="tab-coach" class="tab-content hidden p-6"><div class="max-w-3xl mx-auto"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20"><i class="fas fa-user-tie text-white text-2xl"></i></div><h2 class="text-2xl font-black text-main">AI Coach V4</h2><p class="text-sub text-sm mt-1">Personal coaching session</p></div><div class="card-bg rounded-2xl p-6 space-y-4"><div><label class="text-xs font-bold text-sub mb-2 block">Goal utama:</label><textarea id="coach-goal" rows="2" placeholder="Contoh: 50 klien dalam 3 bulan" class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div><div><label class="text-xs font-bold text-sub mb-2 block">Kondisi saat ini:</label><textarea id="coach-state" rows="2" placeholder="Contoh: Baru mulai" class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div><div><label class="text-xs font-bold text-sub mb-2 block">Hambatan:</label><textarea id="coach-obstacles" rows="2" placeholder="Contoh: Belum tau caranya" class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div><button onclick="runCoach()" class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm w-full shadow-lg shadow-amber-500/20">Mulai Coaching</button></div><div id="coach-result" class="mt-6"></div></div></div>

      <!-- POMODORO -->
      <div id="tab-pomodoro" class="tab-content hidden p-6"><div class="max-w-lg mx-auto text-center"><div class="mb-6"><h2 class="text-2xl font-black text-main">Pomodoro Timer Pro</h2><p class="text-sub text-sm mt-1">Deep Work + Sound Notifications</p></div><div class="card-bg rounded-3xl p-10 mb-6"><div class="relative inline-block mb-6"><svg class="w-56 h-56 -rotate-90" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" stroke-width="8" class="text-brand-500/10"/><circle id="pomo-ring" cx="100" cy="100" r="90" fill="none" stroke="#6366f1" stroke-width="8" stroke-linecap="round" stroke-dasharray="565.48" stroke-dashoffset="0" class="timer-ring"/></svg><div class="absolute inset-0 flex flex-col items-center justify-center"><p id="pomo-time" class="text-5xl font-black text-main tabular-nums">25:00</p><p id="pomo-label" class="text-sm text-sub mt-1">Focus Time</p></div></div><div class="flex items-center justify-center gap-4 mb-6"><button onclick="startPomo()" id="pomo-start-btn" class="btn-primary px-8 py-3 rounded-full font-bold flex items-center gap-2"><i class="fas fa-play text-sm"></i>Mulai</button><button onclick="pausePomo()" id="pomo-pause-btn" class="hidden bg-white/10 hover:bg-white/20 text-main px-8 py-3 rounded-full font-bold flex items-center gap-2"><i class="fas fa-pause text-sm"></i>Pause</button><button onclick="resetPomo()" class="bg-brand-500/10 hover:bg-brand-500/20 text-sub px-6 py-3 rounded-full font-bold transition"><i class="fas fa-redo text-sm"></i></button></div><div class="flex justify-center gap-3 mb-4"><button onclick="setPomoMode('focus')" class="pomo-mode-btn active text-xs px-4 py-2 rounded-lg font-bold bg-brand-500 text-white" data-mode="focus">Focus 25m</button><button onclick="setPomoMode('short')" class="pomo-mode-btn text-xs px-4 py-2 rounded-lg font-bold text-sub bg-brand-500/10" data-mode="short">Short 5m</button><button onclick="setPomoMode('long')" class="pomo-mode-btn text-xs px-4 py-2 rounded-lg font-bold text-sub bg-brand-500/10" data-mode="long">Long 15m</button></div><div class="flex justify-center gap-8 text-center"><div><p class="text-2xl font-black text-main" id="pomo-sessions">0</p><p class="text-[10px] text-muted">sessions</p></div><div><p class="text-2xl font-black text-main" id="pomo-total">0m</p><p class="text-[10px] text-muted">total focus</p></div></div></div></div></div>

      <!-- GOALS -->
      <div id="tab-goals" class="tab-content hidden p-6"><div class="max-w-4xl mx-auto"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-black text-main">Goal Tracker</h2><p class="text-sub text-sm">Track & manage goals</p></div><button onclick="showAddGoal()" class="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"><i class="fas fa-plus"></i>Tambah</button></div><div id="add-goal-form" class="hidden card-bg rounded-2xl p-6 mb-6"><h3 class="font-bold text-main mb-4">Goal Baru</h3><div class="space-y-3"><input id="goal-title" type="text" placeholder="Nama goal..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400"><textarea id="goal-desc" rows="2" placeholder="Deskripsi..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea><div class="flex gap-3"><select id="goal-cat" class="input-bg rounded-xl px-4 py-3 text-sm flex-1"><option value="bisnis">Bisnis</option><option value="karir">Karir</option><option value="skill">Skill</option><option value="personal">Personal</option><option value="finansial">Finansial</option><option value="kesehatan">Kesehatan</option></select><input id="goal-dl" type="date" class="input-bg rounded-xl px-4 py-3 text-sm flex-1"></div><div class="flex gap-3"><button onclick="addGoal()" class="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold">Simpan</button><button onclick="hideAddGoal()" class="bg-brand-500/10 text-sub px-6 py-2.5 rounded-xl text-sm">Batal</button></div></div></div><div id="goals-list" class="space-y-4"></div></div></div>

      <!-- HABITS -->
      <div id="tab-habits" class="tab-content hidden p-6"><div class="max-w-4xl mx-auto"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-black text-main">Habit Tracker</h2><p class="text-sub text-sm">Build consistent habits</p></div><button onclick="showAddHabit()" class="bg-gradient-to-r from-neon-pink to-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-pink-500/20"><i class="fas fa-plus"></i>Tambah</button></div><div id="add-habit-form" class="hidden card-bg rounded-2xl p-6 mb-6"><h3 class="font-bold text-main mb-4">Habit Baru</h3><div class="space-y-3"><input id="habit-name" type="text" placeholder="Nama habit..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400"><select id="habit-freq" class="w-full input-bg rounded-xl px-4 py-3 text-sm"><option value="daily">Setiap Hari</option><option value="weekday">Sen-Jum</option><option value="3x">3x/Minggu</option></select><div class="flex gap-3"><button onclick="addHabit()" class="bg-gradient-to-r from-neon-pink to-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold">Simpan</button><button onclick="hideAddHabit()" class="bg-brand-500/10 text-sub px-6 py-2.5 rounded-xl text-sm">Batal</button></div></div></div><div id="habits-list" class="space-y-3"></div></div></div>

      <!-- JOURNAL (NEW V4) -->
      <div id="tab-journal" class="tab-content hidden p-6"><div class="max-w-3xl mx-auto">
        <div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20"><i class="fas fa-book text-white text-2xl"></i></div><h2 class="text-2xl font-black text-main">Daily Journal</h2><p class="text-sub text-sm mt-1">Refleksi, gratitude & mood tracker</p></div>
        <div class="card-bg rounded-2xl p-6 mb-6">
          <div class="flex items-center justify-between mb-4"><h3 class="font-bold text-main">Hari ini</h3><p class="text-xs text-muted" id="journal-date"></p></div>
          <div class="mb-4"><label class="text-xs font-bold text-violet-400 mb-2 block">MOOD</label><div class="flex gap-3" id="mood-selector"><button onclick="setMood('😊')" class="mood-btn text-2xl hover:scale-125 transition cursor-pointer">😊</button><button onclick="setMood('😌')" class="mood-btn text-2xl hover:scale-125 transition cursor-pointer">😌</button><button onclick="setMood('🤔')" class="mood-btn text-2xl hover:scale-125 transition cursor-pointer">🤔</button><button onclick="setMood('😤')" class="mood-btn text-2xl hover:scale-125 transition cursor-pointer">😤</button><button onclick="setMood('😢')" class="mood-btn text-2xl hover:scale-125 transition cursor-pointer">😢</button><button onclick="setMood('🔥')" class="mood-btn text-2xl hover:scale-125 transition cursor-pointer">🔥</button></div></div>
          <div class="space-y-4">
            <div><label class="text-xs font-bold text-neon-green mb-2 block">3 HAL DISYUKURI</label><textarea id="journal-gratitude" rows="3" placeholder="1. ...\n2. ...\n3. ..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div>
            <div><label class="text-xs font-bold text-brand-400 mb-2 block">REFLEKSI HARI INI</label><textarea id="journal-reflection" rows="4" placeholder="Apa yang terjadi hari ini? Apa yang kamu pelajari?" class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div>
            <div><label class="text-xs font-bold text-neon-amber mb-2 block">1 LESSON LEARNED</label><textarea id="journal-lesson" rows="2" placeholder="Pelajaran terpenting hari ini..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div>
            <button onclick="saveJournal()" class="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-sm w-full shadow-lg shadow-purple-500/20">Simpan Journal</button>
          </div>
        </div>
        <div class="card-bg rounded-2xl p-6"><h3 class="font-bold text-main mb-4">Journal History</h3><div id="journal-history" class="space-y-3"></div></div>
      </div></div>

      <!-- VISION BOARD -->
      <div id="tab-vision" class="tab-content hidden p-6"><div class="max-w-4xl mx-auto"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-neon-pink to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/20"><i class="fas fa-images text-white text-2xl"></i></div><h2 class="text-2xl font-black text-main">Vision Board</h2><p class="text-sub text-sm mt-1">Visualisasi goals & dreams</p></div><div class="card-bg rounded-2xl p-6 mb-6"><div class="space-y-4"><div><label class="text-xs font-bold text-neon-pink mb-2 block">MY BIG VISION</label><textarea id="vision-big" rows="3" placeholder="Visi besar hidupmu..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div><div class="grid sm:grid-cols-3 gap-4"><div><label class="text-xs font-bold text-brand-400 mb-2 block">1 YEAR</label><textarea id="vision-1y" rows="2" placeholder="Dalam 1 tahun..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div><div><label class="text-xs font-bold text-neon-green mb-2 block">3 MONTHS</label><textarea id="vision-3m" rows="2" placeholder="3 bulan..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div><div><label class="text-xs font-bold text-neon-amber mb-2 block">THIS WEEK</label><textarea id="vision-1w" rows="2" placeholder="Minggu ini..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div></div><button onclick="saveVision()" class="bg-gradient-to-r from-neon-pink to-rose-600 text-white px-6 py-3 rounded-xl font-bold text-sm w-full shadow-lg shadow-pink-500/20">Simpan Vision Board</button></div></div><div id="vision-display" class="card-bg rounded-2xl p-6 hidden"><h3 class="font-bold text-main mb-4 flex items-center gap-2"><i class="fas fa-eye text-neon-pink"></i> Your Vision</h3><div id="vision-content"></div></div></div></div>

      <!-- WEEKLY REVIEW -->
      <div id="tab-review" class="tab-content hidden p-6"><div class="max-w-3xl mx-auto"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20"><i class="fas fa-calendar-check text-white text-2xl"></i></div><h2 class="text-2xl font-black text-main">Weekly Review</h2><p class="text-sub text-sm mt-1">Refleksi & planning</p></div><div class="space-y-4"><div class="card-bg rounded-2xl p-6"><label class="text-xs font-bold text-neon-green mb-3 block">3 WINS MINGGU INI</label><textarea id="review-wins" rows="3" placeholder="3 hal berhasil..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div><div class="card-bg rounded-2xl p-6"><label class="text-xs font-bold text-neon-amber mb-3 block">3 LEARNINGS</label><textarea id="review-learn" rows="3" placeholder="3 hal dipelajari..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div><div class="card-bg rounded-2xl p-6"><label class="text-xs font-bold text-brand-400 mb-3 block">FOKUS MINGGU DEPAN</label><textarea id="review-focus" rows="3" placeholder="Prioritas utama..." class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none"></textarea></div><button onclick="saveReview()" class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm w-full shadow-lg shadow-cyan-500/20">Simpan Review</button></div></div></div>

      <!-- RESOURCES -->
      <div id="tab-resources" class="tab-content hidden p-6"><div class="max-w-4xl mx-auto"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-black text-main">Resource Library</h2><p class="text-sub text-sm">19+ framework strategis — klik untuk detail</p></div></div><div class="mb-6"><input id="resource-search" type="text" placeholder="Search resources..." oninput="renderResources()" class="w-full input-bg rounded-xl px-4 py-3 text-sm placeholder-gray-400"></div><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" id="resources-grid"></div></div></div>
    </div>
  </main>
  <div id="sb-overlay" class="fixed inset-0 bg-black/60 z-40 hidden" onclick="closeSB()"></div>

  <script>
    // ===== LOCALSTORAGE =====
    const LS={get(k,d){try{const v=localStorage.getItem('sm4_'+k);return v?JSON.parse(v):d}catch{return d}},set(k,v){try{localStorage.setItem('sm4_'+k,JSON.stringify(v))}catch{}}};

    // ===== THEME =====
    let darkMode=LS.get('dark',true);
    function applyTheme(){document.documentElement.classList.toggle('dark',darkMode);document.getElementById('theme-icon').className=darkMode?'fas fa-sun':'fas fa-moon'}
    function toggleTheme(){darkMode=!darkMode;LS.set('dark',darkMode);applyTheme();showToast(darkMode?'Dark mode activated':'Light mode activated','info')}
    applyTheme();

    // ===== TOAST =====
    function showToast(msg,type='success'){
      const c=document.getElementById('toast-container');const t=document.createElement('div');
      const colors={success:'from-neon-green to-emerald-600',error:'from-red-500 to-rose-600',info:'from-brand-500 to-brand-600',warn:'from-neon-amber to-orange-500'};
      const icons={success:'fa-check-circle',error:'fa-exclamation-circle',info:'fa-info-circle',warn:'fa-exclamation-triangle'};
      t.className='toast flex items-center gap-3 bg-gradient-to-r '+colors[type]+' text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium max-w-sm';
      t.innerHTML='<i class="fas '+icons[type]+'"></i><span>'+msg+'</span>';
      c.appendChild(t);setTimeout(()=>{t.classList.add('toast-out');setTimeout(()=>t.remove(),300)},3000);
    }

    // ===== STATE =====
    let userName=LS.get('name','');
    let goals=LS.get('goals',[{id:1,title:'Launch Bisnis Digital',desc:'Buat & launch produk digital',category:'bisnis',progress:35,deadline:'2026-07-01',milestones:['Riset pasar','Buat MVP','Launch','Marketing']},{id:2,title:'Master JavaScript',desc:'Kuasai JS + React',category:'skill',progress:60,deadline:'2026-06-15',milestones:['JS Fundamentals','Async/Await','React','Build Project']},{id:3,title:'Emergency Fund 10 Jt',desc:'Dana darurat Rp 10 juta',category:'finansial',progress:70,deadline:'2026-08-01',milestones:['Budget','Nabung','Side income','Target!']}]);
    let habits=LS.get('habits',[{id:1,name:'Olahraga 30m',freq:'daily',streak:12,done:true,icon:'🏃'},{id:2,name:'Baca 20 halaman',freq:'daily',streak:8,done:false,icon:'📚'},{id:3,name:'Coding practice',freq:'weekday',streak:15,done:true,icon:'💻'},{id:4,name:'Journaling',freq:'daily',streak:5,done:false,icon:'📝'}]);
    let pomoSessions=LS.get('pomoSessions',0);let pomoTotal=LS.get('pomoTotal',0);let vision=LS.get('vision',null);
    let journals=LS.get('journals',[]);let currentMood='';
    const saveState=()=>{LS.set('goals',goals);LS.set('habits',habits);LS.set('pomoSessions',pomoSessions);LS.set('pomoTotal',pomoTotal)};

    const resources=[{t:'Business Model Canvas',d:'Framework model bisnis. 9 blok.',i:'📋',c:'Bisnis',dt:'Mulai dari customer segment → value proposition → channels.'},{t:'SMART Goals',d:'Specific, Measurable, Achievable goals.',i:'🎯',c:'Produktivitas',dt:'Bukan "sukses" tapi "Revenue Rp 10jt/bulan dalam 6 bulan".'},{t:'Eisenhower Matrix',d:'Prioritas urgensi & kepentingan.',i:'⚡',c:'Produktivitas',dt:'Q1:DO Q2:SCHEDULE Q3:DELEGATE Q4:DELETE.'},{t:'Personal Finance 101',d:'Dasar kelola keuangan.',i:'💰',c:'Finansial',dt:'50/30/20 rule. Emergency fund first.'},{t:'Growth Mindset',d:'Pola pikir pertumbuhan.',i:'🧠',c:'Personal',dt:'"I can\'t do this YET." Embrace challenges.'},{t:'Networking Strategy',d:'Koneksi profesional.',i:'🤝',c:'Karir',dt:'Give first, follow up 48h, join communities.'},{t:'MVP Development',d:'Minimum Viable Product.',i:'🚀',c:'Tech',dt:'1 core feature → launch → feedback → iterate.'},{t:'Content Marketing',d:'Strategi konten.',i:'📝',c:'Marketing',dt:'Hook → Value → CTA. 3-5 posts/week.'},{t:'Time Blocking',d:'Block calendar deep work.',i:'⏰',c:'Produktivitas',dt:'2-3 jam blocks. No meetings before noon.'},{t:'SWOT Analysis',d:'Strengths & peluang.',i:'📊',c:'Bisnis',dt:'Use SparkMind SWOT Analyzer!'},{t:'Habit Stacking',d:'Build habits baru.',i:'🔥',c:'Personal',dt:'After [CURRENT], I will [NEW].'},{t:'Revenue Model',d:'Framework revenue.',i:'💎',c:'Bisnis',dt:'Subscription, Freemium, Marketplace, Ads.'},{t:'Active Recall',d:'Teknik belajar efektif.',i:'📖',c:'Pendidikan',dt:'Close book → remember → check. 3x effective.'},{t:'Deep Work',d:'Fokus tanpa distraksi.',i:'🧘',c:'Produktivitas',dt:'90 min blocks. Phone off. Single-task.'},{t:'Creator Economy',d:'Monetisasi konten.',i:'🎬',c:'Creative',dt:'1000 true fans > 100K casual.'},{t:'Ikigai Framework',d:'Temukan tujuan hidup.',i:'🌸',c:'Purpose',dt:'Love × Good At × World Needs × Paid For.'},{t:'Public Speaking',d:'Bicara di depan umum.',i:'🎤',c:'Networking',dt:'Hook → Problem → Solution → CTA.'},{t:'Journaling Guide',d:'Jurnal harian.',i:'📓',c:'Personal',dt:'Morning brain dump. Evening 3 gratitudes.'},{t:'Parenting Essentials',d:'Panduan parenting.',i:'👶',c:'Family',dt:'Quality > quantity. Emotional coaching.'}];

    // ===== ONBOARDING =====
    if(!userName)document.getElementById('onboarding').classList.remove('hidden');
    function completeOnboarding(){const n=document.getElementById('onboard-name').value.trim()||'User';userName=n;LS.set('name',n);document.getElementById('onboarding').classList.add('hidden');updateUserDisplay();updateDashboard();showToast('Welcome, '+n+'! 🚀','success')}
    function updateUserDisplay(){document.getElementById('user-initial').textContent=userName.charAt(0).toUpperCase();document.getElementById('dash-name').textContent=userName}
    if(userName)updateUserDisplay();

    // ===== TABS =====
    function switchTab(t){document.querySelectorAll('.tab-content').forEach(e=>e.classList.add('hidden'));document.getElementById('tab-'+t).classList.remove('hidden');document.querySelectorAll('.sidebar-link').forEach(e=>e.classList.remove('active'));const sl=document.querySelector('[data-tab="'+t+'"]');if(sl)sl.classList.add('active');const titles={dashboard:'Dashboard',analyzer:'AI Analyzer V4',swot:'SWOT Analyzer',coach:'AI Coach V4',pomodoro:'Pomodoro Timer Pro',goals:'Goal Tracker',habits:'Habit Tracker',journal:'Daily Journal',vision:'Vision Board',review:'Weekly Review',resources:'Resource Library'};document.getElementById('page-title').textContent=titles[t]||'SparkMind V4';if(t==='dashboard')updateDashboard();if(t==='goals')renderGoals();if(t==='habits')renderHabits();if(t==='resources')renderResources();if(t==='vision')loadVision();if(t==='journal')loadJournal();closeSB()}

    // ===== DASHBOARD =====
    function updateDashboard(){
      document.getElementById('dash-goals').textContent=goals.length;document.getElementById('dash-habits').textContent=habits.length;document.getElementById('dash-focus').textContent=pomoTotal+'m';
      const mx=habits.reduce((m,h)=>Math.max(m,h.streak),0);document.getElementById('dash-streak').textContent=mx;
      // Chart
      const ch=document.getElementById('goal-chart');
      ch.innerHTML=goals.length?goals.map(g=>'<div class="flex-1 flex flex-col items-center gap-2"><div class="w-full bg-brand-500/10 rounded-t-lg relative" style="height:160px"><div class="absolute bottom-0 w-full bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-lg chart-bar" style="height:0%" data-h="'+g.progress+'%"></div></div><p class="text-[10px] text-sub font-bold truncate max-w-full text-center">'+esc(g.title.substring(0,12))+'</p><p class="text-xs font-black text-brand-400">'+g.progress+'%</p></div>').join(''):'<p class="text-muted text-sm w-full text-center py-8">Tambah goals untuk melihat chart.</p>';
      setTimeout(()=>{ch.querySelectorAll('.chart-bar').forEach(b=>{b.style.height=b.dataset.h})},100);
      // Goal list
      const gl=document.getElementById('dash-goal-list');gl.innerHTML=goals.slice(0,4).map(g=>'<div class="flex items-center gap-3"><div class="flex-1"><div class="flex justify-between mb-1"><span class="text-main text-xs font-bold">'+esc(g.title)+'</span><span class="text-brand-400 text-xs font-bold">'+g.progress+'%</span></div><div class="w-full bg-brand-500/10 rounded-full h-2"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-2 rounded-full progress-bar" style="width:'+g.progress+'%"></div></div></div></div>').join('')||'<p class="text-muted text-sm">Belum ada goals.</p>';
      // Habits
      const hl=document.getElementById('dash-habit-list');hl.innerHTML=habits.slice(0,4).map(h=>'<div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center '+(h.done?'bg-neon-green/20 text-neon-green':'bg-brand-500/10 text-muted')+'"><i class="fas '+(h.done?'fa-check':'fa-circle')+' text-xs"></i></div><span class="text-main text-sm flex-1 '+(h.done?'line-through opacity-50':'')+'">'+h.icon+' '+esc(h.name)+'</span><span class="text-neon-amber text-xs font-bold"><i class="fas fa-fire-flame-curved mr-1"></i>'+h.streak+'</span></div>').join('')||'<p class="text-muted text-sm">Belum ada habits.</p>';
    }

    // ===== CHAT WITH TYPING EFFECT =====
    function esc(t){const d=document.createElement('div');d.textContent=t;return d.innerHTML}
    function useEx(t){document.getElementById('user-input').value=t;sendMsg()}
    function sendMsg(){
      const inp=document.getElementById('user-input');const t=inp.value.trim();if(!t)return;inp.value='';inp.style.height='auto';
      const box=document.getElementById('chat-msgs');
      box.innerHTML+='<div class="msg-in flex justify-end"><div class="bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-2xl shadow-lg shadow-brand-500/10"><p class="text-sm">'+esc(t)+'</p></div></div>';
      const tid='t-'+Date.now();
      box.innerHTML+='<div id="'+tid+'" class="msg-in flex gap-3"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div><div class="card-bg rounded-2xl rounded-tl-sm px-5 py-4"><div class="flex gap-1.5"><div class="w-2 h-2 bg-brand-400 rounded-full typing-dot"></div><div class="w-2 h-2 bg-brand-400 rounded-full typing-dot"></div><div class="w-2 h-2 bg-brand-400 rounded-full typing-dot"></div></div></div></div>';
      box.scrollTop=box.scrollHeight;
      fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:t,mode:'strategic'})})
        .then(r=>r.json()).then(d=>{
          document.getElementById(tid).remove();
          const msgDiv=document.createElement('div');msgDiv.className='msg-in flex gap-3';
          msgDiv.innerHTML='<div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div><div class="card-bg rounded-2xl rounded-tl-sm p-5 max-w-2xl"><div class="text-sm leading-relaxed" id="typed-'+tid+'"></div></div>';
          box.appendChild(msgDiv);
          // Typing effect - insert HTML progressively
          const target=document.getElementById('typed-'+tid);
          const html=d.response;let i=0;const speed=2;
          function typeHTML(){if(i<html.length){const chunk=html.substring(0,i+speed);target.innerHTML=chunk;i+=speed;box.scrollTop=box.scrollHeight;requestAnimationFrame(typeHTML)}else{target.innerHTML=html;box.scrollTop=box.scrollHeight}}
          typeHTML();
        }).catch(()=>{document.getElementById(tid).remove();box.innerHTML+='<div class="msg-in flex gap-3"><div class="w-9 h-9 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-exclamation text-red-400 text-sm"></i></div><div class="card-bg rounded-2xl p-5"><p class="text-sm text-red-400">Error!</p></div></div>';box.scrollTop=box.scrollHeight});
    }

    // ===== SWOT =====
    function runSWOT(){const inp=document.getElementById('swot-input').value.trim();if(!inp)return showToast('Deskripsikan bisnis!','warn');const res=document.getElementById('swot-result');res.innerHTML='<div class="text-center py-8"><div class="flex gap-1.5 justify-center"><div class="w-2.5 h-2.5 bg-neon-green rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-green rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-green rounded-full typing-dot"></div></div></div>';fetch('/api/swot',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({business:inp})}).then(r=>r.json()).then(d=>{res.innerHTML='<div class="card-bg rounded-2xl p-6">'+d.response+'</div>';showToast('SWOT generated!','success')}).catch(()=>{res.innerHTML='';showToast('Error generating SWOT','error')})}

    // ===== COACH =====
    function runCoach(){const g=document.getElementById('coach-goal').value.trim();if(!g)return showToast('Masukkan goal!','warn');const s=document.getElementById('coach-state').value.trim(),o=document.getElementById('coach-obstacles').value.trim();const res=document.getElementById('coach-result');res.innerHTML='<div class="text-center py-8"><div class="flex gap-1.5 justify-center"><div class="w-2.5 h-2.5 bg-neon-amber rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-amber rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-amber rounded-full typing-dot"></div></div></div>';fetch('/api/coach',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({goal:g,currentState:s,obstacles:o})}).then(r=>r.json()).then(d=>{res.innerHTML='<div class="card-bg rounded-2xl p-6">'+d.response+'</div>';showToast('Coaching ready!','success')}).catch(()=>{res.innerHTML='';showToast('Error','error')})}

    // ===== POMODORO =====
    let pomoInterval=null,pomoTimeLeft=25*60,pomoRunning=false,pomoMode='focus';
    const pomoModes={focus:{time:25*60,label:'Focus Time',color:'#6366f1'},short:{time:5*60,label:'Short Break',color:'#34d399'},long:{time:15*60,label:'Long Break',color:'#fbbf24'}};
    function updatePomoDisplay(){const m=Math.floor(pomoTimeLeft/60),s=pomoTimeLeft%60;document.getElementById('pomo-time').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');const total=pomoModes[pomoMode].time,pct=(total-pomoTimeLeft)/total;document.getElementById('pomo-ring').style.strokeDashoffset=565.48*(1-pct);document.getElementById('pomo-ring').style.stroke=pomoModes[pomoMode].color;document.getElementById('pomo-label').textContent=pomoModes[pomoMode].label;document.getElementById('pomo-sessions').textContent=pomoSessions;document.getElementById('pomo-total').textContent=pomoTotal+'m'}
    function playBeep(){try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=800;g.gain.value=0.3;o.start();setTimeout(()=>{o.stop();a.close()},300)}catch{}}
    function startPomo(){if(pomoRunning)return;pomoRunning=true;document.getElementById('pomo-start-btn').classList.add('hidden');document.getElementById('pomo-pause-btn').classList.remove('hidden');pomoInterval=setInterval(()=>{pomoTimeLeft--;if(pomoTimeLeft<=0){clearInterval(pomoInterval);pomoRunning=false;if(pomoMode==='focus'){pomoSessions++;pomoTotal+=25;saveState();showToast('Focus session selesai! 🎉','success')}document.getElementById('pomo-start-btn').classList.remove('hidden');document.getElementById('pomo-pause-btn').classList.add('hidden');playBeep();setTimeout(playBeep,400);setTimeout(playBeep,800);const next=pomoMode==='focus'?'short':'focus';setPomoMode(next)}updatePomoDisplay()},1000)}
    function pausePomo(){if(!pomoRunning)return;clearInterval(pomoInterval);pomoRunning=false;document.getElementById('pomo-start-btn').classList.remove('hidden');document.getElementById('pomo-pause-btn').classList.add('hidden')}
    function resetPomo(){pausePomo();pomoTimeLeft=pomoModes[pomoMode].time;updatePomoDisplay()}
    function setPomoMode(mode){pausePomo();pomoMode=mode;pomoTimeLeft=pomoModes[mode].time;document.querySelectorAll('.pomo-mode-btn').forEach(b=>{b.className='pomo-mode-btn text-xs px-4 py-2 rounded-lg font-bold text-sub bg-brand-500/10'});const btn=document.querySelector('[data-mode="'+mode+'"]');if(btn)btn.className='pomo-mode-btn active text-xs px-4 py-2 rounded-lg font-bold bg-brand-500 text-white';updatePomoDisplay()}
    updatePomoDisplay();

    // ===== GOALS =====
    function showAddGoal(){document.getElementById('add-goal-form').classList.remove('hidden')}
    function hideAddGoal(){document.getElementById('add-goal-form').classList.add('hidden')}
    function addGoal(){const t=document.getElementById('goal-title').value.trim();if(!t)return showToast('Nama goal!','warn');goals.push({id:Date.now(),title:t,desc:document.getElementById('goal-desc').value.trim(),category:document.getElementById('goal-cat').value,progress:0,deadline:document.getElementById('goal-dl').value||'TBD',milestones:[]});document.getElementById('goal-title').value='';document.getElementById('goal-desc').value='';hideAddGoal();saveState();renderGoals();showToast('Goal added! 🎯','success')}
    function updProg(id,d){const g=goals.find(x=>x.id===id);if(g){g.progress=Math.max(0,Math.min(100,g.progress+d));if(g.progress===100)showToast('Goal completed! 🎉','success');saveState();renderGoals()}}
    function delGoal(id){if(confirm('Hapus goal?')){goals=goals.filter(x=>x.id!==id);saveState();renderGoals();showToast('Goal deleted','info')}}
    function renderGoals(){const l=document.getElementById('goals-list');if(!goals.length){l.innerHTML='<div class="text-center py-16"><i class="fas fa-bullseye text-4xl text-muted mb-4"></i><p class="text-muted text-sm">Belum ada goals.</p></div>';return}const ci={bisnis:'💼',karir:'📈',skill:'💻',personal:'🧘',finansial:'💰',kesehatan:'💪'};l.innerHTML=goals.map(g=>'<div class="card-bg rounded-2xl p-6 hover:border-brand-500/20 transition"><div class="flex items-start justify-between mb-4"><div class="flex items-center gap-3"><span class="text-2xl">'+(ci[g.category]||'🎯')+'</span><div><h3 class="font-bold text-main">'+esc(g.title)+'</h3><p class="text-muted text-xs">'+esc(g.desc)+'</p></div></div><div class="flex items-center gap-2"><span class="text-xs text-muted"><i class="fas fa-calendar mr-1"></i>'+g.deadline+'</span><button onclick="delGoal('+g.id+')" class="text-muted hover:text-red-400 transition"><i class="fas fa-trash text-xs"></i></button></div></div><div class="flex items-center gap-4"><div class="flex-1"><div class="w-full bg-brand-500/10 rounded-full h-3"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-3 rounded-full progress-bar" style="width:'+g.progress+'%"></div></div></div><span class="text-sm font-bold text-brand-400 min-w-[40px] text-right">'+g.progress+'%</span><div class="flex gap-1"><button onclick="updProg('+g.id+',-10)" class="w-7 h-7 bg-brand-500/10 hover:bg-brand-500/20 rounded-lg flex items-center justify-center transition"><i class="fas fa-minus text-xs text-muted"></i></button><button onclick="updProg('+g.id+',10)" class="w-7 h-7 bg-brand-500/20 hover:bg-brand-500/30 rounded-lg flex items-center justify-center transition"><i class="fas fa-plus text-xs text-brand-400"></i></button></div></div>'+(g.milestones&&g.milestones.length?'<div class="mt-4 flex flex-wrap gap-2">'+g.milestones.map((m,i)=>'<span class="text-xs px-3 py-1 rounded-lg '+(i<Math.ceil(g.progress/(100/g.milestones.length))?'bg-neon-green/10 text-neon-green border border-neon-green/20':'bg-brand-500/5 text-muted border border-brand-500/10')+'">'+m+'</span>').join('')+'</div>':'')+'</div>').join('')}

    // ===== HABITS =====
    function showAddHabit(){document.getElementById('add-habit-form').classList.remove('hidden')}
    function hideAddHabit(){document.getElementById('add-habit-form').classList.add('hidden')}
    function addHabit(){const n=document.getElementById('habit-name').value.trim();if(!n)return showToast('Nama habit!','warn');habits.push({id:Date.now(),name:n,freq:document.getElementById('habit-freq').value,streak:0,done:false,icon:'✨'});document.getElementById('habit-name').value='';hideAddHabit();saveState();renderHabits();showToast('Habit added! 🔥','success')}
    function toggleHabit(id){const h=habits.find(x=>x.id===id);if(h){h.done=!h.done;if(h.done){h.streak++;showToast(h.icon+' Streak '+h.streak+'! 🔥','success')}else h.streak=Math.max(0,h.streak-1);saveState();renderHabits()}}
    function delHabit(id){if(confirm('Hapus?')){habits=habits.filter(x=>x.id!==id);saveState();renderHabits();showToast('Habit deleted','info')}}
    function renderHabits(){const l=document.getElementById('habits-list');if(!habits.length){l.innerHTML='<div class="text-center py-16"><i class="fas fa-fire text-4xl text-muted mb-4"></i><p class="text-muted text-sm">Belum ada habits.</p></div>';return}const fq={daily:'Setiap Hari',weekday:'Sen-Jum','3x':'3x/Minggu'};l.innerHTML=habits.map(h=>'<div class="card-bg rounded-2xl p-5 flex items-center gap-4 hover:border-neon-pink/20 transition"><button onclick="toggleHabit('+h.id+')" class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition '+(h.done?'bg-gradient-to-br from-neon-green to-emerald-600 text-white shadow-lg shadow-neon-green/20':'bg-brand-500/10 text-muted hover:bg-brand-500/20')+'"><i class="fas '+(h.done?'fa-check':'fa-circle')+' text-sm"></i></button><div class="flex-1 min-w-0"><h3 class="font-bold text-main text-sm truncate '+(h.done?'line-through opacity-50':'')+'">'+h.icon+' '+esc(h.name)+'</h3><p class="text-muted text-xs">'+(fq[h.freq]||h.freq)+'</p></div><div class="text-right flex-shrink-0"><div class="flex items-center gap-1.5"><i class="fas fa-fire-flame-curved text-neon-amber text-sm"></i><span class="font-black text-main">'+h.streak+'</span></div><p class="text-[10px] text-muted">streak</p></div><button onclick="delHabit('+h.id+')" class="text-muted hover:text-red-400 transition flex-shrink-0"><i class="fas fa-trash text-xs"></i></button></div>').join('')}

    // ===== JOURNAL (NEW V4) =====
    function loadJournal(){
      document.getElementById('journal-date').textContent=new Date().toLocaleDateString('id-ID',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
      renderJournalHistory();
    }
    function setMood(m){currentMood=m;document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('selected'));event.target.classList.add('selected')}
    function saveJournal(){
      const g=document.getElementById('journal-gratitude').value.trim();const r=document.getElementById('journal-reflection').value.trim();const l=document.getElementById('journal-lesson').value.trim();
      if(!g&&!r&&!l)return showToast('Isi minimal 1 field!','warn');
      journals.unshift({date:new Date().toISOString(),mood:currentMood||'😊',gratitude:g,reflection:r,lesson:l});
      LS.set('journals',journals);
      document.getElementById('journal-gratitude').value='';document.getElementById('journal-reflection').value='';document.getElementById('journal-lesson').value='';currentMood='';document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('selected'));
      renderJournalHistory();showToast('Journal saved! 📓','success');
    }
    function renderJournalHistory(){
      const h=document.getElementById('journal-history');
      h.innerHTML=journals.slice(0,10).map(j=>{const d=new Date(j.date);return '<div class="card-bg rounded-xl p-4"><div class="flex items-center justify-between mb-2"><div class="flex items-center gap-2"><span class="text-xl">'+j.mood+'</span><span class="text-xs font-bold text-main">'+d.toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})+'</span></div></div>'+(j.gratitude?'<p class="text-xs text-sub mb-1"><span class="text-neon-green font-bold">Gratitude:</span> '+esc(j.gratitude).substring(0,100)+'</p>':'')+(j.reflection?'<p class="text-xs text-sub mb-1"><span class="text-brand-400 font-bold">Refleksi:</span> '+esc(j.reflection).substring(0,100)+'</p>':'')+(j.lesson?'<p class="text-xs text-sub"><span class="text-neon-amber font-bold">Lesson:</span> '+esc(j.lesson).substring(0,80)+'</p>':'')+'</div>'}).join('')||'<p class="text-muted text-sm text-center py-4">Belum ada journal entries.</p>';
    }

    // ===== VISION =====
    function loadVision(){if(vision){document.getElementById('vision-big').value=vision.big||'';document.getElementById('vision-1y').value=vision.y1||'';document.getElementById('vision-3m').value=vision.m3||'';document.getElementById('vision-1w').value=vision.w1||'';showVisionDisplay()}}
    function saveVision(){const big=document.getElementById('vision-big').value.trim();if(!big)return showToast('Tulis visi besarmu!','warn');vision={big,y1:document.getElementById('vision-1y').value.trim(),m3:document.getElementById('vision-3m').value.trim(),w1:document.getElementById('vision-1w').value.trim(),date:new Date().toISOString()};LS.set('vision',vision);showVisionDisplay();showToast('Vision saved! ✨','success')}
    function showVisionDisplay(){if(!vision)return;document.getElementById('vision-display').classList.remove('hidden');document.getElementById('vision-content').innerHTML='<div class="space-y-4"><div class="bg-gradient-to-r from-neon-pink/10 to-rose-500/10 border border-neon-pink/20 rounded-xl p-5"><p class="text-neon-pink text-xs font-bold mb-2">MY BIG VISION</p><p class="text-main text-sm font-medium">'+esc(vision.big)+'</p></div><div class="grid sm:grid-cols-3 gap-3">'+(vision.y1?'<div class="card-bg rounded-xl p-4"><p class="text-brand-400 text-xs font-bold mb-2">1 YEAR</p><p class="text-sub text-xs">'+esc(vision.y1)+'</p></div>':'')+(vision.m3?'<div class="card-bg rounded-xl p-4"><p class="text-neon-green text-xs font-bold mb-2">3 MONTHS</p><p class="text-sub text-xs">'+esc(vision.m3)+'</p></div>':'')+(vision.w1?'<div class="card-bg rounded-xl p-4"><p class="text-neon-amber text-xs font-bold mb-2">THIS WEEK</p><p class="text-sub text-xs">'+esc(vision.w1)+'</p></div>':'')+'</div></div>'}

    // ===== REVIEW =====
    function saveReview(){const w=document.getElementById('review-wins').value,l=document.getElementById('review-learn').value,f=document.getElementById('review-focus').value;if(!w&&!l&&!f)return showToast('Isi minimal 1!','warn');const reviews=LS.get('reviews',[]);reviews.push({date:new Date().toISOString(),wins:w,learnings:l,focus:f});LS.set('reviews',reviews);showToast('Review saved! 📋','success')}

    // ===== RESOURCES (EXPANDABLE) =====
    function toggleResource(i){const el=document.getElementById('res-detail-'+i);el.classList.toggle('open')}
    function renderResources(){const q=(document.getElementById('resource-search')?.value||'').toLowerCase();const filtered=resources.filter(r=>!q||r.t.toLowerCase().includes(q)||r.d.toLowerCase().includes(q)||r.c.toLowerCase().includes(q));document.getElementById('resources-grid').innerHTML=filtered.map((r,i)=>'<div class="card-bg rounded-2xl p-6 hover:border-brand-500/20 hover:-translate-y-1 transition cursor-pointer" onclick="toggleResource('+i+')"><span class="text-3xl mb-3 block">'+r.i+'</span><span class="text-[10px] bg-brand-500/10 text-sub px-2 py-0.5 rounded-lg font-bold uppercase border border-brand-500/10">'+r.c+'</span><h3 class="font-bold text-main mt-2 mb-1 text-sm">'+r.t+'</h3><p class="text-muted text-xs">'+r.d+'</p><div id="res-detail-'+i+'" class="resource-detail"><div class="mt-3 pt-3 border-t border-brand-500/10"><p class="text-xs text-brand-400 font-bold mb-1">DETAIL</p><p class="text-sub text-xs">'+r.dt+'</p></div></div><p class="text-brand-400 text-[10px] mt-2 font-bold">Klik untuk detail ↓</p></div>').join('')||(q?'<p class="text-muted text-sm col-span-3 text-center py-8">Tidak ditemukan.</p>':'')}

    // ===== EXPORT =====
    function exportData(){let txt='=== SparkMind V4.0 Data Export ===\\nDate: '+new Date().toLocaleString('id-ID')+'\\n\\n== GOALS ==\\n';goals.forEach(g=>{txt+=g.title+' ['+g.progress+'%] - '+g.category+'\\n'});txt+='\\n== HABITS ==\\n';habits.forEach(h=>{txt+=h.name+' streak:'+h.streak+' '+(h.done?'Done':'Pending')+'\\n'});txt+='\\n== POMODORO ==\\nSessions:'+pomoSessions+' Total:'+pomoTotal+'m\\n';if(vision)txt+='\\n== VISION ==\\n'+vision.big+'\\n';txt+='\\n== JOURNALS ==\\n';journals.slice(0,5).forEach(j=>{txt+=new Date(j.date).toLocaleDateString('id-ID')+' '+j.mood+' '+j.gratitude.substring(0,50)+'\\n'});const blob=new Blob([txt],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='sparkmind-v4-'+new Date().toISOString().slice(0,10)+'.txt';a.click();showToast('Data exported! 📁','success')}

    // ===== SIDEBAR MOBILE =====
    document.getElementById('sb-toggle').addEventListener('click',()=>{document.getElementById('sidebar').classList.remove('hidden');document.getElementById('sidebar').classList.add('fixed','inset-y-0','left-0','z-50');document.getElementById('sb-overlay').classList.remove('hidden')});
    function closeSB(){document.getElementById('sidebar').classList.add('hidden');document.getElementById('sidebar').classList.remove('fixed','inset-y-0','left-0','z-50');document.getElementById('sb-overlay').classList.add('hidden');if(window.innerWidth>=768)document.getElementById('sidebar').classList.remove('hidden')}

    // ===== TEXTAREA AUTO RESIZE =====
    document.getElementById('user-input')?.addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,128)+'px'});

    // ===== QUOTE TICKER =====
    fetch('/api/quotes').then(r=>r.json()).then(q=>{document.getElementById('quote-ticker').textContent='"'+q.text+'" — '+q.author}).catch(()=>{});

    // ===== INIT =====
    updateDashboard();renderGoals();renderHabits();
  </script>
</body>
</html>`

export default app