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
        transition={{ duration: 0.4, ease: "easeOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden md:flex fixed left-6 top-0 bottom-0 items-center z-50 pointer-events-none"
      >
        <div className="relative flex flex-col justify-center space-y-4 pointer-events-auto">
          {/* Logo at top */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="relative">
              <Heart className="w-12 h-12 text-nebula-400 fill-nebula-50" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles className="w-12 h-12 text-cosmic-400 opacity-60" />
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex flex-col space-y-4">
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
                    relative group py-4 px-8 rounded-r-3xl overflow-hidden
                    font-display font-bold transition-all duration-300 tracking-wider
                    ${isActive 
                      ? 'bg-white text-void-900 shadow-xl shadow-cosmic-100/50 border-y border-r border-cosmic-100' 
                      : 'bg-white/80 backdrop-blur-md text-void-500 hover:text-void-900 border-y border-r border-void-100/50 hover:bg-white'
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
                        <Star className="w-4 h-4 text-cosmic-400 fill-cosmic-300" />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <span className="relative z-10 block text-left whitespace-nowrap uppercase text-xs">
                    {item.label}
                  </span>
                  
                  {/* Active indicator - gold line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cosmic-400 via-nebula-300 to-cosmic-500 rounded-r shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Gold particles background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(184, 134, 11, 0.08), transparent 70%)',
                    }}
                  />
                  
                  {/* Sparkle effect on hover */}
                  {!isActive && (
                    <motion.div
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-3 h-3 text-cosmic-400" />
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Minimal glow effect */}
          <div 
            className="absolute inset-0 -z-10 blur-[100px] opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15), rgba(255, 182, 193, 0.1), transparent 70%)',
            }}
          />
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="md:hidden fixed bottom-6 left-6 right-6 z-50"
      >
        <div className="bg-white/90 backdrop-blur-2xl rounded-[32px] border border-cosmic-100 shadow-2xl shadow-cosmic-200/20 p-2.5">
          <div className="flex items-center justify-around">
            {navItems.slice(0, 5).map((item, index) => {
              const isActive = activeSection === item.href
              const icons = [
                <Heart className="w-6 h-6" />,
                <Users className="w-6 h-6" />,
                <Sparkles className="w-6 h-6" />,
                <Star className="w-6 h-6" />,
                <Camera className="w-6 h-6" />
              ]
              
              return (
                <motion.button
                  key={item.href}
                  onClick={(e) => scrollToSection(item.href, e)}
                  whileTap={{ scale: 0.9 }}
                  className={`relative flex items-center justify-center p-4 rounded-3xl transition-all duration-300 ${
                    isActive ? 'text-cosmic-600' : 'text-void-400'
                  }`}
                >
                  {/* Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-cosmic-50/80 rounded-2xl border border-cosmic-100"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon */}
                  <motion.div
                    animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                    className="relative z-10"
                  >
                    {icons[index]}
                  </motion.div>
                </motion.button>
              )
            })}
            
            {/* More menu for remaining items */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative flex items-center justify-center p-4 rounded-3xl text-void-400 bg-void-50/50"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-full mb-4 left-0 right-0 bg-white/95 backdrop-blur-2xl rounded-3xl border border-cosmic-100 shadow-3xl p-6"
            >
              <div className="grid grid-cols-2 gap-3">
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
                    className={`p-4 rounded-2xl text-center transition-all ${
                      activeSection === item.href
                        ? 'bg-cosmic-100 text-cosmic-700 font-bold'
                        : 'text-void-600 hover:text-void-900 hover:bg-void-50 border border-transparent hover:border-void-100'
                    }`}
                  >
                    <span className="text-sm font-display tracking-wider uppercase">{item.label}</span>
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