import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Instagram, Facebook, Mail, Sparkles } from 'lucide-react'

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: Instagram,
      href: '#',
      label: 'Instagram',
    },
    {
      icon: Facebook,
      href: '#',
      label: 'Facebook',
    },
    {
      icon: Mail,
      href: 'mailto:contact@example.com',
      label: 'Email',
    },
  ]

  return (
    <footer className="relative bg-void-900/50 backdrop-blur-sm border-t border-white/10 text-white py-12 lg:py-16 mt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cosmic-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-nebula-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-cosmic relative z-10">
        <div className="text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center space-x-3 mb-8"
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
            >
              <Heart className="w-8 h-8 text-nebula-400 fill-current" />
            </motion.div>
            <span className="text-2xl lg:text-3xl font-display font-bold bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
              Thanh Hằng & Đăng Khoa
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center space-x-6 mb-8"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 glass-cosmic rounded-full flex items-center justify-center text-cosmic-400 hover:text-cosmic-300 transition-colors group"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmic-500 to-nebula-500 opacity-0 group-hover:opacity-20 transition-opacity"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-lg lg:text-xl-2 text-white/70 max-w-2xl mx-auto leading-relaxed">
              Với tất cả yêu thương, cảm ơn bạn đã ghé xem thiệp cưới online của tụi mình
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-48 h-px mx-auto mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-400 to-transparent" />
            <motion.div
              animate={{ 
                x: ['-100%', '100%'],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
            />
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm text-white/50"
          >
            <p className="flex items-center justify-center flex-wrap gap-2">
              <span>© 2024 Thanh Hằng & Đăng Khoa.</span>
              <span className="flex items-center gap-1">
                Made with
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  <Heart className="inline w-4 h-4 text-red-400 fill-current" />
                </motion.span>
                for our special day.
              </span>
            </p>
          </motion.div>

          {/* Floating Sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles className="w-3 h-3 text-cosmic-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-400/50 to-transparent" />
        <motion.div
          animate={{ 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </div>
    </footer>
  )
}

export default Footer