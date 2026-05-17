import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Home, Compass, Award, User, Bell, Search, Flame, PlayCircle, Clock, LogOut, Activity, Target, Zap, Settings, ShieldCheck, ChevronRight, BookOpen, ScanFace } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import WelcomeModal from '../components/ui/WelcomeModal'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Load progress dynamically from local storage or set to 0 for new users
  const [progress, setProgress] = React.useState(0)
  const [streak, setStreak] = React.useState(0)
  const [showWelcome, setShowWelcome] = React.useState(false)

  React.useEffect(() => {
    if (user?.role === 'pengajar') {
      navigate('/pengajar', { replace: true })
      return
    }
    if (user?.id) {
      const savedProgress = localStorage.getItem(`progress_${user.id}`)
      const savedStreak = localStorage.getItem(`streak_${user.id}`)
      setProgress(savedProgress ? parseInt(savedProgress) : 0)
      setStreak(savedStreak ? parseInt(savedStreak) : 0)

      // Check if it's the first time logging in
      const hasSeenWelcome = localStorage.getItem(`hasSeenWelcome_${user.id}`)
      if (!hasSeenWelcome) {
        setShowWelcome(true)
      }
    }
  }, [user])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
    if (user?.id) {
      localStorage.setItem(`hasSeenWelcome_${user.id}`, 'true')
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  const navItems = [
    { icon: <Home />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Compass />, label: 'Belajar BISINDO', path: '/learn' },
    { icon: <Activity />, label: 'AI Practice', path: '/gesture' },
    { icon: <Target />, label: 'Kuis', path: '/quiz' },
    { icon: <Target />, label: 'Diagnostic', path: '/diagnostic' },
    { icon: <Target />, label: 'Progress', path: '/progress' },
    { icon: <Award />, label: 'Achievement', path: '/achievement' },
    { icon: <Settings />, label: 'Pengaturan', path: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans selection:bg-primary-500/30">
      <WelcomeModal 
        show={showWelcome} 
        onClose={handleCloseWelcome} 
        userName={user?.name ? user.name.split(' ')[0] : 'Sobat'} 
      />
      
      {/* Sidebar - Premium Modern */}
      <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-2xl border-r border-slate-200/50 p-6 sticky top-0 h-screen z-40">
        <Link to="/" className="flex items-center gap-3 mb-12 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_8px_16px_rgba(99,102,241,0.3)] group-hover:scale-105 transition-transform duration-300">
            <span className="font-extrabold text-xl">B</span>
          </div>
          <span className="font-extrabold text-2xl text-slate-900 tracking-tight">BISINDO<span className="text-primary-500">.AI</span></span>
        </Link>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((nav, idx) => {
            const isActive = location.pathname === nav.path
            return (
              <Link 
                key={idx} 
                to={nav.path} 
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm group relative overflow-hidden ${
                  isActive 
                    ? 'text-white shadow-[0_8px_20px_rgba(99,102,241,0.3)]' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 hover:translate-x-1'
                }`}
              >
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-500" style={{ borderRadius: '1rem' }} />
                )}
                <div className="flex items-center gap-3 relative z-10">
                  <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-500 transition-colors'}`}>
                    {React.cloneElement(nav.icon, { className: 'w-5 h-5' })}
                  </span>
                  {nav.label}
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white relative z-10 animate-pulse"></div>}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 mb-4 overflow-hidden group border border-slate-700">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 group-hover:rotate-12 transition-transform duration-700">
            <ShieldCheck className="w-24 h-24 text-white" />
          </div>
          <div className="relative z-10">
            <h4 className="font-bold text-white text-sm mb-1">Upgrade ke PRO</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">Buka akses AI tak terbatas dan sertifikat kelulusan resmi.</p>
            <Link to="/upgrade">
              <Button variant="light" size="sm" className="w-full text-xs py-2.5 font-bold text-slate-900 hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]">Upgrade Sekarang</Button>
            </Link>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors font-bold text-sm text-slate-500 hover:bg-error-50 hover:text-error-600 group"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-error-500 transition-colors" /> Keluar Akun
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 max-w-[1600px] mx-auto w-full overflow-y-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 fill-primary-600" /> Target Harian: 4/5 Materi
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight">Siap belajar hari ini, {user?.name ? user.name.split(' ')[0] : 'Alex'}? 👋</h1>
            <p className="text-slate-500 text-lg font-medium">Lanjutkan progresmu dan pertahankan streak belajar minggu ini.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-white border border-slate-200/60 rounded-full px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-3" />
              <input type="text" placeholder="Cari modul isyarat..." className="bg-transparent border-none outline-none text-sm w-56 font-medium text-slate-700 placeholder:text-slate-400" />
            </div>
            <Link to="/notifications" className="p-3 bg-white rounded-full border border-slate-200/60 text-slate-500 hover:text-primary-500 shadow-sm transition-all hover:shadow-md relative group">
              <Bell className="w-5 h-5 group-hover:animate-wiggle" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error-500 rounded-full border-2 border-white"></span>
            </Link>
            <Link to="/settings" className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-400 to-indigo-500 p-0.5 cursor-pointer hover:scale-105 transition-transform shadow-md block">
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </Link>
          </motion.div>
        </header>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
          
          {/* Quick Actions (Glassmorphism) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { title: 'Mulai Latihan AI', icon: <ScanFace />, color: 'from-primary-500 to-indigo-600', path: '/gesture', delay: 0 },
              { title: 'Lanjutkan Modul', icon: <PlayCircle />, color: 'from-emerald-500 to-teal-600', path: '/learn/1', delay: 0.1 },
              { title: 'Cek Progress', icon: <Activity />, color: 'from-amber-500 to-orange-600', path: '/progress', delay: 0.2 },
              { title: 'Daily Challenge', icon: <Target />, color: 'from-pink-500 to-rose-600', path: '/achievement', delay: 0.3 },
            ].map((action, idx) => (
              <motion.div key={idx} variants={item}>
                <Link to={action.path}>
                  <Card hover className="relative overflow-hidden group border-none bg-white p-6 h-full flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${action.color}`}></div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {React.cloneElement(action.icon, { className: 'w-6 h-6' })}
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-primary-600 transition-colors flex items-center justify-between">
                      {action.title}
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Gamification & Main Progress Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Streak Gamification */}
            <motion.div variants={item} className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-slate-900 to-[#0F172A] border border-white/10 text-white overflow-hidden relative h-full flex flex-col justify-between p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
                <div className="absolute -right-6 -top-6 opacity-20 group-hover:scale-110 transition-transform duration-700">
                  <Flame className="w-48 h-48 text-orange-500" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                    <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-orange-100">Streak Harian</span>
                  </div>
                  <div className="text-6xl font-black mb-2 flex items-baseline gap-2">
                    {streak} <span className="text-2xl font-bold text-slate-400">Hari</span>
                  </div>
                  <p className="text-sm font-medium text-slate-400 mb-8 max-w-[200px] leading-relaxed">
                    {streak > 0 
                      ? "Luar biasa! Lanjutkan belajarmu besok untuk mencapai lencana tingkat lanjut." 
                      : "Mulai belajar hari ini untuk membangun streak pertamamu!"}
                  </p>
                </div>
                
                <div className="relative z-10 flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div className={`w-full h-1.5 rounded-full ${day <= 7 ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-white/10'}`}></div>
                      <span className="text-[10px] font-bold text-slate-500">{['S', 'S', 'R', 'K', 'J', 'S', 'M'][day-1]}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Immersive Progress Card */}
            <motion.div variants={item} className="lg:col-span-2">
              <Card className="h-full flex flex-col justify-between p-8 bg-white border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group">
                <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-primary-500 mb-3 bg-primary-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5" /> Sedang Dipelajari
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Modul 1: Kata Dasar BISINDO</h3>
                    <p className="text-slate-500 font-medium">
                      {progress === 0 ? "Kamu belum memulai modul ini." : "Lanjutkan progres belajarmu di modul ini."}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">{progress}<span className="text-2xl text-slate-400">%</span></span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Premium Progress Bar */}
                  <div className="relative pt-1">
                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${progress}%` }} 
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="bg-gradient-to-r from-primary-500 to-indigo-500 h-full rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full transform -skew-x-12 translate-x-full animate-[shimmer_2s_infinite]"></div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        <img src="https://i.pravatar.cc/150?img=1" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Student" />
                        <img src="https://i.pravatar.cc/150?img=2" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Student" />
                        <img src="https://i.pravatar.cc/150?img=3" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Student" />
                      </div>
                      <span className="text-xs font-semibold text-slate-500">+1,200 murid lain sedang belajar ini</span>
                    </div>
                    <Link to="/gesture" className="w-full sm:w-auto">
                      <Button className="w-full gap-2 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.4)] group-hover:-translate-y-1 transition-all">
                        <PlayCircle className="w-5 h-5" /> Mulai AI Demo Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recommended Modules — all 6 BISINDO packages */}
          <motion.div variants={item} className="pt-4">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Paket Pembelajaran BISINDO</h2>
                <p className="text-sm font-medium text-slate-500">Pilih modul dan latih isyarat langsung dengan AI real-time.</p>
              </div>
              <Link to="/learn" className="text-sm font-bold text-primary-500 hover:text-primary-600 flex items-center gap-1 group">
                Lihat Semua <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { id: 1, emoji: '💬', title: 'Kata Dasar BISINDO',  desc: 'Sapaan & ekspresi umum sehari-hari', time: '15 Min', signs: 5,  label: '🔥 Populer',   color: 'from-primary-500 to-indigo-600',  locked: false },
                { id: 2, emoji: '🔢', title: 'Angka 1–10',          desc: 'Sistem numerik dalam bahasa isyarat', time: '20 Min', signs: 10, label: '⭐ Direkomendasikan', color: 'from-emerald-500 to-teal-600', locked: false },
                { id: 3, emoji: '👨‍👩‍👧', title: 'Keluarga & Relasi',  desc: 'Menyebutkan anggota keluarga',      time: '25 Min', signs: 5,  label: '🆕 Baru',      color: 'from-pink-500 to-rose-600',      locked: false },
                { id: 4, emoji: '🕐', title: 'Waktu & Hari',        desc: 'Keterangan waktu, jam, dan hari',    time: '30 Min', signs: 5,  label: '🔒 Lanjutan',  color: 'from-amber-500 to-orange-600',   locked: false },
                { id: 5, emoji: '😊', title: 'Emosi & Perasaan',    desc: 'Mengekspresikan apa yang dirasakan', time: '15 Min', signs: 5,  label: '💜 Favorit',   color: 'from-violet-500 to-purple-600',  locked: false },
                { id: 6, emoji: '❓', title: 'Tanya Jawab',          desc: 'Belajar 5W+1H dalam bahasa isyarat', time: '40 Min', signs: 6,  label: '🎓 Pro',       color: 'from-cyan-500 to-sky-600',       locked: false },
              ].map((module, idx) => (
                <motion.div key={module.id} variants={item}>
                  <Link to={`/gesture?module=${module.id - 1}`} className="block group">
                    <Card hover className="p-0 overflow-hidden border border-slate-200/60 bg-white cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full">
                      {/* Header gradient */}
                      <div className={`h-28 bg-gradient-to-br ${module.color} relative overflow-hidden flex items-center justify-center`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <span className="text-5xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{module.emoji}</span>
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                            {module.label}
                          </span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                            <PlayCircle className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-base text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">{module.title}</h3>
                        <p className="text-slate-500 text-xs mb-4 flex-1 leading-relaxed">{module.desc}</p>
                        <div className="flex items-center gap-4 border-t border-slate-100 pt-3">
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> {module.time}
                          </div>
                          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                            <BookOpen className="w-3.5 h-3.5 text-slate-400" /> {module.signs} Isyarat
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>


        </motion.div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200/60 flex justify-around p-2 pb-safe z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <MobileNavItem icon={<Home />} label="Home" path="/dashboard" active={location.pathname === '/dashboard'} />
        <MobileNavItem icon={<Compass />} label="Katalog" path="/learn" active={location.pathname === '/learn'} />
        <MobileNavItem icon={<ScanFace />} label="AI" path="/gesture" active={location.pathname === '/gesture'} isPrimary />
        <MobileNavItem icon={<Award />} label="Target" path="/achievement" active={location.pathname === '/achievement'} />
        <MobileNavItem icon={<User />} label="Profil" path="/settings" active={location.pathname === '/settings'} />
      </div>
    </div>
  )
}

function MobileNavItem({ icon, label, path, active, isPrimary }) {
  if (isPrimary) {
    return (
      <Link to={path} className="relative -top-6 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(99,102,241,0.4)] border-4 border-[#F8FAFC]">
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
        <span className="text-[10px] font-bold text-slate-600 mt-1">{label}</span>
      </Link>
    )
  }

  return (
    <Link to={path} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
      active ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'
    }`}>
      {React.cloneElement(icon, { className: `w-6 h-6 mb-1 ${active && 'fill-primary-50'}` })}
      <span className={`text-[10px] font-bold ${active ? 'text-primary-600' : 'text-slate-500'}`}>{label}</span>
    </Link>
  )
}
