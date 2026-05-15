import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, AlertCircle, ScanFace, Activity, VideoOff, Video, Zap, Star, Trophy, Target, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

// ─── BISINDO Modules (matches LearnCatalog) ──────────────────────────────────
const MODULES = [
  {
    id: 1, label: 'Kata Dasar BISINDO', emoji: '💬', color: 'from-primary-500 to-indigo-600',
    signs: [
      { id: 'halo',        label: 'Halo',         emoji: '👋', xp: 10, description: 'Lambaikan tangan terbuka menghadap depan.' },
      { id: 'terimakasih', label: 'Terima Kasih',  emoji: '🙏', xp: 15, description: 'Julurkan telapak tangan dari dagu ke depan.' },
      { id: 'maaf',        label: 'Maaf',          emoji: '😔', xp: 15, description: 'Kepalan tangan ditaruh di dada, condongkan badan.' },
      { id: 'tolong',      label: 'Tolong',        emoji: '🆘', xp: 15, description: 'Julurkan jempol ke atas, selebihnya mengepal.' },
      { id: 'ya',          label: 'Ya',            emoji: '✅', xp: 10, description: 'Kepalkan tangan dan gerakkan ke bawah.' },
    ]
  },
  {
    id: 2, label: 'Angka 1–10', emoji: '🔢', color: 'from-emerald-500 to-teal-600',
    signs: [
      { id: 'satu',   label: '1',  emoji: '1️⃣', xp: 8,  description: 'Telunjuk lurus ke atas, jari lain mengepal.' },
      { id: 'dua',    label: '2',  emoji: '2️⃣', xp: 8,  description: 'Telunjuk + jari tengah lurus ke atas.' },
      { id: 'tiga',   label: '3',  emoji: '3️⃣', xp: 8,  description: 'Telunjuk + tengah + manis lurus ke atas.' },
      { id: 'empat',  label: '4',  emoji: '4️⃣', xp: 8,  description: 'Empat jari lurus ke atas, jempol mengepal.' },
      { id: 'lima',   label: '5',  emoji: '5️⃣', xp: 8,  description: 'Semua jari terbuka menghadap depan.' },
      { id: 'enam',   label: '6',  emoji: '6️⃣', xp: 10, description: 'Jempol dan kelingking terbuka, jari lain mengepal.' },
      { id: 'tujuh',  label: '7',  emoji: '7️⃣', xp: 10, description: 'Jempol, telunjuk, kelingking terbuka.' },
      { id: 'delapan',label: '8',  emoji: '8️⃣', xp: 10, description: 'Jempol, telunjuk, tengah, kelingking terbuka.' },
      { id: 'sembilan',label: '9', emoji: '9️⃣', xp: 10, description: 'Semua jari kecuali kelingking terbuka.' },
      { id: 'sepuluh',label: '10', emoji: '🔟', xp: 12, description: 'Kelingking saja yang tegak lurus ke atas.' },
    ]
  },
  {
    id: 3, label: 'Keluarga & Relasi', emoji: '👨‍👩‍👧', color: 'from-pink-500 to-rose-600',
    signs: [
      { id: 'ayah',   label: 'Ayah',   emoji: '👨', xp: 12, description: 'Jempol terbuka di sisi kanan kepala.' },
      { id: 'ibu',    label: 'Ibu',    emoji: '👩', xp: 12, description: 'Kelingking terbuka di sisi kanan kepala.' },
      { id: 'kakak',  label: 'Kakak',  emoji: '🧑', xp: 12, description: 'Telunjuk mengarah ke atas-depan.' },
      { id: 'adik',   label: 'Adik',   emoji: '🧒', xp: 12, description: 'Telunjuk mengarah ke bawah-depan.' },
      { id: 'teman',  label: 'Teman',  emoji: '🤝', xp: 15, description: 'Kedua tangan menggenggam jempol masing-masing.' },
    ]
  },
  {
    id: 4, label: 'Waktu & Hari', emoji: '🕐', color: 'from-amber-500 to-orange-600',
    signs: [
      { id: 'pagi',   label: 'Pagi',   emoji: '🌅', xp: 10, description: 'Gerakan tangan dari bawah ke atas seperti matahari terbit.' },
      { id: 'siang',  label: 'Siang',  emoji: '☀️',  xp: 10, description: 'Telapak tangan menghadap ke bawah di atas kepala.' },
      { id: 'malam',  label: 'Malam',  emoji: '🌙', xp: 10, description: 'Kedua tangan disilangkan di depan dada.' },
      { id: 'hari',   label: 'Hari',   emoji: '📅', xp: 12, description: 'Jempol dan telunjuk membentuk lingkaran kecil.' },
      { id: 'minggu', label: 'Minggu', emoji: '🗓️', xp: 12, description: 'Telapak tangan terbuka berputar searah jarum jam.' },
    ]
  },
  {
    id: 5, label: 'Emosi & Perasaan', emoji: '😊', color: 'from-violet-500 to-purple-600',
    signs: [
      { id: 'senang',  label: 'Senang',  emoji: '😄', xp: 12, description: 'Telapak tangan melingkar di pipi dan senyum.' },
      { id: 'sedih',   label: 'Sedih',   emoji: '😢', xp: 12, description: 'Jari telunjuk menelusuri pipi ke bawah (air mata).' },
      { id: 'marah',   label: 'Marah',   emoji: '😠', xp: 12, description: 'Kepalan tangan diangkat dengan ekspresi tegas.' },
      { id: 'takut',   label: 'Takut',   emoji: '😨', xp: 12, description: 'Kedua tangan melindungi wajah sambil sedikit gemetar.' },
      { id: 'iloveyou',label: 'I Love You', emoji: '🤟', xp: 20, description: 'Rentangkan jempol, telunjuk, dan kelingking.' },
    ]
  },
  {
    id: 6, label: 'Tanya Jawab', emoji: '❓', color: 'from-cyan-500 to-sky-600',
    signs: [
      { id: 'apa',    label: 'Apa?',   emoji: '🤷', xp: 12, description: 'Kedua tangan terbuka menghadap ke atas.' },
      { id: 'siapa',  label: 'Siapa?', emoji: '👤', xp: 12, description: 'Telunjuk menunjuk ke arah orang lain.' },
      { id: 'dimana', label: 'Di mana?',emoji: '📍', xp: 12, description: 'Telunjuk menunjuk ke bawah berputar kecil.' },
      { id: 'kapan',  label: 'Kapan?', emoji: '⏰', xp: 12, description: 'Jempol dan telunjuk membentuk lingkaran di pergelangan.' },
      { id: 'tidak',  label: 'Tidak',  emoji: '❌', xp: 10, description: 'Rentangkan telunjuk dan ayunkan ke kiri-kanan.' },
      { id: 'ya',     label: 'Ya',     emoji: '✅', xp: 10, description: 'Kepalkan tangan dan gerakkan ke bawah.' },
    ]
  },
]

// Flat list for gesture evaluator lookup
const ALL_SIGNS = MODULES.flatMap(m => m.signs)

// ─── Gesture Evaluator ────────────────────────────────────────────────────────
function evaluateBisindoGesture(landmarks, activeSignIds) {
  const isFingerStraight = (tip, pip) => landmarks[tip].y < landmarks[pip].y
  const index  = isFingerStraight(8,  6)
  const middle = isFingerStraight(12, 10)
  const ring   = isFingerStraight(16, 14)
  const pinky  = isFingerStraight(20, 18)
  const thumbExtended = Math.abs(landmarks[4].x - landmarks[9].x) > 0.1
  const count = [index, middle, ring, pinky].filter(Boolean).length

  const candidates = [
    { id: 'halo',        match: count === 4 && thumbExtended,                               conf: 94 },
    { id: 'iloveyou',    match: !middle && !ring && index && pinky && thumbExtended,         conf: 91 },
    { id: 'baik',        match: count === 0 && thumbExtended,                               conf: 92 },
    { id: 'tidak',       match: count === 1 && index && !thumbExtended,                     conf: 88 },
    { id: 'ya',          match: count === 0 && !thumbExtended,                              conf: 87 },
    { id: 'tolong',      match: count === 2 && index && middle && !ring && !pinky && !thumbExtended, conf: 85 },
    { id: 'maaf',        match: count === 3 && index && middle && ring && !thumbExtended,   conf: 83 },
    { id: 'terimakasih', match: count === 4 && !thumbExtended,                              conf: 86 },
    // Numbers
    { id: 'satu',        match: count === 1 && index && !thumbExtended,                     conf: 90 },
    { id: 'dua',         match: count === 2 && index && middle && !ring && !pinky && !thumbExtended, conf: 90 },
    { id: 'tiga',        match: count === 3 && index && middle && ring && !pinky && !thumbExtended, conf: 89 },
    { id: 'empat',       match: count === 4 && !thumbExtended,                              conf: 88 },
    { id: 'lima',        match: count === 4 && thumbExtended,                               conf: 92 },
    { id: 'enam',        match: count === 0 && thumbExtended && pinky,                      conf: 85 },
    { id: 'tujuh',       match: index && !middle && !ring && pinky && thumbExtended,        conf: 84 },
    { id: 'delapan',     match: index && middle && !ring && pinky && thumbExtended,         conf: 83 },
    { id: 'sembilan',    match: index && middle && ring && !pinky && thumbExtended,         conf: 82 },
    { id: 'sepuluh',     match: count === 1 && pinky && !index && !thumbExtended,           conf: 85 },
    // Emotions/others – mapped to hand shapes
    { id: 'senang',      match: count === 4 && thumbExtended,                               conf: 80 },
    { id: 'sedih',       match: count === 1 && index && thumbExtended,                      conf: 80 },
    { id: 'apa',         match: count === 4 && thumbExtended,                               conf: 80 },
    { id: 'siapa',       match: count === 1 && index && !thumbExtended,                     conf: 80 },
    { id: 'dimana',      match: count === 1 && index && !thumbExtended,                     conf: 80 },
    { id: 'kapan',       match: count === 0 && thumbExtended,                               conf: 80 },
  ]

  // Only check signs relevant to active module
  for (const c of candidates) {
    if (activeSignIds.includes(c.id) && c.match) {
      return { id: c.id, confidence: c.conf + Math.floor(Math.random() * 5) }
    }
  }
  return { id: null, confidence: Math.floor(Math.random() * 20 + 20) }
}

