import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { imageCache } from '../utils/imageService'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  onLoad?: () => void
  onClick?: () => void
  sizes?: string
  srcSet?: string
  width?: number
  quality?: number
  priority?: boolean
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==',
  onLoad,
  onClick,
  sizes,
  srcSet,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const [cachedSrc, setCachedSrc] = useState<string>('')
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Check cache on mount
  useEffect(() => {
    const cacheKey = `img_${src}`
    if (imageCache.has(cacheKey)) {
      const cached = imageCache.get(cacheKey)
      if (cached) {
        setCachedSrc(cached)
        setIsLoaded(true)
      }
    }
  }, [src])

  useEffect(() => {
    const currentImg = imgRef.current
    if (!currentImg || priority) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observerRef.current?.disconnect()
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    )

    observerRef.current.observe(currentImg)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [priority])

  const handleImageLoad = useCallback(() => {
    // Cache the loaded image
    const cacheKey = `img_${src}`
    if (!imageCache.has(cacheKey)) {
      imageCache.set(cacheKey, src)
    }
    
    setIsLoaded(true)
    onLoad?.()
  }, [src, onLoad])

  const handleImageError = useCallback(() => {
    setHasError(true)
  }, [])

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      ref={imgRef} 
      onClick={onClick}
      onTouchEnd={onClick ? (e) => {
        e.preventDefault()
        onClick()
      } : undefined}
      style={{ 
        touchAction: onClick ? 'manipulation' : 'auto',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gray-800"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={placeholder}
            alt=""
            className="w-full h-full object-cover filter blur-sm opacity-50"
          />
        </motion.div>
      )}

      {/* Loading spinner */}
      {!isLoaded && !hasError && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 z-10">
          <motion.div
            className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <motion.img
          src={cachedSrc || src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div>Không thể tải ảnh</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LazyImage