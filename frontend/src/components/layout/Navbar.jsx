import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import Button from '../ui/Button'

export default function Navbar() {
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
    { name: 'Masalah', path: '/#problem' },
    { name: 'Demo AI', path: '/#demo' },
    { name: 'Fitur', path: '/#features' },
  ]

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-primary-400" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              BISINDO<span className="text-primary-500">.AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.path.replace('/', '')}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors">
                Masuk
              </Link>
              <Link to="/register">
                <Button size="sm" className="shadow-[0_4px_15px_rgba(99,102,241,0.2)]">Mulai Belajar</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-600 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
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
                  <Button variant="outline" className="w-full">Masuk ke Akun</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Mulai Belajar Gratis</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
