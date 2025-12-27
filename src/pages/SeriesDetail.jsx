import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client, urlFor } from '../lib/sanity'
import Lightbox from '../components/Lightbox'
import './SeriesDetail.css'

const SeriesDetail = () => {
  const { slug } = useParams()
  const [series, setSeries] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const query = `*[_type == "photoSeries" && slug.current == $slug][0] {
          title,
          year,
          description,
          images[] {
            asset,
            caption,
            alt
          }
        }`
        
        const data = await client.fetch(query, { slug })
        setSeries(data)
      } catch (error) {
        console.error('Error fetching series:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSeries()
  }, [slug])
  
  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }
  
  const closeLightbox = () => {
    setLightboxOpen(false)
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === series.images.length - 1 ? 0 : prev + 1
    )
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? series.images.length - 1 : prev - 1
    )
  }
  
  if (loading) {
    return (
      <div className="series-detail-page">
        <div className="loading">
          <p>Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!series) {
    return (
      <div className="series-detail-page">
        <div className="not-found">
          <p>Series not found</p>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="series-detail-page">
      <div className="series-detail">
        <div className="series-header">
          <Link to="/" className="back-link">← Home</Link>
          <h1 className="series-detail-title">{series.title}</h1>
          <p className="series-detail-year">{series.year}</p>
          {series.description && (
            <p className="series-description">{series.description}</p>
          )}
        </div>
        
        <div className="images-gallery">
          {series.images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img 
                src={urlFor(image).width(1400).quality(90).url()}
                alt={image.alt || `${series.title} - Image ${index + 1}`}
                className="gallery-image"
                loading="lazy"
                onClick={() => openLightbox(index)}
                style={{ cursor: 'pointer' }}
              />
              {image.caption && (
                <p className="image-caption">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
        
        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            images={series.images.map((img, idx) => ({
              url: urlFor(img).width(2000).quality(95).url(),
              alt: img.alt || `${series.title} - Image ${idx + 1}`,
              caption: img.caption
            }))}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </div>
    </div>
  )
}

export default SeriesDetail
