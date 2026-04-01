import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, Sparkles } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  // Set wedding date - 17/04/2026 at 17:30
  const weddingDate = new Date('2026-04-17T17:30:00').getTime()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [weddingDate])

  const timeUnits = [
    { value: timeLeft.days, label: 'Ngày', icon: <Calendar className="w-6 h-6" /> },
    { value: timeLeft.hours, label: 'Giờ', icon: <Clock className="w-6 h-6" /> },
    { value: timeLeft.minutes, label: 'Phút', icon: <Sparkles className="w-6 h-6" /> },
    { value: timeLeft.seconds, label: 'Giây', icon: <Sparkles className="w-6 h-6" /> }
  ]

  return (
    <section id="countdown" className="section-padding bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-beige-50/20 skew-x-6 transform origin-top" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-cosmic-50/30 -skew-x-12 transform origin-bottom" />
      </div>

      <div className="container-minimal relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-cosmic-50 border border-cosmic-100 mb-8"
          >
            <Calendar className="w-8 sm:w-10 h-8 sm:h-10 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 text-gradient-gold">
            Đếm Ngược Ngày Chung Đôi
          </h2>
          <p className="text-lg sm:text-2xl text-void-500 max-w-3xl mx-auto px-4 font-serif italic">
            "Cùng tụi mình đếm ngược từng nhịp thở đến ngày hạnh phúc nhất"
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-12 max-w-5xl mx-auto px-4"
        >
          {timeUnits.map((unit, index) => (
            <CountdownUnit
              key={unit.label}
              value={unit.value}
              label={unit.label}
              icon={unit.icon}
              index={index}
            />
          ))}
        </motion.div>

        {/* Wedding Date Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 sm:mt-24"
        >
          <div className="bg-white/80 backdrop-blur-md border border-cosmic-100 rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto shadow-sm">
            <h4 className="text-2xl sm:text-4xl font-display font-bold text-void-900 mb-4 tracking-widest">
              17 Tháng 04, 2026
            </h4>
            <p className="text-cosmic-400 font-bold text-lg sm:text-xl mb-4 tracking-[0.2em] uppercase">
              Thứ Sáu, Lúc 17:30
            </p>
            <div className="w-16 h-px bg-cosmic-200 mx-auto mb-6" />
            <p className="text-void-500 text-base sm:text-lg font-serif italic">
              "Thánh Lễ hôn phối - Khoảnh khắc thiêng liêng đánh dấu khởi đầu hành trình yêu thương"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface CountdownUnitProps {
  value: number
  label: string
  icon: React.ReactNode
  index: number
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label, icon, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-white border border-cosmic-100 rounded-[32px] p-6 sm:p-10 text-center hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-beige-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative z-10 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-cosmic-50 text-cosmic-400 mb-6 group-hover:bg-cosmic-100 transition-colors"
        >
          {icon}
        </motion.div>

        {/* Value */}
        <motion.div
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 text-4xl sm:text-6xl font-display font-bold text-void-900 mb-2 tracking-tighter"
        >
          {value.toString().padStart(2, '0')}
        </motion.div>

        {/* Label */}
        <div className="relative z-10 text-void-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default Countdown