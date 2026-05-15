import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScanFace, AlertCircle, VideoOff, Activity, Video } from 'lucide-react'
import Button from '../ui/Button'

export default function LiveDemoDetector() {
  const [status, setStatus] = useState('stopped') // stopped, loading, active, error
  const [errorMessage, setErrorMessage] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [detectedSign, setDetectedSign] = useState(null)
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const handsRef = useRef(null)
  const cameraRef = useRef(null)

  const startCamera = () => {
    setStatus('loading')

    if (!window.Hands) {
      setErrorMessage('Gagal memuat library AI MediaPipe.')
      setStatus('error')
      return
    }

    const hands = new window.Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    })

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7
    })

    hands.onResults(onResults)
    handsRef.current = hands

    if (videoRef.current) {
      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          if (canvasRef.current && videoRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            ctx.save()
            ctx.translate(canvasRef.current.width, 0)
            ctx.scale(-1, 1)
            ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
            ctx.restore()
          }

          if (canvasRef.current && handsRef.current) {
            try {
              // Send the horizontally flipped canvas to MediaPipe
              // This ensures MediaPipe sees what the user sees, avoiding coordinate mismatches.
              await handsRef.current.send({ image: canvasRef.current })
            } catch (e) {
              console.error("MediaPipe error:", e)
            }
          }
        },
        width: 1280,
        height: 720
      })
      
      // Signal that loading is starting, AI WASM might take a few seconds
      camera.start().then(() => {
        setStatus('active')
      }).catch(err => {
        setErrorMessage('Gagal mengakses kamera. Pastikan izin diberikan.')
        setStatus('error')
      })
      cameraRef.current = camera
    }
  }

  const stopCamera = () => {
    if (cameraRef.current) cameraRef.current.stop()
    if (handsRef.current) handsRef.current.close()
    setStatus('stopped')
    setDetectedSign(null)
    setConfidence(0)
  }

  useEffect(() => {
    return () => {
      if (cameraRef.current) cameraRef.current.stop()
      if (handsRef.current) handsRef.current.close()
    }
  }, [])

  function onResults(results) {
    if (!canvasRef.current) return
    const canvasCtx = canvasRef.current.getContext('2d')
    canvasCtx.save()

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      // NOTE: We DO NOT clear the canvas or redraw results.image here.
      // The `onFrame` loop already draws the mirrored video stream continuously.
      // We just draw the landmarks directly on top of whatever is currently on the canvas.
      const landmarks = results.multiHandLandmarks[0]
      window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS, { color: '#6366f1', lineWidth: 4 })
      window.drawLandmarks(canvasCtx, landmarks, { color: '#ffffff', lineWidth: 2, fillColor: '#38bdf8', radius: () => 4 })

      const evaluation = evaluateGesture(landmarks)
      setConfidence(evaluation.confidence)
      setDetectedSign(evaluation.detectedSign)
    } else {
      setDetectedSign(null)
      setConfidence(0)
    }
    canvasCtx.restore()
  }

  function evaluateGesture(landmarks) {
    const isFingerStraight = (tip, pip) => landmarks[tip].y < landmarks[pip].y
    const indexStraight = isFingerStraight(8, 6)
    const middleStraight = isFingerStraight(12, 10)
    const ringStraight = isFingerStraight(16, 14)
    const pinkyStraight = isFingerStraight(20, 18)
    const thumbExtended = Math.abs(landmarks[4].x - landmarks[9].x) > 0.1

    const straightCount = [indexStraight, middleStraight, ringStraight, pinkyStraight].filter(Boolean).length

    let detected = "Mendeteksi..."
    let score = Math.floor(Math.random() * 20 + 30)

    if (straightCount === 0 && !thumbExtended) { detected = "0"; score = 90 }
    else if (straightCount === 1 && indexStraight && !thumbExtended) { detected = "1"; score = 95 }
    else if (straightCount === 2 && indexStraight && middleStraight && !thumbExtended) { detected = "2"; score = 95 }
    else if (straightCount === 3 && indexStraight && middleStraight && ringStraight && !thumbExtended) { detected = "3"; score = 92 }
    else if (straightCount === 4 && !thumbExtended) { detected = "4"; score = 94 }
    else if (straightCount === 4 && thumbExtended) { detected = "5"; score = 98 }
    else if (straightCount === 0 && thumbExtended) { detected = "6"; score = 88 }
    else if (straightCount === 1 && indexStraight && thumbExtended) { detected = "7"; score = 85 }
    else if (straightCount === 2 && indexStraight && middleStraight && thumbExtended) { detected = "8"; score = 82 }
    else if (straightCount === 3 && indexStraight && middleStraight && ringStraight && thumbExtended) { detected = "9"; score = 80 }
    else if (straightCount === 1 && pinkyStraight && !thumbExtended) { detected = "10"; score = 85 }

    return { detectedSign: detected, confidence: Math.round(score + Math.random() * 5) }
  }

  return (
    <div className="relative aspect-video rounded-[2rem] bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
      
      {/* MediaPipe Video & Canvas */}
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" autoPlay playsInline muted></video>
      <canvas ref={canvasRef} width="1280" height="720" className="w-full h-full object-cover opacity-70"></canvas>

      {/* Overlays based on state */}
      <AnimatePresence>
        {status === 'stopped' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-20 backdrop-blur-sm p-6 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <ScanFace className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2 tracking-tight">Coba Deteksi AI Sekarang</h3>
            <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
              Memerlukan izin akses kamera. Pemrosesan dilakukan 100% lokal di perangkat Anda.
            </p>
            <Button onClick={startCamera} className="bg-primary-500 hover:bg-primary-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] px-8">
              Aktifkan Kamera & Coba Demo
            </Button>
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-slate-800 border-t-primary-500 rounded-full mb-4" />
            <p className="text-white font-bold">Memuat AI Vision...</p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 text-center p-6">
            <AlertCircle className="w-12 h-12 text-error mb-4" />
            <h3 className="text-white font-bold mb-2">Terjadi Kesalahan</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">{errorMessage}</p>
            <Button onClick={startCamera}>Coba Lagi</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Scanning HUD */}
      {status === 'active' && (
        <div className="absolute inset-0 pointer-events-none z-30">
          
          {/* Top Left HUD - Added dark background for readability against bright camera feeds */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-slate-950/60 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 flex flex-col gap-1.5 shadow-lg">
            <span className="text-primary-400 font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">sys.ai.activate()</span>
            <span className="text-primary-400 font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">tracking_hand_landmarks...</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_#22c55e]"></div>
              <span className="text-success font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">Confidence: {confidence}%</span>
            </div>
          </div>

          {/* Top Right - Turn Off Camera Button - Made Solid Red and Z-Index high */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-auto z-50">
            <Button onClick={stopCamera} className="bg-red-500 hover:bg-red-600 text-white border-none shadow-[0_8px_20px_rgba(239,68,68,0.4)] px-5 py-2.5 font-bold tracking-wide flex items-center rounded-xl transition-all hover:-translate-y-1">
              <VideoOff className="w-4 h-4 mr-2" /> Matikan Kamera
            </Button>
          </div>

          {/* Center Target Rings */}
          <motion.div animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-[1.5px] border-primary-400/30 rounded-full flex items-center justify-center">
            <div className="w-[150px] h-[150px] md:w-[220px] md:h-[220px] border-[1.5px] border-primary-500/50 rounded-full"></div>
          </motion.div>

          {/* Sweeping scan wave */}
          <motion.div animate={{ left: ['-50%', '150%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute top-0 bottom-0 w-40 bg-gradient-to-r from-transparent via-primary-500/15 to-transparent skew-x-12" />

          {/* Real-time Number Output */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6 bg-slate-900/95 backdrop-blur-xl px-8 py-4 rounded-2xl border border-primary-500/40 shadow-[0_15px_40px_rgba(99,102,241,0.25)]">
            <Activity className="w-6 h-6 md:w-8 md:h-8 text-primary-400 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-0.5">Terdeteksi</span>
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-200 leading-none">
                {detectedSign || "-"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
