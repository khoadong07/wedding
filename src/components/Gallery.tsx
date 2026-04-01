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
  return (
    <section id="gallery" className="section-padding relative overflow-hidden bg-white">
      {/* Background Effects - Subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cosmic-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-nebula-50/40 rounded-full blur-[100px]" />
      </div>

      <div className="container-cosmic relative z-10">
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
            <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 text-gradient-gold">
            Khoảnh Khắc Hạnh Phúc
          </h2>
          <p className="text-base sm:text-xl text-void-500 max-w-3xl mx-auto px-4 font-serif italic">
            "Nơi lưu giữ những kỷ niệm đẹp nhất trong hành trình yêu thương của chúng mình"
          </p>
        </motion.div>

        {/* Mobile Grid View */}
        <div className="lg:hidden mb-16">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
            {displayedImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: tappedImage === image.id ? 0.98 : 1 
                }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="cursor-pointer group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-md border border-cosmic-100"
                onClick={() => handleMobileImageClick(image)}
              >
                <LazyImage
                  src={image.src}
                  srcSet={image.webpSrcSet}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  alt={image.alt}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  width={400}
                  quality={75}
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
          
          {displayedCount < gridImages.length && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={loadMore}
              className="w-full btn-outline text-base py-4 rounded-2xl"
            >
              <span>Xem thêm ({gridImages.length - displayedCount} ảnh)</span>
            </motion.button>
          )}
        </div>

        {/* Desktop 3D Carousel */}
        <div className="relative w-full mx-auto mb-20 hidden lg:block" style={{ height: '600px' }}>
          <motion.div 
            ref={dragConstraintsRef}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ perspective: '1200px' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {carouselImages.map((image, index) => {
                const angle = (360 / carouselImages.length) * index
                const currentAngle = (360 / carouselImages.length) * currentIndex
                return (
                  <CarouselCard
                    key={image.id}
                    image={image}
                    rotation={angle - currentAngle}
                    isCurrent={index === currentIndex}
                    onClick={() => handleImageClick(image)}
                    isDragging={isDragging}
                  />
                )
              })}
            </div>
          </motion.div>

          {/* Image Counter */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-white/80 backdrop-blur-md border border-cosmic-100 rounded-full px-8 py-2.5 shadow-sm">
              <span className="text-void-900 font-bold tracking-widest text-sm">
                {currentIndex + 1} / {carouselImages.length}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="hidden lg:flex flex-col items-center space-y-6 mb-12">
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="w-14 h-14 rounded-full bg-white border border-cosmic-100 flex items-center justify-center text-void-900 hover:bg-cosmic-50 shadow-sm transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                isAutoRotating ? 'bg-cosmic-50 border-cosmic-200 text-cosmic-600' : 'bg-white border-void-100 text-void-300'
              }`}
            >
              <RotateCw className={`w-6 h-6 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-white border border-cosmic-100 flex items-center justify-center text-void-900 hover:bg-cosmic-50 shadow-sm transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>
          </div>
          <p className="text-void-400 text-xs uppercase tracking-[0.2em] font-bold">Vuốt hoặc dùng nút để lướt xem</p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95 backdrop-blur-2xl p-4 sm:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-14 h-14 rounded-full bg-void-900 text-white flex items-center justify-center hover:bg-void-800 transition-all z-10 shadow-xl"
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); handleLightboxPrevious(); }}
              className="absolute left-6 w-14 h-14 rounded-full bg-white/80 border border-void-100 flex items-center justify-center text-void-900 hover:bg-white transition-all z-10 shadow-lg"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); handleLightboxNext(); }}
              className="absolute right-6 w-14 h-14 rounded-full bg-white/80 border border-void-100 flex items-center justify-center text-void-900 hover:bg-white transition-all z-10 shadow-lg"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full"
            >
              <LazyImage
                src={selectedImage.src}
                srcSet={selectedImage.webpSrcSet}
                sizes="100vw"
                alt={selectedImage.alt}
                className="w-full h-auto rounded-3xl shadow-3xl border border-cosmic-100"
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
  const radius = 400
  
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        width: '280px',
        height: '380px',
        marginLeft: '-140px',
        marginTop: '-190px',
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
      animate={{
        transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
        opacity: isCurrent ? 1 : 0.3,
        scale: isCurrent ? 1 : 0.75,
      }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      onClick={onClick}
    >
      <div 
        className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ${isCurrent ? 'ring-[12px] ring-white shadow-2xl scale-105' : 'ring-1 ring-cosmic-100 shadow-lg'}`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <LazyImage
          src={image.src}
          srcSet={image.webpSrcSet}
          sizes="280px"
          alt={image.alt}
          className="w-full h-full object-cover"
          width={280}
          quality={85}
          priority={isCurrent}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {isCurrent && (
          <div className="absolute inset-x-0 bottom-0 p-6 text-center">
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="h-0.5 w-12 bg-cosmic-300 mx-auto" />
          </div>
        )}
      </div>
    </motion.div>
  )
})

CarouselCard.displayName = 'CarouselCard'

export default Gallery