import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import Card from '../components/ui/Card'
import SidebarPengajar from '../components/layout/SidebarPengajar'
import axios from '../lib/axios'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
const item      = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } } }

function ProgressBar({ value }) {
  const color = value >= 75 ? '#58cc02' : value >= 50 ? '#1cb0f6' : '#ffc800'
  return (
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden flex-1">
      <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="h-full rounded-full" style={{ background: color }} />
    </div>
  )
}

export default function StatistikPengajar() {
  const [students, setStudents] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)
  const [detail, setDetail]     = useState(null)
  const [loadDetail, setLoadDetail] = useState(false)

  useEffect(() => {
    (async () => {
      try { const r = await axios.get('/v1/pengajar/statistik'); setStudents(r.data.data ?? []) } catch {} finally { setLoading(false) }
    })()
  }, [])

  const openDetail = async (id) => {
    setSelected(id); setLoadDetail(true)
    try { const r = await axios.get(`/v1/pengajar/statistik/${id}`); setDetail(r.data.data) } catch {} finally { setLoadDetail(false) }
  }

  const filtered = students.filter(s => s.name?.toLowerCase().includes(search.toLowerCase()) || s.email?.toLowerCase().includes(search.toLowerCase()))

  const avgProgress  = students.length ? Math.round(students.reduce((a, s) => a + (s.progres_persen ?? 0), 0) / students.length) : 0
  const topStudent   = [...students].sort((a, b) => (b.progres_persen ?? 0) - (a.progres_persen ?? 0))[0]

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <SidebarPengajar />

      <main className="flex-1 p-6 md:p-10 max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Statistik Murid</h1>
          <p className="text-slate-500 font-medium">Pantau perkembangan belajar setiap murid</p>
        </motion.div>

        {/* Summary Cards */}
        {!loading && (
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: 'solar:users-group-rounded-bold-duotone', label: 'Total Murid',       value: students.length,  color: 'from-primary-500 to-emerald-500' },
              { icon: 'solar:chart-bold-duotone',               label: 'Rata-rata Progres', value: `${avgProgress}%`, color: 'from-[#1cb0f6] to-indigo-500' },
              { icon: 'solar:cup-star-bold-duotone',            label: 'Murid Terbaik',     value: topStudent?.name?.split(' ')[0] ?? '–', color: 'from-amber-400 to-orange-500' },
            ].map((s, i) => (
              <motion.div key={i} variants={item}>
                <Card className="p-5 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon icon={s.icon} width={22} color="#fff" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">{s.value}</div>
                    <div className="text-xs text-slate-400 font-semibold">{s.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tabel */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-2.5 mb-4 focus-within:ring-2 focus-within:ring-primary-400/30 focus-within:border-primary-400 transition-all shadow-sm">
              <Icon icon="solar:magnifier-bold" width={16} color="#94a3b8" className="mr-2 flex-shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none"
                placeholder="Cari nama atau email murid..." />
            </div>

            <Card className="bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 px-5 py-3 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="col-span-4">Murid</div>
                <div className="col-span-4">Progres</div>
                <div className="col-span-2 text-center">Streak</div>
                <div className="col-span-2 text-center">Modul</div>
              </div>

              {loading ? (
                <div className="divide-y divide-slate-50">
                  {[1,2,3,4,5].map(i => <div key={i} className="h-14 px-5 flex items-center"><div className="h-6 bg-slate-100 rounded-lg w-full animate-pulse" /></div>)}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <Icon icon="solar:users-group-rounded-bold-duotone" width={48} color="#cbd5e1" className="mx-auto mb-3" />
                  <p className="font-bold">{search ? 'Murid tidak ditemukan.' : 'Belum ada murid terdaftar.'}</p>
                </div>
              ) : (
                <motion.div variants={container} initial="hidden" animate="show" className="divide-y divide-slate-50">
                  {filtered.map((s) => (
                    <motion.div key={s.id} variants={item}
                      onClick={() => openDetail(s.id)}
                      className={`grid grid-cols-12 px-5 py-3.5 items-center cursor-pointer transition-colors hover:bg-slate-50 ${selected === s.id ? 'bg-primary-50/60' : ''}`}>
                      <div className="col-span-4 flex items-center gap-3">
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${s.name}`}
                          className="w-8 h-8 rounded-full border-2 border-slate-100 flex-shrink-0 bg-slate-50" alt={s.name} />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{s.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{s.email}</p>
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <ProgressBar value={s.progres_persen ?? 0} />
                        <span className="text-xs font-black text-slate-700 w-9 text-right">{s.progres_persen ?? 0}%</span>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-lg">
                          <Icon icon="solar:fire-bold-duotone" width={12} color="#ff4b4b" />
                          <span className="text-[11px] font-bold text-red-500">{s.streak_hari ?? 0}</span>
                        </div>
                      </div>
                      <div className="col-span-2 text-center text-sm font-bold text-slate-700">{s.modul_selesai ?? 0}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </Card>
          </div>

          {/* Detail Panel */}
          <div>
            {!selected ? (
              <Card className="p-8 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] h-full flex flex-col items-center justify-center text-center">
                <Icon icon="solar:chart-2-bold-duotone" width={48} color="#cbd5e1" className="mb-3" />
                <p className="text-slate-400 font-bold text-sm">Pilih murid untuk melihat detail progresnya</p>
              </Card>
            ) : loadDetail ? (
              <Card className="p-6 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-4">
                {[1,2,3,4].map(i => <div key={i} className="h-10 bg-slate-100 rounded-xl animate-pulse" />)}
              </Card>
            ) : detail ? (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="p-6 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${detail.name}`}
                      className="w-12 h-12 rounded-full border-2 border-primary-100 bg-slate-50" alt={detail.name} />
                    <div>
                      <p className="font-black text-slate-900">{detail.name}</p>
                      <p className="text-xs text-slate-400">{detail.email}</p>
                    </div>
                  </div>

                  {[
                    { icon: 'solar:chart-bold-duotone',       label: 'Total Progres',  value: `${detail.progres_persen ?? 0}%`,        color: '#58cc02' },
                    { icon: 'solar:fire-bold-duotone',         label: 'Streak Harian',  value: `${detail.streak_hari ?? 0} hari`,       color: '#ff4b4b' },
                    { icon: 'solar:book-2-bold-duotone',       label: 'Modul Selesai',  value: `${detail.modul_selesai ?? 0} modul`,    color: '#1cb0f6' },
                    { icon: 'solar:clock-bold-duotone',        label: 'Jam Belajar',    value: `${detail.total_jam_belajar ?? 0} jam`,  color: '#ffc800' },
                    { icon: 'solar:calendar-bold-duotone',     label: 'Bergabung',      value: detail.bergabung_sejak ?? '–',           color: '#a855f7' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold">
                        <Icon icon={row.icon} width={15} color={row.color} />{row.label}
                      </div>
                      <span className="text-sm font-black text-slate-800">{row.value}</span>
                    </div>
                  ))}

                  {/* Mini weekly chart */}
                  {detail.aktivitas_mingguan && (
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-400 mb-3">Aktivitas Minggu Ini</p>
                      <div className="flex gap-1.5 items-end h-12">
                        {Object.entries(detail.aktivitas_mingguan).map(([day, val]) => (
                          <div key={day} className="flex-1 flex flex-col items-center gap-1">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${val}%` }} transition={{ duration: 0.5 }}
                              className="w-full rounded-sm" style={{ background: '#58cc02', opacity: 0.7, minHeight: 3 }} />
                            <span className="text-[9px] font-bold text-slate-400">{day}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  )
}
