import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, PlayCircle, Lock, BookOpen, Clock, Star, CheckCircle2, Zap } from 'lucide-react'
import Card from '../components/ui/Card'
import { useAuth } from '../context/AuthContext'

const CATALOG_MODULES = [
  {
    id: 1, emoji: '💬', title: 'Kata Dasar BISINDO',
    desc: 'Pelajari kata sapaan, terima kasih, maaf, dan ekspresi umum sehari-hari.',
    time: '15 Min', signs: 5, color: 'from-primary-500 to-indigo-600',
    locked: false, xp: 75,
  },
  {
    id: 2, emoji: '🔢', title: 'Angka 1–10',
    desc: 'Sistem numerik dalam bahasa isyarat Indonesia dari angka 1 hingga 10.',
    time: '20 Min', signs: 10, color: 'from-emerald-500 to-teal-600',
    locked: false, xp: 88,
  },
  {
    id: 3, emoji: '👨‍👩‍👧', title: 'Keluarga & Relasi',
    desc: 'Menyebutkan anggota keluarga seperti ayah, ibu, kakak, adik, dan teman.',
    time: '25 Min', signs: 5, color: 'from-pink-500 to-rose-600',
    locked: false, xp: 60,
  },
  {
    id: 4, emoji: '🕐', title: 'Waktu & Hari',
    desc: 'Keterangan waktu seperti pagi, siang, malam, hari, dan minggu.',
    time: '30 Min', signs: 5, color: 'from-amber-500 to-orange-600',
    locked: false, xp: 60,
  },
  {
    id: 5, emoji: '😊', title: 'Emosi & Perasaan',
    desc: 'Mengekspresikan emosi: senang, sedih, marah, takut, dan I Love You.',
    time: '15 Min', signs: 5, color: 'from-violet-500 to-purple-600',
    locked: false, xp: 68,
  },
  {
    id: 6, emoji: '❓', title: 'Tanya Jawab',
    desc: 'Belajar pertanyaan 5W+1H: apa, siapa, di mana, kapan, tidak, ya.',
    time: '40 Min', signs: 6, color: 'from-cyan-500 to-sky-600',
    locked: false, xp: 72,
  },
]

export default function LearnCatalog() {
  const { user } = useAuth()

  // Per-user progress stored in localStorage
  const getModuleProgress = (moduleId) => {
    if (!user?.id) return 0
    const saved = localStorage.getItem(`module_progress_${user.id}_${moduleId}`)
    return saved ? parseInt(saved) : 0
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors mb-10 group font-medium">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Dashboard
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Katalog Modul <span className="text-primary-500">Belajar</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Pilih modul dan langsung latih isyarat dengan AI real-time. Semua modul tersedia untuk semua level.
        </p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Total Modul', value: '6',    icon: <BookOpen className="w-5 h-5 text-primary-500" /> },
          { label: 'Total Isyarat', value: '36',  icon: <Star className="w-5 h-5 text-amber-500" /> },
          { label: 'Rata-rata XP', value: '70',   icon: <Zap className="w-5 h-5 text-violet-500" /> },
          { label: 'AI Practice', value: '✓',     icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 flex items-center gap-4 border border-slate-200/60 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">{s.icon}</div>
            <div>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
              <p className="text-xs font-semibold text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modules grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {CATALOG_MODULES.map((mod) => {
          const progress = getModuleProgress(mod.id)
          const done = progress >= 100

          return (
            <motion.div key={mod.id} variants={item} className="h-full">
              <Link to={`/gesture?module=${mod.id - 1}`} className="block h-full group">
                <Card hover className="h-full p-0 overflow-hidden border border-slate-200/60 bg-white cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.10)] transition-all duration-500 flex flex-col">

                  {/* Gradient Header */}
                  <div className={`h-40 bg-gradient-to-br ${mod.color} relative overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <span className="text-6xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">{mod.emoji}</span>

                    {/* Modul badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        Modul {mod.id}
                      </span>
                    </div>

                    {/* Done badge */}
                    {done && (
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Play overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                        <PlayCircle className="w-7 h-7" />
                      </div>
                    </div>

                    {/* Progress bar on image */}
                    {progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                        <div className="flex justify-between text-white text-[10px] font-bold mb-1">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-white h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary-400" /> {mod.time}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-primary-400" /> {mod.signs} Isyarat</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">{mod.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">{mod.desc}</p>

                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-slate-700">{mod.xp} XP</span>
                      </div>
                      <span className="text-primary-500 font-bold flex items-center gap-1.5 text-sm group-hover:translate-x-1 transition-transform">
                        Mulai <PlayCircle className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
