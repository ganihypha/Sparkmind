import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

// ============================================
// LANDING PAGE
// ============================================
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind — AI Strategic Guide Platform</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { 50:'#f0f4ff', 100:'#dbe4ff', 200:'#bac8ff', 300:'#91a7ff', 400:'#748ffc', 500:'#5c7cfa', 600:'#4c6ef5', 700:'#4263eb', 800:'#3b5bdb', 900:'#364fc7' },
            accent: { 400:'#ffd43b', 500:'#fcc419', 600:'#fab005' },
            dark: { 800:'#1a1b2e', 900:'#12132a' }
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    * { font-family: 'Inter', sans-serif; }
    html { scroll-behavior: smooth; }
    .gradient-text { background: linear-gradient(135deg, #5c7cfa, #fcc419); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero-gradient { background: linear-gradient(135deg, #12132a 0%, #1a1b2e 50%, #1e2a4a 100%); }
    .card-glow:hover { box-shadow: 0 0 30px rgba(92,124,250,0.15); transform: translateY(-4px); }
    .card-glow { transition: all 0.3s ease; }
    .floating { animation: float 6s ease-in-out infinite; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
    .pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
    @keyframes pulseGlow { 0%,100%{box-shadow:0 0 20px rgba(92,124,250,0.3)} 50%{box-shadow:0 0 40px rgba(92,124,250,0.6)} }
    .typing-cursor::after { content:'|'; animation: blink 1s infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .stat-counter { opacity:0; transform:translateY(20px); transition:all 0.6s ease; }
    .stat-counter.visible { opacity:1; transform:translateY(0); }
  </style>
</head>
<body class="bg-white text-gray-800">
  <!-- NAVBAR -->
  <nav class="fixed top-0 w-full z-50 bg-dark-900/95 backdrop-blur-md border-b border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
            <i class="fas fa-brain text-white text-sm"></i>
          </div>
          <span class="text-white font-bold text-xl">Spark<span class="text-accent-500">Mind</span></span>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-gray-300 hover:text-white transition text-sm">Fitur</a>
          <a href="#tools" class="text-gray-300 hover:text-white transition text-sm">Tools</a>
          <a href="#pricing" class="text-gray-300 hover:text-white transition text-sm">Harga</a>
          <a href="#testimonials" class="text-gray-300 hover:text-white transition text-sm">Testimoni</a>
          <a href="/app" class="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full text-sm font-medium transition">Mulai Gratis</a>
        </div>
        <button id="mobile-menu-btn" class="md:hidden text-white">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>
    </div>
    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-dark-900 border-t border-white/5 pb-4">
      <div class="px-4 space-y-3 pt-3">
        <a href="#features" class="block text-gray-300 hover:text-white text-sm">Fitur</a>
        <a href="#tools" class="block text-gray-300 hover:text-white text-sm">Tools</a>
        <a href="#pricing" class="block text-gray-300 hover:text-white text-sm">Harga</a>
        <a href="/app" class="block bg-brand-600 text-white px-5 py-2 rounded-full text-sm font-medium text-center">Mulai Gratis</a>
      </div>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <section class="hero-gradient min-h-screen flex items-center pt-16 relative overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-700/5 rounded-full blur-3xl"></div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span class="text-gray-300 text-sm">AI-Powered Strategic Platform</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Ubah Masalahmu Jadi <span class="gradient-text">Strategi Sukses</span>
          </h1>
          <p class="text-gray-400 text-lg mb-8 max-w-lg">
            Platform AI yang menganalisis tantanganmu dan memberikan <strong class="text-white">action plan strategis</strong> yang terukur. Dari kebingungan menuju kejelasan — dalam hitungan detik.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="/app" class="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-full font-semibold text-center transition shadow-lg shadow-brand-600/25 flex items-center justify-center space-x-2">
              <i class="fas fa-rocket"></i>
              <span>Mulai Gratis Sekarang</span>
            </a>
            <a href="#features" class="border border-white/20 hover:border-white/40 text-white px-8 py-3.5 rounded-full font-semibold text-center transition flex items-center justify-center space-x-2">
              <i class="fas fa-play-circle"></i>
              <span>Lihat Demo</span>
            </a>
          </div>
          <div class="flex items-center space-x-6">
            <div class="flex -space-x-2">
              <div class="w-8 h-8 rounded-full bg-brand-400 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold">A</div>
              <div class="w-8 h-8 rounded-full bg-accent-500 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold">B</div>
              <div class="w-8 h-8 rounded-full bg-green-500 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold">C</div>
              <div class="w-8 h-8 rounded-full bg-purple-500 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold">+</div>
            </div>
            <div>
              <p class="text-white font-semibold text-sm">2,500+ Users</p>
              <p class="text-gray-500 text-xs">Sudah bergabung & tumbuh bersama</p>
            </div>
          </div>
        </div>
        <div class="hidden lg:block relative">
          <div class="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 floating">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
              <span class="text-gray-500 text-xs ml-2">SparkMind Analyzer</span>
            </div>
            <div class="space-y-3">
              <div class="bg-brand-900/30 border border-brand-500/20 rounded-lg p-3">
                <p class="text-gray-400 text-xs mb-1">📝 Masalah kamu:</p>
                <p class="text-white text-sm">"Aku ingin memulai bisnis tapi tidak tahu harus mulai dari mana..."</p>
              </div>
              <div class="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                <p class="text-green-400 text-xs mb-1">🧠 AI Analysis:</p>
                <p class="text-white text-sm">Berdasarkan analisis, berikut 3 langkah strategis untuk memulai:</p>
                <div class="mt-2 space-y-1">
                  <p class="text-gray-300 text-xs">✅ 1. Validasi ide bisnis dengan market research</p>
                  <p class="text-gray-300 text-xs">✅ 2. Buat MVP (Minimum Viable Product)</p>
                  <p class="text-gray-300 text-xs">✅ 3. Launch & iterate berdasarkan feedback</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="h-1 flex-1 bg-brand-600 rounded-full"></div>
                <span class="text-brand-400 text-xs">95% confidence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS SECTION -->
  <section class="py-16 bg-gray-50 border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center stat-counter">
          <p class="text-3xl sm:text-4xl font-black text-brand-600" data-target="2500">0</p>
          <p class="text-gray-500 text-sm mt-1">Active Users</p>
        </div>
        <div class="text-center stat-counter">
          <p class="text-3xl sm:text-4xl font-black text-brand-600" data-target="15000">0</p>
          <p class="text-gray-500 text-sm mt-1">Strategi Dibuat</p>
        </div>
        <div class="text-center stat-counter">
          <p class="text-3xl sm:text-4xl font-black text-brand-600">98%</p>
          <p class="text-gray-500 text-sm mt-1">Satisfaction Rate</p>
        </div>
        <div class="text-center stat-counter">
          <p class="text-3xl sm:text-4xl font-black text-brand-600">24/7</p>
          <p class="text-gray-500 text-sm mt-1">AI Available</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES SECTION -->
  <section id="features" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <span class="inline-block bg-brand-100 text-brand-700 px-4 py-1 rounded-full text-sm font-medium mb-4">Fitur Unggulan</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Semua yang Kamu Butuhkan untuk <span class="gradient-text">Bertumbuh</span></h2>
        <p class="text-gray-500 max-w-2xl mx-auto">Platform lengkap yang membantu kamu mengambil keputusan strategis dengan dukungan AI yang cerdas dan actionable.</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-glow">
          <div class="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-5">
            <i class="fas fa-brain text-brand-600 text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">AI Strategic Analyzer</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Input masalahmu, AI akan menganalisis dan memberikan strategi actionable dengan langkah-langkah yang jelas.</p>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-glow">
          <div class="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
            <i class="fas fa-route text-green-600 text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Goal Roadmap Builder</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Buat roadmap visual dari tujuanmu. Pecah goals besar menjadi milestone yang terukur dan achievable.</p>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-glow">
          <div class="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-5">
            <i class="fas fa-chart-line text-purple-600 text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Progress Tracker</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Track progress goalmu secara real-time. Lihat seberapa jauh kamu sudah melangkah dan apa yang perlu difokuskan.</p>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-glow">
          <div class="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-5">
            <i class="fas fa-lightbulb text-amber-600 text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Daily Insights</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Dapatkan insight harian yang dipersonalisasi berdasarkan goals dan progress kamu.</p>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-glow">
          <div class="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-5">
            <i class="fas fa-book-open text-rose-600 text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Resource Library</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Akses framework, template, dan panduan strategis yang sudah terbukti dari para ahli di berbagai bidang.</p>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-glow">
          <div class="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-5">
            <i class="fas fa-shield-halved text-cyan-600 text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Data dan strategimu aman. Enkripsi end-to-end dan tidak pernah dibagikan ke pihak ketiga.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section id="tools" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <span class="inline-block bg-accent-500/20 text-accent-600 px-4 py-1 rounded-full text-sm font-medium mb-4">Cara Kerja</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Semudah <span class="gradient-text">3 Langkah</span></h2>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-600/25">
            <span class="text-white text-2xl font-black">1</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Ceritakan Masalahmu</h3>
          <p class="text-gray-500 text-sm">Tulis masalah, tantangan, atau goal kamu dalam bahasa sehari-hari. AI kami memahami konteks Indonesia.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-600/25">
            <span class="text-white text-2xl font-black">2</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">AI Menganalisis</h3>
          <p class="text-gray-500 text-sm">AI kami memproses masalahmu, mengidentifikasi pola, dan merancang strategi yang terukur.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-600/25">
            <span class="text-white text-2xl font-black">3</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Eksekusi & Tumbuh</h3>
          <p class="text-gray-500 text-sm">Dapatkan action plan lengkap dengan timeline, milestones, dan tips praktis untuk eksekusi.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING SECTION -->
  <section id="pricing" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <span class="inline-block bg-brand-100 text-brand-700 px-4 py-1 rounded-full text-sm font-medium mb-4">Pricing</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Pilih Plan yang <span class="gradient-text">Cocok Untukmu</span></h2>
        <p class="text-gray-500">Mulai gratis, upgrade kapan saja.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- FREE -->
        <div class="bg-white border border-gray-200 rounded-2xl p-8 card-glow">
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-900">Starter</h3>
            <p class="text-gray-500 text-sm mt-1">Untuk mulai eksplorasi</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-black text-gray-900">Gratis</span>
            <span class="text-gray-500 text-sm">/selamanya</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center space-x-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i><span>3 AI Analysis / hari</span></li>
            <li class="flex items-center space-x-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i><span>Basic Goal Tracker</span></li>
            <li class="flex items-center space-x-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i><span>5 Resource Library items</span></li>
            <li class="flex items-center space-x-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i><span>Community Access</span></li>
          </ul>
          <a href="/app" class="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-full font-semibold transition">Mulai Gratis</a>
        </div>
        <!-- PRO -->
        <div class="bg-brand-600 border-2 border-brand-500 rounded-2xl p-8 relative shadow-xl shadow-brand-600/20 scale-105">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-dark-900 px-4 py-1 rounded-full text-xs font-bold">MOST POPULAR</div>
          <div class="mb-6">
            <h3 class="text-lg font-bold text-white">Pro</h3>
            <p class="text-brand-200 text-sm mt-1">Untuk yang serius bertumbuh</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-black text-white">Rp 79K</span>
            <span class="text-brand-200 text-sm">/bulan</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center space-x-2 text-sm text-white"><i class="fas fa-check text-accent-400"></i><span>Unlimited AI Analysis</span></li>
            <li class="flex items-center space-x-2 text-sm text-white"><i class="fas fa-check text-accent-400"></i><span>Advanced Goal Roadmap</span></li>
            <li class="flex items-center space-x-2 text-sm text-white"><i class="fas fa-check text-accent-400"></i><span>Full Resource Library</span></li>
            <li class="flex items-center space-x-2 text-sm text-white"><i class="fas fa-check text-accent-400"></i><span>Daily Personalized Insights</span></li>
            <li class="flex items-center space-x-2 text-sm text-white"><i class="fas fa-check text-accent-400"></i><span>Priority Support</span></li>
          </ul>
          <a href="/app" class="block w-full text-center bg-white hover:bg-gray-100 text-brand-600 py-3 rounded-full font-bold transition">Upgrade ke Pro</a>
        </div>
        <!-- ENTERPRISE -->
        <div class="bg-white border border-gray-200 rounded-2xl p-8 card-glow">
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-900">Enterprise</h3>
            <p class="text-gray-500 text-sm mt-1">Untuk tim & organisasi</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-black text-gray-900">Custom</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center space-x-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i><span>Semua fitur Pro</span></li>
            <li class="flex items-center space-x-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i><span>Team Collaboration</span></li>
            <li class="flex items-center space-x-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i><span>Custom AI Training</span></li>
            <li class="flex items-center space-x-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i><span>API Access</span></li>
            <li class="flex items-center space-x-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i><span>Dedicated Support</span></li>
          </ul>
          <a href="#" class="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-full font-semibold transition">Hubungi Kami</a>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section id="testimonials" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <span class="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">Testimoni</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Kata Mereka tentang <span class="gradient-text">SparkMind</span></h2>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white border border-gray-100 rounded-2xl p-8">
          <div class="flex items-center space-x-1 mb-4">
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
          </div>
          <p class="text-gray-600 text-sm mb-6 italic">"SparkMind bantu aku breakdown goal bisnis yang tadinya terasa overwhelming jadi langkah-langkah kecil yang actionable. Sekarang udah punya 3 klien!"</p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center"><span class="font-bold text-brand-600">R</span></div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">Rina S.</p>
              <p class="text-gray-500 text-xs">Freelance Designer</p>
            </div>
          </div>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8">
          <div class="flex items-center space-x-1 mb-4">
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
          </div>
          <p class="text-gray-600 text-sm mb-6 italic">"AI Analyzer-nya luar biasa! Aku input masalah karir, dan strategi yang dikasih benar-benar practical. Udah naik jabatan dalam 3 bulan."</p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><span class="font-bold text-green-600">D</span></div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">Dimas P.</p>
              <p class="text-gray-500 text-xs">Software Engineer</p>
            </div>
          </div>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8">
          <div class="flex items-center space-x-1 mb-4">
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
            <i class="fas fa-star text-amber-400 text-sm"></i>
          </div>
          <p class="text-gray-600 text-sm mb-6 italic">"Sebagai mahasiswa, SparkMind jadi mentor virtual aku. Daily insights-nya selalu relevan dan bikin aku tetap on track sama target kuliah."</p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"><span class="font-bold text-purple-600">A</span></div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">Anita W.</p>
              <p class="text-gray-500 text-xs">Mahasiswa Teknik</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section class="py-20 hero-gradient relative overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
    </div>
    <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 class="text-3xl sm:text-4xl font-black text-white mb-6">Siap Mengubah Hidupmu?</h2>
      <p class="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Join 2,500+ orang yang sudah menemukan kejelasan dan strategi mereka. Gratis untuk memulai.</p>
      <a href="/app" class="inline-flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-dark-900 px-10 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-accent-500/25">
        <i class="fas fa-bolt"></i>
        <span>Mulai Sekarang — Gratis!</span>
      </a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-dark-900 text-gray-400 py-12 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
              <i class="fas fa-brain text-white text-sm"></i>
            </div>
            <span class="text-white font-bold text-lg">Spark<span class="text-accent-500">Mind</span></span>
          </div>
          <p class="text-sm">AI-powered strategic guide platform untuk Indonesia. Ubah masalahmu jadi strategi sukses.</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Produk</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/app" class="hover:text-white transition">AI Analyzer</a></li>
            <li><a href="/app" class="hover:text-white transition">Goal Roadmap</a></li>
            <li><a href="/app" class="hover:text-white transition">Resource Library</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Perusahaan</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition">Tentang Kami</a></li>
            <li><a href="#" class="hover:text-white transition">Blog</a></li>
            <li><a href="#" class="hover:text-white transition">Karir</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Connect</h4>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition"><i class="fab fa-instagram text-white"></i></a>
            <a href="#" class="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition"><i class="fab fa-twitter text-white"></i></a>
            <a href="#" class="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition"><i class="fab fa-linkedin text-white"></i></a>
          </div>
        </div>
      </div>
      <div class="border-t border-white/5 mt-10 pt-8 text-center text-sm">
        <p>&copy; 2026 SparkMind. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    // Mobile menu toggle
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Stat counter animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const counter = entry.target.querySelector('[data-target]');
          if (counter) {
            const target = parseInt(counter.dataset.target);
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) { current = target; clearInterval(timer); }
              counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
          }
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-counter').forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('mobile-menu').classList.add('hidden');
      });
    });
  </script>
