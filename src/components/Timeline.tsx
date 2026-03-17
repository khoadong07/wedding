import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, Users, Heart, Sparkles } from 'lucide-react'

interface TimelineEvent {
  time: string
  title: string
  description: string
  icon: React.ReactNode
}

const Timeline: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const events: TimelineEvent[] = [
    {
      time: '08:00',
      title: 'Lễ gia tiên',
      description: 'Nghi lễ gia tiên trang trọng, hai họ cùng nhau chứng kiến khoảnh khắc thiêng liêng khi đôi uyên ương thành kính dâng hương, cầu nguyện tổ tiên phù hộ cho hạnh phúc trăm năm.',
      icon: <Heart className="w-6 h-6" />
    },
    {
      time: '11:00',
      title: 'Đón khách',
      description: 'Cô dâu và chú rể hân hoan chào đón từng vị khách quý đến chung vui. Đây là lúc những nụ cười, những cái ôm ấm áp và những lời chúc phúc chân thành được trao gửi.',
      icon: <Users className="w-6 h-6" />
    },
    {
      time: '11:30',
      title: 'Chung vui',
      description: 'Tiệc cưới chính thức bắt đầu trong không khí rộn ràng và ấm cúng. Cùng nhau nâng ly chúc mừng hạnh phúc của đôi uyên ương, chia sẻ những khoảnh khắc đáng nhớ bên gia đình và bạn bè.',
      icon: <Sparkles className="w-6 h-6" />
    }
  ]

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-cosmic-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-nebula-500/5 rounded-full blur-3xl animate-float-delay-2" />
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
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-cosmic mb-8"
          >
            <Clock className="w-8 h-8 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
            Lịch trình cưới
          </h2>
          <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            Cùng tụi mình trải qua những khoảnh khắc đặc biệt trong ngày trọng đại
          </p>
        </motion.div>

        {/* Timeline Events */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {events.map((event, index) => (
            <TimelineCard
              key={index}
              event={event}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TimelineCardProps {
  event: TimelineEvent
  index: number
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group"
    >
      <div className="relative">
        {/* Card */}
        <div className="glass-cosmic rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white mb-6"
          >
            {event.icon}
          </motion.div>

          {/* Time */}
          <div className="text-2xl lg:text-3xl font-bold text-cosmic-400 mb-4 font-mono">
            {event.time}
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-4">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-white/70 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cosmic-400 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Timeline