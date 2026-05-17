import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAuth } from '../context/AuthContext'

const TABS = [
  { id: 'profil',        label: 'Profil',        icon: 'solar:user-circle-bold-duotone' },
  { id: 'notifikasi',   label: 'Notifikasi',    icon: 'solar:bell-bold-duotone' },
  { id: 'tampilan',     label: 'Tampilan',      icon: 'solar:palette-bold-duotone' },
  { id: 'keamanan',     label: 'Keamanan',      icon: 'solar:shield-bold-duotone' },
]

function Toggle({ active, onToggle, color = '#58cc02' }) {
  return (
    <button
      onClick={onToggle}
      className="relative flex-shrink-0 transition-all duration-300 focus:outline-none"
      style={{ width: 44, height: 24 }}
    >
      <div className="w-full h-full rounded-full transition-colors duration-300" style={{ background: active ? color : '#e2e8f0' }} />
      <motion.div
        animate={{ x: active ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
        style={{ left: 0 }}
      />
    </button>
  )
}

function InputField({ label, name, type = 'text', value, onChange, placeholder, icon }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className="text-xs font-bold text-slate-500 mb-1.5 block">{label}</label>
      <div className="relative">
        {icon && <Icon icon={icon} width={16} color="#94a3b8" className="absolute left-3.5 top-1/2 -translate-y-1/2" />}
        <input
          type={type === 'password' ? (show ? 'text' : 'password') : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all bg-white text-slate-800"
          style={{ paddingLeft: icon ? 36 : 14, paddingRight: type === 'password' ? 40 : 14 }}
        />
        {type === 'password' && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
            <Icon icon={show ? 'solar:eye-closed-bold' : 'solar:eye-bold'} width={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default function Settings() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profil')
  const [saved, setSaved] = useState(false)

  // Profile
  const [profile, setProfile] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileMsg, setProfileMsg] = useState(null)

  useEffect(() => {
    if (user) setProfile(p => ({ ...p, name: user.name ?? '', email: user.email ?? '' }))
  }, [user])

  const handleProfileChange = e => setProfile({ ...profile, [e.target.name]: e.target.value })

  const handleSaveProfile = async () => {
    setProfileLoading(true); setProfileMsg(null)
    try {
      const data = {}
      if (profile.name !== user.name) data.name = profile.name
      if (profile.email !== user.email) data.email = profile.email
      if (profile.password) { data.password = profile.password; data.password_confirmation = profile.password_confirmation }
      if (Object.keys(data).length > 0) await updateUser(data)
      setProfile(p => ({ ...p, password: '', password_confirmation: '' }))
      setProfileMsg({ type: 'success', text: 'Profil berhasil diperbarui!' })
    } catch {
      setProfileMsg({ type: 'error', text: 'Gagal menyimpan. Coba lagi.' })
    } finally { setProfileLoading(false) }
  }

  // Toggles
  const getInitial = () => {
    const saved = localStorage.getItem('bisindo_settings')
    return saved ? JSON.parse(saved) : {
      'Pengingat Belajar Harian': true,
      'Pembaruan Modul Baru': true,
      'Laporan Progres Mingguan': false,
      'Mode Gelap (Dark Mode)': false,
      'Ukuran Teks Besar': false,
      'Gunakan Animasi Berkurang (Reduce Motion)': false,
    }
  }
  const [toggles, setToggles] = useState(getInitial)

  const applySettings = (t) => {
    localStorage.setItem('bisindo_settings', JSON.stringify(t))
    document.documentElement.classList.toggle('dark-theme-filter', t['Mode Gelap (Dark Mode)'])
    document.documentElement.classList.toggle('text-large-mode', t['Ukuran Teks Besar'])
    document.documentElement.classList.toggle('reduce-motion-mode', t['Gunakan Animasi Berkurang (Reduce Motion)'])
  }

  const handleToggle = (key) => {
    const next = { ...toggles, [key]: !toggles[key] }
    setToggles(next)
    applySettings(next)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = async () => { await logout(); navigate('/login') }

  const backPath = user?.role === 'pengajar' ? '/pengajar' : '/dashboard'

  // ── Notification items ──
  const notifItems = [
    { key: 'Pengingat Belajar Harian', label: 'Pengingat Belajar Harian', desc: 'Dapatkan reminder setiap hari supaya streak tidak putus', icon: 'solar:bell-bing-bold-duotone', color: '#ffc800' },
    { key: 'Pembaruan Modul Baru',     label: 'Modul Baru Tersedia',       desc: 'Notifikasi saat ada materi atau modul baru ditambahkan', icon: 'solar:book-bold-duotone',     color: '#1cb0f6' },
    { key: 'Laporan Progres Mingguan', label: 'Laporan Progres Mingguan', desc: 'Ringkasan perkembangan belajar setiap akhir pekan',      icon: 'solar:chart-bold-duotone',    color: '#58cc02' },
  ]

  // ── Display items ──
  const displayItems = [
    { key: 'Mode Gelap (Dark Mode)',                       label: 'Mode Gelap',         desc: 'Ubah tampilan menjadi dark theme',          icon: 'solar:moon-bold-duotone',        color: '#6366f1' },
    { key: 'Ukuran Teks Besar',                            label: 'Teks Lebih Besar',   desc: 'Perbesar ukuran teks untuk keterbacaan',    icon: 'solar:text-bold-duotone',        color: '#f59e0b' },
    { key: 'Gunakan Animasi Berkurang (Reduce Motion)',    label: 'Kurangi Animasi',    desc: 'Matikan animasi untuk performa lebih baik', icon: 'solar:wind-bold-duotone',        color: '#10b981' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-3 flex items-center justify-between">
        <Link to={backPath} className="flex items-center gap-2 text-slate-500 hover:text-primary-500 transition-colors font-bold text-sm group">
          <Icon icon="solar:arrow-left-bold" width={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-slate-900 text-lg">BISINDO<span className="text-primary-500">.AI</span></span>
        </div>
        <AnimatePresence>
          {saved && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-600 rounded-full text-xs font-bold">
              <Icon icon="solar:check-circle-bold" width={14} /> Tersimpan otomatis
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5 mb-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-emerald-400 p-0.5 shadow-[0_8px_24px_rgba(88,204,2,0.3)]">
              <div className="w-full h-full rounded-[14px] overflow-hidden border-2 border-white bg-white">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary-500 border-2 border-white flex items-center justify-center">
              <Icon icon="solar:camera-bold" width={10} color="#fff" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">{user?.name ?? 'Pengguna'}</h1>
            <p className="text-slate-400 text-sm font-medium">{user?.email}</p>
            <span className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${user?.role === 'pengajar' ? 'bg-primary-50 text-primary-600' : 'bg-blue-50 text-blue-600'}`}>
              <Icon icon={user?.role === 'pengajar' ? 'solar:medal-ribbons-star-bold-duotone' : 'solar:graduation-cap-bold-duotone'} width={11} />
              {user?.role === 'pengajar' ? 'Pengajar' : 'Murid'}
            </span>
          </div>
        </motion.div>

        {/* Tab Nav */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl mb-8">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>
              <Icon icon={tab.icon} width={16} color={activeTab === tab.id ? '#58cc02' : '#94a3b8'} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>

            {/* ── PROFIL ── */}
            {activeTab === 'profil' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="solar:user-circle-bold-duotone" width={20} color="#58cc02" />
                  <h2 className="text-base font-black text-slate-900">Informasi Pribadi</h2>
                </div>
                {profileMsg && (
                  <div className={`flex items-center gap-2 p-3 rounded-xl text-sm font-semibold ${profileMsg.type === 'success' ? 'bg-primary-50 text-primary-700' : 'bg-red-50 text-red-600'}`}>
                    <Icon icon={profileMsg.type === 'success' ? 'solar:check-circle-bold' : 'solar:danger-triangle-bold'} width={16} />
                    {profileMsg.text}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Nama Lengkap" name="name" value={profile.name} onChange={handleProfileChange} icon="solar:user-bold" placeholder="Nama kamu" />
                  <InputField label="Email" name="email" type="email" value={profile.email} onChange={handleProfileChange} icon="solar:letter-bold" placeholder="email@contoh.com" />
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1.5"><Icon icon="solar:lock-bold-duotone" width={13} color="#94a3b8" /> Ganti Kata Sandi (opsional)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Kata Sandi Baru" name="password" type="password" value={profile.password} onChange={handleProfileChange} icon="solar:lock-bold" placeholder="Min. 8 karakter" />
                    <InputField label="Konfirmasi Kata Sandi" name="password_confirmation" type="password" value={profile.password_confirmation} onChange={handleProfileChange} icon="solar:lock-bold" placeholder="Ulangi sandi baru" />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button onClick={handleSaveProfile} disabled={profileLoading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm rounded-xl transition-all shadow-[0_4px_12px_rgba(88,204,2,0.3)] disabled:opacity-60">
                    {profileLoading ? <><Icon icon="solar:refresh-bold" width={14} className="animate-spin" /> Menyimpan...</> : <><Icon icon="solar:check-circle-bold" width={14} /> Simpan Profil</>}
                  </button>
                </div>
              </div>
            )}

            {/* ── NOTIFIKASI ── */}
            {activeTab === 'notifikasi' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] divide-y divide-slate-50">
                {notifItems.map(n => (
                  <div key={n.key} className="flex items-center justify-between p-5 hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: n.color + '18' }}>
                        <Icon icon={n.icon} width={22} color={n.color} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{n.label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                      </div>
                    </div>
                    <Toggle active={toggles[n.key]} onToggle={() => handleToggle(n.key)} color={n.color} />
                  </div>
                ))}
              </div>
            )}

            {/* ── TAMPILAN ── */}
            {activeTab === 'tampilan' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] divide-y divide-slate-50">
                {displayItems.map(d => (
                  <div key={d.key} className="flex items-center justify-between p-5 hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: d.color + '18' }}>
                        <Icon icon={d.icon} width={22} color={d.color} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{d.label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{d.desc}</p>
                      </div>
                    </div>
                    <Toggle active={toggles[d.key]} onToggle={() => handleToggle(d.key)} color={d.color} />
                  </div>
                ))}
              </div>
            )}

            {/* ── KEAMANAN ── */}
            {activeTab === 'keamanan' && (
              <div className="space-y-4">
                {/* Danger zone */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon icon="solar:shield-bold-duotone" width={20} color="#58cc02" />
                    <h2 className="text-base font-black text-slate-900">Sesi & Akses</h2>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                        <Icon icon="solar:shield-check-bold-duotone" width={18} color="#22c55e" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Sesi Aktif</p>
                        <p className="text-xs text-slate-400">Login terakhir baru saja</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-green-50 text-green-600 rounded-full">Aktif</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-red-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon icon="solar:danger-triangle-bold-duotone" width={20} color="#ef4444" />
                    <h2 className="text-base font-black text-red-600">Zona Bahaya</h2>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">Tindakan berikut tidak dapat dibatalkan. Harap berhati-hati.</p>
                  <button onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm rounded-xl transition-all border border-red-100 hover:border-red-200">
                    <Icon icon="solar:logout-2-bold-duotone" width={16} /> Keluar dari Semua Perangkat
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
