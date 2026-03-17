import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Sparkles, Zap, Heart, Star } from 'lucide-react'

interface StoryCardProps {
  number: string
  title: string
  content: string
  imageSrc: string
  imageAlt: string
  webpSrcSet: string
  reverse?: boolean
  delay?: number
  icon: React.ElementType
  gradient: string
}

const StoryCard: React.FC<StoryCardProps> = ({
  number,
  title,
  content,
  imageSrc,
  imageAlt,
  webpSrcSet,
  reverse = false,
  delay = 0,
  icon: Icon,
  gradient,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay }}
      className={`flex flex-col ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } items-center gap-6 sm:gap-8 lg:gap-16`}
    >
      {/* Image - Mobile First */}
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:flex-1 max-w-md lg:max-w-lg order-first lg:order-none"
      >
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl cosmic-border">
          <picture>
            <source type="image/webp" srcSet={webpSrcSet} sizes="(max-width: 768px) 100vw, 50vw" />
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-56 sm:h-72 lg:h-96 object-cover transition-transform duration-700 hover:scale-110"
              loading="lazy"
            />
          </picture>
          {/* Cosmic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void-900/60 via-transparent to-cosmic-900/20" />
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="w-full lg:flex-1 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 lg:gap-6">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`flex-shrink-0 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-base lg:text-xl cosmic-border ${gradient}`}
          >
            <Icon className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs sm:text-sm font-mono text-cosmic-400 mb-1">
              Chapter {number}
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-display font-bold bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent leading-tight">
              {title}
            </h3>
          </div>
        </div>
        
        <div className="relative pl-0 lg:pl-4">
          <p className="text-sm sm:text-base lg:text-xl text-white/80 leading-relaxed">
            {content}
          </p>
          {/* Cosmic glow effect - Hidden on mobile */}
          <div className="hidden lg:block absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cosmic-400 via-nebula-400 to-aurora-400 rounded-full opacity-50" />
        </div>
      </div>
    </motion.div>
  )
}

const Story: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const stories = [
    {
      number: '01',
      title: 'Cosmic Encounter',
      content: 'Trong vô tận của vũ trụ, hai ngôi sao đã tìm thấy nhau. Không phải bằng sự tình cờ, mà bằng lực hấp dẫn của tình yêu - một năng lượng mạnh mẽ hơn cả lực hấp dẫn của các thiên thể.',
      imageSrc: 'assets/_32A7964%20-%20HC.jpg',
      imageAlt: 'Cosmic Encounter',
      webpSrcSet: 'optimized/_32A7964%20-%20HC-480.webp 480w, optimized/_32A7964%20-%20HC-768.webp 768w, optimized/_32A7964%20-%20HC-1200.webp 1200w',
      icon: Sparkles,
      gradient: 'bg-gradient-to-br from-cosmic-500 to-cosmic-700',
    },
    {
      number: '02',
      title: 'Stellar Journey',
      content: 'Cùng nhau khám phá những thiên hà xa xôi của cảm xúc, vượt qua những tinh vân của thử thách. Mỗi khoảnh khắc bên nhau như những chùm sao băng, để lại dấu ấn sáng rực trong bầu trời tâm hồn.',
      imageSrc: 'assets/_32A8457%20-%20HC.jpg',
      imageAlt: 'Stellar Journey',
      webpSrcSet: 'optimized/_32A8457%20-%20HC-480.webp 480w, optimized/_32A8457%20-%20HC-768.webp 768w, optimized/_32A8457%20-%20HC-1200.webp 1200w',
      reverse: true,
      icon: Zap,
      gradient: 'bg-gradient-to-br from-nebula-500 to-nebula-700',
    },
    {
      number: '03',
      title: 'Eternal Bond',
      content: 'Và rồi, trong sự bao la của không gian và thời gian, tụi mình quyết định tạo nên một hệ sao đôi - hai trái tim quay quanh nhau trong một quỹ đạo tình yêu vĩnh cửu, chiếu sáng cho nhau đến tận cùng vũ trụ.',
      imageSrc: 'assets/25.jpg',
      imageAlt: 'Eternal Bond',
      webpSrcSet: 'assets/25.jpg',
      icon: Heart,
      gradient: 'bg-gradient-to-br from-aurora-500 to-aurora-700',
    },
  ]

  return (
    <section id="story" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cosmic-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-nebula-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-aurora-500/10 rounded-full blur-2xl animate-float-delay-1" />
      </div>

      <div className="container-cosmic relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20 lg:mb-32"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full glass-cosmic mb-6 sm:mb-8"
          >
            <Star className="w-6 sm:w-8 h-6 sm:h-8 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
            Cosmic Love Story
          </h2>
          <p className="text-sm sm:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed px-2">
            Một câu chuyện tình yêu được viết bằng ánh sáng của những vì sao, 
            kể về hành trình của hai tâm hồn tìm thấy nhau trong vô tận vũ trụ.
          </p>
        </motion.div>

        {/* Story Cards */}
        <div className="space-y-20 sm:space-y-24 lg:space-y-40">
          {stories.map((story, index) => (
            <StoryCard
              key={story.number}
              {...story}
              delay={index * 0.3}
            />
          ))}
        </div>
      </div>

      {/* Cosmic Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
    </section>
  )
}

export default Story