</body>
</html>`)
})

// ============================================
// APP PAGE (Main Dashboard)
// ============================================
app.get('/app', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind — Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { 50:'#f0f4ff', 100:'#dbe4ff', 200:'#bac8ff', 300:'#91a7ff', 400:'#748ffc', 500:'#5c7cfa', 600:'#4c6ef5', 700:'#4263eb', 800:'#3b5bdb', 900:'#364fc7' },
            accent: { 400:'#ffd43b', 500:'#fcc419', 600:'#fab005' },
            dark: { 700:'#232541', 800:'#1a1b2e', 900:'#12132a' }
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    * { font-family: 'Inter', sans-serif; }
    .gradient-text { background: linear-gradient(135deg, #5c7cfa, #fcc419); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .sidebar-link.active { background: rgba(92,124,250,0.1); color: #5c7cfa; border-right: 3px solid #5c7cfa; }
    .typing-dot { animation: typingDot 1.4s infinite; }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typingDot { 0%,60%,100%{opacity:0.3;transform:translateY(0)} 30%{opacity:1;transform:translateY(-4px)} }
    .message-in { animation: msgIn 0.3s ease; }
    @keyframes msgIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    .goal-progress { transition: width 0.8s ease; }
    textarea:focus { outline: none; }
    .tab-btn.active { background: #4c6ef5; color: white; }
  </style>
</head>
<body class="bg-gray-50 h-screen flex overflow-hidden">
  <!-- SIDEBAR -->
  <aside id="sidebar" class="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col hidden md:flex">
    <div class="p-5 border-b border-gray-100">
      <a href="/" class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
          <i class="fas fa-brain text-white text-sm"></i>
        </div>
        <span class="font-bold text-lg text-gray-900">Spark<span class="text-accent-500">Mind</span></span>
      </a>
    </div>
    <nav class="flex-1 py-4">
      <div class="px-3 mb-2">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Menu</p>
      </div>
      <a href="#" onclick="switchTab('analyzer')" class="sidebar-link active flex items-center space-x-3 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition" data-tab="analyzer">
        <i class="fas fa-brain w-5 text-center"></i><span>AI Analyzer</span>
      </a>
      <a href="#" onclick="switchTab('goals')" class="sidebar-link flex items-center space-x-3 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition" data-tab="goals">
        <i class="fas fa-bullseye w-5 text-center"></i><span>Goal Tracker</span>
      </a>
      <a href="#" onclick="switchTab('roadmap')" class="sidebar-link flex items-center space-x-3 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition" data-tab="roadmap">
        <i class="fas fa-route w-5 text-center"></i><span>Roadmap</span>
      </a>
      <a href="#" onclick="switchTab('resources')" class="sidebar-link flex items-center space-x-3 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition" data-tab="resources">
        <i class="fas fa-book-open w-5 text-center"></i><span>Resources</span>
      </a>
      <a href="#" onclick="switchTab('insights')" class="sidebar-link flex items-center space-x-3 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition" data-tab="insights">
        <i class="fas fa-lightbulb w-5 text-center"></i><span>Daily Insights</span>
      </a>
    </nav>
    <div class="p-4 border-t border-gray-100">
      <div class="bg-brand-50 rounded-xl p-4">
        <p class="text-sm font-semibold text-brand-700 mb-1">Free Plan</p>
        <p class="text-xs text-brand-500 mb-3">3/3 analyses tersisa hari ini</p>
        <div class="w-full bg-brand-200 rounded-full h-1.5 mb-3">
          <div class="bg-brand-600 h-1.5 rounded-full" style="width:100%"></div>
        </div>
        <button class="w-full bg-brand-600 hover:bg-brand-700 text-white text-xs py-2 rounded-lg font-semibold transition">Upgrade ke Pro</button>
      </div>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="flex-1 flex flex-col overflow-hidden">
    <!-- TOP BAR -->
    <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center space-x-4">
        <button id="sidebar-toggle" class="md:hidden text-gray-600"><i class="fas fa-bars text-xl"></i></button>
        <h1 id="page-title" class="text-lg font-bold text-gray-900">AI Strategic Analyzer</h1>
      </div>
      <div class="flex items-center space-x-4">
        <button class="relative text-gray-400 hover:text-gray-600 transition">
          <i class="fas fa-bell text-lg"></i>
          <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">2</span>
        </button>
        <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center">
          <span class="text-white text-xs font-bold">H</span>
        </div>
      </div>
    </header>

    <!-- TAB CONTENT -->
    <div class="flex-1 overflow-auto">
      <!-- ANALYZER TAB -->
      <div id="tab-analyzer" class="tab-content h-full flex flex-col">
        <div id="chat-messages" class="flex-1 overflow-auto p-6 space-y-4">
          <!-- Welcome Message -->
          <div class="message-in flex space-x-3">
            <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i class="fas fa-brain text-white text-sm"></i>
            </div>
            <div class="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-5 max-w-2xl shadow-sm">
              <p class="text-gray-800 text-sm leading-relaxed">
                Halo! Aku <strong>SparkMind AI</strong> 🧠<br><br>
                Aku siap membantu menganalisis masalah, tantangan, atau goal kamu dan memberikan <strong>strategi actionable</strong> yang terukur.<br><br>
                <strong>Contoh yang bisa kamu tanyakan:</strong>
              </p>
              <div class="mt-3 space-y-2">
                <button onclick="useExample('Aku ingin memulai bisnis online tapi tidak tahu harus mulai dari mana')" class="block w-full text-left bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm px-4 py-2.5 rounded-lg transition">
                  💼 "Aku ingin memulai bisnis online tapi tidak tahu harus mulai dari mana"
                </button>
                <button onclick="useExample('Bagaimana cara meningkatkan produktivitas kerja dari rumah?')" class="block w-full text-left bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm px-4 py-2.5 rounded-lg transition">
                  ⚡ "Bagaimana cara meningkatkan produktivitas kerja dari rumah?"
                </button>
                <button onclick="useExample('Aku mau belajar programming dari nol, buatkan roadmap untukku')" class="block w-full text-left bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm px-4 py-2.5 rounded-lg transition">
                  💻 "Aku mau belajar programming dari nol, buatkan roadmap untukku"
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Input Area -->
        <div class="border-t border-gray-200 bg-white p-4">
          <div class="max-w-3xl mx-auto flex items-end space-x-3">
            <div class="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition">
              <textarea id="user-input" rows="1" placeholder="Ceritakan masalah atau goal kamu..." class="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none max-h-32" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMessage()}"></textarea>
            </div>
            <button onclick="sendMessage()" class="bg-brand-600 hover:bg-brand-700 text-white w-11 h-11 rounded-full flex items-center justify-center transition shadow-lg shadow-brand-600/25 flex-shrink-0">
              <i class="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
          <p class="text-center text-xs text-gray-400 mt-2">SparkMind AI — Strategic guidance powered by AI</p>
        </div>
      </div>

      <!-- GOALS TAB -->
      <div id="tab-goals" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Goal Tracker</h2>
              <p class="text-gray-500 text-sm">Track dan manage goals kamu</p>
            </div>
            <button onclick="showAddGoal()" class="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center space-x-2">
              <i class="fas fa-plus"></i><span>Tambah Goal</span>
            </button>
          </div>
          <!-- Add Goal Form (hidden by default) -->
          <div id="add-goal-form" class="hidden bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <h3 class="font-semibold text-gray-900 mb-4">Goal Baru</h3>
            <div class="space-y-4">
              <input id="goal-title" type="text" placeholder="Nama goal..." class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none">
              <textarea id="goal-desc" rows="2" placeholder="Deskripsi goal..." class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none resize-none"></textarea>
              <div class="flex items-center space-x-3">
                <select id="goal-category" class="border border-gray-200 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-brand-400">
                  <option value="bisnis">💼 Bisnis</option>
                  <option value="karir">📈 Karir</option>
                  <option value="skill">💻 Skill</option>
                  <option value="personal">🧘 Personal</option>
                  <option value="finansial">💰 Finansial</option>
                </select>
                <input id="goal-deadline" type="date" class="border border-gray-200 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-brand-400">
              </div>
              <div class="flex space-x-3">
                <button onclick="addGoal()" class="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition">Simpan</button>
                <button onclick="hideAddGoal()" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-semibold transition">Batal</button>
              </div>
            </div>
          </div>
          <!-- Goals List -->
          <div id="goals-list" class="space-y-4">
            <!-- Goals will be rendered here by JS -->
          </div>
        </div>
      </div>

      <!-- ROADMAP TAB -->
      <div id="tab-roadmap" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Roadmap Builder</h2>
          <p class="text-gray-500 text-sm mb-8">Visualisasi perjalanan menuju goals kamu</p>
          <div id="roadmap-content" class="relative">
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div class="space-y-8" id="roadmap-items">
              <!-- Roadmap items rendered by JS -->
            </div>
          </div>
        </div>
      </div>

      <!-- RESOURCES TAB -->
      <div id="tab-resources" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Resource Library</h2>
          <p class="text-gray-500 text-sm mb-8">Framework & panduan strategis untuk pertumbuhanmu</p>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" id="resources-grid">
            <!-- Resources rendered by JS -->
          </div>
        </div>
      </div>

      <!-- INSIGHTS TAB -->
      <div id="tab-insights" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Daily Insights</h2>
          <p class="text-gray-500 text-sm mb-8">Insight harian yang dipersonalisasi untukmu</p>
          <div id="insights-list" class="space-y-4">
            <!-- Insights rendered by JS -->
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Mobile Sidebar Overlay -->
  <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 hidden" onclick="closeSidebar()"></div>

  <script>
    // ======= STATE =======
    let goals = [
      { id: 1, title: 'Launch Bisnis Online', desc: 'Membuat dan meluncurkan toko online pertama', category: 'bisnis', progress: 35, deadline: '2026-07-01', milestones: ['Riset pasar','Buat website','Launch produk pertama','Marketing campaign'] },
      { id: 2, title: 'Belajar Programming', desc: 'Menguasai JavaScript dan React', category: 'skill', progress: 60, deadline: '2026-06-15', milestones: ['HTML/CSS dasar','JavaScript fundamentals','React basics','Build project'] },
      { id: 3, title: 'Emergency Fund 10 Juta', desc: 'Menabung dana darurat Rp 10 juta', category: 'finansial', progress: 70, deadline: '2026-08-01', milestones: ['Buat budget','Mulai nabung rutin','Cari side income','Target tercapai'] }
    ];

    const resources = [
      { title: 'Business Model Canvas', desc: 'Framework untuk merancang model bisnis yang solid', icon: '📋', category: 'Bisnis', color: 'brand' },
      { title: 'SMART Goals Framework', desc: 'Cara membuat goals yang Specific, Measurable, Achievable', icon: '🎯', category: 'Produktivitas', color: 'green' },
      { title: 'The Eisenhower Matrix', desc: 'Prioritaskan tugas berdasarkan urgensi dan kepentingan', icon: '⚡', category: 'Produktivitas', color: 'amber' },
      { title: 'Personal Finance 101', desc: 'Dasar-dasar mengelola keuangan pribadi', icon: '💰', category: 'Finansial', color: 'emerald' },
      { title: 'Growth Mindset Guide', desc: 'Mengembangkan pola pikir untuk pertumbuhan', icon: '🧠', category: 'Personal', color: 'purple' },
      { title: 'Networking Strategy', desc: 'Cara membangun koneksi profesional yang bermakna', icon: '🤝', category: 'Karir', color: 'cyan' },
      { title: 'MVP Development Guide', desc: 'Panduan membuat Minimum Viable Product', icon: '🚀', category: 'Tech', color: 'rose' },
      { title: 'Content Marketing 101', desc: 'Strategi konten untuk membangun audiens', icon: '📝', category: 'Marketing', color: 'orange' },
      { title: 'Time Blocking Method', desc: 'Teknik manajemen waktu yang terbukti efektif', icon: '⏰', category: 'Produktivitas', color: 'indigo' }
    ];

    const dailyInsights = [
      { icon: '💡', title: 'Focus on Your Top Priority', desc: 'Berdasarkan goal "Launch Bisnis Online", hari ini fokuskan 2 jam untuk riset kompetitor. Mulai dari 3 kompetitor terdekat di niche kamu.', time: 'Hari ini', type: 'action' },
      { icon: '📊', title: 'Progress Update', desc: 'Goal "Belajar Programming" sudah 60% selesai! Kamu on track. Lanjutkan dengan React basics minggu ini.', time: '2 jam lalu', type: 'progress' },
      { icon: '🔥', title: 'Motivational Insight', desc: '"Setiap ahli dulunya pemula. Konsistensi mengalahkan bakat yang tidak disiplin." — Terus lanjutkan langkahmu!', time: '5 jam lalu', type: 'motivation' },
      { icon: '💰', title: 'Financial Tip', desc: 'Emergency fund kamu sudah 70%! Coba alokasikan tambahan 5% dari income bulan ini untuk percepat target.', time: 'Kemarin', type: 'tip' },
      { icon: '🎯', title: 'Weekly Review', desc: 'Minggu ini kamu menyelesaikan 4 dari 5 target harian. Tingkatkan konsistensi dan kamu akan mencapai goal 2x lebih cepat.', time: '2 hari lalu', type: 'review' }
    ];

    // ======= TAB SWITCHING =======
    function switchTab(tab) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.getElementById('tab-' + tab).classList.remove('hidden');
      document.querySelectorAll('.sidebar-link').forEach(el => el.classList.remove('active'));
      document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
      const titles = { analyzer:'AI Strategic Analyzer', goals:'Goal Tracker', roadmap:'Roadmap Builder', resources:'Resource Library', insights:'Daily Insights' };
      document.getElementById('page-title').textContent = titles[tab] || 'SparkMind';
      if(tab === 'goals') renderGoals();
      if(tab === 'roadmap') renderRoadmap();
      if(tab === 'resources') renderResources();
      if(tab === 'insights') renderInsights();
    }

    // ======= AI ANALYZER =======
    function useExample(text) {
      document.getElementById('user-input').value = text;
      sendMessage();
    }

    function sendMessage() {
      const input = document.getElementById('user-input');
      const text = input.value.trim();
      if (!text) return;
      input.value = '';

      // Add user message
      const chatBox = document.getElementById('chat-messages');
      chatBox.innerHTML += \`
        <div class="message-in flex justify-end">
          <div class="bg-brand-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-2xl">
            <p class="text-sm">\${escapeHtml(text)}</p>
          </div>
        </div>
      \`;

      // Show typing indicator
      const typingId = 'typing-' + Date.now();
      chatBox.innerHTML += \`
        <div id="\${typingId}" class="message-in flex space-x-3">
          <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
            <i class="fas fa-brain text-white text-sm"></i>
          </div>
          <div class="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            </div>
          </div>
        </div>
      \`;
      chatBox.scrollTop = chatBox.scrollHeight;

      // Call API
      fetch('/api/analyze', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: text }) })
        .then(r => r.json())
        .then(data => {
          document.getElementById(typingId).remove();
          chatBox.innerHTML += \`
            <div class="message-in flex space-x-3">
              <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-brain text-white text-sm"></i>
              </div>
              <div class="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-5 max-w-2xl shadow-sm">
                <div class="text-sm text-gray-800 leading-relaxed">\${data.response}</div>
              </div>
            </div>
          \`;
          chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(() => {
          document.getElementById(typingId).remove();
          chatBox.innerHTML += \`
            <div class="message-in flex space-x-3">
              <div class="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-exclamation text-red-500 text-sm"></i>
              </div>
              <div class="bg-red-50 border border-red-100 rounded-2xl rounded-tl-sm p-5 max-w-2xl">
                <p class="text-sm text-red-600">Maaf, terjadi error. Coba lagi ya!</p>
              </div>
            </div>
          \`;
          chatBox.scrollTop = chatBox.scrollHeight;
        });
    }

    // ======= GOALS =======
    function showAddGoal() { document.getElementById('add-goal-form').classList.remove('hidden'); }
    function hideAddGoal() { document.getElementById('add-goal-form').classList.add('hidden'); }

    function addGoal() {
      const title = document.getElementById('goal-title').value.trim();
      const desc = document.getElementById('goal-desc').value.trim();
      const category = document.getElementById('goal-category').value;
      const deadline = document.getElementById('goal-deadline').value;
      if (!title) return alert('Nama goal harus diisi!');

      goals.push({ id: Date.now(), title, desc, category, progress: 0, deadline: deadline || 'TBD', milestones: [] });
      document.getElementById('goal-title').value = '';
      document.getElementById('goal-desc').value = '';
      hideAddGoal();
      renderGoals();
    }

    function updateProgress(id, delta) {
      const goal = goals.find(g => g.id === id);
      if (goal) { goal.progress = Math.max(0, Math.min(100, goal.progress + delta)); renderGoals(); }
    }

    function deleteGoal(id) {
      if (confirm('Hapus goal ini?')) { goals = goals.filter(g => g.id !== id); renderGoals(); }
    }

    function renderGoals() {
      const list = document.getElementById('goals-list');
      if (goals.length === 0) {
        list.innerHTML = '<div class="text-center py-16"><i class="fas fa-bullseye text-4xl text-gray-300 mb-4"></i><p class="text-gray-400">Belum ada goals. Mulai tambahkan goal pertamamu!</p></div>';
        return;
      }
      const categoryIcons = { bisnis:'💼', karir:'📈', skill:'💻', personal:'🧘', finansial:'💰' };
      list.innerHTML = goals.map(g => \`
        <div class="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <span class="text-2xl">\${categoryIcons[g.category] || '🎯'}</span>
              <div>
                <h3 class="font-bold text-gray-900">\${escapeHtml(g.title)}</h3>
                <p class="text-gray-500 text-xs">\${escapeHtml(g.desc)}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-400"><i class="fas fa-calendar mr-1"></i>\${g.deadline}</span>
              <button onclick="deleteGoal(\${g.id})" class="text-gray-300 hover:text-red-500 transition"><i class="fas fa-trash text-sm"></i></button>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex-1">
              <div class="w-full bg-gray-100 rounded-full h-3">
                <div class="bg-brand-600 h-3 rounded-full goal-progress" style="width:\${g.progress}%"></div>
              </div>
            </div>
            <span class="text-sm font-bold text-brand-600 min-w-[40px] text-right">\${g.progress}%</span>
            <div class="flex space-x-1">
              <button onclick="updateProgress(\${g.id},-10)" class="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition"><i class="fas fa-minus text-xs text-gray-500"></i></button>
              <button onclick="updateProgress(\${g.id},10)" class="w-7 h-7 bg-brand-100 hover:bg-brand-200 rounded-lg flex items-center justify-center transition"><i class="fas fa-plus text-xs text-brand-600"></i></button>
            </div>
          </div>
          \${g.milestones.length ? \`
            <div class="mt-4 flex flex-wrap gap-2">
              \${g.milestones.map((m, i) => \`
                <span class="text-xs px-3 py-1 rounded-full \${i < Math.ceil(g.progress / (100/g.milestones.length)) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">
                  \${i < Math.ceil(g.progress / (100/g.milestones.length)) ? '✅' : '⬜'} \${m}
                </span>
              \`).join('')}
            </div>
          \` : ''}
        </div>
      \`).join('');
    }

    // ======= ROADMAP =======
    function renderRoadmap() {
      const container = document.getElementById('roadmap-items');
      if (goals.length === 0) {
        container.innerHTML = '<div class="text-center py-16 pl-12"><p class="text-gray-400">Tambahkan goals dulu untuk melihat roadmap.</p></div>';
        return;
      }
      container.innerHTML = goals.map((g, i) => {
        const colors = ['brand','green','amber','purple','cyan'];
        const c = colors[i % colors.length];
        return \`
          <div class="relative pl-16">
            <div class="absolute left-4 top-1 w-5 h-5 bg-\${c}-500 rounded-full border-4 border-white shadow"></div>
            <div class="bg-white border border-gray-200 rounded-2xl p-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-bold text-gray-900">\${escapeHtml(g.title)}</h3>
                <span class="text-xs bg-\${c}-100 text-\${c}-700 px-3 py-1 rounded-full font-medium">\${g.progress}% Complete</span>
              </div>
              <p class="text-gray-500 text-sm mb-3">\${escapeHtml(g.desc)}</p>
              <div class="w-full bg-gray-100 rounded-full h-2 mb-3">
                <div class="bg-\${c}-500 h-2 rounded-full goal-progress" style="width:\${g.progress}%"></div>
              </div>
              <div class="flex items-center space-x-4 text-xs text-gray-400">
                <span><i class="fas fa-calendar mr-1"></i>Deadline: \${g.deadline}</span>
                <span><i class="fas fa-flag mr-1"></i>\${g.milestones.length} Milestones</span>
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    // ======= RESOURCES =======
    function renderResources() {
      document.getElementById('resources-grid').innerHTML = resources.map(r => \`
        <div class="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition cursor-pointer">
          <span class="text-3xl mb-3 block">\${r.icon}</span>
          <span class="text-xs bg-\${r.color}-100 text-\${r.color}-700 px-2 py-0.5 rounded-full font-medium">\${r.category}</span>
          <h3 class="font-bold text-gray-900 mt-2 mb-1">\${r.title}</h3>
          <p class="text-gray-500 text-xs">\${r.desc}</p>
        </div>
      \`).join('');
    }

    // ======= INSIGHTS =======
    function renderInsights() {
      const typeColors = { action:'brand', progress:'green', motivation:'amber', tip:'purple', review:'cyan' };
      document.getElementById('insights-list').innerHTML = dailyInsights.map(ins => \`
        <div class="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
          <div class="flex items-start space-x-4">
            <span class="text-2xl">\${ins.icon}</span>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <h3 class="font-bold text-gray-900 text-sm">\${ins.title}</h3>
                <span class="text-xs text-gray-400">\${ins.time}</span>
              </div>
              <p class="text-gray-600 text-sm leading-relaxed">\${ins.desc}</p>
            </div>
          </div>
        </div>
      \`).join('');
    }

    // ======= MOBILE SIDEBAR =======
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('hidden');
      document.getElementById('sidebar').classList.add('fixed','inset-y-0','left-0','z-50');
      document.getElementById('sidebar-overlay').classList.remove('hidden');
    });
    function closeSidebar() {
      document.getElementById('sidebar').classList.add('hidden');
      document.getElementById('sidebar').classList.remove('fixed','inset-y-0','left-0','z-50');
      document.getElementById('sidebar-overlay').classList.add('hidden');
    }

    // ======= UTILS =======
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Auto-resize textarea
    document.getElementById('user-input').addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 128) + 'px';
    });

    // Init
    renderGoals();
  </script>
</body>
</html>`)
})

