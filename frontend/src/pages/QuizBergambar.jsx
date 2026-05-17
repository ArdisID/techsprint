import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAuth } from '../context/AuthContext'

const QUIZ_MODULES = [
  {
    id: 1, title: 'Kuis Kata Dasar', emoji: '💬', color: 'from-primary-500 to-emerald-500',
    questions: [
      {
        id: 'q1', question: 'Gerakan tangan ini artinya apa?',
        handShape: [1,1,1,1,1], motion: '👋 Dilambaikan', answer: 'halo',
        options: ['Halo', 'Selamat datang', 'Terima Kasih', 'Tolong'], correct: 0,
        explanation: 'Tangan terbuka dilambaikan = "Halo" dalam BISINDO.'
      },
      {
        id: 'q2', question: 'Posisi kepalan tangan di dada artinya?',
        handShape: [0,0,0,0,0], motion: '✊ Di dada', answer: 'maaf',
        options: ['Marah', 'Maaf', 'Ya', 'Tidak'], correct: 1,
        explanation: 'Kepalan di dada = "Maaf", ekspresi penyesalan.'
      },
      {
        id: 'q3', question: 'Jempol ke atas, jari lain mengepal artinya?',
        handShape: [1,0,0,0,0], motion: '👍 Tegas', answer: 'tolong',
        options: ['Bagus', 'Tolong', 'OK', 'Ya'], correct: 1,
        explanation: 'Jempol ke atas = "Tolong" dalam BISINDO.'
      },
      {
        id: 'q4', question: 'Empat jari ke atas dari arah dagu artinya?',
        handShape: [0,1,1,1,1], motion: '🤚 Dari dagu', answer: 'terimakasih',
        options: ['Halo', 'Maaf', 'Tolong', 'Terima Kasih'], correct: 3,
        explanation: 'Gerakan dari dagu ke depan = "Terima Kasih".'
      },
      {
        id: 'q5', question: 'Telunjuk + jempol ke atas artinya?',
        handShape: [1,1,0,0,0], motion: '☝️👍', answer: 'ya',
        options: ['Tidak', 'Ya', 'Tolong', 'Oke'], correct: 1,
        explanation: 'Telunjuk dan jempol ke atas = "Ya" dalam BISINDO.'
      },
    ]
  },
  {
    id: 2, title: 'Kuis Angka', emoji: '🔢', color: 'from-emerald-500 to-teal-500',
    questions: [
      {
        id: 'n1', question: 'Berapa jari yang ditampilkan?',
        handShape: [0,1,0,0,0], motion: '☝️ Satu jari', answer: 'satu',
        options: ['1', '2', '3', '4'], correct: 0,
        explanation: 'Satu telunjuk lurus = angka 1.'
      },
      {
        id: 'n2', question: 'Dua jari diangkat = angka berapa?',
        handShape: [0,1,1,0,0], motion: '✌️ Dua jari', answer: 'dua',
        options: ['2', '3', '7', '4'], correct: 0,
        explanation: 'Telunjuk + tengah lurus = angka 2.'
      },
      {
        id: 'n3', question: 'Jempol + kelingking terbuka = angka?',
        handShape: [1,0,0,0,1], motion: '🤙', answer: 'enam',
        options: ['6', '7', '5', '8'], correct: 0,
        explanation: 'Jempol + kelingking = angka 6 dalam BISINDO.'
      },
      {
        id: 'n4', question: 'Lima jari terbuka semua = angka?',
        handShape: [1,1,1,1,1], motion: '🖐', answer: 'lima',
        options: ['5', '10', '4', '6'], correct: 0,
        explanation: 'Semua jari terbuka = angka 5.'
      },
      {
        id: 'n5', question: 'Hanya kelingking saja lurus = angka?',
        handShape: [0,0,0,0,1], motion: '🤙 Kelingking', answer: 'sepuluh',
        options: ['1', '9', '10', '7'], correct: 2,
        explanation: 'Kelingking saja = angka 10 dalam BISINDO.'
      },
    ]
  },
]

function HandSVGMini({ fingers, size = 56 }) {
  const [thumb, idx, mid, ring, pinky] = fingers
  const on = '#58cc02'; const off = '#334155'
  const s = size / 80
  return (
    <svg viewBox="0 0 80 100" width={size} height={size * 1.25} fill="none">
      <rect x="18" y="55" width="44" height="32" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <rect x="8" y="50" width="13" height="22" rx="6" fill={thumb ? on : off} />
      <rect x="21" y={idx ? 18 : 38} width="11" height={idx ? 38 : 18} rx="5" fill={idx ? on : off} />
      <rect x="34" y={mid ? 12 : 38} width="11" height={mid ? 44 : 18} rx="5" fill={mid ? on : off} />
      <rect x="47" y={ring ? 16 : 38} width="10" height={ring ? 40 : 18} rx="5" fill={ring ? on : off} />
      <rect x="59" y={pinky ? 24 : 38} width="9" height={pinky ? 32 : 16} rx="5" fill={pinky ? on : off} />
    </svg>
  )
}

