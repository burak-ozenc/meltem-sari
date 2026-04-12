import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [showTitle, setShowTitle] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleVideoClick = () => {
    navigate('/works')
  }
  
  return (
    <div className="home-container">
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
    </div>
  )
}

export default Home
