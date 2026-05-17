import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Card from '../components/ui/Card'
import SidebarPengajar from '../components/layout/SidebarPengajar'
import { useAuth } from '../context/AuthContext'
import axios from '../lib/axios'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } } }

/* ─── Main Dashboard ─── */
export default function DashboardPengajar() {
  const { user } = useAuth()

  const [students, setStudents] = useState([])
  const [materials, setMaterials] = useState([])
  const [loadingSt, setLoadingSt] = useState(true)
  const [loadingMt, setLoadingMt] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const fetchStudents = async () => { try { const r = await axios.get('/v1/pengajar/statistik'); setStudents(r.data.data ?? []) } catch { } finally { setLoadingSt(false) } }
  const fetchMaterials = async () => { try { const r = await axios.get('/v1/pengajar/materi'); setMaterials(r.data.data ?? []) } catch { } finally { setLoadingMt(false) } }

  useEffect(() => { fetchStudents(); fetchMaterials() }, [])

  const togglePublish = async (id) => {
    try {
      await axios.patch(`/v1/pengajar/materi/${id}/publish`)
      setMaterials(prev => prev.map(m => m.id === id ? { ...m, is_published: !m.is_published } : m))
    } catch { }
  }

  const deleteMaterial = async (id) => {
    if (!window.confirm('Hapus materi ini?')) return
    setDeleting(id)
    try {
      await axios.delete(`/v1/pengajar/materi/${id}`)
      setMaterials(prev => prev.filter(m => m.id !== id))
    } catch { }
    setDeleting(null)
  }

  const firstName = user?.name?.split(' ')[0] ?? 'Pengajar'

  const totalMurid = students.length
  const totalMateri = materials.length
  const avgProgress = students.length ? Math.round(students.reduce((a, s) => a + (s.progres_persen ?? 0), 0) / students.length) : 0
  const activeToday = students.filter(s => s.bergabung_sejak).length // mock: semua yang ada data

  const statCards = [
    { icon: 'solar:users-group-rounded-bold-duotone', label: 'Total Murid', value: loadingSt ? '–' : totalMurid, color: 'from-primary-500 to-emerald-500' },
    { icon: 'solar:book-2-bold-duotone', label: 'Materi Diupload', value: loadingMt ? '–' : totalMateri, color: 'from-[#1cb0f6] to-indigo-500' },
    { icon: 'solar:chart-bold-duotone', label: 'Rata-rata Progres', value: loadingSt ? '–' : `${avgProgress}%`, color: 'from-amber-400 to-orange-500' },
    { icon: 'solar:fire-bold-duotone', label: 'Aktif Hari Ini', value: loadingSt ? '–' : activeToday, color: 'from-rose-500 to-pink-600' },
  ]

  const typeMap = {
    video: { icon: 'solar:video-library-bold-duotone', color: '#1cb0f6' },
    pdf: { icon: 'solar:file-text-bold-duotone', color: '#ff4b4b' },
    image: { icon: 'solar:gallery-bold-duotone', color: '#ffc800' },
    document: { icon: 'solar:document-bold-duotone', color: '#58cc02' },
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <SidebarPengajar />

      {/* ── Main ── */}
      <main className="flex-1 p-6 md:p-10 max-w-[1400px] mx-auto w-full overflow-y-auto">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Icon icon="solar:calendar-bold-duotone" width={13} />
              {totalMurid} murid terdaftar
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">Halo, {firstName}! 👋</h1>
            <p className="text-slate-500 font-medium">Pantau perkembangan murid dan kelola materi belajarmu.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Link to="/pengajar/materi"
              className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm rounded-full transition-all shadow-[0_4px_12px_rgba(88,204,2,0.3)] hover:-translate-y-0.5">
              <Icon icon="solar:upload-bold-duotone" width={16} /> Upload Materi
            </Link>
            <Link to="/settings" className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-400 to-emerald-400 p-0.5 block hover:scale-105 transition-transform shadow-md">
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </Link>
          </motion.div>
        </header>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((s, i) => (
              <motion.div key={i} variants={item}>
                <Card className="p-5 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-all group">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <Icon icon={s.icon} width={22} color="#fff" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">{s.value}</div>
                  <div className="text-xs font-semibold text-slate-400 mt-1">{s.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Progres + Materi */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Tabel Progres Murid */}
            <motion.div variants={item} className="lg:col-span-2">
              <Card className="p-6 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:users-group-rounded-bold-duotone" width={20} color="#58cc02" />
                    <h2 className="text-lg font-black text-slate-900">Progres Murid</h2>
                  </div>
                  <Link to="/pengajar/statistik" className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center gap-1">
                    Lihat semua <Icon icon="solar:arrow-right-bold" width={12} />
                  </Link>
                </div>

                {loadingSt ? (
                  <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-10 bg-slate-100 rounded-xl animate-pulse" />)}</div>
                ) : students.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    <Icon icon="solar:users-group-rounded-bold-duotone" width={40} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-semibold">Belum ada murid terdaftar.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {students.slice(0, 6).map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${s.name}`}
                          className="w-8 h-8 rounded-full border-2 border-slate-100 flex-shrink-0 bg-slate-50" alt={s.name} />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-slate-800 truncate">{s.name}</span>
                            <span className="text-sm font-black text-slate-700 ml-2">{s.progres_persen ?? 0}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${s.progres_persen ?? 0}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1 }}
                              className="h-full rounded-full"
                              style={{ background: (s.progres_persen ?? 0) >= 75 ? '#58cc02' : (s.progres_persen ?? 0) >= 50 ? '#1cb0f6' : '#ffc800' }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg flex-shrink-0">
                          <Icon icon="solar:fire-bold-duotone" width={12} color="#ff4b4b" />
                          <span className="text-[11px] font-bold text-red-500">{s.streak_hari ?? 0}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium flex-shrink-0 w-20 text-right hidden sm:block">{s.bergabung_sejak}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Panel kanan */}
            <div className="flex flex-col gap-5">
              {/* Ringkasan */}
              <motion.div variants={item}>
                <Card className="bg-gradient-to-br from-slate-900 to-[#0F172A] border border-white/5 text-white p-6 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-10">
                    <Icon icon="solar:chart-2-bold-duotone" width={100} color="#fff" />
                  </div>
                  <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white/80">
                    <Icon icon="solar:calendar-mark-bold-duotone" width={13} /> Rata-rata Progres
                  </div>
                  <div className="text-5xl font-black mb-1">{avgProgress}<span className="text-2xl font-bold text-slate-400">%</span></div>
                  <p className="text-sm text-slate-400 mb-5">dari {totalMurid} murid terdaftar</p>
                  <div className="flex gap-1.5">
                    {[72, 60, 80, 55, 90, 67, 74].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-full overflow-hidden" style={{ height: 40, background: 'rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ duration: 0.6, delay: i * 0.07 }}
                            style={{ background: '#58cc02', borderRadius: 99, opacity: 0.85 }} />
                        </div>
                        <span className="text-[9px] font-bold text-slate-600">{['S', 'S', 'R', 'K', 'J', 'S', 'M'][i]}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Materi Terbaru */}
              <motion.div variants={item} className="flex-1">
                <Card className="p-5 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:folder-bold-duotone" width={18} color="#1cb0f6" />
                      <h3 className="font-black text-slate-900 text-sm">Materi Saya</h3>
                    </div>
                    <Link to="/pengajar/materi" className="text-xs font-bold text-[#1cb0f6] hover:text-indigo-600 transition-colors">+ Upload</Link>
                  </div>

                  {loadingMt ? (
                    <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />)}</div>
                  ) : materials.length === 0 ? (
                    <div className="text-center py-6 text-slate-400">
                      <Icon icon="solar:folder-bold-duotone" width={36} className="mx-auto mb-2 opacity-30" />
                      <p className="text-xs font-semibold">Belum ada materi diupload.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {materials.slice(0, 4).map((m) => {
                        const tm = typeMap[m.type] ?? typeMap.document
                        return (
                          <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: tm.color + '18' }}>
                              <Icon icon={tm.icon} width={18} color={tm.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-800 truncate">{m.title}</p>
                              <p className="text-[11px] text-slate-400">{m.file_name ?? m.type}</p>
                            </div>
                            {/* Toggle publish */}
                            <button onClick={() => togglePublish(m.id)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${m.is_published ? 'bg-primary-50 text-primary-600 hover:bg-red-50 hover:text-red-500' : 'bg-slate-100 text-slate-400 hover:bg-primary-50 hover:text-primary-600'}`}>
                              {m.is_published ? 'Publik' : 'Draft'}
                            </button>
                            {/* Delete */}
                            <button onClick={() => deleteMaterial(m.id)} disabled={deleting === m.id}
                              className="text-slate-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                              <Icon icon={deleting === m.id ? 'solar:refresh-bold' : 'solar:trash-bin-trash-bold'} width={16} />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>



      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200/60 flex justify-around p-2 z-50">
        {[
          { icon: 'solar:home-2-bold-duotone', label: 'Beranda', path: '/pengajar' },
          { icon: 'solar:upload-bold-duotone', label: 'Upload', path: '/pengajar/materi' },
          { icon: 'solar:chart-2-bold-duotone', label: 'Statistik', path: '/pengajar/statistik' },
          { icon: 'solar:settings-bold-duotone', label: 'Pengaturan', path: '/settings' },
        ].map((n) => {
          const isActive = location.pathname === n.path
          return (
            <Link key={n.path} to={n.path} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${isActive ? 'text-primary-600' : 'text-slate-400'}`}>
              <Icon icon={n.icon} width={22} color={isActive ? '#58cc02' : '#9ca3af'} />
              <span className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-primary-600' : 'text-slate-500'}`}>{n.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
