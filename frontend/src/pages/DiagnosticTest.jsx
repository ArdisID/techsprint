import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAuth } from '../context/AuthContext'

const STEPS = [
  {
    id: 'level', title: 'Seberapa familiar kamu dengan BISINDO?',
    subtitle: 'Jujur aja, ini buat rencana belajar yang paling pas buat kamu.', type: 'single',
    options: [
      { id: 'pemula',   emoji: '🌱', label: 'Pemula Total',  desc: 'Belum pernah belajar bahasa isyarat sama sekali' },
      { id: 'dasar',    emoji: '📖', label: 'Tahu Sedikit',  desc: 'Tahu beberapa isyarat tapi belum lancar' },
      { id: 'menengah', emoji: '💪', label: 'Lumayan Bisa',  desc: 'Sudah menguasai dasar dan ingin berkembang' },
      { id: 'mahir',    emoji: '🏆', label: 'Cukup Mahir',   desc: 'Bisa berkomunikasi tapi ingin lebih fasih' },
    ]
  },
  {
    id: 'goal', title: 'Apa tujuan utama kamu belajar BISINDO?',
    subtitle: 'Pilih semua yang sesuai.', type: 'multi',
    options: [
      { id: 'komunikasi', emoji: '💬', label: 'Komunikasi Sehari-hari', desc: 'Ngobrol dengan teman Tuli' },
      { id: 'keluarga',   emoji: '👨‍👩‍👧', label: 'Keluarga',            desc: 'Ada anggota keluarga yang Tuli' },
      { id: 'kerja',      emoji: '💼', label: 'Profesional',           desc: 'Kebutuhan pekerjaan atau volunteer' },
      { id: 'hobby',      emoji: '🎯', label: 'Hobi',                  desc: 'Penasaran dan ingin belajar hal baru' },
    ]
  },
  {
    id: 'time', title: 'Berapa menit per hari kamu bisa belajar?',
    subtitle: 'Konsistensi kecil lebih baik dari sesi panjang yang jarang.', type: 'single',
    options: [
      { id: '5',  emoji: '⚡', label: '5 Menit',  desc: 'Super singkat, cocok untuk pemula sibuk' },
      { id: '15', emoji: '🌤', label: '15 Menit', desc: 'Durasi ideal untuk progres konsisten' },
      { id: '30', emoji: '🔥', label: '30 Menit', desc: 'Serius belajar dengan progres cepat' },
      { id: '60', emoji: '🚀', label: '1 Jam+',   desc: 'Mode intensif, mahir dalam waktu singkat' },
    ]
  },
  {
    id: 'challenge', title: 'Apa tantangan terbesar kamu?',
    subtitle: 'Kami sesuaikan metode belajar berdasarkan jawabanmu.', type: 'single',
    options: [
      { id: 'ingat',   emoji: '🧠', label: 'Susah Mengingat',  desc: 'Sering lupa bentuk isyarat' },
      { id: 'waktu',   emoji: '⏰', label: 'Kurang Waktu',      desc: 'Kesulitan menemukan waktu belajar' },
      { id: 'praktik', emoji: '🤲', label: 'Kurang Praktik',    desc: 'Tidak ada partner untuk berlatih' },
      { id: 'motivasi',emoji: '💡', label: 'Butuh Motivasi',   desc: 'Mudah bosan atau menyerah' },
    ]
  },
]

const RESULT_MAP = {
  pemula:   { path: '/learn',    badge: '🌱 Pemula',   color: 'from-emerald-500 to-teal-500',   label: 'Mulai dari Modul 1' },
  dasar:    { path: '/learn',    badge: '📖 Dasar',    color: 'from-blue-500 to-indigo-500',    label: 'Lanjutkan Belajar Dasar' },
  menengah: { path: '/learn',    badge: '💪 Menengah', color: 'from-violet-500 to-purple-500',  label: 'Level Menengah' },
  mahir:    { path: '/gesture',  badge: '🏆 Mahir',    color: 'from-amber-500 to-orange-500',   label: 'Langsung Latihan AI' },
}

