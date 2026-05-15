import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, User, Bell, Shield, Moon, Eye, Keyboard, HelpCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const getInitialSettings = () => {
    const saved = localStorage.getItem('bisindo_settings')
    if (saved) return JSON.parse(saved)
    return {
      'Pengingat Belajar Harian': true,
      'Pembaruan Modul Baru': true,
      'Laporan Progres Mingguan': false,
      'Mode Gelap (Dark Mode)': false,
      'Ukuran Teks Besar': false,
      'Gunakan Animasi Berkurang (Reduce Motion)': false
    }
  }

  const { user, updateUser } = useAuth()
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  })
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Update local profile state if global user changes
  useEffect(() => {
    if (user) {
      setProfile(prev => ({ ...prev, name: user.name, email: user.email }))
    }
  }, [user])

  const handleProfileChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value})
  }

  const handleSaveProfile = async () => {
    try {
      const data = {}
      if (profile.name !== user.name) data.name = profile.name
      if (profile.email !== user.email) data.email = profile.email
      if (profile.password) data.password = profile.password

      if (Object.keys(data).length > 0) {
        await updateUser(data)
      }
      setIsEditingProfile(false)
      setProfile({...profile, password: ''}) // clear password field
      alert('Profil Anda berhasil diperbarui!')
    } catch (error) {
      console.error(error)
      alert('Gagal memperbarui profil. Periksa kembali isian Anda (mungkin email sudah digunakan).')
    }
  }

  // Toggles for UI before saving
  const [toggles, setToggles] = useState(getInitialSettings)
  
  // Actually saved toggles
  const [savedToggles, setSavedToggles] = useState(getInitialSettings)

  // Apply settings globally ONLY when savedToggles changes
  useEffect(() => {
    localStorage.setItem('bisindo_settings', JSON.stringify(savedToggles))

    // Handle Dark Mode
    if (savedToggles['Mode Gelap (Dark Mode)']) {
      document.documentElement.classList.add('dark-theme-filter')
    } else {
      document.documentElement.classList.remove('dark-theme-filter')
    }

    // Handle Large Text
    if (savedToggles['Ukuran Teks Besar']) {
      document.documentElement.classList.add('text-large-mode')
    } else {
      document.documentElement.classList.remove('text-large-mode')
    }

    // Handle Reduce Motion
    if (savedToggles['Gunakan Animasi Berkurang (Reduce Motion)']) {
      document.documentElement.classList.add('reduce-motion-mode')
    } else {
      document.documentElement.classList.remove('reduce-motion-mode')
    }
  }, [savedToggles])

  const handleToggle = (label) => {
    setToggles(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const handleSave = () => {
    setSavedToggles(toggles)
    alert('Sukses! Semua pengaturan preferensimu telah berhasil disimpan ke database.')
  }

  const handleCancel = () => {
    setToggles(savedToggles)
  }

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  }

  const sections = [
    {
      title: 'Notifikasi',
      icon: <Bell className="w-5 h-5 text-amber-500" />,
      items: [
        { label: 'Pengingat Belajar Harian', type: 'toggle' },
        { label: 'Pembaruan Modul Baru', type: 'toggle' },
        { label: 'Laporan Progres Mingguan', type: 'toggle' }
      ]
    },
    {
      title: 'Aksesibilitas & Tampilan',
      icon: <Eye className="w-5 h-5 text-emerald-500" />,
      items: [
        { label: 'Mode Gelap (Dark Mode)', type: 'toggle' },
        { label: 'Ukuran Teks Besar', type: 'toggle' },
        { label: 'Gunakan Animasi Berkurang (Reduce Motion)', type: 'toggle' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 lg:p-16 max-w-4xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors mb-8 group font-medium">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Dashboard
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Pengaturan</h1>
        <p className="text-slate-500 text-lg">Kelola profil dan preferensi pengalaman belajarmu.</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        
          <motion.div key="profil-akun" variants={container}>
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                <User className="w-5 h-5 text-primary-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Profil Akun</h2>
            </div>
            
            <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-sm bg-white mb-8">
              <div className="divide-y divide-slate-100">
                <div className="p-6 flex flex-col gap-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-slate-700">Informasi Pribadi</p>
                    {isEditingProfile ? (
                      <div className="flex gap-3">
                        <button onClick={() => { setIsEditingProfile(false); setProfile({name: user?.name, email: user?.email, password: ''}) }} className="text-sm font-bold text-slate-500 hover:text-slate-700">Batal</button>
                        <button onClick={handleSaveProfile} className="text-sm font-bold text-primary-500 hover:text-primary-700">Simpan Profil</button>
                      </div>
                    ) : (
                      <button onClick={() => setIsEditingProfile(true)} className="text-sm font-bold text-primary-500 hover:text-primary-700">Ubah</button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Nama Lengkap</label>
                      {isEditingProfile ? (
                        <input name="name" value={profile.name} onChange={handleProfileChange} className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-sm font-semibold focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                      ) : (
                        <p className="text-slate-900 font-semibold flex-1">{user?.name}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Email</label>
                      {isEditingProfile ? (
                        <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-sm font-semibold focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                      ) : (
                        <p className="text-slate-900 font-semibold flex-1">{user?.email}</p>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Kata Sandi</label>
                      {isEditingProfile ? (
                        <input type="password" name="password" value={profile.password} onChange={handleProfileChange} placeholder="Kosongkan jika tidak diubah" className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-sm font-semibold focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-400" />
                      ) : (
                        <p className="text-slate-900 font-semibold flex-1 text-lg leading-none tracking-[0.2em] mt-1">••••••••</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

        {sections.map((section, idx) => (
          <motion.div key={idx} variants={container}>
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                {section.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
            </div>
            
            <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-sm bg-white">
              <div className="divide-y divide-slate-100">
                {section.items.map((item, i) => (
                  <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-700">{item.label}</p>
                      {item.value && <p className="text-sm text-slate-500 mt-1">{item.value}</p>}
                    </div>
                    
                    {item.type === 'toggle' ? (
                      <button 
                        onClick={() => handleToggle(item.label)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${toggles[item.label] ? 'bg-primary-500' : 'bg-slate-200'}`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${toggles[item.label] ? 'translate-x-6' : 'translate-x-0'}`}></span>
                      </button>
                    ) : (
                      <button className="text-sm font-bold text-primary-500 hover:text-primary-700">Ubah</button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div variants={container} className="pt-8 flex justify-end gap-4">
          <Button variant="outline" className="text-slate-600 border-slate-300" onClick={handleCancel}>Batal</Button>
          <Button onClick={handleSave}>Simpan Perubahan</Button>
        </motion.div>

      </motion.div>
    </div>
  )
}
