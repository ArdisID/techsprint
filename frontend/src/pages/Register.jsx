import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password_confirmation) {
      return setError('Konfirmasi kata sandi tidak cocok')
    }

    setIsLoading(true)
    
    try {
      await register(formData.name, formData.email, formData.password, formData.password_confirmation)
      navigate('/login', { state: { message: 'Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.' } })
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mendaftar.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left side - Image/Decoration */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary-900/60 to-primary-900/60 z-10 mix-blend-multiply"></div>
        <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Learning together" />
        
        <div className="relative z-20 max-w-lg text-center backdrop-blur-md bg-white/10 p-10 rounded-3xl border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Mulai Perjalanan Visual Anda.
          </h2>
          <p className="text-white/80">
            Akses ke ratusan modul pembelajaran interaktif dan feedback AI real-time.
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24">
        <div className="flex justify-end w-full mb-12">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-bold text-lg text-slate-900 group-hover:text-primary-500 transition-colors">BISINDO.AI</span>
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full ml-auto mr-auto lg:ml-0"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Buat Akun Baru</h1>
          <p className="text-slate-500 mb-8">Daftar sekarang dan mulai belajar hari ini secara gratis.</p>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900"
                  placeholder="Nama Anda"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900"
                  placeholder="Min. 8 karakter"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input 
                  type="password" 
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900"
                  placeholder="Ulangi kata sandi"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={isLoading} className="w-full justify-center group">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Buat Akun <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">Masuk di sini</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
