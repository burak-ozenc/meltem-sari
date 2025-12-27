import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { client, urlFor } from '../lib/sanity'
import './Works.css'

const Works = () => {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const query = `*[_type == "photoSeries"] | order(order asc, year desc) {
          _id,
          title,
          year,
          slug,
          coverImage
        }`
        
        const data = await client.fetch(query)
        setSeries(data)
      } catch (error) {
        console.error('Error fetching series:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSeries()
  }, [])
  
  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="works">
      <div className="series-grid">
        {series.map((item) => (
          <Link 
            key={item._id} 
            to={`/works/${item.slug.current}`}
            className="series-item"
          >
            <div className="series-image-wrapper">
              <img 
                src={urlFor(item.coverImage).width(800).quality(90).url()}
                alt={item.title}
                className="series-image"
                loading="lazy"
              />
            </div>
            <div className="series-info">
              <h3 className="series-title">{item.title}</h3>
              <span className="series-year">{item.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Works
