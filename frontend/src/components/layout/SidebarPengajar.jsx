import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { icon: 'solar:home-2-bold-duotone',              label: 'Beranda',       path: '/pengajar' },
  { icon: 'solar:upload-bold-duotone',              label: 'Upload Materi', path: '/pengajar/materi' },
  { icon: 'solar:chart-2-bold-duotone',             label: 'Statistik',     path: '/pengajar/statistik' },
  { icon: 'solar:settings-bold-duotone',            label: 'Pengaturan',    path: '/settings' },
]

export default function SidebarPengajar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => { await logout(); navigate('/login') }

  return (
    <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-2xl border-r border-slate-200/50 p-6 sticky top-0 h-screen z-40 flex-shrink-0">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 mb-10 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center shadow-[0_8px_16px_rgba(88,204,2,0.3)] group-hover:scale-105 transition-transform">
          <Icon icon="solar:hand-shake-bold-duotone" width={20} color="#fff" />
        </div>
        <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
          BISINDO<span className="text-primary-500">.AI</span>
        </span>
      </Link>

      {/* Role Badge */}
      <div className="flex items-center gap-2 mb-8 px-3 py-1.5 bg-primary-50 border border-primary-100 rounded-full w-fit">
        <Icon icon="solar:medal-ribbons-star-bold-duotone" width={14} color="#46a302" />
        <span className="text-xs font-bold text-primary-600">Mode Pengajar</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1.5">
        {NAV.map((nav) => {
          const isActive = location.pathname === nav.path
          return (
            <Link key={nav.path} to={nav.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-bold text-sm relative overflow-hidden ${
                isActive
                  ? 'text-white shadow-[0_6px_16px_rgba(88,204,2,0.28)]'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 hover:translate-x-1'
              }`}>
              {isActive && (
                <motion.div
                  layoutId="activeNavPengajar"
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-emerald-400"
                  style={{ borderRadius: '1rem' }}
                />
              )}
              <Icon icon={nav.icon} width={20} color={isActive ? '#fff' : '#9ca3af'} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10">{nav.label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white relative z-10 ml-auto animate-pulse" />}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <img
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name}`}
            className="w-9 h-9 rounded-full border-2 border-primary-100"
            alt="Avatar"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{user?.name ?? 'Pengajar'}</p>
            <p className="text-xs text-slate-400">Pengajar</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-4 py-2.5 w-full rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors font-bold text-sm"
        >
          <Icon icon="solar:logout-2-bold-duotone" width={18} /> Keluar Akun
        </button>
      </div>
    </aside>
  )
}
