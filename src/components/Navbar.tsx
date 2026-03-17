import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Sparkles, Star } from 'lucide-react'

interface StarParticle {
  id: number
  x: number
  y: number
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [stars, setStars] = useState<StarParticle[]>([])
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
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

      {/* Mobile Top Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-cosmic backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container-cosmic">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <Heart className="w-8 h-8 text-nebula-400" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Sparkles className="w-8 h-8 text-cosmic-400" />
                </motion.div>
              </div>
              <span className="text-xl font-display font-bold bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
                H & K
              </span>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-cosmic border-t border-white/10"
            >
              <div className="container-cosmic py-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => scrollToSection(item.href, e)}
                    className={`
                      w-full text-left py-3 px-4 rounded-lg transition-colors
                      ${activeSection === item.href
                        ? 'bg-white/10 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cosmic glow effect */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-400/50 to-transparent" />
        )}
      </motion.nav>
    </>
  )
}

export default Navbar