import { useEffect, useState } from 'react'
import Works from './Works'
import Exhibitions from './Exhibitions'
import Press from './Press'
import Biography from './Biography'
import Contact from './Contact'
import './Home.css'

const Home = () => {
  const [showTitle, setShowTitle] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [activeSection, setActiveSection] = useState('works')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    // Show title after a brief delay
    const timer = setTimeout(() => {
      setShowTitle(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    if (!showContent) return
    
    // Track active section on scroll
    const handleScroll = () => {
      const sections = ['works', 'exhibitions', 'press', 'biography', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showContent])
  
  const handleVideoClick = () => {
    setShowContent(true)
    // Smooth scroll to content
    setTimeout(() => {
      const contentSection = document.getElementById('content-section')
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
  
  const handleNavClick = (e) => {
    // Close mobile menu when clicking a link
    setMobileMenuOpen(false)
  }
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  return (
    <div className="home-container">
      {/* Video Section */}
      <div className="home">
        <div className="video-container" onClick={handleVideoClick}>
          
          <div className="video-placeholder">
            <div className="placeholder-content">
                <video
                    className="intro-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/Japan-1.mp4" type="video/mp4"/>
                </video>
              <small>Click to explore works</small>
            </div>
          </div>
        </div>
        
        {showTitle && (
          <div className="title-overlay">
            <h1 className="name-title">Meltem Sari</h1>
          </div>
        )}
      </div>
      
      {/* Content Sections */}
      {showContent && (
        <div id="content-section" className="content-sections">
          {/* Hamburger Menu Button */}
          <button 
            className="hamburger-button" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
          </button>
          
          <nav className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul className="nav-list">
              <li>
                <a 
                  href="#works" 
                  className={activeSection === 'works' ? 'active' : ''}
                  onClick={handleNavClick}
                >
                  Works
                </a>
              </li>
              <li>
                <a 
                  href="#exhibitions" 
                  className={activeSection === 'exhibitions' ? 'active' : ''}
                  onClick={handleNavClick}
                >
                  Exhibitions
                </a>
              </li>
              <li>
                <a 
                  href="#press" 
                  className={activeSection === 'press' ? 'active' : ''}
                  onClick={handleNavClick}
                >
                  Press
                </a>
              </li>
              <li>
                <a 
                  href="#biography" 
                  className={activeSection === 'biography' ? 'active' : ''}
                  onClick={handleNavClick}
                >
                  Biography
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={activeSection === 'contact' ? 'active' : ''}
                  onClick={handleNavClick}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
          <main className="sections-content">
            <section id="works" className="content-section">
              <Works />
            </section>
            
            <section id="exhibitions" className="content-section">
              <Exhibitions />
            </section>
            
            <section id="press" className="content-section">
              <Press />
            </section>
            
            <section id="biography" className="content-section">
              <Biography />
            </section>
            
            <section id="contact" className="content-section">
              <Contact />
            </section>
          </main>
        </div>
      )}
    </div>
  )
}

export default Home
