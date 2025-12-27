import { useEffect } from 'react'
import './Lightbox.css'

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'
    
    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNext, onPrev])
  
  const currentImage = images[currentIndex]
  
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img 
          src={currentImage.url} 
          alt={currentImage.alt || `Image ${currentIndex + 1}`}
          className="lightbox-image"
        />
        
        {currentImage.caption && (
          <div className="lightbox-caption">
            {currentImage.caption}
          </div>
        )}
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
          >
            ‹
          </button>
          
          <button 
            className="lightbox-nav lightbox-next" 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
      
      <div className="lightbox-counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

export default Lightbox
