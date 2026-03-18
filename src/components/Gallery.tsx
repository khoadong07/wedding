import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight, Sparkles, RotateCw } from 'lucide-react'
import LazyImage from './LazyImage'
import { preloadBackgroundImages } from '../utils/imageService'

// Define PanInfo type locally to avoid import issues
interface PanInfo {
  offset: { x: number; y: number }
  delta: { x: number; y: number }
  velocity: { x: number; y: number }
  point: { x: number; y: number }
}

interface GalleryImage {
  id: number
  src: string
  webpSrcSet: string
  alt: string
  caption: string
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [displayedCount, setDisplayedCount] = useState(4)
  const [isDragging, setIsDragging] = useState(false)
  const [tappedImage, setTappedImage] = useState<number | null>(null)
  const dragConstraintsRef = useRef<HTMLDivElement>(null)
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  // Memoize images để tránh re-generate
  const { carouselImages, gridImages } = useMemo(() => {
    // 9 ảnh random cho 3D carousel (desktop) - random mỗi lần load
    const availableNumbers = Array.from({ length: 40 }, (_, i) => i + 1) // [1, 2, 3, ..., 40]
    const shuffledForCarousel = availableNumbers.sort(() => Math.random() - 0.5) // Shuffle random
    const carouselNumbers = shuffledForCarousel.slice(0, 9) // Chọn 9 ảnh random
    const carousel = carouselNumbers.map((num, idx) => ({
      id: idx + 1,
      src: `assets/${num}.jpg`,
      webpSrcSet: `assets/${num}.jpg`,
      alt: `Khoảnh khắc ${num}`,
      caption: `Khoảnh khắc ${num} trong vũ trụ tình yêu`,
    }))

    // 20 ảnh random cho grid view (mobile)
    const shuffledForGrid = availableNumbers.sort(() => Math.random() - 0.5) // Shuffle random lại
    const selectedNumbers = shuffledForGrid.slice(0, 20) // Chọn 20 ảnh đầu tiên
    const grid = selectedNumbers.map((num, idx) => ({
      id: idx + 1,
      src: `assets/${num}.jpg`,
      webpSrcSet: `assets/${num}.jpg`,
      alt: `Khoảnh khắc ${num}`,
      caption: `Khoảnh khắc ${num} trong vũ trụ tình yêu`,
    }))

    return { carouselImages: carousel, gridImages: grid }
  }, [])

  const displayedImages = useMemo(() => gridImages.slice(0, displayedCount), [gridImages, displayedCount])

  // Preload gallery images when component mounts
  useEffect(() => {
    // Preload carousel images (for desktop 3D view)
    const carouselImagePaths = carouselImages.map(img => img.src)
    // Preload grid images (for mobile grid view)
    const gridImagePaths = gridImages.map(img => img.src)
    
    // Preload carousel images immediately (smaller set, higher priority)
    carouselImagePaths.forEach(src => {
      const img = new Image()
      img.src = src
    })
    
    // Preload first few grid images immediately, rest in background
    const immediate = gridImagePaths.slice(0, 6)
    const background = gridImagePaths.slice(6)
    
    immediate.forEach(src => {
      const img = new Image()
      img.src = src
    })
    
    // Preload rest in background
    if (background.length > 0) {
      preloadBackgroundImages(background)
    }
  }, [carouselImages, gridImages])

  // Auto rotation với useCallback
  const rotateToNext = useCallback(() => {
    if (!isDragging) {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    }
  }, [carouselImages.length, isDragging])

  useEffect(() => {
    if (!isAutoRotating || isDragging) return
    
    const interval = setInterval(rotateToNext, 5000) // Tăng thời gian từ 4s lên 5s
    return () => clearInterval(interval)
  }, [isAutoRotating, rotateToNext, isDragging])

  const handlePrevious = useCallback(() => {
    setIsAutoRotating(false)
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }, [carouselImages.length])

  const handleNext = useCallback(() => {
    setIsAutoRotating(false)
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
  }, [carouselImages.length])