// ─── Face Expression Evaluator (FaceMesh 468 landmarks) ─────────────────────
// Used exclusively for Module 5: Emosi & Perasaan
function evaluateFaceExpression(faceLandmarks) {
  const lm = faceLandmarks

  // ── Key landmark indices ──────────────────────────────────────────────────
  // Mouth: upper=13, lower=14, left-corner=61, right-corner=291
  // Left eye: top=159, bottom=145  |  Right eye: top=386, bottom=374
  // Left eyebrow inner: 107        |  Right eyebrow inner: 336
  // Left eye inner corner: 133     |  Right eye inner corner: 362
  // Nose tip: 4

  const mouthOpen   = Math.abs(lm[14].y - lm[13].y)       // mouth vertical gap
  const mouthWidth  = Math.abs(lm[291].x - lm[61].x)      // mouth horizontal width
  const leftEyeH    = Math.abs(lm[159].y - lm[145].y)     // left eye open height
  const rightEyeH   = Math.abs(lm[386].y - lm[374].y)     // right eye open height
  const eyeOpen     = (leftEyeH + rightEyeH) / 2

  // Eyebrow raise (positive = raised above eye)
  const leftBrowRaise  = lm[107].y - lm[159].y   // negative = raised
  const rightBrowRaise = lm[336].y - lm[386].y
  const browRaise      = -((leftBrowRaise + rightBrowRaise) / 2)  // positive = raised

  // Eyebrow furrow (inner brows coming together → anger)
  const browFurrow = Math.abs(lm[107].x - lm[336].x)  // small = furrowed

  // ── Rules (tuned to normalized 0..1 landmark space) ──────────────────────
  // 😄 Senang: wide mouth + moderately open
  if (mouthWidth > 0.28 && mouthOpen > 0.02) {
    return { id: 'senang', confidence: Math.min(95, Math.round(mouthWidth * 300)) }
  }

  // 😢 Sedih: mouth narrow + brows slightly raised + eyes semi-open
  if (mouthWidth < 0.22 && mouthOpen < 0.02 && browRaise > 0.005) {
    return { id: 'sedih', confidence: 82 }
  }

  // 😠 Marah: brows furrowed (inner close) + mouth tight
  if (browFurrow < 0.06 && mouthOpen < 0.015) {
    return { id: 'marah', confidence: 85 }
  }

  // 😨 Takut: eyes wide + brows raised + mouth open
  if (eyeOpen > 0.04 && browRaise > 0.008 && mouthOpen > 0.025) {
    return { id: 'takut', confidence: 84 }
  }

  // 😮 Surprise (mouth very open) - map to takut too
  if (mouthOpen > 0.06) {
    return { id: 'takut', confidence: 80 }
  }

  return { id: null, confidence: 30 }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GestureDetection() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [status,        setStatus]        = useState('stopped')
  const [errorMessage,  setErrorMessage]  = useState('')
  const [confidence,    setConfidence]    = useState(0)
  const [detectedId,    setDetectedId]    = useState(null)
  const [activeModule,  setActiveModule]  = useState(() => {
    const m = parseInt(searchParams.get('module') || '0')
    return m >= 0 && m < MODULES.length ? m : 0
  })
  const [currentTarget, setCurrentTarget] = useState(0)        // index in active module signs
  const [points,        setPoints]        = useState(0)
  const [completedIds,  setCompletedIds]  = useState([])       // completed sign IDs across all modules
  const [showSuccess,   setShowSuccess]   = useState(false)
  const [successSign,   setSuccessSign]   = useState(null)

  const SIGNS = MODULES[activeModule].signs
  const activeSignIds = SIGNS.map(s => s.id)

  const videoRef         = useRef(null)
  const canvasRef        = useRef(null)
  const handsRef         = useRef(null)
  const faceMeshRef      = useRef(null)   // FaceMesh engine (Module 5 only)
  const cameraRef        = useRef(null)
  const holdTimer        = useRef(null)
  const activeSignIdsRef = useRef([])
  const currentTargetRef = useRef(0)
  const signsRef         = useRef([])
  const isMountedRef     = useRef(true)
  const faceResultRef    = useRef(null)   // latest face result for merge

  // Keep refs in sync with state so MediaPipe callbacks always see latest values
  activeSignIdsRef.current = activeSignIds
  signsRef.current = SIGNS
  currentTargetRef.current = currentTarget
  // Load saved points for this user
  useEffect(() => {
    if (user?.id) {
      const saved = localStorage.getItem(`ai_points_${user.id}`)
      if (saved) setPoints(parseInt(saved))
    }
  }, [user])

  // ── Camera & MediaPipe init ──
  const USE_FACE_MODULE = 4  // 0-indexed index of Modul 5 (Emosi)

  const startCamera = () => {
    if (!window.Hands) { setErrorMessage('Gagal memuat library AI MediaPipe.'); setStatus('error'); return }
    setStatus('loading')

    // ── Hands engine (always active) ──────────────────────────────────────
    const hands = new window.Hands({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` })
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.5
    })
    hands.onResults(onResults)
    handsRef.current = hands

    // ── FaceMesh engine (Module 5 only) ──────────────────────────────────
    const isEmotionModule = activeModule === USE_FACE_MODULE
    if (isEmotionModule && window.FaceMesh) {
      const faceMesh = new window.FaceMesh({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}` })
      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      })
      faceMesh.onResults((res) => {
        if (res.multiFaceLandmarks?.length > 0) {
          faceResultRef.current = res.multiFaceLandmarks[0]
          // Draw face mesh overlay on canvas
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            ctx.save()
            ctx.translate(canvasRef.current.width, 0)
            ctx.scale(-1, 1)
            window.drawConnectors(ctx, res.multiFaceLandmarks[0], window.FACEMESH_TESSELATION, { color: '#6366f120', lineWidth: 1 })
            window.drawConnectors(ctx, res.multiFaceLandmarks[0], window.FACEMESH_CONTOURS, { color: '#6366f160', lineWidth: 1.5 })
            ctx.restore()
          }
        } else {
          faceResultRef.current = null
        }
      })
      faceMeshRef.current = faceMesh
    }

    if (videoRef.current) {
      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          // 1) Draw mirrored video to canvas FIRST (background layer)
          if (canvasRef.current && videoRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            ctx.save(); ctx.translate(canvasRef.current.width, 0); ctx.scale(-1, 1)
            ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
            ctx.restore()
          }
          // 2) Send raw video to MediaPipe → onResults draws landmarks ON TOP
          if (videoRef.current && handsRef.current && isMountedRef.current) {
            try { await handsRef.current.send({ image: videoRef.current }) } catch (e) {}
          }
          if (videoRef.current && faceMeshRef.current && isMountedRef.current) {
            try { await faceMeshRef.current.send({ image: videoRef.current }) } catch (e) {}
          }
        },
        width: 1280, height: 720
      })
      camera.start()
        .then(() => { if (isMountedRef.current) setStatus('active') })
        .catch(() => { if (isMountedRef.current) { setErrorMessage('Gagal mengakses kamera.'); setStatus('error') } })
      cameraRef.current = camera
    }
  }

  // Safe stop — no setState calls
  const stopCameraRaw = () => {
    clearTimeout(holdTimer.current)
    holdTimer.current = null
    try { if (cameraRef.current) { cameraRef.current.stop(); cameraRef.current = null } } catch (e) {}
    try { if (handsRef.current) { handsRef.current.close(); handsRef.current = null } } catch (e) {}
    try { if (faceMeshRef.current) { faceMeshRef.current.close(); faceMeshRef.current = null } } catch (e) {}
    try { if (canvasRef.current) canvasRef.current.getContext('2d').clearRect(0, 0, 1280, 720) } catch (e) {}
    faceResultRef.current = null
  }

  const stopCamera = () => {
    stopCameraRaw()
    if (isMountedRef.current) { setStatus('stopped'); setDetectedId(null); setConfidence(0) }
  }

  // ✅ Safe exit — stop camera first, then navigate
  const handleExit = () => {
    stopCameraRaw()
    navigate('/dashboard')
  }

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      stopCameraRaw()
    }
  }, [])

  // ── AI Results (Hands + Face fallback) ──
  function onResults(results) {
    if (!canvasRef.current || !isMountedRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    ctx.save()

    const signs = signsRef.current
    const target = signs[currentTargetRef.current]

    if (results.multiHandLandmarks?.length > 0) {
      // ── Hand detected ─────────────────────────────────────────────────────
      const landmarks = results.multiHandLandmarks[0]
      ctx.save()
      ctx.translate(canvasRef.current.width, 0)
      ctx.scale(-1, 1)
      window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, { color: '#6366f1', lineWidth: 4 })
      window.drawLandmarks(ctx, landmarks, { color: '#fff', lineWidth: 2, fillColor: '#38bdf8', radius: () => 4 })
      ctx.restore()

      const { id, confidence: conf } = evaluateBisindoGesture(landmarks, activeSignIdsRef.current)
      setConfidence(conf)
      setDetectedId(id)

      if (target && id === target.id && conf >= 80) {
        if (!holdTimer.current) {
          holdTimer.current = setTimeout(() => { triggerSuccess(target); holdTimer.current = null }, 1200)
        }
      } else {
        clearTimeout(holdTimer.current); holdTimer.current = null
      }
    } else {
      // ── No hand: try face expression (Module 5 Emosi only) ────────────────
      const faceLm = faceResultRef.current
      if (faceLm && activeModule === USE_FACE_MODULE) {
        const { id, confidence: conf } = evaluateFaceExpression(faceLm)
        setConfidence(conf)
        setDetectedId(id)

        if (target && id === target.id && conf >= 75) {
          if (!holdTimer.current) {
            holdTimer.current = setTimeout(() => { triggerSuccess(target); holdTimer.current = null }, 1500)
          }
        } else {
          clearTimeout(holdTimer.current); holdTimer.current = null
        }
      } else {
        setDetectedId(null); setConfidence(0)
        clearTimeout(holdTimer.current); holdTimer.current = null
      }
    }
    ctx.restore()
  }

  // ── Success Handler ──
  function triggerSuccess(sign) {
    const newPoints = points + sign.xp
    setPoints(newPoints)
    if (user?.id) localStorage.setItem(`ai_points_${user.id}`, newPoints)

    setCompletedIds(prev => [...new Set([...prev, sign.id])])
    setSuccessSign(sign)
    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
      // Move to next sign
      setCurrentTarget(prev => (prev + 1) % SIGNS.length)
    }, 2500)
  }

  const target = SIGNS[Math.min(currentTarget, SIGNS.length - 1)]
  const detectedSign = SIGNS.find(s => s.id === detectedId)
  const moduleCompletedIds = completedIds.filter(id => SIGNS.some(s => s.id === id))
  const progressPct = Math.round((moduleCompletedIds.length / SIGNS.length) * 100)

  const switchModule = (idx) => {
    setActiveModule(idx)
    setCurrentTarget(0)
    setDetectedId(null)
    setConfidence(0)
    setShowModulePicker(false)
  }

  const [showModulePicker, setShowModulePicker] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-primary-500 selection:text-white">

      {/* ── Navbar ── */}
      <header className="h-20 border-b border-white/10 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={handleExit} className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors" title="Keluar">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-8 w-px bg-white/10"></div>
          {/* Active module chip */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${MODULES[activeModule].color} shadow-lg`}>
            <span className="text-lg">{MODULES[activeModule].emoji}</span>
            <span className="text-white font-bold text-sm hidden sm:block">{MODULES[activeModule].label}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Points Badge */}
          <div className="hidden md:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-amber-300 font-black text-lg">{points}</span>
            <span className="text-amber-400/60 text-xs font-bold uppercase">XP</span>
          </div>

          <div className={`hidden md:flex items-center gap-2`}>
            <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></div>
            <span className="text-slate-300 text-sm font-bold tracking-wide uppercase">
              {status === 'active' ? 'AI Aktif' : 'AI Offline'}
            </span>
          </div>
          <div className="h-8 w-px bg-white/10"></div>
          <Button
            onClick={status === 'active' ? stopCamera : startCamera}
            variant={status === 'active' ? 'outline' : 'primary'}
            size="sm"
            className={status === 'active' ? "border-red-500/40 text-red-400 hover:bg-red-500/10" : ""}
          >
            {status === 'active'
              ? <><VideoOff className="w-4 h-4 mr-2" /> Matikan Kamera</>
              : <><Video className="w-4 h-4 mr-2" /> Nyalakan Kamera</>}
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* ── Left: Camera View ── */}
        <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8 bg-slate-950">
          <div className="w-full max-w-4xl relative aspect-video rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)]">

            <video ref={videoRef} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" autoPlay playsInline muted />
            <canvas ref={canvasRef} width="1280" height="720" className="w-full h-full object-cover" />

            {/* HUD Corners */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-primary-500/60 rounded-tl-2xl" />
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-primary-500/60 rounded-tr-2xl" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-primary-500/60 rounded-bl-2xl" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-primary-500/60 rounded-br-2xl" />

              {/* Scan wave */}
              {status === 'active' && (
                <motion.div
                  animate={{ top: ['-20%', '120%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-primary-500/15 to-transparent mix-blend-screen"
                />
              )}

              {/* Live detection badge */}
              <AnimatePresence>
                {detectedSign && status === 'active' && (
                  <motion.div
                    key={detectedSign.id}
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-3 shadow-xl"
                  >
                    <Activity className={`w-4 h-4 ${confidence >= 80 ? 'text-green-400' : 'text-amber-400'}`} />
                    <span className="text-white font-bold text-sm">
                      {detectedSign.emoji} {detectedSign.label}
                    </span>
                    <span className={`font-mono font-black text-sm px-2 py-0.5 rounded-md ${confidence >= 80 ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {confidence}%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Stopped overlay ── */}
            {status === 'stopped' && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 z-20">
                <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center mb-6 border border-primary-500/20">
                  <ScanFace className="w-10 h-10 text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Siap Berlatih?</h3>
                <p className="text-slate-400 font-medium mb-8 max-w-sm">Nyalakan kamera untuk memulai sesi latihan isyarat BISINDO dengan AI real-time.</p>
                <Button onClick={startCamera} className="px-10 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                  <Video className="w-4 h-4 mr-2" /> Mulai Latihan AI
                </Button>
              </div>
            )}

            {/* ── Loading overlay ── */}
            {status === 'loading' && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-slate-800 border-t-primary-500 rounded-full mb-6" />
                <h3 className="text-xl font-bold text-white">Memuat AI Vision...</h3>
                <p className="text-slate-400 text-sm mt-2">Menginisialisasi MediaPipe Hands</p>
              </div>
            )}

            {/* ── Error overlay ── */}
            {status === 'error' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-20">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Kamera Tidak Tersedia</h3>
                <p className="text-slate-400 mb-8">{errorMessage}</p>
                <Button onClick={() => window.location.reload()}>Coba Ulang</Button>
              </div>
            )}

            {/* ── Success Popup ── */}
            <AnimatePresence>
              {showSuccess && successSign && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                >
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-green-500/30 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-[0_0_80px_rgba(34,197,94,0.2)]">
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.15 }}
                      className="text-7xl mb-4"
                    >{successSign.emoji}</motion.div>
                    <h2 className="text-3xl font-black text-white mb-1">{successSign.label}!</h2>
                    <p className="text-slate-400 font-medium mb-6">Isyarat berhasil dikenali</p>
                    <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-6 py-3 rounded-full">
                      <Zap className="w-5 h-5 text-amber-400" />
                      <span className="text-amber-300 font-black text-xl">+{successSign.xp} XP</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right: Panel ── */}
        <div className="w-full lg:w-[420px] xl:w-[480px] bg-slate-900 border-l border-white/10 flex flex-col shrink-0 relative">

          {/* Panel header: Module info + switcher */}
          <div className="p-5 border-b border-white/10 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${MODULES[activeModule].color} flex items-center justify-center text-xl shadow-lg`}>
                  {MODULES[activeModule].emoji}
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Modul Aktif</p>
                  <h3 className="text-white font-bold text-sm leading-tight">{MODULES[activeModule].label}</h3>
                  {/* AI Engine badge */}
                  <div className="flex items-center gap-1 mt-0.5">
                    {activeModule === USE_FACE_MODULE ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                        😊 FaceMesh + ✋ Tangan
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30">
                        ✋ Hand Detection
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowModulePicker(p => !p)}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-white/5"
              >
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showModulePicker ? 'rotate-90' : ''}`} />
                Ganti Modul
              </button>
            </div>

            {/* Module picker dropdown */}
            <AnimatePresence>
              {showModulePicker && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-4 right-4 top-[calc(100%+8px)] z-50 bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                >
                  {MODULES.map((mod, idx) => (
                    <button
                      key={mod.id}
                      onClick={() => switchModule(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-slate-700 ${
                        activeModule === idx ? 'bg-slate-700/80' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center text-base shrink-0`}>
                        {mod.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm truncate ${activeModule === idx ? 'text-white' : 'text-slate-300'}`}>{mod.label}</p>
                        <p className="text-slate-500 text-xs">{mod.signs.length} isyarat</p>
                      </div>
                      {activeModule === idx && (
                        <div className="w-2 h-2 rounded-full bg-primary-400 shrink-0"></div>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-white/10">
                    <button
                      onClick={handleExit}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="font-bold text-sm">Kembali ke Dashboard</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-5 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-500/10 text-primary-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Target className="w-3.5 h-3.5" /> Target Sekarang
            </div>
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-white/5 flex items-center gap-4">
              <div className="text-4xl">{target.emoji}</div>
              <div>
                <h3 className="text-white font-black text-xl mb-0.5">{target.label}</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{target.description}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-amber-400 font-bold text-xs">+{target.xp} XP jika berhasil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scoreboard */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-300 font-bold text-xs uppercase tracking-widest">Progres Modul Ini</h3>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 font-black text-lg">{points} XP</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-bold">{moduleCompletedIds.length}/{SIGNS.length} Isyarat</span>
              <span className="text-primary-400 text-xs font-bold">{progressPct}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary-600 to-indigo-400 rounded-full shadow-[0_0_10px_#6366f1]"
              />
            </div>
          </div>

          {/* Sign List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest px-2 mb-3">Semua Isyarat</h3>
            {SIGNS.map((sign, idx) => {
              const done = completedIds.includes(sign.id)
              const isTarget = idx === currentTarget
              return (
                <motion.div
                  key={sign.id}
                  onClick={() => !done && setCurrentTarget(idx)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all cursor-pointer ${
                    isTarget ? 'bg-primary-500/15 border border-primary-500/30' :
                    done ? 'bg-green-500/10 border border-green-500/20 opacity-60' :
                    'bg-slate-800/50 border border-transparent hover:border-white/10 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-2xl">{sign.emoji}</span>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${isTarget ? 'text-white' : done ? 'text-green-400' : 'text-slate-300'}`}>{sign.label}</p>
                    <p className="text-slate-500 text-xs font-medium">+{sign.xp} XP</p>
                  </div>
                  {done
                    ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    : isTarget
                    ? <ChevronRight className="w-5 h-5 text-primary-400 shrink-0" />
                    : <div className="w-5 h-5 rounded-full border border-slate-600 shrink-0" />
                  }
                </motion.div>
              )
            })}
          </div>

          {/* Tips */}
          <div className="p-5 border-t border-white/10">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tips AI Detection</h4>
            <ul className="space-y-2">
              {['Pastikan tangan terlihat jelas di layar.', 'Cari tempat dengan pencahayaan cukup.', 'Tahan posisi 1-2 detik agar AI memproses.'].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400 text-xs font-medium">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                    <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
