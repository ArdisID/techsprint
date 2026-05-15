import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Target, Activity, Clock, Zap, TrendingUp, Filter } from 'lucide-react'
import Card from '../components/ui/Card'
import { useAuth } from '../context/AuthContext'

export default function Progress() {
  const { user } = useAuth()
  
  const [metrics, setMetrics] = React.useState({
    accuracy: 0,
    timeHours: 0,
    timeMins: 0,
    lessons: 0,
    aiSessions: 0,
    history: [0, 0, 0, 0, 0, 0, 0] // Weekly activity
  })

  React.useEffect(() => {
    if (user?.id) {
      const savedAccuracy = localStorage.getItem(`accuracy_${user.id}`)
      if (savedAccuracy) {
        setMetrics({
          accuracy: parseInt(savedAccuracy),
          timeHours: 12,
          timeMins: 45,
          lessons: 34,
          aiSessions: 128,
          history: [40, 70, 45, 90, 65, 80, 100]
        })
      } else {
        // Defaults to 0 for brand new users
        setMetrics({
          accuracy: 0,
          timeHours: 0,
          timeMins: 0,
          lessons: 0,
          aiSessions: 0,
          history: [0, 0, 0, 0, 0, 0, 0]
        })
      }
    }
  }, [user])
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 lg:p-16 max-w-[1400px] mx-auto">
      <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors mb-8 group font-medium">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">Analitik <span className="text-primary-500">Progres</span></h1>
          <p className="text-lg text-slate-500">Pantau perkembangan belajarmu secara mendetail.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Bulan Ini
          </button>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div variants={item}>
            <Card hover className="border-none bg-gradient-to-br from-primary-500 to-indigo-600 text-white p-6 relative overflow-hidden shadow-[0_10px_30px_rgba(99,102,241,0.2)]">
              <div className="absolute -right-4 -top-4 opacity-20">
                <Target className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="font-bold uppercase tracking-wider text-xs">Akurasi Rata-rata</span>
                </div>
                <div className="flex items-end gap-3">
                  <h3 className="text-4xl font-black">{metrics.accuracy}<span className="text-2xl">%</span></h3>
                  {metrics.accuracy > 0 && (
                    <span className="text-primary-100 text-sm font-bold bg-white/10 px-2 py-1 rounded mb-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +4%
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card hover className="p-6 shadow-sm border border-slate-200/60 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-500">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-500 uppercase tracking-wider text-xs">Waktu Belajar</span>
              </div>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-black text-slate-900">{metrics.timeHours}<span className="text-xl text-slate-500 font-bold">j</span> {metrics.timeMins}<span className="text-xl text-slate-500 font-bold">m</span></h3>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card hover className="p-6 shadow-sm border border-slate-200/60 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-500 uppercase tracking-wider text-xs">Materi Selesai</span>
              </div>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-black text-slate-900">{metrics.lessons}</h3>
                <span className="text-slate-500 text-sm font-bold mb-1">Pelajaran</span>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card hover className="p-6 shadow-sm border border-slate-200/60 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-500 uppercase tracking-wider text-xs">Sesi Latihan AI</span>
              </div>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-black text-slate-900">{metrics.aiSessions}</h3>
                <span className="text-slate-500 text-sm font-bold mb-1">Deteksi Sukses</span>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row Placeholder (Using UI blocks) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <Card className="p-8 border border-slate-200/60 shadow-sm h-[400px] flex flex-col">
              <h3 className="font-bold text-xl text-slate-900 mb-6">Akurasi per Gestur AI</h3>
              
              <div className="flex-1 flex flex-col justify-end gap-4">
                {[
                  { name: 'Halo', val: metrics.accuracy > 0 ? 98 : 0, color: 'bg-primary-500' },
                  { name: 'I Love You', val: metrics.accuracy > 0 ? 85 : 0, color: 'bg-indigo-500' },
                  { name: 'Terima Kasih', val: metrics.accuracy > 0 ? 92 : 0, color: 'bg-cyan-500' },
                  { name: 'Maaf', val: metrics.accuracy > 0 ? 78 : 0, color: 'bg-amber-500' },
                  { name: 'Tolong', val: metrics.accuracy > 0 ? 88 : 0, color: 'bg-emerald-500' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-24 text-sm font-bold text-slate-600 truncate">{stat.name}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${stat.val}%` }} transition={{ duration: 1, delay: i * 0.1 }} className={`h-full rounded-full ${stat.color}`}></motion.div>
                    </div>
                    <span className="w-10 text-right text-sm font-bold text-slate-900">{stat.val}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="p-8 border border-slate-200/60 shadow-sm h-[400px] flex flex-col">
              <h3 className="font-bold text-xl text-slate-900 mb-6">Aktivitas Mingguan</h3>
              <div className="flex-1 flex items-end justify-between gap-2 pt-10">
                {metrics.history.map((height, i) => (
                  <div key={i} className="w-full flex flex-col items-center gap-3">
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: `${height}%` }} 
                      transition={{ duration: 1, type: "spring" }}
                      className="w-full bg-slate-200 hover:bg-primary-500 transition-colors rounded-t-lg relative group cursor-pointer"
                    >
                      {height > 0 && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {height}m
                        </div>
                      )}
                    </motion.div>
                    <span className="text-xs font-bold text-slate-400">{['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

      </motion.div>
    </div>
  )
}
