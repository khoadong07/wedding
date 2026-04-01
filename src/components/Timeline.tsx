import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Heart, Sparkles } from 'lucide-react'

// Custom Cross Icon
const CrossIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M8 6h8M7 12h10M8 18h8" />
  </svg>
)

interface TimelineEvent {
  date: string
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
      date: '17/04/2026',
      time: '17:30',
      title: 'Thánh Lễ hôn phối',
      description: 'Cử hành tại Giáo xứ Chính Toà Phan Thiết',
      icon: <CrossIcon className="w-8 h-8" />
    },
    {
      date: '18/04/2026',
      time: '09:00',
      title: 'Lễ gia tiên',
      description: 'Nghi lễ gia tiên trang trọng tại nhà trai',
      icon: <Heart className="w-8 h-8" />
    },
    {
      date: '18/04/2026',
      time: '11:00',
      title: 'Đón khách',
      description: 'Chú rể và cô dâuhân hoan chào đón từng vị khách quý đến chung vui.',
      icon: <Users className="w-8 h-8" />
    },
    {
      date: '18/04/2026',
      time: '11:30',
      title: 'Khai tiệc',
      description: 'Tiệc cưới chính thức bắt đầu trong không khí rộn ràng và ấm cúng.',
      icon: <Sparkles className="w-8 h-8" />
    }
  ]

  return (
    <section id="timeline" className="section-padding bg-beige-50/30 relative">
      <div className="container-minimal">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-6xl font-display font-bold mb-6 text-gradient-gold">
            Chương Trình Lễ Cưới
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cosmic-300 to-transparent mx-auto"></div>
        </motion.div>

        {/* Timeline Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-4">
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
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="text-center group"
    >
      {/* Icon Area */}
      <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 bg-white border border-cosmic-100 shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-50 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
        <div className="relative z-10 text-cosmic-400 group-hover:text-cosmic-600 transition-colors duration-500">
          {event.icon}
        </div>
      </div>

      {/* Date */}
      <div className="text-sm font-medium mb-2 text-cosmic-500 uppercase tracking-wider">
        {event.date}
      </div>

      {/* Time */}
      <div className="text-3xl font-display font-bold mb-4 text-void-900 tracking-widest">
        {event.time}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-4 text-void-800 uppercase tracking-wider">
        {event.title}
      </h3>

      {/* Description */}
      <p className="leading-relaxed text-void-500 font-serif italic text-base">
        {event.description}
      </p>
    </motion.div>
  )
}

export default Timeline
