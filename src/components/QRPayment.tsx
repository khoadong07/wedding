import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Gift, QrCode, X, Heart, Sparkles, CreditCard } from 'lucide-react'

const QRPayment: React.FC = () => {
  const [isQRVisible, setIsQRVisible] = useState(false)
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const openQR = () => {
    setIsQRVisible(true)
    document.body.style.overflow = 'hidden'
  }

  const closeQR = () => {
    setIsQRVisible(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <section id="gift" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cosmic-500/5 rounded-full blur-3xl animate-float-delay-2" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-nebula-500/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container-cosmic relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity }
            }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-cosmic mb-8"
          >
            <Gift className="w-8 h-8 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
            Mừng cưới sớm?
          </h2>
          <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            Đến cô dâu & chú rể
          </h3>
          <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            Gửi mừng cưới sớm cho dâu và rể bằng mã QR dưới đây bạn yêu nhé
          </p>
        </motion.div>

        {/* Red Envelope Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            onClick={openQR}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-block"
          >
            {/* Red Envelope SVG */}
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-48 h-64 lg:w-56 lg:h-72"
              >
                <svg viewBox="0 0 180 240" className="w-full h-full drop-shadow-2xl">
                  {/* Main envelope body */}
                  <rect x="10" y="10" width="160" height="220" rx="12" fill="#c0392b" />
                  
                  {/* Decorative band */}
                  <rect x="10" y="85" width="160" height="70" fill="#a93226" />
                  
                  {/* Pattern */}
                  <pattern id="diamonds" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="none" />
                    <polygon points="10,2 18,10 10,18 2,10" fill="#c0392b" opacity="0.5" />
                  </pattern>
                  <rect x="10" y="85" width="160" height="70" fill="url(#diamonds)" />
                  
                  {/* Gold lines */}
                  <line x1="10" y1="85" x2="170" y2="85" stroke="#f1c40f" strokeWidth="1.5" />
                  <line x1="10" y1="155" x2="170" y2="155" stroke="#f1c40f" strokeWidth="1.5" />
                  
                  {/* Corner decorations */}
                  <path d="M10,10 L40,10 L10,40 Z" fill="#f1c40f" opacity="0.25" />
                  <path d="M170,10 L140,10 L170,40 Z" fill="#f1c40f" opacity="0.25" />
                  <path d="M10,230 L40,230 L10,200 Z" fill="#f1c40f" opacity="0.25" />
                  <path d="M170,230 L140,230 L170,200 Z" fill="#f1c40f" opacity="0.25" />
                  
                  {/* Double happiness symbol */}
                  <text x="90" y="132" textAnchor="middle" dominantBaseline="central" 
                        style={{ fontSize: '42px', fontWeight: 'bold', fill: '#f1c40f', fontFamily: 'serif' }}>
                    囍
                  </text>
                  
                  {/* Text */}
                  <text x="90" y="55" textAnchor="middle" 
                        style={{ fontSize: '11px', fill: '#f8d98b', fontFamily: 'sans-serif', letterSpacing: '2px' }}>
                    MỪNG CƯỚI
                  </text>
                  
                  {/* Decorative elements */}
                  <line x1="55" y1="185" x2="125" y2="185" stroke="#f1c40f" strokeWidth="0.8" opacity="0.5" />
                  <circle cx="90" cy="185" r="3" fill="#f1c40f" opacity="0.4" />
                  <circle cx="55" cy="185" r="2" fill="#f1c40f" opacity="0.3" />
                  <circle cx="125" cy="185" r="2" fill="#f1c40f" opacity="0.3" />
                </svg>
              </motion.div>

              {/* Floating decorative elements */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${-10 + Math.random() * 120}%`,
                    top: `${-5 + Math.random() * 110}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {i % 2 === 0 ? (
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Heart className="w-3 h-3 text-red-400 fill-current" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Button text */}
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/70 text-sm mt-4 font-medium tracking-wider"
            >
              Nhấn để mở
            </motion.p>
          </motion.button>
        </motion.div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {isQRVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-void-900/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeQR}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative max-w-md w-full glass-cosmic rounded-3xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeQR}
                className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white mb-4"
                >
                  <QrCode className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Thông tin chuyển khoản
                </h3>
                <p className="text-white/70">
                  Cảm ơn bạn đã gửi lời chúc mừng đến tụi mình
                </p>
              </div>

              {/* Bank Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl">
                  <CreditCard className="w-5 h-5 text-cosmic-400" />
                  <div>
                    <p className="text-white/60 text-sm">Số tài khoản</p>
                    <p className="text-white font-mono font-bold">1903 6961 0660 13</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl">
                  <Heart className="w-5 h-5 text-nebula-400" />
                  <div>
                    <p className="text-white/60 text-sm">Chủ tài khoản</p>
                    <p className="text-white font-bold">LY THI THANH HANG</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl">
                  <Sparkles className="w-5 h-5 text-aurora-400" />
                  <div>
                    <p className="text-white/60 text-sm">Ngân hàng</p>
                    <p className="text-white font-bold">Techcombank</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="inline-block p-4 bg-white rounded-2xl">
                  <img
                    src="/images/94330cbc3424ba7ae335.jpg"
                    alt="QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-white/60 text-sm mt-4">
                  Quét mã QR để chuyển khoản nhanh chóng
                </p>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeQR}
                className="w-full mt-8 py-3 bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
              >
                Đóng
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default QRPayment