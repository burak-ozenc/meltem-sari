import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { PortableText } from '@portabletext/react'
import './Biography.css'

const portableTextComponents = {
  marks: {
    em: ({ children }) => <em>{children}</em>,
  },
}

const Biography = () => {
  const [bio, setBio] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const query = `*[_type == "biography"][0] {
          birthYear,
          birthPlace,
          currentLocation,
          education,
          content
        }`
        
        const data = await client.fetch(query)
        setBio(data)
      } catch (error) {
        console.error('Error fetching biography:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBio()
  }, [])
  
  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    )
  }
  
  if (!bio) {
    return (
      <div className="biography">
        <p>Biography content will be available soon.</p>
      </div>
    )
  }
  
  return (
    <div className="biography">
      <div className="bio-content">
        {bio.birthYear && (
          <div className="bio-section">
            <p className="bio-line">
              <strong>{bio.birthYear}</strong>
              {bio.birthPlace && ` Born in ${bio.birthPlace}`}
            </p>
          </div>
        )}
        
        {bio.education && bio.education.length > 0 && (
          <div className="bio-section">
            {bio.education.map((edu, index) => (
              <p key={index} className="bio-line">
                <strong>{edu.year}</strong> {edu.degree}
                {edu.institution && `, ${edu.institution}`}
              </p>
            ))}
          </div>
        )}
        
        {bio.currentLocation && (
          <div className="bio-section">
            <p className="bio-line">Lives in {bio.currentLocation}</p>
          </div>
        )}
        
        {bio.content && (
          <div className="bio-section bio-text">
            <PortableText value={bio.content} components={portableTextComponents} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Biography
