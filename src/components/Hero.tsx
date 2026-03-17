import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, Zap } from 'lucide-react'

const Hero: React.FC = () => {
  const scrollToStory = () => {
    const element = document.querySelector('#story')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Cosmic Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          {/* Mobile image */}
          <source
            media="(max-width: 768px)"
            srcSet="assets/8.jpg"
          />
          {/* Desktop image */}
          <source
            type="image/webp"
            srcSet="optimized/A%20KHOA%20-%20C%20HANG_01-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_01-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_01-1200.webp 1200w"
            sizes="100vw"
          />
          <img
            src="assets/A%20KHOA%20-%20C%20HANG_01.jpg"
            alt="Thanh Hằng và Đăng Khoa"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Cosmic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-900/80 via-cosmic-900/60 to-void-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-nebula-900/30 via-transparent to-aurora-900/30" />
      </div>

      {/* Floating cosmic elements - giảm từ 20 xuống 8 */}
      <div className="absolute inset-0 z-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl mx-auto"
        >
          {/* Cosmic Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full glass-cosmic mb-6 sm:mb-8"
          >
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-cosmic-400" />
            <span className="text-sm sm:text-lg font-display font-medium bg-gradient-to-r from-cosmic-400 to-nebula-400 bg-clip-text text-transparent">
              TỤI MÌNH CƯỚI
            </span>
            <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-aurora-400" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-3xl sm:text-5xl lg:text-9xl font-display font-bold mb-6 sm:mb-8 text-glow-lg"
          >
            <span className="block bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
              Thanh Hằng
            </span>
            <motion.span 
              className="block text-3xl sm:text-5xl lg:text-8xl text-white/90"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(99, 102, 241, 0.5)',
                  '0 0 40px rgba(236, 72, 153, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.5)',
                  '0 0 40px rgba(99, 102, 241, 0.5)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              & Đăng Khoa
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-xl lg:text-3xl font-light mb-4 text-white/80"
          >
            Một hành trình yêu thương vượt qua không gian và thời gian
          </motion.p>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full glass-cosmic mb-8 sm:mb-12"
          >
            <span className="text-sm sm:text-lg font-mono text-cosmic-300">
              29 Tháng 03, 2026
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-3 sm:gap-6 justify-center items-center"
          >
            <button
              onClick={scrollToStory}
              className="btn-cosmic text-sm sm:text-lg px-6 sm:px-10 py-3 sm:py-4 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>Khám phá câu chuyện</span>
              </span>
            </button>
            <button
              onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline-cosmic text-sm sm:text-lg px-6 sm:px-10 py-3 sm:py-4 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Zap className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>Xem album vũ trụ</span>
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={scrollToStory}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors group"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-2 font-light font-display">Khám phá thêm</span>
          <div className="relative">
            <ChevronDown className="w-6 h-6" />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.button>

      {/* Cosmic Energy Beams */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-cosmic-400/50 via-transparent to-transparent transform -skew-x-12" />
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-nebula-400/50 via-transparent to-transparent transform skew-x-12" />
    </section>
  )
}

export default Hero