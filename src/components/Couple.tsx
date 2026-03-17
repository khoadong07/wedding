import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Star, Sparkles } from 'lucide-react'

const Couple: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <section id="couple" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cosmic-500/5 rounded-full blur-3xl animate-float-delay-3" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-nebula-500/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container-cosmic relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
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
            className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full glass-cosmic mb-6 sm:mb-8"
          >
            <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-nebula-400" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
            Cô dâu & Chú rể
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-2">
            Hai tâm hồn đã tìm thấy nhau trong vũ trụ bao la
          </p>
        </motion.div>

        {/* Couple Cards */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Bride */}
          <div className="flex justify-center w-full sm:w-1/2 lg:w-auto">
            <CoupleCard
              name="Thanh Hằng"
              role="Cô dâu"
              description="Một người phụ nữ dịu dàng như ánh trăng, mang trong mình sự ấm áp và yêu thương vô bờ bến."
              imageSrc="assets/11.jpg"
              webpSrcSet="assets/11.jpg"
              index={0}
            />
          </div>

          {/* Center Heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex justify-center items-center flex-shrink-0"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full glass-cosmic flex items-center justify-center"
              >
                <Heart className="w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 text-nebula-400 fill-current" />
              </motion.div>
              
              {/* Floating particles around heart */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-cosmic-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: `${40 + Math.random() * 20}px`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Groom */}
          <div className="flex justify-center w-full sm:w-1/2 lg:w-auto">
            <CoupleCard
              name="Đăng Khoa"
              role="Chú rể"
              description="Một người đàn ông mạnh mẽ như những vì sao, luôn che chở và bảo vệ tình yêu của mình."
              imageSrc="assets/12.jpg"
              webpSrcSet="assets/12.jpg"
              index={1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface CoupleCardProps {
  name: string
  role: string
  description: string
  imageSrc: string
  webpSrcSet: string
  index: number
}

const CoupleCard: React.FC<CoupleCardProps> = ({ 
  name, 
  role, 
  description, 
  imageSrc, 
  webpSrcSet, 
  index 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.3 }}
      className="group flex flex-col items-center max-w-sm"
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.05, y: -10 }}
        className="relative mb-6 sm:mb-8"
      >
        <div className="relative w-40 sm:w-48 h-40 sm:h-48 lg:w-56 lg:h-56">
          <div className="absolute inset-0 rounded-full cosmic-border overflow-hidden">
            <picture>
              <source type="image/webp" srcSet={webpSrcSet} />
              <img
                src={imageSrc}
                alt={name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                style={name === "Thanh Hằng" ? { 
                  transform: 'scale(2)', // Crop 120% - zoom gấp 2.4 lần
                  objectPosition: 'center center center center '
                } : {}}
              />
            </picture>
            
            {/* Cosmic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-void-900/30 via-transparent to-cosmic-900/20" />
          </div>

          {/* Floating stars around image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -10, 0],
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
                <Star className="w-2 sm:w-3 h-2 sm:h-3 text-cosmic-400 fill-current" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Role */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.3 + 0.3 }}
        className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full glass-cosmic mb-3 sm:mb-4"
      >
        <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-nebula-400" />
        <span className="text-cosmic-300 font-medium text-xs sm:text-sm">{role}</span>
      </motion.div>

      {/* Name */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
        className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-4 sm:mb-6 text-center"
      >
        {name}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: index * 0.3 + 0.5 }}
        className="text-white/70 leading-relaxed text-center px-3 sm:px-4 text-sm sm:text-base"
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

export default Couple