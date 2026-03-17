import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Heart, Sparkles, Star, Users, Camera } from 'lucide-react'

interface StarParticle {
  id: number
  x: number
  y: number
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [stars, setStars] = useState<StarParticle[]>([])
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Detect active section
      const sections = ['#home', '#invitation', '#couple', '#story', '#gallery', '#menu', '#gift']
      for (const section of sections) {
        const element = document.querySelector(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Trang chủ' },
    { href: '#invitation', label: 'Lời mời' },
    { href: '#couple', label: 'Cô dâu & Chú rể' },
    { href: '#story', label: 'Câu chuyện' },
    { href: '#gallery', label: 'Album' },
    { href: '#gift', label: 'Mừng cưới' },
  ]

  const createStarEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const newStars: StarParticle[] = []
    for (let i = 0; i < 5; i++) {
      newStars.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
      })
    }
    
    setStars(prev => [...prev, ...newStars])
    
    setTimeout(() => {
      setStars(prev => prev.filter(star => !newStars.find(s => s.id === star.id)))
    }, 1000)
  }

  const scrollToSection = (href: string, event: React.MouseEvent<HTMLButtonElement>) => {
    createStarEffect(event)
    
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
      setActiveSection(href)
    }
  }

  return (
    <>
      {/* Desktop Vertical Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: isHovered ? 0 : -100, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden md:flex fixed left-6 top-0 bottom-0 items-center z-40"
      >
        <div className="relative flex flex-col justify-center space-y-3">
          {/* Logo at top */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="relative">
              <Heart className="w-10 h-10 text-nebula-400" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sparkles className="w-10 h-10 text-cosmic-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex flex-col space-y-3">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href
              
              return (
                <motion.button
                  key={item.href}
                  onClick={(e) => scrollToSection(item.href, e)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ 
                    x: 10,
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative group py-3 px-6 rounded-r-2xl overflow-hidden
                    font-medium transition-all duration-300
                    ${isActive 
                      ? 'glass-cosmic text-white shadow-lg shadow-cosmic-400/50' 
                      : 'bg-black/30 backdrop-blur-md text-white/70 hover:text-white border border-white/10'
                    }
                  `}
                >
                  {/* Star particles */}
                  <AnimatePresence>
                    {stars.map((star) => (
                      <motion.div
                        key={star.id}
                        initial={{ opacity: 1, scale: 0, x: star.x, y: star.y }}
                        animate={{ 
                          opacity: 0, 
                          scale: 1.5, 
                          y: star.y - 50,
                          x: star.x + (Math.random() - 0.5) * 30
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute pointer-events-none"
                      >
                        <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <span className="relative z-10 block text-left whitespace-nowrap">
                    {item.label}
                  </span>
                  
                  {/* Active indicator - cosmic line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cosmic-400 via-nebula-400 to-aurora-400 rounded-r"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Cosmic particles background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent 70%)',
                    }}
                  />
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
                      filter: 'blur(4px)',
                    }}
                  />

                  {/* Sparkle effect on hover */}
                  {!isActive && (
                    <motion.div
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-cosmic-400" />
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Cosmic glow effect */}
          <div 
            className="absolute inset-0 -z-10 blur-3xl opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.3), transparent 70%)',
            }}
          />
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="md:hidden fixed bottom-4 left-4 right-4 z-40"
      >
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-cosmic-400/20 p-2">
          <div className="flex items-center justify-around">
            {navItems.slice(0, 5).map((item, index) => {
              const isActive = activeSection === item.href
              const icons = [
                <Heart className="w-5 h-5" />,
                <Sparkles className="w-5 h-5" />,
                <Users className="w-5 h-5" />,
                <Star className="w-5 h-5" />,
                <Camera className="w-5 h-5" />
              ]
              
              return (
                <motion.button
                  key={item.href}
                  onClick={(e) => scrollToSection(item.href, e)}
                  whileTap={{ scale: 0.9 }}
                  className={`relative flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`}
                >
                  {/* Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cosmic-500/40 to-nebula-500/40 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon */}
                  <motion.div
                    animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                    className="relative z-10"
                  >
                    {icons[index]}
                  </motion.div>
                  
                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 right-1 w-2 h-2 bg-cosmic-400 rounded-full"
                    />
                  )}
                </motion.button>
              )
            })}
            
            {/* More menu for remaining items */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative flex items-center justify-center p-4 rounded-xl text-white/60"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-2 left-0 right-0 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {navItems.slice(5).map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={(e) => {
                      scrollToSection(item.href, e)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`p-3 rounded-xl text-left transition-all ${
                      activeSection === item.href
                        ? 'bg-gradient-to-r from-cosmic-500/40 to-nebula-500/40 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar