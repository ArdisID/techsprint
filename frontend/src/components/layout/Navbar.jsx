import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function Navbar({ transparentDark = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Tentang Kami', path: '/#problem' },
    { name: 'Coba Main!', path: '/#demo' },
    { name: 'Keseruan', path: '/#features' },
  ]

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className={`max-w-6xl mx-auto transition-all duration-300 ${scrolled ? 'bg-white border-[4px] border-slate-200 shadow-sm rounded-[2rem] px-6 py-3' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${!scrolled && transparentDark ? 'bg-white/20' : 'bg-[#EAF6FD]'}`}>
              <Icon icon="fluent-emoji:video-game" className="w-8 h-8" />
            </div>
            <span className={`font-black text-2xl tracking-tight ${!scrolled && transparentDark ? 'text-white' : 'text-slate-800'}`}>
              BISINDO<span className="text-[#2D6A9F]">Seru!</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.path.replace('/', '')}
                  className={`text-base font-black transition-all ${!scrolled && transparentDark ? 'text-slate-200 hover:text-white' : 'text-slate-500 hover:text-[#2D6A9F] hover:-translate-y-1 inline-block'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <button className={`px-6 py-3 font-black rounded-2xl transition-all ${!scrolled && transparentDark ? 'text-white hover:bg-white/10' : 'text-slate-500 hover:text-purple-500 hover:bg-slate-100'}`}>
                  Masuk
                </button>
              </Link>
              <Link to="/register">
                <button className={!scrolled && transparentDark ? "bg-yellow-400 hover:bg-yellow-500 text-yellow-950 border-b-4 border-yellow-600 font-black rounded-2xl active:translate-y-1 active:border-b-0 transition-all px-6 py-3" : "bg-[#2D6A9F] hover:bg-[#3A7AB5] text-white font-black rounded-2xl border-b-[4px] border-[#1A4E7A] active:border-b-0 active:translate-y-[4px] transition-all px-6 py-3"}>
                  Mulai Main!
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 active:scale-95 transition-transform ${!scrolled && transparentDark ? 'text-white' : 'text-slate-600'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Icon icon="solar:close-square-bold-duotone" className="w-10 h-10 text-red-500" /> : <Icon icon="solar:hamburger-menu-bold-duotone" className="w-10 h-10 text-[#2D6A9F]" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.path.replace('/', '')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-slate-700 hover:text-primary-500 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <div className="flex flex-col gap-3 p-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-slate-100 text-slate-700 font-black py-4 rounded-2xl">Masuk ke Akun</button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-green-500 text-white border-b-4 border-green-700 active:border-b-0 active:translate-y-1 font-black py-4 rounded-2xl">Mulai Main Gratis</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