  const handleImageClick = useCallback((image: GalleryImage) => {
    if (!isDragging) {
      setSelectedImage(image)
    }
  }, [isDragging])

  // Mobile-specific touch handlers
  const handleMobileImageClick = useCallback((image: GalleryImage) => {
    // Visual feedback
    setTappedImage(image.id)
    setTimeout(() => setTappedImage(null), 200)
    
    // Add small delay to ensure touch events are processed
    setTimeout(() => {
      if (!isDragging) {
        setSelectedImage(image)
      }
    }, 50)
  }, [isDragging])

  const handleLightboxPrevious = useCallback(() => {
    if (!selectedImage) return
    // Use gridImages for mobile, carouselImages for desktop
    const currentImages = window.innerWidth < 1024 ? gridImages : carouselImages
    const currentIdx = currentImages.findIndex(img => img.id === selectedImage.id)
    const previousIndex = currentIdx > 0 ? currentIdx - 1 : currentImages.length - 1
    setSelectedImage(currentImages[previousIndex])
  }, [selectedImage, gridImages, carouselImages])

  const handleLightboxNext = useCallback(() => {
    if (!selectedImage) return
    // Use gridImages for mobile, carouselImages for desktop
    const currentImages = window.innerWidth < 1024 ? gridImages : carouselImages
    const currentIdx = currentImages.findIndex(img => img.id === selectedImage.id)
    const nextIndex = currentIdx < currentImages.length - 1 ? currentIdx + 1 : 0
    setSelectedImage(currentImages[nextIndex])
  }, [selectedImage, gridImages, carouselImages])

  const loadMore = useCallback(() => {
    setDisplayedCount(prev => Math.min(prev + 4, gridImages.length))
  }, [gridImages.length])

