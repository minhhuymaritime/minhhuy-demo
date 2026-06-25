import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import CoreValues from './components/CoreValues'
import Products from './components/Products'
import News from './components/News'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import FloatingActions from './components/FloatingActions'
import SocialDock from './components/SocialDock'
import QrDock from './components/QrDock'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Intro />
      {/* #app-shell: animation bên trong bị tạm dừng khi Intro còn che (body.intro-active) */}
      <div id="app-shell">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <CoreValues />
          <Stats />
          <Products />
          <News />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
        <SocialDock />
        <QrDock />
        <ChatWidget />
      </div>
    </div>
  )
}
