import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, Pause, ChevronRight, CheckCircle2, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function LearningDetail() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)

  const handleAnswer = (idx) => {
    setSelectedAnswer(idx)
    // Mock validation: index 1 is correct
    setIsCorrect(idx === 1)
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <p className="text-xs font-semibold text-primary-500">Modul 2 • Pelajaran 1</p>
              <h1 className="text-lg font-bold text-slate-900">Huruf A, B, dan C</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-slate-500 mr-2">1/5</div>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 w-1/5"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        <AnimatePresence mode="wait">
          {!showQuiz ? (
            <motion.div 
              key="learning"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Video Player Area */}
              <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" 
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-60'}`} 
                  alt="Sign language demonstration" 
                />
                
                {/* Overlay controls */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary-500 hover:scale-110 transition-transform shadow-xl"
                    >
                      <Play className="w-8 h-8 ml-1" />
                    </button>
                  </div>
                )}
                
                {isPlaying && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl">
                    <button onClick={() => setIsPlaying(false)} className="text-white hover:text-primary-400">
                      <Pause className="w-6 h-6" />
                    </button>
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden cursor-pointer">
                      <div className="h-full bg-primary-500 w-1/3 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <span className="text-white text-xs font-medium">0:15 / 0:45</span>
                  </div>
                )}
              </div>

              {/* Lesson Content */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Mengenal Huruf A</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Untuk membentuk huruf A dalam BISINDO, kepalkan tangan Anda. Biarkan ibu jari berada di sisi telunjuk, menghadap lurus ke depan. Pastikan buku-buku jari menghadap ke orang yang Anda ajak bicara.
                </p>
                
                <div className="flex gap-4 mb-8 overflow-x-auto pb-4 snap-x">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="min-w-[120px] rounded-2xl border-2 border-slate-100 p-2 snap-center">
                      <div className="aspect-square bg-slate-100 rounded-xl mb-2 flex items-center justify-center text-slate-400">
                        {/* Placeholder for angle views */}
                        <span className="text-xs font-medium">Sudut {i}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                  <Link to="/gesture">
                    <Button variant="outline" className="gap-2">
                      <ScanFace className="w-4 h-4" /> Coba dengan Kamera
                    </Button>
                  </Link>
                  <Button onClick={() => setShowQuiz(true)} className="gap-2 group">
                    Lanjut Quiz <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl mx-auto space-y-6 mt-10"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Uji Pemahaman</h2>
                <p className="text-slate-600">Manakah gambar yang menunjukkan isyarat huruf "B"?</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((idx) => {
                  const isSelected = selectedAnswer === idx
                  let borderClass = 'border-slate-200 hover:border-primary-500 hover:bg-primary-50'
                  let icon = null

                  if (isSelected) {
                    if (isCorrect) {
                      borderClass = 'border-success bg-success/10 ring-4 ring-success/20'
                      icon = <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-success" />
                    } else {
                      borderClass = 'border-error bg-error/10 ring-4 ring-error/20'
                      icon = <XCircle className="absolute top-4 right-4 w-6 h-6 text-error" />
                    }
                  } else if (selectedAnswer !== null && idx === 1) {
                    // Show correct answer if user picked wrong
                    borderClass = 'border-success bg-success/5'
                    icon = <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-success opacity-50" />
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => selectedAnswer === null && handleAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`relative aspect-square rounded-3xl border-2 transition-all duration-300 p-2 overflow-hidden ${borderClass} ${selectedAnswer !== null && !isSelected && idx !== 1 ? 'opacity-50' : ''}`}
                    >
                      <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-2xl">
                        {/* Placeholder for hand sign image */}
                        Option {idx + 1}
                      </div>
                      {icon}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-2xl mt-8 flex items-center justify-between ${isCorrect ? 'bg-success/10 text-success-800' : 'bg-error/10 text-error-800'}`}
                  >
                    <div>
                      <h4 className="font-bold text-lg mb-1">{isCorrect ? 'Tepat Sekali!' : 'Kurang Tepat'}</h4>
                      <p className="text-sm opacity-80">
                        {isCorrect ? 'Isyarat huruf B ditunjukkan dengan telapak tangan terbuka dan jari rapat.' : 'Ingat, huruf B menggunakan seluruh jari yang terbuka ke atas.'}
                      </p>
                    </div>
                    <Link to="/dashboard">
                      <Button variant="primary" className={isCorrect ? 'bg-success hover:bg-success-600' : 'bg-error hover:bg-error-600'}>
                        Selesai
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function ScanFace(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
      <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
      <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
      <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
      <path d="M9 9h.01"></path>
      <path d="M15 9h.01"></path>
    </svg>
  )
}