  // Gesture handlers
  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    setIsAutoRotating(false)
  }, [])

  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    
    const threshold = 50 // Minimum distance to trigger swipe
    const velocity = Math.abs(info.velocity.x)
    
    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
      if (info.offset.x > 0) {
        // Swipe right - go to previous
        handlePrevious()
      } else {
        // Swipe left - go to next
        handleNext()
      }
    }
  }, [handlePrevious, handleNext])

  // Touch handlers for mobile
  const handleTouchStart = useCallback((_e: React.TouchEvent) => {
    setIsDragging(true)
    setIsAutoRotating(false)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setIsDragging(false), 100) // Small delay to prevent click
  }, [])

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      {/* Background Effects - giảm số lượng */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-cosmic-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-nebula-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container-cosmic relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            }}
            className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full glass-cosmic mb-6 sm:mb-8"
          >
            <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
            Album Vũ Trụ
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-2">
            Những khoảnh khắc đẹp nhất được lưu giữ trong không gian và thời gian
          </p>
        </motion.div>

        {/* Mobile Grid View */}
        <div className="lg:hidden mb-12">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
            {displayedImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: tappedImage === image.id ? 0.95 : 1 
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="cursor-pointer group relative overflow-hidden rounded-lg aspect-square touch-manipulation select-none"
                onClick={() => handleMobileImageClick(image)}
                onTouchStart={() => setTappedImage(image.id)}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  setTimeout(() => setTappedImage(null), 100)
                  handleMobileImageClick(image)
                }}
                onTouchCancel={() => setTappedImage(null)}
                style={{ touchAction: 'manipulation' }}
              >
                <LazyImage
                  src={image.src}
                  srcSet={image.webpSrcSet}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  alt={image.alt}
                  className="w-full h-full transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                  width={400}
                  quality={75}
                  priority={index < 4} // Preload first 4 images
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Touch overlay for better mobile interaction */}
                <div className="absolute inset-0 z-10 bg-transparent" />
              </motion.div>
            ))}
          </div>
          
          {displayedCount < gridImages.length && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="w-full btn-cosmic text-sm sm:text-base py-3"
            >
              <span className="relative z-10">Xem thêm ({gridImages.length - displayedCount} ảnh)</span>
            </motion.button>
          )}
        </div>

        {/* Desktop 3D Carousel with Gesture Support */}
        <div className="relative w-full mx-auto mb-12 sm:mb-16 hidden lg:block" style={{ height: '500px' }}>
          <motion.div 
            ref={dragConstraintsRef}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ 
              perspective: '1000px',
              perspectiveOrigin: 'center center'
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {carouselImages.map((image, index) => {
                const angle = (360 / carouselImages.length) * index
                const currentAngle = (360 / carouselImages.length) * currentIndex
                const rotation = angle - currentAngle
                const isCurrent = index === currentIndex
                
                return (
                  <CarouselCard
                    key={image.id}
                    image={image}
                    rotation={rotation}
                    isCurrent={isCurrent}
                    onClick={() => handleImageClick(image)}
                    isDragging={isDragging}
                  />
                )
              })}
            </div>
          </motion.div>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="glass-cosmic rounded-full px-5 py-2">
              <span className="text-white font-mono text-sm">
                {currentIndex + 1} / {carouselImages.length}
              </span>
            </div>
          </div>

          {/* Swipe Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isDragging ? 1 : 0 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="glass-cosmic rounded-full px-4 py-2">
              <span className="text-white text-xs">← Vuốt để chuyển ảnh →</span>
            </div>
          </motion.div>
        </div>

        {/* Navigation Controls - Desktop Only */}
        <div className="hidden lg:flex flex-col items-center space-y-3 sm:space-y-4 mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full glass-cosmic flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full glass-cosmic flex items-center justify-center transition-colors ${
                isAutoRotating ? 'text-cosmic-400' : 'text-white/50'
              }`}
            >
              <RotateCw className={`w-4 sm:w-5 h-4 sm:h-5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full glass-cosmic flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
            </motion.button>
          </div>
          
          {/* Gesture Hint */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-white/40 text-xs text-center"
          >
            Vuốt trái/phải hoặc sử dụng nút điều khiển
          </motion.p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full glass-cosmic flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              onClick={(e) => {
                e.stopPropagation()
                handleLightboxPrevious()
              }}
              className="absolute left-4 w-12 h-12 rounded-full glass-cosmic flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              onClick={(e) => {
                e.stopPropagation()
                handleLightboxNext()
              }}
              className="absolute right-4 w-12 h-12 rounded-full glass-cosmic flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_event, info) => {
                if (Math.abs(info.offset.x) > 100) {
                  if (info.offset.x > 0) {
                    handleLightboxPrevious()
                  } else {
                    handleLightboxNext()
                  }
                }
              }}
            >
              <LazyImage
                src={selectedImage.src}
                srcSet={selectedImage.webpSrcSet}
                sizes="100vw"
                alt={selectedImage.alt}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface CarouselCardProps {
  image: GalleryImage
  rotation: number
  isCurrent: boolean
  onClick: () => void
  isDragging: boolean
}

const CarouselCard: React.FC<CarouselCardProps> = React.memo(({ image, rotation, isCurrent, onClick, isDragging }) => {
  const radius = 350
  
  const getTransform = () => {
    return `rotateY(${rotation}deg) translateZ(${radius}px)`
  }
  
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        width: '220px',
        height: '300px',
        marginLeft: '-110px',
        marginTop: '-150px',
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
      animate={{
        transform: getTransform(),
        opacity: isCurrent ? 1 : 0.4,
        scale: isCurrent ? 1 : 0.8,
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut'
      }}
      onClick={onClick}
    >
      <div 
        className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <LazyImage
          src={image.src}
          srcSet={image.webpSrcSet}
          sizes="220px"
          alt={image.alt}
          className="w-full h-full object-cover"
          width={220}
          quality={80}
          priority={isCurrent} // Preload current image
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {isCurrent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-xl border-2 border-cosmic-400/60"
            style={{ boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)' }}
          />
        )}
      </div>
    </motion.div>
  )
})

CarouselCard.displayName = 'CarouselCard'

export default Gallery