export default function QuizBergambar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeModule, setActiveModule] = useState(0)
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [history, setHistory] = useState([])

  const mod = QUIZ_MODULES[activeModule]
  const q = mod.questions[qIndex]
  const total = mod.questions.length

  const choose = (idx) => {
    if (showResult) return
    setSelected(idx)
    const correct = idx === q.correct
    if (correct) setScore(s => s + 10)
    else setWrongCount(w => w + 1)
    setHistory(h => [...h, { qId: q.id, correct }])
    setShowResult(true)
  }

  const next = () => {
    if (qIndex < total - 1) {
      setQIndex(i => i + 1)
      setSelected(null)
      setShowResult(false)
    } else {
      // Save quiz result
      if (user?.id) {
        const key = `quiz_score_${user.id}_mod${activeModule}`
        const prev = parseInt(localStorage.getItem(key) || '0')
        localStorage.setItem(key, Math.max(prev, score + (selected === q.correct ? 10 : 0)))
      }
      setFinished(true)
    }
  }

  const restart = () => {
    setQIndex(0); setSelected(null); setShowResult(false)
    setScore(0); setWrongCount(0); setFinished(false); setHistory([])
  }

  const switchMod = (i) => {
    setActiveModule(i); restart()
  }

  const finalScore = score + (selected === q?.correct && showResult ? 0 : 0)
  const pct = Math.round((score / (total * 10)) * 100)

  if (finished) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-xl p-10 max-w-md w-full text-center border border-slate-100">
        <div className="text-7xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '😊' : '📚'}</div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">Kuis Selesai!</h2>
        <p className="text-slate-500 mb-6">{mod.emoji} {mod.title}</p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Skor', val: score, color: 'text-primary-600', bg: 'bg-primary-50' },
            { label: 'Benar', val: history.filter(h => h.correct).length, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Salah', val: wrongCount, color: 'text-red-500', bg: 'bg-red-50' },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-4`}>
              <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-xs font-bold text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
          <motion.div animate={{ width: `${pct}%` }} transition={{ delay: 0.3, duration: 0.8 }}
            className={`h-full rounded-full ${pct >= 80 ? 'bg-primary-500' : pct >= 60 ? 'bg-amber-400' : 'bg-red-400'}`} />
        </div>
        <div className="space-y-3">
          <button onClick={restart}
            className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-black rounded-2xl text-sm">
            🔄 Ulangi Kuis
          </button>
          <button onClick={() => navigate('/learn')}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm">
            Kembali ke Katalog
          </button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-3 flex items-center justify-between">
        <Link to="/learn" className="flex items-center gap-2 text-slate-500 hover:text-primary-500 transition-colors font-bold text-sm">
          <Icon icon="solar:arrow-left-bold" width={16} /> Katalog
        </Link>
        <div className="flex items-center gap-3">
          <Icon icon="solar:star-bold-duotone" width={18} color="#f59e0b" />
          <span className="font-black text-slate-900">{score} XP</span>
        </div>
        <div className="text-xs font-bold text-slate-400">{qIndex + 1} / {total}</div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Module selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {QUIZ_MODULES.map((m, i) => (
            <button key={m.id} onClick={() => switchMod(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all flex-shrink-0 ${
                activeModule === i ? 'bg-primary-500 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300'
              }`}>
              <span>{m.emoji}</span> {m.title}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-8">
          <motion.div animate={{ width: `${((qIndex) / total) * 100}%` }} transition={{ duration: 0.4 }}
            className="h-full bg-gradient-to-r from-primary-500 to-emerald-400 rounded-full" />
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 mb-6">

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Pertanyaan {qIndex + 1}</p>
            <h2 className="text-xl font-black text-slate-900 mb-6">{q.question}</h2>

            {/* Hand visual */}
            <div className="flex flex-col items-center mb-6 p-6 bg-slate-900 rounded-2xl">
              <HandSVGMini fingers={q.handShape} size={80} />
              <p className="text-slate-400 text-xs font-bold mt-3">{q.motion}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt, i) => {
                let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-primary-300 hover:bg-primary-50/30'
                if (showResult) {
                  if (i === q.correct) style = 'bg-green-50 border-green-400 text-green-700'
                  else if (i === selected && selected !== q.correct) style = 'bg-red-50 border-red-400 text-red-600'
                  else style = 'bg-slate-50 border-slate-200 text-slate-400'
                }
                return (
                  <button key={i} onClick={() => choose(i)}
                    className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all text-left ${style} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}>
                    <span className="text-xs text-slate-400 font-bold mr-2">{String.fromCharCode(65+i)}.</span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }}
                  className={`mt-4 p-4 rounded-xl text-sm font-semibold ${selected === q.correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  <span className="font-black mr-2">{selected === q.correct ? '✅ Benar!' : '❌ Salah!'}</span>
                  {q.explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {showResult && (
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onClick={next}
            className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-black rounded-2xl transition-all shadow-[0_4px_20px_rgba(88,204,2,0.3)] flex items-center justify-center gap-2">
            {qIndex < total - 1 ? <><Icon icon="solar:arrow-right-bold" width={16} /> Soal Berikutnya</> : <><Icon icon="solar:flag-bold" width={16} /> Lihat Hasil</>}
          </motion.button>
        )}
      </div>
    </div>
  )
}
