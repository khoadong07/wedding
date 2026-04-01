import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BackgroundMusic from './components/BackgroundMusic'
import CosmicBackground from './components/CosmicBackground'
import { preloadCriticalImages, preloadBackgroundImages } from './utils/imageService'

// Lazy load các component nặng
const Timeline = lazy(() => import('./components/Timeline'))
const Invitation = lazy(() => import('./components/Invitation'))
const Couple = lazy(() => import('./components/Couple'))
const Countdown = lazy(() => import('./components/Countdown'))
const Story = lazy(() => import('./components/Story'))
const Gallery = lazy(() => import('./components/Gallery'))
const QRPayment = lazy(() => import('./components/QRPayment'))
const Footer = lazy(() => import('./components/Footer'))

// Loading component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-2 border-cosmic-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function App() {
  // Intelligent image preloading with cache
  useEffect(() => {
    // Critical images - load immediately
    const criticalImages = [
      'assets/8.jpg', // Hero mobile
      'assets/A KHOA - C HANG_01.jpg', // Hero desktop
      'assets/5.jpg', // Thanh Hằng
      'assets/12.jpg', // Đăng Khoa
    ]
    
    // Background images - load when browser is idle
    const backgroundImages = [
      'assets/_32A7964 - HC.jpg', // Story 1
      'assets/_32A8457 - HC.jpg', // Story 2
      'assets/25.jpg', // Story 3
      // Gallery images - random selection will be preloaded by Gallery component
    ]
    
    // Preload critical images first
    preloadCriticalImages(criticalImages)
    
    // Preload background images when browser is idle
    preloadBackgroundImages(backgroundImages)
  }, [])

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CosmicBackground />
      <BackgroundMusic />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Timeline />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Invitation />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Couple />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Countdown />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Story />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <QRPayment />
        </Suspense>
      </main>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App