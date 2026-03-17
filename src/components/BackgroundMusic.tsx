import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasStarted = useRef(false)

  const musicUrl = '/preview-audio/m3.mp3'

  const fadeIn = () => {
    if (!audioRef.current) return
    const target = 0.7
    const duration = 2000
    const steps = 25
    const increment = target / steps
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      if (audioRef.current) audioRef.current.volume = current
      setVolume(current)
    }, interval)
  }

  const startPlay = async () => {
    if (hasStarted.current || !audioRef.current) return
    hasStarted.current = true
    audioRef.current.volume = 0
    try {
      await audioRef.current.play()
      setIsPlaying(true)
      fadeIn()
    } catch {
      hasStarted.current = false
    }
  }

  useEffect(() => {
    // Try immediate autoplay
    startPlay()

    // Fallback: play on first user interaction
    const onInteract = () => { startPlay() }
    document.addEventListener('click', onInteract, { once: true, passive: true })
    document.addEventListener('touchstart', onInteract, { once: true, passive: true })
    document.addEventListener('scroll', onInteract, { once: true, passive: true })
    document.addEventListener('keydown', onInteract, { once: true })

    return () => {
      document.removeEventListener('click', onInteract)
      document.removeEventListener('touchstart', onInteract)
      document.removeEventListener('scroll', onInteract)
      document.removeEventListener('keydown', onInteract)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed top-24 right-4 z-50"
      >
        <div className="glass-cosmic rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-cosmic-500 to-nebula-500 flex items-center justify-center text-white shadow-glow"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </motion.button>

            <div className="flex items-center space-x-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
              <input
                type="range" min="0" max="1" step="0.05" value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 rounded-lg appearance-none cursor-pointer slider"
                style={{ background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)` }}
              />
            </div>
          </div>

          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-white/10"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-1 bg-gradient-to-t from-cosmic-500 to-nebula-500 rounded-full"
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/70 font-mono">To The Moon</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        .slider::-webkit-slider-thumb { appearance: none; width: 12px; height: 12px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #ec4899); cursor: pointer; }
        .slider::-moz-range-thumb { width: 12px; height: 12px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #ec4899); cursor: pointer; border: none; }
      `}</style>
    </>
  )
}

export default BackgroundMusic
