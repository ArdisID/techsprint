import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Rocket, Star } from 'lucide-react'
import Button from './Button'

export default function WelcomeModal({ show, onClose, userName }) {
  if (!show) return null

  // Generate random particles for a "confetti" effect without needing a library
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50 + 'vw', // spread across width
    y: Math.random() * 100 - 50 + 'vh', // spread across height
    scale: Math.random() * 0.5 + 0.5,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.5
  }))

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
      >
        {/* Particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              x: p.x, 
              y: p.y, 
              scale: p.scale, 
              rotate: p.rotation 
            }}
            transition={{ duration: 2, delay: p.delay, ease: "easeOut" }}
            className="absolute"
          >
            {p.id % 3 === 0 ? <Star className="w-6 h-6 text-amber-400 fill-amber-400" /> : 
             p.id % 3 === 1 ? <div className="w-3 h-3 rounded-full bg-primary-400"></div> : 
             <div className="w-2 h-4 bg-emerald-400 rotate-45"></div>}
          </motion.div>
        ))}

        <motion.div 
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.2 }}
          className="relative max-w-lg w-full bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(99,102,241,0.5)] border border-white/20"
        >
          {/* Header Graphic */}
          <div className="h-48 bg-gradient-to-br from-primary-600 to-indigo-800 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.5, duration: 1 }}
              className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl"
            >
              <Rocket className="w-12 h-12 text-primary-500 ml-1 mb-1" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8 text-center bg-white relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full blur-md"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Akun Berhasil Dibuat
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                Selamat Datang, {userName}! 🎉
              </h2>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                Perjalananmu menguasai Bahasa Isyarat Indonesia (BISINDO) dimulai sekarang. Kami telah menyiapkan AI pendamping khusus untukmu.
              </p>
              
              <Button onClick={onClose} className="w-full text-lg py-4 shadow-[0_8px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.5)] transition-all flex justify-center group">
                Mulai Petualangan <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
