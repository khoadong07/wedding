import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Utensils, Coffee, Wine, Cake, Sparkles } from 'lucide-react'

interface MenuCategory {
  title: string
  items: string[]
  icon: React.ReactNode
}

const Menu: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const menuCategories: MenuCategory[] = [
    {
      title: 'Súp',
      items: [
        'Súp cần tây và bánh mì rang',
        'Súp bí ngô với sô-cô-la'
      ],
      icon: <Coffee className="w-6 h-6" />
    },
    {
      title: 'Ăn nhẹ',
      items: [
        'Bánh kẹp gà',
        'Nấm nhồi thịt'
      ],
      icon: <Cake className="w-6 h-6" />
    },
    {
      title: 'Món chính',
      items: [
        'Thịt gà xông khói',
        'Sò điệp rưới xốt cam'
      ],
      icon: <Utensils className="w-6 h-6" />
    },
    {
      title: 'Tráng miệng',
      items: [
        'Bánh donut',
        'Bánh mì cuộn hương quế'
      ],
      icon: <Cake className="w-6 h-6" />
    },
    {
      title: 'Đồ uống',
      items: [
        'Nước có ga',
        'Bia Tiger'
      ],
      icon: <Wine className="w-6 h-6" />
    }
  ]

  return (
    <section id="menu" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cosmic-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nebula-500/5 rounded-full blur-3xl animate-float-delay-2" />
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
            <Utensils className="w-8 h-8 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
            Thực đơn đón tiếp
          </h2>
          <p className="text-2xl lg:text-3xl font-display text-white mb-4">
            Hằng & Khoa
          </p>
          <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            Những món ăn được chọn lọc kỹ càng để mang đến trải nghiệm tuyệt vời nhất
          </p>
        </motion.div>

        {/* Menu Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative glass-cosmic rounded-3xl p-8 lg:p-12 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-full h-full text-cosmic-400" />
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-full h-full text-nebula-400" />
              </motion.div>
            </div>

            {/* Menu Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {menuCategories.map((category, index) => (
                <MenuCategory
                  key={category.title}
                  category={category}
                  index={index}
                />
              ))}
            </div>

            {/* Bottom Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-cosmic-300 font-display italic text-lg">
                "Mỗi món ăn là một câu chuyện, mỗi hương vị là một kỷ niệm"
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface MenuCategoryProps {
  category: MenuCategory
  index: number
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ category, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      {/* Category Header */}
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white"
        >
          {category.icon}
        </motion.div>
        <h3 className="text-2xl lg:text-3xl font-display font-bold text-cosmic-400 uppercase tracking-wider">
          {category.title}
        </h3>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        {category.items.map((item, itemIndex) => (
          <motion.div
            key={itemIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + itemIndex * 0.1 }}
            className="relative group/item"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: itemIndex * 0.3
                }}
                className="w-2 h-2 bg-cosmic-400 rounded-full"
              />
              <p className="text-white/90 group-hover/item:text-white transition-colors duration-300">
                {item}
              </p>
            </div>
            
            {/* Hover effect line */}
            <motion.div
              className="absolute left-6 -bottom-1 h-px bg-gradient-to-r from-cosmic-400 to-transparent"
              initial={{ width: 0 }}
              whileHover={{ width: '80%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Menu