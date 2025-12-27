import './Contact.css'

const Contact = () => {
  const contactInfo = {
    email: 'sarimeltem@yahoo.com',
    instagram: 'https://www.instagram.com/_meltemsari/',
    linkedin: 'https://www.linkedin.com/in/meltem-sari-437369328/'
  }
  
  return (
    <div className="contact">
      <div className="contact-content">
        <div className="contact-item">
          <h3 className="contact-label">Email</h3>
          <a href={`mailto:${contactInfo.email}`} className="contact-link">
            {contactInfo.email}
          </a>
        </div>
        
        <div className="contact-item">
          <h3 className="contact-label">Instagram</h3>
          <a 
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            @_meltemsari
          </a>
        </div>
        
        <div className="contact-item">
          <h3 className="contact-label">LinkedIn</h3>
          <a 
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            Meltem Sari
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact
