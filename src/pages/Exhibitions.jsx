import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import './Exhibitions.css'

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const query = `*[_type == "exhibition"] | order(year desc) {
          _id,
          year,
          title,
          type,
          venue,
          location,
          description,
          images
        }`
        
        const data = await client.fetch(query)
        setExhibitions(data)
      } catch (error) {
        console.error('Error fetching exhibitions:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchExhibitions()
  }, [])
  
  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="exhibitions">
      <div className="exhibitions-list">
        {exhibitions.map((exhibition, index) => (
          <div 
            key={exhibition._id} 
            className="exhibition-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="exhibition-year">{exhibition.
