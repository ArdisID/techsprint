import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, CheckCircle2, ScanFace, Sparkles, Target, Zap, Trophy, Users, Shield, BookOpen, Quote, ChevronRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Button from '../components/ui/Button'
import LiveDemoDetector from '../components/ai/LiveDemoDetector'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

export default function Landing() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-primary-500 selection:text-white font-sans">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-32 lg:pt-52 lg:pb-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-12 min-h-[90vh]">
        {/* Soft Ambient Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob pointer-events-none"></div>
        <div className="absolute top-40 -left-20 w-[600px] h-[600px] bg-sky-100/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute -bottom-32 left-1/2 w-[500px] h-[500px] bg-indigo-100/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>

        <motion.div 
          className="flex-1 text-center lg:text-left z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium border-primary-200/50 text-slate-800 text-sm font-bold mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
            Revolusi Pembelajaran Inklusif
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-[3.5rem] lg:text-7xl xl:text-[5.5rem] font-extrabold text-slate-900 tracking-tighter leading-[1.05] mb-8">
            Belajar <span className="text-gradient">Tidak Harus</span> Mendengar.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Platform pembelajaran visual interaktif untuk teman Tuli dan Dengar. Kuasai Bahasa Isyarat Indonesia dengan <strong className="text-slate-900 font-bold">Feedback AI Real-time</strong>.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 px-8 py-4 text-lg shadow-[0_8px_30px_rgba(99,102,241,0.3)]">
                Mulai Akses Gratis <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#demo" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-white/50 backdrop-blur-md border-slate-200/60 shadow-sm px-8 py-4 text-lg text-slate-700">
                <Play className="w-5 h-5 text-primary-500 fill-primary-500/20" />
                Lihat Demo AI
              </Button>
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm font-semibold text-slate-500">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=1" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
              <img src="https://i.pravatar.cc/100?img=2" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
              <img src="https://i.pravatar.cc/100?img=3" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">5k+</div>
            </div>
            <p>Bergabung bersama <span className="text-slate-900">5000+</span> pembelajar</p>
          </motion.div>
        </motion.div>

        {/* Hero Interactive Visual */}
        <motion.div 
          className="flex-1 w-full relative z-10 lg:pl-10"
          initial={{ opacity: 0, scale: 0.95, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ perspective: 1000 }}
        >
          <div className="relative w-full aspect-square md:aspect-[4/3] max-w-[600px] mx-auto group">
            {/* Main Glass Panel */}
            <div className="absolute inset-0 glass-premium rounded-[2.5rem] overflow-hidden flex flex-col border-[1.5px] border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.06)] transform transition-transform duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
              <div className="h-14 bg-white/40 border-b border-white/50 flex items-center px-6 gap-3 backdrop-blur-md">
                <div className="flex gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-300"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-300"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-300"></div>
                </div>
                <div className="mx-auto bg-white/70 backdrop-blur-md rounded-xl px-24 py-1.5 text-xs text-slate-500 font-bold border border-white/60 shadow-sm flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-success" /> bisindo.ai
                </div>
              </div>
              <div className="flex-1 bg-slate-50/50 p-6 relative overflow-hidden">
                {/* Simulated Camera Feed */}
                <div className="w-full h-full bg-slate-900 rounded-[1.5rem] relative overflow-hidden shadow-inner border border-slate-800">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Person signing" className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000 group-hover:scale-100" />
                  
                  {/* Subtle Scan Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none"></div>
                  
                  {/* AI Detection Box */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[3px] border-success/80 rounded-3xl"
                  >
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-success rounded-full shadow-[0_0_10px_#22c55e]"></div>
                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-success rounded-full shadow-[0_0_10px_#22c55e]"></div>
                    
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: -30, opacity: 1 }}
                      transition={{ delay: 1.8, type: "spring" }}
                      className="absolute top-0 right-[-100px] glass-dark-premium px-4 py-2 rounded-xl border border-success/30 flex items-center gap-2 shadow-[0_10px_30px_rgba(34,197,94,0.2)]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="text-white font-bold tracking-wide">Huruf "A"</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Metric 1 */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-32 glass-premium p-4 pr-6 rounded-[1.5rem] flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary-500">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mb-0.5">Latency AI</p>
                <p className="text-lg font-extrabold text-slate-900">&lt; 50ms</p>
              </div>
            </motion.div>

            {/* Floating Metric 2 */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-6 bottom-24 glass-premium p-4 pr-6 rounded-[1.5rem] flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-secondary-500">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mb-0.5">Akurasi AI</p>
                <p className="text-lg font-extrabold text-slate-900">98.5%</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. PROBLEM / EMPATHY SECTION */}
      <section id="problem" className="py-32 bg-slate-950 relative overflow-hidden scroll-mt-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
              Akses Terbatas. <br/><span className="text-slate-400">Komunikasi Terputus.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium mb-16">
              Di Indonesia, jutaan Teman Tuli seringkali merasa terisolasi karena kurangnya pemahaman masyarakat terhadap Bahasa Isyarat (BISINDO). Pembelajaran tradisional lambat, kurang interaktif, dan sulit diakses.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-4xl font-black text-primary-500 mb-4">2.5M+</div>
                <h3 className="text-white font-bold text-lg mb-2">Populasi Tuli di ID</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Jutaan penduduk membutuhkan akses komunikasi yang setara di ruang publik.</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-4xl font-black text-secondary-500 mb-4">&lt; 1%</div>
                <h3 className="text-white font-bold text-lg mb-2">Bisa Bahasa Isyarat</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Sangat sedikit Teman Dengar yang memahami BISINDO, menciptakan tembok komunikasi.</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-4xl font-black text-accent-500 mb-4">0</div>
                <h3 className="text-white font-bold text-lg mb-2">Platform Interaktif</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Sebelumnya tidak ada platform AI lokal yang memberikan feedback secara real-time.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. AI DEMO EXPERIENCE (WOW FACTOR) */}
      <section id="demo" className="py-32 bg-slate-900 relative scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap className="w-4 h-4" /> Live AI Demo
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Kamera Anda Adalah Gurunya.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">BISINDO.AI menggunakan Computer Vision mutakhir untuk mendeteksi pergerakan jari dan tangan Anda dalam hitungan milidetik.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="glass-dark-premium rounded-[3rem] p-4 md:p-8 border border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.15)]">
              <LiveDemoDetector />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-32 bg-slate-50 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Proses Belajar <span className="text-primary-500">Intuitif.</span></h2>
            <p className="text-xl text-slate-500 font-medium">Tidak perlu menginstal aplikasi tambahan. Semuanya berjalan langsung di browser Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
            <div className="hidden md:block absolute top-14 left-[16%] right-[16%] h-[2px] bg-slate-200 z-0 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true, margin: "-100px" }}
              />
            </div>

            {[
              { title: "Tonton Modul", desc: "Pelajari teori dan perhatikan video peragaan gerakan isyarat dari instruktur asli.", icon: <Play className="w-7 h-7" /> },
              { title: "Latihan Kamera", desc: "Nyalakan kamera dan mulai tiru gerakan isyarat. Sistem AI akan melacak tangan Anda.", icon: <ScanFace className="w-7 h-7" /> },
              { title: "Koreksi Real-time", desc: "AI akan langsung memberitahu jika gerakan Anda sudah akurat atau perlu perbaikan.", icon: <CheckCircle2 className="w-7 h-7" /> }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-28 h-28 rounded-[2rem] bg-white shadow-soft border border-slate-200/50 flex items-center justify-center mb-8 group-hover:-translate-y-2 group-hover:shadow-soft-hover transition-all duration-500 relative">
                  <div className="absolute inset-0 bg-primary-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 shadow-sm">
                    {step.icon}
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center border-4 border-slate-50 text-sm">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">{step.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed px-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURES BENTO GRID */}
      <section id="features" className="py-32 bg-white relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Fitur <span className="text-primary-500">Premium.</span></h2>
            <p className="text-xl text-slate-500 font-medium">Dibangun dengan teknologi tinggi demi pengalaman belajar terbaik.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-200/60 hover:shadow-soft-hover transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <ScanFace className="w-96 h-96 transform translate-x-32 translate-y-32" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Real-time AI Engine</h3>
                <p className="text-lg text-slate-600 font-medium max-w-md leading-relaxed">
                  Engine AI kami berjalan di sisi client menggunakan WebGL, memastikan pemrosesan gambar instan tanpa delay dan tanpa mengirimkan video Anda ke server (100% Privat).
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200/60 hover:shadow-soft-hover transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary-100 text-secondary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">Kurikulum Adaptif</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Materi dirancang dari basic (A-Z) hingga percakapan sehari-hari.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 text-white rounded-[2rem] p-8 border border-slate-800 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">Gamifikasi Pintar</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                Kumpulkan poin, capai streak, dan buka sertifikat pencapaian.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-200/60 hover:shadow-soft-hover transition-all duration-500 group"
            >
               <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-accent-100 text-accent-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Shield className="w-7 h-7" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Aksesibilitas Tinggi</h3>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                      Antarmuka ramah disabilitas dengan kontras tinggi, navigasi bersih, dan kompatibilitas penuh di berbagai perangkat.
                    </p>
                  </div>
                  <div className="w-full md:w-64 h-48 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center p-6">
                     <div className="w-full space-y-4">
                       <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                       <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                       <div className="h-10 bg-primary-50 rounded-xl w-1/2 mt-4"></div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL / HUMAN SECTION */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Kisah Mereka.</h2>
            <p className="text-xl text-slate-500 font-medium">Bagaimana BISINDO.AI menjembatani dunia Dengar dan Tuli.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { text: "Dulu saya ragu berkomunikasi dengan pelanggan Tuli di kafe saya. Berkat AI ini, saya bisa belajar gerakan dasar dengan sangat cepat dan akurat.", name: "Budi Santoso", role: "Pemilik Kafe", img: "https://i.pravatar.cc/150?img=11" },
              { text: "Sebagai relawan Tuli, saya sangat merekomendasikan platform ini. Sistem feedback-nya luar biasa cerdas mengenali detail pergerakan jari.", name: "Siti Aisyah", role: "Aktivis Tuli", img: "https://i.pravatar.cc/150?img=5" },
              { text: "Akhirnya ada platform lokal yang fokus pada BISINDO, bukan sekadar ASL. UI-nya sangat elegan dan tidak membosankan untuk anak muda.", name: "Rizky Pratama", role: "Mahasiswa", img: "https://i.pravatar.cc/150?img=8" },
            ].map((testi, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-soft border border-slate-100 relative"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100" />
                <p className="text-slate-700 font-medium leading-relaxed mb-8 relative z-10">"{testi.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={testi.img} alt={testi.name} className="w-14 h-14 rounded-full border-2 border-slate-50" />
                  <div>
                    <h4 className="font-bold text-slate-900">{testi.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent mix-blend-screen" />
        
        {/* Cinematic glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary-500/30 blur-[100px] rounded-full"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-7xl font-extrabold text-white mb-8 tracking-tighter leading-[1.1]">
              Belajar tanpa batas <br/>dimulai dari <span className="text-secondary-400">akses yang setara.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Ayo, ciptakan ruang yang lebih inklusif. Bergabunglah hari ini dan pelajari bahasa isyarat dengan pengalaman AI terbaik.
            </p>
            <div className="flex justify-center">
              <Link to="/register">
                <Button variant="light" size="lg" className="px-10 py-5 text-lg font-bold group">
                  Mulai Belajar Sekarang <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5 text-primary-400" />
                </div>
                <span className="font-extrabold text-xl text-slate-900">BISINDO.AI</span>
              </div>
              <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
                Platform pembelajaran interaktif berbasis Computer Vision untuk mendobrak batasan komunikasi antara teman Tuli dan Dengar.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Platform</h4>
              <ul className="space-y-4 font-medium text-slate-600">
                <li><a href="#how-it-works" className="hover:text-primary-500 transition-colors">Cara Kerja</a></li>
                <li><a href="#features" className="hover:text-primary-500 transition-colors">Fitur Premium</a></li>
                <li><a href="#demo" className="hover:text-primary-500 transition-colors">Coba AI Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Lainnya</h4>
              <ul className="space-y-4 font-medium text-slate-600">
                <li><Link to="/login" className="hover:text-primary-500 transition-colors">Masuk Akun</Link></li>
                <li><Link to="/register" className="hover:text-primary-500 transition-colors">Daftar Gratis</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-medium">© 2026 TechSprint Hackathon. Dibangun dengan penuh pertimbangan untuk inklusivitas.</p>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              Made with <span className="text-red-500">❤️</span> in Indonesia
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
