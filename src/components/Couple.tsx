import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart } from 'lucide-react'

const Couple: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <section id="couple" className="section-padding bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-beige-50/10 -skew-x-12 transform origin-top pointer-events-none" />
      
      <div className="container-minimal relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-6xl font-display font-bold mb-6 text-gradient-gold">
            Chú rể & Cô dâu
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cosmic-200 to-transparent mx-auto"></div>
        </motion.div>

        {/* Couple Cards */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 max-w-6xl mx-auto">
          {/* Groom */}
          <CoupleCard
            name="Đăng Khoa"
            role="Chú rể"
            imageSrc="assets/12.jpg"
            index={0}
          />

          {/* Heart Divider */}
          <div className="hidden lg:flex items-center justify-center">
             <Heart className="w-12 h-12 text-cosmic-200 fill-cosmic-50 animate-pulse-slow" />
          </div>

          {/* Bride */}
          <CoupleCard
            name="Thanh Hằng"
            role="Cô dâu"
            imageSrc="images/11.jpg"
            index={1}
          />
        </div>
      </div>
    </section>
  )
}

interface CoupleCardProps {
  name: string
  role: string
  imageSrc: string
  index: number
}

const CoupleCard: React.FC<CoupleCardProps> = ({ 
  name, 
  role, 
  imageSrc, 
  index 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -50 : 50 }}
      transition={{ duration: 1, delay: index * 0.2 }}
      className="flex-1 text-center group"
    >
      {/* Image Container */}
      <div className="mb-10 relative">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto">
          {/* Ornamental Ring */}
          <div className="absolute -inset-4 border border-cosmic-100 rounded-full animate-spin-slow opacity-60" />
          <div className="absolute -inset-2 border-2 border-cosmic-200/40 rounded-full" />
          
          <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl ring-8 ring-white">
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              style={{ objectPosition: 'center 20%' }}
            />
          </div>
        </div>
      </div>

      {/* Role */}
      <p className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 font-bold text-cosmic-400">
        {role}
      </p>

      {/* Name */}
      <h3 className="text-3xl sm:text-5xl font-display font-bold text-void-900 group-hover:text-gradient-gold transition-all duration-300">
        {name}
      </h3>
      
      {/* <p className="mt-6 text-void-500 font-serif italic max-w-xs mx-auto text-sm leading-relaxed">
        {index === 0 
          ? "Một chàng trai luôn tin vào chữ duyên và trân trọng từng phút giây bên cạnh người mình yêu."
          : "Một cô gái nhẹ nhàng, luôn mang nụ cười và sự ấm áp đến với tâm hồn của anh ấy."
        }
      </p> */}
    </motion.div>
  )
}

export default Couple