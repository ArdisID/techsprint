import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Zap, Shield, Sparkles, Infinity, GraduationCap } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Pricing() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 lg:p-16 max-w-6xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors mb-10 group font-medium">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Dashboard
      </Link>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-primary-100 shadow-sm">
          <Sparkles className="w-4 h-4 fill-primary-600" /> Paket Spesial Hackathon
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">Tingkatkan Keahlian <span className="text-primary-500">Isyaratmu.</span></h1>
        <p className="text-lg text-slate-500">Pilih paket yang sesuai untuk membuka potensi belajar tanpa batas dengan teknologi AI eksklusif dari BISINDO.AI.</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        
        {/* Basic Plan */}
        <motion.div variants={item}>
          <Card hover className="p-8 border border-slate-200/60 shadow-sm bg-white relative overflow-hidden">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Pemula (Gratis)</h3>
            <p className="text-slate-500 text-sm mb-6 h-10">Mulai belajar dasar bahasa isyarat kapan saja.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">Rp 0</span>
              <span className="text-slate-500 font-medium"> / bulan</span>
            </div>
            
            <Button variant="outline" className="w-full mb-8 text-slate-600 border-slate-300">Paket Saat Ini</Button>
            
            <div className="space-y-4">
              {[
                'Akses 5 modul dasar',
                'Latihan AI terbatas (10 menit/hari)',
                '1 Lencana profil',
                'Dukungan komunitas'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-600">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Pro Plan */}
        <motion.div variants={item} className="relative">
          <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
            <span className="bg-gradient-to-r from-primary-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
              Paling Populer
            </span>
          </div>
          <Card className="p-8 border-2 border-primary-500 shadow-[0_20px_40px_-15px_rgba(99,102,241,0.4)] bg-white relative overflow-hidden transform scale-105 z-0">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Shield className="w-32 h-32 text-primary-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-primary-600 mb-2 flex items-center gap-2">PRO <Zap className="w-5 h-5 fill-primary-600" /></h3>
              <p className="text-slate-500 text-sm mb-6 h-10">Akses tanpa batas untuk penguasaan bahasa isyarat.</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-slate-900">Rp 49.000</span>
                <span className="text-slate-500 font-medium"> / bulan</span>
              </div>
              
              <Button className="w-full mb-8 shadow-lg shadow-primary-500/30">Tingkatkan ke PRO</Button>
              
              <div className="space-y-4">
                {[
                  'Akses ke SEMUA modul premium',
                  'Latihan AI Real-time TANPA BATAS',
                  'Sertifikat kelulusan digital',
                  'Analitik progres mendetail',
                  'Prioritas fitur beta',
                  'Bebas iklan selamanya'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Lifetime Plan */}
        <motion.div variants={item}>
          <Card hover className="p-8 border border-slate-200/60 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Infinity className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Lifetime (Seumur Hidup)</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">Investasi satu kali untuk pembelajaran tak terbatas selamanya.</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">Rp 299.000</span>
              </div>
              
              <Button variant="outline" className="w-full mb-8 text-white border-white/20 hover:bg-white/10">Beli Akses Lifetime</Button>
              
              <div className="space-y-4">
                {[
                  'Semua fitur pada paket PRO',
                  'Sesi privat dengan mentor Tuli (1x)',
                  'Akses langsung ke seluruh pembaruan AI di masa depan',
                  'Lencana Profil Sultan'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  )
}
