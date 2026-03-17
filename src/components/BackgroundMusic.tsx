import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasStarted = useRef(false)

  const musicUrl = '/preview-audio/m3.mp3'

  const fadeIn = useCallback(() => {
    if (!audioRef.current) return
    const target = 0.5 // Giảm volume từ 0.7 xuống 0.5
    const duration = 1500 // Giảm thời gian fade từ 2000ms xuống 1500ms
    const steps = 20
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
    }, interval)
  }, [])

  const startPlay = useCallback(async () => {
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
  }, [fadeIn])

  useEffect(() => {
    // Chỉ thử autoplay khi user tương tác
    const onInteract = () => { startPlay() }
    document.addEventListener('click', onInteract, { once: true, passive: true })
    document.addEventListener('touchstart', onInteract, { once: true, passive: true })
    document.addEventListener('scroll', onInteract, { once: true, passive: true })

    return () => {
      document.removeEventListener('click', onInteract)
      document.removeEventListener('touchstart', onInteract)
      document.removeEventListener('scroll', onInteract)
    }
  }, [startPlay])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error)
    }
  }, [isPlaying])

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="metadata" // Thay đổi từ "auto" thành "metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }} // Tăng delay để tránh load cùng lúc
        className="fixed top-24 right-4 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-cosmic-500 to-nebula-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </motion.button>
      </motion.div>
    </>
  )
}

export default BackgroundMusic
