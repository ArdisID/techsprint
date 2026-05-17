import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import Card from '../components/ui/Card'
import SidebarPengajar from '../components/layout/SidebarPengajar'
import axios from '../lib/axios'

const typeMap = {
  video:    { icon: 'solar:video-library-bold-duotone', color: '#1cb0f6', label: 'Video' },
  pdf:      { icon: 'solar:file-text-bold-duotone',     color: '#ff4b4b', label: 'PDF' },
  image:    { icon: 'solar:gallery-bold-duotone',       color: '#ffc800', label: 'Gambar' },
  document: { icon: 'solar:document-bold-duotone',      color: '#58cc02', label: 'Dokumen' },
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
const item      = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } } }

/* ─── Upload Modal ─── */
function UploadModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ title: '', description: '', type: 'video' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) { setError('Pilih file terlebih dahulu.'); return }
    setLoading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('description', form.description)
      fd.append('type', form.type)
      fd.append('file', file)
      await axios.post('/v1/pengajar/materi', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      onSuccess(); onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal upload. Coba lagi.')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.5)' }}>
      <motion.div initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-7">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Upload Materi Baru</h2>
            <p className="text-sm text-slate-400 mt-0.5">Tambahkan konten pembelajaran untuk muridmu</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <Icon icon="solar:close-circle-bold" width={26} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-xl flex items-center gap-2">
            <Icon icon="solar:danger-triangle-bold" width={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Judul Materi *</label>
            <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all"
              placeholder="Contoh: Sapaan Dasar BISINDO" />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Deskripsi</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all resize-none"
              rows={2} placeholder="Deskripsi singkat materi..." />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Tipe Konten</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(typeMap).map(([key, val]) => (
                <button key={key} type="button" onClick={() => setForm({ ...form, type: key })}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all text-xs font-bold ${
                    form.type === key ? 'border-primary-400 bg-primary-50 text-primary-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}>
                  <Icon icon={val.icon} width={20} color={form.type === key ? val.color : '#94a3b8'} />
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">File *</label>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
              className={`w-full border-2 border-dashed rounded-xl p-7 text-center cursor-pointer transition-all ${
                dragOver ? 'border-primary-400 bg-primary-50' : file ? 'border-primary-300 bg-primary-50/40' : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
              }`}>
              <Icon icon={file ? 'solar:check-circle-bold' : 'solar:upload-bold-duotone'} width={32}
                color={file ? '#58cc02' : '#94a3b8'} className="mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600">
                {file ? file.name : 'Drag & drop atau klik untuk pilih'}
              </p>
              {file && <p className="text-xs text-slate-400 mt-1">{(file.size / 1024 / 1024).toFixed(1)} MB</p>}
              {!file && <p className="text-xs text-slate-400 mt-1">Maks. 50MB</p>}
            </div>
            <input ref={fileRef} type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-all">
              Batal
            </button>
            <button type="submit" disabled={loading}
              className="flex-2 flex-1 py-3 bg-primary-500 hover:bg-primary-600 text-white font-black text-sm rounded-xl transition-all shadow-[0_4px_12px_rgba(88,204,2,0.3)] disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <><Icon icon="solar:refresh-bold" width={16} className="animate-spin" /> Mengupload...</> : 'Upload Sekarang'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function MateriPengajar() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading]     = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [deleting, setDeleting]   = useState(null)
  const [filter, setFilter]       = useState('all')

  const fetch = async () => {
    setLoading(true)
    try { const r = await axios.get('/v1/pengajar/materi'); setMaterials(r.data.data ?? []) } catch {} finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const togglePublish = async (id) => {
    try {
      await axios.patch(`/v1/pengajar/materi/${id}/publish`)
      setMaterials(prev => prev.map(m => m.id === id ? { ...m, is_published: !m.is_published } : m))
    } catch {}
  }

  const deleteMaterial = async (id) => {
    if (!window.confirm('Hapus materi ini? Tindakan tidak bisa dibatalkan.')) return
    setDeleting(id)
    try {
      await axios.delete(`/v1/pengajar/materi/${id}`)
      setMaterials(prev => prev.filter(m => m.id !== id))
    } catch {}
    setDeleting(null)
  }

  const filtered = filter === 'all' ? materials : filter === 'published' ? materials.filter(m => m.is_published) : materials.filter(m => !m.is_published)

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <SidebarPengajar />

      <main className="flex-1 p-6 md:p-10 max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Materi Pembelajaran</h1>
            <p className="text-slate-500 font-medium">{materials.length} materi tersimpan</p>
          </div>
          <button onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm rounded-full transition-all shadow-[0_4px_12px_rgba(88,204,2,0.3)] hover:-translate-y-0.5 w-fit">
            <Icon icon="solar:upload-bold-duotone" width={16} /> Upload Materi
          </button>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[{ key: 'all', label: `Semua (${materials.length})` }, { key: 'published', label: `Publik (${materials.filter(m => m.is_published).length})` }, { key: 'draft', label: `Draft (${materials.filter(m => !m.is_published).length})` }].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f.key ? 'bg-primary-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'}`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-44 bg-white rounded-2xl animate-pulse border border-slate-100" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Icon icon="solar:folder-bold-duotone" width={60} color="#cbd5e1" className="mx-auto mb-4" />
            <p className="text-slate-400 font-bold text-lg mb-2">Belum ada materi</p>
            <p className="text-slate-400 text-sm mb-6">Upload materi pertama kamu sekarang</p>
            <button onClick={() => setShowUpload(true)}
              className="px-6 py-2.5 bg-primary-500 text-white font-bold text-sm rounded-full shadow-[0_4px_12px_rgba(88,204,2,0.3)]">
              + Upload Materi
            </button>
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((m) => {
              const tm = typeMap[m.type] ?? typeMap.document
              return (
                <motion.div key={m.id} variants={item}>
                  <Card className="p-5 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all group flex flex-col gap-4">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: tm.color + '18' }}>
                        <Icon icon={tm.icon} width={24} color={tm.color} />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${m.is_published ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-400'}`}>
                        {m.is_published ? '● Publik' : '○ Draft'}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-black text-slate-900 text-sm mb-1 leading-tight line-clamp-2">{m.title}</h3>
                      {m.description && <p className="text-xs text-slate-400 line-clamp-2">{m.description}</p>}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold border-t border-slate-50 pt-3">
                      <Icon icon={tm.icon} width={12} color={tm.color} />
                      <span>{tm.label}</span>
                      {m.file_size > 0 && <><span>·</span><span>{(m.file_size / 1024 / 1024).toFixed(1)} MB</span></>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button onClick={() => togglePublish(m.id)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                          m.is_published
                            ? 'border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50'
                            : 'border-primary-200 text-primary-600 hover:bg-primary-50'
                        }`}>
                        {m.is_published ? 'Jadikan Draft' : 'Publikasikan'}
                      </button>
                      <button onClick={() => deleteMaterial(m.id)} disabled={deleting === m.id}
                        className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50 transition-all disabled:opacity-50">
                        <Icon icon={deleting === m.id ? 'solar:refresh-bold' : 'solar:trash-bin-trash-bold'} width={15}
                          className={deleting === m.id ? 'animate-spin' : ''} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {showUpload && <UploadModal onClose={() => setShowUpload(false)} onSuccess={fetch} />}
      </AnimatePresence>
    </div>
  )
}
