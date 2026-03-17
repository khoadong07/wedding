// Simplified Image Service for better compatibility
export interface ImageConfig {
  src: string
  webp?: string
  sizes?: string
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
  // For now, just return the original path
  // CDN can be added later when repository is set up
  return {
    src: imagePath,
    sizes: options.width ? `${options.width}px` : '100vw'
  }
}

// Simple preload function
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Preload multiple images with error handling
export const preloadImages = async (imagePaths: string[]): Promise<void> => {
  const promises = imagePaths.map(path => 
    preloadImage(path).catch(() => {
      console.warn(`Failed to preload: ${path}`)
    })
  )
  
  await Promise.allSettled(promises)
  console.log('Image preloading completed')
}

// Simple cache implementation
const cache = new Map<string, string>()

export const imageCache = {
  set: (key: string, url: string) => cache.set(key, url),
  get: (key: string) => cache.get(key),
  has: (key: string) => cache.has(key),
  clear: () => cache.clear()
}