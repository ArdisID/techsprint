import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Trophy, Medal, Star, Flame, Zap, Shield, Crown, Target } from 'lucide-react'
import Card from '../components/ui/Card'
import { useAuth } from '../context/AuthContext'

export default function Achievement() {
  const { user } = useAuth()

  const [stats, setStats] = React.useState({
    xp: "0",
    level: 1,
    title: 'Pemula Baru',
    unlockedBadges: 0
  })

  React.useEffect(() => {
    if (user?.id) {
      const savedXp = localStorage.getItem(`xp_${user.id}`)
      if (savedXp) {
        setStats({
          xp: "4,250",
          level: 12,
          title: 'Pemula Ambisius',
          unlockedBadges: 3
        })
      } else {
        setStats({
          xp: "0",
          level: 1,
          title: 'Pemula Baru',
          unlockedBadges: 0
        })
      }
    }
  }, [user])

  const badges = [
    {
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      name: 'Pembelajar Aktif',
      desc: 'Belajar 7 hari berturut-turut',
      unlocked: stats.unlockedBadges >= 1,
      color: stats.unlockedBadges >= 1 ? 'from-orange-100 to-red-100 border-orange-200' : 'bg-slate-100 border-slate-200 opacity-50 grayscale'
    },
    {
      icon: <Target className="w-8 h-8 text-primary-500" />,
      name: 'Mata Elang',
      desc: 'Mendapat skor AI >95%',
      unlocked: stats.unlockedBadges >= 2,
      color: stats.unlockedBadges >= 2 ? 'from-primary-100 to-indigo-100 border-primary-200' : 'bg-slate-100 border-slate-200 opacity-50 grayscale'
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      name: 'Kilat',
      desc: 'Menyelesaikan modul < 5 menit',
      unlocked: stats.unlockedBadges >= 3,
      color: stats.unlockedBadges >= 3 ? 'from-amber-100 to-yellow-100 border-amber-200' : 'bg-slate-100 border-slate-200 opacity-50 grayscale'
    },
    {
      icon: <Shield className="w-8 h-8 text-slate-400" />,
      name: 'Konsisten',
      desc: 'Menyelesaikan 10 modul',
      unlocked: false,
      color: 'bg-slate-100 border-slate-200 opacity-50 grayscale'
    },
    {
      icon: <Crown className="w-8 h-8 text-slate-400" />,
      name: 'Master BISINDO',
      desc: 'Mendapat nilai sempurna di ujian',
      unlocked: false,
      color: 'bg-slate-100 border-slate-200 opacity-50 grayscale'
    },
    {
      icon: <Medal className="w-8 h-8 text-slate-400" />,
      name: 'Sosial',
      desc: 'Selesaikan modul Sapaan',
      unlocked: false,
      color: 'bg-slate-100 border-slate-200 opacity-50 grayscale'
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 lg:p-16 max-w-5xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors mb-8 group font-medium">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Dashboard
      </Link>

      {/* Hero Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-gradient-to-br from-primary-900 to-indigo-900 rounded-[2.5rem] p-10 overflow-hidden mb-12 shadow-2xl shadow-primary-900/20">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 transform scale-150">
          <Trophy className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-300 to-orange-500 p-1 shadow-[0_0_40px_rgba(245,158,11,0.4)]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name || 'bisindo'}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white/90 text-sm font-bold tracking-wide mb-3 border border-white/10">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" /> Level {stats.level}: {stats.title}
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2">{user?.name || 'Pelajar Baru'}</h1>
            <p className="text-primary-200 text-lg mb-6">
              {stats.xp === "0" ? "Selesaikan pelajaran pertamamu untuk mulai!" : "Kamu berada di top 15% pelajar bulan ini!"}
            </p>

            <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10 flex gap-8">
              <div>
                <p className="text-primary-200 text-xs font-bold uppercase tracking-wider mb-1">Total XP</p>
                <p className="text-3xl font-black text-white">{stats.xp}</p>
              </div>
              <div className="w-px bg-white/10"></div>
              <div>
                <p className="text-primary-200 text-xs font-bold uppercase tracking-wider mb-1">Badges</p>
                <p className="text-3xl font-black text-white">{stats.unlockedBadges}<span className="text-lg text-primary-300 font-medium">/12</span></p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Badges Grid */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Koleksi Lencana</h2>
          <p className="text-slate-500">Selesaikan misi untuk membuka lencana eksklusif.</p>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge, idx) => (
          <motion.div key={idx} variants={item}>
            <Card hover className={`border-2 ${badge.color} h-full flex flex-col items-center text-center p-8 transition-all duration-300 ${badge.unlocked ? 'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]' : ''}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-inner ${badge.unlocked ? 'bg-white' : 'bg-slate-200'}`}>
                {badge.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${badge.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>{badge.name}</h3>
              <p className={`text-sm ${badge.unlocked ? 'text-slate-600' : 'text-slate-400'}`}>{badge.desc}</p>

              {!badge.unlocked && (
                <div className="mt-4 px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-400 border border-slate-200">
                  Terkunci
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
