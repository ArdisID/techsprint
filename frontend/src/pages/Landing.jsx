import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import LiveDemoDetector from '../components/ai/LiveDemoDetector'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}

// Mascot component
function Mascot({ emoji, color, size = 'md', className = '', animate = true }) {
  const sizes = { sm: 'w-14 h-14 text-3xl', md: 'w-20 h-20 text-4xl', lg: 'w-28 h-28 text-5xl', xl: 'w-36 h-36 text-6xl' }
  const borders = {
    yellow: 'bg-yellow-100 border-yellow-300',
    sky: 'bg-blue-100 border-blue-300',
    green: 'bg-green-100 border-green-300',
    violet: 'bg-purple-100 border-purple-300',
    rose: 'bg-red-100 border-red-300',
  }
  return (
    <motion.div
      animate={animate ? { y: [0, -10, 0] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className={`${sizes[size]} ${borders[color]} border-4 rounded-[2rem] flex items-center justify-center flex-shrink-0 ${className}`}
    >
      <Icon icon={emoji} />
    </motion.div>
  )
}

// Chunky card component
function FunCard({ children, color = 'white', className = '' }) {
  const colors = {
    white: 'bg-white border-slate-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    sky: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    violet: 'bg-purple-50 border-purple-200',
  }
  return (
    <div className={`rounded-[2rem] border-4 ${colors[color]} p-6 ${className}`}>
      {children}
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-amber-50 overflow-x-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <Navbar transparentDark={false} />

      {/* ===== HERO ===== */}
      <section className="bg-[#BFDDF0] pt-32 pb-0 overflow-hidden relative">
        {/* Big wavy divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 33.3C1200 26.7 1320 13.3 1380 6.7L1440 0V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#EAF6FD"/>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/60 text-[#2D6A9F] font-black text-sm px-5 py-2 rounded-full border-4 border-white/80 mb-8"
          >
            🎉 Gratis Selamanya — Daftar Sekarang!
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1A3A5C] leading-[1.05] mb-6 tracking-tight"
          >
            Belajar Bahasa<br />
            <span className="bg-[#1E4D7B] text-white px-4 rounded-2xl inline-block rotate-[-1deg] mt-2 border-b-[6px] border-[#0F2D4A]">
              Isyarat
            </span>{' '}
            <span className="text-[#4A8AB5]">Sambil</span><br />
            <span className="text-[#1E4D7B]">Seru-Seruan! <Icon icon="fluent-emoji:partying-face" className="inline w-14 h-14" /></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[#2D6A9F] font-bold mb-10 max-w-2xl mx-auto"
          >
            Ikuti gerakan tangannya lewat kamera HP-mu, dapat poin, naik level — kayak main game tapi beneran belajar!
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/register">
              <button className="w-full sm:w-auto px-10 py-5 text-xl font-black bg-[#1E4D7B] text-white rounded-2xl border-b-[8px] border-[#0F2D4A] hover:bg-[#2D6A9F] active:border-b-2 active:translate-y-[6px] transition-all shadow-xl">
                Ayo Main Sekarang! 🚀
              </button>
            </Link>
            <a href="#demo">
              <button className="w-full sm:w-auto px-10 py-5 text-xl font-black bg-white/70 text-[#1E4D7B] border-4 border-white rounded-2xl hover:bg-white active:translate-y-[4px] transition-all font-black">
                Lihat Demo Dulu 👀
              </button>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 pb-16"
          >
            <div className="flex -space-x-3">
              {[1,5,9,12].map(n => (
                <img key={n} src={`https://i.pravatar.cc/100?img=${n}`} className="w-10 h-10 rounded-full border-4 border-white" alt="" />
              ))}
            </div>
            <p className="text-[#4A8AB5] font-bold">
              <span className="text-[#1A3A5C] font-black">5.000+</span> teman sudah join!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CARA MAIN (3 Steps) ===== */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white text-[#2D6A9F] font-black text-sm px-5 py-2 rounded-full border-4 border-[#BFDDF0] mb-4 max-w-fit mx-auto">
              <Icon icon="fluent-emoji:open-book" className="w-5 h-5" /> Cara Mainnya Gampang Banget!
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-[#1E4D7B]">
              3 Langkah, Langsung Bisa!
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                step: '1',
                emoji: 'fluent-emoji:eyes',
                title: 'Lihat Gerakannya',
                desc: 'Platform kami tampilin gerakan tangan yang harus kamu tiru. Gampang banget liatnya!',
                bg: 'bg-[#2D6A9F]',
                badge: 'bg-[#BFDDF0]/40 text-white',
              },
              {
                step: '2',
                emoji: 'fluent-emoji:waving-hand',
                title: 'Tiru di Depan Kamera',
                desc: 'Tunjukin tangan kamu ke kamera HP atau laptop. Nggak perlu install apa-apa!',
                bg: 'bg-[#4A8AB5]',
                badge: 'bg-[#BFDDF0]/40 text-white',
              },
              {
                step: '3',
                emoji: 'fluent-emoji:trophy',
                title: 'Kumpulin Poin & Badge!',
                desc: 'Gerakan bener = poin naik! Kumpulin streak, saingan sama teman, dan naik papan peringkat.',
                bg: 'bg-[#1E4D7B]',
                badge: 'bg-[#BFDDF0]/30 text-white',
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className={`${item.bg} rounded-[2.5rem] p-8 relative overflow-hidden border-b-[8px] border-black/10`}
              >
                <div className={`inline-flex items-center gap-2 ${item.badge} font-black text-sm px-4 py-1 rounded-full mb-6 border-2 border-white/40`}>
                  Langkah {item.step}
                </div>
                <Icon icon={item.emoji} className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-white/80 font-bold text-base leading-relaxed">{item.desc}</p>
                {/* Big number watermark */}
                <div className="absolute -bottom-4 -right-4 text-[120px] font-black text-white/10 leading-none select-none">
                  {item.step}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== LIVE DEMO ===== */}
      <section id="demo" className="bg-[#1E4D7B] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2 bg-[#BFDDF0]/20 text-[#BFDDF0] font-black text-sm px-5 py-2 rounded-full border-4 border-[#BFDDF0]/30 mb-4 max-w-fit mx-auto">
              <Icon icon="fluent-emoji:magic-wand" className="w-5 h-5" /> Coba Langsung!
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Tunjukin Tanganmu,<br/>
              <span className="text-[#BFDDF0]">Kami Nilai Langsung!</span>
            </h2>
            <p className="text-[#A3CCE8] font-bold text-xl">
              Nyalain kamera, ikuti gerakan, langsung tau bener atau salah. Semudah itu!
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[3rem] overflow-hidden border-[8px] border-[#BFDDF0]/40"
          >
            <LiveDemoDetector />
          </motion.div>
        </div>
      </section>

      {/* ===== WHY BISINDO ===== */}
      <section id="features" className="bg-[#EAF6FD] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 bg-white text-[#2D6A9F] font-black text-sm px-5 py-2 rounded-full border-4 border-[#BFDDF0] mb-4 max-w-fit mx-auto">
              <Icon icon="fluent-emoji:gem-stone" className="w-5 h-5" /> Kenapa Harus BISINDO?
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1E4D7B]">
              Bukan Cuma Nonton Video!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { emoji: 'fluent-emoji:direct-hit', title: 'Langsung Praktek', desc: 'Belajar sambil lakuin, bukan cuma liat. Tangan kamu yang jadi guru!', bg: 'bg-[#BFDDF0]', textColor: 'text-[#1E4D7B]' },
              { emoji: 'fluent-emoji:high-voltage', title: 'Respon Instan', desc: 'Sistem langsung kasih tau kalau gerakanmu udah pas atau belum — nggak perlu nunggu!', bg: 'bg-[#A3CCE8]', textColor: 'text-[#0F2D4A]' },
              { emoji: 'fluent-emoji:joystick', title: 'Sistem Gamifikasi', desc: 'Poin, streak, badge, leaderboard — belajar jadi kayak main game!', bg: 'bg-[#4A8AB5]', textColor: 'text-white' },
              { emoji: 'fluent-emoji:people-hugging', title: 'Komunitas Ramah', desc: 'Belajar bareng teman Tuli dan Dengar. Saling support, saling semangatin!', bg: 'bg-[#1E4D7B]', textColor: 'text-white' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.01, rotate: i % 2 === 0 ? 1 : -1 }}
                className={`${item.bg} rounded-[2.5rem] p-8 border-b-[8px] border-black/15 flex flex-col md:flex-row gap-6 items-start`}
              >
                <Icon icon={item.emoji} className="w-14 h-14 flex-shrink-0" />
                <div>
                  <h3 className={`text-2xl font-black ${item.textColor} mb-2`}>{item.title}</h3>
                  <p className={`${item.textColor} opacity-80 font-bold text-base leading-relaxed`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-white py-24 px-6 border-y-4 border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 bg-white text-[#2D6A9F] font-black text-sm px-5 py-2 rounded-full border-4 border-[#BFDDF0] mb-4 max-w-fit mx-auto">
              <Icon icon="fluent-emoji:speech-balloon" className="w-5 h-5" /> Kata Teman-Teman
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800">
              Mereka Udah Buktiin!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Beneran seru banget! Aku ngerasa kayak lagi main game, padahal lagi belajar. Streak-ku udah 21 hari lho!", name: 'Aisyah', role: 'Pelajar SMA', img: 5, emoji: 'fluent-emoji:star-struck', color: 'yellow' },
              { text: "Akhirnya ada yang bikin belajar BISINDO jadi nggak boring. Gerakan tanganku makin jago sekarang!", name: 'Budi', role: 'Mahasiswa', img: 11, emoji: 'fluent-emoji:clapping-hands', color: 'blue' },
              { text: "Sebagai relawan Tuli, ini alat yang aku butuhin. Teman-temanku sekarang mau belajar sendiri pakai ini!", name: 'Rina', role: 'Relawan', img: 22, emoji: 'fluent-emoji:glowing-star', color: 'green' },
            ].map((t, i) => {
              const border = { 
                yellow: 'border-[#BFDDF0] bg-[#EAF6FD]', 
                blue: 'border-[#4A8AB5] bg-[#BFDDF0]/30', 
                green: 'border-[#2D6A9F] bg-[#A3CCE8]/30' 
              }[t.color]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotate: i === 1 ? 2 : -2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", bounce: 0.5 }}
                  whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
                  className={`rounded-[2.5rem] border-b-[8px] border-x-[4px] border-t-[4px] ${border} p-8 shadow-sm`}
                >
                  <Icon icon={t.emoji} className="w-12 h-12 mb-6" />
                  <p className="text-slate-700 font-bold text-base leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?img=${t.img}`} className="w-12 h-12 rounded-full border-4 border-white" alt={t.name} />
                    <div>
                      <p className="font-black text-slate-800">{t.name}</p>
                      <p className="text-sm font-bold text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-[#1E4D7B] py-32 px-6 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#2D6A9F] rounded-full -translate-y-1/2 translate-x-1/2 opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F2D4A] rounded-full translate-y-1/2 -translate-x-1/2 opacity-60" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="flex justify-center mb-6 text-[#BFDDF0]"
          >
            <Icon icon="fluent-emoji:people-with-bunny-ears" className="w-32 h-32" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            Mau Bisa Ngobrol<br />
            Sama Teman Tuli?<br />
            <span className="text-[#BFDDF0]">Mulai Sekarang!</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#A3CCE8] font-bold text-xl mb-10 max-w-xl mx-auto"
          >
            Gratis. Seru. Langsung jago. Tunggu apa lagi?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/register">
              <button className="px-12 py-6 text-2xl font-black bg-[#BFDDF0] text-[#0F2D4A] rounded-3xl border-b-[10px] border-[#4A8AB5] hover:bg-white active:border-b-2 active:translate-y-[8px] transition-all shadow-2xl flex items-center gap-3 mx-auto">
                YUK DAFTAR GRATIS! <Icon icon="fluent-emoji:rocket" className="w-8 h-8" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#1A3A5C] py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#BFDDF0]">
            <Icon icon="solar:gamepad-bold-duotone" className="w-10 h-10" />
            <span className="text-white font-black text-2xl">BISINDO <span className="text-[#BFDDF0]">Seru!</span></span>
          </div>
          <p className="text-slate-400 font-bold mb-6">Belajar bahasa isyarat Indonesia bareng-bareng, gratis, dan menyenangkan.</p>
          <div className="flex justify-center gap-8 text-slate-400 font-bold mb-8">
            <a href="#" className="hover:text-white transition-colors">Tentang Kami</a>
            <a href="#demo" className="hover:text-white transition-colors">Coba Main</a>
            <a href="#features" className="hover:text-white transition-colors">Fitur</a>
            <Link to="/login" className="hover:text-white transition-colors">Masuk</Link>
          </div>
          <p className="text-slate-500 text-sm font-bold">© 2025 BISINDO Seru! — Dibuat dengan ❤️ untuk semua orang</p>
        </div>
      </footer>
    </div>
  )
}
