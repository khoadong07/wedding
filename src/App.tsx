import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BackgroundMusic from './components/BackgroundMusic'
import CosmicBackground from './components/CosmicBackground'

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