import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight, Sparkles, RotateCw } from 'lucide-react'

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
  const [rotationAxis, setRotationAxis] = useState<'horizontal' | 'vertical'>('horizontal')
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const images: GalleryImage[] = [
    {
      id: 1,
      src: 'assets/A%20KHOA%20-%20C%20HANG_06.jpg',
      webpSrcSet: 'optimized/A%20KHOA%20-%20C%20HANG_06-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_06-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_06-1200.webp 1200w',
      alt: 'Cosmic Memory 1',
      caption: 'Khoảnh khắc đầu tiên trong vũ trụ tình yêu',
    },
    {
      id: 2,
      src: 'assets/A%20KHOA%20-%20C%20HANG_07.jpg',
      webpSrcSet: 'optimized/A%20KHOA%20-%20C%20HANG_07-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_07-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_07-1200.webp 1200w',
      alt: 'Cosmic Memory 2',
      caption: 'Ánh sáng của hai vì sao',
    },
    {
      id: 3,
      src: 'assets/A%20KHOA%20-%20C%20HANG_08.jpg',
      webpSrcSet: 'optimized/A%20KHOA%20-%20C%20HANG_08-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_08-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_08-1200.webp 1200w',
      alt: 'Cosmic Memory 3',
      caption: 'Cùng nhau vượt qua mọi thiên hà',
    },
    {
      id: 4,
      src: 'assets/A%20KHOA%20-%20C%20HANG_09.jpg',
      webpSrcSet: 'optimized/A%20KHOA%20-%20C%20HANG_09-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_09-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_09-1200.webp 1200w',
      alt: 'Cosmic Memory 4',
      caption: 'Hành trình không gian vô tận',
    },
    {
      id: 5,
      src: 'assets/A%20KHOA%20-%20C%20HANG_10.jpg',
      webpSrcSet: 'optimized/A%20KHOA%20-%20C%20HANG_10-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_10-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_10-1200.webp 1200w',
      alt: 'Cosmic Memory 5',
      caption: 'Trong vòng tay của nhau',
    },
    {
      id: 6,
      src: 'assets/A%20KHOA%20-%20C%20HANG_11.jpg',
      webpSrcSet: 'optimized/A%20KHOA%20-%20C%20HANG_11-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_11-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_11-1200.webp 1200w',
      alt: 'Cosmic Memory 6',
      caption: 'Nụ cười rạng rỡ như sao',
    },
    {
      id: 7,
      src: 'assets/A%20KHOA%20-%20C%20HANG_12.jpg',
      webpSrcSet: 'optimized/A%20KHOA%20-%20C%20HANG_12-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_12-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_12-1200.webp 1200w',
      alt: 'Cosmic Memory 7',
      caption: 'Tựa vào nhau như hai hành tinh',
    },
    {
      id: 8,
      src: 'assets/A%20KHOA%20-%20C%20HANG_13.jpg',
      webpSrcSet: 'optimized/A%20KHOA%20-%20C%20HANG_13-480.webp 480w, optimized/A%20KHOA%20-%20C%20HANG_13-768.webp 768w, optimized/A%20KHOA%20-%20C%20HANG_13-1200.webp 1200w',
      alt: 'Cosmic Memory 8',
      caption: 'Hạnh phúc vô biên',
    },
  ]

  // Auto rotation
  useEffect(() => {
    if (!isAutoRotating) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoRotating, images.length])

  const handlePrevious = () => {
    setIsAutoRotating(false)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setIsAutoRotating(false)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const handleLightboxPrevious = () => {
    if (!selectedImage) return
    const currentIdx = images.findIndex(img => img.id === selectedImage.id)
    const previousIndex = currentIdx > 0 ? currentIdx - 1 : images.length - 1
    setSelectedImage(images[previousIndex])
  }

  const handleLightboxNext = () => {
    if (!selectedImage) return
    const currentIdx = images.findIndex(img => img.id === selectedImage.id)
    const nextIndex = currentIdx < images.length - 1 ? currentIdx + 1 : 0
    setSelectedImage(images[nextIndex])
  }

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-cosmic-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-nebula-500/5 rounded-full blur-3xl animate-float-delay-2" />
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
            <Sparkles className="w-8 h-8 text-cosmic-400" />
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent">
            Album Vũ Trụ
          </h2>
          <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            Những khoảnh khắc đẹp nhất được lưu giữ trong không gian và thời gian
          </p>
        </motion.div>

        {/* 3D Rotating Carousel */}
        <div className="relative w-full max-w-5xl mx-auto mb-16" style={{ height: '500px' }}>
          {/* Carousel Container */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              perspective: '1000px',
              perspectiveOrigin: 'center center'
            }}
          >
            <div 
              className="relative w-full h-full"
              style={{ 
                transformStyle: 'preserve-3d',
              }}
            >
              {images.map((image, index) => {
                const angle = (360 / images.length) * index
                const currentAngle = (360 / images.length) * currentIndex
                const rotation = angle - currentAngle
                const isCurrent = index === currentIndex
                
                return (
                  <CarouselCard
                    key={image.id}
                    image={image}
                    rotation={rotation}
                    rotationAxis={rotationAxis}
                    isCurrent={isCurrent}
                    onClick={() => handleImageClick(image)}
                  />
                )
              })}
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="glass-cosmic rounded-full px-5 py-2">
              <span className="text-white font-mono text-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Moved Below */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          {/* Rotation Axis Toggle */}
          <div className="flex items-center space-x-2 glass-cosmic rounded-full px-4 py-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRotationAxis('horizontal')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                rotationAxis === 'horizontal'
                  ? 'bg-cosmic-400 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Ngang
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRotationAxis('vertical')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                rotationAxis === 'vertical'
                  ? 'bg-nebula-400 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Dọc
            </motion.button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full glass-cosmic flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`w-12 h-12 rounded-full glass-cosmic flex items-center justify-center transition-colors ${
                isAutoRotating ? 'text-cosmic-400' : 'text-white/50'
              }`}
            >
              <RotateCw className={`w-5 h-5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-12 h-12 rounded-full glass-cosmic flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Current Image Caption */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-block">
            <motion.div
              className="relative px-8 py-4 rounded-full glass-cosmic border border-cosmic-400/50"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmic-500/10 to-nebula-500/10 blur-lg" />
              <p className="relative text-white/90 text-lg font-display font-semibold bg-gradient-to-r from-cosmic-300 via-nebula-300 to-aurora-300 bg-clip-text text-transparent">
                {images[currentIndex].caption}
              </p>
            </motion.div>
          </div>
        </motion.div>
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
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full glass-cosmic flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Previous Button */}
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

            {/* Next Button */}
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

            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <picture>
                <source type="image/webp" srcSet={selectedImage.webpSrcSet} />
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </picture>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl"
              >
                <p className="text-white text-lg lg:text-xl font-medium text-center">
                  {selectedImage.caption}
                </p>
              </motion.div>
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
  rotationAxis: 'horizontal' | 'vertical'
  isCurrent: boolean
  onClick: () => void
}

const CarouselCard: React.FC<CarouselCardProps> = ({ image, rotation, rotationAxis, isCurrent, onClick }) => {
  const radius = 400 // Distance from center - reduced for smaller layout
  
  // Calculate transform based on rotation axis
  const getTransform = () => {
    if (rotationAxis === 'horizontal') {
      return `rotateY(${rotation}deg) translateZ(${radius}px)`
    } else {
      return `rotateX(${-rotation}deg) translateZ(${radius}px)`
    }
  }
  
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        width: '260px',
        height: '360px',
        marginLeft: '-130px',
        marginTop: '-180px',
      }}
      animate={{
        transform: getTransform(),
        opacity: isCurrent ? 1 : 0.3,
        scale: isCurrent ? 1 : 0.75,
      }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut'
      }}
      onClick={onClick}
    >
      <div 
        className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Card Background Glow */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-cosmic-500/20 to-nebula-500/20 rounded-xl blur-xl"
          style={{
            transform: 'translateZ(-10px)',
          }}
        />

        {/* Image */}
        <picture>
          <source type="image/webp" srcSet={image.webpSrcSet} sizes="260px" />
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </picture>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Border Glow for Current */}
        {isCurrent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-xl border-2 border-cosmic-400/60"
            style={{
              boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)',
            }}
          />
        )}

        {/* Floating Sparkles for Current */}
        {isCurrent && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -30],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default Gallery
