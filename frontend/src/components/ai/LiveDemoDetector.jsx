import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
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
      // Draw playful, thick landmarks
      const landmarks = results.multiHandLandmarks[0]
      window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS, { color: '#ffffff', lineWidth: 8 })
      window.drawLandmarks(canvasCtx, landmarks, { color: '#f59e0b', lineWidth: 4, fillColor: '#fcd34d', radius: () => 6 })

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
    else if (straightCount === 2 && indexStraight && pinkyStraight && thumbExtended) { detected = "I Love You 🤟"; score = 99 }
    else if (straightCount === 4 && thumbExtended) { detected = "Halo! 🖐 / 5"; score = 98 }
    else if (straightCount === 1 && indexStraight && !thumbExtended) { detected = "1"; score = 95 }
    else if (straightCount === 2 && indexStraight && middleStraight && !thumbExtended) { detected = "2"; score = 95 }
    else if (straightCount === 3 && indexStraight && middleStraight && ringStraight && !thumbExtended) { detected = "3"; score = 92 }
    else if (straightCount === 4 && !thumbExtended) { detected = "4"; score = 94 }
    else if (straightCount === 0 && thumbExtended) { detected = "Jempol 👍 / 6"; score = 88 }
    else if (straightCount === 1 && indexStraight && thumbExtended) { detected = "7"; score = 85 }
    else if (straightCount === 2 && indexStraight && middleStraight && thumbExtended) { detected = "8"; score = 82 }
    else if (straightCount === 3 && indexStraight && middleStraight && ringStraight && thumbExtended) { detected = "9"; score = 80 }
    else if (straightCount === 1 && pinkyStraight && !thumbExtended) { detected = "Kelingking 🤙 / 10"; score = 85 }

    return { detectedSign: detected, confidence: Math.round(score + Math.random() * 5) }
  }

  return (
    <div className="relative aspect-video rounded-[2rem] bg-slate-100 overflow-hidden border-[6px] border-slate-200 flex items-center justify-center">
      
      {/* MediaPipe Video & Canvas */}
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" autoPlay playsInline muted></video>
      <canvas ref={canvasRef} width="1280" height="720" className="w-full h-full object-cover opacity-70"></canvas>

      {/* Overlays based on state */}
      <AnimatePresence>
        {status === 'stopped' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50 z-20 text-center p-6">
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mb-6 border-4 border-blue-200">
              <Icon icon="solar:camera-bold-duotone" className="w-14 h-14 text-blue-500" />
            </div>
            <h3 className="text-slate-800 font-black text-3xl mb-3 tracking-tight">Yuk, Coba Main!</h3>
            <p className="text-slate-500 font-bold max-w-sm mb-8">
              Buka kameramu dan coba ikuti gerakan bahasa isyarat. Tenang, aman kok!
            </p>
            <button onClick={startCamera} className="bg-blue-500 hover:bg-blue-400 text-white font-black px-10 py-4 rounded-2xl border-b-[6px] border-blue-700 active:border-b-0 active:translate-y-[6px] transition-all text-xl">
              Nyalakan Kamera
            </button>
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-blue-50 flex flex-col items-center justify-center z-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-8 border-blue-100 border-t-blue-500 rounded-full mb-6" />
            <p className="text-slate-600 font-black text-xl">Tunggu bentar ya...</p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-red-50 flex flex-col items-center justify-center z-20 text-center p-6">
            <Icon icon="solar:danger-triangle-bold-duotone" className="w-16 h-16 mb-4 text-red-500" />
            <h3 className="text-slate-800 font-black text-2xl mb-2">Aduh, Ada Masalah</h3>
            <p className="text-slate-600 font-bold mb-8 max-w-xs">{errorMessage}</p>
            <button onClick={startCamera} className="bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black px-8 py-4 rounded-2xl border-b-[6px] border-yellow-600 active:border-b-0 active:translate-y-[6px] transition-all">
              Coba Lagi
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun, Playful HUD */}
      {status === 'active' && (
        <div className="absolute inset-0 pointer-events-none z-30">
          
          {/* Top Left Motivation */}
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-4 left-4 md:top-6 md:left-6 bg-white px-5 py-3 rounded-2xl border-4 border-blue-200 flex flex-col gap-1 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Icon icon="solar:smile-circle-bold-duotone" className="w-6 h-6 text-blue-500" />
              <span className="text-slate-700 font-black text-sm md:text-base">Mulai Bergerak!</span>
            </div>
            <span className="text-blue-500 font-bold text-xs">Sistem siap merekam</span>
          </motion.div>

          {/* Top Right - Turn Off Camera Button */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-auto z-50">
            <button onClick={stopCamera} className="bg-red-500 hover:bg-red-400 text-white border-b-4 border-red-700 active:border-b-0 active:translate-y-1 px-4 py-2 font-black flex items-center gap-2 rounded-xl transition-all">
              <Icon icon="solar:videocamera-cross-bold" className="w-6 h-6" /> <span className="hidden md:inline">Stop</span>
            </button>
          </div>

          {/* Real-time Number Output Bubble */}
          <motion.div 
            animate={{ scale: detectedSign ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white px-8 py-4 rounded-3xl border-[6px] border-yellow-300 shadow-sm"
          >
            <Icon icon="solar:star-fall-bold-duotone" className="w-10 h-10 text-yellow-500" />
            <div className="flex flex-col">
              <span className="text-yellow-500 font-black text-sm mb-0.5">TERBACA:</span>
              <span className="text-3xl md:text-5xl font-black text-slate-800 leading-none">
                {detectedSign || "..."}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
