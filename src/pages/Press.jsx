import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import './Press.css'

const Press = () => {
  const [pressItems, setPressItems] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchPress = async () => {
      try {
        const query = `*[_type == "press"] | order(order asc, date desc) {
          _id,
          publication,
          title,
          url,
          date
        }`
        
        const data = await client.fetch(query)
        setPressItems(data)
      } catch (error) {
        console.error('Error fetching press:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPress()
  }, [])
  
  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="press">
      <div className="press-list">
        {pressItems.map((item, index) => (
          <a 
            key={item._id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="press-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="press-publication">{item.publication}</h3>
            {item.title && (
              <p className="press-title">{item.title}</p>
            )}
            <span className="press-link">Read article →</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Press
