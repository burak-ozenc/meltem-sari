import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client, urlFor } from '../lib/sanity'
import './SeriesDetail.css'

const SeriesDetail = () => {
  const { slug } = useParams()
  const [series, setSeries] = useState(null)
  const [loading, setLoading] = useState(true)
  
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
              />
              {image.caption && (
                <p className="image-caption">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SeriesDetail
