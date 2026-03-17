import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Invitation from './components/Invitation'
import Couple from './components/Couple'
import Countdown from './components/Countdown'
import Story from './components/Story'
import Gallery from './components/Gallery'
import QRPayment from './components/QRPayment'
import Footer from './components/Footer'
import BackgroundMusic from './components/BackgroundMusic'
import CosmicBackground from './components/CosmicBackground'

function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CosmicBackground />
      <BackgroundMusic />
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Invitation />
        <Couple />
        <Countdown />
        <Story />
        <Gallery />
        <QRPayment />
      </main>
      <Footer />
    </div>
  )
}

export default App