export default function DiagnosticTest() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)

  const current = STEPS[step]
  const answer = answers[current?.id]

  const select = (id) => {
    if (current.type === 'single') {
      setAnswers(a => ({ ...a, [current.id]: id }))
    } else {
      setAnswers(a => {
        const prev = a[current.id] || []
        return { ...a, [current.id]: prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id] }
      })
    }
  }

  const isSelected = (id) => current.type === 'single' ? answer === id : (answer || []).includes(id)
  const canNext = current?.type === 'single' ? !!answer : (answer?.length > 0)

  const next = () => {
    if (step < STEPS.length - 1) { setStep(s => s + 1) }
    else {
      if (user?.id) localStorage.setItem(`diagnostic_${user.id}`, JSON.stringify({ ...answers, completedAt: Date.now() }))
      setDone(true)
    }
  }

  const result = RESULT_MAP[answers.level || 'pemula']

  if (done) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 font-sans">
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 280 }}
        className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 max-w-lg w-full text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="text-7xl mb-6">🎯</motion.div>
        <h1 className="text-3xl font-black text-white mb-2">Analisis Selesai!</h1>
        <p className="text-slate-400 mb-6">Berdasarkan jawabanmu, kami rekomendasikan:</p>
        <div className={`bg-gradient-to-br ${result.color} rounded-2xl p-5 mb-6 text-white`}>
          <div className="text-2xl font-black mb-1">{result.badge}</div>
          <p className="text-white/80 text-sm">Jalur belajar yang dipersonalisasi untukmu</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-8 text-left">
          {[
            { icon: 'solar:book-bold-duotone', label: 'Level', val: result.badge },
            { icon: 'solar:clock-circle-bold-duotone', label: 'Durasi/hari', val: (answers.time || '15') + ' menit' },
            { icon: 'solar:target-bold-duotone', label: 'Fokus', val: 'AI + Visual' },
            { icon: 'solar:shield-check-bold-duotone', label: 'Tantangan', val: answers.challenge || '-' },
          ].map((s, i) => (
            <div key={i} className="bg-slate-700/60 rounded-xl p-3 flex items-center gap-2">
              <Icon icon={s.icon} width={18} color="#58cc02" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{s.label}</p>
                <p className="text-white font-bold text-xs">{s.val}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <button onClick={() => navigate(result.path)}
            className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-black rounded-2xl transition-all shadow-[0_4px_20px_rgba(88,204,2,0.3)] flex items-center justify-center gap-2 text-sm">
            <Icon icon="solar:play-bold" width={16} /> {result.label}
          </button>
          <button onClick={() => navigate('/dashboard')}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded-2xl text-sm">
            Kembali ke Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-xs font-bold">{step + 1} / {STEPS.length}</span>
          <span className="text-primary-400 text-xs font-bold">{Math.round((step / STEPS.length) * 100)}% selesai</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <motion.div animate={{ width: `${(step / STEPS.length) * 100}%` }} transition={{ duration: 0.4 }}
            className="h-full bg-gradient-to-r from-primary-500 to-emerald-400 rounded-full" />
        </div>
      </div>
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-white mb-2">{current.title}</h2>
              <p className="text-slate-400 text-sm">{current.subtitle}</p>
            </div>
            <div className="space-y-3 mb-8">
              {current.options.map(opt => (
                <button key={opt.id} onClick={() => select(opt.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                    isSelected(opt.id) ? 'bg-primary-500/15 border-primary-500/60' : 'bg-slate-800/60 border-white/5 hover:border-white/20'
                  }`}>
                  <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${isSelected(opt.id) ? 'text-primary-300' : 'text-white'}`}>{opt.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{opt.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    isSelected(opt.id) ? 'border-primary-500 bg-primary-500' : 'border-slate-600'
                  }`}>
                    {isSelected(opt.id) && <Icon icon="solar:check-bold" width={12} color="#fff" />}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)}
                  className="px-5 py-3.5 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded-2xl transition-all flex items-center gap-2 text-sm">
                  <Icon icon="solar:arrow-left-bold" width={16} /> Kembali
                </button>
              )}
              <button onClick={next} disabled={!canNext}
                className="flex-1 py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-40 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 text-sm">
                {step === STEPS.length - 1 ? 'Lihat Hasil 🎯' : 'Lanjut'}
                <Icon icon="solar:arrow-right-bold" width={16} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
