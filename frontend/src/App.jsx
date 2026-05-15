import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import LearningDetail from './pages/LearningDetail'
import GestureDetection from './pages/GestureDetection'
import Progress from './pages/Progress'
import LearnCatalog from './pages/LearnCatalog'
import Achievement from './pages/Achievement'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import Pricing from './pages/Pricing'

function App() {
  // Apply global settings on app boot
  useEffect(() => {
    const saved = localStorage.getItem('bisindo_settings')
    if (saved) {
      const settings = JSON.parse(saved)
      if (settings['Mode Gelap (Dark Mode)']) document.documentElement.classList.add('dark-theme-filter')
      if (settings['Ukuran Teks Besar']) document.documentElement.classList.add('text-large-mode')
      if (settings['Gunakan Animasi Berkurang (Reduce Motion)']) document.documentElement.classList.add('reduce-motion-mode')
    }
  }, [])

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/learn" element={<ProtectedRoute><LearnCatalog /></ProtectedRoute>} />
        <Route path="/learn/:id" element={<ProtectedRoute><LearningDetail /></ProtectedRoute>} />
        <Route path="/gesture" element={<ProtectedRoute><GestureDetection /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/achievement" element={<ProtectedRoute><Achievement /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/upgrade" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
