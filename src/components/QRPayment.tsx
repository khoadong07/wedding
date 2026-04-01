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
    <section id="gift" className="section-padding relative overflow-hidden bg-white">
      {/* Background Decor - Subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-cosmic-50/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-nebula-50/40 rounded-full blur-[100px]" />
      </div>

      <div className="container-cosmic relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-cosmic-50 border border-cosmic-100 mb-8"
          >
            <Gift className="w-8 sm:w-10 h-8 sm:h-10 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 text-gradient-gold">
            Gửi Mừng Hạnh Phúc
          </h2>
          <p className="text-lg sm:text-2xl text-void-500 max-w-3xl mx-auto px-4 font-serif italic mb-8">
            "Sự hiện diện và lời chúc của bạn là món quà tuyệt vời nhất dành cho chúng mình"
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cosmic-200 to-transparent mx-auto" />
        </motion.div>

        {/* Red Envelope Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            onClick={openQR}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-block cursor-pointer p-8 rounded-[40px] bg-white shadow-sm hover:shadow-2xl border border-cosmic-50 transition-all duration-500"
          >
            {/* Red Envelope SVG */}
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 1, -1, 0],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-64 lg:w-64 lg:h-80"
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
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative max-w-sm w-full bg-white rounded-3xl p-6 shadow-3xl overflow-hidden border border-cosmic-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cosmic-50/50 rounded-full blur-3xl -mr-12 -mt-12" />
              
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeQR}
                className="absolute top-4 right-4 w-8 h-8 bg-void-50 hover:bg-void-100 text-void-500 rounded-full flex items-center justify-center transition-all z-10"
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-6 relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cosmic-50 border border-cosmic-100 text-cosmic-400 mb-4"
                >
                  <QrCode className="w-7 h-7" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-void-900 mb-2">
                  Quà Mừng Cưới
                </h3>
                <p className="text-void-500 font-serif italic text-sm">
                  "Cảm ơn bạn đã gửi những lời chúc tốt đẹp nhất"
                </p>
              </div>

              {/* Bank Info */}
              <div className="space-y-3 mb-6 relative">
                <div className="flex items-center space-x-3 p-4 bg-beige-50/50 rounded-xl border border-cosmic-100/50 group hover:border-cosmic-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-cosmic-400 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-void-400 text-[10px] font-bold uppercase tracking-widest">Số tài khoản</p>
                    <p className="text-void-900 font-bold text-sm tracking-wider">0899992421</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-beige-50/50 rounded-xl border border-cosmic-100/50 group hover:border-cosmic-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-nebula-400 group-hover:scale-110 transition-transform">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-void-400 text-[10px] font-bold uppercase tracking-widest">Chủ tài khoản</p>
                    <p className="text-void-900 font-bold text-sm">ĐỒNG ĐĂNG KHOA</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-beige-50/50 rounded-xl border border-cosmic-100/50 group hover:border-cosmic-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-aurora-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-void-400 text-[10px] font-bold uppercase tracking-widest">Ngân hàng</p>
                    <p className="text-void-900 font-bold text-sm">MB BANK</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center relative">
                <div className="inline-block p-4 bg-white rounded-2xl shadow-lg ring-1 ring-cosmic-100 group">
                  <img
                    src="images/e3e680cbbf8a3ed4679b.jpg"
                    alt="QR Code Payment"
                    className="w-44 h-44 object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-44 h-44 flex items-center justify-center text-void-300 text-xs">QR Code Image Not Found</div>
                </div>
                <p className="text-void-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">
                  Quét bằng ứng dụng ngân hàng
                </p>
              </div>

              {/* Close Button Bottom */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={closeQR}
                className="w-full mt-6 py-3 btn-primary rounded-xl text-sm"
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