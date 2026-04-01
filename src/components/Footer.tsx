import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white py-16 lg:py-24 mt-20 border-t border-cosmic-100 overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cosmic-50 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-nebula-50 rounded-full blur-[100px]" />
      </div>

      <div className="container-minimal relative z-10">
        <div className="text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center space-x-4 mb-10"
          >
            <Heart className="w-10 h-10 text-cosmic-400 fill-cosmic-50" />
            <span className="text-3xl lg:text-4xl font-display font-bold text-gradient-gold">
              Đăng Khoa  &  Thanh Hằng
            </span>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-xl max-w-2xl mx-auto leading-relaxed text-void-600 font-serif italic">
              "Với tất cả yêu thương, cảm ơn bạn đã ghé xem thiệp cưới online của chúng mình"
            </p>
          </motion.div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cosmic-200 to-transparent mx-auto mb-12" />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs tracking-[0.2em] uppercase font-bold text-void-400"
          >
            <p className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2">
              <span>© 2026 Đăng Khoa  &  Thanh Hằng.</span>
              <span className="flex items-center gap-2">
                Made with
                <Heart className="inline w-4 h-4 text-nebula-400 fill-nebula-400 animate-pulse-slow" />
                for our special day.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer