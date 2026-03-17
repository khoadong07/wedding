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

  // Set wedding date - 29/3/2026 at 8:00 AM
  const weddingDate = new Date('2026-03-29T08:00:00').getTime()

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
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-cosmic-500/5 rounded-full blur-3xl animate-float-delay-2" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-nebula-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-aurora-500/5 rounded-full blur-3xl animate-float-delay-3" />
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
            <Calendar className="w-8 h-8 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
            Cho đến ngày
          </h2>
          <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            Về chung một nhà
          </h3>
          <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            Cùng tụi mình đếm ngược những khoảnh khắc đến ngày trọng đại nhé!
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto"
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
          className="text-center mt-16"
        >
          <div className="glass-cosmic rounded-2xl p-8 max-w-2xl mx-auto">
            <h4 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">
              29 Tháng 03, 2026
            </h4>
            <p className="text-cosmic-300 text-lg mb-2">
              Chủ Nhật, 08:00
            </p>
            <p className="text-white/70">
              Một ngày đặc biệt trong vũ trụ tình yêu của tụi mình
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
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-cosmic rounded-2xl p-6 lg:p-8 text-center hover:scale-105 transition-transform duration-300">
        {/* Icon */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5
          }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white mb-4"
        >
          {icon}
        </motion.div>

        {/* Value */}
        <motion.div
          key={value} // This will trigger animation when value changes
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl lg:text-5xl font-bold font-mono text-white mb-2"
        >
          {value.toString().padStart(2, '0')}
        </motion.div>

        {/* Label */}
        <div className="text-cosmic-300 font-medium text-lg">
          {label}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
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

export default Countdown