// ============================================
// API ROUTES
// ============================================
app.post('/api/analyze', async (c) => {
  const { message } = await c.req.json()
  
  // AI Strategic Analysis engine (rule-based for now, no external API needed)
  const response = generateStrategicResponse(message)
  
  return c.json({ response, timestamp: new Date().toISOString() })
})

app.get('/api/resources', (c) => {
  return c.json({
    resources: [
      { id: 1, title: 'Business Model Canvas', category: 'Bisnis', description: 'Framework untuk merancang model bisnis' },
      { id: 2, title: 'SMART Goals', category: 'Produktivitas', description: 'Framework membuat goals yang terukur' },
      { id: 3, title: 'Eisenhower Matrix', category: 'Produktivitas', description: 'Prioritas berdasarkan urgensi & kepentingan' },
    ]
  })
})

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', service: 'SparkMind API', version: '1.0.0' })
})

// ============================================
// STRATEGIC RESPONSE ENGINE
// ============================================
function generateStrategicResponse(message: string): string {
  const lowerMsg = message.toLowerCase()
  
  // Detect topic and generate contextual strategic response
  if (lowerMsg.includes('bisnis') || lowerMsg.includes('usaha') || lowerMsg.includes('jualan') || lowerMsg.includes('online') || lowerMsg.includes('toko')) {
    return `<div>
      <p class="font-semibold text-brand-700 mb-3">🧠 Strategic Analysis: Memulai Bisnis</p>
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
        <p class="text-green-700 text-xs font-semibold mb-2">📊 DIAGNOSIS</p>
        <p class="text-gray-700 text-sm">Kamu ingin memulai bisnis — ini adalah langkah besar! Berdasarkan analisis, berikut strategi yang terstruktur:</p>
      </div>
      <div class="space-y-3">
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-600 font-bold text-xs">1</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Validasi Ide (Minggu 1-2)</p>
            <p class="text-gray-500 text-xs">Riset 3 kompetitor, identifikasi gap di pasar, dan validasi dengan 10 calon customer potensial.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-600 font-bold text-xs">2</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Buat MVP (Minggu 3-4)</p>
            <p class="text-gray-500 text-xs">Mulai dengan produk/jasa minimum. Tidak perlu sempurna — yang penting bisa ditest ke market.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-600 font-bold text-xs">3</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Launch & Market (Minggu 5-6)</p>
            <p class="text-gray-500 text-xs">Launch di social media, mulai dari circle terdekat. Gunakan content marketing untuk build trust.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-600 font-bold text-xs">4</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Iterate & Scale (Bulan 2-3)</p>
            <p class="text-gray-500 text-xs">Kumpulkan feedback, improve produk, dan mulai scaling dengan paid ads atau partnership.</p>
          </div>
        </div>
      </div>
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
        <p class="text-amber-700 text-xs font-semibold">💡 PRO TIP</p>
        <p class="text-gray-700 text-sm mt-1">Jangan tunggu sempurna. "Done is better than perfect." Mulai dengan apa yang kamu punya sekarang, improve seiring waktu.</p>
      </div>
    </div>`
  }

  if (lowerMsg.includes('produktivitas') || lowerMsg.includes('produktif') || lowerMsg.includes('kerja') || lowerMsg.includes('wfh') || lowerMsg.includes('rumah') || lowerMsg.includes('fokus')) {
    return `<div>
      <p class="font-semibold text-brand-700 mb-3">🧠 Strategic Analysis: Produktivitas</p>
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
        <p class="text-green-700 text-xs font-semibold mb-2">📊 DIAGNOSIS</p>
        <p class="text-gray-700 text-sm">Tantangan produktivitas biasanya berasal dari: kurang struktur, terlalu banyak distraksi, atau burnout. Berikut solusi strategis:</p>
      </div>
      <div class="space-y-3">
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 text-green-600 font-bold text-xs">1</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Time Blocking Method</p>
            <p class="text-gray-500 text-xs">Bagi hari menjadi blok 90 menit. Deep work di pagi hari (9-12), meeting siang, creative work sore.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 text-green-600 font-bold text-xs">2</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Environment Design</p>
            <p class="text-gray-500 text-xs">Buat workspace dedicated, matikan notifikasi HP saat deep work, pakai headphone untuk fokus.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 text-green-600 font-bold text-xs">3</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Weekly Review System</p>
            <p class="text-gray-500 text-xs">Setiap Jumat sore, review minggu ini dan plan minggu depan. Ini 1 habit yang mengubah segalanya.</p>
          </div>
        </div>
      </div>
      <div class="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-4">
        <p class="text-purple-700 text-xs font-semibold">⚡ QUICK WIN</p>
        <p class="text-gray-700 text-sm mt-1">Mulai besok pagi: kerjakan 1 tugas terpenting SEBELUM buka email/social media. Ini akan boost produktivitas 2x.</p>
      </div>
    </div>`
  }

  if (lowerMsg.includes('programming') || lowerMsg.includes('coding') || lowerMsg.includes('belajar') || lowerMsg.includes('skill') || lowerMsg.includes('roadmap') || lowerMsg.includes('developer')) {
    return `<div>
      <p class="font-semibold text-brand-700 mb-3">🧠 Strategic Analysis: Learning Roadmap</p>
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
        <p class="text-green-700 text-xs font-semibold mb-2">📊 DIAGNOSIS</p>
        <p class="text-gray-700 text-sm">Belajar skill baru butuh pendekatan terstruktur. Tanpa roadmap, kamu akan overwhelmed. Berikut panduan strategisnya:</p>
      </div>
      <div class="space-y-3">
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-600 font-bold text-xs">1</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Foundation (Bulan 1)</p>
            <p class="text-gray-500 text-xs">HTML, CSS, JavaScript dasar. Buat 3 project sederhana. Resource: freeCodeCamp, Scrimba.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-600 font-bold text-xs">2</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Framework (Bulan 2-3)</p>
            <p class="text-gray-500 text-xs">Pilih 1 framework (React recommended), buat 2 project real. Mulai belajar API integration.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-600 font-bold text-xs">3</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Portfolio (Bulan 4)</p>
            <p class="text-gray-500 text-xs">Buat portfolio website + 3 project showcase. Push ke GitHub. Mulai apply freelance atau job.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-600 font-bold text-xs">4</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Monetize (Bulan 5-6)</p>
            <p class="text-gray-500 text-xs">Freelance di Fiverr/Upwork, atau apply remote job. Target: Rp 5-10 juta/bulan dari coding.</p>
          </div>
        </div>
      </div>
      <div class="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mt-4">
        <p class="text-cyan-700 text-xs font-semibold">🎯 DAILY TARGET</p>
        <p class="text-gray-700 text-sm mt-1">Belajar minimal 2 jam/hari, coding minimal 1 jam. Konsistensi > intensitas. Dalam 6 bulan, kamu bisa generate income.</p>
      </div>
    </div>`
  }

  if (lowerMsg.includes('karir') || lowerMsg.includes('kerja') || lowerMsg.includes('jabatan') || lowerMsg.includes('gaji') || lowerMsg.includes('naik') || lowerMsg.includes('promosi')) {
    return `<div>
      <p class="font-semibold text-brand-700 mb-3">🧠 Strategic Analysis: Career Growth</p>
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
        <p class="text-green-700 text-xs font-semibold mb-2">📊 DIAGNOSIS</p>
        <p class="text-gray-700 text-sm">Career growth bukan soal kerja keras saja, tapi kerja CERDAS. Berikut framework untuk akselerasi karir:</p>
      </div>
      <div class="space-y-3">
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-600 font-bold text-xs">1</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Visibility Strategy</p>
            <p class="text-gray-500 text-xs">Bikin hasil kerjamu terlihat. Share progress di meeting, dokumentasikan achievements, bangun personal brand internal.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-600 font-bold text-xs">2</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Skill Stacking</p>
            <p class="text-gray-500 text-xs">Kombinasikan skill unik. Contoh: technical skill + communication = rare & valuable. Invest di skill yang jarang dimiliki peers.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-600 font-bold text-xs">3</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Strategic Networking</p>
            <p class="text-gray-500 text-xs">Bangun hubungan dengan decision makers. Mentor, sponsor, dan allies. 80% promosi datang dari relasi, bukan skill semata.</p>
          </div>
        </div>
      </div>
      <div class="bg-rose-50 border border-rose-200 rounded-xl p-4 mt-4">
        <p class="text-rose-700 text-xs font-semibold">🔥 ACTION ITEM</p>
        <p class="text-gray-700 text-sm mt-1">Minggu ini: Jadwalkan 1-on-1 dengan manager, tanyakan "What would it take for me to get promoted?" — pertanyaan ini menunjukkan inisiatif.</p>
      </div>
    </div>`
  }

  if (lowerMsg.includes('uang') || lowerMsg.includes('keuangan') || lowerMsg.includes('tabung') || lowerMsg.includes('investasi') || lowerMsg.includes('finansial') || lowerMsg.includes('hutang') || lowerMsg.includes('income')) {
    return `<div>
      <p class="font-semibold text-brand-700 mb-3">🧠 Strategic Analysis: Financial Strategy</p>
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
        <p class="text-green-700 text-xs font-semibold mb-2">📊 DIAGNOSIS</p>
        <p class="text-gray-700 text-sm">Financial freedom dimulai dari mindset dan sistem. Berikut blueprint keuangan strategis:</p>
      </div>
      <div class="space-y-3">
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold text-xs">1</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Track & Budget (50/30/20)</p>
            <p class="text-gray-500 text-xs">50% kebutuhan, 30% keinginan, 20% tabungan/investasi. Track semua pengeluaran minimal 30 hari.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold text-xs">2</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Emergency Fund First</p>
            <p class="text-gray-500 text-xs">Kumpulkan 3-6 bulan pengeluaran sebagai dana darurat SEBELUM investasi. Ini fondasi keamanan finansial.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <span class="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold text-xs">3</span>
          <div>
            <p class="font-semibold text-gray-900 text-sm">Multiple Income Streams</p>
            <p class="text-gray-500 text-xs">Jangan bergantung pada 1 sumber income. Bangun side income dari skill kamu: freelance, content, atau micro-business.</p>
          </div>
        </div>
      </div>
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-4">
        <p class="text-emerald-700 text-xs font-semibold">💰 QUICK START</p>
        <p class="text-gray-700 text-sm mt-1">Hari ini: Download app budgeting, input semua income & expense. Knowledge is power — kamu tidak bisa manage apa yang tidak kamu ukur.</p>
      </div>
    </div>`
  }

  // Default response for any topic
  return `<div>
    <p class="font-semibold text-brand-700 mb-3">🧠 Strategic Analysis</p>
    <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
      <p class="text-green-700 text-xs font-semibold mb-2">📊 ANALYSIS</p>
      <p class="text-gray-700 text-sm">Aku sudah menganalisis masalahmu. Berikut framework strategis yang bisa kamu terapkan:</p>
    </div>
    <div class="space-y-3">
      <div class="flex space-x-3">
        <span class="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-600 font-bold text-xs">1</span>
        <div>
          <p class="font-semibold text-gray-900 text-sm">Define the Problem Clearly</p>
          <p class="text-gray-500 text-xs">Tulis masalahmu dalam 1 kalimat. Masalah yang jelas = solusi yang jelas. Tanya: "Apa sebenarnya yang ingin aku capai?"</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <span class="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-600 font-bold text-xs">2</span>
        <div>
          <p class="font-semibold text-gray-900 text-sm">Break It Down</p>
          <p class="text-gray-500 text-xs">Pecah masalah besar jadi langkah-langkah kecil. Setiap langkah harus actionable dan bisa diselesaikan dalam 1-2 hari.</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <span class="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-600 font-bold text-xs">3</span>
        <div>
          <p class="font-semibold text-gray-900 text-sm">Take First Action NOW</p>
          <p class="text-gray-500 text-xs">Jangan overthink. Ambil 1 langkah kecil hari ini. Momentum datang dari aksi, bukan perencanaan berlebihan.</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <span class="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-600 font-bold text-xs">4</span>
        <div>
          <p class="font-semibold text-gray-900 text-sm">Review & Iterate</p>
          <p class="text-gray-500 text-xs">Setiap minggu, review progress. Apa yang works? Apa yang perlu diubah? Adaptasi adalah kunci kesuksesan.</p>
        </div>
      </div>
    </div>
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
      <p class="text-amber-700 text-xs font-semibold">💡 INSIGHT</p>
      <p class="text-gray-700 text-sm mt-1">Coba ceritakan lebih spesifik tentang masalahmu (bisnis, karir, skill, keuangan, atau personal development) dan aku akan berikan strategi yang lebih detail!</p>
    </div>
  </div>`
}

export default app
