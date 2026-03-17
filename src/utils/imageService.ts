// Simplified Image Service with intelligent caching
export interface ImageConfig {
  src: string
  webp?: string
  sizes?: string
}

// Enhanced cache with expiration and size limits
class ImageCacheManager {
  private cache = new Map<string, { url: string; timestamp: number; blob?: Blob }>()
  private maxSize = 50 // Maximum 50 cached images
  private maxAge = 30 * 60 * 1000 // 30 minutes

  set(key: string, url: string, blob?: Blob) {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = Array.from(this.cache.keys())[0]
      this.cache.delete(oldestKey)
    }

    this.cache.set(key, {
      url,
      timestamp: Date.now(),
      blob
    })
  }

  get(key: string): string | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    // Check if expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key)
      return null
    }

    return entry.url
  }

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false

    // Check if expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  clear() {
    this.cache.clear()
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: Array.from(this.cache.keys())
    }
  }
}

// Simple image optimization without CDN for now
export const getOptimizedImageUrl = (
  imagePath: string, 
  options: { 
    width?: number
    quality?: number
    useCDN?: boolean
  } = {}
): ImageConfig => {
  const { width } = options
  // For now, just return the original path
  // CDN can be added later when repository is set up
  return {
    src: imagePath,
    sizes: width ? `${width}px` : '100vw'
  }
}

// Enhanced preload function with caching
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cacheKey = `img_${src}`
    
    // Check if already cached
    if (imageCache.has(cacheKey)) {
      resolve()
      return
    }

    const img = new Image()
    img.onload = () => {
      // Cache the successful load
      imageCache.set(cacheKey, src)
      resolve()
    }
    img.onerror = reject
    img.src = src
  })
}

// Preload multiple images with intelligent batching
export const preloadImages = async (imagePaths: string[], batchSize: number = 3): Promise<void> => {
  console.log(`Starting preload of ${imagePaths.length} images in batches of ${batchSize}`)
  
  // Process in batches to avoid overwhelming the browser
  for (let i = 0; i < imagePaths.length; i += batchSize) {
    const batch = imagePaths.slice(i, i + batchSize)
    const promises = batch.map(path => 
      preloadImage(path).catch(() => {
        console.warn(`Failed to preload: ${path}`)
      })
    )
    
    await Promise.allSettled(promises)
    
    // Small delay between batches
    if (i + batchSize < imagePaths.length) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  console.log('Image preloading completed')
  console.log('Cache stats:', imageCache.getStats())
}

// Smart preload based on priority
export const preloadCriticalImages = async (criticalPaths: string[]): Promise<void> => {
  console.log('Preloading critical images...')
  await preloadImages(criticalPaths, 2) // Smaller batches for critical images
}

// Background preload for non-critical images
export const preloadBackgroundImages = (paths: string[]): void => {
  // Use requestIdleCallback if available, otherwise setTimeout
  const schedulePreload = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback)
    } else {
      setTimeout(callback, 0)
    }
  }

  schedulePreload(() => {
    preloadImages(paths, 2).catch(() => {
      console.warn('Background preload failed')
    })
  })
}

// Export cache instance
export const imageCache = new ImageCacheManager()