import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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
      style={{ background: 'linear-gradient(to bottom, #faf8f5 0%, #f5f1eb 100%)' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="assets/8.jpg"
          />
          <source
            type="image/webp"
            srcSet="optimized/A%20KHOA%20-%20C%20HANG_01-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_01-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_01-1200.webp 1200w"
            sizes="100vw"
          />
          <img
            src="assets/A%20KHOA%20-%20C%20HANG_01.jpg"
            alt="Đăng Khoa và Thanh Hằng"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-beige-50/70 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <span className="text-sm sm:text-base tracking-[0.3em] uppercase font-light text-cosmic-500">
              Trân trọng kính mời
            </span>
          </motion.div>

          {/* Names */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-display font-normal mb-4 text-void-900">
              Đăng Khoa
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-light mb-4 text-cosmic-400">
              &
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-display font-normal text-void-900">
              Thanh Hằng
            </span>
          </motion.h1>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-lg sm:text-xl font-light text-cosmic-500">
              18 • 04 • 2026
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToStory}
              className="btn-primary text-sm sm:text-base px-10 py-4 shadow-glow"
            >
              Xem chi tiết
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        onClick={scrollToStory}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-colors text-cosmic-400 hover:text-cosmic-600"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  )
}

export default Hero