import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, BellRing, CheckCircle2 } from 'lucide-react'
import Card from '../components/ui/Card'

export default function Notifications() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 lg:p-16 max-w-4xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors mb-8 group font-medium">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Dashboard
      </Link>

      <div className="mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Notifikasi</h1>
          <p className="text-slate-500 text-lg">Pembaruan aktivitas dan pengingat belajarmu.</p>
        </div>
        <button className="text-primary-500 text-sm font-bold flex items-center gap-2 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors">
          <CheckCircle2 className="w-4 h-4" /> Tandai semua dibaca
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {[
          { title: 'Selamat Datang di BISINDO.AI!', desc: 'Mulai perjalananmu belajar bahasa isyarat hari ini.', time: 'Baru saja', unread: true },
          { title: 'Streak Belajar!', desc: 'Pertahankan streak belajarmu untuk membuka lencana Api Abadi.', time: '2 jam yang lalu', unread: true },
          { title: 'Modul Baru Tersedia', desc: 'Modul Keluarga & Hubungan sekarang tersedia di Katalog.', time: '1 hari yang lalu', unread: false }
        ].map((notif, i) => (
          <Card key={i} hover className={`p-5 flex gap-4 transition-colors cursor-pointer ${notif.unread ? 'bg-white border-primary-200 shadow-[0_4px_20px_rgba(99,102,241,0.05)]' : 'bg-slate-50/50 border-slate-100 shadow-none'}`}>
            <div className={`mt-1 p-2.5 rounded-xl h-fit shadow-sm ${notif.unread ? 'bg-gradient-to-br from-primary-500 to-indigo-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
              <BellRing className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold text-lg ${notif.unread ? 'text-slate-900' : 'text-slate-600'}`}>{notif.title}</h3>
                <span className="text-xs font-semibold text-slate-400">{notif.time}</span>
              </div>
              <p className="text-slate-500">{notif.desc}</p>
            </div>
            {notif.unread && <div className="w-3 h-3 rounded-full bg-primary-500 mt-2 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>}
          </Card>
        ))}
      </motion.div>
    </div>
  )
}
